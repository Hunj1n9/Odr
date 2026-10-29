// Đọc nội dung (bài học, bài tập, trắc nghiệm) từ các file .md trong thư mục content/.
// Định dạng khối:
//   ===== <id>          bắt đầu một mục mới
//   @key: value          metadata (trước phần ::: đầu tiên)
//   ::: section          bắt đầu một phần (statement, starter, solution, tests, hidden, hints, ...)

export const PROBLEM_FILES = [
  "01-basics.md", "02-midterm.md", "03-collection.md", "04-numpy.md",
  "05-pandas.md", "06-viz.md", "07-ml.md",
];
export const LESSON_FILES = [
  "ch1-intro.md", "ch2-python.md", "ch3-io.md", "ch4-pandas.md",
  "ch5-viz.md", "ch6-ml.md", "ch7-eval.md", "ch8-project.md", "exam-tips.md",
];

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
    source: b.meta.source || "Bổ sung",
    fn: b.meta.fn || null,
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
  return {
    id: b.id,
    chapter: Number(b.meta.chapter || 0),
    question: b.sections.question || "",
    options: opts.map((o) => o.replace(/^\*\s?/, "")),
    answer: opts.findIndex((o) => o.startsWith("*")),
    explain: b.sections.explain || "",
  };
}

export function toLesson(text, file) {
  const m = text.match(/^@title:\s*(.*)\n(?:@chapter:\s*(.*)\n)?(?:@summary:\s*(.*)\n)?/);
  return {
    id: file.replace(/\.md$/, ""),
    title: m ? m[1] : file,
    chapter: m && m[2] ? Number(m[2]) : null,
    summary: m && m[3] ? m[3] : "",
    body: m ? text.slice(m[0].length) : text,
  };
}

/** Trình duyệt: tải toàn bộ nội dung. */
export async function loadContent(base = "content/") {
  const get = (p) => fetch(base + p).then((r) => {
    if (!r.ok) throw new Error("Không tải được " + p);
    return r.text();
  });
  const [probTexts, lessonTexts, quizText] = await Promise.all([
    Promise.all(PROBLEM_FILES.map((f) => get("problems/" + f))),
    Promise.all(LESSON_FILES.map((f) => get("lessons/" + f))),
    get("quizzes.md"),
  ]);
  const problems = probTexts.flatMap((t, i) => parseBlocks(t).map((b) => toProblem(b, PROBLEM_FILES[i])));
  const lessons = lessonTexts.map((t, i) => toLesson(t, LESSON_FILES[i]));
  const quizzes = parseBlocks(quizText).map(toQuiz);
  return { problems, lessons, quizzes };
}
