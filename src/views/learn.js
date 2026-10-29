import { mountExercise } from "../exercise.js";
import { mountQuiz } from "../quizbox.js";
import { app, autoComplete, chapterOf, nextUnit, unitExercises, unitNo, unitProgress } from "../state.js";
import { store } from "../store.js";
import { $, esc, levelBadge, md, renderMarkdownInto, setCrumbs, toast } from "../ui.js";

const chapters = () => app.lessons.filter((l) => l.chapter);
const doneCount = (l) => l.units.filter((u) => store.data.units[u.id]).length;

export function learnListView(view) {
  setCrumbs([["Bài giảng"]]);
  const total = app.units.length;
  const done = app.units.filter((u) => store.data.units[u.id]).length;
  const nu = nextUnit();
  view.innerHTML = `
    <h1>Bài giảng theo đề cương TIN314</h1>
    <p class="muted">8 chương theo đề cương, chia thành <b>${total} bài nhỏ</b>. Mỗi bài chỉ một ý chính (10–20 phút):
      đọc lý thuyết ngắn → chạy ví dụ → trả lời câu hỏi nhanh → làm bài tập ngay trong trang.</p>
    <div class="card row" style="margin:14px 0">
      <div style="flex:1;min-width:200px">
        <b>Tiến độ: ${done}/${total} bài nhỏ</b>
        <div class="bar ok" style="margin-top:6px"><span style="width:${total ? (done / total) * 100 : 0}%"></span></div>
      </div>
      ${nu ? `<a class="btn primary" href="#/learn/${nu.lesson}/${nu.id}">Học tiếp: Bài ${unitNo(nu)} – ${esc(nu.title)}</a>` : `<span class="badge solved">Đã học hết tất cả bài!</span>`}
    </div>
    <div class="grid cols-2">
      ${chapters().map((l) => {
        const n = l.units.length;
        const ok = doneCount(l);
        const cont = l.units.find((u) => !store.data.units[u.id]);
        return `<div class="card chapter-card">
          <a href="#/learn/${l.id}" class="chapter-link">
            <span class="chapter-num">CHƯƠNG ${l.chapter} · ${n} bài nhỏ${ok === n && n ? " · ✓ xong" : ""}</span>
            <strong>${esc(l.title)}</strong>
          </a>
          <span class="muted small">${esc(l.summary)}</span>
          <div class="unit-pills">${l.units.map((u) => `<a href="#/learn/${l.id}/${u.id}" title="${esc(unitNo(u) + " " + u.title)}"
            class="${store.data.units[u.id] ? "done" : ""}">${unitNo(u).split(".")[1]}</a>`).join("")}</div>
          <div class="row">
            <div class="bar ok" style="flex:1"><span style="width:${n ? (ok / n) * 100 : 0}%"></span></div>
            <span class="muted small">${ok}/${n}</span>
            ${cont ? `<a class="btn small" href="#/learn/${l.id}/${cont.id}">${ok ? "Tiếp tục" : "Bắt đầu"} →</a>` : ""}
          </div>
        </div>`;
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
  setCrumbs([["Bài giảng", "#/learn"], [lesson.chapter ? `Chương ${lesson.chapter}` : lesson.title]]);
  if (!lesson.units.length) {
    view.innerHTML = `<article class="lesson"><h1>${esc(lesson.title)}</h1><div class="body"></div></article>`;
    renderMarkdownInto($(".body", view), lesson.body, { runnable: true });
    return;
  }
  const d = store.data;
  const ps = app.problems.filter((p) => !p.unit && chapterOf(p) === lesson.chapter);
  const nq = app.quizzes.filter((q) => q.chapter === lesson.chapter).length;
  const cont = lesson.units.find((u) => !d.units[u.id]) || lesson.units[0];
  view.innerHTML = `<article class="lesson">
    <span class="chapter-num">CHƯƠNG ${lesson.chapter}</span>
    <h1>${esc(lesson.title)}</h1>
    <div class="body"></div>
    <div class="row" style="margin:16px 0">
      <a class="btn primary" href="#/learn/${lesson.id}/${cont.id}">${doneCount(lesson) ? "Học tiếp" : "Bắt đầu"}: Bài ${unitNo(cont)}</a>
      <span class="muted small">${doneCount(lesson)}/${lesson.units.length} bài đã xong</span>
    </div>
    <h2>Lộ trình chương</h2>
    <ol class="roadmap">
      ${lesson.units.map((u) => {
        const pr = unitProgress(u);
        return `<li class="${pr.done ? "done" : ""}">
          <a href="#/learn/${lesson.id}/${u.id}">
            <span class="rm-no">${pr.done ? "✓" : unitNo(u)}</span>
            <span class="rm-body"><b>${esc(u.title)}</b>
              ${u.goal ? `<span class="muted small">${md(u.goal).replace(/^<p>|<\/p>\s*$/g, "")}</span>` : ""}
              <span class="rm-meta">${pr.quizTotal ? `<span>? ${pr.quizOk}/${pr.quizTotal} câu hỏi</span>` : ""}${pr.exTotal ? `<span>${pr.exOk}/${pr.exTotal} bài tập</span>` : ""}</span>
            </span>
          </a></li>`;
      }).join("")}
    </ol>
    <div class="card row" style="margin-top:20px">
      <span>Học xong cả chương?</span><span class="spacer"></span>
      ${nq ? `<a class="btn" href="#/quiz/${lesson.chapter}">? Trắc nghiệm chương (${nq} câu)</a>` : ""}
      ${ps.length ? `<a class="btn" href="#/problems?ch=${lesson.chapter}">${ps.length} bài luyện thêm</a>` : ""}
    </div>
  </article>`;
  renderMarkdownInto($(".body", view), lesson.body, { runnable: true });
}

export function unitView(view, [lid, uid]) {
  const lesson = app.lessons.find((l) => l.id === lid);
  const u = lesson?.units.find((x) => x.id === uid);
  if (!u) {
    view.innerHTML = `<div class="card">Không tìm thấy bài học. <a href="#/learn">Về danh sách</a></div>`;
    return;
  }
  setCrumbs([["Bài giảng", "#/learn"], [`Chương ${lesson.chapter}`, `#/learn/${lesson.id}`], [`Bài ${unitNo(u)}`]]);
  const all = app.units;
  const i = all.indexOf(u);
  const prev = all[i - 1];
  const next = all[i + 1];
  const exercises = unitExercises(u);
  const practice = u.practice.map((pid) => app.byId.get(pid)).filter(Boolean);

  view.innerHTML = `<article class="lesson unit">
    <nav class="stepper" aria-label="Các bài trong chương">
      ${lesson.units.map((x) => `<a href="#/learn/${lesson.id}/${x.id}" title="${esc(unitNo(x) + " " + x.title)}"
        class="${x === u ? "cur" : ""} ${store.data.units[x.id] ? "done" : ""}">${unitNo(x).split(".")[1]}</a>`).join("")}
    </nav>
    <span class="chapter-num">CHƯƠNG ${lesson.chapter} · BÀI ${unitNo(u)}</span>
    <h1>${esc(u.title)}</h1>
    ${u.goal ? `<div class="goal"><b>Sau bài này bạn sẽ:</b> ${md(u.goal).replace(/^<p>|<\/p>\s*$/g, "")}</div>` : ""}
    ${u.ftu ? `<p class="muted small ftu-src"><b>Theo tài liệu FTU:</b> ${md(u.ftu).replace(/^<p>|<\/p>\s*$/g, "")}</p>` : ""}
    <div class="body"></div>
    ${exercises.length ? `<h2>Thực hành ngay</h2>
      <p class="muted small">Viết code vào ô bên dưới, bấm <b>Chạy thử</b> để xem kết quả, rồi <b>Nộp & chấm</b> để chạy cả test ẩn.</p>
      <div class="exercises"></div>` : ""}
    ${practice.length ? `<h3>Luyện thêm cùng chủ đề</h3>
      <div class="plist card" style="padding:0">${practice.map((p) => `<a class="prow" href="#/p/${p.id}">
        <span class="st ${store.data.solved[p.id] ? "ok" : ""}">${store.data.solved[p.id] ? "✓" : "○"}</span>
        <span><span class="t">${esc(p.title)}</span><div class="sub">${esc(p.source)}</div></span>
        <span class="meta">${levelBadge(p.level)}</span></a>`).join("")}</div>` : ""}
    <div class="card finish" id="finish"></div>
    <div class="row" style="margin-top:16px">
      ${prev ? `<a class="btn ghost" href="#/learn/${prev.lesson}/${prev.id}">← ${unitNo(prev)} ${esc(prev.title)}</a>` : ""}
      <span class="spacer"></span>
      ${next ? `<a class="btn ghost" href="#/learn/${next.lesson}/${next.id}">${unitNo(next)} ${esc(next.title)} →</a>` : ""}
    </div>
  </article>`;

  const finish = $("#finish", view);
  const drawFinish = () => {
    const pr = unitProgress(u);
    const left = [];
    if (pr.quizOk < pr.quizTotal) left.push(`${pr.quizTotal - pr.quizOk} câu hỏi nhanh chưa đúng`);
    if (pr.exOk < pr.exTotal) left.push(`${pr.exTotal - pr.exOk} bài tập chưa giải`);
    finish.innerHTML = `<div class="row">
      <div style="flex:1;min-width:200px">
        ${pr.done ? `<b class="ok-text">✓ Bạn đã hoàn thành bài này</b>` : `<b>Kiểm tra trước khi qua bài</b>`}
        <div class="muted small">${pr.quizTotal ? `Câu hỏi nhanh: ${pr.quizOk}/${pr.quizTotal} đúng` : ""}${pr.quizTotal && pr.exTotal ? " · " : ""}${pr.exTotal ? `Bài tập: ${pr.exOk}/${pr.exTotal} đã giải` : ""}
        ${!pr.done && left.length ? `<br>Còn: ${left.join(", ")}.` : ""}</div>
      </div>
      ${pr.done ? "" : `<button class="btn ${left.length ? "" : "primary"}" id="mark">${left.length ? "Vẫn đánh dấu đã học" : "✓ Hoàn thành bài"}</button>`}
      ${next ? `<a class="btn ${pr.done ? "primary" : "ghost"}" href="#/learn/${next.lesson}/${next.id}">Bài tiếp →</a>` : `<a class="btn" href="#/exam">Thi thử</a>`}
    </div>`;
    const mark = $("#mark", finish);
    if (mark) {
      mark.onclick = () => {
        store.update((d) => { d.units[u.id] = Date.now(); });
        store.touch();
        toast("Đã lưu tiến độ ✓");
        refresh();
      };
    }
  };
  const refreshStepper = () => {
    view.querySelectorAll(".stepper a").forEach((a, k) => a.classList.toggle("done", !!store.data.units[lesson.units[k].id]));
  };
  const refresh = () => {
    if (autoComplete(u)) toast("Hoàn thành bài " + unitNo(u) + "!");
    drawFinish();
    refreshStepper();
  };

  const body = $(".body", view);
  renderMarkdownInto(body, u.body, { runnable: true });
  body.querySelectorAll(".quiz-slot").forEach((slot) => {
    const q = u.quizzes[Number(slot.dataset.qi)];
    slot.className = "card quick-check";
    mountQuiz(slot, q, { label: "Kiểm tra nhanh:", onAnswer: refresh });
  });

  const cleanups = [];
  const exWrap = $(".exercises", view);
  exercises.forEach((p, k) => {
    const el = document.createElement("div");
    exWrap.appendChild(el);
    cleanups.push(mountExercise(el, p, { label: `Bài ${k + 1}`, onSolved: refresh }));
  });
  drawFinish();
  return () => cleanups.forEach((f) => f());
}
