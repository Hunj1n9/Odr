import { TOPICS, LEVELS } from "../content.js";
import { app, SETS, setOf, status, chapterOf } from "../state.js";
import { esc, levelBadge, setCrumbs } from "../ui.js";

export function problemsView(view, _params, query) {
  setCrumbs([["Luyện code"]]);
  const f = {
    set: query.get("set") || "",
    topic: query.get("topic") || "",
    level: query.get("level") || "",
    st: query.get("st") || "",
    ch: query.get("ch") || "",
    q: query.get("q") || "",
  };

  view.innerHTML = `
    <h1>Luyện code</h1>
    <p class="muted">${app.problems.length} bài, chấm tự động bằng test ẩn giống thi CodeRunner. Mẹo: lọc "Chưa làm" và làm lần lượt.</p>
    <div class="filters">
      <input type="search" id="q" placeholder="Tìm tên bài, tên hàm…" value="${esc(f.q)}" style="min-width:220px">
      <select id="set"><option value="">Tất cả bộ đề</option>
        ${SETS.map((s) => `<option value="${s.short}" ${f.set === s.short ? "selected" : ""}>${esc(s.name)}</option>`).join("")}</select>
      <select id="topic"><option value="">Mọi chủ đề</option>
        ${Object.entries(TOPICS).map(([k, t]) => `<option value="${k}" ${f.topic === k ? "selected" : ""}>${esc(t.name)}</option>`).join("")}</select>
      <select id="level"><option value="">Mọi mức độ</option>
        ${Object.entries(LEVELS).map(([k, n]) => `<option value="${k}" ${f.level === k ? "selected" : ""}>${n}</option>`).join("")}</select>
      <select id="st"><option value="">Mọi trạng thái</option>
        <option value="new" ${f.st === "new" ? "selected" : ""}>Chưa làm</option>
        <option value="tried" ${f.st === "tried" ? "selected" : ""}>Đang làm (chưa đúng)</option>
        <option value="solved" ${f.st === "solved" ? "selected" : ""}>Đã giải</option></select>
      ${f.ch ? `<span class="badge accent">Chương ${esc(f.ch)} <a href="#/problems" title="Bỏ lọc">✕</a></span>` : ""}
      <span class="spacer"></span><span class="muted small" id="count"></span>
    </div>
    <div class="card" style="padding:0"><div class="plist" id="list"></div></div>`;

  const draw = () => {
    const q = f.q.toLowerCase();
    const list = app.problems.filter((p) =>
      (!f.set || setOf(p)?.short === f.set) &&
      (!f.topic || p.topic === f.topic) &&
      (!f.level || p.level === f.level) &&
      (!f.ch || String(chapterOf(p)) === f.ch) &&
      (!f.st || status(p.id) === f.st) &&
      (!q || `${p.title} ${p.fn || ""} ${p.source} ${p.id}`.toLowerCase().includes(q)));
    view.querySelector("#count").textContent = `${list.length} bài`;
    view.querySelector("#list").innerHTML = list.length ? list.map((p) => {
      const st = status(p.id);
      return `<a class="prow" href="#/p/${p.id}">
        <span class="st ${st === "solved" ? "ok" : st}">${st === "solved" ? "✓" : st === "tried" ? "◐" : "○"}</span>
        <span><span class="t">${esc(p.title)}</span><div class="sub">${esc(p.source)}${p.fn ? ` · <code>${esc(p.fn)}()</code>` : ""}</div></span>
        <span class="meta"><span class="badge">${esc(TOPICS[p.topic]?.name || p.topic)}</span>${levelBadge(p.level)}</span>
      </a>`;
    }).join("") : `<p class="muted" style="padding:16px">Không có bài nào khớp bộ lọc.</p>`;
  };

  const sync = () => {
    const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString();
    history.replaceState(null, "", "#/problems" + (qs ? "?" + qs : ""));
    draw();
  };
  for (const key of ["set", "topic", "level", "st"]) {
    view.querySelector("#" + key).onchange = (e) => {
      f[key] = e.target.value;
      sync();
    };
  }
  view.querySelector("#q").oninput = (e) => {
    f.q = e.target.value;
    sync();
  };
  draw();
}
