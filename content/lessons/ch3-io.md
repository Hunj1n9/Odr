@title: Nhập và tải dữ liệu
@chapter: 3
@summary: Đọc/ghi file, CSV và JSON, pd.read_csv với các tham số quan trọng, xem nhanh dữ liệu, SQL, và NumPy – nền tảng tính toán số.

Mọi phân tích bắt đầu bằng việc **đưa dữ liệu vào Python**. Chương này đi từ file văn bản thô → CSV/JSON → Pandas → cơ sở dữ liệu, rồi học NumPy – thư viện tính toán nằm bên dưới Pandas.

Các file có sẵn để thực hành: `sales.csv`, `customers.csv`, `students.csv`, `stocks.csv`, `cars.csv` (xem trong **Sổ tay Python**).

> **Đối chiếu tài liệu FTU:** Buổi 5 (ghi chú Buổi 05): `pd.read_csv`, `header=None`, `head`/`tail`, thay tiêu đề cột; đề cương ôn tập: *Importing Data Sets* – "đọc 10 dòng đầu, 10 dòng cuối, shape, loc, iloc (học kĩ)".

@@@ c3-0 | Dữ liệu là gì: cấu trúc, thang đo và nguồn dữ liệu
@ftu: Buổi 5 "Ứng dụng Python vào phân tích dữ liệu" – dữ liệu là gì, cấu trúc, thang đo; đề cương ôn tập – "phân loại biến (định tính và định lượng)"
@goal: Phân biệt dữ liệu có cấu trúc / phi cấu trúc / bán cấu trúc, 4 thang đo (định danh, thứ tự, khoảng, tỷ lệ), biến định tính và định lượng – để chọn đúng cách xử lý và biểu đồ.

Một **quan sát** (datum) là một dòng; nhiều quan sát tạo thành **dữ liệu** (data); tập hợp dữ liệu đồng nhất là **bộ dữ liệu** (dataset).

### Theo cấu trúc

| Loại | Đặc điểm | Ví dụ | Đọc bằng |
|---|---|---|---|
| Có cấu trúc | hàng + cột | Excel, CSV, bảng SQL | `pd.read_csv`, `pd.read_excel`, `pd.read_sql` |
| Bán cấu trúc | thẻ + thuộc tính | JSON, XML | `json.loads`, `pd.read_json` |
| Phi cấu trúc | không có dạng bảng | ảnh, video, trang web | thư viện chuyên dụng |

??
File JSON trả về từ API thuộc loại dữ liệu nào?
- [ ] Có cấu trúc
- [x] Bán cấu trúc
- [ ] Phi cấu trúc
- [ ] Không phải dữ liệu
> JSON có khoá–giá trị lồng nhau nhưng không cố định hàng–cột như bảng.

### Bốn thang đo

| Thang đo | Ý nghĩa | Ví dụ | Phép tính có nghĩa |
|---|---|---|---|
| **Định danh** (nominal) | phân nhóm, không thứ tự | nhóm máu, ngành học | đếm, mode |
| **Thứ tự** (ordinal) | phân nhóm có thứ tự | xếp loại A–B–C, mức thấp–TB–cao | + trung vị, so sánh lớn/nhỏ |
| **Khoảng** (interval) | chênh lệch có nghĩa, không có 0 tuyệt đối | nhiệt độ °C | + cộng/trừ, trung bình |
| **Tỷ lệ** (ratio) | có 0 tuyệt đối, so sánh "gấp mấy lần" | thu nhập, cân nặng, tuổi | + nhân/chia |

Định danh và thứ tự là biến **định tính** (phân loại); khoảng và tỷ lệ là biến **định lượng** (số).

??
"Mức hài lòng: Thấp – Trung bình – Cao" thuộc thang đo:
- [ ] Định danh
- [x] Thứ tự
- [ ] Khoảng
- [ ] Tỷ lệ
> Có phân nhóm và có thứ tự, nhưng khoảng cách giữa các mức không đo được.

??
Vì sao nói "30°C nóng gấp đôi 15°C" là sai?
- [ ] Vì nhiệt độ là biến định danh
- [x] Vì nhiệt độ °C là thang khoảng – không có điểm 0 tuyệt đối
- [ ] Vì nhiệt độ không đo được
- [ ] Câu đó đúng
> Chỉ thang tỷ lệ (thu nhập, cân nặng…) mới so sánh "gấp mấy lần" được.

Trong Pandas, kiểu dữ liệu gợi ý loại biến: số (`int64`, `float64`) thường là định lượng; `object`/`category` là định tính. Nhưng cẩn thận – mã bưu chính hay mã sinh viên là **số nhưng định danh**.

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?")
dinh_luong = df.select_dtypes("number").columns.tolist()
dinh_tinh = df.select_dtypes("object").columns.tolist()
print("Định lượng:", dinh_luong)
print("Định tính:", dinh_tinh)
```

Nguồn dữ liệu: tệp trên máy, Internet (`pd.read_csv("https://...")`, bảng trên trang web bằng `pd.read_html(url)`), cơ sở dữ liệu (bài 3.6), API. Bộ dữ liệu mở để luyện tập: **Kaggle** (outline môn học gợi ý).

??
Mã số sinh viên `20230145` nên được coi là biến gì?
- [ ] Định lượng – vì là số
- [x] Định tính (định danh) – chỉ dùng để phân biệt, cộng trừ vô nghĩa
- [ ] Thang tỷ lệ
- [ ] Thang khoảng
> Nên đọc thành chuỗi (`dtype={"ma_sv": str}`) để không mất số 0 đầu và không bị tính trung bình.

@@@ c3-1 | Đọc và ghi file văn bản
@ftu: LEC 3 Phần 6 – đọc và ghi file
@goal: Mở file bằng `with open(...)`, đọc toàn bộ/từng dòng, ghi file với `"w"` và `"a"`, chỉ định `encoding="utf-8"`.
@practice: pd01

```python
# Ghi file: "w" = ghi mới (xoá nội dung cũ)
with open("ghi_chu.txt", "w", encoding="utf-8") as f:
    f.write("Dòng 1: Xin chào\n")
    f.write("Dòng 2: TIN314\n")

# Đọc toàn bộ thành một chuỗi
with open("ghi_chu.txt", encoding="utf-8") as f:
    noi_dung = f.read()
print(repr(noi_dung))

# Đọc từng dòng – cách tiết kiệm bộ nhớ với file lớn
with open("ghi_chu.txt", encoding="utf-8") as f:
    for dong in f:
        print(dong.strip())
```

- `with` tự **đóng file** khi xong, kể cả khi có lỗi.
- `encoding="utf-8"` để đọc đúng tiếng Việt.
- Mỗi dòng đọc ra còn ký tự xuống dòng `\n` → dùng `.strip()`.

??
Chế độ mở file nào **thêm vào cuối** file mà không xoá nội dung cũ?
- [ ] `"r"`
- [ ] `"w"`
- [x] `"a"`
- [ ] `"x"`
> `"r"` đọc, `"w"` ghi đè (xoá cũ), `"a"` append – ghi tiếp vào cuối.

```python
with open("ghi_chu.txt", "a", encoding="utf-8") as f:
    f.write("Dòng 3: thêm vào cuối\n")

with open("ghi_chu.txt", encoding="utf-8") as f:
    lines = f.readlines()          # list các dòng
print(len(lines), lines[-1])
```

??
Vì sao nên dùng `with open(...) as f:` thay vì `f = open(...)`?
- [ ] Vì `open()` không chạy được ngoài `with`
- [x] Vì `with` tự đóng file khi ra khỏi khối, kể cả khi có lỗi
- [ ] Vì `with` đọc file nhanh hơn
- [ ] Vì `with` tự chuyển file thành DataFrame
> Quên `f.close()` có thể làm mất dữ liệu ghi hoặc khoá file. `with` lo việc đó.

??
`for dong in f:` – mỗi `dong` có dạng nào?
- [ ] Một ký tự
- [x] Một chuỗi gồm cả ký tự xuống dòng `\n` ở cuối
- [ ] Một list các từ
- [ ] Một số nguyên
> Vì vậy hay viết `dong.strip()` hoặc `dong.rstrip("\n")`.

@@@ c3-2 | CSV và JSON với thư viện chuẩn
@ftu: Buổi 5 – định dạng .csv/.json; outline – "upload DataFrame từ file csv"
@goal: Hiểu cấu trúc file CSV và JSON, đọc bằng module `csv` và `json`, chuyển đổi giữa chuỗi JSON và dict/list.
@practice: pd02

**CSV** (comma-separated values) = bảng dạng văn bản: mỗi dòng là một bản ghi, các cột cách nhau bằng dấu phẩy, dòng đầu thường là tên cột.

```python
import csv

with open("customers.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)          # mỗi dòng → dict {tên_cột: giá_trị}
    rows = list(reader)

print(len(rows), rows[0])
tuoi = [int(r["age"]) for r in rows]   # mọi giá trị đọc ra đều là CHUỖI
print(sum(tuoi) / len(tuoi))
```

??
Đọc file CSV bằng module `csv`, giá trị cột `age` có kiểu gì?
- [ ] `int`
- [ ] `float`
- [x] `str`
- [ ] Tuỳ dữ liệu
> Module `csv` không đoán kiểu – mọi thứ là chuỗi, phải tự `int()`/`float()`. Pandas thì tự đoán kiểu.

**JSON** là định dạng phổ biến của API web: giống dict/list của Python.

```python
import json

s = '{"ten": "Lan", "diem": [8, 9.5], "dat": true, "ghi_chu": null}'
d = json.loads(s)                  # chuỗi JSON → dict
print(d["diem"][1], d["dat"], d["ghi_chu"])

out = json.dumps({"lop": "K62", "si_so": 40}, ensure_ascii=False)
print(out, type(out))              # dict → chuỗi JSON
```

??
`json.loads('{"a": true}')["a"]` là:
- [ ] `"true"`
- [x] `True`
- [ ] `1`
- [ ] Lỗi
> JSON `true/false/null` ↔ Python `True/False/None`.

??
Hàm nào chuyển **dict → chuỗi JSON**?
- [ ] `json.loads`
- [x] `json.dumps`
- [ ] `json.load`
- [ ] `str()`
> "s" trong `loads/dumps` = string. `json.load(f)` / `json.dump(obj, f)` làm việc với file.

@@@ c3-3 | Đọc CSV bằng Pandas: các tham số quan trọng
@ftu: Buổi 5 / ghi chú Buổi 05 – `read_csv`, `header=None`, gán `df.columns`; slide Buổi 6–7 – dữ liệu thiếu dạng "?"
@goal: Dùng `pd.read_csv` với `sep`, `header`, `names`, `index_col`, `usecols`, `na_values`, `nrows` để đọc đúng dữ liệu "bẩn".
@practice: pd01, pd02

```python
import pandas as pd
df = pd.read_csv("students.csv")
df.head(3)
```

Dữ liệu thật hiếm khi "sạch". Bảng tham số cần nhớ:

| Tham số | Khi nào dùng | Ví dụ |
|---|---|---|
| `sep` | cột cách nhau bởi `;` hay tab | `sep=";"` |
| `header=None` | file **không có** dòng tên cột | |
| `names=[...]` | tự đặt tên cột | `names=["a", "b"]` |
| `index_col` | dùng một cột làm chỉ số | `index_col="student_id"` |
| `usecols` | chỉ đọc vài cột | `usecols=["name", "final"]` |
| `na_values` | ký hiệu ô trống lạ | `na_values=["?", "N/A"]` |
| `nrows` | chỉ đọc vài dòng đầu | `nrows=100` |

File `cars.csv` ghi ô thiếu bằng dấu `?` (giống bộ dữ liệu ô tô của khoá IBM *Data Analysis with Python*). Đọc thường thì cột `horsepower` bị coi là **chuỗi**:

```python
import pandas as pd
sai = pd.read_csv("cars.csv")
print(sai["horsepower"].dtype, sai["horsepower"].isna().sum())

dung = pd.read_csv("cars.csv", na_values="?")
print(dung["horsepower"].dtype, dung["horsepower"].isna().sum())
```

??
Cột số có vài ô ghi `"?"`. Đọc bằng `pd.read_csv` mặc định, cột đó có dtype gì?
- [ ] `int64`
- [ ] `float64`
- [x] `object` (chuỗi)
- [ ] `bool`
> Chỉ cần một giá trị không phải số là cả cột thành `object`. Dùng `na_values="?"` để biến `?` thành `NaN`.

```python
import io
import pandas as pd

text = "SV01;An;8.5\nSV02;Bình;7.0\n"            # không header, phân cách ;
df = pd.read_csv(io.StringIO(text), sep=";", header=None, names=["ma", "ten", "diem"], index_col="ma")
print(df)
print(df.loc["SV02", "diem"])
```

Đổi tên toàn bộ cột sau khi đọc (Buổi 05 FTU: *thay thế tiêu đề mặc định bằng list tiêu đề mới*):

```python
import io
import pandas as pd
df = pd.read_csv(io.StringIO("1,An,8\n2,Binh,7\n"), header=None)
print(df.columns.tolist())
df.columns = ["stt", "ten", "diem"]          # số tên phải bằng số cột
print(df)
```

`io.StringIO(text)` biến một chuỗi thành "file ảo" – tiện để thử nhanh hoặc khi đề cho dữ liệu dạng chuỗi.

??
File không có dòng tiêu đề. Nếu đọc bằng `pd.read_csv("f.csv")` mặc định thì:
- [ ] Pandas báo lỗi
- [x] Dòng dữ liệu đầu tiên bị dùng làm tên cột (mất 1 dòng dữ liệu)
- [ ] Pandas tự đặt tên cột 0, 1, 2
- [ ] Bỏ qua dòng đầu
> Phải dùng `header=None` (Pandas đặt tên 0, 1, 2…) hoặc kèm `names=[...]`.

??
Chỉ đọc 2 cột `name` và `final` từ `students.csv`:
- [ ] `pd.read_csv("students.csv", cols=["name", "final"])`
- [x] `pd.read_csv("students.csv", usecols=["name", "final"])`
- [ ] `pd.read_csv("students.csv")["name", "final"]`
- [ ] `pd.read_csv("students.csv", names=["name", "final"])`
> `usecols` chọn cột khi đọc. `names` là **đặt tên** cho cột, không phải chọn.

@@@ c3-4 | Xem nhanh dữ liệu vừa đọc
@ftu: Đề cương ôn tập – Importing Data Sets: head(10), tail, shape, info, describe
@goal: Dùng `head/tail/shape/columns/dtypes/info/describe/value_counts` để "làm quen" một bộ dữ liệu trong 1 phút.
@practice: pd03

Đọc xong, **luôn** chạy bộ lệnh kiểm tra sau trước khi phân tích:

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?")
print(df.shape)                  # (số dòng, số cột)
print(df.columns.tolist())
print(df.dtypes)
df.tail(3)
```

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?")
df.info()                        # kiểu từng cột + số ô KHÔNG thiếu
```

??
`df.shape` của bảng 80 dòng, 10 cột là:
- [ ] `[80, 10]`
- [x] `(80, 10)`
- [ ] `800`
- [ ] `(10, 80)`
> `shape` là tuple `(dòng, cột)` – thuộc tính, **không** có ngoặc `()`.

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?")
print(df.describe().round(1))                 # thống kê cột số
print(df.describe(include="all").loc[["count", "unique", "top"]])   # cả cột chữ
print(df["make"].value_counts().head())       # đếm từng giá trị
```

`describe()` cho: `count` (số ô không thiếu), `mean`, `std`, `min`, 25%, 50% (trung vị), 75%, `max`.

??
Trong `df.describe()`, dòng `50%` là gì?
- [ ] Trung bình
- [x] Trung vị (median)
- [ ] Một nửa số dòng
- [ ] Độ lệch chuẩn
> Phân vị 50% = trung vị.

??
Lệnh nào cho biết **mỗi hãng xe xuất hiện bao nhiêu lần**?
- [ ] `df["make"].count()`
- [x] `df["make"].value_counts()`
- [ ] `df["make"].unique()`
- [ ] `df.groupby("make")`
> `count()` đếm tổng số ô không thiếu; `unique()` liệt kê giá trị khác nhau; `value_counts()` đếm tần suất từng giá trị.

@@@ c3-5 | Ghi dữ liệu và đọc từ cơ sở dữ liệu
@ftu: Buổi 5 – `to_csv`, `read_html`, DBMS & quy trình SQL API (kết nối → gửi lệnh → nhận phản hồi → ngắt kết nối)
@goal: Lưu DataFrame ra CSV/JSON, biết cách đọc Excel, và truy vấn cơ sở dữ liệu SQL bằng `sqlite3` + `pd.read_sql`.

```python
import pandas as pd
df = pd.read_csv("students.csv")
gioi = df[df["final"] >= 8]
gioi.to_csv("sv_gioi.csv", index=False)       # index=False: không ghi cột chỉ số 0,1,2…
print(open("sv_gioi.csv", encoding="utf-8").read()[:150])
print(pd.read_csv("sv_gioi.csv").shape)
```

??
Vì sao hay viết `to_csv("f.csv", index=False)`?
- [ ] Để file nhỏ hơn một nửa
- [x] Để không ghi thêm cột chỉ số 0, 1, 2… vào file
- [ ] Để bỏ dòng tiêu đề
- [ ] Bắt buộc, không có sẽ lỗi
> Không có `index=False`, đọc lại sẽ thấy cột lạ `Unnamed: 0`.

Excel: `pd.read_excel("file.xlsx", sheet_name="Sheet1")` (cần thư viện `openpyxl`, có sẵn trên Colab/Anaconda).

### Cơ sở dữ liệu SQL

Doanh nghiệp lưu dữ liệu trong cơ sở dữ liệu. Python kết nối qua chuẩn **DB-API**: `connect` → `cursor`/truy vấn → `close`. SQLite có sẵn trong Python:

```python
import sqlite3
import pandas as pd

conn = sqlite3.connect(":memory:")           # CSDL tạm trong bộ nhớ
pd.read_csv("sales.csv").to_sql("sales", conn, index=False)

cur = conn.cursor()
cur.execute("SELECT COUNT(*) FROM sales WHERE region = 'Hà Nội'")
print(cur.fetchone())

q = """SELECT region, SUM(quantity * unit_price) AS doanh_thu
       FROM sales WHERE region IS NOT NULL
       GROUP BY region ORDER BY doanh_thu DESC"""
print(pd.read_sql(q, conn))
conn.close()
```

??
Thứ tự đúng khi làm việc với CSDL theo DB-API:
- [ ] execute → connect → close
- [x] connect → cursor/execute → fetch → close
- [ ] cursor → connect → fetch
- [ ] read_csv → connect → close
> Kết nối trước, tạo cursor để chạy câu SQL, lấy kết quả, cuối cùng đóng kết nối.

??
`pd.read_sql(query, conn)` trả về:
- [ ] Một list tuple
- [x] Một DataFrame
- [ ] Một chuỗi SQL
- [ ] Một cursor
> Tiện nhất: chạy SQL rồi nhận ngay DataFrame để phân tích tiếp bằng Pandas.

@@@ c3-6 | NumPy: tạo mảng
@ftu: Ghi chú Buổi 06 – tạo mảng, `numpy.reshape`
@goal: Tạo mảng từ list, bằng `arange/linspace/zeros/ones`, đọc `ndim/shape/size/dtype`, đổi hình dạng bằng `reshape`.
@practice: np01

NumPy cung cấp `ndarray` – mảng **cùng kiểu dữ liệu**, tính toán nhanh hơn list hàng chục lần. Pandas được xây trên NumPy.

```python
import numpy as np
a = np.array([1, 2, 3, 4])
m = np.array([[1, 2, 3], [4, 5, 6]])
print(a, a.ndim, a.shape)
print(m)
print(m.ndim, m.shape, m.size)
```

??
`np.array([[1, 2, 3], [4, 5, 6]]).shape` là:
- [ ] `(3, 2)`
- [x] `(2, 3)`
- [ ] `6`
- [ ] `[2, 3]`
> 2 dòng, 3 cột.

```python
import numpy as np
print(np.arange(0, 10, 2))         # như range nhưng ra mảng
print(np.linspace(0, 1, 5))        # 5 số cách đều từ 0 đến 1 (tính cả 1)
print(np.zeros((2, 3)))
print(np.ones(3), np.full(3, 7))
print(np.arange(6).reshape(2, 3))  # đổi hình dạng: 6 phần tử → 2×3
print(np.array([1, 2.5, 3]).dtype) # trộn int và float → float
```

??
`np.linspace(0, 10, 3)` cho:
- [ ] `[0, 5]`
- [x] `[0., 5., 10.]`
- [ ] `[0, 3, 6, 9]`
- [ ] `[0., 3.33, 6.67]`
> `linspace(start, stop, num)` lấy đúng `num` điểm, **tính cả stop**. Khác `arange` (bước nhảy, không lấy stop).

??
`np.arange(12).reshape(3, 4)` có bao nhiêu dòng?
- [x] 3
- [ ] 4
- [ ] 12
- [ ] Lỗi
> `reshape(dòng, cột)`. Tích phải bằng số phần tử: 3 × 4 = 12.

@@@ c3-7 | NumPy: tính toán vector hoá và thống kê
@ftu: Ghi chú Buổi 06 – tính tổng theo chiều dọc/ngang (`axis`)
@goal: Thực hiện phép toán trên cả mảng không cần vòng lặp, dùng `sum/mean/std/min/max/argmax` theo `axis`.
@practice: np01, np04, np06

**Vector hoá**: phép toán áp dụng cho từng phần tử, không cần `for`:

```python
import numpy as np
gia = np.array([100, 250, 80])
sl = np.array([3, 1, 5])
print(gia * sl)              # nhân từng cặp
print((gia * sl).sum())      # tổng doanh thu
print(gia * 1.1)             # tăng giá 10%
print(gia > 90)              # so sánh → mảng True/False

ds = [100, 250, 80]
print(ds * 2)                # list: lặp lại, KHÔNG phải nhân 2!
```

??
`np.array([1, 2, 3]) * 2` và `[1, 2, 3] * 2` cho ra:
- [ ] Cùng là `[2, 4, 6]`
- [x] `[2 4 6]` và `[1, 2, 3, 1, 2, 3]`
- [ ] `[1, 2, 3, 1, 2, 3]` và `[2, 4, 6]`
- [ ] Cả hai lỗi
> Mảng NumPy nhân từng phần tử; list nhân với số là lặp lại list.

### Thống kê theo trục (axis)

```python
import numpy as np
diem = np.array([[7, 8, 9],     # mỗi dòng: một sinh viên
                 [5, 6, 7],     # mỗi cột: một môn
                 [9, 9, 10]])
print(diem.mean())              # TB toàn bảng
print(diem.mean(axis=0))        # TB theo CỘT (mỗi môn)
print(diem.mean(axis=1))        # TB theo DÒNG (mỗi SV)
print(diem.max(axis=0), diem.argmax(axis=0))   # điểm cao nhất mỗi môn và SV đạt được
print(diem.std().round(3), np.median(diem))
```

Mẹo nhớ: `axis=0` **gộp các dòng lại** → còn một giá trị cho mỗi cột.

??
`m` có shape `(4, 3)`. `m.sum(axis=0).shape` là:
- [ ] `(4,)`
- [x] `(3,)`
- [ ] `(4, 3)`
- [ ] `()`
> `axis=0` gộp theo chiều dòng (4 dòng biến mất), còn 3 giá trị – mỗi cột một giá trị.

??
`np.array([4, 9, 2, 9]).argmax()` bằng:
- [ ] `9`
- [x] `1`
- [ ] `3`
- [ ] `[1, 3]`
> `argmax` trả về **vị trí** của giá trị lớn nhất; hoà thì lấy vị trí đầu tiên.

@@@ c3-8 | NumPy: chỉ số, cắt lát và lọc bằng điều kiện
@ftu: Ghi chú Buổi 06 – chọn dữ liệu; đề cương – loc/iloc
@goal: Truy cập phần tử mảng 2 chiều `m[i, j]`, cắt lát dòng/cột, lọc bằng mặt nạ boolean và `np.where`.
@practice: np02, np03

```python
import numpy as np
m = np.arange(1, 13).reshape(3, 4)
print(m)
print(m[1, 2])        # dòng 1, cột 2
print(m[0])           # cả dòng 0
print(m[:, 1])        # cả cột 1
print(m[:2, 1:3])     # 2 dòng đầu, cột 1–2
```

??
`m = np.arange(1, 13).reshape(3, 4)`. `m[2, 0]` bằng:
- [ ] `3`
- [x] `9`
- [ ] `2`
- [ ] `10`
> Dòng 2 là `[9, 10, 11, 12]`, cột 0 → 9.

### Mặt nạ boolean – lọc không cần vòng lặp

```python
import numpy as np
diem = np.array([3.5, 8, 6.5, 9, 4, 2])
mask = diem >= 5
print(mask)
print(diem[mask])                         # chỉ giữ phần tử True
print(diem[(diem >= 5) & (diem < 9)])     # nhiều điều kiện: & | và ngoặc
print(np.where(diem >= 5, "Đạt", "Trượt"))
diem[diem < 4] = 0                        # gán theo điều kiện
print(diem, (diem >= 5).sum())            # đếm số True
```

??
Kết hợp hai điều kiện trên mảng NumPy, viết đúng là:
- [ ] `a[a > 1 and a < 5]`
- [x] `a[(a > 1) & (a < 5)]`
- [ ] `a[a > 1 & a < 5]`
- [ ] `a[(a > 1) and (a < 5)]`
> Mảng dùng `&` (và), `|` (hoặc), `~` (phủ định) **kèm ngoặc**. `and/or` gây lỗi "truth value is ambiguous".

??
`(np.array([1, 6, 8, 3]) > 4).sum()` bằng:
- [ ] `14`
- [x] `2`
- [ ] `True`
- [ ] `[6, 8]`
> True được tính là 1 khi cộng → đếm được số phần tử thoả điều kiện.
