Bài tập nhỏ đi kèm các bài học Chương 5 – Trực quan hoá dữ liệu.

===== u5-01
@title: Biểu đồ đường có nhãn đầy đủ
@level: easy
@topic: viz
@unit: c5-1
@fn: ve_duong
::: statement
Viết hàm `ve_duong(thang, doanh_thu)` vẽ **một** biểu đồ đường với:
- tiêu đề `"Doanh thu"`
- nhãn trục x `"Tháng"`, nhãn trục y `"Triệu đồng"`
- có điểm đánh dấu (`marker="o"`)

Trả về `ax`.
::: starter
import matplotlib.pyplot as plt


def ve_duong(thang, doanh_thu):
    fig, ax = plt.subplots()
    ax.plot(thang, doanh_thu)
    return ax


ve_duong([1, 2, 3], [10, 12, 9])
::: solution
import matplotlib.pyplot as plt


def ve_duong(thang, doanh_thu):
    fig, ax = plt.subplots()
    ax.plot(thang, doanh_thu, marker="o")
    ax.set_title("Doanh thu")
    ax.set_xlabel("Tháng")
    ax.set_ylabel("Triệu đồng")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes


def check(ns):
    x, y = [1, 2, 3, 4], [10, 14, 12, 18]
    ax = ns["ve_duong"](x, y)
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    lines = ax.get_lines()
    ok_data = len(lines) == 1 and list(lines[0].get_xdata()) == x and list(lines[0].get_ydata()) == y
    res = [
        {"name": "Đúng 1 đường với dữ liệu truyền vào", "ok": ok_data, "msg": f"số đường: {len(lines)}"},
        {"name": "Có marker 'o'", "ok": bool(lines) and lines[0].get_marker() == "o", "msg": "thêm marker=\"o\""},
        {"name": "Tiêu đề 'Doanh thu'", "ok": ax.get_title() == "Doanh thu", "msg": f"đang là {ax.get_title()!r}"},
        {"name": "Nhãn trục x 'Tháng'", "ok": ax.get_xlabel() == "Tháng", "msg": f"đang là {ax.get_xlabel()!r}"},
        {"name": "Nhãn trục y 'Triệu đồng'", "ok": ax.get_ylabel() == "Triệu đồng", "msg": f"đang là {ax.get_ylabel()!r}"},
    ]
    plt.close("all")
    return res
::: hints
- `ax.set_title(...)`, `ax.set_xlabel(...)`, `ax.set_ylabel(...)`.
- `ax.plot(x, y, marker="o")`.
::: explain
Một biểu đồ "đạt chuẩn" luôn có tiêu đề và nhãn trục kèm đơn vị.

===== u5-02
@title: Cột ngang sắp xếp
@level: easy
@topic: viz
@unit: c5-2
@fn: ve_cot_ngang
::: statement
Viết hàm `ve_cot_ngang(d)` nhận dict `{tên sản phẩm: số lượng}`, vẽ **biểu đồ cột ngang** sao cho các cột được sắp **tăng dần từ dưới lên** (cột dài nhất ở trên cùng). Trả về `ax`.
::: starter
import matplotlib.pyplot as plt


def ve_cot_ngang(d):
    fig, ax = plt.subplots()
    ax.bar(list(d.keys()), list(d.values()))
    return ax
::: solution
import matplotlib.pyplot as plt


def ve_cot_ngang(d):
    items = sorted(d.items(), key=lambda kv: kv[1])
    fig, ax = plt.subplots()
    ax.barh([k for k, v in items], [v for k, v in items])
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.patches import Rectangle


def check(ns):
    d = {"Bút": 40, "Laptop": 5, "Sách": 22, "Balo": 13}
    ax = ns["ve_cot_ngang"](dict(d))
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    ax.figure.canvas.draw()
    bars = [p for p in ax.patches if isinstance(p, Rectangle)]
    widths = [round(b.get_width(), 6) for b in bars]
    labels = [t.get_text() for t in ax.get_yticklabels()]
    res = [
        {"name": "Có 4 cột", "ok": len(bars) == 4, "msg": f"đang có {len(bars)} cột"},
        {"name": "Là cột ngang (barh)", "ok": sorted(widths) == [5, 13, 22, 40], "msg": "dùng ax.barh"},
        {"name": "Độ dài tăng dần từ dưới lên", "ok": widths == [5, 13, 22, 40], "msg": f"độ dài theo thứ tự vẽ: {widths}"},
        {"name": "Nhãn trục y đúng thứ tự", "ok": labels == ["Laptop", "Balo", "Sách", "Bút"], "msg": f"nhãn: {labels}"},
    ]
    plt.close("all")
    return res
::: hints
- Sắp xếp `d.items()` theo giá trị tăng dần.
- `ax.barh(nhãn, độ_dài)` vẽ phần tử đầu tiên ở dưới cùng.
::: explain
Với Pandas: `pd.Series(d).sort_values().plot(kind="barh", ax=ax)`.

===== u5-03
@title: Tìm giá trị ngoại lai (IQR)
@level: easy
@topic: viz
@unit: c5-3
@fn: ngoai_lai
::: statement
Viết hàm `ngoai_lai(ds)` trả về list (giữ thứ tự) các giá trị nằm **ngoài** đoạn `[Q1 − 1.5·IQR, Q3 + 1.5·IQR]`, với Q1, Q3 tính bằng `pd.Series(ds).quantile(0.25)` và `quantile(0.75)`.

- `ngoai_lai([10, 12, 11, 13, 12, 50])` → `[50]`
::: starter
import pandas as pd


def ngoai_lai(ds):
    s = pd.Series(ds)
    return s[s > s.mean()].tolist()
::: solution
import pandas as pd


def ngoai_lai(ds):
    s = pd.Series(ds)
    q1, q3 = s.quantile(0.25), s.quantile(0.75)
    iqr = q3 - q1
    return s[(s < q1 - 1.5 * iqr) | (s > q3 + 1.5 * iqr)].tolist()
::: tests
[10, 12, 11, 13, 12, 50] ==> [50]
[1, 2, 3, 4, 5] ==> []
::: hidden
[-40, 5, 6, 7, 6, 5, 7] ==> [-40]
[100, 1, 2, 2, 3, 2, 1, -90] ==> [100, -90]
::: hints
- `q1, q3 = s.quantile(0.25), s.quantile(0.75)`; `iqr = q3 - q1`.
- Lọc với `|` (hoặc) và ngoặc cho từng điều kiện.
::: explain
Đây chính là các điểm được vẽ riêng (chấm tròn) ngoài "râu" của boxplot.

===== u5-04
@title: Histogram với số khoảng cho trước
@level: easy
@topic: viz
@unit: c5-3
@fn: ve_hist
::: statement
Viết hàm `ve_hist(ds, k)` vẽ histogram của list `ds` với đúng `k` khoảng, viền cột màu trắng, tiêu đề `"Phân phối"`. Trả về `ax`.
::: starter
import matplotlib.pyplot as plt


def ve_hist(ds, k):
    fig, ax = plt.subplots()
    ax.hist(ds)
    return ax
::: solution
import matplotlib.pyplot as plt


def ve_hist(ds, k):
    fig, ax = plt.subplots()
    ax.hist(ds, bins=k, edgecolor="white")
    ax.set_title("Phân phối")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.patches import Rectangle


def check(ns):
    ds = [1, 2, 2, 3, 3, 3, 4, 4, 5, 9, 7, 6, 6]
    ax = ns["ve_hist"](ds, 4)
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    bars = [p for p in ax.patches if isinstance(p, Rectangle)]
    total = sum(b.get_height() for b in bars)
    res = [
        {"name": "Đúng 4 cột (bins=k)", "ok": len(bars) == 4, "msg": f"đang có {len(bars)} cột"},
        {"name": "Tổng chiều cao = số phần tử", "ok": round(total) == len(ds), "msg": f"tổng = {total}"},
        {"name": "Tiêu đề 'Phân phối'", "ok": ax.get_title() == "Phân phối", "msg": f"đang là {ax.get_title()!r}"},
    ]
    plt.close("all")
    return res
::: hints
- `ax.hist(ds, bins=k, edgecolor="white")`.
::: explain
Mặc định `bins=10`. Số khoảng ảnh hưởng mạnh tới hình dạng thấy được – thử vài giá trị khi khám phá.

===== u5-05
@title: Hệ số tương quan giữa hai cột
@level: easy
@topic: viz
@unit: c5-4
@fn: tuong_quan
::: statement
Viết hàm `tuong_quan(ten_file, cot1, cot2)` đọc file CSV (coi `?` là thiếu), bỏ các dòng thiếu ở một trong hai cột, trả về hệ số tương quan Pearson làm tròn 3 chữ số.
::: starter
import pandas as pd


def tuong_quan(ten_file, cot1, cot2):
    df = pd.read_csv(ten_file, na_values="?")
    return 0
::: solution
import pandas as pd


def tuong_quan(ten_file, cot1, cot2):
    df = pd.read_csv(ten_file, na_values="?").dropna(subset=[cot1, cot2])
    return round(df[cot1].corr(df[cot2]), 3)
::: tests
"students.csv", "study_hours", "final"
"cars.csv", "engine_size", "price"
::: hidden
"cars.csv", "horsepower", "highway_mpg"
"students.csv", "attendance", "midterm"
"cars.csv", "price", "price" ==> 1.0
::: hints
- `df[cot1].corr(df[cot2])`.
::: explain
`Series.corr` tự bỏ cặp có NaN, nhưng loại trước giúp kết quả rõ ràng và giống `scipy.stats.pearsonr`.

===== u5-06
@title: Scatter với đường xu hướng
@level: medium
@topic: viz
@unit: c5-4
@fn: ve_scatter_xu_huong
::: statement
Viết hàm `ve_scatter_xu_huong(x, y)` vẽ:
1. biểu đồ phân tán các điểm `(x, y)`;
2. **một** đường thẳng xu hướng tính bằng `np.polyfit(x, y, 1)`, vẽ qua các giá trị `x` đã sắp xếp tăng dần.

Trả về `ax`.
::: starter
import numpy as np
import matplotlib.pyplot as plt


def ve_scatter_xu_huong(x, y):
    fig, ax = plt.subplots()
    ax.scatter(x, y)
    return ax
::: solution
import numpy as np
import matplotlib.pyplot as plt


def ve_scatter_xu_huong(x, y):
    a, b = np.polyfit(x, y, 1)
    xs = np.sort(np.array(x, dtype=float))
    fig, ax = plt.subplots()
    ax.scatter(x, y)
    ax.plot(xs, a * xs + b, color="red")
    return ax
::: check
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.axes import Axes


def check(ns):
    x = [5, 1, 3, 2, 4]
    y = [11, 2, 7, 4, 9]
    ax = ns["ve_scatter_xu_huong"](list(x), list(y))
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    pts = [c.get_offsets() for c in ax.collections]
    ok_sc = len(pts) == 1 and sorted(map(tuple, np.round(pts[0], 6).tolist())) == sorted(zip(map(float, x), map(float, y)))
    lines = ax.get_lines()
    a, b = np.polyfit(x, y, 1)
    ok_line = False
    if len(lines) == 1:
        lx = np.asarray(lines[0].get_xdata(), dtype=float)
        ly = np.asarray(lines[0].get_ydata(), dtype=float)
        ok_line = len(lx) >= 2 and np.allclose(ly, a * lx + b) and np.all(np.diff(lx) >= 0)
    res = [
        {"name": "Có scatter đúng các điểm", "ok": bool(ok_sc), "msg": "dùng ax.scatter(x, y)"},
        {"name": "Có đúng 1 đường xu hướng y = a·x + b từ np.polyfit, x tăng dần", "ok": bool(ok_line), "msg": f"số đường: {len(lines)}"},
    ]
    plt.close("all")
    return res
::: hints
- `a, b = np.polyfit(x, y, 1)` – hệ số góc và hệ số chặn.
- `xs = np.sort(np.array(x))`, vẽ `ax.plot(xs, a * xs + b)`.
::: explain
Không sắp xếp x thì đường vẫn đúng về toán học nhưng bị vẽ "đi tới đi lui".

===== u5-07
@title: Dashboard hai biểu đồ
@level: medium
@topic: viz
@unit: c5-5
@fn: dashboard
::: statement
Viết hàm `dashboard(diem)` tạo **một hình có 2 hệ trục cạnh nhau** (1 dòng, 2 cột):
- trái: histogram của `diem`, tiêu đề `"Histogram"`
- phải: boxplot của `diem`, tiêu đề `"Boxplot"`

Trả về `fig`.
::: starter
import matplotlib.pyplot as plt


def dashboard(diem):
    fig, ax = plt.subplots()
    ax.hist(diem)
    return fig
::: solution
import matplotlib.pyplot as plt


def dashboard(diem):
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(8, 3))
    a1.hist(diem)
    a1.set_title("Histogram")
    a2.boxplot(diem)
    a2.set_title("Boxplot")
    fig.tight_layout()
    return fig
::: check
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.patches import Rectangle


def check(ns):
    fig = ns["dashboard"]([5, 6, 7, 7, 8, 9, 3, 10])
    if not isinstance(fig, Figure):
        return [{"name": "Trả về Figure", "ok": False, "msg": "hãy return fig"}]
    axes = fig.axes
    res = [{"name": "Có đúng 2 hệ trục", "ok": len(axes) == 2, "msg": f"đang có {len(axes)}"}]
    if len(axes) == 2:
        a1, a2 = sorted(axes, key=lambda a: a.get_position().x0)
        res.append({"name": "Trái: histogram, tiêu đề 'Histogram'",
                    "ok": any(isinstance(p, Rectangle) for p in a1.patches) and a1.get_title() == "Histogram",
                    "msg": f"tiêu đề {a1.get_title()!r}"})
        res.append({"name": "Phải: boxplot, tiêu đề 'Boxplot'",
                    "ok": len(a2.get_lines()) >= 5 and a2.get_title() == "Boxplot",
                    "msg": f"tiêu đề {a2.get_title()!r}"})
        res.append({"name": "Hai biểu đồ nằm cạnh nhau (cùng hàng)",
                    "ok": abs(a1.get_position().y0 - a2.get_position().y0) < 0.05, "msg": "dùng plt.subplots(1, 2)"})
    plt.close("all")
    return res
::: hints
- `fig, (a1, a2) = plt.subplots(1, 2)`.
- `a2.boxplot(diem)`.
::: explain
Gom các biểu đồ liên quan vào một hình giúp người xem so sánh nhanh – nền tảng của một dashboard.

===== u5-08
@title: Biểu đồ tròn tỉ trọng
@level: easy
@topic: viz
@unit: c5-6
@fn: ve_tron
::: statement
Viết hàm `ve_tron(d)` nhận dict `{danh mục: doanh thu}`, vẽ biểu đồ tròn có nhãn là tên danh mục và **ghi phần trăm 1 chữ số thập phân** trên mỗi lát. Trả về `ax`.
::: starter
import matplotlib.pyplot as plt


def ve_tron(d):
    fig, ax = plt.subplots()
    ax.pie(list(d.values()))
    return ax
::: solution
import matplotlib.pyplot as plt


def ve_tron(d):
    fig, ax = plt.subplots()
    ax.pie(list(d.values()), labels=list(d.keys()), autopct="%1.1f%%")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.patches import Wedge


def check(ns):
    d = {"Điện tử": 50, "Thời trang": 30, "Văn phòng": 20}
    ax = ns["ve_tron"](dict(d))
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    wedges = [p for p in ax.patches if isinstance(p, Wedge)]
    texts = [t.get_text() for t in ax.texts]
    res = [
        {"name": "Có 3 lát", "ok": len(wedges) == 3, "msg": f"đang có {len(wedges)}"},
        {"name": "Có nhãn tên danh mục", "ok": all(k in texts for k in d), "msg": f"chữ trên hình: {texts}"},
        {"name": "Có phần trăm 50.0% / 30.0% / 20.0%", "ok": all(p in texts for p in ["50.0%", "30.0%", "20.0%"]), "msg": "dùng autopct=\"%1.1f%%\""},
    ]
    plt.close("all")
    return res
::: hints
- `ax.pie(values, labels=..., autopct="%1.1f%%")`.
::: explain
`%%` trong chuỗi định dạng kiểu cũ là ký tự `%` thật.

===== u5-09
@title: Giá trung bình theo nhóm
@level: easy
@topic: viz
@unit: c5-7
@fn: gia_theo_nhom
::: statement
Viết hàm `gia_theo_nhom(cot)` đọc `cars.csv` (coi `?` là thiếu, bỏ xe thiếu giá) và trả về dict `{nhóm: giá trung bình làm tròn 0 chữ số (kiểu int)}` theo cột phân loại `cot`, **sắp xếp giảm dần theo giá**.
::: starter
import pandas as pd


def gia_theo_nhom(cot):
    df = pd.read_csv("cars.csv", na_values="?")
    return {}
::: solution
import pandas as pd


def gia_theo_nhom(cot):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    s = df.groupby(cot)["price"].mean().sort_values(ascending=False)
    return {k: int(round(v)) for k, v in s.items()}
::: tests
"drive_wheels"
"fuel_type"
::: hidden
"body_style"
"make"
::: hints
- `df.groupby(cot)["price"].mean().sort_values(ascending=False)`.
::: explain
Dict trong Python giữ thứ tự chèn, nên dựng dict từ Series đã sắp xếp sẽ giữ đúng thứ tự.

===== u5-10
@title: Biến tương quan mạnh nhất với giá
@level: medium
@topic: viz
@unit: c5-7
@fn: bien_manh_nhat
::: statement
Viết hàm `bien_manh_nhat(muc_tieu)`: với `cars.csv` (coi `?` là thiếu, bỏ mọi dòng có ô thiếu), xét các cột **số** khác `muc_tieu`, trả về tuple `(tên cột, r)` của cột có **trị tuyệt đối** hệ số tương quan với `muc_tieu` lớn nhất; `r` làm tròn 3 chữ số (giữ dấu).
::: starter
import pandas as pd


def bien_manh_nhat(muc_tieu):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    c = df.select_dtypes("number").corr()[muc_tieu]
    return c.idxmax(), round(c.max(), 3)
::: solution
import pandas as pd


def bien_manh_nhat(muc_tieu):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    c = df.select_dtypes("number").corr()[muc_tieu].drop(muc_tieu)
    ten = c.abs().idxmax()
    return ten, round(c[ten], 3)
::: tests
"price"
"highway_mpg"
::: hidden
"horsepower"
"city_mpg"
::: hints
- Lấy cột tương quan với mục tiêu, bỏ chính nó bằng `.drop(muc_tieu)`.
- So sánh theo trị tuyệt đối: `c.abs().idxmax()`, rồi lấy lại giá trị có dấu `c[ten]`.
::: explain
Với `highway_mpg`, biến mạnh nhất là `city_mpg` (r ≈ +1) – hai thước đo gần như cùng một thứ. Khi xây mô hình, cặp biến tương quan quá mạnh với nhau gây hiện tượng đa cộng tuyến.

===== u5-11
@title: Kiểm định Pearson
@level: easy
@topic: viz
@unit: c5-8
@fn: kiem_dinh_pearson
::: statement
Viết hàm `kiem_dinh_pearson(x, y)` dùng `scipy.stats.pearsonr` và trả về tuple `(r, p, ket_luan)` với `r` làm tròn 3, `p` làm tròn 4 chữ số, `ket_luan` là `"có ý nghĩa"` nếu p < 0.05, ngược lại `"không có ý nghĩa"`.
::: starter
from scipy import stats


def kiem_dinh_pearson(x, y):
    r = 0
    p = 1
    return r, p, "không có ý nghĩa"
::: solution
from scipy import stats


def kiem_dinh_pearson(x, y):
    r, p = stats.pearsonr(x, y)
    return round(float(r), 3), round(float(p), 4), "có ý nghĩa" if p < 0.05 else "không có ý nghĩa"
::: tests
[1, 2, 3, 4, 5, 6], [2, 4, 5, 4, 6, 8]
[1, 2, 3, 4, 5], [3, 1, 4, 1, 5]
::: hidden
[10, 20, 30, 40, 50, 60, 70], [7, 6, 6, 4, 3, 3, 1]
[1, 2, 3, 4], [10, -3, 8, 2]
::: hints
- `r, p = stats.pearsonr(x, y)`.
::: explain
So sánh `p < 0.05` **trước** khi làm tròn để tránh sai ở sát ngưỡng.

===== u5-12
@title: ANOVA giá xe theo nhóm
@level: medium
@topic: viz
@unit: c5-8
@fn: anova_gia
::: statement
Viết hàm `anova_gia(cot)`: đọc `cars.csv` (coi `?` là thiếu, bỏ xe thiếu giá), chia giá xe thành các nhóm theo cột phân loại `cot`, chạy `scipy.stats.f_oneway` và trả về tuple `(F làm tròn 2, p < 0.05)` – phần tử thứ hai kiểu `bool`.
::: starter
import pandas as pd
from scipy import stats


def anova_gia(cot):
    df = pd.read_csv("cars.csv", na_values="?")
    return 0.0, False
::: solution
import pandas as pd
from scipy import stats


def anova_gia(cot):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    nhom = [g["price"] for _, g in df.groupby(cot)]
    f, p = stats.f_oneway(*nhom)
    return round(float(f), 2), bool(p < 0.05)
::: tests
"drive_wheels"
"body_style"
::: hidden
"fuel_type"
"make"
::: hints
- `nhom = [g["price"] for _, g in df.groupby(cot)]`.
- `stats.f_oneway(*nhom)` – dấu `*` "mở gói" list thành nhiều đối số.
::: explain
`drive_wheels` thường cho F lớn, p rất nhỏ (xe dẫn động cầu sau đắt hơn rõ rệt) → biến đáng đưa vào mô hình.

===== u5-13
@title: Cột màu riêng, có giá trị và tiêu đề
@level: easy
@topic: viz
@unit: c5-9
@fn: ve_cot_day_du
::: statement
Viết hàm `ve_cot_day_du(nhan, gia_tri, mau)` vẽ biểu đồ cột với **màu riêng từng cột** theo list `mau`, ghi **giá trị trên mỗi cột**, có tiêu đề, nhãn trục x và trục y (khác rỗng). Trả về `ax`.
::: starter
import matplotlib.pyplot as plt


def ve_cot_day_du(nhan, gia_tri, mau):
    fig, ax = plt.subplots()
    ax.bar(nhan, gia_tri)
    ax.set_title("Doanh thu")
    return ax
::: solution
import matplotlib.pyplot as plt


def ve_cot_day_du(nhan, gia_tri, mau):
    fig, ax = plt.subplots()
    bars = ax.bar(nhan, gia_tri, color=mau)
    ax.bar_label(bars)
    ax.set_title("Doanh thu theo chi nhánh")
    ax.set_xlabel("Chi nhánh")
    ax.set_ylabel("Doanh thu")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.colors import to_hex
from matplotlib.patches import Rectangle


def check(ns):
    mau = ["#ff0000", "#00aa00", "#0000ff"]
    ax = ns["ve_cot_day_du"](["A", "B", "C"], [7, 2, 5], list(mau))
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    bars = [p for p in ax.patches if isinstance(p, Rectangle)]
    colors = [to_hex(b.get_facecolor()) for b in bars]
    texts = [t.get_text().strip() for t in ax.texts]
    res = [
        {"name": "3 cột, màu theo list mau", "ok": colors == mau, "msg": f"màu: {colors}"},
        {"name": "Giá trị trên mỗi cột", "ok": all(v in texts for v in ["7", "2", "5"]), "msg": f"chữ: {texts}"},
        {"name": "Tiêu đề và nhãn hai trục", "ok": all(x.strip() for x in [ax.get_title(), ax.get_xlabel(), ax.get_ylabel()]), "msg": "set_title / set_xlabel / set_ylabel"},
    ]
    plt.close("all")
    return res
::: hints
- `ax.bar(nhan, gia_tri, color=mau)` – `color` nhận list màu.
- `ax.bar_label(bars)`.
::: explain
Đủ ba yếu tố này là đạt tiêu chí "đẹp và đầy đủ thông tin" của câu vẽ biểu đồ.

===== u5-14
@title: Tóm tắt giá xe theo loại nhiên liệu
@level: easy
@topic: viz
@source: Dạng bài thực hành FTU (Lecture 7)
@unit: c5-7
@fn: tom_tat_nhien_lieu
::: statement
Viết hàm `tom_tat_nhien_lieu()` đọc `cars.csv` (coi `?` là thiếu, bỏ xe thiếu giá), dùng `groupby(...).agg(...)` với **cột đặt tên** để tạo bảng theo `fuel_type` gồm `so_xe` (số xe) và `gia_trung_vi` (trung vị giá). Sắp xếp theo `so_xe` giảm dần; trả về dict `{fuel_type: (so_xe, gia_trung_vi làm tròn 0 – kiểu int)}`.
::: starter
import pandas as pd


def tom_tat_nhien_lieu():
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    t = df.groupby("fuel_type")["price"].mean()
    return t.to_dict()
::: solution
import pandas as pd


def tom_tat_nhien_lieu():
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    t = df.groupby("fuel_type").agg(so_xe=("price", "size"), gia_trung_vi=("price", "median"))
    t = t.sort_values("so_xe", ascending=False)
    return {k: (int(r["so_xe"]), int(round(r["gia_trung_vi"]))) for k, r in t.iterrows()}
::: tests
-
::: hints
- `agg(so_xe=("price", "size"), gia_trung_vi=("price", "median"))`.
::: explain
"Named aggregation" giúp bảng kết quả có tên cột dễ đọc – đúng phong cách đáp án ôn tập FTU.
