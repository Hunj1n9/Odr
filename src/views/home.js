import { app, SETS, setOf, solvedCount, nextUnsolved, nextUnit, unitNo } from "../state.js";
import { TOPICS } from "../content.js";
import { store } from "../store.js";
import { esc, fmtDate, setCrumbs, toast } from "../ui.js";

const PLAN = [
  ["Tuần 1", "Nền tảng", "Học các bài nhỏ Chương 1–2 (mỗi ngày 3–4 bài) + 20 bài Khởi động. Mục tiêu: viết hàm, if/for/while, list/dict/string không cần tra cứu.", "#/learn/ch2-python"],
  ["Tuần 2", "Đề giữa kỳ", "Làm hết 34 câu Đề giữa kì + Tuyển tập phần 1–2. Mỗi câu sai: đọc giải thích, làm lại sau 2 ngày.", "#/problems?set=midterm"],
  ["Tuần 3", "Dữ liệu", "Chương 3–5: NumPy, Pandas, trực quan hoá. Luyện trên sales.csv / students.csv trong Sổ tay.", "#/learn/ch4-pandas"],
  ["Tuần 4", "Học máy & thi thử", "Chương 6–7 + bộ Học máy. Thi thử 90 phút ít nhất 3 lần, mục tiêu ≥ 8.5 điểm.", "#/exam"],
];

export function homeView(view) {
  setCrumbs([["Tổng quan"]]);
  const d = store.data;
  const total = app.problems.length;
  const solved = solvedCount();
  const pct = total ? Math.round((solved / total) * 100) : 0;
  const unitsDone = app.units.filter((u) => d.units[u.id]).length;
  const quizVals = Object.values(d.quiz);
  const quizAvg = quizVals.length ? Math.round(quizVals.reduce((s, q) => s + q.best, 0) / quizVals.length) : null;
  const lastExam = d.exams[d.exams.length - 1];
  const bestExam = d.exams.length ? Math.max(...d.exams.map((e) => e.score)) : null;
  const next = nextUnsolved();
  const nu = nextUnit();

  // điểm yếu: chủ đề có tỉ lệ giải thấp nhất trong các chủ đề đã thử
  const weak = Object.entries(TOPICS).map(([key, t]) => {
    const ps = app.problems.filter((p) => p.topic === key);
    const tried = ps.filter((p) => d.attempts[p.id]).length;
    const ok = ps.filter((p) => d.solved[p.id]).length;
    return { key, name: t.name, total: ps.length, tried, ok, rate: tried ? ok / tried : 1 };
  }).filter((t) => t.tried > 0 && t.rate < 1).sort((a, b) => a.rate - b.rate).slice(0, 3);

  const chapters = app.lessons.filter((l) => l.chapter != null);
  const doneIn = (l) => l.units.filter((u) => d.units[u.id]).length;
  const unitPct = app.units.length ? Math.round((unitsDone / app.units.length) * 100) : 0;
  const curLesson = nu ? app.lessons.find((l) => l.id === nu.lesson) : null;
  const meter = (label, val, max, text) => `<div class="meter">
      <div class="meter-top"><span>${label}</span><b>${text ?? `${val}<span class="muted">/${max}</span>`}</b></div>
      <div class="bar"><span style="width:${max ? Math.min(100, (val / max) * 100) : 0}%"></span></div></div>`;

  view.innerHTML = `
  <header class="dash-head">
    <h1>Chinh phục <b>TIN314</b></h1>
    <p class="muted">Học Python ngay trên trình duyệt, bài tập chấm tự động như CodeRunner. Thi cuối kỳ là <b>thi thực hành trên máy 90 phút (60% điểm)</b> – luyện code mỗi ngày là chìa khoá.</p>
  </header>

  <section class="dash-top">
    <div class="card continue">
      <span class="eyebrow">${unitsDone ? "Tiếp tục học" : "Bắt đầu từ đây"}</span>
      ${nu ? `<h2>Bài ${unitNo(nu)} – ${esc(nu.title)}</h2>
        <p class="muted">Chương ${nu.chapter}${curLesson ? ` · ${esc(curLesson.title)}` : ""}</p>
        ${nu.goal ? `<p class="goal-line">${esc(nu.goal.replace(/[`*]/g, ""))}</p>` : ""}`
        : `<h2>Bạn đã học hết các bài!</h2><p class="muted">Hãy luyện đề và thi thử để chắc tay hơn.</p>`}
      <div class="row">
        ${nu ? `<a class="btn primary" href="#/learn/${nu.lesson}/${nu.id}">Học tiếp</a>` : ""}
        ${next ? `<a class="btn" href="#/p/${next.id}">Làm bài code: ${esc(next.title)}</a>` : ""}
        <a class="btn ghost" href="#/exam">Thi thử 90 phút</a>
      </div>
    </div>
    <div class="card overview">
      <div class="ring" style="--p:${unitPct}"><div>${unitPct}%</div></div>
      <div class="overview-list">
        <b class="ov-t">Tiến độ của bạn</b>
        ${meter("Bài học", unitsDone, app.units.length)}
        ${meter("Bài code", solved, total)}
        ${meter("Trắc nghiệm", quizAvg ?? 0, 100, quizAvg === null ? "chưa làm" : quizAvg + "%")}
        ${meter("Thi thử cao nhất", bestExam ?? 0, 10, bestExam === null ? "chưa thi" : bestExam.toFixed(2) + "/10")}
      </div>
    </div>
  </section>

  <section>
    <div class="sec-head"><h2>Lộ trình học</h2><a class="small" href="#/learn">Xem tất cả →</a></div>
    <div class="track">
      ${chapters.map((l) => {
        const dn = doneIn(l);
        const cur = nu && nu.lesson === l.id;
        const full = dn === l.units.length;
        return `<a class="ch ${cur ? "cur" : ""} ${full ? "done" : ""}" href="#/learn/${l.id}">
          <span class="ch-n">${full ? "✓" : l.chapter}</span>
          <span class="ch-body"><b>${esc(l.title)}</b>
            <span class="muted small">${cur ? "Đang học · " : ""}${dn}/${l.units.length} bài</span>
            <span class="bar"><span style="width:${l.units.length ? (dn / l.units.length) * 100 : 0}%"></span></span></span>
        </a>`;
      }).join("")}
    </div>
  </section>

  <section>
    <div class="sec-head"><h2>Luyện code theo bộ đề</h2><a class="small" href="#/problems">Tất cả ${total} bài →</a></div>
    <div class="tiles">
      ${SETS.map((s, k) => {
        const ps = app.problems.filter((p) => setOf(p) === s);
        const ok = ps.filter((p) => d.solved[p.id]).length;
        return `<a class="tile c${k % 4}" href="#/problems?set=${s.short}">
          <span class="tile-top"><b>${esc(s.name)}</b><span class="muted small">${ok}/${ps.length}</span></span>
          <span class="muted small tile-desc">${esc(s.desc)}</span>
          <span class="bar"><span style="width:${ps.length ? (ok / ps.length) * 100 : 0}%"></span></span>
        </a>`;
      }).join("")}
    </div>
  </section>

  <section class="dash-cols">
    <div class="card">
      <h3>Cần luyện thêm</h3>
      ${weak.length ? `<ul class="list-plain">${weak.map((w) => `<li><a href="#/problems?topic=${w.key}">${esc(w.name)}</a>
          <span class="muted small"> – đúng ${w.ok}/${w.tried} bài đã thử</span></li>`).join("")}</ul>`
        : `<p class="muted">Chưa có dữ liệu – làm vài bài code để hệ thống gợi ý chủ đề còn yếu.</p>`}
      ${d.exams.length ? `<h3>Lịch sử thi thử</h3><ul class="list-plain">${d.exams.slice(-4).reverse().map((e) => `<li class="row"><b>${e.score.toFixed(2)}/10</b>
        <span class="muted small">${esc(e.title)} · ${fmtDate(e.at)}</span></li>`).join("")}</ul>` : ""}
    </div>
    <div class="card">
      <h3>Lộ trình 4 tuần gợi ý</h3>
      <ol class="weeks">
        ${PLAN.map(([w, t, desc, href]) => `<li><a href="${href}"><b>${w} – ${t}</b></a><div class="muted small">${desc}</div></li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="score-pills">
    <div><b>10%</b><span>Chuyên cần</span></div>
    <div><b>30%</b><span>Dự án nhóm (Chương 8)</span></div>
    <div class="hi"><b>60%</b><span>Thi thực hành trên máy, 90 phút</span></div>
  </section>

  <details class="card data-card">
    <summary>Sao lưu tiến độ</summary>
    <p class="muted small">Tiến độ được lưu trong trình duyệt này. Xuất file để sao lưu hoặc chuyển sang máy khác.</p>
    <div class="row">
      <button class="btn small" id="exp">Xuất tiến độ</button>
      <label class="btn small">Nhập tiến độ<input type="file" id="imp" accept=".json" hidden></label>
      <button class="btn small danger" id="rst">Xoá toàn bộ tiến độ</button>
    </div>
  </details>`;

  view.querySelector("#exp").onclick = () => {
    const blob = new Blob([store.exportJson()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tin314-tien-do-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };
  view.querySelector("#imp").onchange = async (e) => {
    try {
      store.importJson(await e.target.files[0].text());
      toast("Đã nhập tiến độ");
      homeView(view);
    } catch {
      toast("File không hợp lệ");
    }
  };
  view.querySelector("#rst").onclick = () => {
    if (confirm("Xoá toàn bộ tiến độ, code đã lưu và lịch sử thi? Không thể hoàn tác.")) {
      store.reset();
      homeView(view);
    }
  };
}
