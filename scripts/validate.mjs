// Kiểm tra toàn bộ ngân hàng bài tập bằng Pyodide chạy trong Node:
//  - lời giải mẫu phải qua 100% test (và khớp mọi kết quả "==> mong đợi")
//  - code khởi đầu (starter) phải chạy được nhưng KHÔNG được qua hết test
//  - mọi đoạn ```python trong bài học phải chạy không lỗi
// Dùng: npm run validate [-- <id hoặc tên file để lọc>]
import { readFileSync } from "node:fs";
import { loadPyodide } from "pyodide";
import { PROBLEM_FILES, LESSON_FILES, QUIZ_FILES, parseBlocks, toProblem, toQuiz, toLesson, TOPICS, LEVELS } from "../src/content.js";
import { DATASETS } from "../src/data/datasets.js";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const filter = process.argv[2];

const py = await loadPyodide();
py.setStdout({ batched: () => {} });
py.runPython(read("src/py/grader.py"));
for (const [n, c] of Object.entries(DATASETS)) py.FS.writeFile(n, c);
await py.loadPackage(["numpy", "pandas", "matplotlib", "scikit-learn", "scipy", "sqlite3"], { messageCallback: () => {} });
await py.loadPackage("micropip", { messageCallback: () => {} });
await py.runPythonAsync("import micropip\nawait micropip.install('seaborn==0.13.2')");

const grade = py.globals.get("grade");
const runCell = py.globals.get("run_cell");
py.runPython(`
def _expect_ok(solution, fn, args, expect):
    ns = {"__name__": "__ref__"}
    exec(solution, ns)
    env = dict(ns)
    got = ns[fn](*_parse_args(args, env))
    exp = eval(expect, env)
    ok, msg = same(exp, got)
    return "" if ok else f"mong đợi {exp!r}, lời giải trả về {got!r} {msg}"
`);
const expectOk = py.globals.get("_expect_ok");
py.runPython(`
import io, contextlib
def _stdout_of(code):
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        exec(code, {"__name__": "__main__"})
    return buf.getvalue()
`);
const stdoutOf = py.globals.get("_stdout_of");
// "`[1, 2]`" -> "[1, 2]"
const plain = (o) => o.trim().replace(/^`+|`+$/g, "").trim();

let failures = 0;
const ids = new Set();
const fail = (where, msg) => {
  failures++;
  console.log(`✗ ${where}: ${msg}`);
};

const lessons = LESSON_FILES.map((f) => toLesson(read("content/lessons/" + f), f));
const units = new Map(lessons.flatMap((l) => l.units).map((u) => [u.id, u]));
const allProblems = PROBLEM_FILES.flatMap((file) => parseBlocks(read("content/problems/" + file)).map((b) => toProblem(b, file)));
const unitEx = new Map();
for (const p of allProblems) {
  if (!p.unit) continue;
  if (!units.has(p.unit)) fail(p.id, "@unit không tồn tại: " + p.unit);
  unitEx.set(p.unit, (unitEx.get(p.unit) || 0) + 1);
}

let count = 0;
for (const file of PROBLEM_FILES) {
  const problems = allProblems.filter((p) => p.file === file);
  for (const p of problems) {
    if (ids.has(p.id)) fail(p.id, "trùng id");
    ids.add(p.id);
    if (filter && !p.id.includes(filter) && !file.includes(filter)) continue;
    count++;
    if (!TOPICS[p.topic]) fail(p.id, "topic lạ: " + p.topic);
    if (!LEVELS[p.level]) fail(p.id, "level lạ: " + p.level);
    if (!p.statement || !p.solution || !p.starter) fail(p.id, "thiếu statement/solution/starter");
    if (!p.check && (!p.fn || !p.tests.length)) fail(p.id, "thiếu fn hoặc tests");
    const spec = { fn: p.fn, solution: p.solution, tests: p.tests, compare: p.compare, check: p.check };
    let res;
    try {
      res = JSON.parse(grade(p.solution, JSON.stringify(spec)));
    } catch (e) {
      fail(p.id, "grader lỗi: " + String(e.message).split("\n").slice(-3).join(" "));
      continue;
    }
    if (res.error) fail(p.id, "lời giải lỗi: " + res.error);
    for (const r of res.results || []) if (!r.ok) fail(p.id, `lời giải trượt test ${r.args || r.name}: ${r.msg}`);
    for (const t of p.tests) {
      if (!t.expect) continue;
      try {
        const m = expectOk(p.solution, p.fn, t.args, t.expect);
        if (m) fail(p.id, `test (${t.args}): ${m}`);
      } catch (e) {
        fail(p.id, `test (${t.args}) lỗi: ${String(e.message).split("\n").slice(-2).join(" ")}`);
      }
    }
    let sres;
    try {
      sres = JSON.parse(grade(p.starter, JSON.stringify(spec)));
    } catch (e) {
      fail(p.id, "grader lỗi với starter: " + String(e.message).split("\n").slice(-3).join(" "));
      continue;
    }
    if (sres.error && /cú pháp/.test(sres.error)) fail(p.id, "starter lỗi cú pháp");
    if (!sres.error && sres.results.length && sres.results.every((r) => r.ok)) fail(p.id, "starter đã qua hết test");
  }
}

let lessonBlocks = 0;
let quizCount = 0;
if (!filter || filter === "lessons" || /^c\d/.test(filter) || /^ch\d/.test(filter)) {
  const unitIds = new Set();
  for (const l of lessons) {
    if (filter && /^ch\d/.test(filter) && !l.id.startsWith(filter)) continue;
    const cells = [{ where: `${l.id} (mở đầu)`, text: l.body }, ...l.units.map((u) => ({ where: u.id, text: u.body, u }))];
    for (const { where, text, u } of cells) {
      if (filter && /^c\d/.test(filter) && (!u || u.id !== filter)) continue;
      if (u) {
        if (unitIds.has(u.id)) fail(u.id, "trùng id bài học");
        unitIds.add(u.id);
        if (!/^c\d+-\d+$/.test(u.id)) fail(u.id, "id bài học phải dạng c<chương>-<số>");
        if (!u.title) fail(u.id, "thiếu tên bài");
        if (!u.goal) fail(u.id, "thiếu @goal");
        if (!u.ftu) fail(u.id, "thiếu @ftu (nguồn tài liệu FTU tương ứng)");
        if (!u.quizzes.length) fail(u.id, "chưa có câu hỏi nhanh");
        if (!unitEx.get(u.id)) fail(u.id, "chưa có bài tập");
        for (const pid of u.practice) if (!allProblems.some((p) => p.id === pid)) fail(u.id, "@practice không tồn tại: " + pid);
        for (const q of u.quizzes) {
          quizCount++;
          if (q.answer < 0 || q.options.length < 2 || !q.question) fail(q.id, "câu hỏi nhanh thiếu đề/đáp án");
          if (!q.explain) fail(q.id, "câu hỏi nhanh thiếu giải thích");
          if (new Set(q.options).size !== q.options.length) fail(q.id, "phương án trùng nhau");
        }
      }
      const blocks = [...text.matchAll(/```python\n([\s\S]*?)```/g)].map((m) => m[1]);
      blocks.forEach((code, i) => {
        if (code.includes("# no-run")) return;
        lessonBlocks++;
        const out = JSON.parse(runCell(code, true, "5\n3\n"));
        // ô minh hoạ lỗi ghi chú "lỗi cố ý" → phải báo lỗi
        if (code.includes("lỗi cố ý")) {
          if (out.ok) fail(`${where} block ${i + 1}`, "ô 'lỗi cố ý' lại chạy không lỗi");
        } else if (!out.ok) fail(`${where} block ${i + 1}`, out.error);
      });
    }
  }
  const quizzes = QUIZ_FILES.flatMap((f) => parseBlocks(read("content/" + f)).map(toQuiz));
  for (const q of quizzes) {
    if (q.answer < 0 || q.options.length < 2) fail(q.id, "quiz thiếu đáp án");
    if (new Set(q.options).size !== q.options.length) fail(q.id, "phương án trùng nhau");
    if (ids.has(q.id)) fail(q.id, "trùng id");
    ids.add(q.id);
    if (!q.code) continue;
    // câu đoán output: output thật phải khớp đáp án đúng và không khớp phương án nào khác
    let out;
    try {
      out = stdoutOf(q.code).trim();
    } catch (e) {
      out = "Lỗi: " + String(e.message).trim().split("\n").pop().split(":")[0];
    }
    const hits = q.options.map((o, i) => [plain(o), i]).filter(([o]) => o === out).map(([, i]) => i);
    if (!hits.includes(q.answer)) fail(q.id, `output thật là ${JSON.stringify(out)}, đáp án đánh dấu là ${JSON.stringify(plain(q.options[q.answer]))}`);
    else if (hits.length > 1) fail(q.id, "nhiều phương án trùng output");
  }
  quizCount += quizzes.length;
  console.log(`Bài học nhỏ: ${unitIds.size} · Trắc nghiệm: ${quizCount} câu`);
}

console.log(`\nĐã kiểm tra ${count} bài tập, ${lessonBlocks} đoạn code bài học. ${failures ? failures + " lỗi" : "Tất cả OK ✓"}`);
process.exit(failures ? 1 : 0);
