Chương 5 – Trực quan hoá dữ liệu với Matplotlib. Hệ thống chấm bằng cách kiểm tra đối tượng biểu đồ (Axes/Figure) mà hàm trả về.

===== v01
@title: Biểu đồ đường doanh thu
@level: easy
@topic: viz
@fn: plot_revenue
::: statement
Viết hàm `plot_revenue(months, revenue)` vẽ **biểu đồ đường** (line chart) với:
- marker hình tròn `'o'`
- tiêu đề `"Doanh thu theo tháng"`, nhãn trục x `"Tháng"`, trục y `"Doanh thu"`

và **trả về đối tượng `ax`** (Axes).
::: starter
import matplotlib.pyplot as plt


def plot_revenue(months, revenue):
    fig, ax = plt.subplots(figsize=(6, 3.5))
    # vẽ ở đây
    return ax


plot_revenue(["T1", "T2", "T3", "T4"], [120, 135, 128, 160])
::: solution
import matplotlib.pyplot as plt


def plot_revenue(months, revenue):
    fig, ax = plt.subplots(figsize=(6, 3.5))
    ax.plot(months, revenue, marker="o")
    ax.set_title("Doanh thu theo tháng")
    ax.set_xlabel("Tháng")
    ax.set_ylabel("Doanh thu")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.figure import Figure


def _ax(r):
    if isinstance(r, Axes):
        return r
    if isinstance(r, Figure) and r.axes:
        return r.axes[0]
    return None


def check(ns):
    res = []
    fn = ns.get("plot_revenue")
    if not callable(fn):
        return [{"name": "Có hàm plot_revenue", "ok": False, "msg": "Không tìm thấy hàm"}]
    ax = _ax(fn(["T1", "T2", "T3"], [10, 30, 20]))
    res.append({"name": "Trả về Axes", "ok": ax is not None, "msg": "" if ax is not None else "hãy return ax"})
    if ax is None:
        return res
    lines = ax.get_lines()
    res.append({"name": "Có đúng 1 đường", "ok": len(lines) == 1, "msg": f"đang có {len(lines)} đường"})
    if lines:
        ok = list(lines[0].get_ydata()) == [10, 30, 20]
        res.append({"name": "Dữ liệu trục y đúng", "ok": ok, "msg": "" if ok else "dữ liệu không khớp"})
        res.append({"name": "Marker 'o'", "ok": lines[0].get_marker() == "o", "msg": f"marker hiện tại: {lines[0].get_marker()!r}"})
    for name, got, want in [("Tiêu đề", ax.get_title(), "Doanh thu theo tháng"),
                            ("Nhãn trục x", ax.get_xlabel(), "Tháng"),
                            ("Nhãn trục y", ax.get_ylabel(), "Doanh thu")]:
        res.append({"name": name, "ok": got == want, "msg": f"đang là {got!r}, cần {want!r}"})
    plt.close("all")
    return res
::: hints
- `ax.plot(x, y, marker="o")`, `ax.set_title(...)`, `ax.set_xlabel(...)`, `ax.set_ylabel(...)`.
::: explain
Nên dùng giao diện hướng đối tượng `fig, ax = plt.subplots()` thay vì `plt.plot` – dễ kiểm soát khi có nhiều biểu đồ.

===== v02
@title: Biểu đồ cột doanh thu theo khu vực
@level: medium
@topic: viz
@fn: plot_region_bar
::: statement
Viết hàm `plot_region_bar(df)` với bảng sales:
1. bỏ dòng thiếu `region` hoặc `quantity`; tính tổng doanh thu (quantity × unit_price) theo region
2. vẽ **biểu đồ cột dọc**, các cột **sắp xếp giảm dần** theo doanh thu, tên khu vực trên trục x
3. tiêu đề `"Doanh thu theo khu vực"`

Trả về `ax`.
::: starter
import matplotlib.pyplot as plt
import pandas as pd


def plot_region_bar(df):
    fig, ax = plt.subplots(figsize=(6, 3.5))
    # vẽ ở đây
    return ax


plot_region_bar(pd.read_csv("sales.csv"))
::: solution
import matplotlib.pyplot as plt
import pandas as pd


def plot_region_bar(df):
    d = df.dropna(subset=["region", "quantity"])
    rev = (d["quantity"] * d["unit_price"]).groupby(d["region"]).sum().sort_values(ascending=False)
    fig, ax = plt.subplots(figsize=(6, 3.5))
    ax.bar(rev.index, rev.values, color="#4C78A8")
    ax.set_title("Doanh thu theo khu vực")
    ax.set_ylabel("Doanh thu")
    return ax
::: check
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.axes import Axes
from matplotlib.figure import Figure
from matplotlib.patches import Rectangle


def _ax(r):
    if isinstance(r, Axes):
        return r
    if isinstance(r, Figure) and r.axes:
        return r.axes[0]
    return None


def check(ns):
    df = pd.read_csv("sales.csv")
    d = df.dropna(subset=["region", "quantity"])
    want = (d["quantity"] * d["unit_price"]).groupby(d["region"]).sum().sort_values(ascending=False)
    ax = _ax(ns["plot_region_bar"](df.copy()))
    if ax is None:
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    ax.figure.canvas.draw()
    bars = [p for p in ax.patches if isinstance(p, Rectangle)]
    heights = [round(b.get_height(), 2) for b in bars]
    labels = [t.get_text() for t in ax.get_xticklabels()]
    res = [
        {"name": f"Có {len(want)} cột", "ok": len(bars) == len(want), "msg": f"đang có {len(bars)} cột"},
        {"name": "Chiều cao cột = doanh thu, giảm dần", "ok": heights == [round(v, 2) for v in want.values],
         "msg": f"chiều cao: {heights}"},
        {"name": "Nhãn trục x là tên khu vực theo thứ tự", "ok": labels == list(want.index), "msg": f"nhãn: {labels}"},
        {"name": "Tiêu đề", "ok": ax.get_title() == "Doanh thu theo khu vực", "msg": f"đang là {ax.get_title()!r}"},
    ]
    plt.close("all")
    return res
::: hints
- Tính Series doanh thu bằng `groupby(...).sum().sort_values(ascending=False)`.
- `ax.bar(series.index, series.values)`.
::: explain
Có thể vẽ trực tiếp từ Pandas: `rev.plot(kind="bar", ax=ax)`.

===== v03
@title: Histogram điểm cuối kỳ
@level: easy
@topic: viz
@fn: plot_final_hist
::: statement
Viết hàm `plot_final_hist(df)` vẽ **histogram** điểm `final` (bỏ ô trống) của bảng students với **10 bins** trong khoảng **[0, 10]**, viền đen (`edgecolor="black"`), tiêu đề `"Phân phối điểm cuối kỳ"`. Trả về `ax`.
::: starter
import matplotlib.pyplot as plt
import pandas as pd


def plot_final_hist(df):
    fig, ax = plt.subplots(figsize=(6, 3.5))
    return ax


plot_final_hist(pd.read_csv("students.csv"))
::: solution
import matplotlib.pyplot as plt
import pandas as pd


def plot_final_hist(df):
    fig, ax = plt.subplots(figsize=(6, 3.5))
    ax.hist(df["final"].dropna(), bins=10, range=(0, 10), edgecolor="black")
    ax.set_title("Phân phối điểm cuối kỳ")
    ax.set_xlabel("Điểm")
    ax.set_ylabel("Số sinh viên")
    return ax
::: check
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.axes import Axes
from matplotlib.figure import Figure


def check(ns):
    df = pd.read_csv("students.csv")
    r = ns["plot_final_hist"](df.copy())
    ax = r if isinstance(r, Axes) else (r.axes[0] if isinstance(r, Figure) and r.axes else None)
    if ax is None:
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    want, _ = np.histogram(df["final"].dropna(), bins=10, range=(0, 10))
    got = [int(p.get_height()) for p in ax.patches]
    res = [
        {"name": "Có 10 cột (bins)", "ok": len(got) == 10, "msg": f"đang có {len(got)}"},
        {"name": "Tần suất mỗi bin đúng (khoảng [0, 10])", "ok": got == [int(x) for x in want], "msg": f"{got}"},
        {"name": "Tiêu đề", "ok": ax.get_title() == "Phân phối điểm cuối kỳ", "msg": f"đang là {ax.get_title()!r}"},
    ]
    plt.close("all")
    return res
::: hints
- `ax.hist(data, bins=10, range=(0, 10), edgecolor="black")`.
- `.dropna()` trước khi vẽ.
::: explain
Histogram cho thấy **phân phối** của một biến số; bar chart so sánh các **nhóm**. Đừng nhầm hai loại.

===== v04
@title: Biểu đồ phân tán giờ học – điểm
@level: medium
@topic: viz
@fn: plot_scatter
::: statement
Viết hàm `plot_scatter(df)` vẽ **scatter plot**: trục x là `study_hours`, trục y là `final` (bỏ dòng thiếu final). Thêm **đường hồi quy tuyến tính** (dùng `np.polyfit(x, y, 1)`) dưới dạng một đường thẳng màu đỏ. Nhãn trục x `"Giờ tự học"`, trục y `"Điểm cuối kỳ"`. Trả về `ax`.
::: starter
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def plot_scatter(df):
    fig, ax = plt.subplots(figsize=(6, 4))
    return ax


plot_scatter(pd.read_csv("students.csv"))
::: solution
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def plot_scatter(df):
    d = df.dropna(subset=["final"])
    x, y = d["study_hours"], d["final"]
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.scatter(x, y, alpha=0.7)
    a, b = np.polyfit(x, y, 1)
    xs = np.linspace(x.min(), x.max(), 50)
    ax.plot(xs, a * xs + b, color="red")
    ax.set_xlabel("Giờ tự học")
    ax.set_ylabel("Điểm cuối kỳ")
    return ax
::: check
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.axes import Axes
from matplotlib.figure import Figure


def check(ns):
    df = pd.read_csv("students.csv")
    d = df.dropna(subset=["final"])
    r = ns["plot_scatter"](df.copy())
    ax = r if isinstance(r, Axes) else (r.axes[0] if isinstance(r, Figure) and r.axes else None)
    if ax is None:
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    res = []
    pts = ax.collections[0].get_offsets() if ax.collections else np.empty((0, 2))
    res.append({"name": f"Scatter có {len(d)} điểm", "ok": len(pts) == len(d), "msg": f"đang có {len(pts)} điểm"})
    a, b = np.polyfit(d["study_hours"], d["final"], 1)
    ok_line = False
    for ln in ax.get_lines():
        xs, ys = np.asarray(ln.get_xdata(), float), np.asarray(ln.get_ydata(), float)
        if len(xs) >= 2 and np.allclose(ys, a * xs + b, atol=1e-3):
            ok_line = True
    res.append({"name": "Có đường hồi quy y = ax + b đúng", "ok": ok_line, "msg": f"cần a≈{a:.3f}, b≈{b:.3f}"})
    res.append({"name": "Nhãn trục x", "ok": ax.get_xlabel() == "Giờ tự học", "msg": f"{ax.get_xlabel()!r}"})
    res.append({"name": "Nhãn trục y", "ok": ax.get_ylabel() == "Điểm cuối kỳ", "msg": f"{ax.get_ylabel()!r}"})
    plt.close("all")
    return res
::: hints
- `ax.scatter(x, y)`; `a, b = np.polyfit(x, y, 1)`; vẽ `ax.plot(xs, a * xs + b, color="red")`.
::: explain
Scatter + đường hồi quy là cách nhanh nhất để "nhìn" mối quan hệ giữa 2 biến trước khi xây mô hình.

===== v05
@title: Dashboard 2 biểu đồ (subplots)
@level: medium
@topic: viz
@fn: student_dashboard
::: statement
Viết hàm `student_dashboard(df)` tạo **1 Figure gồm 2 biểu đồ cạnh nhau** (`plt.subplots(1, 2)`):
- trái: **boxplot** điểm `final` theo từng `class` (bỏ ô trống), các lớp theo thứ tự chữ cái
- phải: **biểu đồ cột** điểm `final` **trung bình** của từng lớp (cùng thứ tự)
- tiêu đề chung `fig.suptitle("Tổng quan điểm TIN314")`

Trả về **`fig`**.
::: starter
import matplotlib.pyplot as plt
import pandas as pd


def student_dashboard(df):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
    return fig


student_dashboard(pd.read_csv("students.csv"))
::: solution
import matplotlib.pyplot as plt
import pandas as pd


def student_dashboard(df):
    d = df.dropna(subset=["final"])
    classes = sorted(d["class"].unique())
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
    ax1.boxplot([d.loc[d["class"] == c, "final"] for c in classes], labels=classes)
    ax1.set_title("Phân bố điểm")
    means = d.groupby("class")["final"].mean().loc[classes]
    ax2.bar(classes, means.values, color="#59A14F")
    ax2.set_title("Điểm trung bình")
    fig.suptitle("Tổng quan điểm TIN314")
    return fig
::: check
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.figure import Figure


def check(ns):
    df = pd.read_csv("students.csv")
    d = df.dropna(subset=["final"])
    fig = ns["student_dashboard"](df.copy())
    if not isinstance(fig, Figure):
        return [{"name": "Trả về Figure", "ok": False, "msg": f"đang trả về {type(fig).__name__}"}]
    res = [{"name": "Có 2 biểu đồ", "ok": len(fig.axes) == 2, "msg": f"đang có {len(fig.axes)}"}]
    st = fig._suptitle.get_text() if fig._suptitle else ""
    res.append({"name": "Tiêu đề chung", "ok": st == "Tổng quan điểm TIN314", "msg": f"đang là {st!r}"})
    if len(fig.axes) == 2:
        means = d.groupby("class")["final"].mean().sort_index()
        hs = [round(p.get_height(), 4) for p in fig.axes[1].patches]
        res.append({"name": "Cột trung bình mỗi lớp đúng", "ok": hs == [round(v, 4) for v in means.values], "msg": f"{hs}"})
        n_boxes = len([ln for ln in fig.axes[0].get_lines() if ln.get_label() == "_nolegend_" or True]) // 6
        res.append({"name": "Boxplot có 3 hộp", "ok": n_boxes >= 3, "msg": "kiểm tra lại boxplot bên trái"})
    plt.close("all")
    return res
::: hints
- `fig, (ax1, ax2) = plt.subplots(1, 2)`.
- `ax1.boxplot([dữ liệu lớp 1, dữ liệu lớp 2, ...], labels=[...])`.
::: explain
Mỗi hộp của boxplot gồm nhiều đường (median, 2 whisker, 2 cap, outlier). Boxplot thể hiện trung vị, tứ phân vị và **giá trị ngoại lai**.

===== v06
@title: Biểu đồ tròn tỉ trọng danh mục
@level: easy
@topic: viz
@fn: plot_category_pie
::: statement
Viết hàm `plot_category_pie(df)` vẽ **biểu đồ tròn** tỉ trọng **số đơn hàng** theo `category` của bảng sales (đếm số dòng, gồm cả dòng trùng), hiển thị phần trăm `autopct="%1.1f%%"`, nhãn là tên danh mục. Trả về `ax`.
::: starter
import matplotlib.pyplot as plt
import pandas as pd


def plot_category_pie(df):
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    return ax


plot_category_pie(pd.read_csv("sales.csv"))
::: solution
import matplotlib.pyplot as plt
import pandas as pd


def plot_category_pie(df):
    counts = df["category"].value_counts()
    fig, ax = plt.subplots(figsize=(4.5, 4.5))
    ax.pie(counts.values, labels=counts.index, autopct="%1.1f%%", startangle=90)
    ax.set_title("Tỉ trọng đơn hàng theo danh mục")
    return ax
::: check
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.axes import Axes
from matplotlib.figure import Figure
from matplotlib.patches import Wedge


def check(ns):
    df = pd.read_csv("sales.csv")
    counts = df["category"].value_counts()
    r = ns["plot_category_pie"](df.copy())
    ax = r if isinstance(r, Axes) else (r.axes[0] if isinstance(r, Figure) and r.axes else None)
    if ax is None:
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    wedges = [p for p in ax.patches if isinstance(p, Wedge)]
    texts = [t.get_text() for t in ax.texts]
    pct = [f"{v / counts.sum() * 100:.1f}%" for v in counts.values]
    res = [
        {"name": f"Có {len(counts)} miếng", "ok": len(wedges) == len(counts), "msg": f"đang có {len(wedges)}"},
        {"name": "Nhãn tên danh mục", "ok": all(c in texts for c in counts.index), "msg": f"{texts}"},
        {"name": "Hiển thị phần trăm 1 chữ số thập phân", "ok": all(p in texts for p in pct), "msg": f"cần {pct}"},
    ]
    plt.close("all")
    return res
::: hints
- `counts = df["category"].value_counts()`; `ax.pie(counts.values, labels=counts.index, autopct="%1.1f%%")`.
::: explain
Biểu đồ tròn chỉ nên dùng khi số nhóm ít (≤ 5) và muốn nhấn mạnh **tỉ trọng** của tổng thể.
