import { DATASET_INFO } from "../data/datasets.js";
import { py } from "../py/runner.js";
import { store } from "../store.js";
import { $, createEditor, esc, runInto, setCrumbs, toast } from "../ui.js";

const DEFAULT_CELLS = [
  `# Sổ tay Python: các ô dùng CHUNG biến với nhau (giống Jupyter/Colab).
# Chạy ô: Shift+Enter hoặc Ctrl+Enter. Giá trị ở dòng cuối được hiển thị tự động.
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

sales = pd.read_csv("sales.csv")
sales.head()`,
  `sales.info()
sales.describe()`,
  `sales["revenue"] = sales["quantity"] * sales["unit_price"]
by_region = sales.groupby("region")["revenue"].sum().sort_values()
ax = by_region.plot(kind="barh", title="Doanh thu theo khu vực", figsize=(6, 3))`,
  `# Đọc dữ liệu từ bàn phím: điền ô "Input (stdin)" bên dưới rồi chạy
n = int(input("Nhập n: "))
print("Bình phương:", n ** 2)`,
];

export function playView(view) {
  setCrumbs([["Sổ tay Python"]]);
  view.classList.add("wide");
  let cells = store.data.cells?.length ? [...store.data.cells] : [...DEFAULT_CELLS];
  let counter = 0;

  view.innerHTML = `
    <div class="row" style="margin-bottom:12px">
      <h1 style="margin:0">Sổ tay Python</h1>
      <span class="muted small">Thực hành tự do như Jupyter Notebook – có sẵn NumPy, Pandas, Matplotlib, scikit-learn.</span>
      <span class="spacer"></span>
      <button class="btn small" id="run-all">▶▶ Chạy tất cả</button>
      <button class="btn small" id="restart" title="Xoá mọi biến đã tạo">⟲ Khởi động lại kernel</button>
      <button class="btn small" id="download">⤓ Tải file .py</button>
      <button class="btn small ghost" id="reset-cells">Khôi phục ô mẫu</button>
    </div>
    <div class="grid" style="grid-template-columns:minmax(0,1fr) 300px;align-items:start" id="pl">
      <div id="cells"></div>
      <aside class="card" style="position:sticky;top:72px">
        <h3>Dữ liệu có sẵn</h3>
        <ul class="list-plain small">${DATASET_INFO.map((d) => `<li><code>${esc(d.name)}</code>
          <button class="btn small ghost" data-ds="${esc(d.name)}" title="Thêm ô đọc file">+ ô</button>
          <div class="muted">${esc(d.desc)}</div></li>`).join("")}</ul>
        <h3>Input (stdin)</h3>
        <textarea id="stdin" rows="3" placeholder="Mỗi dòng là một lần input()"></textarea>
        <p class="muted small">Dữ liệu và code chỉ chạy trong trình duyệt của bạn, không gửi lên máy chủ.</p>
      </aside>
    </div>
    <button class="btn" id="add" style="margin-left:52px">+ Thêm ô code</button>`;

  if (matchMedia("(max-width: 1100px)").matches) $("#pl", view).style.gridTemplateColumns = "minmax(0,1fr)";
  const box = $("#cells", view);
  const editors = [];
  const persist = () => store.update((d) => { d.cells = editors.map((e) => e.cm.getValue()); });

  const runCell = async (entry) => {
    entry.prompt.textContent = "[*]";
    await runInto(entry.cm.getValue(), entry.out, { fresh: false, stdin: $("#stdin", view).value });
    entry.prompt.textContent = `[${++counter}]`;
    store.touch();
  };

  const addCell = (code, after = null) => {
    const wrap = document.createElement("div");
    wrap.className = "nb-cell";
    wrap.innerHTML = `<div class="nb-prompt">[ ]</div><div>
      <div class="editor"></div>
      <div class="nb-tools">
        <button class="btn small primary run">▶</button>
        <button class="btn small ghost up" title="Lên">↑</button>
        <button class="btn small ghost down" title="Xuống">↓</button>
        <button class="btn small ghost below" title="Thêm ô bên dưới">+</button>
        <button class="btn small ghost del" title="Xoá ô">🗑</button>
      </div>
      <div class="output"></div></div>`;
    const entry = { wrap, prompt: $(".nb-prompt", wrap), out: $(".output", wrap) };
    entry.cm = createEditor($(".editor", wrap), { value: code, onRun: () => runCell(entry), onChange: persist });
    if (after) {
      after.wrap.after(wrap);
      editors.splice(editors.indexOf(after) + 1, 0, entry);
    } else {
      box.appendChild(wrap);
      editors.push(entry);
    }
    $(".run", wrap).onclick = () => runCell(entry);
    $(".below", wrap).onclick = () => { addCell("", entry).cm.focus(); persist(); };
    $(".del", wrap).onclick = () => {
      wrap.remove();
      editors.splice(editors.indexOf(entry), 1);
      persist();
    };
    $(".up", wrap).onclick = () => {
      const i = editors.indexOf(entry);
      if (i > 0) {
        editors[i - 1].wrap.before(wrap);
        [editors[i - 1], editors[i]] = [editors[i], editors[i - 1]];
        persist();
      }
    };
    $(".down", wrap).onclick = () => {
      const i = editors.indexOf(entry);
      if (i < editors.length - 1) {
        editors[i + 1].wrap.after(wrap);
        [editors[i + 1], editors[i]] = [editors[i], editors[i + 1]];
        persist();
      }
    };
    return entry;
  };

  cells.forEach((c) => addCell(c));
  $("#add", view).onclick = () => { addCell("").cm.focus(); persist(); };
  $("#run-all", view).onclick = async () => {
    for (const e of [...editors]) await runCell(e);
  };
  $("#restart", view).onclick = async () => {
    counter = 0;
    await py.run("", { fresh: false, reset: true });
    for (const e of editors) {
      e.prompt.textContent = "[ ]";
      e.out.innerHTML = "";
    }
    toast("Đã khởi động lại – mọi biến đã bị xoá");
  };
  $("#reset-cells", view).onclick = () => {
    if (!confirm("Thay toàn bộ ô hiện tại bằng các ô mẫu?")) return;
    box.innerHTML = "";
    editors.length = 0;
    DEFAULT_CELLS.forEach((c) => addCell(c));
    persist();
  };
  $("#download", view).onclick = () => {
    const text = editors.map((e, i) => `# %% Ô ${i + 1}\n${e.cm.getValue()}`).join("\n\n") + "\n";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/x-python" }));
    a.download = "so-tay-tin314.py";
    a.click();
  };
  view.querySelectorAll("[data-ds]").forEach((b) => {
    b.onclick = () => {
      const name = b.dataset.ds;
      const v = name.replace(".csv", "");
      addCell(`import pandas as pd\n${v} = pd.read_csv("${name}")\n${v}.head(10)`);
      persist();
      editors[editors.length - 1].wrap.scrollIntoView({ behavior: "smooth" });
    };
  });
}
