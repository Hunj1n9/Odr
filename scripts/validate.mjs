// Kiểm tra toàn bộ ngân hàng bài tập bằng Pyodide chạy trong Node:
//  - lời giải mẫu phải qua 100% test (và khớp mọi kết quả "==> mong đợi")
//  - code khởi đầu (starter) phải chạy được nhưng KHÔNG được qua hết test
//  - mọi đoạn ```python trong bài học phải chạy không lỗi
// Dùng: npm run validate [-- <id hoặc tên file để lọc>]
import { readFileSync } from "node:fs";
import { loadPyodide } from "pyodide";
import { PROBLEM_FILES, LESSON_FILES, parseBlocks, toProblem, toQuiz, TOPICS, LEVELS } from "../src/content.js";
import { DATASETS } from "../src/data/datasets.js";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const filter = process.argv[2];

const py = await loadPyodide();
py.setStdout({ batched: () => {} });
py.runPython(read("src/py/grader.py"));
for (const [n, c] of Object.entries(DATASETS)) py.FS.writeFile(n, c);
await py.loadPackage(["numpy", "pandas", "matplotlib", "scikit-learn", "scipy"], { messageCallback: () => {} });

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

let failures = 0;
const ids = new Set();
const fail = (where, msg) => {
  failures++;
  console.log(`✗ ${where}: ${msg}`);
};

let count = 0;
for (const file of PROBLEM_FILES) {
  const problems = parseBlocks(read("content/problems/" + file)).map((b) => toProblem(b, file));
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
if (!filter || filter === "lessons") {
  for (const f of LESSON_FILES) {
    const text = read("content/lessons/" + f);
    const blocks = [...text.matchAll(/```python\n([\s\S]*?)```/g)].map((m) => m[1]);
    blocks.forEach((code, i) => {
      if (code.includes("# no-run")) return;
      lessonBlocks++;
      const out = JSON.parse(runCell(code, true, "5\n3\n"));
      if (!out.ok) fail(`${f} block ${i + 1}`, out.error);
    });
  }
  const quizzes = parseBlocks(read("content/quizzes.md")).map(toQuiz);
  for (const q of quizzes) {
    if (q.answer < 0 || q.options.length < 2) fail(q.id, "quiz thiếu đáp án");
    if (ids.has(q.id)) fail(q.id, "trùng id");
    ids.add(q.id);
  }
  console.log(`Quiz: ${quizzes.length} câu`);
}

console.log(`\nĐã kiểm tra ${count} bài tập, ${lessonBlocks} đoạn code bài học. ${failures ? failures + " lỗi" : "Tất cả OK ✓"}`);
process.exit(failures ? 1 : 0);
