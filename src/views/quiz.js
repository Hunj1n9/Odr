import { app } from "../state.js";
import { store } from "../store.js";
import { mountQuiz } from "../quizbox.js";
import { $, esc, setCrumbs, shuffle } from "../ui.js";

const ROUND = 20;

const CHAPTERS = {
  1: "Giới thiệu Python cho KHDL", 2: "Python cơ bản", 3: "Nhập & tải dữ liệu, NumPy", 4: "Pandas",
  5: "Trực quan hoá", 6: "Học máy cơ bản", 7: "Đánh giá & tinh chỉnh mô hình", 8: "Dự án phân tích dữ liệu",
};

export function quizListView(view) {
  setCrumbs([["Trắc nghiệm"]]);
  const d = store.data;
  const chapters = [...new Set(app.quizzes.map((q) => q.chapter))].sort((a, b) => a - b);
  const wrongCount = app.quizzes.filter((q) => d.quizWrong[q.id]).length;
  view.innerHTML = `
    <h1>Trắc nghiệm kiến thức</h1>
    <p class="muted">${app.quizzes.length} câu hỏi, gồm câu kiểm tra nhanh của từng bài học và câu tổng hợp theo chương. Phần lớn là "đoán output của đoạn code" – kỹ năng đọc code giúp bạn tìm lỗi nhanh khi thi thực hành.</p>
    <div class="row" style="margin:14px 0">
      <a class="btn primary" href="#/quiz/mix">🎲 Đề tổng hợp 30 câu ngẫu nhiên</a>
      ${wrongCount ? `<a class="btn" href="#/quiz/wrong">↻ Ôn lại ${wrongCount} câu từng làm sai</a>` : ""}
    </div>
    <div class="grid cols-3">
      ${chapters.map((c) => {
        const n = app.quizzes.filter((q) => q.chapter === c).length;
        const okN = app.quizzes.filter((q) => q.chapter === c && d.quizOk[q.id]).length;
        const r = d.quiz[c];
        return `<a class="card chapter-card" href="#/quiz/${c}">
          <span class="chapter-num">CHƯƠNG ${c}</span><strong>${esc(CHAPTERS[c] || "")}</strong>
          <span class="muted small">${n} câu · đã đúng ${okN}${r ? ` · lượt gần nhất ${r.last}%` : ""}</span>
          <div class="bar ok"><span style="width:${n ? (okN / n) * 100 : 0}%"></span></div>
        </a>`;
      }).join("")}
    </div>`;
}

export function quizView(view, [key]) {
  let pool;
  let title;
  let note = "";
  if (key === "mix") {
    pool = shuffle(app.quizzes).slice(0, 30);
    title = "Đề tổng hợp 30 câu";
  } else if (key === "wrong") {
    pool = shuffle(app.quizzes.filter((q) => store.data.quizWrong[q.id]));
    title = "Ôn câu từng sai";
  } else {
    // mỗi lượt tối đa 20 câu, ưu tiên câu chưa từng trả lời đúng để không bị ngợp
    const all = app.quizzes.filter((q) => String(q.chapter) === key);
    const fresh = shuffle(all.filter((q) => !store.data.quizOk[q.id]));
    const done = shuffle(all.filter((q) => store.data.quizOk[q.id]));
    pool = [...fresh, ...done].slice(0, ROUND);
    title = `Chương ${key}: ${CHAPTERS[key] || ""}`;
    if (all.length > ROUND) {
      note = `Chương có ${all.length} câu – mỗi lượt lấy ${ROUND} câu, ưu tiên ${fresh.length} câu bạn chưa trả lời đúng. Làm xong bấm "Làm lượt mới".`;
    }
  }
  setCrumbs([["Trắc nghiệm", "#/quiz"], [title]]);
  if (!pool.length) {
    view.innerHTML = `<div class="card">Không có câu hỏi nào. <a href="#/quiz">Quay lại</a></div>`;
    return;
  }
  let answered = 0;
  let correct = 0;
  view.innerHTML = `<div class="lesson">
    <div class="row"><h1 style="margin:0">${esc(title)}</h1><span class="spacer"></span>
      <span class="badge accent" id="score">0/${pool.length}</span></div>
    ${note ? `<p class="muted small">${esc(note)}</p>` : ""}
    <div id="qs" style="margin-top:16px"></div>
    <div id="summary"></div></div>`;
  const qs = $("#qs", view);
  pool.forEach((q, i) => {
    const box = document.createElement("div");
    box.className = "card";
    qs.appendChild(box);
    let counted = false;
    mountQuiz(box, q, {
      label: `Câu ${i + 1}.`,
      onAnswer: (ok) => {
        // chỉ tính điểm lần trả lời đầu tiên
        if (counted) return;
        counted = true;
        answered++;
        if (ok) correct++;
        $("#score", view).textContent = `${correct}/${pool.length}`;
        if (answered === pool.length) finish();
      },
    });
  });

  function finish() {
    const pct = Math.round((correct / pool.length) * 100);
    if (/^\d+$/.test(key)) {
      store.update((d) => {
        const prevBest = d.quiz[key]?.best || 0;
        d.quiz[key] = { best: Math.max(prevBest, pct), last: pct, at: Date.now() };
      });
    }
    store.touch();
    $("#summary", view).innerHTML = `<div class="card" style="text-align:center">
      <div class="score-big">${pct}%</div>
      <p>Đúng ${correct}/${pool.length} câu. ${pct >= 80 ? "Rất tốt! 🎉" : "Ôn lại phần giải thích các câu sai rồi làm lại nhé."}</p>
      <div class="row" style="justify-content:center">
        <a class="btn" href="#/quiz">Danh sách trắc nghiệm</a>
        <button class="btn primary" id="again">Làm lượt mới</button>
      </div></div>`;
    $("#again", view).onclick = () => quizView(view, [key]);
    $("#summary", view).scrollIntoView({ behavior: "smooth" });
  }
}
