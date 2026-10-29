// API phía giao diện để chạy Python trong worker; tự khởi động lại worker khi quá thời gian.
import { DATASETS } from "../data/datasets.js";

const WORKER_URL = new URL("./worker.js", import.meta.url);

class PyRunner {
  constructor() {
    this.listeners = new Set();
    this.state = "idle"; // idle | loading | ready | busy
    this.seq = 0;
    this.pending = new Map();
    this.start();
  }

  onState(fn) {
    this.listeners.add(fn);
    fn(this.state, this.stateText);
    return () => this.listeners.delete(fn);
  }

  setState(state, text = "") {
    this.state = state;
    this.stateText = text;
    for (const fn of this.listeners) fn(state, text);
  }

  start() {
    this.worker = new Worker(WORKER_URL);
    this.worker.onmessage = (ev) => this.handle(ev.data);
    this.worker.onerror = (ev) => {
      this.setState("error", "Không khởi động được Python: " + (ev.message || "lỗi mạng"));
    };
    this.setState("loading", "Đang khởi động Python (lần đầu mất ~10 giây)…");
    this.ready = this.send("init", { datasets: DATASETS }, {}).then(() => this.setState("ready"));
    this.ready.catch((e) => this.setState("error", "Không tải được Pyodide: " + e.message));
  }

  restart(reason) {
    this.worker.terminate();
    for (const [, p] of this.pending) p.reject(new Error(reason));
    this.pending.clear();
    this.start();
  }

  handle(msg) {
    const p = this.pending.get(msg.id);
    if (!p) return;
    if (msg.type === "stdout") p.onStdout?.(msg.text, msg.err);
    else if (msg.type === "status") {
      p.onStatus?.(msg.text);
      if (this.state === "busy") this.setState("busy", msg.text || "Đang chạy…");
    } else if (msg.type === "done") {
      clearTimeout(p.timer);
      this.pending.delete(msg.id);
      p.resolve(msg.result);
    } else if (msg.type === "fail") {
      clearTimeout(p.timer);
      this.pending.delete(msg.id);
      p.reject(new Error(msg.error));
    }
  }

  send(type, payload, { onStdout, onStatus, timeout } = {}) {
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      const p = { resolve, reject, onStdout, onStatus };
      if (timeout) {
        p.timer = setTimeout(() => {
          this.restart("timeout");
        }, timeout);
      }
      this.pending.set(id, p);
      this.worker.postMessage({ id, type, payload });
    });
  }

  async exec(type, payload, opts) {
    await this.ready;
    this.setState("busy", "Đang chạy…");
    try {
      return await this.send(type, payload, { timeout: 60000, ...opts });
    } catch (e) {
      if (e.message === "timeout" || e.message === "stopped") {
        const err = new Error(e.message);
        err.kind = e.message;
        throw err;
      }
      throw e;
    } finally {
      if (this.state === "busy") this.setState("ready");
    }
  }

  /** Chạy code kiểu notebook. fresh=false giữ biến giữa các lần chạy. */
  run(code, { fresh = true, stdin = "", reset = false, onStdout, onStatus, timeout } = {}) {
    return this.exec("run", { code, fresh, stdin, reset }, { onStdout, onStatus, timeout });
  }

  /** Chấm bài: spec = {fn, solution, tests:[{args,hidden}], compare, check} */
  grade(code, spec, opts = {}) {
    return this.exec("grade", { code, spec }, opts);
  }

  stop() {
    this.restart("stopped");
  }
}

export const py = new PyRunner();
