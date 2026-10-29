# Chạy bên trong Pyodide (web worker). Cung cấp:
#   run_cell(code, fresh, stdin)  -> chạy code kiểu notebook (giá trị dòng cuối được hiển thị)
#   grade(user_code, spec_json)   -> chấm bài theo test case, so với lời giải tham khảo
import ast
import base64
import contextlib
import copy
import io
import json
import linecache
import math
import numbers
import os
import sys
import traceback

import warnings

os.environ.setdefault("MPLBACKEND", "AGG")
warnings.filterwarnings("ignore", message=r"(?s).*Pyarrow will become a required dependency")

USER_FILE = "<bài làm>"
MAX_REPR = 800
_session = {}


def _register_source(code, filename):
    linecache.cache[filename] = (len(code), None, code.splitlines(True), filename)


def _fmt_syntax(e):
    line = (e.text or "").rstrip("\n")
    caret = ""
    if line and e.offset:
        caret = "\n    " + " " * max(e.offset - 1 - (len(line) - len(line.lstrip())), 0) + "^"
    where = f"Dòng {e.lineno}" if e.lineno else "Không rõ dòng"
    body = f"\n    {line.strip()}{caret}" if line else ""
    hint = ""
    if isinstance(e, IndentationError):
        hint = "\nGợi ý: kiểm tra thụt lề (dùng 4 dấu cách) và dấu ':' ở cuối dòng def/if/for/while."
    return f"{where}:{body}\n{type(e).__name__}: {e.msg}{hint}"


_HINTS = {
    "NameError": "Biến/hàm chưa được định nghĩa hoặc viết sai tên (Python phân biệt hoa/thường).",
    "TypeError": "Sai kiểu dữ liệu, ví dụ cộng str với int, hoặc gọi hàm sai số tham số.",
    "IndexError": "Truy cập chỉ số vượt quá độ dài list/chuỗi. Nhớ chỉ số bắt đầu từ 0.",
    "KeyError": "Key không tồn tại trong dict/DataFrame. Kiểm tra tên cột/khóa.",
    "ZeroDivisionError": "Chia cho 0 – cần xử lý trường hợp đặc biệt (list rỗng, mẫu số = 0...).",
    "AttributeError": "Đối tượng không có thuộc tính/phương thức này. Kiểm tra kiểu dữ liệu.",
    "ValueError": "Giá trị không hợp lệ, ví dụ int('abc') hoặc max() của list rỗng.",
    "RecursionError": "Đệ quy quá sâu – thiếu điều kiện dừng?",
    "ModuleNotFoundError": "Thư viện này không có sẵn trong trình duyệt.",
}


def _fmt_exc(e):
    frames = [f for f in traceback.extract_tb(e.__traceback__) if f.filename == USER_FILE]
    lines = ["Traceback (lỗi trong bài làm):"]
    for f in frames:
        lines.append(f"  Dòng {f.lineno}, trong {f.name}")
        if f.line:
            lines.append(f"    {f.line.strip()}")
    lines.append(f"{type(e).__name__}: {e}")
    hint = _HINTS.get(type(e).__name__)
    if hint:
        lines.append(f"Gợi ý: {hint}")
    return "\n".join(lines)


def _collect_figures():
    if "matplotlib.pyplot" not in sys.modules:
        return []
    import matplotlib.pyplot as plt

    out = []
    for n in plt.get_fignums():
        fig = plt.figure(n)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=96, bbox_inches="tight")
        out.append(base64.b64encode(buf.getvalue()).decode())
    plt.close("all")
    return out


def _is_mpl(v):
    if isinstance(v, (list, tuple)) and v:
        return all(_is_mpl(x) for x in v)
    return type(v).__module__.startswith("matplotlib")


def _display(v):
    if v is None or _is_mpl(v):  # Text(...)/[<Line2D>] của matplotlib: biểu đồ đã hiển thị rồi
        return None
    if hasattr(v, "_repr_html_") and not isinstance(v, type):
        try:
            html = v._repr_html_()
            if html:
                return {"html": html}
        except Exception:
            pass
    return {"text": _short(repr(v), 5000)}


def _short(s, limit=MAX_REPR):
    return s if len(s) <= limit else s[:limit] + " …"


def _show(v):
    pd = sys.modules.get("pandas")
    if pd is not None and isinstance(v, (pd.DataFrame, pd.Series)):
        if isinstance(v, pd.DataFrame):
            return _short(v.to_string(max_rows=15, max_cols=10), 2000)
        return _short(v.to_string(max_rows=15), 2000)
    return _short(repr(v))


def run_cell(code, fresh=True, stdin="", reset=False):
    """fresh=True: chạy trong không gian tên mới; fresh=False: dùng chung biến giữa các lần chạy (sổ tay)."""
    global _session
    if reset or not _session:
        _session = {"__name__": "__main__"}
    ns = {"__name__": "__main__"} if fresh else _session
    _register_source(code, USER_FILE)
    lines = stdin.splitlines() if stdin else []

    def fake_input(prompt=""):
        print(prompt, end="")
        if not lines:
            raise EOFError("Hết dữ liệu nhập (stdin) – hãy điền ô Input.")
        val = lines.pop(0)
        print(val)
        return val

    ns["input"] = fake_input
    try:
        tree = ast.parse(code, USER_FILE)
    except SyntaxError as e:
        return json.dumps({"ok": False, "error": _fmt_syntax(e), "figures": []})
    last = None
    if tree.body and isinstance(tree.body[-1], ast.Expr):
        last = ast.Expression(tree.body.pop().value)
    res = {"ok": True, "value": None}
    try:
        exec(compile(tree, USER_FILE, "exec"), ns)
        if last is not None:
            res["value"] = _display(eval(compile(last, USER_FILE, "eval"), ns))
    except BaseException as e:  # noqa: BLE001 – cả SystemExit/KeyboardInterrupt
        res = {"ok": False, "error": _fmt_exc(e)}
    res["figures"] = _collect_figures()
    return json.dumps(res, default=str)


# ---------------------------------------------------------------- so sánh
def _is_num(x):
    return isinstance(x, numbers.Number) and not isinstance(x, bool) and not _is_np_bool(x)


def _is_np_bool(x):
    np = sys.modules.get("numpy")
    return np is not None and isinstance(x, np.bool_)


def _tname(x):
    return type(x).__name__


def same(exp, got, mode="default"):
    """Trả về (đúng?, thông báo)."""
    np = sys.modules.get("numpy")
    pd = sys.modules.get("pandas")

    if pd is not None and isinstance(exp, (pd.DataFrame, pd.Series)):
        if not isinstance(got, type(exp)):
            return False, f"cần trả về {_tname(exp)}, bạn trả về {_tname(got)}"
        try:
            if isinstance(exp, pd.DataFrame):
                pd.testing.assert_frame_equal(
                    exp, got, check_dtype=False, check_index_type=False, check_column_type=False,
                    check_names=False, check_exact=False, rtol=1e-5, atol=1e-6)
            else:
                pd.testing.assert_series_equal(
                    exp, got, check_dtype=False, check_index_type=False, check_names=False,
                    check_exact=False, rtol=1e-5, atol=1e-6)
            return True, ""
        except AssertionError as e:
            return False, _short(str(e).strip(), 300)

    if np is not None and isinstance(exp, np.ndarray):
        if not isinstance(got, np.ndarray):
            return False, f"cần trả về numpy.ndarray, bạn trả về {_tname(got)}"
        if exp.shape != got.shape:
            return False, f"shape khác: cần {exp.shape}, nhận {got.shape}"
        try:
            ok = np.allclose(exp, got, rtol=1e-6, atol=1e-6, equal_nan=True)
        except TypeError:
            ok = np.array_equal(exp, got)
        return bool(ok), "" if ok else "giá trị phần tử khác"

    if isinstance(exp, bool) or _is_np_bool(exp):
        if not (isinstance(got, bool) or _is_np_bool(got)):
            return False, f"cần True/False, bạn trả về {_tname(got)}"
        return bool(exp) == bool(got), ""

    if _is_num(exp):
        if not _is_num(got):
            return False, f"cần một số, bạn trả về {_tname(got)}"
        if isinstance(exp, numbers.Integral) and isinstance(got, numbers.Integral):
            return int(exp) == int(got), ""
        e, g = float(exp), float(got)
        if math.isnan(e) and math.isnan(g):
            return True, ""
        return math.isclose(e, g, rel_tol=1e-6, abs_tol=1e-6), ""

    if isinstance(exp, str):
        if not isinstance(got, str):
            return False, f"cần chuỗi (str), bạn trả về {_tname(got)}"
        return exp == got, ""

    if exp is None:
        return got is None, "" if got is None else f"cần None, bạn trả về {_tname(got)}"

    if isinstance(exp, (list, tuple)):
        if not isinstance(got, (list, tuple)):
            return False, f"cần {_tname(exp)}, bạn trả về {_tname(got)}"
        if type(exp) is not type(got):
            return False, f"cần {_tname(exp)} nhưng bạn trả về {_tname(got)}"
        if len(exp) != len(got):
            return False, f"độ dài khác: cần {len(exp)}, nhận {len(got)}"
        if mode == "unordered":
            try:
                exp, got = sorted(exp, key=repr), sorted(got, key=repr)
            except Exception:
                pass
        for i, (a, b) in enumerate(zip(exp, got)):
            ok, msg = same(a, b, "default")
            if not ok:
                return False, f"phần tử [{i}] sai" + (f" ({msg})" if msg else "")
        return True, ""

    if isinstance(exp, dict):
        if not isinstance(got, dict):
            return False, f"cần dict, bạn trả về {_tname(got)}"
        if set(exp) != set(got):
            miss, extra = set(exp) - set(got), set(got) - set(exp)
            parts = []
            if miss:
                parts.append(f"thiếu key {sorted(miss, key=repr)[:5]}")
            if extra:
                parts.append(f"thừa key {sorted(extra, key=repr)[:5]}")
            return False, ", ".join(parts)
        for k in exp:
            ok, msg = same(exp[k], got[k], mode)
            if not ok:
                return False, f"giá trị của key {k!r} sai" + (f" ({msg})" if msg else "")
        return True, ""

    try:
        return bool(exp == got), ""
    except Exception as e:  # noqa: BLE001
        return False, str(e)


# ---------------------------------------------------------------- chấm bài
def _call_quiet(fn, args):
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        val = fn(*args)
    return val, buf.getvalue()


def _parse_args(src, env):
    src = src.strip()
    if not src:
        return ()
    return eval(f"({src},)", env)


def grade(user_code, spec_json):
    import warnings

    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        return _grade(user_code, spec_json)


def _grade(user_code, spec_json):
    spec = json.loads(spec_json)
    _register_source(user_code, USER_FILE)
    user_ns = {"__name__": "__grader__"}
    out = {"error": None, "results": []}
    try:
        code = compile(user_code, USER_FILE, "exec")
    except SyntaxError as e:
        out["error"] = "Lỗi cú pháp – bài chưa chạy được:\n" + _fmt_syntax(e)
        return json.dumps(out)
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            exec(code, user_ns)
    except BaseException as e:  # noqa: BLE001
        # Nếu hàm cần chấm đã được định nghĩa thì vẫn chấm, chỉ cảnh báo phần code thử bị lỗi.
        if spec.get("fn") and callable(user_ns.get(spec["fn"])) and not spec.get("check"):
            out["warning"] = "Phần code chạy thử ngoài hàm bị lỗi (không ảnh hưởng điểm):\n" + _fmt_exc(e)
        else:
            out["error"] = "Code bị lỗi khi chạy (ngoài hàm):\n" + _fmt_exc(e)
            return json.dumps(out)

    if spec.get("check"):
        check_ns = {"__name__": "__check__", "same": same}
        exec(spec["check"], check_ns)
        try:
            with contextlib.redirect_stdout(io.StringIO()):
                results = check_ns["check"](user_ns)
        except BaseException as e:  # noqa: BLE001
            results = [{"name": "Chạy bài làm", "ok": False, "msg": _fmt_exc(e)}]
        out["results"] = [dict(r, hidden=False) for r in results]
        _collect_figures()
        return json.dumps(out, default=str)

    fn_name = spec["fn"]
    fn = user_ns.get(fn_name)
    if not callable(fn):
        out["error"] = (f"Không tìm thấy hàm {fn_name}(...). Hãy định nghĩa đúng tên hàm như đề bài "
                        f"(Python phân biệt chữ hoa/thường).")
        return json.dumps(out)

    ref_ns = {"__name__": "__ref__"}
    with contextlib.redirect_stdout(io.StringIO()):
        exec(spec["solution"], ref_ns)
    ref = ref_ns[fn_name]

    for t in spec["tests"]:
        r = {"args": t["args"], "hidden": t.get("hidden", False)}
        try:
            args = _parse_args(t["args"], dict(ref_ns))
            expected, _ = _call_quiet(ref, copy.deepcopy(args))
        except BaseException as e:  # noqa: BLE001 – lỗi ở phía đề bài, không phải bài làm
            r.update(ok=False, expected="—", got="—", msg=f"Lỗi bộ test: {type(e).__name__}: {e}")
            out["results"].append(r)
            continue
        r["expected"] = _show(expected)
        try:
            got, printed = _call_quiet(fn, copy.deepcopy(args))
            r["got"] = _show(got)
            ok, msg = same(expected, got, spec.get("compare", "default"))
            if not ok and got is None and printed.strip():
                msg = "hàm đang print() kết quả thay vì return"
            elif not ok and got is None:
                msg = msg or "hàm không return gì (trả về None)"
            r["ok"], r["msg"] = ok, msg
            if printed:
                r["stdout"] = _short(printed, 400)
        except BaseException as e:  # noqa: BLE001
            r["ok"], r["got"], r["msg"] = False, "—", _fmt_exc(e)
        out["results"].append(r)
    _collect_figures()
    return json.dumps(out, default=str)


def solution_output(solution, fn_name, args_src):
    """Dùng cho validator: chạy lời giải và trả về repr kết quả."""
    ns = {"__name__": "__ref__"}
    exec(solution, ns)
    val = ns[fn_name](*_parse_args(args_src, dict(ns)))
    return _show(val)
