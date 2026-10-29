@title: Nhập & tải dữ liệu, NumPy
@chapter: 3
@summary: Đọc CSV/Excel/JSON với Pandas, các tham số read_csv quan trọng, ghi file và nền tảng mảng NumPy.

## 1. Đọc file CSV với Pandas

CSV (comma-separated values) là định dạng phổ biến nhất. Trang này có sẵn 4 file: `sales.csv`, `customers.csv`, `students.csv`, `stocks.csv`.

```python
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.shape)          # (số dòng, số cột)
print(df.columns.tolist())
print(df.dtypes)
df.head()
```

6 lệnh cần chạy **đầu tiên** với mọi bộ dữ liệu:

```python
import pandas as pd
df = pd.read_csv("students.csv")
df.info()                 # kiểu dữ liệu + số ô không trống mỗi cột
print(df.isna().sum())    # số ô trống mỗi cột
df.describe()             # thống kê mô tả cột số
```

### Tham số `read_csv` hay dùng

| Tham số | Ý nghĩa | Ví dụ |
|---|---|---|
| `sep` | ký tự phân cách | `sep=";"`, `sep="\t"` |
| `header` / `names` | dòng tiêu đề / tự đặt tên cột | `header=None, names=["a","b"]` |
| `usecols` | chỉ đọc vài cột | `usecols=["date", "close"]` |
| `index_col` | dùng cột làm index | `index_col="order_id"` |
| `parse_dates` | đọc cột thành kiểu ngày | `parse_dates=["date"]` |
| `na_values` | giá trị coi là thiếu | `na_values=["-", "N/A"]` |
| `dtype` | ép kiểu | `dtype={"customer_id": str}` |
| `encoding` | mã hoá ký tự | `encoding="utf-8"` (lỗi font tiếng Việt → thử `"utf-8-sig"`) |
| `nrows` | chỉ đọc n dòng đầu | `nrows=100` |

```python
import pandas as pd
stocks = pd.read_csv("stocks.csv", usecols=["date", "ticker", "close"], parse_dates=["date"])
print(stocks.dtypes)
stocks.tail(3)
```

### Đọc dữ liệu từ chuỗi / dữ liệu dán vào

```python
import io
import pandas as pd

text = """mon;tin_chi;diem
TIN314;3;8.5
KTE201;3;-
TAC101;2;7.0"""
df = pd.read_csv(io.StringIO(text), sep=";", na_values=["-"])
df
```

### Tạo DataFrame từ dict / list

```python
import pandas as pd
df = pd.DataFrame({
    "ten": ["An", "Bình", "Chi"],
    "diem": [8.0, 6.5, 9.1],
})
rows = [{"ten": "Dũng", "diem": 7.2}, {"ten": "Hà", "diem": 5.9}]
df = pd.concat([df, pd.DataFrame(rows)], ignore_index=True)
df
```

### Excel, JSON và ghi file

```py
df = pd.read_excel("baocao.xlsx", sheet_name="2024")   # cần openpyxl
df = pd.read_json("data.json")
df.to_csv("ket_qua.csv", index=False)                  # index=False để không ghi cột index
df.to_excel("ket_qua.xlsx", index=False)
```

```python
import pandas as pd
df = pd.DataFrame({"a": [1, 2], "b": ["x", "y"]})
df.to_csv("thu.csv", index=False)
print(open("thu.csv").read())
print(pd.read_csv("thu.csv"))
```

### Đọc file thuần với `open` và `csv`

```python
import csv
with open("customers.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    rows = list(reader)
print(len(rows), rows[0])
print([r["name"] for r in rows if r["tier"] == "Vàng"])
```

`with open(...)` tự đóng file kể cả khi có lỗi.

## 2. NumPy – nền tảng tính toán khoa học

NumPy cung cấp **mảng n chiều** (`ndarray`) với phép tính **vector hoá**: áp dụng cho cả mảng mà không cần vòng lặp – nhanh hơn list hàng chục lần.

```python
import numpy as np

a = np.array([1, 2, 3, 4])
print(a * 2, a + a, a ** 2, np.sqrt(a))    # tính trên từng phần tử
print([1, 2] * 2)                          # so sánh: list thì lặp lại!
print(a.shape, a.dtype, a.ndim, a.size)

print(np.zeros(3), np.ones((2, 2)), np.arange(0, 10, 3), np.linspace(0, 1, 5))
```

### Mảng 2 chiều, reshape, indexing

```python
import numpy as np
m = np.arange(1, 13).reshape(3, 4)
print(m)
print(m[0, 1], m[1], m[:, 2])     # phần tử, hàng 1, cột 2
print(m[:2, :2])                  # mảng con 2x2 góc trên trái
print(m.T.shape)                  # chuyển vị
print(m.reshape(-1))              # -1: tự suy ra kích thước
```

### Lọc bằng mặt nạ boolean

```python
import numpy as np
diem = np.array([4.5, 8.0, 6.5, 9.5, 3.0])
mask = diem >= 5
print(mask, diem[mask], mask.sum(), mask.mean())
print(diem[(diem > 5) & (diem < 9)])     # dùng & | ~ và ngoặc
diem2 = diem.copy()
diem2[diem2 < 5] = 0
print(diem2, np.where(diem >= 5, "Đỗ", "Trượt"))
```

### Thống kê theo trục (axis)

```python
import numpy as np
# hàng = sinh viên, cột = môn
scores = np.array([[8, 7, 9],
                   [6, 5, 7],
                   [9, 9, 10]])
print(scores.mean())          # toàn bộ
print(scores.mean(axis=0))    # axis=0: theo CỘT -> TB từng môn
print(scores.mean(axis=1))    # axis=1: theo HÀNG -> TB từng sinh viên
print(scores.max(axis=1), scores.argmax(axis=1))
print(np.std([2, 4, 4, 4, 5, 5, 7, 9]), np.median([1, 3, 2]), np.percentile([1, 2, 3, 4], 50))
```

### Broadcasting và đại số tuyến tính

```python
import numpy as np
gia = np.array([[100, 200], [150, 250]])
print(gia * np.array([1.1, 0.9]))          # nhân từng CỘT với hệ số khác nhau

A = np.array([[2, 1], [1, -1]])
b = np.array([5, 1])
print(A @ np.array([2, 1]))                 # nhân ma trận
print(np.linalg.solve(A, b), np.linalg.det(A), np.linalg.inv(A))
```

### Số ngẫu nhiên có thể tái lập

```python
import numpy as np
rng = np.random.default_rng(42)            # seed cố định → kết quả lặp lại được
print(rng.integers(1, 101, size=(2, 3)))
print(rng.normal(0, 1, 3).round(3))
np.random.seed(0)
print(np.random.randint(1, 7, 5))          # cách cũ, vẫn hay gặp trong đề
```
