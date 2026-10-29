Bài tập mô phỏng các DẠNG CÂU HỎI trong đề thi cuối kỳ thật TIN314 (đề thực hành HK I 2024–2025, đề mẫu cuối kỳ, đề 5/1/2024, bộ câu hỏi Final hè 2025). Dữ liệu được thay bằng dữ liệu mới; đề thi gốc in kết quả ra màn hình, ở đây viết thành hàm để chấm tự động.

===== fe01
@title: Kiểm tra nhanh một list (Phần I)
@level: easy
@topic: collections
@source: Dạng đề FTU – Phần I
@fn: kiem_tra_list
::: statement
Dạng câu hỏi Phần I đề cuối kỳ: *in kiểu dữ liệu, độ dài của list và kiểm tra sự tồn tại của hai số*.

Viết hàm `kiem_tra_list(ds, a, b)` trả về tuple `(tên kiểu, độ dài, a có trong ds, b có trong ds)`, trong đó tên kiểu là chuỗi như `"list"`.

- `kiem_tra_list([5, 9, 11], 11, 97)` → `("list", 3, True, False)`
::: starter
def kiem_tra_list(ds, a, b):
    return type(ds), len(ds), a in ds, b in ds
::: solution
def kiem_tra_list(ds, a, b):
    return type(ds).__name__, len(ds), a in ds, b in ds
::: tests
[5, 9, 11], 11, 97 ==> ("list", 3, True, False)
[], 1, 2 ==> ("list", 0, False, False)
::: hidden
[990, 290, 587, 11], 97, 990 ==> ("list", 4, False, True)
[1, 1, 1], 1, 1 ==> ("list", 3, True, True)
::: hints
- `type(ds)` là đối tượng kiểu; tên kiểu lấy bằng `type(ds).__name__`.
- Toán tử `in` kiểm tra tồn tại.
::: explain
Trong đề thi thật chỉ cần `print(type(random_list))`, `print(len(random_list))`, `print(11 in random_list)`.

===== fe02
@title: 10 phần tử đầu, cuối và đảo ngược (Phần I)
@level: easy
@topic: collections
@source: Dạng đề FTU – Phần I
@fn: dau_cuoi
::: statement
Viết hàm `dau_cuoi(ds, k)` trả về tuple gồm:
1. list `k` phần tử đầu,
2. list `k` phần tử cuối,
3. phần tử lớn nhất và 4. nhỏ nhất của list đầu,
5. list đầu **đảo ngược** (list mới, không sửa list cũ).

- `dau_cuoi([4, 8, 1, 7, 3], 2)` → `([4, 8], [7, 3], 8, 4, [8, 4])`
::: starter
def dau_cuoi(ds, k):
    dau = ds[:k]
    cuoi = ds[k:]
    return dau, cuoi, max(dau), min(dau), dau.reverse()
::: solution
def dau_cuoi(ds, k):
    dau = ds[:k]
    cuoi = ds[-k:]
    return dau, cuoi, max(dau), min(dau), dau[::-1]
::: tests
[4, 8, 1, 7, 3], 2 ==> ([4, 8], [7, 3], 8, 4, [8, 4])
[990, 290, 587, 227, 313, 55, 822, 256, 612, 167, 551, 452], 10
::: hidden
[1, 2, 3], 3 ==> ([1, 2, 3], [1, 2, 3], 3, 1, [3, 2, 1])
[5, -2, 9, 0, 9], 1 ==> ([5], [9], 5, 5, [5])
::: hints
- k phần tử cuối: `ds[-k:]`.
- Đảo ngược thành list mới: `ds[::-1]` hoặc `list(reversed(ds))`.
::: explain
`list.reverse()` đảo tại chỗ và trả về `None` – lỗi hay gặp ở câu "đảo ngược thành list mới".

===== fe03
@title: create_list với list comprehension (Phần I)
@level: easy
@topic: collections
@source: Dạng đề FTU – Phần I
@fn: create_list
::: statement
Viết hàm `create_list(ds, lo, hi, k)` dùng **list comprehension** trả về list các số trong `ds` (giữ thứ tự) thoả: nằm trong đoạn `[lo, hi]` **và** chia hết cho `k`.

- `create_list([7, 14, 300, 21, 5, 196], 1, 200, 7)` → `[7, 14, 21, 196]`
::: starter
def create_list(ds, lo, hi, k):
    return [x for x in ds if x % k == 0]
::: solution
def create_list(ds, lo, hi, k):
    return [x for x in ds if lo <= x <= hi and x % k == 0]
::: tests
[7, 14, 300, 21, 5, 196], 1, 200, 7 ==> [7, 14, 21, 196]
[], 1, 10, 2 ==> []
::: hidden
[0, 7, 203, 210, 49], 1, 200, 7 ==> [7, 49]
[990, 290, 587, 227, 313, 55, 822, 256, 612, 167, 551, 452, 37, 661, 285, 105, 147, 21], 1, 200, 7 ==> [105, 147, 21]
[10, 20, 30], 10, 30, 10 ==> [10, 20, 30]
::: hints
- `[x for x in ds if lo <= x <= hi and x % k == 0]`.
::: explain
Đọc kỹ "trong [1, 200]" – có dấu ngoặc vuông nghĩa là **tính cả hai đầu**.

===== fe04
@title: Căn bậc hai của tổng có điều kiện (Phần I)
@level: medium
@topic: basics
@source: Dạng đề FTU – Phần I
@fn: can_tong
::: statement
Viết hàm `can_tong(ds)` trả về căn bậc hai (làm tròn 4 chữ số) của **tổng** các số trong `ds` thoả **cả ba** điều kiện:
- không chia hết cho 5,
- không chia hết cho 3,
- không nằm trong đoạn `[11, 29]`.

Không có số nào thoả thì trả về `0.0`.
::: starter
import math


def can_tong(ds):
    return round(math.sqrt(sum(ds)), 4)
::: solution
import math


def can_tong(ds):
    tong = sum(x for x in ds if x % 5 != 0 and x % 3 != 0 and not (11 <= x <= 29))
    return round(math.sqrt(tong), 4)
::: tests
[7, 14, 15, 9, 49, 196] ==> 15.8745
[3, 5, 15] ==> 0.0
::: hidden
[11, 29, 31, 10] ==> 5.5678
[1, 2, 4, 7, 8] ==> 4.6904
[100, 101, 102, 103] ==> 14.2829
::: hints
- Lọc bằng generator rồi `sum(...)`, cuối cùng `math.sqrt`.
- "Không nằm trong [11, 29]": `not (11 <= x <= 29)`.
::: explain
Ba điều kiện "không" nối bằng `and`. Đổi thành `or` là lỗi logic phổ biến.

===== fe05
@title: Hàm sản xuất Cobb-Douglas
@level: easy
@topic: basics
@source: Dạng đề FTU – đề 5/1/2024
@fn: cobb_douglas
::: statement
Đề thi yêu cầu viết hàm sản xuất rồi gọi với A, K, L. Viết hàm `cobb_douglas(A, K, L, alpha=0.3)` trả về sản lượng

**Q = A · K^alpha · L^(1 − alpha)**, làm tròn 2 chữ số.

- `cobb_douglas(1, 100, 100)` → `100.0`
::: starter
def cobb_douglas(A, K, L, alpha=0.3):
    return round(A * K * alpha * L * (1 - alpha), 2)
::: solution
def cobb_douglas(A, K, L, alpha=0.3):
    return round(A * K ** alpha * L ** (1 - alpha), 2)
::: tests
1, 100, 100 ==> 100.0
2, 50, 200, 0.5 ==> 200.0
::: hidden
1.5, 80, 120
3, 1, 1 ==> 3.0
1, 64, 8, 0.5 ==> 22.63
::: hints
- Luỹ thừa trong Python là `**`, không phải `*` hay `^`.
::: explain
`^` trong Python là phép XOR bit – viết `K^alpha` sẽ lỗi hoặc ra kết quả sai.

===== fe06
@title: Giá trên mét vuông và tách chuỗi
@level: easy
@topic: string
@source: Dạng đề FTU – đề 5/1/2024
@fn: gia_va_chuoi
::: statement
Viết hàm `gia_va_chuoi(dien_tich, gia, s)` trả về tuple:
1. giá trên một m² (`gia / dien_tich`, làm tròn 2),
2. **từ đầu tiên** của chuỗi `s`,
3. **từ cuối cùng** của `s`,
4. độ dài chuỗi `s`.

- `gia_va_chuoi(80, 4000, "FTU Data")` → `(50.0, "FTU", "Data", 8)`
::: starter
def gia_va_chuoi(dien_tich, gia, s):
    return gia / dien_tich, s[:3], s[4:], len(s)
::: solution
def gia_va_chuoi(dien_tich, gia, s):
    tu = s.split()
    return round(gia / dien_tich, 2), tu[0], tu[-1], len(s)
::: tests
80, 4000, "FTU Data" ==> (50.0, "FTU", "Data", 8)
3, 10, "Foreign Trade University" ==> (3.33, "Foreign", "University", 24)
::: hidden
1, 1, "A" ==> (1.0, "A", "A", 1)
120.5, 6000, "Python cho phan tich du lieu" ==> (49.79, "Python", "lieu", 28)
::: hints
- `s.split()` tách thành các từ; từ đầu `[0]`, từ cuối `[-1]`.
::: explain
Cắt cứng `s[:3]` chỉ đúng với "FTU Data". Viết tổng quát giúp qua test ẩn.

===== fe07
@title: Tổng quan DataFrame (Câu 1 đề 2024–2025)
@level: easy
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: tong_quan
::: statement
Câu 1 đề thi: *khai báo thư viện, tạo DataFrame từ dict, xem 10 dòng đầu, xem thông tin chi tiết, xem nhanh số hàng – số cột*.

Viết hàm `tong_quan(data)` tạo DataFrame từ dict `data` và trả về tuple `(số dòng của head(10), shape, dict {tên cột: tên kiểu dữ liệu dạng chuỗi})`.

- `tong_quan({"Ten": ["A", "B"], "Gia": [10, 20]})` → `(2, (2, 2), {"Ten": "object", "Gia": "int64"})`
::: starter
import pandas as pd


def tong_quan(data):
    df = pd.DataFrame(data)
    return len(df), df.shape, {}
::: solution
import pandas as pd


def tong_quan(data):
    df = pd.DataFrame(data)
    return len(df.head(10)), df.shape, {c: str(t) for c, t in df.dtypes.items()}
::: tests
{"Ten": ["A", "B"], "Gia": [10, 20]} ==> (2, (2, 2), {"Ten": "object", "Gia": "int64"})
{"x": list(range(15)), "y": [0.5] * 15}
::: hidden
{"San pham": ["iPhone", "Galaxy", "Mi", "iPad"], "Gia": [25.5, 20.0, 10.0, 12.0], "Con hang": [True, False, True, True]}
::: hints
- `df.head(10)`, `df.shape`, `df.dtypes`; trong đề thật thêm `df.info()`.
- `str(dtype)` → `"int64"`, `"float64"`, `"object"`.
::: explain
`head(10)` trên bảng ít hơn 10 dòng trả về toàn bộ bảng – không lỗi.

===== fe08
@title: Điền thiếu bằng trung bình và mode (Câu 2a–b)
@level: easy
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: dien_thieu_tb_mode
::: statement
Viết hàm `dien_thieu_tb_mode(data, cot_so, cot_chu)`: tạo DataFrame từ `data`, điền ô thiếu của cột `cot_so` bằng **trung bình** cột đó và ô thiếu của cột `cot_chu` bằng **giá trị phổ biến nhất** (mode). Trả về DataFrame sau xử lý.
::: starter
import pandas as pd


def dien_thieu_tb_mode(data, cot_so, cot_chu):
    df = pd.DataFrame(data)
    df[cot_so].fillna(df[cot_so].mean())
    return df
::: solution
import pandas as pd


def dien_thieu_tb_mode(data, cot_so, cot_chu):
    df = pd.DataFrame(data)
    df[cot_so] = df[cot_so].fillna(df[cot_so].mean())
    df[cot_chu] = df[cot_chu].fillna(df[cot_chu].mode()[0])
    return df
::: tests
{"Ten": ["Lan", "Hoa", "Nam", "Minh"], "Chi tieu": [12, None, 18, None], "So thich": ["Doc sach", None, "Du lich", "Doc sach"]}, "Chi tieu", "So thich"
::: hidden
{"Ten": ["A", "B", "C"], "Luong": [None, 10.0, 20.0], "Nganh": [None, None, "IT"]}, "Luong", "Nganh"
{"Ten": ["X", "Y"], "Diem": [8.0, 6.0], "Lop": ["K1", "K2"]}, "Diem", "Lop"
::: hints
- Gán lại: `df[cot] = df[cot].fillna(...)`.
- Mode: `df[cot].mode()[0]`.
::: explain
`fillna` trả về Series mới; không gán lại (như code mẫu) thì bảng không đổi. Tránh `inplace=True` trên một cột – Pandas mới cảnh báo và có thể không có tác dụng.

===== fe09
@title: Bỏ dòng thiếu nhiều (Câu 2c–d)
@level: medium
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: bo_dong_thieu
::: statement
Viết hàm `bo_dong_thieu(data, cach)` tạo DataFrame từ `data` rồi:
- `cach == "50%"`: bỏ các dòng có **từ 50% số ô trở lên** bị thiếu;
- `cach == "nhieu_nhat"`: bỏ **một** dòng có nhiều ô thiếu nhất (hoà thì bỏ dòng đứng trước).

Trả về DataFrame sau xử lý (giữ nguyên chỉ số dòng ban đầu).
::: starter
import pandas as pd


def bo_dong_thieu(data, cach):
    df = pd.DataFrame(data)
    return df.dropna()
::: solution
import pandas as pd


def bo_dong_thieu(data, cach):
    df = pd.DataFrame(data)
    if cach == "50%":
        return df[df.isna().mean(axis=1) < 0.5]
    dong = df.isna().sum(axis=1).idxmax()
    return df.drop(index=dong)
::: tests
{"Ten": ["P", "D", "M", "Y", "V"], "Chi tieu": [15, None, None, None, 20], "Tuoi": [20, None, 22, None, 24], "So thich": ["Sach", "Phim", None, None, "Sach"]}, "50%"
{"Ten": ["P", "D", "M", "Y", "V"], "Chi tieu": [15, None, None, None, 20], "Tuoi": [20, None, 22, None, 24], "So thich": ["Sach", "Phim", None, None, "Sach"]}, "nhieu_nhat"
::: hidden
{"a": [1, None, None], "b": [None, None, 2]}, "50%"
{"a": [1, 2], "b": [3, 4]}, "nhieu_nhat"
{"a": [None, 1, None], "b": [None, None, None], "c": [1, 1, None]}, "nhieu_nhat"
::: hints
- Tỉ lệ thiếu của từng dòng: `df.isna().mean(axis=1)`.
- Dòng thiếu nhiều nhất: `df.isna().sum(axis=1).idxmax()`, rồi `df.drop(index=...)`.
- Cách khác cho 50%: `df.dropna(thresh=...)` – `thresh` là số ô **không thiếu** tối thiểu cần giữ.
::: explain
"Từ 50% trở lên" nghĩa là bỏ khi tỉ lệ thiếu ≥ 0.5, giữ khi < 0.5. Với 4 cột, dòng thiếu đúng 2 ô cũng bị bỏ.

===== fe10
@title: Xử lý dòng trùng lặp (Câu 3)
@level: medium
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: bo_trung
::: statement
Viết hàm `bo_trung(data, cot, giu)` tạo DataFrame từ `data` và loại bỏ dòng trùng lặp:
- `cot` là `None` (trùng **hoàn toàn**) hoặc list tên cột để xét trùng;
- `giu` là `"first"` (giữ dòng đầu) hoặc `"last"` (giữ dòng cuối).

Trả về tuple `(số dòng trùng hoàn toàn trong dữ liệu gốc, DataFrame sau xử lý)`.
::: starter
import pandas as pd


def bo_trung(data, cot, giu):
    df = pd.DataFrame(data)
    return 0, df.drop_duplicates()
::: solution
import pandas as pd


def bo_trung(data, cot, giu):
    df = pd.DataFrame(data)
    return int(df.duplicated().sum()), df.drop_duplicates(subset=cot, keep=giu)
::: tests
{"Ten": ["Lan", "Binh", "Thu", "Lan", "Ha"], "Chi tieu": [15, 20, 12, 15, 15], "Tuoi": [25, 21, 22, 25, 24]}, None, "first"
{"Ten": ["Lan", "Binh", "Thu", "Lan", "Ha"], "Chi tieu": [15, 20, 12, 15, 15], "Tuoi": [25, 21, 22, 25, 24]}, ["Chi tieu"], "first"
::: hidden
{"Ten": ["Lan", "Binh", "Thu", "Lan", "Ha"], "Chi tieu": [15, 20, 12, 18, 15], "Tuoi": [25, 21, 22, 25, 24]}, ["Ten", "Tuoi"], "last"
{"a": [1, 1, 1], "b": [2, 2, 3]}, ["a"], "last"
{"a": [1, 2], "b": [3, 4]}, None, "first"
::: hints
- `df.duplicated().sum()` đếm dòng trùng hoàn toàn.
- `df.drop_duplicates(subset=cot, keep=giu)` – `subset=None` nghĩa là xét mọi cột.
::: explain
Lần xuất hiện được giữ không bị tính là "trùng": 2 dòng giống nhau → `duplicated()` chỉ đánh dấu 1 dòng.

===== fe11
@title: Đánh dấu trùng lặp không xoá (Câu 3e)
@level: easy
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: danh_dau_trung
::: statement
Viết hàm `danh_dau_trung(data, cot)` thêm cột `"is_duplicate"` (True/False) đánh dấu các dòng trùng lặp theo list cột `cot` (dòng xuất hiện **lần đầu** là False), **không xoá** dòng nào. Trả về DataFrame.
::: starter
import pandas as pd


def danh_dau_trung(data, cot):
    df = pd.DataFrame(data)
    return df.drop_duplicates(subset=cot)
::: solution
import pandas as pd


def danh_dau_trung(data, cot):
    df = pd.DataFrame(data)
    df["is_duplicate"] = df.duplicated(subset=cot)
    return df
::: tests
{"Ten": ["Lan", "Binh", "Lan"], "Tuoi": [25, 21, 25]}, ["Ten", "Tuoi"]
::: hidden
{"Ten": ["A", "A", "A"], "Tuoi": [1, 2, 1]}, ["Ten"]
{"Ten": ["A", "B"], "Tuoi": [1, 1]}, ["Tuoi"]
::: hints
- `df.duplicated(subset=cot)` trả về Series True/False.
- Muốn đánh dấu **tất cả** các bản trùng (kể cả lần đầu): `keep=False`.
::: explain
Đánh dấu trước, quyết định xoá sau – cách làm an toàn khi chưa chắc dòng nào là dữ liệu đúng.

===== fe12
@title: Chuẩn hoá Min-Max và Z-score (Câu 4a–b)
@level: easy
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: chuan_hoa_doanh_thu
::: statement
Viết hàm `chuan_hoa_doanh_thu(data, cot)` trả về tuple `(list min-max, list z-score)` của cột `cot`, mỗi giá trị làm tròn 4. Z-score dùng `std()` mặc định của Pandas.

- Doanh thu `[20, 30, 15, 50]` → min-max `[0.1429, 0.4286, 0.0, 1.0]`
::: starter
import pandas as pd


def chuan_hoa_doanh_thu(data, cot):
    x = pd.DataFrame(data)[cot]
    return (x / x.max()).round(4).tolist(), []
::: solution
import pandas as pd


def chuan_hoa_doanh_thu(data, cot):
    x = pd.DataFrame(data)[cot]
    mm = (x - x.min()) / (x.max() - x.min())
    z = (x - x.mean()) / x.std()
    return mm.round(4).tolist(), z.round(4).tolist()
::: tests
{"Cong ty": ["A", "B", "C", "D"], "Doanh thu": [20, 30, 15, 50]}, "Doanh thu"
::: hidden
{"Cong ty": ["A", "B", "C"], "Doanh thu": [100, 200, 300]}, "Doanh thu"
{"x": [5, 5, 10, 20]}, "x"
::: hints
- Min-max: `(x - x.min()) / (x.max() - x.min())`.
- Z-score: `(x - x.mean()) / x.std()`.
::: explain
Có thể dùng `MinMaxScaler`/`StandardScaler` của sklearn, nhưng `StandardScaler` chia cho độ lệch chuẩn **tổng thể** (ddof = 0) nên kết quả z-score hơi khác cách tính bằng Pandas.

===== fe13
@title: LabelEncoder và One-Hot (Câu 4c–d)
@level: medium
@topic: pandas
@source: Dạng đề FTU – HK I 2024–2025
@fn: ma_hoa_nganh
::: statement
Viết hàm `ma_hoa_nganh(data, cot)` trả về tuple:
1. list mã số của cột `cot` bằng `sklearn.preprocessing.LabelEncoder`,
2. list tên các cột tạo ra bởi `pd.get_dummies(df[cot], prefix=cot)`.

- Ngành `["BDS", "CN", "BDS", "CN"]` → `([0, 1, 0, 1], ["Nganh_BDS", "Nganh_CN"])`
::: starter
import pandas as pd
from sklearn.preprocessing import LabelEncoder


def ma_hoa_nganh(data, cot):
    df = pd.DataFrame(data)
    return [], []
::: solution
import pandas as pd
from sklearn.preprocessing import LabelEncoder


def ma_hoa_nganh(data, cot):
    df = pd.DataFrame(data)
    ma = LabelEncoder().fit_transform(df[cot]).tolist()
    cols = pd.get_dummies(df[cot], prefix=cot).columns.tolist()
    return ma, cols
::: tests
{"Cong ty": ["A", "B", "C", "D"], "Nganh": ["BDS", "CN", "BDS", "CN"]}, "Nganh" ==> ([0, 1, 0, 1], ["Nganh_BDS", "Nganh_CN"])
::: hidden
{"Nganh": ["Y te", "Bat dong san", "Cong nghe", "Y te"]}, "Nganh" ==> ([2, 0, 1, 2], ["Nganh_Bat dong san", "Nganh_Cong nghe", "Nganh_Y te"])
{"Loai": ["b", "a"]}, "Loai" ==> ([1, 0], ["Loai_a", "Loai_b"])
::: hints
- `LabelEncoder().fit_transform(df[cot])` đánh số theo **thứ tự chữ cái** của các nhãn.
::: explain
LabelEncoder phù hợp với **biến mục tiêu** hoặc biến có thứ bậc; với biến đầu vào không thứ bậc (ngành nghề) nên dùng One-Hot để mô hình không hiểu nhầm "Y tế (2) > Công nghệ (1)".

===== fe14
@title: Tách họ tên và tìm sản phẩm (dạng Final hè 2025)
@level: medium
@topic: pandas
@source: Dạng đề FTU – Final hè 2025
@fn: tach_ten
::: statement
Viết hàm `tach_ten(ds_ten, tu_khoa, ds_sp)`:
1. chuẩn hoá `ds_ten`: bỏ khoảng trắng đầu/cuối và đưa về chữ thường;
2. tách mỗi tên thành `"Họ và tên đệm"` và `"Tên"` (tên = từ **cuối cùng**) bằng `str.rsplit(n=1, expand=True)`;
3. đếm số sản phẩm trong `ds_sp` có chứa `tu_khoa` (phân biệt hoa thường).

Trả về tuple `(list tên, list họ và tên đệm, số sản phẩm)`.
::: starter
import pandas as pd


def tach_ten(ds_ten, tu_khoa, ds_sp):
    s = pd.Series(ds_ten)
    parts = s.str.split(n=1, expand=True)
    return parts[1].tolist(), parts[0].tolist(), 0
::: solution
import pandas as pd


def tach_ten(ds_ten, tu_khoa, ds_sp):
    s = pd.Series(ds_ten).str.strip().str.lower()
    parts = s.str.rsplit(n=1, expand=True)
    so_sp = int(pd.Series(ds_sp).str.contains(tu_khoa, regex=False).sum())
    return parts[1].tolist(), parts[0].tolist(), so_sp
::: tests
[" Nguyen Van An ", "TRAN THI BINH"], "iPhone", ["iPhone 13", "iPad Air", "iPhone SE"] ==> (["an", "binh"], ["nguyen van", "tran thi"], 2)
::: hidden
["Le Minh Quang Huy", "pham an"], "Galaxy", ["galaxy s22", "Galaxy A5"] ==> (["huy", "an"], ["le minh quang", "pham"], 1)
::: hints
- `.str.strip().str.lower()` trên Series.
- `rsplit(n=1)` tách **một lần từ bên phải** → [họ và tên đệm, tên].
::: explain
`split(n=1)` tách từ bên trái ("Nguyen" | "Van An") – sai yêu cầu tên là từ cuối.

===== fe15
@title: Biểu đồ cột có giá trị trên mỗi cột (Câu 5b)
@level: medium
@topic: viz
@source: Dạng đề FTU – HK I 2024–2025
@fn: ve_doanh_thu_chi_nhanh
::: statement
Câu vẽ biểu đồ được chấm "đẹp và đầy đủ thông tin". Viết hàm `ve_doanh_thu_chi_nhanh(data)` – `data` có khoá `"Chi nhanh"` và `"Doanh thu"` – vẽ **biểu đồ cột** với:
- tiêu đề (khác rỗng), nhãn trục x và trục y (khác rỗng),
- **giá trị doanh thu ghi trên mỗi cột**.

Trả về `ax`.
::: starter
import pandas as pd
import matplotlib.pyplot as plt


def ve_doanh_thu_chi_nhanh(data):
    df = pd.DataFrame(data)
    fig, ax = plt.subplots()
    ax.bar(df["Chi nhanh"], df["Doanh thu"])
    return ax
::: solution
import pandas as pd
import matplotlib.pyplot as plt


def ve_doanh_thu_chi_nhanh(data):
    df = pd.DataFrame(data)
    fig, ax = plt.subplots()
    bars = ax.bar(df["Chi nhanh"], df["Doanh thu"], color="#4C78A8")
    ax.bar_label(bars)
    ax.set_title("Doanh thu theo chi nhánh")
    ax.set_xlabel("Chi nhánh")
    ax.set_ylabel("Doanh thu (triệu USD)")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.patches import Rectangle


def check(ns):
    data = {"Chi nhanh": ["CN1", "CN2", "CN3"], "Doanh thu": [3, 4, 5]}
    ax = ns["ve_doanh_thu_chi_nhanh"](data)
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    ax.figure.canvas.draw()
    bars = [p for p in ax.patches if isinstance(p, Rectangle)]
    texts = [t.get_text().strip() for t in ax.texts]
    res = [
        {"name": "3 cột đúng chiều cao", "ok": sorted(round(b.get_height(), 6) for b in bars) == [3, 4, 5], "msg": f"{len(bars)} cột"},
        {"name": "Có tiêu đề", "ok": bool(ax.get_title().strip()), "msg": "ax.set_title(...)"},
        {"name": "Có nhãn hai trục", "ok": bool(ax.get_xlabel().strip()) and bool(ax.get_ylabel().strip()), "msg": "ax.set_xlabel / set_ylabel"},
        {"name": "Ghi giá trị trên mỗi cột", "ok": all(v in texts for v in ["3", "4", "5"]), "msg": f"chữ trên hình: {texts} – dùng ax.bar_label(bars) hoặc ax.text"},
    ]
    plt.close("all")
    return res
::: hints
- `bars = ax.bar(...)` rồi `ax.bar_label(bars)`.
- Hoặc dùng vòng lặp `ax.text(x, y, str(y), ha="center", va="bottom")`.
::: explain
"Doanh thu phải đặt trên mỗi cột" – yêu cầu dễ mất điểm nếu quên. `bar_label` là cách ngắn nhất.

===== fe16
@title: Biểu đồ tròn phân bổ ngân sách (Câu 5a)
@level: easy
@topic: viz
@source: Dạng đề FTU – HK I 2024–2025
@fn: ve_ngan_sach
::: statement
Viết hàm `ve_ngan_sach(data)` – `data` có khoá `"Hang muc"` và `"Ngan sach"` – vẽ **biểu đồ tròn** có nhãn hạng mục, phần trăm 1 chữ số thập phân trên mỗi lát và tiêu đề (khác rỗng). Trả về `ax`.
::: starter
import pandas as pd
import matplotlib.pyplot as plt


def ve_ngan_sach(data):
    df = pd.DataFrame(data)
    fig, ax = plt.subplots()
    ax.pie(df["Ngan sach"])
    return ax
::: solution
import pandas as pd
import matplotlib.pyplot as plt


def ve_ngan_sach(data):
    df = pd.DataFrame(data)
    fig, ax = plt.subplots()
    ax.pie(df["Ngan sach"], labels=df["Hang muc"], autopct="%1.1f%%", startangle=90)
    ax.set_title("Phân bổ ngân sách")
    return ax
::: check
import matplotlib.pyplot as plt
from matplotlib.axes import Axes
from matplotlib.patches import Wedge


def check(ns):
    data = {"Hang muc": ["San xuat", "Marketing", "R&D", "Khac"], "Ngan sach": [35, 25, 30, 10]}
    ax = ns["ve_ngan_sach"](data)
    if not isinstance(ax, Axes):
        return [{"name": "Trả về Axes", "ok": False, "msg": "hãy return ax"}]
    texts = [t.get_text() for t in ax.texts]
    res = [
        {"name": "4 lát", "ok": len([p for p in ax.patches if isinstance(p, Wedge)]) == 4, "msg": "ax.pie(...)"},
        {"name": "Nhãn hạng mục", "ok": all(k in texts for k in data["Hang muc"]), "msg": "labels=..."},
        {"name": "Phần trăm 35.0% / 25.0% / 30.0% / 10.0%", "ok": all(p in texts for p in ["35.0%", "25.0%", "30.0%", "10.0%"]), "msg": "autopct=\"%1.1f%%\""},
        {"name": "Có tiêu đề", "ok": bool(ax.get_title().strip()), "msg": "ax.set_title(...)"},
    ]
    plt.close("all")
    return res
::: hints
- `ax.pie(values, labels=..., autopct="%1.1f%%")` và `ax.set_title(...)`.
::: explain
Biểu đồ "đầy đủ thông tin" = có tiêu đề, nhãn, phần trăm (và chú thích nếu cần).

===== fe17
@title: Thống kê, tương quan và hồi quy từ dict (đề 5/1/2024)
@level: medium
@topic: ml
@source: Dạng đề FTU – đề 5/1/2024
@fn: phan_tich_gdp
::: statement
Đề thi cho dict các thành phố (gdp, population) và một list `size`. Viết hàm `phan_tich_gdp(data, size)`:
1. tạo DataFrame từ `data`, thêm cột `"size"`;
2. tính trung bình, độ lệch chuẩn, min, max của `gdp` (làm tròn 4);
3. hệ số tương quan giữa `size` và `gdp` (làm tròn 4);
4. hồi quy `gdp` (phụ thuộc) theo `population`: hệ số, hệ số chặn, R² (làm tròn 4).

Trả về tuple `(mean, std, min, max, r, coef, intercept, r2)`.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def phan_tich_gdp(data, size):
    df = pd.DataFrame(data)
    return 0, 0, 0, 0, 0, 0, 0, 0
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def phan_tich_gdp(data, size):
    df = pd.DataFrame(data)
    df["size"] = size
    g = df["gdp"]
    r = df["size"].corr(g)
    lm = LinearRegression().fit(df[["population"]], g)
    r2 = lm.score(df[["population"]], g)
    vals = (g.mean(), g.std(), g.min(), g.max(), r, lm.coef_[0], lm.intercept_, r2)
    return tuple(round(float(v), 4) for v in vals)
::: tests
{"cities": ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Hanoi"], "gdp": [50, 40, 30, 25, 60], "population": [60, 50, 45, 23, 75]}, [4, 5, 2, 2, 3]
::: hidden
{"cities": ["A", "B", "C", "D"], "gdp": [10, 20, 30, 40], "population": [1, 2, 3, 5]}, [1, 2, 3, 4]
{"cities": ["X", "Y", "Z"], "gdp": [7, 3, 8], "population": [70, 20, 90]}, [3, 3, 1]
::: hints
- `df["size"].corr(df["gdp"])`.
- X phải 2 chiều: `df[["population"]]`; R² bằng `lm.score(X, y)`.
::: explain
Biến phụ thuộc (gdp) là y; biến độc lập (population) là X. Đảo ngược là sai đề.

===== fe18
@title: Hồi quy giá nhà và Pipeline (đề cuối kỳ mẫu)
@level: medium
@topic: ml
@source: Dạng đề FTU – đề cuối kỳ mẫu
@fn: r2_gia_nha
::: statement
Đề mẫu dùng bộ dữ liệu giá nhà và yêu cầu: (1) hồi quy tuyến tính `price` theo danh sách `features` rồi tính R²; (2) tạo **Pipeline** từ list tuple `('scale', StandardScaler())`, `('polynomial', PolynomialFeatures(include_bias=False))`, `('model', LinearRegression())`, fit và tính R².

Viết hàm `r2_gia_nha(features)` đọc `houses.csv`, trả về tuple `(R² hồi quy tuyến tính, R² pipeline)` trên toàn bộ dữ liệu, làm tròn 4.
::: starter
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression


def r2_gia_nha(features):
    df = pd.read_csv("houses.csv")
    X, y = df[features], df["price"]
    lm = LinearRegression().fit(X, y)
    return round(lm.score(X, y), 4), 0
::: solution
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression


def r2_gia_nha(features):
    df = pd.read_csv("houses.csv")
    X, y = df[features], df["price"]
    lm = LinearRegression().fit(X, y)
    Input = [("scale", StandardScaler()), ("polynomial", PolynomialFeatures(include_bias=False)), ("model", LinearRegression())]
    pipe = Pipeline(Input).fit(X, y)
    return round(float(lm.score(X, y)), 4), round(float(pipe.score(X, y)), 4)
::: tests
["sqft_living"]
["floors", "waterfront", "lat", "bedrooms", "sqft_basement", "view", "bathrooms", "sqft_above", "grade", "sqft_living"]
::: hidden
["grade", "view"]
["sqft_living", "lat", "waterfront"]
::: hints
- `Input = [("scale", StandardScaler()), ("polynomial", PolynomialFeatures(include_bias=False)), ("model", LinearRegression())]`.
- `Pipeline(Input).fit(X, y).score(X, y)`.
::: explain
Đây đúng là bài cuối khoá IBM *Data Analysis with Python* (dữ liệu King County) – đề FTU dùng lại. R² của pipeline đa thức trên dữ liệu huấn luyện luôn ≥ hồi quy tuyến tính.
