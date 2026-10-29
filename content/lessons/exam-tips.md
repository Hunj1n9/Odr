@title: Bí kíp thi thực hành CodeRunner

Thi cuối kỳ TIN314 = **thi thực hành trên máy 90 phút, chiếm 60% điểm**. Đề giữa kỳ cho thấy hình thức: *viết hàm đúng tên, hệ thống tự gọi hàm với nhiều bộ test ẩn và so sánh kết quả*.

## 1. Mười lỗi mất điểm phổ biến nhất

| # | Lỗi | Cách tránh |
|---|---|---|
| 1 | `print` thay vì `return` | Hàm phải **return** – hệ thống so sánh giá trị trả về |
| 2 | Sai tên hàm / tên tham số | Copy y nguyên tên hàm từ đề |
| 3 | Sai chuỗi kết quả | `"No solution"` ≠ `"No Solution"` ≠ `"No solution "` – copy từ đề |
| 4 | Quên trường hợp biên | list rỗng, n = 0, số âm, a = 0, chỉ 1 phần tử |
| 5 | Sai kiểu trả về | `5.0` vs `5`, list vs tuple, `"5"` vs `5` – đọc kỹ đề |
| 6 | Quên làm tròn / làm tròn sai | `round(x, 2)` đúng số chữ số đề yêu cầu |
| 7 | Sửa dữ liệu đầu vào | Dùng `sorted()` / `.copy()` thay vì `.sort()` trên tham số |
| 8 | Dùng `input()` khi đề không yêu cầu | Hàm nhận tham số – không đọc bàn phím |
| 9 | Vòng lặp vô hạn | Kiểm tra biến điều kiện `while` có thay đổi |
| 10 | Đặt tên biến trùng hàm có sẵn | Không đặt `list`, `dict`, `sum`, `max`, `min`, `str`, `input` |

```python
def sai(lst):
    lst.sort()              # sửa list của người gọi + return None
    return lst.sort()

def dung(lst):
    return sorted(lst)      # list mới, list gốc giữ nguyên

data = [3, 1, 2]
print(sai(data), data)
data = [3, 1, 2]
print(dung(data), data)
```

## 2. Checklist trước khi nộp mỗi câu

1. Tên hàm, số tham số **đúng y đề**?
2. Có `return` ở **mọi nhánh** if/else?
3. Đã chạy thử **ví dụ trong đề** và ra đúng?
4. Đã thử **trường hợp biên**: rỗng, 0, âm, 1 phần tử, trùng lặp?
5. Kiểu dữ liệu trả về đúng (int/float/str/list/tuple/dict)?
6. Làm tròn đúng chỗ (trước hay sau khi tính?) và đúng số chữ số?
7. `import` đặt ở đầu file?

## 3. Phân bổ 90 phút

| Thời gian | Việc |
|---|---|
| 5 phút | Đọc lướt **toàn bộ** đề, đánh dấu câu dễ |
| 45 phút | Làm hết câu dễ & trung bình – chắc điểm trước |
| 30 phút | Câu khó: viết bản **đúng trước, nhanh sau** (vét cạn vẫn hơn bỏ trống) |
| 10 phút | Rà checklist, thử trường hợp biên |

> Không ra hướng? Viết lời giải **vét cạn** (thử mọi khả năng) – thường vẫn qua phần lớn test. Điểm từng phần tính theo số test đúng!

## 4. Mẫu code cần thuộc lòng

```python
from collections import Counter
from itertools import combinations
import math

# Đếm tần suất & phần tử phổ biến nhất (hoà -> nhỏ nhất)
lst = [3, 1, 3, 1, 2]
freq = Counter(lst)
best = max(freq.values())
print(min(x for x in freq if freq[x] == best))

# Sắp xếp list dict theo nhiều tiêu chí
people = [{"name": "An", "age": 20}, {"name": "Bình", "age": 19}, {"name": "Chi", "age": 20}]
print([p["name"] for p in sorted(people, key=lambda p: (-p["age"], p["name"]))])

# Min-so-far (lợi nhuận tối đa)
prices, lo, best = [7, 1, 5, 3, 6, 4], float("inf"), 0
for p in prices:
    lo = min(lo, p)
    best = max(best, p - lo)
print(best)

# Duyệt mọi bộ ba / cặp
print(sum(1 for a, b, c in combinations([-1, 0, 1, 2, -3], 3) if a + b + c == 0))

# ƯCLN, tổ hợp, số nguyên tố
print(math.gcd(12, 18), math.comb(5, 2), all(17 % i for i in range(2, int(17 ** 0.5) + 1)))

# ord/chr cho mã hoá chữ cái
print("".join(chr((ord(c) - 65 + 3) % 26 + 65) for c in "HELLO"))
```

Mẫu Pandas hay dùng:

```python
import pandas as pd
df = pd.read_csv("sales.csv")
df = df.drop_duplicates().dropna(subset=["quantity"]).copy()
df["revenue"] = df["quantity"] * df["unit_price"]
print(df.groupby("region")["revenue"].sum().sort_values(ascending=False).head(3))
print(df.loc[df.groupby("category")["revenue"].idxmax(), ["category", "product", "revenue"]])
print(df["category"].value_counts().to_dict())
```

## 5. Đọc thông báo lỗi

```python
def tb(lst):
    return sum(lst) / len(lst)

try:
    tb([])
except ZeroDivisionError as e:
    print("Bắt được:", type(e).__name__, "-", e)
```

Đọc **dòng cuối** của traceback trước (tên lỗi + mô tả), sau đó tìm **số dòng** trong code của bạn. Trang luyện code hiển thị gợi ý tiếng Việt cho từng loại lỗi.

## 6. Mẹo về làm tròn và số thực

- `round(2.5) == 2`, `round(3.5) == 4` (làm tròn về số chẵn).
- So sánh số thực: `abs(a - b) < 1e-9` hoặc `math.isclose(a, b)`.
- f-string `f"{x:.2f}"` trả về **chuỗi**, `round(x, 2)` trả về **số** – đề yêu cầu cái nào?

```python
x = 2.675
print(round(x, 2), f"{x:.2f}", type(round(x, 2)), type(f"{x:.2f}"))
```
