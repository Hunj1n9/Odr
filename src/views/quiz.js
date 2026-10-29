import { app } from "../state.js";
import { store } from "../store.js";
import { $, esc, highlightIn, md, setCrumbs, shuffle } from "../ui.js";

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
    <p class="muted">Phần lớn là câu "đoán output của đoạn code" – kỹ năng đọc code giúp bạn tìm lỗi nhanh khi thi thực hành.</p>
    <div class="row" style="margin:14px 0">
      <a class="btn primary" href="#/quiz/mix">🎲 Đề tổng hợp 20 câu ngẫu nhiên</a>
      ${wrongCount ? `<a class="btn" href="#/quiz/wrong">↻ Ôn lại ${wrongCount} câu từng làm sai</a>` : ""}
    </div>
    <div class="grid cols-3">
      ${chapters.map((c) => {
        const n = app.quizzes.filter((q) => q.chapter === c).length;
        const r = d.quiz[c];
        return `<a class="card chapter-card" href="#/quiz/${c}">
          <span class="chapter-num">CHƯƠNG ${c}</span><strong>${esc(CHAPTERS[c] || "")}</strong>
          <span class="muted small">${n} câu${r ? ` · cao nhất ${r.best}% · lần cuối ${r.last}%` : ""}</span>
          ${r ? `<div class="bar ok"><span style="width:${r.best}%"></span></div>` : ""}
        </a>`;
      }).join("")}
    </div>`;
}

export function quizView(view, [key]) {
  let pool;
  let title;
  if (key === "mix") {
    pool = shuffle(app.quizzes).slice(0, 20);
    title = "Đề tổng hợp";
  } else if (key === "wrong") {
    pool = shuffle(app.quizzes.filter((q) => store.data.quizWrong[q.id]));
    title = "Ôn câu từng sai";
  } else {
    pool = shuffle(app.quizzes.filter((q) => String(q.chapter) === key));
    title = `Chương ${key}: ${CHAPTERS[key] || ""}`;
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
    <div id="qs" style="margin-top:16px"></div>
    <div id="summary"></div></div>`;
  const qs = $("#qs", view);
  pool.forEach((q0, i) => {
    // đảo thứ tự phương án để không "học thuộc vị trí" đáp án
    const order = shuffle(q0.options.map((_, j) => j));
    const q = { ...q0, options: order.map((j) => q0.options[j]), answer: order.indexOf(q0.answer) };
    const box = document.createElement("div");
    box.className = "card quiz-q";
    box.innerHTML = `<div class="md"><b>Câu ${i + 1}.</b> ${md(q.question)}</div>
      <div class="quiz-opts">${q.options.map((o, j) => `<button class="quiz-opt" data-j="${j}"><b>${"ABCDEF"[j]}.</b> ${md(o).replace(/^<p>|<\/p>\s*$/g, "")}</button>`).join("")}</div>
      <div class="quiz-explain md" hidden></div>`;
    qs.appendChild(box);
    highlightIn(box);
    box.querySelectorAll(".quiz-opt").forEach((btn) => {
      btn.onclick = () => {
        const j = Number(btn.dataset.j);
        const ok = j === q.answer;
        box.querySelectorAll(".quiz-opt").forEach((b) => {
          b.disabled = true;
          const bj = Number(b.dataset.j);
          if (bj === q.answer) b.classList.add("right");
          else if (bj === j) b.classList.add("wrong");
        });
        const ex = box.querySelector(".quiz-explain");
        ex.hidden = false;
        ex.innerHTML = `<b>${ok ? "✓ Chính xác." : "✗ Chưa đúng."}</b> ${md(q.explain)}`;
        highlightIn(ex);
        answered++;
        if (ok) correct++;
        store.update((d) => {
          if (ok) delete d.quizWrong[q.id];
          else d.quizWrong[q.id] = (d.quizWrong[q.id] || 0) + 1;
        });
        $("#score", view).textContent = `${correct}/${pool.length}`;
        if (answered === pool.length) finish();
      };
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
        <button class="btn primary" id="again">Làm lại (đảo câu)</button>
      </div></div>`;
    $("#again", view).onclick = () => quizView(view, [key]);
    $("#summary", view).scrollIntoView({ behavior: "smooth" });
  }
}
