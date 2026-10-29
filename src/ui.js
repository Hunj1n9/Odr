// Tiện ích giao diện dùng chung: markdown, tô màu code, editor, hiển thị kết quả chạy.
import { py } from "./py/runner.js";

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function $(sel, root = document) {
  return root.querySelector(sel);
}
export function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

export function setCrumbs(items) {
  $("#crumbs").innerHTML = items
    .map(([label, href]) => (href ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`))
    .join(" / ");
}

let toastTimer;
export function toast(msg, ms = 2600) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), ms);
}

// ---------------------------------------------------------------- markdown
const encode = (s) => btoa(unescape(encodeURIComponent(s)));
const decode = (s) => decodeURIComponent(escape(atob(s)));

/** runnable=true: các khối ```python thành ô code chạy được (dùng trong bài giảng). */
export function md(text, { runnable = false } = {}) {
  const renderer = new marked.Renderer();
  renderer.code = (arg, langArg) => {
    const code = typeof arg === "object" ? arg.text : arg;
    const lang = (typeof arg === "object" ? arg.lang : langArg) || "";
    if (runnable && lang === "python") {
      return `<div class="cell" data-code="${encode(code)}"></div>`;
    }
    return `<pre><code class="language-${esc(lang)}">${esc(code)}</code></pre>`;
  };
  return marked.parse(text, { renderer, gfm: true, breaks: false });
}

/** Tô màu tĩnh các khối code python sau khi chèn HTML. */
export function highlightIn(root) {
  for (const el of $$("pre code", root)) {
    const cls = el.className || "";
    if (!/language-(python|py)?$/.test(cls) && cls !== "") continue;
    const text = el.textContent;
    el.textContent = "";
    el.classList.add("hl");
    CodeMirror.runMode(text, "python", el);
  }
}

/** Biến các <div class="cell"> thành ô code + nút chạy. */
export function hydrateCells(root) {
  for (const cell of $$(".cell[data-code]", root)) {
    const code = decode(cell.dataset.code);
    cell.removeAttribute("data-code");
    cell.innerHTML = `<div class="cell-head">
        <span class="tag tag-try">Thử ngay</span>
        <span class="muted small hint">Sửa code rồi chạy lại · Ctrl+Enter</span>
        <span class="spacer"></span>
        <button class="btn small ghost reset" title="Khôi phục code gốc">Làm lại</button>
        <button class="btn small primary run">Chạy</button>
      </div>
      <div class="editor"></div>
      <div class="output"></div>`;
    const out = $(".output", cell);
    const run = () => runInto(ed.getValue(), out);
    const ed = createEditor($(".editor", cell), { value: code, onRun: run, lineNumbers: false });
    $(".run", cell).onclick = run;
    $(".reset", cell).onclick = () => ed.setValue(code);
  }
}

export function renderMarkdownInto(el, text, opts) {
  el.innerHTML = md(text, opts);
  el.classList.add("md");
  // khung "Nói đơn giản": giải thích bằng lời đời thường ở đầu mỗi bài
  el.querySelectorAll("blockquote").forEach((b) => {
    if (b.textContent.trim().startsWith("Nói đơn giản")) b.classList.add("plain");
  });
  highlightIn(el);
  if (opts?.runnable) hydrateCells(el);
}

// ---------------------------------------------------------------- editor
export function createEditor(parent, { value = "", onRun, onSubmit, onChange, lineNumbers = true, readOnly = false } = {}) {
  const cm = CodeMirror(parent, {
    value,
    mode: "python",
    theme: "tin",
    indentUnit: 4,
    tabSize: 4,
    lineNumbers,
    readOnly,
    matchBrackets: true,
    autoCloseBrackets: true,
    viewportMargin: Infinity,
    lineWrapping: false,
    extraKeys: {
      Tab: (c) => (c.somethingSelected() ? c.indentSelection("add") : c.replaceSelection("    ", "end")),
      "Shift-Tab": (c) => c.indentSelection("subtract"),
      "Ctrl-Enter": () => onRun?.(),
      "Cmd-Enter": () => onRun?.(),
      "Shift-Enter": () => onRun?.(),
      "Ctrl-S": () => onSubmit?.(),
      "Cmd-S": () => onSubmit?.(),
      "Ctrl-/": "toggleComment",
      "Cmd-/": "toggleComment",
    },
  });
  if (onChange) cm.on("change", () => onChange(cm.getValue()));
  setTimeout(() => cm.refresh(), 0);
  return cm;
}

// ---------------------------------------------------------------- chạy code
function errorText(e) {
  if (e.kind === "timeout") return "Quá thời gian chạy – có thể do vòng lặp vô hạn (while thiếu bước tăng?). Python đã được khởi động lại.";
  if (e.kind === "stopped") return "Đã dừng chương trình. Python đang khởi động lại…";
  return "Lỗi hệ thống: " + e.message;
}

export function renderResult(out, res, stdout) {
  const parts = [];
  if (stdout) parts.push(`<pre>${esc(stdout)}</pre>`);
  if (res.value?.html) parts.push(`<div class="value">${res.value.html}</div>`);
  else if (res.value?.text) parts.push(`<pre class="value">${esc(res.value.text)}</pre>`);
  for (const f of res.figures || []) parts.push(`<img alt="Biểu đồ" src="data:image/png;base64,${f}">`);
  if (!res.ok) parts.push(`<pre class="err">${esc(res.error)}</pre>`);
  if (!parts.length) parts.push(`<div class="status">✓ Chạy xong (không có output – dùng print() để in kết quả)</div>`);
  out.innerHTML = parts.join("");
}

/** Chạy code và hiển thị vào phần tử out. Trả về kết quả (hoặc null nếu lỗi hệ thống). */
export async function runInto(code, out, { fresh = true, stdin = "" } = {}) {
  let stdout = "";
  out.innerHTML = `<div class="status">Đang chạy… <button class="btn small ghost stop">Dừng</button></div><pre class="live" hidden></pre>`;
  const status = $(".status", out);
  const live = $(".live", out);
  $(".stop", out).onclick = () => py.stop();
  try {
    const res = await py.run(code, {
      fresh,
      stdin,
      timeout: 90000,
      onStdout: (t) => {
        stdout += t;
        live.hidden = false;
        live.textContent = stdout;
      },
      onStatus: (t) => {
        if (t) status.firstChild.textContent = t + " ";
      },
    });
    renderResult(out, res, stdout);
    return res;
  } catch (e) {
    out.innerHTML = (stdout ? `<pre>${esc(stdout)}</pre>` : "") + `<pre class="err">${esc(errorText(e))}</pre>`;
    return null;
  }
}

export { errorText };

export function levelBadge(level) {
  const name = { easy: "Dễ", medium: "Trung bình", hard: "Khó" }[level] || level;
  return `<span class="badge ${esc(level)}">${name}</span>`;
}

export function fmtDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("vi-VN") + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
