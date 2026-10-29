// Đọc nội dung (bài học, bài tập, trắc nghiệm) từ các file .md trong thư mục content/.
// Định dạng khối:
//   ===== <id>          bắt đầu một mục mới
//   @key: value          metadata (trước phần ::: đầu tiên)
//   ::: section          bắt đầu một phần (statement, starter, solution, tests, hidden, hints, ...)

export const PROBLEM_FILES = [
  "01-basics.md", "02-midterm.md", "03-collection.md", "04-numpy.md",
  "05-pandas.md", "06-viz.md", "07-ml.md", "08-ftu-exam.md",
  // bài tập nhỏ đi kèm từng bài học (@unit)
  "u1-intro.md", "u2-python.md", "u3-io.md", "u4-pandas.md",
  "u5-viz.md", "u6-ml.md", "u7-eval.md", "u8-project.md",
];
export const LESSON_FILES = [
  "ch1-intro.md", "ch2-python.md", "ch3-io.md", "ch4-pandas.md",
  "ch5-viz.md", "ch6-ml.md", "ch7-eval.md", "ch8-project.md", "exam-tips.md",
];

// Ngân hàng trắc nghiệm theo chương. Câu có phần "::: code" là câu đoán output:
// bộ kiểm tra chạy đoạn code và so sánh output với đáp án đúng.
export const QUIZ_FILES = ["quizzes.md", "quizzes-output.md"];

export const TOPICS = {
  basics: { name: "Python cơ bản", chapter: 2 },
  algo: { name: "Thuật toán & logic", chapter: 2 },
  string: { name: "Chuỗi & mã hoá", chapter: 2 },
  collections: { name: "List / Dict / Set", chapter: 2 },
  numpy: { name: "NumPy", chapter: 3 },
  io: { name: "Nhập & tải dữ liệu", chapter: 3 },
  pandas: { name: "Pandas", chapter: 4 },
  viz: { name: "Trực quan hoá", chapter: 5 },
  ml: { name: "Học máy", chapter: 6 },
  eval: { name: "Đánh giá mô hình", chapter: 7 },
};
export const LEVELS = { easy: "Dễ", medium: "Trung bình", hard: "Khó" };

export function parseBlocks(text) {
  const items = [];
  let cur = null;
  let sec = null;
  for (const line of text.split(/\r?\n/)) {
    let m = line.match(/^=====\s+(\S+)\s*$/);
    if (m) {
      cur = { id: m[1], meta: {}, sections: {} };
      items.push(cur);
      sec = null;
      continue;
    }
    if (!cur) continue;
    m = line.match(/^:::\s+(\w+)\s*$/);
    if (m) {
      sec = m[1];
      cur.sections[sec] = [];
      continue;
    }
    if (!sec) {
      m = line.match(/^@(\w+):\s*(.*)$/);
      if (m) cur.meta[m[1]] = m[2].trim();
      continue;
    }
    cur.sections[sec].push(line);
  }
  for (const it of items) {
    for (const k of Object.keys(it.sections)) {
      it.sections[k] = it.sections[k].join("\n").replace(/^\s*\n/, "").replace(/\s+$/, "");
    }
  }
  return items;
}

const lines = (s) => (s || "").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));

function parseTest(line, hidden) {
  if (line === "-") return { args: "", hidden }; // hàm không có tham số
  if (line.startsWith("==> ")) return { args: "", expect: line.slice(4).trim(), hidden };
  const i = line.indexOf(" ==> ");
  if (i < 0) return { args: line, hidden };
  return { args: line.slice(0, i).trim(), expect: line.slice(i + 5).trim(), hidden };
}

export function toProblem(b, file) {
  const s = b.sections;
  return {
    id: b.id,
    file,
    title: b.meta.title || b.id,
    level: b.meta.level || "easy",
    topic: b.meta.topic || "basics",
    source: b.meta.source || (b.meta.unit ? "Bài tập theo bài học" : "Bổ sung"),
    fn: b.meta.fn || null,
    unit: b.meta.unit || null,
    compare: b.meta.compare || "default",
    statement: s.statement || "",
    starter: s.starter || "",
    solution: s.solution || "",
    check: s.check || "",
    // Mỗi dòng test: "<tham số>" hoặc "<tham số> ==> <kết quả mong đợi>" (để kiểm tra lời giải mẫu)
    tests: [
      ...lines(s.tests).map((l) => parseTest(l, false)),
      ...lines(s.hidden).map((l) => parseTest(l, true)),
    ],
    hints: (s.hints || "").split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2)),
    explain: s.explain || "",
  };
}

export function toQuiz(b) {
  const opts = (b.sections.options || "").split("\n").filter((l) => l.trim());
  const code = b.sections.code || "";
  return {
    id: b.id,
    chapter: Number(b.meta.chapter || 0),
    question: (b.sections.question || "") + (code ? "\n\n```py\n" + code + "\n```" : ""),
    code,
    options: opts.map((o) => o.replace(/^\*\s?/, "")),
    answer: opts.findIndex((o) => o.startsWith("*")),
    explain: b.sections.explain || "",
  };
}

// Câu hỏi nhanh viết ngay trong bài học:
//   ??
//   nội dung câu hỏi (Markdown, nhiều dòng)
//   - [ ] phương án sai
//   - [x] phương án đúng
//   > giải thích
const OPT = /^- \[( |x)\] (.*)$/;

function extractQuizzes(body, unitId, chapter) {
  const out = [];
  const quizzes = [];
  const ls = body.split("\n");
  for (let i = 0; i < ls.length; i++) {
    if (ls[i].trim() !== "??") {
      out.push(ls[i]);
      continue;
    }
    const q = { id: `${unitId}.${quizzes.length + 1}`, chapter, unit: unitId, question: [], options: [], answer: -1, explain: [] };
    i++;
    while (i < ls.length && !OPT.test(ls[i])) q.question.push(ls[i++]);
    while (i < ls.length && OPT.test(ls[i])) {
      const m = ls[i++].match(OPT);
      if (m[1] === "x") q.answer = q.options.length;
      q.options.push(m[2]);
    }
    while (i < ls.length && /^>/.test(ls[i])) q.explain.push(ls[i++].replace(/^> ?/, ""));
    i--;
    q.question = q.question.join("\n").trim();
    q.explain = q.explain.join("\n").trim();
    out.push("", `<div class="quiz-slot" data-qi="${quizzes.length}"></div>`, "");
    quizzes.push(q);
  }
  return { body: out.join("\n"), quizzes };
}

// Bài giảng = phần mở đầu chương + nhiều bài nhỏ:
//   @@@ c2-1 | Tên bài nhỏ
//   @goal: mục tiêu học tập
//   @practice: b01, gk02      (bài luyện thêm trong ngân hàng)
export function toLesson(text, file) {
  const m = text.match(/^@title:\s*(.*)\n(?:@chapter:\s*(.*)\n)?(?:@summary:\s*(.*)\n)?/);
  const chapter = m && m[2] ? Number(m[2]) : null;
  const rest = m ? text.slice(m[0].length) : text;
  const parts = rest.split(/^@@@\s+/m);
  const units = parts.slice(1).map((part) => {
    const nl = part.indexOf("\n");
    const head = part.slice(0, nl < 0 ? undefined : nl);
    const [id, title] = head.split("|").map((x) => x.trim());
    const ls = (nl < 0 ? "" : part.slice(nl + 1)).split("\n");
    const meta = {};
    while (ls.length && /^@\w+:/.test(ls[0])) {
      const mm = ls.shift().match(/^@(\w+):\s*(.*)$/);
      meta[mm[1]] = mm[2].trim();
    }
    const { body, quizzes } = extractQuizzes(ls.join("\n"), id, chapter);
    return {
      id, title, chapter, lesson: file.replace(/\.md$/, ""),
      goal: meta.goal || "",
      ftu: meta.ftu || "",
      practice: (meta.practice || "").split(",").map((x) => x.trim()).filter(Boolean),
      body: body.trim(),
      quizzes,
    };
  });
  return {
    id: file.replace(/\.md$/, ""),
    title: m ? m[1] : file,
    chapter,
    summary: m && m[3] ? m[3] : "",
    body: parts[0].trim(),
    units,
  };
}

/** Trình duyệt: tải toàn bộ nội dung. */
export async function loadContent(base = "content/") {
  const get = (p) => fetch(base + p).then((r) => {
    if (!r.ok) throw new Error("Không tải được " + p);
    return r.text();
  });
  const [probTexts, lessonTexts, quizTexts] = await Promise.all([
    Promise.all(PROBLEM_FILES.map((f) => get("problems/" + f))),
    Promise.all(LESSON_FILES.map((f) => get("lessons/" + f))),
    Promise.all(QUIZ_FILES.map((f) => get(f))),
  ]);
  const problems = probTexts.flatMap((t, i) => parseBlocks(t).map((b) => toProblem(b, PROBLEM_FILES[i])));
  const lessons = lessonTexts.map((t, i) => toLesson(t, LESSON_FILES[i]));
  const units = lessons.flatMap((l) => l.units);
  // câu hỏi trong bài học trước, sau đó là ngân hàng câu hỏi chương
  const quizzes = [...units.flatMap((u) => u.quizzes), ...quizTexts.flatMap((t) => parseBlocks(t).map(toQuiz))];
  return { problems, lessons, units, quizzes };
}
