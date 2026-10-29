@title: Python cơ bản
@chapter: 2
@summary: Kiểu dữ liệu, chuỗi, list/tuple/dict/set, điều kiện, vòng lặp, hàm, lambda, xử lý lỗi và các mẫu thuật toán hay thi.

Đây là chương **quan trọng nhất cho bài thi** – đề giữa kỳ và phần lớn đề cuối kỳ là viết hàm Python thuần. Hãy chạy và sửa từng ví dụ.

## 1. Biến, kiểu dữ liệu và toán tử

```python
a, b = 17, 5
print(a + b, a - b, a * b)
print(a / b)    # chia thực  -> 3.4
print(a // b)   # chia nguyên -> 3
print(a % b)    # chia lấy dư -> 2
print(a ** 2)   # luỹ thừa   -> 289
print(-7 // 2, -7 % 2)   # làm tròn XUỐNG: -4 và 1
```

Chuyển kiểu: `int("12")`, `float("3.5")`, `str(10)`, `bool(0)`. Số thực có sai số: `0.1 + 0.2 == 0.3` là **False** → dùng `round()` hoặc `math.isclose()`.

```python
import math
print(0.1 + 0.2, 0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3))
print(round(2.675, 2), round(2.5), round(3.5))   # round "banker's": 2.5 -> 2
print(math.ceil(4.1), math.floor(4.9), math.sqrt(16), math.gcd(12, 18))
```

## 2. Chuỗi (str)

Chuỗi là **bất biến**, đánh chỉ số từ 0, hỗ trợ chỉ số âm và slicing `s[start:stop:step]`.

```python
s = "Foreign Trade University"
print(len(s), s[0], s[-1], s[:7], s[8:13], s[::-1])
print(s.lower(), s.upper(), s.count("e"), s.find("Trade"))
print(s.replace(" ", "_"), s.split(), "-".join(["a", "b", "c"]))
print(s.startswith("For"), "Trade" in s, "  xin chào  ".strip())

ten, diem = "Minh", 8.456
print(f"{ten:>6} | {diem:.2f} | {0.857:.1%}")   # f-string định dạng
print(ord("A"), chr(66), "abc".isalpha(), "123".isdigit())
```

## 3. List – danh sách

```python
nums = [5, 3, 8, 1]
nums.append(10)        # thêm cuối
nums.insert(0, 7)      # chèn vào vị trí 0
nums.remove(3)         # xoá giá trị 3 (lần xuất hiện đầu)
last = nums.pop()      # lấy & xoá phần tử cuối
print(nums, last)
print(sorted(nums), sorted(nums, reverse=True), nums)  # sorted tạo list MỚI
nums.sort()            # sort sửa TẠI CHỖ, trả về None
print(nums, sum(nums), max(nums), min(nums), len(nums))
print(nums[1:3], nums[::-1], nums.index(8), nums.count(5))
```

**List comprehension** – cách viết ngắn gọn, được cộng điểm bonus trong đề tuyển tập:

```python
nums = [1, 2, 3, 4, 5, 6]
binh_phuong = [x ** 2 for x in nums]
so_chan = [x for x in nums if x % 2 == 0]
nhan = ["chẵn" if x % 2 == 0 else "lẻ" for x in nums]
ma_tran = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(binh_phuong, so_chan, nhan, ma_tran, sep="\n")
```

> **Bẫy kinh điển:** `b = a` không sao chép list – `a` và `b` là **cùng một list**. Dùng `b = a.copy()` hoặc `a[:]`. Tương tự `[[0] * 3] * 3` tạo 3 hàng *dùng chung*; phải viết `[[0] * 3 for _ in range(3)]`.

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)          # a cũng bị đổi!
grid = [[0] * 3] * 3
grid[0][0] = 9
print(grid)       # cả 3 hàng đều đổi
```

## 4. Tuple, dict, set

```python
# tuple: như list nhưng bất biến, hay dùng để trả về nhiều giá trị
diem = (3, 4)
x, y = diem                     # unpack
print(x, y)

# dict: ánh xạ key -> value
sv = {"ten": "Lan", "lop": "K62", "diem": 8.5}
sv["diem"] = 9.0                # sửa
sv["nam"] = 3                   # thêm
print(sv.get("email", "chưa có"), list(sv.keys()), list(sv.values()))
for k, v in sv.items():
    print(k, "→", v)

# đếm tần suất – mẫu PHẢI thuộc
text = "a b a c b a"
freq = {}
for w in text.split():
    freq[w] = freq.get(w, 0) + 1
print(freq)

# set: tập hợp không trùng, không thứ tự
A, B = {1, 2, 3, 4}, {3, 4, 5}
print(A & B, A | B, A - B, len(set([1, 1, 2])))
```

`collections.Counter` làm việc đếm nhanh hơn:

```python
from collections import Counter
c = Counter("mississippi")
print(c, c.most_common(2), c["s"])
```

## 5. Điều kiện và vòng lặp

```python
diem = 7.3
if diem >= 8.5:
    xep_loai = "A"
elif diem >= 7:
    xep_loai = "B"
else:
    xep_loai = "C trở xuống"
print(xep_loai)

for i in range(1, 10, 3):           # 1, 4, 7
    print(i, end=" ")
print()
for i, ten in enumerate(["An", "Bình"]):   # có chỉ số
    print(i, ten)
for ten, d in zip(["An", "Bình"], [8, 9]): # duyệt song song
    print(ten, d)

n, buoc = 27, 0
while n != 1:                        # while: lặp khi chưa biết trước số lần
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    buoc += 1
print("Collatz 27 cần", buoc, "bước")
```

`break` thoát vòng lặp, `continue` bỏ qua lượt hiện tại. **Luôn chắc chắn biến điều kiện của while thay đổi** – nếu không chương trình chạy mãi.

## 6. Hàm – trọng tâm của bài thi

```python
def tinh_diem_tong(cc, gk, ck, w=(0.1, 0.3, 0.6)):
    """Trả về điểm tổng kết làm tròn 1 chữ số."""
    tong = cc * w[0] + gk * w[1] + ck * w[2]
    return round(tong, 1)

print(tinh_diem_tong(10, 7, 8))
print(tinh_diem_tong(10, 7, 8, w=(0.1, 0.4, 0.5)))

def thong_ke(*so):              # nhận số tham số tuỳ ý
    return min(so), max(so), sum(so) / len(so)

nho, lon, tb = thong_ke(4, 8, 6)
print(nho, lon, tb)
```

> **`return` ≠ `print`.** Hệ thống chấm gọi hàm và **so sánh giá trị trả về**. Hàm chỉ `print` mà không `return` sẽ trả về `None` → sai mọi test.

```python
def sai(x):
    print(x * 2)      # chỉ in ra màn hình

def dung(x):
    return x * 2

print("sai:", sai(5))     # in 10 rồi in None
print("đúng:", dung(5))
```

### lambda và tham số `key`

```python
sinh_vien = [{"ten": "An", "diem": 7.5}, {"ten": "Bình", "diem": 9}, {"ten": "Chi", "diem": 8}]
print(sorted(sinh_vien, key=lambda s: s["diem"], reverse=True))
print(max(sinh_vien, key=lambda s: s["diem"])["ten"])
print(sorted(["bb", "a", "ccc"], key=len))
print(sorted([(2, "b"), (1, "z"), (2, "a")]))       # tuple so sánh từng phần tử
print(sorted([3, -1, 2], key=lambda x: (-abs(x), x)))  # nhiều tiêu chí
```

## 7. Xử lý lỗi

```python
def chia(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None
    except TypeError as e:
        return f"Lỗi kiểu: {e}"

print(chia(6, 3), chia(1, 0), chia("6", 3))
```

Lỗi hay gặp: `NameError` (sai tên biến), `TypeError` (sai kiểu), `IndexError` (vượt chỉ số), `KeyError` (thiếu key), `ZeroDivisionError`, `IndentationError` (thụt lề).

## 8. Các mẫu thuật toán hay ra thi

```python
import math
from itertools import combinations

def is_prime(n):                       # số nguyên tố
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def digit_sum(n):                      # tổng chữ số
    return sum(int(c) for c in str(abs(n)))

def fib(n):                            # n số Fibonacci đầu
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]

print([p for p in range(30) if is_prime(p)])
print(digit_sum(-1234), fib(10), math.gcd(48, 36), math.comb(5, 2))
print(list(combinations([1, 2, 3, 4], 2)))   # mọi cặp i < j
```

Mẫu "lợi nhuận tối đa / min-so-far" và "đếm bằng dict" xuất hiện rất thường xuyên – làm các bài trong bộ **Đề giữa kì** để thành thạo.

## 9. Nhập dữ liệu từ bàn phím

Đề CodeRunner thường **không** dùng `input()` (hệ thống gọi hàm trực tiếp). Nhưng nếu đề yêu cầu đọc từ bàn phím:

```python
n = int(input("Nhập n: "))        # ô Input trong Sổ tay Python cung cấp dữ liệu
m = int(input("Nhập m: "))
print("Tổng:", n + m)
```

`input()` luôn trả về **chuỗi** – nhớ ép kiểu `int()`/`float()`. Đọc nhiều số trên một dòng: `a, b = map(int, input().split())`.
