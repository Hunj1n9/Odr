// Một câu hỏi trắc nghiệm (dùng ở trang Trắc nghiệm và xen giữa bài học).
import { store } from "./store.js";
import { highlightIn, md, shuffle } from "./ui.js";

/** Gắn câu hỏi q vào box. onAnswer(ok) được gọi sau khi chọn. */
export function mountQuiz(box, q0, { label = "", onAnswer } = {}) {
  // đảo thứ tự phương án để không "học thuộc vị trí" đáp án
  const order = shuffle(q0.options.map((_, j) => j));
  const q = { ...q0, options: order.map((j) => q0.options[j]), answer: order.indexOf(q0.answer) };
  const before = !!store.data.quizOk[q.id];
  box.classList.add("quiz-q");
  box.innerHTML = `${label ? `<div class="quiz-head"><span class="tag tag-ask">${label.replace(/:$/, "")}</span><span class="muted small">Chọn một đáp án</span></div>` : ""}<div class="md">${md(q.question)}</div>
    <div class="quiz-opts">${q.options.map((o, j) => `<button class="quiz-opt" data-j="${j}"><b>${"ABCDEF"[j]}.</b> ${md(o).replace(/^<p>|<\/p>\s*$/g, "")}</button>`).join("")}</div>
    <div class="quiz-explain md" hidden></div>
    ${before ? `<div class="muted small quiz-prev">✓ Bạn đã trả lời đúng câu này trước đây</div>` : ""}`;
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
      box.querySelector(".quiz-prev")?.remove();
      const ex = box.querySelector(".quiz-explain");
      ex.hidden = false;
      ex.innerHTML = `<b>${ok ? "✓ Chính xác." : "✗ Chưa đúng."}</b> ${md(q.explain || "")}
        ${ok ? "" : `<button class="btn small ghost retry">Thử lại câu này</button>`}`;
      highlightIn(ex);
      const retry = ex.querySelector(".retry");
      if (retry) retry.onclick = () => mountQuiz(box, q0, { label, onAnswer });
      store.update((d) => {
        if (ok) {
          delete d.quizWrong[q.id];
          d.quizOk[q.id] = d.quizOk[q.id] || Date.now();
        } else d.quizWrong[q.id] = (d.quizWrong[q.id] || 0) + 1;
      });
      onAnswer?.(ok);
    };
  });
}
