Bài tập nhỏ đi kèm các bài học Chương 4 – Pandas.

===== u4-01
@title: Tăng trưởng doanh thu theo tháng
@level: easy
@topic: pandas
@unit: c4-1
@fn: tang_truong
::: statement
Cho list doanh thu theo tháng. Viết hàm `tang_truong(ds)` trả về list tỉ lệ tăng trưởng (%) của mỗi tháng so với tháng trước, làm tròn 1 chữ số, **bỏ tháng đầu tiên** (không có tháng trước).

- `tang_truong([100, 120, 90])` → `[20.0, -25.0]`
::: starter
import pandas as pd


def tang_truong(ds):
    s = pd.Series(ds)
    return s.tolist()
::: solution
import pandas as pd


def tang_truong(ds):
    s = pd.Series(ds)
    return (s.pct_change() * 100).round(1).dropna().tolist()
::: tests
[100, 120, 90] ==> [20.0, -25.0]
[50] ==> []
::: hidden
[10, 10, 10] ==> [0.0, 0.0]
[200, 250, 300, 150] ==> [25.0, 20.0, -50.0]
::: hints
- `s.pct_change()` tính (giá trị − giá trị trước) / giá trị trước.
- Phần tử đầu là `NaN` → bỏ bằng `dropna()`.
::: explain
`pct_change` rất hay dùng với dữ liệu tài chính (lợi suất cổ phiếu) và doanh thu.

===== u4-02
@title: Tháng doanh thu cao nhất
@level: easy
@topic: pandas
@unit: c4-1
@fn: thang_cao_nhat
::: statement
Cho dict `{tháng: doanh thu}`. Viết hàm `thang_cao_nhat(d)` dùng `pd.Series` trả về tuple `(tháng, doanh_thu)` của tháng doanh thu cao nhất (không có hoà).

- `thang_cao_nhat({"T1": 50, "T2": 80, "T3": 60})` → `("T2", 80)`
::: starter
import pandas as pd


def thang_cao_nhat(d):
    s = pd.Series(d)
    return s.max()
::: solution
import pandas as pd


def thang_cao_nhat(d):
    s = pd.Series(d)
    return s.idxmax(), s.max()
::: tests
{"T1": 50, "T2": 80, "T3": 60} ==> ("T2", 80)
{"Q4": 1.5} ==> ("Q4", 1.5)
::: hidden
{"A": -3, "B": -1, "C": -2} ==> ("B", -1)
{"T1": 10, "T12": 99, "T2": 98} ==> ("T12", 99)
::: hints
- `s.idxmax()` cho nhãn, `s.max()` cho giá trị.
::: explain
Tạo Series từ dict: khoá thành index – tiện cho mọi thao tác "tìm nhãn của giá trị".

===== u4-03
@title: Bảng điểm có cột tổng
@level: easy
@topic: pandas
@unit: c4-2
@fn: bang_diem
::: statement
Viết hàm `bang_diem(ten, gk, ck)` (ba list cùng độ dài) tạo DataFrame có các cột `ten`, `gk`, `ck`, thêm cột `tong = 0.4 * gk + 0.6 * ck` (làm tròn 2 chữ số) và trả về **list tên** của những người có `tong >= 8`.

- `bang_diem(["An", "Bình"], [8, 6], [9, 7])` → `["An"]`
::: starter
import pandas as pd


def bang_diem(ten, gk, ck):
    df = pd.DataFrame({"ten": ten, "gk": gk, "ck": ck})
    return []
::: solution
import pandas as pd


def bang_diem(ten, gk, ck):
    df = pd.DataFrame({"ten": ten, "gk": gk, "ck": ck})
    df["tong"] = (0.4 * df["gk"] + 0.6 * df["ck"]).round(2)
    return df[df["tong"] >= 8]["ten"].tolist()
::: tests
["An", "Bình"], [8, 6], [9, 7] ==> ["An"]
[], [], [] ==> []
::: hidden
["X", "Y", "Z"], [10, 5, 8], [7, 10, 8] ==> ["X", "Y", "Z"]
["P", "Q"], [7.5, 8], [8.33, 7.5] ==> ["P"]
::: hints
- Thêm cột: `df["tong"] = ...`.
- Lọc rồi lấy cột `ten`: `df[df["tong"] >= 8]["ten"].tolist()`.
::: explain
Test cuối: 0.4 × 7.5 + 0.6 × 8.33 = 7.998 → làm tròn 8.0 ≥ 8. Làm tròn **trước** khi so sánh như đề yêu cầu.

===== u4-04
@title: Đổi tên cột sang tiếng Việt
@level: easy
@topic: pandas
@unit: c4-2
@fn: viet_hoa_cot
::: statement
Viết hàm `viet_hoa_cot()` đọc `customers.csv`, đổi tên cột `customer_id → ma_kh`, `name → ten`, `tier → hang`, `age → tuoi`, **xoá** cột `ma_kh`, rồi trả về list tên các cột còn lại.
::: starter
import pandas as pd


def viet_hoa_cot():
    df = pd.read_csv("customers.csv")
    df.rename(columns={"customer_id": "ma_kh", "name": "ten", "tier": "hang", "age": "tuoi"})
    return df.columns.tolist()
::: solution
import pandas as pd


def viet_hoa_cot():
    df = pd.read_csv("customers.csv")
    df = df.rename(columns={"customer_id": "ma_kh", "name": "ten", "tier": "hang", "age": "tuoi"})
    df = df.drop(columns=["ma_kh"])
    return df.columns.tolist()
::: tests
==> ["ten", "hang", "tuoi"]
::: hints
- `rename` và `drop` trả về bảng mới – phải gán lại `df = ...`.
::: explain
Lỗi kinh điển: gọi `df.rename(...)` mà không gán lại nên không có gì thay đổi.

===== u4-05
@title: Tra cứu sinh viên bằng loc
@level: easy
@topic: pandas
@unit: c4-3
@fn: tra_cuu
::: statement
Viết hàm `tra_cuu(ma)` đọc `students.csv` với `student_id` làm chỉ số và trả về tuple `(tên, lớp)` của sinh viên có mã `ma`. Mã không tồn tại thì trả về `None`.

- `tra_cuu("SV001")` → `("Anh", "K62-A")`
::: starter
import pandas as pd


def tra_cuu(ma):
    df = pd.read_csv("students.csv")
    return df.loc[ma]
::: solution
import pandas as pd


def tra_cuu(ma):
    df = pd.read_csv("students.csv", index_col="student_id")
    if ma not in df.index:
        return None
    return df.loc[ma, "name"], df.loc[ma, "class"]
::: tests
"SV001" ==> ("Anh", "K62-A")
"SV999" ==> None
::: hidden
"SV002"
"SV040"
"sv001" ==> None
::: hints
- `pd.read_csv(..., index_col="student_id")`.
- Kiểm tra `ma in df.index` trước khi `loc`.
::: explain
`df.loc[nhãn_dòng, tên_cột]` lấy đúng một ô. Không kiểm tra trước sẽ gặp `KeyError`.

===== u4-06
@title: Lấy khối dữ liệu bằng iloc
@level: easy
@topic: pandas
@unit: c4-3
@fn: khoi_du_lieu
::: statement
Viết hàm `khoi_du_lieu(n)` đọc `students.csv` và trả về list các **tên** (cột thứ 2, vị trí 1) của `n` dòng **cuối cùng**, theo thứ tự trong file. Dùng `iloc`.
::: starter
import pandas as pd


def khoi_du_lieu(n):
    df = pd.read_csv("students.csv")
    return df.iloc[:n, 1].tolist()
::: solution
import pandas as pd


def khoi_du_lieu(n):
    df = pd.read_csv("students.csv")
    return df.iloc[-n:, 1].tolist()
::: tests
3
1
::: hidden
5
40
::: hints
- n dòng cuối: `df.iloc[-n:]`; cột vị trí 1: `df.iloc[-n:, 1]`.
::: explain
`iloc` dùng vị trí nên hỗ trợ chỉ số âm như list.

===== u4-07
@title: Đếm đơn hàng lớn theo khu vực
@level: easy
@topic: pandas
@unit: c4-4
@fn: dem_don_lon
::: statement
Viết hàm `dem_don_lon(khu_vuc, sl_min)` đọc `sales.csv` và đếm số đơn có `region == khu_vuc` **và** `quantity >= sl_min`.
::: starter
import pandas as pd


def dem_don_lon(khu_vuc, sl_min):
    df = pd.read_csv("sales.csv")
    return len(df[df["region"] == khu_vuc])
::: solution
import pandas as pd


def dem_don_lon(khu_vuc, sl_min):
    df = pd.read_csv("sales.csv")
    return int(((df["region"] == khu_vuc) & (df["quantity"] >= sl_min)).sum())
::: tests
"Hà Nội", 5
"TP.HCM", 8
::: hidden
"Đà Nẵng", 1
"Hải Phòng", 10
"Huế", 1 ==> 0
::: hints
- Kết hợp hai điều kiện bằng `&`, mỗi điều kiện trong ngoặc.
- Đếm: `len(df[...])` hoặc `.sum()` trên mặt nạ.
::: explain
Ô `quantity` bị thiếu (NaN) so sánh `>=` luôn cho False nên tự bị loại.

===== u4-08
@title: Sản phẩm trong khoảng giá
@level: easy
@topic: pandas
@unit: c4-4
@fn: sp_khoang_gia
::: statement
Viết hàm `sp_khoang_gia(lo, hi)` trả về list tên sản phẩm **không trùng lặp, sắp xếp tăng dần** trong `sales.csv` có `unit_price` nằm trong đoạn `[lo, hi]`.
::: starter
import pandas as pd


def sp_khoang_gia(lo, hi):
    df = pd.read_csv("sales.csv")
    return df["product"].tolist()
::: solution
import pandas as pd


def sp_khoang_gia(lo, hi):
    df = pd.read_csv("sales.csv")
    return sorted(df[df["unit_price"].between(lo, hi)]["product"].unique())
::: tests
100, 500
0, 20 ==> ["Bút"]
::: hidden
800, 1000
20000, 30000 ==> []
200, 200 ==> ["Áo thun"]
::: hints
- `between(lo, hi)` gồm cả hai đầu.
- `unique()` bỏ trùng, `sorted()` sắp xếp và trả về list.
::: explain
`between` gọn hơn `(x >= lo) & (x <= hi)`.

===== u4-09
@title: Top N sinh viên
@level: easy
@topic: pandas
@unit: c4-5
@fn: top_sv
::: statement
Viết hàm `top_sv(n)` trả về list tên `n` sinh viên có điểm `final` cao nhất trong `students.csv` (bỏ qua người thiếu điểm). Cùng điểm thì xếp theo tên tăng dần.
::: starter
import pandas as pd


def top_sv(n):
    df = pd.read_csv("students.csv")
    return df.sort_values("final").head(n)["name"].tolist()
::: solution
import pandas as pd


def top_sv(n):
    df = pd.read_csv("students.csv").dropna(subset=["final"])
    df = df.sort_values(["final", "name"], ascending=[False, True])
    return df.head(n)["name"].tolist()
::: tests
3
1
::: hidden
5
10
::: hints
- `sort_values(["final", "name"], ascending=[False, True])`.
::: explain
`sort_values` mặc định tăng dần – đọc kỹ "cao nhất". Tiêu chí phụ khi hoà giúp kết quả luôn xác định.

===== u4-10
@title: Những xe rẻ nhất
@level: easy
@topic: pandas
@unit: c4-5
@fn: xe_re_nhat
::: statement
Viết hàm `xe_re_nhat(n)` đọc `cars.csv` (ô thiếu là `?`), trả về list các tuple `(make, price)` của `n` xe có giá **thấp nhất** (bỏ xe thiếu giá), sắp xếp giá tăng dần; giá là `int`.
::: starter
import pandas as pd


def xe_re_nhat(n):
    df = pd.read_csv("cars.csv")
    return []
::: solution
import pandas as pd


def xe_re_nhat(n):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    top = df.nsmallest(n, "price")
    return [(m, int(p)) for m, p in zip(top["make"], top["price"])]
::: tests
3
::: hidden
1
5
::: hints
- `df.nsmallest(n, "price")`.
- `zip(top["make"], top["price"])` để ghép từng cặp.
::: explain
Cột có `NaN` được đọc thành float → đổi `int(p)` theo yêu cầu.

===== u4-11
@title: Điền giá trị thiếu
@level: easy
@topic: pandas
@unit: c4-6
@fn: dien_thieu
::: statement
Viết hàm `dien_thieu(ds, cach)` nhận list số có thể chứa `None`, trả về list sau khi điền ô thiếu theo `cach`:
- `"mean"` – trung bình các giá trị không thiếu (làm tròn 2 chữ số khi điền)
- `"median"` – trung vị
- `"zero"` – số 0

Kết quả là list số thực.

- `dien_thieu([1, None, 3], "mean")` → `[1.0, 2.0, 3.0]`
::: starter
import pandas as pd


def dien_thieu(ds, cach):
    s = pd.Series(ds, dtype="float")
    return s.fillna(0).tolist()
::: solution
import pandas as pd


def dien_thieu(ds, cach):
    s = pd.Series(ds, dtype="float")
    if cach == "mean":
        v = round(s.mean(), 2)
    elif cach == "median":
        v = s.median()
    else:
        v = 0
    return s.fillna(v).tolist()
::: tests
[1, None, 3], "mean" ==> [1.0, 2.0, 3.0]
[1, None, 3, 10], "median" ==> [1.0, 3.0, 3.0, 10.0]
::: hidden
[None, 5], "zero" ==> [0.0, 5.0]
[1, 2, 2, None], "mean" ==> [1.0, 2.0, 2.0, 1.67]
[4, None, None, 8], "median" ==> [4.0, 6.0, 6.0, 8.0]
::: hints
- `pd.Series(ds, dtype="float")` biến `None` thành `NaN`.
- `s.mean()` / `s.median()` tự bỏ qua `NaN`.
::: explain
Các hàm thống kê của Pandas mặc định bỏ qua ô thiếu (`skipna=True`).

===== u4-12
@title: Làm sạch bảng bán hàng
@level: medium
@topic: pandas
@unit: c4-6
@fn: lam_sach
::: statement
Viết hàm `lam_sach()` đọc `sales.csv` rồi lần lượt:
1. bỏ dòng trùng lặp,
2. bỏ đơn thiếu `quantity`,
3. điền `region` thiếu bằng **mode** của cột `region`.

Trả về tuple `(so_dong, tong_o_thieu_con_lai)`.
::: starter
import pandas as pd


def lam_sach():
    df = pd.read_csv("sales.csv")
    return df.shape[0], int(df.isna().sum().sum())
::: solution
import pandas as pd


def lam_sach():
    df = pd.read_csv("sales.csv").drop_duplicates()
    df = df.dropna(subset=["quantity"])
    df["region"] = df["region"].fillna(df["region"].mode()[0])
    return df.shape[0], int(df.isna().sum().sum())
::: tests
==> (57, 0)
::: hints
- `drop_duplicates()`, `dropna(subset=["quantity"])`.
- `mode()` trả về Series → lấy `[0]`.
::: explain
Thứ tự làm sạch ảnh hưởng kết quả (ví dụ mode tính trước hay sau khi bỏ dòng). Làm đúng thứ tự đề yêu cầu.

===== u4-13
@title: Chuẩn hoá một cột số
@level: easy
@topic: pandas
@unit: c4-7
@fn: chuan_hoa
::: statement
Viết hàm `chuan_hoa(ds, cach)` trả về list giá trị đã chuẩn hoá, làm tròn 3 chữ số:
- `"max"`: x / max
- `"minmax"`: (x − min) / (max − min)
- `"z"`: (x − mean) / std  (std của Pandas, tức chia n − 1)

- `chuan_hoa([2, 4, 6], "minmax")` → `[0.0, 0.5, 1.0]`
::: starter
import pandas as pd


def chuan_hoa(ds, cach):
    x = pd.Series(ds, dtype="float")
    return x.tolist()
::: solution
import pandas as pd


def chuan_hoa(ds, cach):
    x = pd.Series(ds, dtype="float")
    if cach == "max":
        y = x / x.max()
    elif cach == "minmax":
        y = (x - x.min()) / (x.max() - x.min())
    else:
        y = (x - x.mean()) / x.std()
    return y.round(3).tolist()
::: tests
[2, 4, 6], "minmax" ==> [0.0, 0.5, 1.0]
[2, 4, 6], "z" ==> [-1.0, 0.0, 1.0]
::: hidden
[2, 4, 8], "max" ==> [0.25, 0.5, 1.0]
[10, 20, 25, 45], "minmax" ==> [0.0, 0.286, 0.429, 1.0]
[1, 2, 3, 4, 10], "z" ==> [-0.849, -0.566, -0.283, 0.0, 1.697]
::: hints
- Viết đúng công thức trong bảng; Series hỗ trợ trừ/chia cả cột.
::: explain
`Series.std()` mặc định `ddof=1` (mẫu), còn `np.std()` mặc định `ddof=0` (tổng thể) – hai cách cho kết quả hơi khác nhau.

===== u4-14
@title: Mức tiêu hao nhiên liệu trung bình
@level: easy
@topic: pandas
@unit: c4-7
@fn: l100km_tb
::: statement
Trong `cars.csv`, cột `highway_mpg` tính bằng dặm/gallon. Viết hàm `l100km_tb(hang_xe)` đổi sang lít/100 km theo công thức `235 / mpg`, rồi trả về giá trị **trung bình** của các xe thuộc hãng `hang_xe`, làm tròn 2 chữ số.
::: starter
import pandas as pd


def l100km_tb(hang_xe):
    df = pd.read_csv("cars.csv", na_values="?")
    return round(df["highway_mpg"].mean(), 2)
::: solution
import pandas as pd


def l100km_tb(hang_xe):
    df = pd.read_csv("cars.csv", na_values="?")
    df["highway_L100km"] = 235 / df["highway_mpg"]
    return round(df.loc[df["make"] == hang_xe, "highway_L100km"].mean(), 2)
::: tests
"toyota"
"bmw"
::: hidden
"honda"
"mercedes"
"volvo"
::: hints
- Tạo cột mới `235 / df["highway_mpg"]`, lọc theo `make`, rồi `mean()`.
::: explain
Chú ý: trung bình của (235 / mpg) **khác** 235 / (trung bình mpg).

===== u4-15
@title: Phân nhóm giá
@level: easy
@topic: pandas
@unit: c4-8
@fn: muc_gia
::: statement
Viết hàm `muc_gia(gia)` chia list giá thành **3 nhóm có độ rộng bằng nhau** từ min đến max, nhãn `"Thấp"`, `"Trung bình"`, `"Cao"`, và trả về list nhãn tương ứng. Giá trị min thuộc nhóm "Thấp".

- `muc_gia([10, 20, 30, 40])` → `["Thấp", "Thấp", "Trung bình", "Cao"]`
::: starter
import numpy as np
import pandas as pd


def muc_gia(gia):
    pass
::: solution
import numpy as np
import pandas as pd


def muc_gia(gia):
    s = pd.Series(gia)
    bins = np.linspace(s.min(), s.max(), 4)
    return pd.cut(s, bins, labels=["Thấp", "Trung bình", "Cao"], include_lowest=True).astype(str).tolist()
::: tests
[10, 20, 30, 40] ==> ["Thấp", "Thấp", "Trung bình", "Cao"]
[0, 100] ==> ["Thấp", "Cao"]
::: hidden
[5, 6, 7, 8, 9, 10, 11] ==> ["Thấp", "Thấp", "Thấp", "Trung bình", "Trung bình", "Cao", "Cao"]
[100, 1, 50, 67] ==> ["Cao", "Thấp", "Trung bình", "Trung bình"]
::: hints
- 3 nhóm → `np.linspace(min, max, 4)`.
- `pd.cut(..., include_lowest=True)` để min không bị thành NaN.
::: explain
Khoảng của `pd.cut` mặc định đóng bên phải `(a, b]`, nên giá trị đúng bằng mốc chia rơi vào nhóm thấp hơn (20 → "Thấp"; với `[100, 1, 50, 67]` các mốc là 1, 34, 67, 100 nên 67 → "Trung bình").

===== u4-16
@title: Mã hoá biến phân loại
@level: easy
@topic: pandas
@unit: c4-8
@fn: ma_hoa
::: statement
Viết hàm `ma_hoa(ds)` nhận list giá trị phân loại, trả về **dict** `{giá_trị: list 0/1}` – kết quả của `get_dummies` (các khoá theo thứ tự tăng dần, giá trị là số nguyên).

- `ma_hoa(["gas", "diesel", "gas"])` → `{"diesel": [0, 1, 0], "gas": [1, 0, 1]}`
::: starter
import pandas as pd


def ma_hoa(ds):
    pass
::: solution
import pandas as pd


def ma_hoa(ds):
    return pd.get_dummies(pd.Series(ds), dtype=int).to_dict("list")
::: tests
["gas", "diesel", "gas"] ==> {"diesel": [0, 1, 0], "gas": [1, 0, 1]}
["a"] ==> {"a": [1]}
::: hidden
["fwd", "rwd", "4wd", "fwd"] ==> {"4wd": [0, 0, 1, 0], "fwd": [1, 0, 0, 1], "rwd": [0, 1, 0, 0]}
::: hints
- `pd.get_dummies(pd.Series(ds), dtype=int)`.
- `.to_dict("list")` → `{cột: list giá trị}`.
::: explain
Không có `dtype=int`, Pandas 2 trả về True/False.

===== u4-17
@title: Số đơn hàng mỗi tháng
@level: easy
@topic: pandas
@unit: c4-9
@fn: don_theo_thang
::: statement
Viết hàm `don_theo_thang()` đọc `sales.csv` (đã bỏ dòng trùng), trả về dict `{tháng (int): số đơn}` sắp xếp theo tháng tăng dần.
::: starter
import pandas as pd


def don_theo_thang():
    df = pd.read_csv("sales.csv").drop_duplicates()
    return {}
::: solution
import pandas as pd


def don_theo_thang():
    df = pd.read_csv("sales.csv").drop_duplicates()
    thang = pd.to_datetime(df["date"]).dt.month
    return {int(k): int(v) for k, v in thang.value_counts().sort_index().items()}
::: tests
-
::: hints
- `pd.to_datetime(df["date"]).dt.month`.
- `value_counts().sort_index()`.
::: explain
Cột ngày đọc từ CSV là chuỗi – phải `to_datetime` mới dùng được `.dt`.

===== u4-18
@title: Xếp loại bằng apply
@level: easy
@topic: pandas
@unit: c4-9
@fn: xep_loai_lop
::: statement
Viết hàm `xep_loai_lop(diem)` nhận list điểm, dùng `Series.apply` trả về list xếp loại: `"Giỏi"` (≥ 8), `"Khá"` (≥ 6.5), `"Trung bình"` (≥ 5), `"Yếu"` (còn lại).
::: starter
import pandas as pd


def loai(d):
    return "Giỏi"


def xep_loai_lop(diem):
    return pd.Series(diem).apply(loai).tolist()
::: solution
import pandas as pd


def loai(d):
    if d >= 8:
        return "Giỏi"
    if d >= 6.5:
        return "Khá"
    if d >= 5:
        return "Trung bình"
    return "Yếu"


def xep_loai_lop(diem):
    return pd.Series(diem, dtype="float").apply(loai).tolist()
::: tests
[9, 7, 5, 2] ==> ["Giỏi", "Khá", "Trung bình", "Yếu"]
[] ==> []
::: hidden
[8, 6.5, 6.49, 4.99] ==> ["Giỏi", "Khá", "Trung bình", "Yếu"]
::: hints
- Viết hàm `loai(d)` với các nhánh từ cao xuống thấp, rồi `apply(loai)`.
::: explain
`apply` truyền **tên hàm** (không có ngoặc): `apply(loai)`, không phải `apply(loai())`.

===== u4-19
@title: Doanh thu theo khu vực
@level: easy
@topic: pandas
@unit: c4-10
@fn: dt_theo_vung
::: statement
Viết hàm `dt_theo_vung()`: đọc `sales.csv`, bỏ dòng trùng và dòng có ô thiếu, tính `revenue = quantity * unit_price`, trả về dict `{khu vực: tổng doanh thu (int)}`.
::: starter
import pandas as pd


def dt_theo_vung():
    df = pd.read_csv("sales.csv")
    return {}
::: solution
import pandas as pd


def dt_theo_vung():
    df = pd.read_csv("sales.csv").drop_duplicates().dropna()
    df["revenue"] = df["quantity"] * df["unit_price"]
    return {k: int(v) for k, v in df.groupby("region")["revenue"].sum().items()}
::: tests
-
::: hints
- `df.groupby("region")["revenue"].sum()`.
- Duyệt `.items()` để dựng dict với giá trị `int`.
::: explain
`quantity` có NaN nên được đọc thành float – doanh thu ra float, đổi `int` theo yêu cầu.

===== u4-20
@title: Lớp có điểm trung bình cao nhất
@level: easy
@topic: pandas
@unit: c4-10
@fn: lop_tot_nhat
::: statement
Viết hàm `lop_tot_nhat(cot)` trả về tuple `(lớp, điểm TB làm tròn 2)` của lớp có trung bình cột `cot` (`"midterm"` hoặc `"final"`) cao nhất trong `students.csv`.
::: starter
import pandas as pd


def lop_tot_nhat(cot):
    df = pd.read_csv("students.csv")
    tb = df[cot].mean()
    return None
::: solution
import pandas as pd


def lop_tot_nhat(cot):
    df = pd.read_csv("students.csv")
    tb = df.groupby("class")[cot].mean()
    return tb.idxmax(), round(tb.max(), 2)
::: tests
"final"
::: hidden
"midterm"
"study_hours"
::: hints
- `df.groupby("class")[cot].mean()` → Series theo lớp.
- `idxmax()` và `max()`.
::: explain
Kết hợp groupby với idxmax – mẫu rất hay ra trong đề dữ liệu.

===== u4-21
@title: Số lượng bán theo khu vực × danh mục
@level: easy
@topic: pandas
@unit: c4-11
@fn: sl_vung_dm
::: statement
Viết hàm `sl_vung_dm(kv, dm)`: từ `sales.csv` (bỏ dòng trùng), lập bảng pivot **tổng** `quantity` với dòng là `region`, cột là `category`, ô trống điền 0. Trả về giá trị ô `(kv, dm)` dạng `int`; nếu không có dòng/cột đó trả về 0.
::: starter
import pandas as pd


def sl_vung_dm(kv, dm):
    df = pd.read_csv("sales.csv").drop_duplicates()
    pv = df.pivot_table(index="region", columns="category", values="quantity")
    return int(pv.loc[kv, dm])
::: solution
import pandas as pd


def sl_vung_dm(kv, dm):
    df = pd.read_csv("sales.csv").drop_duplicates()
    pv = df.pivot_table(index="region", columns="category", values="quantity", aggfunc="sum", fill_value=0)
    if kv not in pv.index or dm not in pv.columns:
        return 0
    return int(pv.loc[kv, dm])
::: tests
"Hà Nội", "Điện tử"
"TP.HCM", "Thời trang"
::: hidden
"Đà Nẵng", "Văn phòng"
"Hải Phòng", "Điện tử"
"Huế", "Điện tử" ==> 0
::: hints
- `aggfunc="sum"` – mặc định là trung bình!
- Kiểm tra `kv in pv.index` và `dm in pv.columns`.
::: explain
Code mẫu quên `aggfunc="sum"` nên ra số lượng **trung bình**.

===== u4-22
@title: Chi tiêu theo hạng khách hàng
@level: medium
@topic: pandas
@unit: c4-12
@fn: chi_tieu_theo_hang
::: statement
Viết hàm `chi_tieu_theo_hang()`: ghép `sales.csv` (bỏ trùng, bỏ đơn thiếu `quantity`) với `customers.csv` theo `customer_id`, tính doanh thu từng đơn và trả về dict `{hạng (tier): tổng doanh thu (int)}`. Chỉ tính những đơn tìm được khách hàng.
::: starter
import pandas as pd


def chi_tieu_theo_hang():
    s = pd.read_csv("sales.csv")
    c = pd.read_csv("customers.csv")
    return {}
::: solution
import pandas as pd


def chi_tieu_theo_hang():
    s = pd.read_csv("sales.csv").drop_duplicates().dropna(subset=["quantity"])
    c = pd.read_csv("customers.csv")
    m = s.merge(c, on="customer_id", how="inner")
    m["revenue"] = m["quantity"] * m["unit_price"]
    return {k: int(v) for k, v in m.groupby("tier")["revenue"].sum().items()}
::: tests
-
::: hints
- `s.merge(c, on="customer_id")` (inner – chỉ giữ đơn có khách).
- Rồi `groupby("tier")["revenue"].sum()`.
::: explain
Merge → tính cột → groupby: chuỗi thao tác điển hình của một câu hỏi phân tích.

===== u4-23
@title: Nối dữ liệu hai quý
@level: easy
@topic: pandas
@unit: c4-12
@fn: noi_hai_quy
::: statement
Viết hàm `noi_hai_quy(q1, q2)` – mỗi tham số là list các dict `{"thang": ..., "dt": ...}`. Nối hai bảng thành một (chỉ số đánh lại từ 0), sắp xếp theo `thang` tăng dần, trả về list doanh thu `dt`.

- `noi_hai_quy([{"thang": 2, "dt": 5}], [{"thang": 1, "dt": 9}])` → `[9, 5]`
::: starter
import pandas as pd


def noi_hai_quy(q1, q2):
    a = pd.DataFrame(q1)
    b = pd.DataFrame(q2)
    return a.merge(b)["dt"].tolist()
::: solution
import pandas as pd


def noi_hai_quy(q1, q2):
    df = pd.concat([pd.DataFrame(q1), pd.DataFrame(q2)], ignore_index=True)
    return df.sort_values("thang")["dt"].tolist()
::: tests
[{"thang": 2, "dt": 5}], [{"thang": 1, "dt": 9}] ==> [9, 5]
[{"thang": 1, "dt": 1}, {"thang": 3, "dt": 3}], [{"thang": 2, "dt": 2}] ==> [1, 2, 3]
::: hidden
[{"thang": 6, "dt": 60}, {"thang": 4, "dt": 40}], [{"thang": 5, "dt": 50}, {"thang": 1, "dt": 10}] ==> [10, 40, 50, 60]
::: hints
- `pd.concat([a, b], ignore_index=True)`.
::: explain
`merge` ghép ngang theo khoá chung – ở đây không có dòng nào khớp nên kết quả rỗng.

===== u4-24
@title: Nội suy và bỏ cột thiếu nhiều
@level: medium
@topic: pandas
@unit: c4-13
@fn: noi_suy_va_bo_cot
::: statement
Viết hàm `noi_suy_va_bo_cot(data, toi_thieu)`: tạo DataFrame từ `data`, **bỏ các cột** có ít hơn `toi_thieu` ô không thiếu (`dropna(axis=1, thresh=...)`), rồi **nội suy tuyến tính** (`interpolate()`) mọi cột số còn lại. Trả về DataFrame.
::: starter
import pandas as pd


def noi_suy_va_bo_cot(data, toi_thieu):
    df = pd.DataFrame(data)
    return df.dropna()
::: solution
import pandas as pd


def noi_suy_va_bo_cot(data, toi_thieu):
    df = pd.DataFrame(data).dropna(axis=1, thresh=toi_thieu)
    so = df.select_dtypes("number").columns
    df[so] = df[so].interpolate()
    return df
::: tests
{"Thang": [1, 2, 3, 4], "Doanh thu": [10, None, 30, 40], "Ghi chu": [None, None, "x", None]}, 2
::: hidden
{"a": [1.0, None, None, 4.0], "b": [None, None, None, 1.0]}, 2
{"a": [5, None, 7], "b": ["u", "v", "w"]}, 3
::: hints
- `df.dropna(axis=1, thresh=toi_thieu)` bỏ cột.
- Chỉ nội suy cột số: `df.select_dtypes("number").columns`.
::: explain
`interpolate()` điền theo đường thẳng giữa hai giá trị đã biết (10, ?, 30 → 20) – hợp với dữ liệu theo thời gian.

===== u4-25
@title: Gộp các dòng trùng theo tên
@level: medium
@topic: pandas
@unit: c4-13
@fn: gop_trung
::: statement
Thay vì xoá dòng trùng, có thể **gộp** chúng. Viết hàm `gop_trung(data)` – `data` có cột `"Ten"`, `"Chi tieu"`, `"Tuoi"` – gộp các dòng cùng `Ten`: `Chi tieu` lấy **trung bình**, `Tuoi` lấy giá trị **đầu tiên**. Trả về DataFrame có cột `Ten` (không làm index), sắp xếp theo `Ten`.
::: starter
import pandas as pd


def gop_trung(data):
    df = pd.DataFrame(data)
    return df.drop_duplicates(subset=["Ten"])
::: solution
import pandas as pd


def gop_trung(data):
    df = pd.DataFrame(data)
    return df.groupby("Ten", as_index=False).agg({"Chi tieu": "mean", "Tuoi": "first"})
::: tests
{"Ten": ["Lan", "Binh", "Lan"], "Chi tieu": [10, 20, 30], "Tuoi": [25, 21, 26]}
::: hidden
{"Ten": ["A"], "Chi tieu": [5], "Tuoi": [1]}
{"Ten": ["C", "B", "C", "B", "C"], "Chi tieu": [1, 2, 3, 4, 5], "Tuoi": [9, 8, 7, 6, 5]}
::: hints
- `df.groupby("Ten", as_index=False).agg({"Chi tieu": "mean", "Tuoi": "first"})`.
::: explain
`groupby` sắp xếp theo khoá nhóm mặc định; `as_index=False` giữ `Ten` là cột thường.

===== u4-26
@title: Nhóm thu nhập với cut và qcut
@level: easy
@topic: pandas
@unit: c4-14
@fn: nhom_thu_nhap
::: statement
Viết hàm `nhom_thu_nhap(ds, cach)` trả về **dict** `{nhãn: số người}` (thứ tự Thấp, Trung bình, Cao):
- `cach == "cut"`: mốc `[0, 200, 400, 600]`;
- `cach == "qcut"`: 3 nhóm theo phân vị (`q=3`).

Nhãn: `"Thấp"`, `"Trung bình"`, `"Cao"`.
::: starter
import pandas as pd


def nhom_thu_nhap(ds, cach):
    s = pd.Series(ds)
    nhom = pd.cut(s, bins=3, labels=["Thấp", "Trung bình", "Cao"])
    return {k: int(v) for k, v in nhom.value_counts().sort_index().items()}
::: solution
import pandas as pd


def nhom_thu_nhap(ds, cach):
    s = pd.Series(ds)
    nhan = ["Thấp", "Trung bình", "Cao"]
    if cach == "cut":
        nhom = pd.cut(s, bins=[0, 200, 400, 600], labels=nhan)
    else:
        nhom = pd.qcut(s, q=3, labels=nhan)
    return {k: int(v) for k, v in nhom.value_counts().sort_index().items()}
::: tests
[50, 120, 180, 250, 390, 420, 580, 600], "cut" ==> {"Thấp": 3, "Trung bình": 2, "Cao": 3}
[50, 120, 180, 250, 390, 420, 580, 600], "qcut"
::: hidden
[10, 20, 30, 40, 50, 60], "qcut" ==> {"Thấp": 2, "Trung bình": 2, "Cao": 2}
[100, 150, 199, 210], "cut" ==> {"Thấp": 3, "Trung bình": 1, "Cao": 0}
::: hints
- `pd.cut(s, bins=[0, 200, 400, 600], labels=...)`, `pd.qcut(s, q=3, labels=...)`.
- `value_counts().sort_index()` giữ thứ tự nhãn.
::: explain
`bins=3` (code mẫu) chia 3 khoảng **bằng nhau từ min tới max** – khác với mốc đề cho.

===== u4-27
@title: Mã hoá nhãn cho biến mục tiêu
@level: easy
@topic: pandas
@unit: c4-14
@fn: ma_hoa_nhan
::: statement
Viết hàm `ma_hoa_nhan(ds)` dùng `LabelEncoder` trả về tuple `(list mã số, list các lớp theo thứ tự mã)`.

- `ma_hoa_nhan(["gas", "diesel", "gas"])` → `([1, 0, 1], ["diesel", "gas"])`
::: starter
from sklearn.preprocessing import LabelEncoder


def ma_hoa_nhan(ds):
    le = LabelEncoder()
    return le.fit_transform(ds).tolist(), ds
::: solution
from sklearn.preprocessing import LabelEncoder


def ma_hoa_nhan(ds):
    le = LabelEncoder()
    ma = le.fit_transform(ds).tolist()
    return ma, le.classes_.tolist()
::: tests
["gas", "diesel", "gas"] ==> ([1, 0, 1], ["diesel", "gas"])
["b", "c", "a"] ==> ([1, 2, 0], ["a", "b", "c"])
::: hidden
["Trượt", "Đạt", "Đạt"]
["x"] ==> ([0], ["x"])
::: hints
- Sau `fit_transform`, các lớp nằm trong `le.classes_`.
::: explain
Thứ tự mã theo thứ tự sắp xếp Unicode: "Trượt" (T) đứng trước "Đạt" (Đ có mã lớn hơn chữ T không dấu) – không phải thứ tự bảng chữ cái tiếng Việt.

===== u4-28
@title: Sửa lỗi cột điểm kiểu chuỗi
@level: easy
@topic: pandas
@source: Dạng bài tự luận ôn giữa kỳ FTU
@unit: c4-7
@fn: sua_cot_diem
::: statement
Đồng đội viết code lọc sinh viên `diem >= 5` nhưng bị lỗi vì cột `diem` chứa **chuỗi** (có cả giá trị như `"không xác định"`). Viết hàm `sua_cot_diem(data)`: chuyển cột `diem` sang số (giá trị không hợp lệ thành 0), rồi trả về list **tên** những người có điểm ≥ 5.

- `sua_cot_diem({"ten": ["An", "Bình", "Chi"], "diem": ["8", "không xác định", "6"]})` → `["An", "Chi"]`
::: starter
import pandas as pd


def sua_cot_diem(data):
    df = pd.DataFrame(data)
    df["diem"] = df["diem"].fillna(0)
    return df[df["diem"] >= 5]["ten"].tolist()
::: solution
import pandas as pd


def sua_cot_diem(data):
    df = pd.DataFrame(data)
    df["diem"] = pd.to_numeric(df["diem"], errors="coerce").fillna(0)
    return df[df["diem"] >= 5]["ten"].tolist()
::: tests
{"ten": ["An", "Bình", "Chi"], "diem": ["8", "không xác định", "6"]} ==> ["An", "Chi"]
::: hidden
{"ten": ["X", "Y"], "diem": ["4.5", "5"]} ==> ["Y"]
{"ten": ["P", "Q", "R"], "diem": ["N/A", "", "9.25"]} ==> ["R"]
::: hints
- `pd.to_numeric(..., errors="coerce")` biến chuỗi lỗi thành NaN, rồi `fillna(0)`.
::: explain
So sánh chuỗi với số (`"8" >= 5`) gây `TypeError`. `fillna` không có tác dụng vì giá trị lỗi là **chuỗi**, không phải NaN.

===== u4-29
@title: Làm sạch dữ liệu giá ô tô cũ
@level: medium
@topic: pandas
@source: Dạng bài thực hành FTU (Lecture 6–7)
@unit: c4-13
@fn: lam_sach_xe
::: statement
Viết hàm `lam_sach_xe(data)` (dict có các cột `car_id`, `price`, `age`, `km`) thực hiện lần lượt:
1. `price` → số (lỗi thành NaN), bỏ dòng thiếu giá và dòng giá ≤ 0;
2. bỏ trùng theo `car_id`, **giữ bản ghi cuối**;
3. điền `age` thiếu bằng **trung vị**;
4. thêm cột `gia_1000km = price / (km / 1000)` làm tròn 2.

Trả về tuple `(số dòng, list car_id theo thứ tự, list gia_1000km)`.
::: starter
import pandas as pd


def lam_sach_xe(data):
    df = pd.DataFrame(data)
    df = df.dropna(subset=["price"]).drop_duplicates(subset=["car_id"])
    df["gia_1000km"] = df["price"] / df["km"]
    return len(df), df["car_id"].tolist(), df["gia_1000km"].tolist()
::: solution
import pandas as pd


def lam_sach_xe(data):
    df = pd.DataFrame(data)
    df["price"] = pd.to_numeric(df["price"], errors="coerce")
    df = df.dropna(subset=["price"])
    df = df[df["price"] > 0].copy()
    df = df.drop_duplicates(subset=["car_id"], keep="last").copy()
    df["age"] = df["age"].fillna(df["age"].median())
    df["gia_1000km"] = (df["price"] / (df["km"] / 1000)).round(2)
    return len(df), df["car_id"].tolist(), df["gia_1000km"].tolist()
::: tests
{"car_id": ["X1", "X2", "X3", "X1", "X4"], "price": ["500", "lỗi", "-1", "520", "300"], "age": [3, 2, None, 4, None], "km": [40000, 10000, 5000, 52000, 30000]}
::: hidden
{"car_id": ["A", "B"], "price": [100, 200], "age": [None, 6], "km": [10000, 20000]} ==> (2, ["A", "B"], [10.0, 10.0])
{"car_id": ["A", "A", "A"], "price": ["0", "x", "250"], "age": [1, 2, 3], "km": [1000, 1000, 5000]} ==> (1, ["A"], [50.0])
::: hints
- Thứ tự: ép kiểu → bỏ thiếu/≤ 0 → bỏ trùng `keep="last"` → điền median → tạo cột.
- Thêm `.copy()` sau khi lọc để tránh cảnh báo SettingWithCopy.
::: explain
Bỏ trùng **sau** khi loại giá lỗi: nếu bản ghi cuối của một xe bị lỗi giá, bản ghi hợp lệ trước đó vẫn được giữ.
