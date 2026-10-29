// Lưu tiến độ học trong localStorage của trình duyệt (chỉ trên máy này).
const KEY = "tin314.progress.v1";

const blank = () => ({
  solved: {},     // id -> thời điểm giải đúng lần đầu
  attempts: {},   // id -> số lần nộp
  best: {},       // id -> tỉ lệ test đúng cao nhất (0..1)
  code: {},       // id -> code đang làm
  revealed: {},   // id -> đã xem lời giải
  quiz: {},       // chương -> {best, last, total}
  quizWrong: {},  // id câu hỏi -> số lần sai
  quizOk: {},     // id câu hỏi -> thời điểm trả lời đúng
  units: {},      // id bài học nhỏ -> thời điểm hoàn thành
  exams: [],      // lịch sử thi thử
  exam: null,     // bài thi đang làm dở
  read: {},       // bài giảng đã học
  activity: {},   // ngày -> số hoạt động
  cells: null,    // ô code của Sổ tay Python
});

function load() {
  try {
    return { ...blank(), ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return blank();
  }
}

let data = load();
const listeners = new Set();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* hết dung lượng hoặc chế độ ẩn danh – bỏ qua */
  }
  for (const fn of listeners) fn(data);
}

export const store = {
  get data() {
    return data;
  },
  update(fn) {
    fn(data);
    save();
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  touch() {
    const day = new Date().toISOString().slice(0, 10);
    data.activity[day] = (data.activity[day] || 0) + 1;
    save();
  },
  streak() {
    let n = 0;
    const d = new Date();
    for (;;) {
      const key = d.toISOString().slice(0, 10);
      if (!data.activity[key]) {
        if (n === 0 && d.toDateString() === new Date().toDateString()) {
          d.setDate(d.getDate() - 1);
          continue;
        }
        return n;
      }
      n++;
      d.setDate(d.getDate() - 1);
    }
  },
  exportJson() {
    return JSON.stringify(data, null, 1);
  },
  importJson(text) {
    data = { ...blank(), ...JSON.parse(text) };
    save();
  },
  reset() {
    data = blank();
    save();
  },
};
