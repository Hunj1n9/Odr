import { gradeProblem, renderGrade } from "../grade.js";
import { app, setOf } from "../state.js";
import { store } from "../store.js";
import { $, $$, createEditor, esc, fmtDate, highlightIn, levelBadge, md, runInto, setCrumbs, shuffle, toast } from "../ui.js";

// Cấu trúc đề: mỗi phần tử là bộ lọc chọn 1 câu ngẫu nhiên.
const PRESETS = {
  final: {
    title: "Thi cuối kỳ (mô phỏng) – 90 phút, 6 câu",
    minutes: 90,
    desc: "Giống thi thực hành trên máy: Python cơ bản → thuật toán → Pandas/NumPy → học máy.",
    slots: [
      (p) => p.level === "easy" && ["basics", "string"].includes(p.topic),
      (p) => p.level !== "hard" && p.topic === "collections",
      (p) => p.level === "medium" && p.topic === "algo",
      (p) => p.level === "hard" && ["algo", "string", "collections"].includes(p.topic),
      (p) => ["pandas", "numpy", "io"].includes(p.topic),
      (p) => ["ml", "eval", "viz"].includes(p.topic) && p.file !== "03-collection.md",
    ],
  },
  ftu: {
    title: "Đề dạng FTU 2024–2025 – 90 phút, 7 câu",
    minutes: 90,
    desc: "Theo cấu trúc đề thật: Phần I Python cơ bản (3 điểm) + Phần II làm sạch dữ liệu, trùng lặp, chuẩn hoá/mã hoá, biểu đồ, hồi quy (7 điểm).",
    slots: [
      (p) => ["fe01", "fe02", "fe03", "fe04", "fe05", "fe06"].includes(p.id),
      (p) => ["fe03", "fe04", "fe05", "fe06"].includes(p.id),
      (p) => ["fe07", "fe08", "fe09"].includes(p.id),
      (p) => ["fe10", "fe11", "fe14"].includes(p.id),
      (p) => ["fe12", "fe13"].includes(p.id),
      (p) => ["fe15", "fe16"].includes(p.id),
      (p) => ["fe17", "fe18"].includes(p.id),
    ],
  },
  midterm: {
    title: "Đề giữa kỳ – 60 phút, 5 câu",
    minutes: 60,
    desc: "5 câu ngẫu nhiên từ bộ 34 câu giữa kỳ (2 dễ, 2 trung bình, 1 khó).",
    slots: [
      (p) => p.file === "02-midterm.md" && p.level === "easy",
      (p) => p.file === "02-midterm.md" && p.level === "easy",
      (p) => p.file === "02-midterm.md" && p.level === "medium",
      (p) => p.file === "02-midterm.md" && p.level === "medium",
      (p) => p.file === "02-midterm.md" && p.level === "hard",
    ],
  },
  data: {
    title: "Chuyên đề dữ liệu – 45 phút, 3 câu",
    minutes: 45,
    desc: "NumPy, Pandas và học máy – phần thường khiến sinh viên mất điểm nhất.",
    slots: [
      (p) => ["numpy", "io"].includes(p.topic),
      (p) => p.topic === "pandas",
      (p) => ["ml", "eval"].includes(p.topic) && p.file === "07-ml.md",
    ],
  },
  quick: {
    title: "Luyện nhanh – 20 phút, 3 câu",
    minutes: 20,
    desc: "3 câu dễ–trung bình để khởi động mỗi ngày (có cả bài tập theo bài học).",
    lessonOk: true,
    slots: [
      (p) => p.level === "easy" && p.file !== "06-viz.md",
      (p) => p.level === "easy" && p.file !== "06-viz.md",
      (p) => p.level === "medium" && ["algo", "collections", "string"].includes(p.topic),
    ],
  },
};

function pickProblems(preset) {
  const used = new Set();
  return preset.slots.map((filter) => {
    const pool = shuffle(app.problems.filter((p) => filter(p) && !used.has(p.id) && (preset.lessonOk || !p.unit)));
    const unsolvedFirst = pool.sort((a, b) => !!store.data.solved[a.id] - !!store.data.solved[b.id]);
    const p = unsolvedFirst[0];
    if (p) used.add(p.id);
    return p?.id;
  }).filter(Boolean);
}

let tick = null;

export function examView(view) {
  setCrumbs([["Thi thử"]]);
  clearInterval(tick);
  const ex = store.data.exam;
  if (ex && !ex.done) return examRun(view);
  if (ex && ex.done) return examReview(view);
  examHome(view);
}

function examHome(view) {
  const d = store.data;
  view.innerHTML = `
    <h1>Thi thử bấm giờ</h1>
    <p class="muted">Mô phỏng phòng thi: có đồng hồ đếm ngược, <b>không xem gợi ý/lời giải</b>, chỉ được "Kiểm tra" với test mẫu. Hết giờ tự động nộp bài.
    Điểm mỗi câu = tỉ lệ test (kể cả test ẩn) chạy đúng.</p>
    <div class="grid cols-2" style="margin-top:16px">
      ${Object.entries(PRESETS).map(([k, ps]) => `<div class="card">
        <h3>${esc(ps.title)}</h3><p class="muted small">${esc(ps.desc)}</p>
        <button class="btn primary" data-start="${k}">Bắt đầu</button></div>`).join("")}
    </div>
    ${d.exams.length ? `<h2>Lịch sử</h2><div class="card"><ul class="list-plain">
      ${d.exams.slice().reverse().map((e) => `<li class="row"><b>${e.score.toFixed(2)}/10</b><span>${esc(e.title)}</span>
        <span class="spacer"></span><span class="muted small">${fmtDate(e.at)} · ${e.items.map((it) => `${Math.round(it.ratio * 100)}%`).join(" · ")}</span></li>`).join("")}
    </ul></div>` : ""}`;
  $$("[data-start]", view).forEach((b) => {
    b.onclick = () => {
      const preset = PRESETS[b.dataset.start];
      const ids = pickProblems(preset);
      store.update((dd) => {
        dd.exam = { preset: b.dataset.start, title: preset.title, ids, start: Date.now(), minutes: preset.minutes, code: {}, cur: 0, done: false };
      });
      examView(view);
    };
  });
}

function fmtTime(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function examRun(view) {
  view.classList.add("wide");
  const ex = store.data.exam;
  const problems = ex.ids.map((id) => app.byId.get(id)).filter(Boolean);
  const deadline = ex.start + ex.minutes * 60000;
  setCrumbs([["Thi thử", "#/exam"], [ex.title]]);

  view.innerHTML = `
    <div class="card exam-bar">
      <span class="timer" id="timer">--:--</span>
      <div class="qnav" id="qnav">${problems.map((p, i) => `<button data-i="${i}" title="${esc(p.title)}">${i + 1}</button>`).join("")}</div>
      <span class="spacer"></span>
      <button class="btn small ghost" id="quit">Huỷ bài thi</button>
      <button class="btn primary" id="finish">Nộp bài</button>
    </div>
    <div class="problem-layout">
      <section class="card problem-left" id="stmt"></section>
      <section>
        <div class="editor tall" id="editor"></div>
        <div class="editor-actions">
          <button class="btn" id="run">Chạy thử</button>
          <button class="btn" id="check">✓ Kiểm tra với test mẫu</button>
          <span class="spacer"></span><span class="muted small">Code tự lưu – tải lại trang không mất bài.</span>
        </div>
        <div id="res"></div>
        <div id="out" class="output"></div>
      </section>
    </div>`;

  let ed = null;
  const show = (i) => {
    store.update((d) => { d.exam.cur = i; });
    const p = problems[i];
    $$("#qnav button", view).forEach((b, j) => {
      b.classList.toggle("active", j === i);
      b.classList.toggle("done", !!ex.code[problems[j].id] && ex.code[problems[j].id] !== problems[j].starter);
    });
    const stmt = $("#stmt", view);
    stmt.innerHTML = `<div class="row"><b>Câu ${i + 1}/${problems.length}</b>${levelBadge(p.level)}</div>
      <h2 style="margin-top:8px">${esc(p.title)}</h2><div class="md">${md(p.statement)}</div>`;
    highlightIn(stmt);
    $("#editor", view).innerHTML = "";
    $("#res", view).innerHTML = "";
    $("#out", view).innerHTML = "";
    ed = createEditor($("#editor", view), {
      value: ex.code[p.id] ?? p.starter,
      onRun: () => $("#run", view).click(),
      onSubmit: () => $("#check", view).click(),
      onChange: (code) => store.update((d) => { d.exam.code[p.id] = code; }),
    });
  };
  $$("#qnav button", view).forEach((b) => (b.onclick = () => show(Number(b.dataset.i))));
  $("#run", view).onclick = () => runInto(ed.getValue(), $("#out", view));
  $("#check", view).onclick = async () => {
    const p = problems[store.data.exam.cur];
    const res = $("#res", view);
    res.innerHTML = `<div class="output"><div class="status">Đang kiểm tra…</div></div>`;
    const g = await gradeProblem(p, ed.getValue(), { visibleOnly: !p.check });
    renderGrade(res, g);
    res.insertAdjacentHTML("beforeend", `<p class="muted small">Chỉ kiểm tra test mẫu – test ẩn sẽ chấm khi nộp bài.</p>`);
  };
  $("#quit", view).onclick = () => {
    if (confirm("Huỷ bài thi này? Bài làm sẽ không được chấm.")) {
      clearInterval(tick);
      store.update((d) => { d.exam = null; });
      examView(view);
    }
  };
  const finish = async (auto) => {
    clearInterval(tick);
    if (!auto && !confirm("Nộp bài và chấm điểm?")) {
      tick = setInterval(update, 1000);
      return;
    }
    view.innerHTML = `<div class="card"><h2>${auto ? "Hết giờ – đang tự động nộp bài" : "Đang chấm bài"}…</h2><p id="prog" class="muted"></p></div>`;
    const items = [];
    for (const [i, p] of problems.entries()) {
      $("#prog", view).textContent = `Đang chấm câu ${i + 1}/${problems.length}…`;
      const code = store.data.exam.code[p.id] ?? p.starter;
      const g = await gradeProblem(p, code);
      items.push({ id: p.id, ratio: g.ratio, passed: g.passed, total: g.total, error: g.error || null });
    }
    const score = Math.round((items.reduce((s, it) => s + it.ratio, 0) / items.length) * 10 * 100) / 100;
    store.update((d) => {
      d.exam.done = true;
      d.exam.items = items;
      d.exam.score = score;
      d.exam.end = Date.now();
      d.exams.push({ at: Date.now(), title: d.exam.title, score, items: items.map(({ id, ratio }) => ({ id, ratio })) });
      for (const it of items) {
        d.attempts[it.id] = (d.attempts[it.id] || 0) + 1;
        d.best[it.id] = Math.max(d.best[it.id] || 0, it.ratio);
        if (it.ratio === 1 && !d.solved[it.id]) d.solved[it.id] = Date.now();
        d.code[it.id] = d.exam.code[it.id] ?? d.code[it.id];
      }
    });
    store.touch();
    examView(view);
  };
  $("#finish", view).onclick = () => finish(false);

  const update = () => {
    const left = deadline - Date.now();
    const t = $("#timer", view);
    if (!t) return clearInterval(tick);
    t.textContent = fmtTime(left);
    t.classList.toggle("low", left < 5 * 60000);
    if (left <= 0) finish(true);
  };
  update();
  tick = setInterval(update, 1000);
  show(ex.cur || 0);
  return () => clearInterval(tick);
}

function examReview(view) {
  const ex = store.data.exam;
  setCrumbs([["Thi thử", "#/exam"], ["Kết quả"]]);
  const mins = Math.round((ex.end - ex.start) / 60000);
  view.innerHTML = `
    <div class="card" style="text-align:center">
      <p class="muted">${esc(ex.title)}</p>
      <div class="score-big">${ex.score.toFixed(2)}<span class="muted" style="font-size:1.2rem">/10</span></div>
      <p>${ex.score >= 8.5 ? "Xuất sắc – sẵn sàng đi thi!" : ex.score >= 7 ? "Khá tốt – ôn lại các câu sai để lên điểm A." : "Cần luyện thêm – xem lại từng câu bên dưới."}
      <span class="muted small">Thời gian làm: ${mins} phút.</span></p>
      <div class="row" style="justify-content:center"><button class="btn primary" id="new">Làm đề mới</button></div>
    </div>
    <h2>Chi tiết từng câu</h2>
    <div class="stack" id="items"></div>`;
  const box = $("#items", view);
  ex.items.forEach((it, i) => {
    const p = app.byId.get(it.id);
    if (!p) return;
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `<div class="row"><b>Câu ${i + 1}: ${esc(p.title)}</b>${levelBadge(p.level)}<span class="badge">${esc(setOf(p)?.name || "")}</span>
      <span class="spacer"></span><span class="badge ${it.ratio === 1 ? "solved" : "hard"}">${it.passed}/${it.total} test · ${(it.ratio * 10 / ex.items.length).toFixed(2)} điểm</span></div>
      ${it.error ? `<div class="output" style="margin-top:8px"><pre class="err">${esc(it.error)}</pre></div>` : ""}
      <div class="row" style="margin-top:10px"><a class="btn small" href="#/p/${p.id}">Mở bài để luyện lại & xem lời giải</a></div>`;
    box.appendChild(el);
  });
  $("#new", view).onclick = () => {
    store.update((d) => { d.exam = null; });
    toast("Chọn đề mới");
    examView(view);
  };
}
