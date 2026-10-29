// Nội dung đã tải + các hàm truy vấn dùng chung giữa các trang.
import { TOPICS } from "./content.js";
import { store } from "./store.js";

export const app = { problems: [], lessons: [], units: [], quizzes: [], byId: new Map() };

export const SETS = [
  { key: "lesson", short: "lesson", name: "Bài tập theo bài học", desc: "Bài nhỏ đi kèm từng bài giảng – làm ngay sau khi học lý thuyết", match: (p) => !!p.unit },
  { key: "01-basics.md", short: "basics", name: "Khởi động Python", desc: "20 bài nền tảng: chuỗi, list, dict, hàm, tài chính cơ bản" },
  { key: "02-midterm.md", short: "midterm", name: "Đề giữa kì (34 câu)", desc: "Toàn bộ đề giữa kỳ TIN314 dạng CodeRunner" },
  { key: "08-ftu-exam.md", short: "ftu", name: "Dạng đề thi thật FTU", desc: "18 bài mô phỏng đúng dạng câu hỏi của đề cuối kỳ TIN314 các năm (2024–2025, đề mẫu, hè 2025)" },
  { key: "03-collection.md", short: "collection", name: "Tuyển tập 30 bài", desc: "Adventure in the Ancient Temple of Python + 24h sinh viên trường F" },
  { key: "04-numpy.md", short: "numpy", name: "NumPy", desc: "Mảng, vector hoá, thống kê, đại số tuyến tính" },
  { key: "05-pandas.md", short: "pandas", name: "Pandas", desc: "Đọc, làm sạch, lọc, groupby, merge, pivot" },
  { key: "06-viz.md", short: "viz", name: "Trực quan hoá", desc: "Matplotlib: line, bar, hist, scatter, subplots" },
  { key: "07-ml.md", short: "ml", name: "Học máy & đánh giá", desc: "scikit-learn: hồi quy, phân loại, phân cụm, metrics" },
];

export const setOf = (p) => SETS.find((s) => (s.match ? s.match(p) : s.key === p.file));
export const chapterOf = (p) => (p.unit ? Number(p.unit.match(/^c(\d+)/)?.[1]) : null) ?? TOPICS[p.topic]?.chapter ?? 2;

// ---------- bài học nhỏ ----------
const words = (t) => new Set((t || "").toLowerCase().match(/[\p{L}\p{N}_]{3,}/gu) || []);

// Bài học liên quan đến một bài luyện code: bài gắn trực tiếp, hoặc bài cùng chương có từ khoá trùng nhiều nhất.
export function relatedUnits(p, limit = 3) {
  const own = p.unit && app.units.find((u) => u.id === p.unit);
  if (own) return [own];
  const ch = chapterOf(p);
  const pw = words(`${p.title} ${p.fn || ""} ${p.statement || ""}`);
  return app.units.filter((u) => u.chapter === ch)
    .map((u) => ({ u, score: [...words(`${u.title} ${u.goal || ""}`)].filter((w) => pw.has(w)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.u);
}

export const unitExercises = (u) => app.problems.filter((p) => p.unit === u.id);
export const unitNo = (u) => `${u.chapter}.${app.units.filter((x) => x.chapter === u.chapter).indexOf(u) + 1}`;

export function unitProgress(u) {
  const d = store.data;
  const ex = unitExercises(u);
  return {
    quizOk: u.quizzes.filter((q) => d.quizOk[q.id]).length,
    quizTotal: u.quizzes.length,
    exOk: ex.filter((p) => d.solved[p.id]).length,
    exTotal: ex.length,
    done: !!d.units[u.id],
  };
}

/** Đánh dấu hoàn thành khi đã đúng hết câu hỏi nhanh và giải hết bài tập. Trả về true nếu vừa hoàn thành. */
export function autoComplete(u) {
  const pr = unitProgress(u);
  if (pr.done || pr.quizOk < pr.quizTotal || pr.exOk < pr.exTotal) return false;
  store.update((d) => { d.units[u.id] = Date.now(); });
  return true;
}

export function nextUnit() {
  return app.units.find((u) => !store.data.units[u.id]) || null;
}

export function specOf(p, { visibleOnly = false } = {}) {
  return {
    fn: p.fn,
    solution: p.solution,
    compare: p.compare,
    check: p.check,
    tests: p.tests.filter((t) => !visibleOnly || !t.hidden).map(({ args, hidden }) => ({ args, hidden })),
  };
}

export function status(id) {
  const d = store.data;
  if (d.solved[id]) return "solved";
  if (d.attempts[id]) return "tried";
  return "new";
}

export function solvedCount(list = app.problems) {
  return list.filter((p) => store.data.solved[p.id]).length;
}

export function nextUnsolved(after) {
  const list = app.problems;
  const start = after ? list.findIndex((p) => p.id === after) + 1 : 0;
  for (let i = 0; i < list.length; i++) {
    const p = list[(start + i) % list.length];
    if (!store.data.solved[p.id]) return p;
  }
  return null;
}
