import { loadContent } from "./content.js";
import { py } from "./py/runner.js";
import { app, solvedCount } from "./state.js";
import { store } from "./store.js";
import { $, $$, esc, setCrumbs } from "./ui.js";
import { homeView } from "./views/home.js";
import { learnListView, lessonView, unitView } from "./views/learn.js";
import { problemsView } from "./views/problems.js";
import { problemView } from "./views/problem.js";
import { quizListView, quizView } from "./views/quiz.js";
import { examView } from "./views/exam.js";
import { playView } from "./views/play.js";

const routes = [
  [/^$/, "home", homeView],
  [/^learn$/, "learn", learnListView],
  [/^learn\/exam-tips$/, "tips", lessonView],
  [/^learn\/([\w-]+)$/, "learn", lessonView],
  [/^learn\/([\w-]+)\/([\w.-]+)$/, "learn", unitView],
  [/^problems$/, "problems", problemsView],
  [/^p\/([\w-]+)$/, "problems", problemView],
  [/^quiz$/, "quiz", quizListView],
  [/^quiz\/([\w-]+)$/, "quiz", quizView],
  [/^exam$/, "exam", examView],
  [/^play$/, "play", playView],
];

let cleanup = null;

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [path, qs] = raw.split("?");
  return { path: decodeURIComponent(path || ""), query: new URLSearchParams(qs || "") };
}

async function render() {
  const { path, query } = parseHash();
  const view = $("#view");
  if (typeof cleanup === "function") cleanup();
  cleanup = null;
  view.className = "view";
  $("#sidebar").classList.remove("open");
  for (const [re, name, fn] of routes) {
    const m = path.match(re);
    if (!m) continue;
    $$("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.route === name));
    setCrumbs([]);
    view.innerHTML = "";
    try {
      cleanup = await fn(view, m.slice(1), query);
    } catch (e) {
      console.error(e);
      view.innerHTML = `<div class="card"><h2>Có lỗi khi hiển thị trang</h2><pre>${esc(e.stack || e)}</pre></div>`;
    }
    window.scrollTo(0, 0);
    return;
  }
  view.innerHTML = `<div class="card"><h2>Không tìm thấy trang</h2><a href="#/">Về trang chủ</a></div>`;
}

function updateTopStats() {
  const solved = solvedCount();
  const streak = store.streak();
  $("#top-stats").innerHTML = `<span>✓ <b>${solved}</b>/${app.problems.length} bài</span>` +
    `<span><b>${streak}</b> ngày liên tiếp</span>`;
}

function initTheme() {
  const saved = (() => {
    try {
      return localStorage.getItem("tin314.theme");
    } catch {
      return null;
    }
  })();
  if (saved) document.documentElement.dataset.theme = saved;
  $("#theme-toggle").onclick = () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("tin314.theme", next);
    } catch {
      /* bỏ qua */
    }
  };
}

async function main() {
  initTheme();
  $("#menu-btn").onclick = () => $("#sidebar").classList.toggle("open");
  py.onState((state, text) => {
    const el = $("#py-status");
    el.dataset.state = state;
    const label = { loading: "Đang khởi động Python…", ready: "Python sẵn sàng", busy: "Đang chạy…", error: "Lỗi Python" }[state] || "";
    $(".txt", el).textContent = text || label;
    el.title = text || label;
  });
  try {
    Object.assign(app, await loadContent());
  } catch (e) {
    $("#view").innerHTML = `<div class="card"><h2>Không tải được nội dung</h2>
      <p>Hãy mở trang qua web server (ví dụ <code>python3 -m http.server</code>), không mở trực tiếp file index.html.</p>
      <pre>${esc(e.message)}</pre></div>`;
    return;
  }
  app.byId = new Map(app.problems.map((p) => [p.id, p]));
  store.subscribe(updateTopStats);
  updateTopStats();
  window.addEventListener("hashchange", render);
  render();
}

main();
