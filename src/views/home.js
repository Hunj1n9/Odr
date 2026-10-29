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

  view.innerHTML = `
  <div class="card hero">
    <div class="ring" style="--p:${pct}"><div>${pct}%</div></div>
    <div style="flex:1;min-width:0">
      <h1>Chinh phục <b>TIN314</b></h1>
      <p class="muted" style="margin:.2rem 0 .8rem">Lập trình cho phân tích dữ liệu và tính toán khoa học – Python chạy thật ngay trên trình duyệt,
      chấm bài tự động giống CodeRunner. Thi cuối kỳ là <b>thi thực hành trên máy 90 phút (60% điểm)</b> – luyện code mỗi ngày là chìa khoá.</p>
      <div class="row">
        ${nu ? `<a class="btn" href="#/learn/${nu.lesson}/${nu.id}">Học tiếp: Bài ${unitNo(nu)} – ${esc(nu.title)}</a>` : ""}
        ${next ? `<a class="btn primary" href="#/p/${next.id}">Làm bài tiếp: ${esc(next.title)}</a>` : `<span class="badge solved">Đã giải hết tất cả bài!</span>`}
        <a class="btn" href="#/exam">Thi thử</a>
      </div>
    </div>
  </div>

  <div class="grid cols-4" style="margin-top:16px">
    <div class="card stat"><span class="num">${solved}<span class="muted small">/${total}</span></span><span class="lbl">Bài code đã giải</span></div>
    <div class="card stat"><span class="num">${unitsDone}<span class="muted small">/${app.units.length}</span></span><span class="lbl">Bài học nhỏ đã xong</span></div>
    <div class="card stat"><span class="num">${quizAvg === null ? "–" : quizAvg + "%"}</span><span class="lbl">Trắc nghiệm (TB điểm cao nhất)</span></div>
    <div class="card stat"><span class="num">${lastExam ? lastExam.score.toFixed(2) : "–"}</span><span class="lbl">Thi thử gần nhất${bestExam !== null ? ` · cao nhất ${bestExam.toFixed(2)}` : ""}</span></div>
  </div>

  <h2>Bộ bài tập</h2>
  <div class="grid cols-3 sets">
    ${SETS.map((s) => {
      const ps = app.problems.filter((p) => setOf(p) === s);
      const ok = ps.filter((p) => d.solved[p.id]).length;
      return `<a class="card chapter-card" href="#/problems?set=${s.short}">
        <div class="row"><strong>${esc(s.name)}</strong><span class="spacer"></span><span class="muted small">${ok}/${ps.length}</span></div>
        <span class="muted small">${esc(s.desc)}</span>
        <div class="bar ok"><span style="width:${ps.length ? (ok / ps.length) * 100 : 0}%"></span></div>
      </a>`;
    }).join("")}
  </div>

  <div class="grid cols-2" style="margin-top:16px">
    <div class="card">
      <h3>Lộ trình 4 tuần gợi ý</h3>
      <ul class="list-plain">
        ${PLAN.map(([w, t, desc, href]) => `<li><a href="${href}"><b>${w} – ${t}</b></a><div class="muted small">${desc}</div></li>`).join("")}
      </ul>
    </div>
    <div class="card">
      <h3>Cấu trúc điểm học phần</h3>
      <ul class="list-plain">
        <li><b>10%</b> Chuyên cần – điểm danh, phát biểu</li>
        <li><b>30%</b> Dự án nhóm – xác định vấn đề, code dễ hiểu, chạy đúng (xem Chương 8)</li>
        <li><b>60%</b> Thi hết học phần – <b>thi thực hành trên máy 90 phút</b></li>
      </ul>
      <h3>Cần luyện thêm</h3>
      ${weak.length ? `<ul class="list-plain">${weak.map((w) => `<li><a href="#/problems?topic=${w.key}">${esc(w.name)}</a>
          <span class="muted small"> – đúng ${w.ok}/${w.tried} bài đã thử</span></li>`).join("")}</ul>`
        : `<p class="muted small">Chưa có dữ liệu – hãy làm vài bài để hệ thống gợi ý chủ đề yếu.</p>`}
    </div>
  </div>

  ${d.exams.length ? `<div class="card" style="margin-top:16px"><h3>Lịch sử thi thử</h3>
    <ul class="list-plain">${d.exams.slice(-6).reverse().map((e) => `<li class="row"><b>${e.score.toFixed(2)}/10</b>
      <span class="muted small">${esc(e.title)} · ${fmtDate(e.at)}</span></li>`).join("")}</ul></div>` : ""}

  <div class="card" style="margin-top:16px">
    <h3>Dữ liệu tiến độ</h3>
    <p class="muted small">Tiến độ được lưu trong trình duyệt này. Xuất file để sao lưu hoặc chuyển sang máy khác.</p>
    <div class="row">
      <button class="btn small" id="exp">Xuất tiến độ</button>
      <label class="btn small">Nhập tiến độ<input type="file" id="imp" accept=".json" hidden></label>
      <button class="btn small danger" id="rst">Xoá toàn bộ tiến độ</button>
    </div>
  </div>`;

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
