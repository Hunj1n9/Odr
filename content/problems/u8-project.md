Bài tập nhỏ đi kèm các bài học Chương 8 – Dự án phân tích dữ liệu.

===== u8-01
@title: Hồ sơ nhanh của bộ dữ liệu
@level: easy
@topic: pandas
@unit: c8-1
@fn: ho_so_du_lieu
::: statement
Trước khi chốt câu hỏi dự án, cần biết dữ liệu có "đủ dùng" không. Viết hàm `ho_so_du_lieu(ten_file, nguong)` đọc file CSV (coi `?` là thiếu) và trả về dict:
- `"so_dong"`: số dòng
- `"so_cot"`: số cột
- `"cot_thieu_nhieu"`: list tên cột có **tỉ lệ thiếu (%) > nguong**, sắp xếp theo tên

- `ho_so_du_lieu("cars.csv", 5)` → `{"so_dong": 80, "so_cot": 10, "cot_thieu_nhieu": ["horsepower"]}`
::: starter
import pandas as pd


def ho_so_du_lieu(ten_file, nguong):
    df = pd.read_csv(ten_file, na_values="?")
    return {"so_dong": len(df), "so_cot": df.shape[1], "cot_thieu_nhieu": []}
::: solution
import pandas as pd


def ho_so_du_lieu(ten_file, nguong):
    df = pd.read_csv(ten_file, na_values="?")
    ti_le = df.isna().mean() * 100
    return {"so_dong": len(df), "so_cot": df.shape[1], "cot_thieu_nhieu": sorted(ti_le[ti_le > nguong].index)}
::: tests
"cars.csv", 5 ==> {"so_dong": 80, "so_cot": 10, "cot_thieu_nhieu": ["horsepower"]}
"students.csv", 5
::: hidden
"cars.csv", 0
"sales.csv", 1
"customers.csv", 0 ==> {"so_dong": 11, "so_cot": 4, "cot_thieu_nhieu": []}
::: hints
- `df.isna().mean()` cho tỉ lệ thiếu từng cột (0..1) → nhân 100.
::: explain
`isna().mean()` – trung bình của True/False chính là tỉ lệ True.

===== u8-02
@title: Hàm làm sạch có thể chạy lại
@level: medium
@topic: pandas
@unit: c8-2
@fn: lam_sach_cars
::: statement
Viết hàm `lam_sach_cars()` thực hiện **đúng thứ tự** trên `cars.csv`:
1. đọc với `na_values="?"`, bỏ dòng trùng
2. bỏ dòng thiếu `price`
3. điền `horsepower` thiếu bằng **trung bình** (tính sau bước 2)
4. thêm cột `highway_L100km = 235 / highway_mpg` (làm tròn 2)

Trả về tuple `(số dòng, tổng ô thiếu còn lại, trung bình horsepower làm tròn 2, trung bình highway_L100km làm tròn 2)`.
::: starter
import pandas as pd


def lam_sach_cars():
    df = pd.read_csv("cars.csv", na_values="?")
    df["horsepower"] = df["horsepower"].fillna(df["horsepower"].mean())
    df = df.dropna(subset=["price"])
    df["highway_L100km"] = (235 / df["highway_mpg"]).round(2)
    return len(df), int(df.isna().sum().sum()), round(df["horsepower"].mean(), 2), round(df["highway_L100km"].mean(), 2)
::: solution
import pandas as pd


def lam_sach_cars():
    df = pd.read_csv("cars.csv", na_values="?").drop_duplicates()
    df = df.dropna(subset=["price"])
    df["horsepower"] = df["horsepower"].fillna(df["horsepower"].mean())
    df["highway_L100km"] = (235 / df["highway_mpg"]).round(2)
    return (len(df), int(df.isna().sum().sum()), round(float(df["horsepower"].mean()), 2),
            round(float(df["highway_L100km"].mean()), 2))
::: tests
-
::: hints
- Thứ tự quan trọng: trung bình horsepower phải tính **sau** khi bỏ dòng thiếu giá.
::: explain
Đổi thứ tự hai bước làm trung bình điền vào khác đi – kết quả (và mô hình phía sau) cũng khác. Đây là lý do cần ghi rõ quy trình.

===== u8-03
@title: Bảng tổng hợp theo nhóm dùng lại được
@level: easy
@topic: pandas
@unit: c8-3
@fn: tong_hop_nhom
::: statement
Viết hàm `tong_hop_nhom(ten_file, nhom, gia_tri)` (coi `?` là thiếu, bỏ dòng thiếu `gia_tri`) trả về dict `{nhóm: (số lượng, trung bình làm tròn 1)}` sắp xếp theo **trung bình giảm dần**.

- Mỗi phần tử có dạng `"rwd": (số xe, giá trung bình)`.
::: starter
import pandas as pd


def tong_hop_nhom(ten_file, nhom, gia_tri):
    df = pd.read_csv(ten_file, na_values="?")
    return {}
::: solution
import pandas as pd


def tong_hop_nhom(ten_file, nhom, gia_tri):
    df = pd.read_csv(ten_file, na_values="?").dropna(subset=[gia_tri])
    t = df.groupby(nhom)[gia_tri].agg(["count", "mean"]).sort_values("mean", ascending=False)
    return {k: (int(r["count"]), round(float(r["mean"]), 1)) for k, r in t.iterrows()}
::: tests
"cars.csv", "drive_wheels", "price"
"students.csv", "class", "final"
::: hidden
"cars.csv", "make", "horsepower"
"students.csv", "gender", "study_hours"
::: hints
- `groupby(nhom)[gia_tri].agg(["count", "mean"])`, rồi `sort_values("mean", ascending=False)`.
- Duyệt `t.iterrows()` để dựng dict.
::: explain
Một hàm, nhiều câu hỏi con: dùng lại cho mọi cặp (nhóm, giá trị) – đúng tinh thần "code dễ hiểu".

===== u8-04
@title: Diễn giải hệ số bằng lời
@level: medium
@topic: ml
@unit: c8-4
@fn: dien_giai
::: statement
Viết hàm `dien_giai(cot, buoc)`: hồi quy tuyến tính đơn `price ~ cot` trên `cars.csv` (bỏ dòng thiếu ở hai cột), rồi trả về câu diễn giải:

`"Khi <cot> tăng <buoc> đơn vị, giá dự đoán <tăng/giảm> khoảng <số> ."` – cụ thể:
- `<số>` = |hệ số × buoc| làm tròn tới hàng đơn vị, viết có dấu phẩy phân cách nghìn (`f"{x:,}"`)
- dùng `"tăng"` nếu hệ số dương, `"giảm"` nếu âm
- câu kết thúc bằng dấu chấm ngay sau số (không có khoảng trắng)

Ví dụ dạng: `"Khi horsepower tăng 10 đơn vị, giá dự đoán tăng khoảng 3,120."`
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def dien_giai(cot, buoc):
    return f"Khi {cot} tăng {buoc} đơn vị, giá dự đoán tăng khoảng 0."
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def dien_giai(cot, buoc):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=[cot, "price"])
    b = LinearRegression().fit(df[[cot]], df["price"]).coef_[0]
    chieu = "tăng" if b > 0 else "giảm"
    so = int(round(abs(b * buoc)))
    return f"Khi {cot} tăng {buoc} đơn vị, giá dự đoán {chieu} khoảng {so:,}."
::: tests
"horsepower", 10
"highway_mpg", 1
::: hidden
"engine_size", 50
"curb_weight", 100
"city_mpg", 5
::: hints
- `b = lm.coef_[0]`; chiều = "tăng" nếu `b > 0`.
- `f"{so:,}"` thêm dấu phẩy phân cách nghìn.
::: explain
Biến con số kỹ thuật thành câu nói kinh doanh là kỹ năng được đánh giá cao khi thuyết trình dự án.

===== u8-05
@title: Tính KPI bán hàng – code dễ hiểu
@level: easy
@topic: collections
@unit: c8-5
@fn: tinh_kpi
::: statement
Viết hàm `tinh_kpi(ds_don)` – mỗi đơn là dict có `"so_luong"` và `"don_gia"`. Trả về dict:
- `"so_don"`: số đơn
- `"doanh_thu"`: tổng `so_luong × don_gia`
- `"gia_tri_tb"`: doanh thu / số đơn, làm tròn 2 (0 nếu không có đơn)
- `"don_lon_nhat"`: doanh thu của đơn lớn nhất (0 nếu không có đơn)

Hãy đặt tên biến rõ nghĩa và viết docstring.
::: starter
def tinh_kpi(ds_don):
    a = len(ds_don)
    b = sum(x["so_luong"] * x["don_gia"] for x in ds_don)
    return {"so_don": a, "doanh_thu": b, "gia_tri_tb": round(b / a, 2), "don_lon_nhat": 0}
::: solution
def tinh_kpi(ds_don):
    """Các chỉ số bán hàng cơ bản từ danh sách đơn hàng."""
    doanh_thu_tung_don = [don["so_luong"] * don["don_gia"] for don in ds_don]
    so_don = len(doanh_thu_tung_don)
    tong = sum(doanh_thu_tung_don)
    return {
        "so_don": so_don,
        "doanh_thu": tong,
        "gia_tri_tb": round(tong / so_don, 2) if so_don else 0,
        "don_lon_nhat": max(doanh_thu_tung_don) if so_don else 0,
    }
::: tests
[{"so_luong": 2, "don_gia": 50}, {"so_luong": 1, "don_gia": 120}] ==> {"so_don": 2, "doanh_thu": 220, "gia_tri_tb": 110.0, "don_lon_nhat": 120}
[] ==> {"so_don": 0, "doanh_thu": 0, "gia_tri_tb": 0, "don_lon_nhat": 0}
::: hidden
[{"so_luong": 3, "don_gia": 15.5}] ==> {"so_don": 1, "doanh_thu": 46.5, "gia_tri_tb": 46.5, "don_lon_nhat": 46.5}
[{"so_luong": 1, "don_gia": 10}, {"so_luong": 1, "don_gia": 10}, {"so_luong": 1, "don_gia": 11}] ==> {"so_don": 3, "doanh_thu": 31, "gia_tri_tb": 10.33, "don_lon_nhat": 11}
::: hints
- Tính list doanh thu từng đơn một lần, dùng lại cho tổng, số đơn và max.
- Xử lý list rỗng trước khi chia.
::: explain
Code mẫu lỗi chia cho 0 với list rỗng và quên tính đơn lớn nhất. Tên biến `a`, `b` khiến lỗi khó phát hiện.
