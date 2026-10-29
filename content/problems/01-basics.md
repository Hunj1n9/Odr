Bài khởi động Chương 2 – Python cơ bản. Làm theo thứ tự để nắm chắc nền tảng trước khi luyện đề.

===== b01
@title: Tổng các chữ số
@level: easy
@topic: basics
@fn: sum_digits
::: statement
Viết hàm `sum_digits(n)` trả về tổng các chữ số của số nguyên `n` (n có thể âm – bỏ qua dấu).

- `sum_digits(1234)` → `10`
- `sum_digits(-905)` → `14`
::: starter
def sum_digits(n):
    pass


print(sum_digits(1234))  # 10
::: solution
def sum_digits(n):
    n = abs(n)
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total
::: tests
1234 ==> 10
-905 ==> 14
::: hidden
0 ==> 0
7 ==> 7
99999999999 ==> 99
::: hints
- Cách 1 (chuỗi): `sum(int(c) for c in str(abs(n)))`.
- Cách 2 (toán): lấy chữ số cuối bằng `n % 10`, bỏ chữ số cuối bằng `n //= 10`.
::: explain
Hai toán tử quan trọng: `%` (chia lấy dư) và `//` (chia lấy phần nguyên). `n % 10` là chữ số hàng đơn vị.

===== b02
@title: Chuỗi đối xứng (palindrome)
@level: easy
@topic: string
@fn: is_palindrome
::: statement
Viết hàm `is_palindrome(s)` trả về `True` nếu chuỗi đọc xuôi và ngược giống nhau, **bỏ qua khoảng trắng và không phân biệt hoa/thường**.

- `is_palindrome("Never odd or even")` → `True`
- `is_palindrome("Python")` → `False`
::: starter
def is_palindrome(s):
    pass


print(is_palindrome("Never odd or even"))  # True
::: solution
def is_palindrome(s):
    t = s.replace(" ", "").lower()
    return t == t[::-1]
::: tests
"Never odd or even" ==> True
"Python" ==> False
::: hidden
"" ==> True
"A" ==> True
"ab ba" ==> True
"abca" ==> False
::: hints
- Chuẩn hoá trước: `s.replace(" ", "").lower()`.
- So sánh với chuỗi đảo `t[::-1]`.
::: explain
Slicing `[::-1]` (bước −1) đảo ngược chuỗi/list – một trong những thủ thuật dùng nhiều nhất.

===== b03
@title: Xếp loại điểm chữ (thang FTU)
@level: easy
@topic: basics
@fn: letter_grade
::: statement
Viết hàm `letter_grade(score)` đổi điểm hệ 10 sang điểm chữ:

| Điểm | Chữ |
|---|---|
| 8.5 – 10 | A |
| 8.0 – 8.4 | B+ |
| 7.0 – 7.9 | B |
| 6.5 – 6.9 | C+ |
| 5.5 – 6.4 | C |
| 5.0 – 5.4 | D+ |
| 4.0 – 4.9 | D |
| < 4.0 | F |

Nếu `score` không nằm trong [0, 10] trả về `"Invalid"`.
::: starter
def letter_grade(score):
    pass


print(letter_grade(8.7))  # A
::: solution
def letter_grade(score):
    if score < 0 or score > 10:
        return "Invalid"
    if score >= 8.5:
        return "A"
    if score >= 8.0:
        return "B+"
    if score >= 7.0:
        return "B"
    if score >= 6.5:
        return "C+"
    if score >= 5.5:
        return "C"
    if score >= 5.0:
        return "D+"
    if score >= 4.0:
        return "D"
    return "F"
::: tests
8.7 ==> "A"
6.5 ==> "C+"
3.9 ==> "F"
::: hidden
10 ==> "A"
8.0 ==> "B+"
7.9 ==> "B"
5.4 ==> "D+"
4.0 ==> "D"
0 ==> "F"
10.5 ==> "Invalid"
-1 ==> "Invalid"
::: hints
- Kiểm tra trường hợp không hợp lệ trước.
- Dùng chuỗi `if` từ ngưỡng **cao xuống thấp**, mỗi nhánh `return` luôn.
::: explain
Xét ngưỡng từ cao xuống thấp thì mỗi điều kiện chỉ cần một vế (`score >= 8.0`) vì các trường hợp cao hơn đã `return` trước đó.

===== b04
@title: FizzBuzz trả về list
@level: easy
@topic: basics
@fn: fizzbuzz
::: statement
Viết hàm `fizzbuzz(n)` trả về list độ dài n, phần tử thứ i (i từ 1 đến n) là:
- `"FizzBuzz"` nếu i chia hết cho 3 và 5
- `"Fizz"` nếu chỉ chia hết cho 3, `"Buzz"` nếu chỉ chia hết cho 5
- ngược lại là **số i** (kiểu int)

`fizzbuzz(5)` → `[1, 2, 'Fizz', 4, 'Buzz']`
::: starter
def fizzbuzz(n):
    pass


print(fizzbuzz(15))
::: solution
def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(i)
    return out
::: tests
5 ==> [1, 2, 'Fizz', 4, 'Buzz']
15
::: hidden
0 ==> []
1 ==> [1]
30
::: hints
- `range(1, n + 1)` để chạy từ 1 đến n.
- Kiểm tra "chia hết cho cả 3 và 5" **trước** tiên.
::: explain
Thứ tự `if/elif` quan trọng: nếu kiểm tra `% 3` trước thì 15 sẽ ra `"Fizz"`.

===== b05
@title: ƯCLN và BCNN
@level: easy
@topic: algo
@fn: gcd_lcm
::: statement
Viết hàm `gcd_lcm(a, b)` (a, b nguyên dương) trả về **tuple** `(ucln, bcnn)`.

`gcd_lcm(12, 18)` → `(6, 36)`
::: starter
def gcd_lcm(a, b):
    pass


print(gcd_lcm(12, 18))  # (6, 36)
::: solution
def gcd_lcm(a, b):
    x, y = a, b
    while y:
        x, y = y, x % y
    return x, a * b // x
::: tests
12, 18 ==> (6, 36)
7, 5 ==> (1, 35)
::: hidden
1, 1 ==> (1, 1)
100, 10 ==> (10, 100)
123456, 7890 ==> (6, 162344640)
::: hints
- Thuật toán Euclid: `while b: a, b = b, a % b`.
- BCNN = a × b / ƯCLN (dùng `//`).
::: explain
`return x, y` trả về **tuple** `(x, y)`. Phép gán đồng thời `x, y = y, x % y` không cần biến tạm.

===== b06
@title: Đảo thứ tự các từ
@level: easy
@topic: string
@fn: reverse_words
::: statement
Viết hàm `reverse_words(s)` đảo **thứ tự các từ** trong câu (các từ cách nhau bởi một hoặc nhiều khoảng trắng). Kết quả các từ cách nhau đúng 1 dấu cách.

`reverse_words("  học   Python  vui ")` → `"vui Python học"`
::: starter
def reverse_words(s):
    pass


print(reverse_words("học Python vui"))  # vui Python học
::: solution
def reverse_words(s):
    return " ".join(s.split()[::-1])
::: tests
"học Python vui" ==> "vui Python học"
"  học   Python  vui " ==> "vui Python học"
::: hidden
"" ==> ""
"one" ==> "one"
"a b c d" ==> "d c b a"
::: hints
- `s.split()` (không tham số) tự bỏ mọi khoảng trắng thừa.
- `" ".join(list)` nối lại.
::: explain
`split()` không đối số khác `split(" ")`: nó gộp các khoảng trắng liên tiếp và bỏ đầu/cuối.

===== b07
@title: Đếm loại ký tự
@level: easy
@topic: string
@fn: count_char_types
::: statement
Viết hàm `count_char_types(s)` trả về tuple `(hoa, thuong, so, khac)`: số chữ in hoa, chữ thường, chữ số, và ký tự còn lại.

`count_char_types("FTU 2024!")` → `(3, 0, 4, 2)`
::: starter
def count_char_types(s):
    pass


print(count_char_types("FTU 2024!"))  # (3, 0, 4, 2)
::: solution
def count_char_types(s):
    up = low = dig = other = 0
    for c in s:
        if c.isupper():
            up += 1
        elif c.islower():
            low += 1
        elif c.isdigit():
            dig += 1
        else:
            other += 1
    return up, low, dig, other
::: tests
"FTU 2024!" ==> (3, 0, 4, 2)
"Hello World" ==> (2, 8, 0, 1)
::: hidden
"" ==> (0, 0, 0, 0)
"Ngoại Thương 64" ==> (2, 9, 2, 2)
::: hints
- Các phương thức `c.isupper()`, `c.islower()`, `c.isdigit()`.
::: explain
Các phương thức `isupper/islower` hoạt động cả với chữ có dấu tiếng Việt.

===== b08
@title: Tần suất từ
@level: easy
@topic: collections
@fn: word_frequency
::: statement
Viết hàm `word_frequency(text)` trả về dict `{từ: số lần xuất hiện}`, **không phân biệt hoa/thường** (đổi tất cả về chữ thường). Các từ cách nhau bởi khoảng trắng.

`word_frequency("Data is data")` → `{'data': 2, 'is': 1}`
::: starter
def word_frequency(text):
    pass


print(word_frequency("Data is data"))
::: solution
def word_frequency(text):
    freq = {}
    for w in text.lower().split():
        freq[w] = freq.get(w, 0) + 1
    return freq
::: tests
"Data is data" ==> {'data': 2, 'is': 1}
"a b a c b a" ==> {'a': 3, 'b': 2, 'c': 1}
::: hidden
"" ==> {}
"Python PYTHON python" ==> {'python': 3}
::: hints
- `freq.get(w, 0) + 1` – lấy giá trị cũ (mặc định 0) rồi cộng 1.
- Hoặc `collections.Counter(text.lower().split())` rồi đổi về `dict`.
::: explain
Mẫu đếm tần suất bằng dict xuất hiện trong **rất nhiều** đề thi. Thuộc cả 2 cách: `dict.get` và `Counter`.

===== b09
@title: Số lớn thứ hai
@level: easy
@topic: collections
@fn: second_largest
::: statement
Viết hàm `second_largest(nums)` trả về **giá trị lớn thứ hai khác nhau** trong list. Nếu không tồn tại, trả về `None`.

- `second_largest([5, 1, 5, 3])` → `3`
- `second_largest([7, 7])` → `None`
::: starter
def second_largest(nums):
    pass


print(second_largest([5, 1, 5, 3]))  # 3
::: solution
def second_largest(nums):
    values = sorted(set(nums), reverse=True)
    return values[1] if len(values) >= 2 else None
::: tests
[5, 1, 5, 3] ==> 3
[7, 7] ==> None
::: hidden
[] ==> None
[1, 2] ==> 1
[-1, -5, -3] ==> -3
::: hints
- Loại trùng bằng `set`, sắp xếp giảm dần, lấy phần tử thứ 2 nếu có.
::: explain
"Lớn thứ hai **khác nhau**" ⇒ phải loại trùng, nếu không `[5, 1, 5, 3]` sẽ ra 5.

===== b10
@title: Tổng tích luỹ
@level: easy
@topic: collections
@fn: running_total
::: statement
Viết hàm `running_total(nums)` trả về list tổng tích luỹ: phần tử thứ i là tổng `nums[0] + … + nums[i]`.

`running_total([1, 2, 3, 4])` → `[1, 3, 6, 10]`
::: starter
def running_total(nums):
    pass


print(running_total([1, 2, 3, 4]))  # [1, 3, 6, 10]
::: solution
def running_total(nums):
    out, s = [], 0
    for x in nums:
        s += x
        out.append(s)
    return out
::: tests
[1, 2, 3, 4] ==> [1, 3, 6, 10]
::: hidden
[] ==> []
[5] ==> [5]
[1.5, -0.5, 2] ==> [1.5, 1.0, 3.0]
::: hints
- Giữ một biến tổng `s`, mỗi bước cộng thêm rồi `append`.
- Tham khảo: `itertools.accumulate`, `numpy.cumsum`.
::: explain
Trong NumPy/Pandas tương ứng là `np.cumsum(arr)` / `df['col'].cumsum()` – rất hay dùng trong phân tích doanh thu luỹ kế.

===== b11
@title: Gộp hai dict cộng dồn
@level: easy
@topic: collections
@fn: merge_sales
::: statement
Hai chi nhánh báo cáo doanh số dạng dict `{sản phẩm: số lượng}`. Viết hàm `merge_sales(d1, d2)` trả về dict gộp, sản phẩm có ở cả hai thì **cộng dồn**.

`merge_sales({'a': 2, 'b': 1}, {'b': 3, 'c': 5})` → `{'a': 2, 'b': 4, 'c': 5}`
::: starter
def merge_sales(d1, d2):
    pass


print(merge_sales({'a': 2, 'b': 1}, {'b': 3, 'c': 5}))
::: solution
def merge_sales(d1, d2):
    out = dict(d1)
    for k, v in d2.items():
        out[k] = out.get(k, 0) + v
    return out
::: tests
{'a': 2, 'b': 1}, {'b': 3, 'c': 5} ==> {'a': 2, 'b': 4, 'c': 5}
::: hidden
{}, {} ==> {}
{'x': 1}, {} ==> {'x': 1}
{}, {'y': 2.5} ==> {'y': 2.5}
::: hints
- Copy d1 (`dict(d1)`) để **không sửa** dict đầu vào.
- Duyệt `d2.items()` và cộng dồn bằng `get`.
::: explain
Không nên sửa trực tiếp tham số đầu vào (side effect) – chấm bài có thể dùng lại dữ liệu đó.

===== b12
@title: Làm phẳng list lồng nhau
@level: medium
@topic: collections
@fn: flatten
::: statement
Viết hàm `flatten(nested)` làm phẳng list lồng nhau **nhiều cấp** thành list một cấp.

`flatten([1, [2, [3, 4]], [], 5])` → `[1, 2, 3, 4, 5]`
::: starter
def flatten(nested):
    pass


print(flatten([1, [2, [3, 4]], [], 5]))
::: solution
def flatten(nested):
    out = []
    for x in nested:
        if isinstance(x, list):
            out.extend(flatten(x))
        else:
            out.append(x)
    return out
::: tests
[1, [2, [3, 4]], [], 5] ==> [1, 2, 3, 4, 5]
::: hidden
[] ==> []
[[[[]]]] ==> []
[['a'], 'b', [['c', 'd']]] ==> ['a', 'b', 'c', 'd']
::: hints
- Dùng **đệ quy**: nếu phần tử là list thì gọi lại `flatten` cho nó.
::: explain
Đệ quy = hàm gọi chính nó với bài toán nhỏ hơn, luôn cần điều kiện dừng (ở đây: phần tử không phải list).

===== b13
@title: Mã Caesar
@level: medium
@topic: string
@fn: caesar
::: statement
Viết hàm `caesar(s, k)` dịch mỗi **chữ cái tiếng Anh** đi k vị trí (vòng tròn, giữ nguyên hoa/thường). Ký tự khác giữ nguyên. k có thể âm.

`caesar("Hello, World!", 3)` → `"Khoor, Zruog!"`
::: starter
def caesar(s, k):
    pass


print(caesar("Hello, World!", 3))
::: solution
def caesar(s, k):
    out = []
    for c in s:
        if 'a' <= c <= 'z':
            out.append(chr((ord(c) - 97 + k) % 26 + 97))
        elif 'A' <= c <= 'Z':
            out.append(chr((ord(c) - 65 + k) % 26 + 65))
        else:
            out.append(c)
    return "".join(out)
::: tests
"Hello, World!", 3 ==> "Khoor, Zruog!"
"xyz", 2 ==> "zab"
::: hidden
"Khoor", -3 ==> "Hello"
"ABC", 52 ==> "ABC"
"", 5 ==> ""
::: hints
- Chuyển chữ về số 0..25, cộng k, `% 26`, đổi ngược lại.
- `%` của Python luôn ra số không âm khi số chia dương, nên k âm vẫn đúng.
::: explain
Đây là nền tảng cho các bài Vigenère / Atbash / A1Z26 trong đề thi.

===== b14
@title: Chia an toàn với try/except
@level: easy
@topic: basics
@fn: safe_divide
::: statement
Viết hàm `safe_divide(a, b)`:
- trả về `a / b` làm tròn 2 chữ số,
- trả về `None` nếu `b == 0` hoặc a, b không phải số (ví dụ chuỗi).

Yêu cầu dùng `try` / `except`.
::: starter
def safe_divide(a, b):
    pass


print(safe_divide(10, 3))  # 3.33
::: solution
def safe_divide(a, b):
    try:
        return round(a / b, 2)
    except (ZeroDivisionError, TypeError):
        return None
::: tests
10, 3 ==> 3.33
5, 0 ==> None
::: hidden
"10", 2 ==> None
-7, 2 ==> -3.5
0, 5 ==> 0.0
::: hints
- `except ZeroDivisionError:` bắt lỗi chia cho 0; `TypeError` khi chia chuỗi.
::: explain
Có thể bắt nhiều loại lỗi bằng tuple: `except (ZeroDivisionError, TypeError):`.

===== b15
@title: Lãi kép – giá trị tương lai
@level: easy
@topic: basics
@fn: future_value
::: statement
Gửi tiết kiệm **P** đồng, lãi suất **r**/năm (ví dụ 0.06 = 6%), ghép lãi **m** lần/năm trong **n** năm:

**FV = P × (1 + r/m)^(m·n)**

Viết hàm `future_value(P, r, n, m=1)` trả về FV làm tròn 2 chữ số.

`future_value(1000, 0.06, 2)` → `1123.6`; `future_value(1000, 0.12, 1, 12)` → `1126.83`
::: starter
def future_value(P, r, n, m=1):
    pass


print(future_value(1000, 0.06, 2))  # 1123.6
::: solution
def future_value(P, r, n, m=1):
    return round(P * (1 + r / m) ** (m * n), 2)
::: tests
1000, 0.06, 2 ==> 1123.6
1000, 0.12, 1, 12 ==> 1126.83
::: hidden
500, 0, 10 ==> 500
100000000, 0.07, 30 ==> 761225504.6
2000, 0.05, 3, 4 ==> 2321.51
::: hints
- Lũy thừa trong Python: `**`.
- Tham số mặc định `m=1` khai báo ngay trong `def`.
::: explain
Tham số có giá trị mặc định (`m=1`) phải đứng **sau** các tham số bắt buộc.

===== b16
@title: Giá trị hiện tại ròng (NPV)
@level: medium
@topic: algo
@fn: npv
::: statement
Dự án có dòng tiền `cashflows = [CF0, CF1, …, CFn]` (CF0 thường âm – vốn đầu tư) với lãi suất chiết khấu `rate`:

**NPV = Σ CFt / (1 + rate)^t**, t = 0..n

Viết hàm `npv(rate, cashflows)` trả về NPV làm tròn 2 chữ số.

`npv(0.1, [-1000, 300, 400, 500])` → `-21.04`
::: starter
def npv(rate, cashflows):
    pass


print(npv(0.1, [-1000, 300, 400, 500]))  # -21.04
::: solution
def npv(rate, cashflows):
    return round(sum(cf / (1 + rate) ** t for t, cf in enumerate(cashflows)), 2)
::: tests
0.1, [-1000, 300, 400, 500] ==> -21.04
0, [-100, 50, 60] ==> 10
::: hidden
0.05, [] ==> 0
0.08, [-5000, 1500, 1500, 1500, 1500] ==> -31.81
0.2, [100] ==> 100
::: hints
- `enumerate(cashflows)` cho cả chỉ số t và giá trị CFt.
::: explain
`enumerate` là cách chuẩn để duyệt list kèm chỉ số – thay vì `for t in range(len(cashflows))`.

===== b17
@title: Tìm IRR bằng chia đôi
@level: hard
@topic: algo
@fn: irr
::: statement
IRR là lãi suất làm **NPV = 0**. Với dòng tiền CF0 < 0 và các CF sau dương, NPV giảm dần khi lãi suất tăng.

Viết hàm `irr(cashflows)` tìm IRR bằng **phương pháp chia đôi** trên đoạn [0, 1], dừng khi độ rộng đoạn < 1e-7. Trả về IRR làm tròn **4** chữ số.

`irr([-1000, 300, 400, 500])` → `0.089`
::: starter
def irr(cashflows):
    pass


print(irr([-1000, 300, 400, 500]))  # 0.089
::: solution
def irr(cashflows):
    def npv(r):
        return sum(cf / (1 + r) ** t for t, cf in enumerate(cashflows))
    lo, hi = 0.0, 1.0
    while hi - lo > 1e-7:
        mid = (lo + hi) / 2
        if npv(mid) > 0:
            lo = mid
        else:
            hi = mid
    return round((lo + hi) / 2, 4)
::: tests
[-1000, 300, 400, 500] ==> 0.089
[-100, 110] ==> 0.1
::: hidden
[-1000, 500, 500, 500] ==> 0.2338
[-200, 0, 0, 266.2] ==> 0.1
::: hints
- Viết hàm con `npv(r)`.
- Nếu `npv(mid) > 0` thì IRR nằm bên phải mid (lãi suất phải cao hơn).
::: explain
Chia đôi (bisection) là kỹ thuật **tính toán khoa học** cơ bản để giải phương trình f(x) = 0 khi f đơn điệu – tên học phần có chữ "tính toán khoa học" chính là thế!

===== b18
@title: Ma trận chuyển vị (không dùng NumPy)
@level: easy
@topic: collections
@fn: transpose
::: statement
Ma trận là list các list (các hàng). Viết hàm `transpose(matrix)` trả về ma trận chuyển vị.

`transpose([[1, 2, 3], [4, 5, 6]])` → `[[1, 4], [2, 5], [3, 6]]`
::: starter
def transpose(matrix):
    pass


print(transpose([[1, 2, 3], [4, 5, 6]]))
::: solution
def transpose(matrix):
    if not matrix:
        return []
    return [[row[j] for row in matrix] for j in range(len(matrix[0]))]
::: tests
[[1, 2, 3], [4, 5, 6]] ==> [[1, 4], [2, 5], [3, 6]]
::: hidden
[] ==> []
[[7]] ==> [[7]]
[[1], [2], [3]] ==> [[1, 2, 3]]
::: hints
- Cột j của ma trận cũ thành hàng j của ma trận mới: `[row[j] for row in matrix]`.
- Mẹo: `[list(c) for c in zip(*matrix)]`.
::: explain
List comprehension lồng nhau đọc từ ngoài vào trong. `zip(*matrix)` "giải nén" các hàng làm đối số cho zip.

===== b19
@title: Phân loại BMI
@level: easy
@topic: basics
@fn: bmi_report
::: statement
Viết hàm `bmi_report(weight, height)` (kg, mét) trả về tuple `(bmi, loai)` với bmi = weight / height² làm tròn 1 chữ số và:
- bmi < 18.5 → `"Gầy"`; 18.5 ≤ bmi < 23 → `"Bình thường"`; 23 ≤ bmi < 25 → `"Thừa cân"`; ≥ 25 → `"Béo phì"`

(Xếp loại dựa trên bmi **đã làm tròn**.)

`bmi_report(60, 1.7)` → `(20.8, 'Bình thường')`
::: starter
def bmi_report(weight, height):
    pass


print(bmi_report(60, 1.7))
::: solution
def bmi_report(weight, height):
    bmi = round(weight / height ** 2, 1)
    if bmi < 18.5:
        kind = "Gầy"
    elif bmi < 23:
        kind = "Bình thường"
    elif bmi < 25:
        kind = "Thừa cân"
    else:
        kind = "Béo phì"
    return bmi, kind
::: tests
60, 1.7 ==> (20.8, 'Bình thường')
45, 1.65 ==> (16.5, 'Gầy')
::: hidden
70, 1.7 ==> (24.2, 'Thừa cân')
90, 1.75 ==> (29.4, 'Béo phì')
::: hints
- Tính `round(weight / height ** 2, 1)` trước rồi dùng `if/elif/else`.
::: explain
Chú ý độ ưu tiên toán tử: `height ** 2` được tính trước phép chia.

===== b20
@title: Đếm nguyên âm
@level: easy
@topic: string
@fn: count_vowels
::: statement
Viết hàm `count_vowels(s)` đếm số nguyên âm tiếng Anh (`a, e, i, o, u`, không phân biệt hoa thường) trong chuỗi.

`count_vowels("Foreign Trade University")` → `9`
::: starter
def count_vowels(s):
    pass


print(count_vowels("Foreign Trade University"))  # 9
::: solution
def count_vowels(s):
    return sum(1 for c in s.lower() if c in "aeiou")
::: tests
"Foreign Trade University" ==> 9
"xyz" ==> 0
::: hidden
"" ==> 0
"AEIOUaeiou" ==> 10
::: hints
- `c in "aeiou"` kiểm tra ký tự có nằm trong chuỗi nguyên âm.
::: explain
Toán tử `in` dùng được với chuỗi, list, set, dict (kiểm tra key).
