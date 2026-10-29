// Bài tập nhỏ nhúng ngay trong bài học: đề + editor + chạy thử + chấm + gợi ý + lời giải.
import { gradeProblem, renderGrade } from "./grade.js";
import { store } from "./store.js";
import { $, createEditor, esc, highlightIn, levelBadge, md, runInto, toast } from "./ui.js";

/** Trả về hàm dọn dẹp (lưu code đang viết). onSolved() gọi khi giải đúng lần đầu. */
export function mountExercise(el, p, { label = "", onSolved } = {}) {
  const solved = () => !!store.data.solved[p.id];
  let shownHints = 0;
  el.classList.add("card", "exercise");
  el.innerHTML = `
    <div class="row ex-head">
      <strong>${label ? esc(label) + " · " : ""}${esc(p.title)}</strong>
      ${levelBadge(p.level)}
      <span class="badge solved ex-ok" ${solved() ? "" : "hidden"}>✓ Đã giải</span>
      <span class="spacer"></span>
      <a class="btn small ghost" href="#/p/${p.id}" title="Mở trong trang luyện code đầy đủ">⤢ Toàn màn hình</a>
    </div>
    <div class="md ex-statement">${md(p.statement)}</div>
    <div class="editor"></div>
    <div class="editor-actions">
      <button class="btn small" data-a="run">▶ Chạy thử</button>
      <button class="btn small primary" data-a="submit">✓ Nộp & chấm</button>
      ${p.hints.length ? `<button class="btn small ghost" data-a="hint">💡 Gợi ý (0/${p.hints.length})</button>` : ""}
      <button class="btn small ghost" data-a="sol">👀 Lời giải</button>
      <span class="spacer"></span>
      <button class="btn small ghost" data-a="reset" title="Về code mẫu ban đầu">⟲</button>
    </div>
    <div class="ex-hints"></div>
    <div class="output ex-out" hidden></div>
    <div class="ex-grade"></div>
    <div class="ex-sol" hidden></div>`;
  highlightIn($(".ex-statement", el));
  const out = $(".ex-out", el);
  const gradeEl = $(".ex-grade", el);

  let timer;
  const save = (code) => store.update((d) => {
    if (code === p.starter) delete d.code[p.id];
    else d.code[p.id] = code;
  });
  const ed = createEditor($(".editor", el), {
    value: store.data.code[p.id] ?? p.starter,
    lineNumbers: false,
    onRun: () => run(),
    onSubmit: () => submit(),
    onChange: (code) => {
      clearTimeout(timer);
      timer = setTimeout(() => save(code), 400);
    },
  });

  const run = async () => {
    out.hidden = false;
    await runInto(ed.getValue(), out);
  };
  let busy = false;
  const submit = async () => {
    if (busy) return;
    busy = true;
    gradeEl.innerHTML = `<div class="output"><div class="status">Đang chấm…</div></div>`;
    const g = await gradeProblem(p, ed.getValue(), {
      onStatus: (t) => { if (t) gradeEl.querySelector(".status").textContent = t; },
    });
    busy = false;
    const ok = !g.error && g.total > 0 && g.passed === g.total;
    const first = ok && !solved();
    store.update((d) => {
      d.attempts[p.id] = (d.attempts[p.id] || 0) + 1;
      d.best[p.id] = Math.max(d.best[p.id] || 0, g.ratio);
      d.code[p.id] = ed.getValue();
      if (ok && !d.solved[p.id]) d.solved[p.id] = Date.now();
    });
    store.touch();
    renderGrade(gradeEl, g, { showHidden: ok });
    if (ok) {
      $(".ex-ok", el).hidden = false;
      if (first) {
        toast("🎉 Chính xác!");
        onSolved?.();
      }
    } else if (p.hints.length && shownHints === 0 && (store.data.attempts[p.id] || 0) >= 2) {
      gradeEl.insertAdjacentHTML("beforeend", `<p class="muted small" style="margin-top:8px">Bí? Bấm <b>💡 Gợi ý</b> nhé.</p>`);
    }
  };

  el.querySelector(".editor-actions").onclick = (e) => {
    const a = e.target.closest("[data-a]")?.dataset.a;
    if (a === "run") run();
    else if (a === "submit") submit();
    else if (a === "hint") {
      if (shownHints < p.hints.length) shownHints++;
      $(".ex-hints", el).innerHTML = p.hints.slice(0, shownHints).map((h, i) => `<div class="hint-item md"><b>Gợi ý ${i + 1}:</b> ${md(h)}</div>`).join("");
      highlightIn($(".ex-hints", el));
      e.target.closest("button").textContent = `💡 Gợi ý (${shownHints}/${p.hints.length})`;
    } else if (a === "sol") {
      const box = $(".ex-sol", el);
      if (!box.hidden) {
        box.hidden = true;
        return;
      }
      if (!solved() && !store.data.revealed[p.id] && !confirm("Bạn đã thử tự làm chưa? Xem lời giải sớm sẽ khó nhớ lâu.")) return;
      store.update((d) => { d.revealed[p.id] = d.revealed[p.id] || Date.now(); });
      box.hidden = false;
      box.innerHTML = `<pre><code class="language-python">${esc(p.solution)}</code></pre>${p.explain ? `<div class="md">${md(p.explain)}</div>` : ""}`;
      highlightIn(box);
    } else if (a === "reset") {
      if (confirm("Xoá code và quay về code mẫu?")) {
        ed.setValue(p.starter);
        save(p.starter);
      }
    }
  };

  return () => {
    clearTimeout(timer);
    save(ed.getValue());
  };
}
