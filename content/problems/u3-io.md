Bài tập nhỏ đi kèm các bài học Chương 3 – Nhập và tải dữ liệu, NumPy.

===== u3-01
@title: Đếm số dòng dữ liệu trong file
@level: easy
@topic: io
@unit: c3-1
@fn: dem_dong
::: statement
Viết hàm `dem_dong(ten_file)` mở file văn bản và trả về số dòng **không rỗng** (dòng chỉ chứa khoảng trắng cũng coi là rỗng).

Thử với các file có sẵn: `dem_dong("customers.csv")` → `12` (1 dòng tiêu đề + 11 khách hàng).
::: starter
def dem_dong(ten_file):
    with open(ten_file, encoding="utf-8") as f:
        pass
::: solution
def dem_dong(ten_file):
    with open(ten_file, encoding="utf-8") as f:
        return sum(1 for dong in f if dong.strip())
::: tests
"customers.csv" ==> 12
"students.csv"
::: hidden
"sales.csv"
"stocks.csv"
"cars.csv"
::: hints
- Duyệt `for dong in f:` và đếm khi `dong.strip()` khác rỗng.
::: explain
Chuỗi rỗng `""` được coi là False, nên `if dong.strip():` nghĩa là "dòng có nội dung".

===== u3-02
@title: Ghi báo cáo đánh số thứ tự
@level: easy
@topic: io
@unit: c3-1
@fn: ghi_bao_cao
::: statement
Viết hàm `ghi_bao_cao(ten_file, ds)` ghi mỗi phần tử của list `ds` thành một dòng dạng `"<stt>. <nội dung>"` (stt từ 1) vào file `ten_file` (ghi mới), sau đó **đọc lại** file và trả về toàn bộ nội dung.

- `ghi_bao_cao("bc.txt", ["Doanh thu tăng", "Chi phí giảm"])` → `"1. Doanh thu tăng\n2. Chi phí giảm\n"`
::: starter
def ghi_bao_cao(ten_file, ds):
    with open(ten_file, "a", encoding="utf-8") as f:
        for i, x in enumerate(ds, start=1):
            f.write(f"{i}. {x}\n")
    with open(ten_file, encoding="utf-8") as f:
        return f.read()
::: solution
def ghi_bao_cao(ten_file, ds):
    with open(ten_file, "w", encoding="utf-8") as f:
        for i, x in enumerate(ds, start=1):
            f.write(f"{i}. {x}\n")
    with open(ten_file, encoding="utf-8") as f:
        return f.read()
::: tests
"bc.txt", ["Doanh thu tăng", "Chi phí giảm"] ==> "1. Doanh thu tăng\n2. Chi phí giảm\n"
"bc.txt", [] ==> ""
::: hidden
"bc.txt", ["một"] ==> "1. một\n"
"bc2.txt", ["a", "b", "c"] ==> "1. a\n2. b\n3. c\n"
::: hints
- "Ghi mới" là chế độ `"w"`; `"a"` sẽ cộng dồn nội dung của lần gọi trước.
::: explain
Code mẫu dùng `"a"` nên lần gọi thứ hai bị dính nội dung lần đầu – lỗi khó thấy nếu chỉ chạy thử một lần.

===== u3-03
@title: Sản phẩm đắt nhất từ JSON
@level: easy
@topic: io
@unit: c3-2
@fn: dat_nhat
::: statement
API trả về chuỗi JSON là một danh sách sản phẩm, mỗi sản phẩm có `"ten"` và `"gia"`. Viết hàm `dat_nhat(s)` trả về **tên** sản phẩm giá cao nhất (danh sách không rỗng, không có hoà).

- `dat_nhat('[{"ten": "Bút", "gia": 5}, {"ten": "Sách", "gia": 80}]')` → `"Sách"`
::: starter
import json


def dat_nhat(s):
    pass
::: solution
import json


def dat_nhat(s):
    ds = json.loads(s)
    return max(ds, key=lambda sp: sp["gia"])["ten"]
::: tests
'[{"ten": "Bút", "gia": 5}, {"ten": "Sách", "gia": 80}]' ==> "Sách"
'[{"ten": "A", "gia": 1}]' ==> "A"
::: hidden
'[{"ten": "X", "gia": 10.5}, {"ten": "Y", "gia": 3}, {"ten": "Z", "gia": 7}]' ==> "X"
'[{"gia": 2, "ten": "Q"}, {"gia": 99, "ten": "R"}]' ==> "R"
::: hints
- `json.loads(s)` → list các dict.
- `max(ds, key=lambda sp: sp["gia"])` → dict có giá lớn nhất.
::: explain
Kết hợp đọc JSON với `max(..., key=...)` từ Chương 2.

===== u3-04
@title: Tuổi trung bình bằng module csv
@level: easy
@topic: io
@unit: c3-2
@fn: tuoi_tb
::: statement
Viết hàm `tuoi_tb(ten_file, hang)` dùng module `csv` đọc `customers.csv` (cột `customer_id,name,tier,age`) và trả về tuổi trung bình (làm tròn 1 chữ số) của khách hàng có `tier == hang`. Không có khách nào thì trả về `0`.
::: starter
import csv


def tuoi_tb(ten_file, hang):
    with open(ten_file, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    return 0
::: solution
import csv


def tuoi_tb(ten_file, hang):
    with open(ten_file, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    tuoi = [int(r["age"]) for r in rows if r["tier"] == hang]
    return round(sum(tuoi) / len(tuoi), 1) if tuoi else 0
::: tests
"customers.csv", "Vàng"
"customers.csv", "Kim cương" ==> 0
::: hidden
"customers.csv", "Bạc"
"customers.csv", "Đồng"
::: hints
- Giá trị đọc bằng `csv` là chuỗi: `int(r["age"])`.
- Kiểm tra list rỗng trước khi chia.
::: explain
Đây là cách làm "thủ công" – Chương 4 làm việc này một dòng: `df[df.tier == hang].age.mean()`.

===== u3-05
@title: Đếm ô thiếu dữ liệu "?"
@level: easy
@topic: io
@unit: c3-3
@fn: so_o_thieu
::: statement
File `cars.csv` ghi ô thiếu bằng dấu `?`. Viết hàm `so_o_thieu(ten_file, cot)` đọc file bằng Pandas sao cho `?` được hiểu là thiếu, và trả về số ô thiếu (kiểu `int`) của cột `cot`.
::: starter
import pandas as pd


def so_o_thieu(ten_file, cot):
    df = pd.read_csv(ten_file)
    return int(df[cot].isna().sum())
::: solution
import pandas as pd


def so_o_thieu(ten_file, cot):
    df = pd.read_csv(ten_file, na_values="?")
    return int(df[cot].isna().sum())
::: tests
"cars.csv", "horsepower" ==> 6
"cars.csv", "make" ==> 0
::: hidden
"cars.csv", "price"
"students.csv", "final"
"sales.csv", "quantity"
::: hints
- Thêm `na_values="?"` vào `pd.read_csv`.
- `isna().sum()` đếm số ô thiếu.
::: explain
Không có `na_values`, `?` là chuỗi bình thường → không bị coi là thiếu.

===== u3-06
@title: Đọc dữ liệu dạng chuỗi
@level: easy
@topic: io
@unit: c3-3
@fn: diem_cao_nhat
::: statement
Đề cho dữ liệu dạng chuỗi **không có dòng tiêu đề**, các cột cách nhau bởi `;`, gồm: mã SV, tên, điểm. Viết hàm `diem_cao_nhat(text)` trả về **tên** sinh viên điểm cao nhất (không có hoà).

- `diem_cao_nhat("S1;An;7.5\nS2;Bình;9\nS3;Chi;8")` → `"Bình"`
::: starter
import io
import pandas as pd


def diem_cao_nhat(text):
    df = pd.read_csv(io.StringIO(text))
    return df
::: solution
import io
import pandas as pd


def diem_cao_nhat(text):
    df = pd.read_csv(io.StringIO(text), sep=";", header=None, names=["ma", "ten", "diem"])
    return df.loc[df["diem"].idxmax(), "ten"]
::: tests
"S1;An;7.5\nS2;Bình;9\nS3;Chi;8" ==> "Bình"
"S9;Mai;5" ==> "Mai"
::: hidden
"A;X;1\nB;Y;2\nC;Z;10\nD;W;3" ==> "Z"
"A;Lan;9.75\nB;Hoa;9.5" ==> "Lan"
::: hints
- `pd.read_csv(io.StringIO(text), sep=";", header=None, names=[...])`.
- `df["diem"].idxmax()` cho chỉ số dòng có điểm lớn nhất.
::: explain
Ba tham số `sep`, `header=None`, `names` giải quyết phần lớn file CSV "lạ".

===== u3-07
@title: Tóm tắt bộ dữ liệu
@level: easy
@topic: io
@unit: c3-4
@fn: tom_tat
::: statement
Viết hàm `tom_tat(ten_file)` đọc file CSV (coi `?` là thiếu) và trả về tuple `(so_dong, so_cot, so_cot_so)` – trong đó `so_cot_so` là số cột có kiểu số.

- `tom_tat("customers.csv")` → `(11, 4, 1)`
::: starter
import pandas as pd


def tom_tat(ten_file):
    df = pd.read_csv(ten_file, na_values="?")
    return df.shape
::: solution
import pandas as pd


def tom_tat(ten_file):
    df = pd.read_csv(ten_file, na_values="?")
    so_dong, so_cot = df.shape
    return so_dong, so_cot, df.select_dtypes("number").shape[1]
::: tests
"customers.csv" ==> (11, 4, 1)
"cars.csv" ==> (80, 10, 6)
::: hidden
"students.csv"
"sales.csv"
"stocks.csv"
::: hints
- `df.shape` là tuple (dòng, cột).
- `df.select_dtypes("number")` giữ lại các cột số.
::: explain
`select_dtypes("number")` / `select_dtypes("object")` rất tiện để tách cột số và cột chữ khi làm sạch.

===== u3-08
@title: Giá trị phổ biến nhất của một cột
@level: easy
@topic: io
@unit: c3-4
@fn: pho_bien_nhat
::: statement
Viết hàm `pho_bien_nhat(ten_file, cot)` trả về giá trị xuất hiện nhiều nhất trong cột `cot` (bỏ qua ô thiếu). Nếu hoà, lấy giá trị nhỏ nhất (theo thứ tự sắp xếp).

- `pho_bien_nhat("cars.csv", "fuel_type")` → `"gas"`
::: starter
import pandas as pd


def pho_bien_nhat(ten_file, cot):
    df = pd.read_csv(ten_file)
    pass
::: solution
import pandas as pd


def pho_bien_nhat(ten_file, cot):
    vc = pd.read_csv(ten_file)[cot].value_counts()
    return min(vc[vc == vc.max()].index)
::: tests
"cars.csv", "fuel_type" ==> "gas"
"cars.csv", "make"
::: hidden
"sales.csv", "region"
"sales.csv", "product"
"customers.csv", "tier"
"students.csv", "class"
::: hints
- `value_counts()` đếm tần suất, sắp giảm dần.
- Hoà: lọc những giá trị có tần suất bằng `max()` rồi lấy `min`.
::: explain
`value_counts().idxmax()` lấy giá trị đầu tiên khi hoà – thứ tự đó không được đảm bảo theo bảng chữ cái.

===== u3-09
@title: Lưu danh sách sinh viên giỏi
@level: easy
@topic: io
@unit: c3-5
@fn: luu_sv_gioi
::: statement
Viết hàm `luu_sv_gioi(nguong, ten_file)`: đọc `students.csv`, giữ sinh viên có `final >= nguong`, ghi ra `ten_file` **không kèm cột chỉ số**, rồi đọc lại file vừa ghi và trả về tuple `shape` của bảng đọc lại.
::: starter
import pandas as pd


def luu_sv_gioi(nguong, ten_file):
    df = pd.read_csv("students.csv")
    df[df["final"] >= nguong].to_csv(ten_file)
    return pd.read_csv(ten_file).shape
::: solution
import pandas as pd


def luu_sv_gioi(nguong, ten_file):
    df = pd.read_csv("students.csv")
    df[df["final"] >= nguong].to_csv(ten_file, index=False)
    return pd.read_csv(ten_file).shape
::: tests
8, "gioi.csv"
::: hidden
9, "xs.csv"
0, "all.csv"
11, "none.csv"
::: hints
- `to_csv(ten_file, index=False)`.
::: explain
Thiếu `index=False`, file có thêm cột chỉ số nên shape đọc lại có thừa 1 cột (`Unnamed: 0`).

===== u3-10
@title: Truy vấn SQL đếm đơn hàng
@level: medium
@topic: io
@unit: c3-5
@fn: dem_don_sql
::: statement
Viết hàm `dem_don_sql(khu_vuc)`: nạp `sales.csv` vào một CSDL SQLite trong bộ nhớ (bảng `sales`), dùng câu lệnh SQL để đếm số đơn hàng có `region` bằng `khu_vuc`, trả về số nguyên.

Gợi ý câu SQL có tham số: `"SELECT COUNT(*) FROM sales WHERE region = ?"` với `cur.execute(sql, (khu_vuc,))`.
::: starter
import sqlite3
import pandas as pd


def dem_don_sql(khu_vuc):
    conn = sqlite3.connect(":memory:")
    pd.read_csv("sales.csv").to_sql("sales", conn, index=False)
    # viết truy vấn ở đây
    conn.close()
    return 0
::: solution
import sqlite3
import pandas as pd


def dem_don_sql(khu_vuc):
    conn = sqlite3.connect(":memory:")
    pd.read_csv("sales.csv").to_sql("sales", conn, index=False)
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM sales WHERE region = ?", (khu_vuc,))
    n = cur.fetchone()[0]
    conn.close()
    return n
::: tests
"Hà Nội"
"TP.HCM"
::: hidden
"Đà Nẵng"
"Hải Phòng"
"Cần Thơ" ==> 0
::: hints
- `cur = conn.cursor()`, `cur.execute(sql, (khu_vuc,))` – chú ý dấu phẩy để tạo tuple 1 phần tử.
- `cur.fetchone()` trả về tuple, lấy phần tử `[0]`.
::: explain
Dùng tham số `?` thay vì ghép chuỗi vào SQL để tránh lỗi (và lỗ hổng SQL injection) khi giá trị có dấu nháy.

===== u3-11
@title: Thông tin mảng NumPy
@level: easy
@topic: numpy
@unit: c3-6
@fn: thong_tin_mang
::: statement
Viết hàm `thong_tin_mang(ds)` chuyển `ds` (list hoặc list lồng) thành mảng NumPy và trả về tuple `(ndim, shape, size)`.

- `thong_tin_mang([[1, 2, 3], [4, 5, 6]])` → `(2, (2, 3), 6)`
::: starter
import numpy as np


def thong_tin_mang(ds):
    a = np.array(ds)
    return a.shape
::: solution
import numpy as np


def thong_tin_mang(ds):
    a = np.array(ds)
    return a.ndim, a.shape, a.size
::: tests
[[1, 2, 3], [4, 5, 6]] ==> (2, (2, 3), 6)
[1, 2, 3] ==> (1, (3,), 3)
::: hidden
[[1], [2], [3], [4]] ==> (2, (4, 1), 4)
[[[1, 2], [3, 4]], [[5, 6], [7, 8]]] ==> (3, (2, 2, 2), 8)
::: hints
- `a.ndim`, `a.shape`, `a.size` là thuộc tính (không có ngoặc).
::: explain
Mảng 1 chiều có shape `(3,)` – tuple một phần tử, chú ý dấu phẩy.

===== u3-12
@title: Lưới điểm cách đều
@level: easy
@topic: numpy
@unit: c3-6
@fn: luoi_diem
::: statement
Viết hàm `luoi_diem(a, b, n)` trả về **list** gồm `n` số cách đều từ `a` đến `b` (tính cả hai đầu), mỗi số làm tròn 2 chữ số.

- `luoi_diem(0, 1, 5)` → `[0.0, 0.25, 0.5, 0.75, 1.0]`
::: starter
import numpy as np


def luoi_diem(a, b, n):
    return np.arange(a, b, n)
::: solution
import numpy as np


def luoi_diem(a, b, n):
    return np.round(np.linspace(a, b, n), 2).tolist()
::: tests
0, 1, 5 ==> [0.0, 0.25, 0.5, 0.75, 1.0]
10, 20, 3 ==> [10.0, 15.0, 20.0]
::: hidden
0, 1, 4 ==> [0.0, 0.33, 0.67, 1.0]
5, 5, 2 ==> [5.0, 5.0]
-1, 1, 3 ==> [-1.0, 0.0, 1.0]
::: hints
- `np.linspace(a, b, n)` – n điểm, tính cả b.
- `np.round(x, 2).tolist()` để ra list Python.
::: explain
`arange` dùng **bước nhảy** và không lấy điểm cuối; `linspace` dùng **số điểm** và lấy cả điểm cuối.

===== u3-13
@title: Doanh thu từng sản phẩm (vector hoá)
@level: easy
@topic: numpy
@unit: c3-7
@fn: doanh_thu
::: statement
Viết hàm `doanh_thu(gia, so_luong, giam_gia)` – ba list cùng độ dài: đơn giá, số lượng, tỉ lệ giảm giá (0.1 = 10%). Trả về tuple `(list_doanh_thu, tong)`, trong đó doanh thu mỗi sản phẩm = giá × số lượng × (1 − giảm giá), làm tròn 2 chữ số. **Không dùng vòng lặp** – dùng NumPy.

- `doanh_thu([100, 50], [2, 4], [0.1, 0])` → `([180.0, 200.0], 380.0)`
::: starter
import numpy as np


def doanh_thu(gia, so_luong, giam_gia):
    pass
::: solution
import numpy as np


def doanh_thu(gia, so_luong, giam_gia):
    dt = np.array(gia) * np.array(so_luong) * (1 - np.array(giam_gia))
    return np.round(dt, 2).tolist(), round(float(dt.sum()), 2)
::: tests
[100, 50], [2, 4], [0.1, 0] ==> ([180.0, 200.0], 380.0)
[10], [1], [0.5] ==> ([5.0], 5.0)
::: hidden
[19.99, 5.5, 120], [3, 10, 1], [0.15, 0, 0.3] ==> ([50.97, 55.0, 84.0], 189.97)
[1, 2, 3], [0, 0, 0], [0, 0, 0] ==> ([0.0, 0.0, 0.0], 0.0)
::: hints
- Đổi cả ba list thành `np.array` rồi nhân trực tiếp.
- `.tolist()` và `float(...)` để trả về kiểu Python thường.
::: explain
Vector hoá: một biểu thức thay cho cả vòng lặp, chạy nhanh hơn nhiều với dữ liệu lớn.

===== u3-14
@title: Điểm trung bình từng môn
@level: easy
@topic: numpy
@unit: c3-7
@fn: tb_tung_mon
::: statement
Ma trận điểm: mỗi **dòng** là một sinh viên, mỗi **cột** là một môn. Viết hàm `tb_tung_mon(diem)` trả về list điểm trung bình **của từng môn**, làm tròn 2 chữ số.

- `tb_tung_mon([[7, 8], [9, 6]])` → `[8.0, 7.0]`
::: starter
import numpy as np


def tb_tung_mon(diem):
    return np.array(diem).mean(axis=1).round(2).tolist()
::: solution
import numpy as np


def tb_tung_mon(diem):
    return np.array(diem).mean(axis=0).round(2).tolist()
::: tests
[[7, 8], [9, 6]] ==> [8.0, 7.0]
[[1, 2, 3]] ==> [1.0, 2.0, 3.0]
::: hidden
[[5], [6], [10]] ==> [7.0]
[[7.5, 8, 9], [6, 5.5, 10], [8, 9, 7]] ==> [7.17, 7.5, 8.67]
::: hints
- Gộp các dòng (sinh viên) lại → `axis=0`.
::: explain
`axis=1` cho trung bình **từng sinh viên** – nhầm trục là lỗi rất hay gặp.

===== u3-15
@title: Lọc giá trị trên trung bình
@level: easy
@topic: numpy
@unit: c3-8
@fn: tren_tb
::: statement
Viết hàm `tren_tb(ds)` trả về list các phần tử **lớn hơn** giá trị trung bình của `ds`, giữ nguyên thứ tự. Dùng mặt nạ boolean của NumPy.

- `tren_tb([1, 5, 3, 9])` → `[5, 9]`
::: starter
import numpy as np


def tren_tb(ds):
    a = np.array(ds)
    return a.tolist()
::: solution
import numpy as np


def tren_tb(ds):
    a = np.array(ds)
    return a[a > a.mean()].tolist()
::: tests
[1, 5, 3, 9] ==> [5, 9]
[2, 2, 2] ==> []
::: hidden
[10] ==> []
[-5, 0, 5] ==> [5]
[1.5, 2.5, 3.5, 10.0] ==> [10.0]
::: hints
- `a[a > a.mean()]`.
::: explain
`a > a.mean()` tạo mảng True/False cùng độ dài; dùng nó làm chỉ số để lọc.

===== u3-16
@title: Gắn nhãn Đạt / Trượt
@level: easy
@topic: numpy
@unit: c3-8
@fn: gan_nhan
::: statement
Viết hàm `gan_nhan(diem, nguong)` trả về list nhãn `"Đạt"` nếu điểm ≥ ngưỡng, ngược lại `"Trượt"`. Dùng `np.where`.

- `gan_nhan([3, 7, 5], 5)` → `["Trượt", "Đạt", "Đạt"]`
::: starter
import numpy as np


def gan_nhan(diem, nguong):
    pass
::: solution
import numpy as np


def gan_nhan(diem, nguong):
    return np.where(np.array(diem) >= nguong, "Đạt", "Trượt").tolist()
::: tests
[3, 7, 5], 5 ==> ["Trượt", "Đạt", "Đạt"]
[], 5 ==> []
::: hidden
[4, 4, 4], 4 ==> ["Đạt", "Đạt", "Đạt"]
[9.5, 3.9, 4.0], 4 ==> ["Đạt", "Trượt", "Đạt"]
::: hints
- `np.where(điều_kiện, giá_trị_nếu_đúng, giá_trị_nếu_sai)`.
::: explain
`np.where` là phiên bản vector hoá của `x if đk else y`. Nhớ `.tolist()` để trả về list chuỗi Python.

===== u3-17
@title: Phân loại biến định tính – định lượng
@level: easy
@topic: io
@unit: c3-0
@fn: phan_loai_bien
::: statement
Viết hàm `phan_loai_bien(ten_file, cot_ma)` đọc file CSV (coi `?` là thiếu) và trả về dict `{"dinh_luong": [...], "dinh_tinh": [...]}` – list tên cột theo thứ tự trong file. Cột số là định lượng, còn lại là định tính; **riêng** các cột có tên trong list `cot_ma` (mã số) luôn là định tính.
::: starter
import pandas as pd


def phan_loai_bien(ten_file, cot_ma):
    df = pd.read_csv(ten_file, na_values="?")
    return {"dinh_luong": df.select_dtypes("number").columns.tolist(), "dinh_tinh": []}
::: solution
import pandas as pd


def phan_loai_bien(ten_file, cot_ma):
    df = pd.read_csv(ten_file, na_values="?")
    so = set(df.select_dtypes("number").columns) - set(cot_ma)
    return {"dinh_luong": [c for c in df.columns if c in so],
            "dinh_tinh": [c for c in df.columns if c not in so]}
::: tests
"customers.csv", ["customer_id"] ==> {"dinh_luong": ["age"], "dinh_tinh": ["customer_id", "name", "tier"]}
"houses.csv", ["id"]
::: hidden
"cars.csv", []
"students.csv", ["student_id"]
::: hints
- `df.select_dtypes("number").columns` → các cột số; trừ đi `cot_ma`.
- Duyệt `df.columns` để giữ đúng thứ tự.
::: explain
Kiểu dữ liệu chỉ là gợi ý – người phân tích phải quyết định cột mã số là định danh.
