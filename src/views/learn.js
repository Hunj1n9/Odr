import { app, chapterOf } from "../state.js";
import { store } from "../store.js";
import { esc, renderMarkdownInto, setCrumbs, toast } from "../ui.js";

export function learnListView(view) {
  setCrumbs([["Bài giảng"]]);
  const d = store.data;
  const lessons = app.lessons.filter((l) => l.chapter);
  view.innerHTML = `
    <h1>Bài giảng theo đề cương TIN314</h1>
    <p class="muted">8 chương đúng theo đề cương chi tiết học phần. Mọi đoạn code đều <b>chạy được và sửa được</b> ngay trên trang.</p>
    <div class="grid cols-3" style="margin-top:16px">
      ${lessons.map((l) => {
        const ps = app.problems.filter((p) => chapterOf(p) === l.chapter);
        const ok = ps.filter((p) => d.solved[p.id]).length;
        return `<a class="card chapter-card" href="#/learn/${l.id}">
          <span class="chapter-num">CHƯƠNG ${l.chapter}${d.read[l.id] ? " · ✓ đã học" : ""}</span>
          <strong>${esc(l.title)}</strong>
          <span class="muted small">${esc(l.summary)}</span>
          ${ps.length ? `<span class="muted small">Bài tập: ${ok}/${ps.length}</span><div class="bar ok"><span style="width:${(ok / ps.length) * 100}%"></span></div>` : ""}
        </a>`;
      }).join("")}
      <a class="card chapter-card" href="#/learn/exam-tips">
        <span class="chapter-num">ÔN THI</span><strong>Bí kíp thi thực hành CodeRunner</strong>
        <span class="muted small">Các lỗi mất điểm phổ biến, checklist trước khi nộp, mẫu code cần thuộc.</span>
      </a>
    </div>`;
}

export function lessonView(view, [id = "exam-tips"]) {
  const lesson = app.lessons.find((l) => l.id === id);
  if (!lesson) {
    view.innerHTML = `<div class="card">Không tìm thấy bài giảng.</div>`;
    return;
  }
  setCrumbs([["Bài giảng", "#/learn"], [lesson.title]]);
  const all = app.lessons.filter((l) => l.chapter);
  const idx = all.findIndex((l) => l.id === id);
  const prev = all[idx - 1];
  const next = all[idx + 1];
  const ps = lesson.chapter ? app.problems.filter((p) => chapterOf(p) === lesson.chapter) : [];
  const hasQuiz = app.quizzes.some((q) => q.chapter === lesson.chapter);
  const read = !!store.data.read[id];

  view.innerHTML = `<article class="lesson">
    ${lesson.chapter ? `<span class="chapter-num">CHƯƠNG ${lesson.chapter}</span>` : ""}
    <h1>${esc(lesson.title)}</h1>
    <div class="body"></div>
    <div class="card" style="margin-top:24px">
      <div class="row">
        <button class="btn ${read ? "success" : "primary"}" id="mark">${read ? "✓ Đã học xong" : "Đánh dấu đã học xong"}</button>
        ${ps.length ? `<a class="btn" href="#/problems?ch=${lesson.chapter}">⌨ Luyện ${ps.length} bài tập chương này</a>` : ""}
        ${hasQuiz ? `<a class="btn" href="#/quiz/${lesson.chapter}">? Trắc nghiệm chương ${lesson.chapter}</a>` : ""}
      </div>
    </div>
    <div class="row" style="margin-top:16px">
      ${prev ? `<a class="btn ghost" href="#/learn/${prev.id}">← ${esc(prev.title)}</a>` : ""}
      <span class="spacer"></span>
      ${next ? `<a class="btn ghost" href="#/learn/${next.id}">${esc(next.title)} →</a>` : ""}
    </div>
  </article>`;
  renderMarkdownInto(view.querySelector(".body"), lesson.body, { runnable: true });
  view.querySelector("#mark").onclick = (e) => {
    store.update((d) => {
      d.read[id] = Date.now();
    });
    store.touch();
    e.target.className = "btn success";
    e.target.textContent = "✓ Đã học xong";
    toast("Tuyệt! Đã lưu tiến độ.");
  };
}
