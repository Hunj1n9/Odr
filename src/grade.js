// Chấm bài và hiển thị bảng kết quả test (dùng cho trang bài tập và thi thử).
import { py } from "./py/runner.js";
import { specOf } from "./state.js";
import { esc, errorText } from "./ui.js";

/** Trả về {error, warning, results, passed, total, ratio}. */
export async function gradeProblem(p, code, { visibleOnly = false, onStatus } = {}) {
  try {
    const res = await py.grade(code, specOf(p, { visibleOnly }), { timeout: 90000, onStatus });
    const results = res.results || [];
    const passed = results.filter((r) => r.ok).length;
    const total = res.error ? Math.max(results.length, specOf(p, { visibleOnly }).tests.length || 1) : results.length;
    return { ...res, passed, total, ratio: total ? passed / total : 0 };
  } catch (e) {
    return { error: errorText(e), results: [], passed: 0, total: 1, ratio: 0 };
  }
}

/** showHidden: hiện chi tiết cả test ẩn (sau khi đã đạt hoặc khi xem lại bài thi). */
export function renderGrade(el, g, { showHidden = false } = {}) {
  const parts = [];
  const all = !g.error && g.total > 0 && g.passed === g.total;
  parts.push(`<div class="result-head ${all ? "ok" : "bad"}">
    ${all ? "✓ Chính xác!" : g.error ? "✗ Chưa chạy được" : "✗ Chưa đúng hết"}
    <span class="spacer"></span><span>${g.passed}/${g.total} test</span></div>`);
  if (g.error) parts.push(`<div class="output"><pre class="err">${esc(g.error)}</pre></div>`);
  if (g.warning) parts.push(`<div class="output"><pre class="warn">${esc(g.warning)}</pre></div>`);
  if (g.results?.length) {
    const isCheck = g.results[0].name !== undefined;
    const rows = g.results.map((r, i) => {
      const cls = r.ok ? "pass" : "fail";
      const mark = r.ok ? "✓" : "✗";
      if (isCheck) {
        return `<tr class="${cls}"><td>${mark}</td><td>${esc(r.name)}${!r.ok && r.msg ? `<div class="msg">${esc(r.msg)}</div>` : ""}</td></tr>`;
      }
      if (r.hidden && !showHidden) {
        return `<tr class="${cls}"><td>${mark}</td><td colspan="3"><span class="muted">Test ẩn #${i + 1}</span>${!r.ok && r.msg ? `<div class="msg">${esc(r.msg.split("\n").slice(-2).join("\n"))}</div>` : ""}</td></tr>`;
      }
      return `<tr class="${cls}"><td>${mark}</td>
        <td><pre>${esc(r.args || "(không tham số)")}</pre></td>
        <td><pre>${esc(r.expected)}</pre></td>
        <td><pre>${esc(r.got)}</pre>${!r.ok && r.msg ? `<div class="msg">${esc(r.msg)}</div>` : ""}${r.stdout ? `<div class="muted small">print: ${esc(r.stdout)}</div>` : ""}</td></tr>`;
    }).join("");
    const head = isCheck
      ? `<tr><th></th><th>Tiêu chí kiểm tra</th></tr>`
      : `<tr><th></th><th>Đầu vào</th><th>Mong đợi</th><th>Bạn trả về</th></tr>`;
    parts.push(`<div style="overflow-x:auto"><table class="tests">${head}${rows}</table></div>`);
  }
  el.innerHTML = parts.join("");
}
