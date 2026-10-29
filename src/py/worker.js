/* Web worker chạy Python (Pyodide). Giao tiếp với runner.js qua postMessage. */
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
importScripts(PYODIDE_URL + "pyodide.js");

let py = null;
let currentId = null;

const PKG_LABEL = {
  numpy: "NumPy", pandas: "Pandas", matplotlib: "Matplotlib",
  "scikit-learn": "scikit-learn", scipy: "SciPy",
};

function post(type, data = {}) {
  self.postMessage({ type, id: currentId, ...data });
}

async function init(datasets) {
  py = await loadPyodide({ indexURL: PYODIDE_URL });
  py.setStdout({ batched: (s) => post("stdout", { text: s + "\n" }) });
  py.setStderr({ batched: (s) => post("stdout", { text: s + "\n", err: true }) });
  const src = await (await fetch("grader.py")).text();
  py.runPython(src);
  for (const [name, content] of Object.entries(datasets || {})) py.FS.writeFile(name, content);
}

let seabornReady = false;

async function loadImports(code) {
  // seaborn không có sẵn trong Pyodide: cài từ PyPI bằng micropip (thuần Python)
  if (!seabornReady && /^\s*(import|from)\s+seaborn\b/m.test(code)) {
    post("status", { text: "Đang tải thư viện Seaborn…" });
    await py.loadPackage(["micropip", "matplotlib", "pandas", "scipy"]);
    await py.runPythonAsync("import micropip\nawait micropip.install('seaborn==0.13.2')");
    seabornReady = true;
  }
  await py.loadPackagesFromImports(code, {
    messageCallback: (msg) => {
      const m = msg.match(/^Loading (.+)$/);
      if (m) {
        const names = m[1].split(",").map((s) => s.trim())
          .map((n) => PKG_LABEL[n]).filter(Boolean);
        if (names.length) post("status", { text: "Đang tải thư viện " + names.join(", ") + "…" });
      }
    },
    errorCallback: () => {},
  });
}

self.onmessage = async (ev) => {
  const { id, type, payload } = ev.data;
  currentId = id;
  try {
    if (type === "init") {
      await init(payload.datasets);
      post("done", { result: { ready: true } });
      return;
    }
    if (type === "run") {
      await loadImports(payload.code);
      post("status", { text: "" });
      const fn = py.globals.get("run_cell");
      const out = fn(payload.code, payload.fresh !== false, payload.stdin || "", !!payload.reset);
      fn.destroy();
      post("done", { result: JSON.parse(out) });
      return;
    }
    if (type === "grade") {
      const spec = payload.spec;
      const allSrc = [payload.code, spec.solution || "", spec.check || "",
        ...(spec.tests || []).map((t) => t.args)].join("\n");
      await loadImports(allSrc);
      if (/\bpd\.|read_csv/.test(allSrc)) await loadImports("import pandas");
      post("status", { text: "" });
      const fn = py.globals.get("grade");
      const out = fn(payload.code, JSON.stringify(spec));
      fn.destroy();
      post("done", { result: JSON.parse(out) });
      return;
    }
    throw new Error("Unknown message " + type);
  } catch (e) {
    post("fail", { error: String(e && e.message ? e.message : e) });
  }
};
