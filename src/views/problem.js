import { TOPICS } from "../content.js";
import { gradeProblem, renderGrade } from "../grade.js";
import { app, status, unitNo } from "../state.js";
import { store } from "../store.js";
import { $, $$, createEditor, esc, levelBadge, md, highlightIn, runInto, setCrumbs, toast } from "../ui.js";

export function problemView(view, [id]) {
  const p = app.byId.get(id);
  if (!p) {
    view.innerHTML = `<div class="card">Không tìm thấy bài <code>${esc(id)}</code>. <a href="#/problems">Về danh sách</a></div>`;
    return;
  }
  view.classList.add("wide");
  setCrumbs([["Luyện code", "#/problems"], [p.title]]);
  const idx = app.problems.indexOf(p);
  const prev = app.problems[idx - 1];
  const next = app.problems[idx + 1];
  const saved = store.data.code[id];
  let shownHints = 0;

  view.innerHTML = `
  <div class="row" style="margin-bottom:12px">
    <h1 style="margin:0">${esc(p.title)}</h1>
    ${levelBadge(p.level)}<span class="badge">${esc(TOPICS[p.topic]?.name || p.topic)}</span>
    ${p.unit ? (() => {
      const u = app.units.find((x) => x.id === p.unit);
      return u ? `<a class="badge accent" href="#/learn/${u.lesson}/${u.id}" title="Về bài học">📖 Bài ${unitNo(u)}: ${esc(u.title)}</a>` : "";
    })() : `<span class="badge accent">${esc(p.source)}</span>`}
    <span class="badge solved" id="solved-badge" ${status(id) === "solved" ? "" : "hidden"}>✓ Đã giải</span>
    <span class="spacer"></span>
    ${prev ? `<a class="btn small ghost" href="#/p/${prev.id}" title="${esc(prev.title)}">← Trước</a>` : ""}
    ${next ? `<a class="btn small ghost" href="#/p/${next.id}" title="${esc(next.title)}">Sau →</a>` : ""}
  </div>
  <div class="problem-layout">
    <section class="card problem-left">
      <div class="tabs" id="ltabs">
        <button data-t="statement" class="active">Đề bài</button>
        <button data-t="hints">Gợi ý (${p.hints.length})</button>
        <button data-t="solution">Lời giải</button>
      </div>
      <div id="lpane"></div>
    </section>
    <section>
      <div class="editor tall" id="editor"></div>
      <div class="editor-actions">
        <button class="btn" id="run">▶ Chạy thử <kbd>Ctrl+Enter</kbd></button>
        <button class="btn primary" id="submit">✓ Nộp & chấm <kbd>Ctrl+S</kbd></button>
        <span class="spacer"></span>
        <span class="muted small" id="saved-note">${saved ? "Đã khôi phục code bạn làm dở" : ""}</span>
        <button class="btn small ghost" id="reset" title="Xoá code và bắt đầu lại từ code mẫu">⟲ Làm lại</button>
      </div>
      <div class="tabs" id="rtabs">
        <button data-t="grade" class="active">Kết quả chấm</button>
        <button data-t="out">Output chạy thử</button>
      </div>
      <div id="grade"><p class="muted small">Bấm <b>Nộp & chấm</b> để chạy toàn bộ test (gồm test ẩn). Bấm <b>Chạy thử</b> để chạy code và xem print().</p></div>
      <div id="out" class="output" hidden></div>
    </section>
  </div>`;

  // ------- cột trái
  const lpane = $("#lpane", view);
  const showLeft = (t) => {
    $$("#ltabs button", view).forEach((b) => b.classList.toggle("active", b.dataset.t === t));
    if (t === "statement") {
      lpane.innerHTML = `<div class="md">${md(p.statement)}</div>
        ${p.fn ? `<p class="muted small" style="margin-top:14px">Hàm cần viết: <code>${esc(p.fn)}</code> · ${p.tests.filter((x) => !x.hidden).length} test mẫu + ${p.tests.filter((x) => x.hidden).length} test ẩn</p>` : `<p class="muted small" style="margin-top:14px">Bài được chấm bằng cách kiểm tra đối tượng biểu đồ/kết quả mà hàm trả về.</p>`}`;
      highlightIn(lpane);
    } else if (t === "hints") {
      lpane.innerHTML = p.hints.slice(0, shownHints).map((h, i) => `<div class="hint-item md"><b>Gợi ý ${i + 1}:</b> ${md(h)}</div>`).join("") +
        (shownHints < p.hints.length
          ? `<button class="btn small" id="more-hint">💡 Hiện gợi ý ${shownHints + 1}/${p.hints.length}</button>`
          : `<p class="muted small">Đã hiện hết gợi ý.</p>`);
      highlightIn(lpane);
      const btn = $("#more-hint", lpane);
      if (btn) btn.onclick = () => { shownHints++; showLeft("hints"); };
    } else {
      const unlocked = store.data.solved[id] || store.data.revealed[id];
      if (!unlocked) {
        lpane.innerHTML = `<p>Lời giải giúp bạn học cách viết code chuẩn – nhưng <b>hãy tự thử ít nhất 1–2 lần</b> trước khi xem. Trong phòng thi bạn chỉ có chính mình!</p>
          <p class="muted small">Số lần đã nộp: ${store.data.attempts[id] || 0}</p>
          <button class="btn" id="reveal">👀 Tôi đã cố gắng – xem lời giải</button>`;
        $("#reveal", lpane).onclick = () => {
          store.update((d) => { d.revealed[id] = Date.now(); });
          showLeft("solution");
        };
      } else {
        lpane.innerHTML = `<pre><code class="language-python">${esc(p.solution)}</code></pre>
          <div class="row"><button class="btn small" id="copy-sol">Chép lời giải vào editor</button></div>
          ${p.explain ? `<h3>Giải thích & lỗi thường gặp</h3><div class="md">${md(p.explain)}</div>` : ""}`;
        highlightIn(lpane);
        $("#copy-sol", lpane).onclick = () => {
          if (confirm("Thay code hiện tại bằng lời giải mẫu?")) ed.setValue(p.solution);
        };
      }
    }
  };
  $$("#ltabs button", view).forEach((b) => (b.onclick = () => showLeft(b.dataset.t)));
  showLeft("statement");

  // ------- cột phải
  const gradeEl = $("#grade", view);
  const outEl = $("#out", view);
  const showRight = (t) => {
    $$("#rtabs button", view).forEach((b) => b.classList.toggle("active", b.dataset.t === t));
    gradeEl.hidden = t !== "grade";
    outEl.hidden = t !== "out";
  };
  $$("#rtabs button", view).forEach((b) => (b.onclick = () => showRight(b.dataset.t)));

  let saveTimer;
  const saveCode = (code) => store.update((d) => {
    if (code === p.starter) delete d.code[id];
    else d.code[id] = code;
  });
  const ed = createEditor($("#editor", view), {
    value: saved ?? p.starter,
    onRun: () => run(),
    onSubmit: () => submit(),
    onChange: (code) => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => saveCode(code), 400);
    },
  });

  const run = async () => {
    showRight("out");
    await runInto(ed.getValue(), outEl);
  };

  let grading = false;
  const submit = async () => {
    if (grading) return;
    grading = true;
    showRight("grade");
    const btn = $("#submit", view);
    btn.disabled = true;
    gradeEl.innerHTML = `<div class="output"><div class="status">Đang chấm…</div></div>`;
    const g = await gradeProblem(p, ed.getValue(), {
      onStatus: (t) => { if (t) gradeEl.querySelector(".status").textContent = t; },
    });
    btn.disabled = false;
    grading = false;
    const allOk = !g.error && g.total > 0 && g.passed === g.total;
    const firstSolve = allOk && !store.data.solved[id];
    store.update((d) => {
      d.attempts[id] = (d.attempts[id] || 0) + 1;
      d.best[id] = Math.max(d.best[id] || 0, g.ratio);
      d.code[id] = ed.getValue();
      if (allOk && !d.solved[id]) d.solved[id] = Date.now();
    });
    store.touch();
    renderGrade(gradeEl, g, { showHidden: allOk });
    if (allOk) {
      $("#solved-badge", view).hidden = false;
      const nxt = app.problems.slice(idx + 1).find((q) => !store.data.solved[q.id]);
      gradeEl.insertAdjacentHTML("beforeend", `<div class="row" style="margin-top:12px">
        ${firstSolve ? `<span>🎉 Giải đúng lần đầu sau ${store.data.attempts[id]} lần nộp!</span>` : ""}
        <span class="spacer"></span>
        <button class="btn small" id="see-sol">Xem lời giải mẫu để so sánh</button>
        ${nxt ? `<a class="btn primary small" href="#/p/${nxt.id}">Bài tiếp: ${esc(nxt.title)} →</a>` : ""}</div>`);
      $("#see-sol", gradeEl).onclick = () => showLeft("solution");
      if (firstSolve) toast("🎉 Chính xác! Đã lưu vào tiến độ.");
    } else if ((store.data.attempts[id] || 0) >= 2 && shownHints === 0 && p.hints.length) {
      gradeEl.insertAdjacentHTML("beforeend", `<p class="muted small" style="margin-top:10px">Bí? Thử xem tab <b>Gợi ý</b> nhé.</p>`);
    }
  };

  $("#run", view).onclick = run;
  $("#submit", view).onclick = submit;
  $("#reset", view).onclick = () => {
    if (confirm("Xoá code hiện tại và quay về code mẫu ban đầu?")) {
      ed.setValue(p.starter);
      store.update((d) => { delete d.code[id]; });
    }
  };

  return () => {
    clearTimeout(saveTimer);
    saveCode(ed.getValue());
  };
}
