// Nội dung đã tải + các hàm truy vấn dùng chung giữa các trang.
import { TOPICS } from "./content.js";
import { store } from "./store.js";

export const app = { problems: [], lessons: [], quizzes: [], byId: new Map() };

export const SETS = [
  { key: "01-basics.md", short: "basics", name: "Khởi động Python", desc: "20 bài nền tảng: chuỗi, list, dict, hàm, tài chính cơ bản" },
  { key: "02-midterm.md", short: "midterm", name: "Đề giữa kì (34 câu)", desc: "Toàn bộ đề giữa kỳ TIN314 dạng CodeRunner" },
  { key: "03-collection.md", short: "collection", name: "Tuyển tập 30 bài", desc: "Adventure in the Ancient Temple of Python + 24h sinh viên trường F" },
  { key: "04-numpy.md", short: "numpy", name: "NumPy", desc: "Mảng, vector hoá, thống kê, đại số tuyến tính" },
  { key: "05-pandas.md", short: "pandas", name: "Pandas", desc: "Đọc, làm sạch, lọc, groupby, merge, pivot" },
  { key: "06-viz.md", short: "viz", name: "Trực quan hoá", desc: "Matplotlib: line, bar, hist, scatter, subplots" },
  { key: "07-ml.md", short: "ml", name: "Học máy & đánh giá", desc: "scikit-learn: hồi quy, phân loại, phân cụm, metrics" },
];

export const setOf = (p) => SETS.find((s) => s.key === p.file);
export const chapterOf = (p) => TOPICS[p.topic]?.chapter ?? 2;

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
