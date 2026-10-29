Đề giữa kỳ TIN314 – 34 câu (dạng CodeRunner: viết hàm, hệ thống tự gọi hàm với nhiều bộ test ẩn).

===== gk01
@title: Số nghiệm phương trình bậc hai
@level: easy
@topic: basics
@source: Giữa kì – Câu 1
@fn: check_quadratic_equation
::: statement
Kiểm tra số nghiệm của phương trình **a·x² + b·x + c = 0** với a, b, c là số thực.

Viết hàm `check_quadratic_equation(a, b, c)`. Hàm phải xét **đầy đủ mọi trường hợp**, kể cả khi phương trình không còn là bậc hai (a = 0).

Kết quả trả về:
- `"No solution"` nếu phương trình vô nghiệm
- `"Infinitely many solution"` nếu có vô số nghiệm
- Nếu số nghiệm hữu hạn: trả về **số nguyên dương** là số nghiệm

| Input | Output |
|---|---|
| a = 1, b = -2, c = 1 | `1` |
| a = 1, b = 1, c = 1 | `"No solution"` |
| a = 0, b = 0, c = 0 | `"Infinitely many solution"` |
::: starter
def check_quadratic_equation(a, b, c):
    # Viết code của bạn ở đây
    pass


print(check_quadratic_equation(1, -2, 1))  # 1
::: solution
def check_quadratic_equation(a, b, c):
    if a == 0:
        if b == 0:
            return "Infinitely many solution" if c == 0 else "No solution"
        return 1  # bậc nhất: x = -c/b
    delta = b * b - 4 * a * c
    if delta < 0:
        return "No solution"
    if delta == 0:
        return 1
    return 2
::: tests
1, -2, 1 ==> 1
1, 1, 1 ==> "No solution"
0, 0, 0 ==> "Infinitely many solution"
::: hidden
1, -3, 2 ==> 2
0, 2, 5 ==> 1
0, 0, 7 ==> "No solution"
2.5, 1, -0.5 ==> 2
-1, 0, 0 ==> 1
0.5, 0, 3 ==> "No solution"
::: hints
- Tách 2 nhánh lớn: `a == 0` và `a != 0`.
- Khi a = 0: phương trình thành b·x + c = 0. Nếu b = 0 nữa thì phụ thuộc c.
- Khi a ≠ 0: tính delta = b² − 4ac rồi so sánh với 0.
::: explain
Lỗi hay gặp nhất là **quên trường hợp a = 0** (chia cho 0 khi tính nghiệm) và trả về chuỗi sai chính tả. Chú ý đề yêu cầu `"Infinitely many solution"` (không có chữ *s*) – CodeRunner so sánh từng ký tự.

===== gk02
@title: Số nguyên tố lớn nhất
@level: easy
@topic: algo
@source: Giữa kì – Câu 2
@fn: largest_prime
::: statement
Cho danh sách `nums` gồm các số nguyên dương **đôi một phân biệt**. Số nguyên tố là số lớn hơn 1 và chỉ chia hết cho 1 và chính nó.

Viết hàm `largest_prime(nums)` trả về **số nguyên tố lớn nhất** trong danh sách. Nếu không có số nguyên tố nào, trả về `-1`.

Ví dụ: `largest_prime([2, 3, 5, 10])` → `5`, `largest_prime([4, 6, 8])` → `-1`
::: starter
def largest_prime(nums):
    pass


print(largest_prime([2, 3, 5, 10]))  # 5
::: solution
def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True


def largest_prime(nums):
    primes = [x for x in nums if is_prime(x)]
    return max(primes) if primes else -1
::: tests
[2, 3, 5, 10] ==> 5
[4, 6, 8] ==> -1
::: hidden
[1] ==> -1
[97, 89, 100] ==> 97
[2] ==> 2
[] ==> -1
[1, 4, 9, 25, 49, 121] ==> -1
[7919, 7920, 15, 13] ==> 7919
::: hints
- Viết hàm phụ `is_prime(n)`: n < 2 thì không phải; thử chia từ 2 đến √n.
- Lọc ra các số nguyên tố rồi dùng `max()`. Cẩn thận `max([])` sẽ báo lỗi.
::: explain
Chỉ cần thử ước đến √n (`i * i <= n`), nhanh hơn rất nhiều so với thử đến n. Nhớ: **1 không phải số nguyên tố**, 2 là số nguyên tố chẵn duy nhất.

===== gk03
@title: So sánh hai danh sách
@level: easy
@topic: collections
@source: Giữa kì – Câu 3
@fn: compare_lists
::: statement
Viết hàm `compare_lists(list1, list2)` trả về `True` nếu hai danh sách "giống nhau", ngược lại `False`.

Hai danh sách giống nhau nếu chứa **các phần tử giống hệt nhau** và **số lần xuất hiện** của mỗi phần tử là như nhau, **không phụ thuộc thứ tự**.

- `[1, 2, 2, 3]`, `[3, 2, 1, 2]` → `True`
- `[1, 2, 3]`, `[1, 2, 2, 3]` → `False`
- `[4, 5, 6]`, `[6, 5, 4]` → `True`
::: starter
def compare_lists(list1, list2):
    pass


print(compare_lists([1, 2, 2, 3], [3, 2, 1, 2]))  # True
::: solution
def compare_lists(list1, list2):
    return sorted(list1) == sorted(list2)
::: tests
[1, 2, 2, 3], [3, 2, 1, 2] ==> True
[1, 2, 3], [1, 2, 2, 3] ==> False
[4, 5, 6], [6, 5, 4] ==> True
::: hidden
[], [] ==> True
[1, 1, 2], [1, 2, 2] ==> False
[-1, 0, -1], [0, -1, -1] ==> True
[5], [] ==> False
::: hints
- Hai list có cùng phần tử + cùng số lần xuất hiện ⇔ sau khi sắp xếp chúng bằng nhau.
- Cách khác: `collections.Counter(list1) == Counter(list2)`.
::: explain
**Đừng dùng `set()`** – set làm mất thông tin số lần xuất hiện, nên `[1, 1, 2]` và `[1, 2, 2]` sẽ bị coi là giống nhau.

===== gk04
@title: Đếm số chia hết cho 2 nhưng không chia hết cho 3
@level: easy
@topic: basics
@source: Giữa kì – Câu 4
@fn: filter_list
::: statement
Viết hàm `filter_list(lst)` nhận một danh sách số nguyên, **đếm** xem có bao nhiêu số **chia hết cho 2 nhưng không chia hết cho 3**. Nếu không có số nào, trả về `0`.

Ví dụ: `filter_list([2, 3, 4, 6, 8, 9, 10])` → `4` (các số 2, 4, 8, 10)
::: starter
def filter_list(lst):
    pass


print(filter_list([2, 3, 4, 6, 8, 9, 10]))  # 4
::: solution
def filter_list(lst):
    return sum(1 for x in lst if x % 2 == 0 and x % 3 != 0)
::: tests
[2, 3, 4, 6, 8, 9, 10] ==> 4
[3, 6, 9] ==> 0
::: hidden
[] ==> 0
[-2, -4, -6, 0] ==> 2
[12, 14, 16, 18, 20] ==> 3
::: hints
- Điều kiện: `x % 2 == 0 and x % 3 != 0`.
- Dùng biến đếm trong vòng `for`, hoặc `sum(1 for x in lst if ...)`.
::: explain
Số 0 chia hết cho cả 2 và 3 nên **không** được đếm. Với số âm, toán tử `%` của Python vẫn cho kết quả đúng (`-4 % 2 == 0`).

===== gk05
@title: Bình phương các số lẻ
@level: easy
@topic: collections
@source: Giữa kì – Câu 5
@fn: process_list
::: statement
Viết hàm `process_list(lst)` nhận danh sách số nguyên:
1. Lọc và giữ lại các **số lẻ**.
2. Tạo danh sách mới gồm **bình phương** của các số lẻ đó (giữ nguyên thứ tự).
3. Trả về danh sách mới (rỗng nếu không có số lẻ).

```
print(process_list([1, 2, 3, 4, 5]))   # [1, 9, 25]
```
::: starter
def process_list(lst):
    pass


print(process_list([1, 2, 3, 4, 5]))  # [1, 9, 25]
::: solution
def process_list(lst):
    return [x ** 2 for x in lst if x % 2 != 0]
::: tests
[1, 2, 3, 4, 5] ==> [1, 9, 25]
[2, 4, 6] ==> []
::: hidden
[] ==> []
[-3, -2, 7] ==> [9, 49]
[11] ==> [121]
::: hints
- List comprehension: `[x ** 2 for x in lst if ...]`.
::: explain
Dùng list comprehension là cách ngắn gọn nhất (và trong đề tuyển tập còn được **cộng điểm bonus** khi dùng đúng lambda/list comprehension).

===== gk06
@title: Cắt dây bằng nhau (ƯCLN)
@level: easy
@topic: algo
@source: Giữa kì – Câu 6
@fn: count_segments
::: statement
Trường có hai đoạn dây dài **N** mét và **M** mét (số nguyên dương). Cần cắt thành các đoạn nhỏ sao cho:
- Tất cả đoạn nhỏ **cùng độ dài**, **không thừa** dây,
- Độ dài mỗi đoạn **lớn nhất có thể**.

Viết hàm `count_segments(N, M)` trả về **tổng số đoạn dây nhỏ** cắt được.

Ví dụ: N = 12, M = 18 → đoạn dài nhất là 6 → 2 + 3 = `5` đoạn.
::: starter
def count_segments(N, M):
    pass


print(count_segments(12, 18))  # 5
::: solution
import math


def count_segments(N, M):
    g = math.gcd(N, M)
    return N // g + M // g
::: tests
12, 18 ==> 5
7, 7 ==> 2
::: hidden
1, 100 ==> 101
17, 13 ==> 30
1000000, 999999 ==> 1999999
::: hints
- Độ dài lớn nhất chia hết cả N và M chính là **ƯCLN** (gcd).
- `math.gcd(N, M)` có sẵn; hoặc tự viết thuật toán Euclid.
::: explain
Dạng "chia đều không thừa, lớn nhất" ⇒ nghĩ ngay đến **ƯCLN**. Dùng `//` để kết quả là số nguyên (dùng `/` sẽ ra float `5.0`, vẫn có thể bị chấm sai).

===== gk07
@title: Đặt dấu để tổng lớn nhất
@level: easy
@topic: algo
@source: Giữa kì – Câu 7
@fn: max_signed_sum
::: statement
Cho một dãy số nguyên. Được đặt dấu `+` hoặc `-` trước mỗi số (lưu ý `-(-3) = +3`).

Viết hàm `max_signed_sum(arr)` trả về **tổng lớn nhất** có thể đạt được.

Ví dụ: `arr = [1, -2, 3]` → `1 + 2 + 3 = 6`.
::: starter
def max_signed_sum(arr):
    pass


print(max_signed_sum([1, -2, 3]))  # 6
::: solution
def max_signed_sum(arr):
    return sum(abs(x) for x in arr)
::: tests
[1, -2, 3] ==> 6
[-5, -5] ==> 10
::: hidden
[] ==> 0
[0] ==> 0
[100, -1, 0, -99] ==> 200
::: hints
- Với mỗi số, chọn dấu sao cho nó đóng góp giá trị dương vào tổng.
::: explain
Đặt dấu tối ưu cho từng số độc lập ⇒ mỗi số đóng góp `|x|`. Đáp án = tổng giá trị tuyệt đối.

===== gk08
@title: Cắt bìa thành hình vuông lớn nhất
@level: easy
@topic: algo
@source: Giữa kì – Câu 8
@fn: max_square_area
::: statement
Tấm bìa hình chữ nhật **N × M** (nguyên dương) cần cắt thành các **hình vuông giống hệt nhau**, cạnh nguyên dương, không bỏ phần nào, và **diện tích mỗi hình vuông lớn nhất**.

Viết hàm `max_square_area(N, M)` trả về **diện tích** của hình vuông đó.

Ví dụ: `max_square_area(6, 4)` → cạnh 2 → `4`.
::: starter
def max_square_area(N, M):
    pass


print(max_square_area(6, 4))  # 4
::: solution
import math


def max_square_area(N, M):
    return math.gcd(N, M) ** 2
::: tests
6, 4 ==> 4
5, 5 ==> 25
::: hidden
7, 3 ==> 1
12, 18 ==> 36
100, 75 ==> 625
::: hints
- Cạnh hình vuông phải chia hết cả N và M, lớn nhất ⇒ ƯCLN.
- Đề hỏi **diện tích** chứ không phải cạnh!
::: explain
Giống câu 6 nhưng trả về **bình phương** của ƯCLN. Đọc kỹ đề trả về gì là kỹ năng số 1 khi thi CodeRunner.

===== gk09
@title: Phần tử xuất hiện nhiều nhất
@level: easy
@topic: collections
@source: Giữa kì – Câu 9
@fn: count
::: statement
Viết hàm `count(lst)` nhận danh sách số nguyên, trả về **phần tử xuất hiện nhiều nhất**. Nếu nhiều phần tử cùng số lần xuất hiện cao nhất, trả về phần tử có **giá trị nhỏ nhất** trong số đó.

Ví dụ: `count([3, 1, 3, 1, 2])` → `1` (1 và 3 cùng xuất hiện 2 lần, chọn 1).
::: starter
def count(lst):
    pass


print(count([3, 1, 3, 1, 2]))  # 1
::: solution
def count(lst):
    freq = {}
    for x in lst:
        freq[x] = freq.get(x, 0) + 1
    best = max(freq.values())
    return min(x for x, c in freq.items() if c == best)
::: tests
[3, 1, 3, 1, 2] ==> 1
[5, 5, 5, 2] ==> 5
::: hidden
[7] ==> 7
[-1, -2, -1, -2] ==> -2
[4, 4, 9, 9, 9, 4, 1] ==> 4
::: hints
- Đếm tần suất bằng dict: `freq[x] = freq.get(x, 0) + 1`.
- Tìm tần suất lớn nhất, rồi lấy `min` trong các phần tử đạt tần suất đó.
- Mẹo: `max(freq, key=lambda x: (freq[x], -x))`.
::: explain
Lưu ý hàm tên `count` sẽ "che" phương thức nào? Không – `list.count` là phương thức của list nên không bị ảnh hưởng. Nhưng **đừng đặt tên biến là `list`, `dict`, `max`, `sum`** vì sẽ che hàm có sẵn.

===== gk10
@title: Lợi nhuận tối đa mua bán đá quý
@level: medium
@topic: algo
@source: Giữa kì – Câu 10
@fn: max_profit
::: statement
`prices[i]` là giá đá quý ngày thứ i. Chỉ được **một lần giao dịch**: mua một ngày và bán vào một ngày **sau** ngày mua.

Viết hàm `max_profit(prices)` trả về lợi nhuận lớn nhất (giá bán − giá mua). Nếu không thể có lãi, trả về `0`.

Ví dụ: `[7, 1, 5, 3, 6, 4]` → mua 1, bán 6 → `5`.
::: starter
def max_profit(prices):
    pass


print(max_profit([7, 1, 5, 3, 6, 4]))  # 5
::: solution
def max_profit(prices):
    best = 0
    lowest = float("inf")
    for p in prices:
        lowest = min(lowest, p)
        best = max(best, p - lowest)
    return best
::: tests
[7, 1, 5, 3, 6, 4] ==> 5
[7, 6, 4, 3, 1] ==> 0
::: hidden
[] ==> 0
[5] ==> 0
[2, 4, 1, 10] ==> 9
[3, 3, 3] ==> 0
::: hints
- Duyệt từ trái sang phải, luôn nhớ **giá thấp nhất từ trước tới giờ**.
- Tại mỗi ngày, lãi nếu bán hôm nay = giá hôm nay − giá thấp nhất trước đó.
::: explain
Cách 2 vòng lặp lồng nhau (O(n²)) vẫn đúng nhưng chậm với dữ liệu lớn. Cách một lượt (O(n)) như lời giải là chuẩn. Chú ý danh sách rỗng hoặc 1 phần tử.

===== gk11
@title: Tấm gương thì thầm (kiểm tra kiểu)
@level: easy
@topic: basics
@source: Giữa kì – Câu 11
@fn: mirror_message
::: statement
Viết hàm `mirror_message(x)`:
- Nếu `x` là **chuỗi** → trả về chuỗi đảo ngược (`"hello"` → `"olleh"`)
- Nếu `x` là **int hoặc float** → trả về **số đối** (`5` → `-5`, `-3.2` → `3.2`)
- Kiểu khác → trả về chuỗi `"Unsupported"`
::: starter
def mirror_message(x):
    pass


print(mirror_message("hello"))  # olleh
::: solution
def mirror_message(x):
    if isinstance(x, str):
        return x[::-1]
    if isinstance(x, (int, float)):
        return -x
    return "Unsupported"
::: tests
"hello" ==> "olleh"
5 ==> -5
-3.2 ==> 3.2
[1, 2] ==> "Unsupported"
::: hidden
"" ==> ""
0 ==> 0
None ==> "Unsupported"
{"a": 1} ==> "Unsupported"
"Python 3" ==> "3 nohtyP"
::: hints
- Kiểm tra kiểu bằng `isinstance(x, str)`, `isinstance(x, (int, float))`.
- Đảo chuỗi: `x[::-1]`.
::: explain
`isinstance(x, (int, float))` nhận một **tuple các kiểu**. Dùng `type(x) == int` cũng được nhưng `isinstance` là cách chuẩn.

===== gk12
@title: Số nguyên tố gần nhất ≥ N
@level: easy
@topic: algo
@source: Giữa kì – Câu 12
@fn: nearest_prime
::: statement
Cho số nguyên dương N. Viết hàm `nearest_prime(N)` tìm **số nguyên tố nhỏ nhất p ≥ N**.

- `nearest_prime(10)` → `11`
- `nearest_prime(17)` → `17`
- `nearest_prime(1)` → `2`
::: starter
def nearest_prime(N):
    pass


print(nearest_prime(10))  # 11
::: solution
def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True


def nearest_prime(N):
    p = N
    while not is_prime(p):
        p += 1
    return p
::: tests
10 ==> 11
17 ==> 17
1 ==> 2
::: hidden
2 ==> 2
24 ==> 29
90 ==> 97
1000000 ==> 1000003
::: hints
- Bắt đầu từ N, tăng dần cho đến khi gặp số nguyên tố.
::: explain
Vòng `while not is_prime(p): p += 1` là mẫu "tìm số đầu tiên thoả điều kiện" rất hay dùng.

===== gk13
@title: Trò chơi gộp số a + b + 1
@level: medium
@topic: algo
@source: Giữa kì – Câu 13
@fn: final_number
::: statement
Nam có list số nguyên. Mỗi bước chọn **ngẫu nhiên** hai số a, b, xoá chúng và thêm vào cuối list số **a + b + 1**. Lặp lại cho đến khi chỉ còn 1 số.

Viết hàm `final_number(lst)` trả về số cuối cùng.

Ví dụ: `[1, 2, 3]` → (1+2+1)=4 → [3, 4] → 3+4+1 = `8`.
::: starter
def final_number(lst):
    pass


print(final_number([1, 2, 3]))  # 8
::: solution
def final_number(lst):
    return sum(lst) + len(lst) - 1
::: tests
[1, 2, 3] ==> 8
[5] ==> 5
::: hidden
[0, 0] ==> 1
[-1, -2, 4, 10] ==> 14
[1] * 100 ==> 199
::: hints
- "Chọn ngẫu nhiên" mà đề vẫn hỏi một đáp án ⇒ kết quả **không phụ thuộc** cách chọn. Tìm đại lượng bất biến!
- Mỗi bước tổng tăng đúng 1, và số phần tử giảm 1.
::: explain
Sau n − 1 bước gộp, tổng ban đầu tăng thêm n − 1. Đáp án: `sum(lst) + len(lst) - 1`. Mô phỏng trực tiếp cũng đúng nhưng bài kiểu này là để kiểm tra tư duy **bất biến**.

===== gk14
@title: Trò chơi gộp số a + b + ab
@level: medium
@topic: algo
@source: Giữa kì – Câu 14
@fn: final_number
::: statement
An có danh sách N số nguyên dương. Mỗi lượt chọn ngẫu nhiên hai số a, b, xoá chúng và thêm vào cuối số **a + b + ab**. Lặp đến khi còn 1 số.

Viết hàm `final_number(nums)` trả về số cuối cùng.

Ví dụ: `[1, 2]` → 1 + 2 + 2 = `5`; `[1, 2, 3]` → `23`.
::: starter
def final_number(nums):
    pass


print(final_number([1, 2, 3]))  # 23
::: solution
def final_number(nums):
    prod = 1
    for x in nums:
        prod *= x + 1
    return prod - 1
::: tests
[1, 2] ==> 5
[1, 2, 3] ==> 23
::: hidden
[7] ==> 7
[1, 1, 1, 1] ==> 15
[10, 20, 30] ==> 7160
[2] * 30 ==> 3 ** 30 - 1
::: hints
- Thử biến đổi: a + b + ab = (a + 1)(b + 1) − 1.
- Vậy đại lượng ∏(x + 1) không đổi qua mỗi bước.
::: explain
Vì `a + b + ab + 1 = (a+1)(b+1)`, tích các `(x+1)` là bất biến ⇒ đáp án `∏(x+1) − 1`. Python hỗ trợ số nguyên lớn tuỳ ý nên không lo tràn số.

===== gk15
@title: Số hoàn hảo theo tổng chữ số
@level: medium
@topic: algo
@source: Giữa kì – Câu 15
@fn: find_perfect_numbers
::: statement
Một số nguyên là **"hoàn hảo"** nếu nó **chia hết cho tổng các chữ số** của chính nó. Số 0 **không** được coi là hoàn hảo.

- 18: 1 + 8 = 9, 18 % 9 == 0 → hoàn hảo
- 23: 2 + 3 = 5 → không
- −12: 1 + 2 = 3, −12 % 3 == 0 → hoàn hảo

Viết hàm `find_perfect_numbers(lst)` trả về list các số hoàn hảo trong `lst` (giữ thứ tự).
::: starter
def find_perfect_numbers(lst):
    pass


print(find_perfect_numbers([18, 23, -12, 0]))  # [18, -12]
::: solution
def digit_sum(n):
    return sum(int(d) for d in str(abs(n)))


def find_perfect_numbers(lst):
    return [x for x in lst if x != 0 and x % digit_sum(x) == 0]
::: tests
[18, 23, -12, 0] ==> [18, -12]
[18, 21, 12, 19, 20] ==> [18, 21, 12, 20]
::: hidden
[] ==> []
[0, 0] ==> []
[1, -1, 11, 13] ==> [1, -1]
[-19, 100, 101] ==> [100]
::: hints
- Tổng chữ số: `sum(int(d) for d in str(abs(n)))` – nhớ `abs` để bỏ dấu trừ.
- Loại số 0 trước khi chia (tổng chữ số của 0 là 0 → lỗi chia cho 0).
::: explain
Bẫy của đề: **số âm** (`str(-12)` có ký tự `'-'`, `int('-')` lỗi) và **số 0** (ZeroDivisionError).

===== gk16
@title: Đếm bộ ba có tổng bằng 0
@level: medium
@topic: algo
@source: Giữa kì – Câu 16
@fn: count_three_sum
::: statement
Viết hàm `count_three_sum(lst)` nhận list số nguyên **đôi một phân biệt**, trả về **số cách chọn 3 phần tử** có tổng bằng 0.

Ví dụ: `[-1, 0, 1, 2, -3]` → các bộ (−1, 0, 1), (1, 2, −3) → `2`.
::: starter
def count_three_sum(lst):
    pass


print(count_three_sum([-1, 0, 1, 2, -3]))  # 2
::: solution
from itertools import combinations


def count_three_sum(lst):
    return sum(1 for a, b, c in combinations(lst, 3) if a + b + c == 0)
::: tests
[-1, 0, 1, 2, -3] ==> 2
[1, 2, 3] ==> 0
::: hidden
[] ==> 0
[0, 1] ==> 0
[-5, -1, 0, 1, 2, 3, 4, 5, -4]
::: hints
- 3 vòng `for` lồng nhau với `i < j < k`.
- Hoặc `itertools.combinations(lst, 3)` sinh mọi bộ ba.
::: explain
`combinations(lst, 3)` tự đảm bảo i < j < k nên không đếm trùng. Với n nhỏ (thi giữa kỳ) cách O(n³) là đủ.

===== gk17
@title: Tổ hợp chập k của n
@level: easy
@topic: algo
@source: Giữa kì – Câu 17
@fn: binomial_coefficient
::: statement
Viết hàm `binomial_coefficient(n, k)` (0 ≤ k ≤ n) trả về **nCk = n! / (k!·(n−k)!)**.

- `binomial_coefficient(5, 2)` → `10`
- `binomial_coefficient(6, 0)` → `1`
- `binomial_coefficient(10, 3)` → `120`
::: starter
def binomial_coefficient(n, k):
    pass


print(binomial_coefficient(5, 2))  # 10
::: solution
def binomial_coefficient(n, k):
    result = 1
    for i in range(1, k + 1):
        result = result * (n - k + i) // i
    return result
::: tests
5, 2 ==> 10
6, 0 ==> 1
6, 6 ==> 1
10, 3 ==> 120
::: hidden
0, 0 ==> 1
52, 5 ==> 2598960
100, 50 ==> 100891344545564193334812497256
::: hints
- `math.comb(n, k)` hoặc `math.factorial`.
- Nếu tự tính, dùng `//` (chia nguyên) để giữ kết quả là int.
::: explain
Dùng `/` sẽ ra float và **mất chính xác** với số lớn (100C50). Luôn dùng `//` hoặc `math.comb`.

===== gk18
@title: Đếm bộ ba có tổng bằng x
@level: medium
@topic: algo
@source: Giữa kì – Câu 18
@fn: count_sum
::: statement
Cho list `a` gồm N số nguyên dương phân biệt và số nguyên dương `x`. Viết hàm `count_sum(a, x)` đếm số bộ chỉ số **(i, j, k)** với **i < j < k** và `a[i] + a[j] + a[k] = x`.

Ví dụ: `count_sum([1, 2, 3, 4, 5], 9)` → (1,3,5), (2,3,4) → `2`.
::: starter
def count_sum(a, x):
    pass


print(count_sum([1, 2, 3, 4, 5], 9))  # 2
::: solution
def count_sum(a, x):
    n = len(a)
    total = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if a[i] + a[j] + a[k] == x:
                    total += 1
    return total
::: tests
[1, 2, 3, 4, 5], 9 ==> 2
[1, 2], 3 ==> 0
::: hidden
[10, 20, 30, 40], 60 ==> 1
[1, 2, 3, 4, 5, 6, 7, 8], 15 ==> 6
[], 1 ==> 0
::: hints
- 3 vòng lặp với `j` bắt đầu từ `i + 1`, `k` từ `j + 1`.
::: explain
Mẫu 3 vòng lồng nhau `for i / for j in range(i+1, n) / for k in range(j+1, n)` duyệt mọi bộ ba không trùng lặp.

===== gk19
@title: Chọn việc làm thêm (0/1 – không chia nhỏ)
@level: hard
@topic: algo
@source: Giữa kì – Câu 19
@fn: max_income
::: statement
Danh sách công việc là list các dict: `{'name': 'Gia sư', 'hours': 10, 'pay': 150}`. Mỗi công việc phải làm **trọn gói** (không chia nhỏ giờ). Sinh viên có tối đa **40 giờ/tuần**.

Viết hàm `max_income(jobs)` trả về **tổng thu nhập lớn nhất** với tổng giờ ≤ 40.

```
jobs = [{'name': 'Gia sư', 'hours': 10, 'pay': 150},
        {'name': 'Bán hàng', 'hours': 15, 'pay': 180},
        {'name': 'Giao hàng', 'hours': 8, 'pay': 120},
        {'name': 'Phục vụ', 'hours': 20, 'pay': 200}]
max_income(jobs)  # 470  (Gia sư + Giao hàng + Phục vụ = 38 giờ)
```

> ⚠️ Đề gốc ghi ví dụ là 450 – đó là kết quả của cách **tham lam** theo lương/giờ, *không* tối ưu. Đáp án tối ưu đúng là 470.
::: starter
def max_income(jobs):
    pass


jobs = [{'name': 'Gia sư', 'hours': 10, 'pay': 150},
        {'name': 'Bán hàng', 'hours': 15, 'pay': 180},
        {'name': 'Giao hàng', 'hours': 8, 'pay': 120},
        {'name': 'Phục vụ', 'hours': 20, 'pay': 200}]
print(max_income(jobs))  # 470
::: solution
def max_income(jobs):
    # dp[h] = thu nhập lớn nhất khi dùng tối đa h giờ (bài toán cái túi 0/1)
    dp = [0] * 41
    for job in jobs:
        h, pay = job['hours'], job['pay']
        for cap in range(40, h - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - h] + pay)
    return dp[40]
::: tests
[{'name': 'Gia sư', 'hours': 10, 'pay': 150}, {'name': 'Bán hàng', 'hours': 15, 'pay': 180}, {'name': 'Giao hàng', 'hours': 8, 'pay': 120}, {'name': 'Phục vụ', 'hours': 20, 'pay': 200}] ==> 470
[{'name': 'A', 'hours': 41, 'pay': 1000}] ==> 0
::: hidden
[] ==> 0
[{'name': 'A', 'hours': 40, 'pay': 500}, {'name': 'B', 'hours': 20, 'pay': 260}, {'name': 'C', 'hours': 20, 'pay': 260}] ==> 520
[{'name': 'A', 'hours': 5, 'pay': 10.5}, {'name': 'B', 'hours': 30, 'pay': 99.5}, {'name': 'C', 'hours': 10, 'pay': 30}] ==> 129.5
::: hints
- Số công việc ít ⇒ có thể **thử mọi tập con** bằng `itertools.combinations` với mọi kích thước r.
- Cách chuẩn: quy hoạch động "cái túi 0/1": `dp[h]` = thu nhập tốt nhất với h giờ.
::: explain
**Tham lam theo lương/giờ là sai** với bài 0/1 (ví dụ trên chỉ được 450). Hai cách đúng: thử mọi tập con (2ⁿ, ổn khi n ≤ 20) hoặc DP cái túi. Trong DP, duyệt `cap` **giảm dần** để mỗi việc chỉ được chọn một lần.

===== gk20
@title: Chọn việc làm thêm (được chia nhỏ giờ)
@level: medium
@topic: algo
@source: Giữa kì – Câu 20
@fn: max_income
::: statement
Giống câu trước nhưng **được làm một phần** công việc: làm x giờ (0 < x ≤ hours) thì nhận tiền **tỉ lệ thuận** với số giờ. Tối đa 40 giờ.

Viết hàm `max_income(jobs)` trả về tổng thu nhập lớn nhất, **làm tròn 1 chữ số thập phân**.

```
jobs = [{'name': 'Gia sư', 'hours': 10, 'pay': 150},
        {'name': 'Bán hàng', 'hours': 20, 'pay': 180}]
max_income(jobs)  # 330
```
::: starter
def max_income(jobs):
    pass


print(max_income([{'name': 'Gia sư', 'hours': 10, 'pay': 150},
                  {'name': 'Bán hàng', 'hours': 20, 'pay': 180}]))  # 330
::: solution
def max_income(jobs):
    ranked = sorted(jobs, key=lambda j: j['pay'] / j['hours'], reverse=True)
    remaining = 40
    total = 0
    for j in ranked:
        if remaining <= 0:
            break
        take = min(remaining, j['hours'])
        total += j['pay'] / j['hours'] * take
        remaining -= take
    return round(total, 1)
::: tests
[{'name': 'Gia sư', 'hours': 10, 'pay': 150}, {'name': 'Bán hàng', 'hours': 20, 'pay': 180}] ==> 330
[{'name': 'A', 'hours': 50, 'pay': 100}] ==> 80
::: hidden
[] ==> 0
[{'name': 'Gia sư', 'hours': 10, 'pay': 150}, {'name': 'Bán hàng', 'hours': 15, 'pay': 180}, {'name': 'Giao hàng', 'hours': 8, 'pay': 120}, {'name': 'Phục vụ', 'hours': 20, 'pay': 200}] ==> 520
[{'name': 'A', 'hours': 3, 'pay': 10}, {'name': 'B', 'hours': 60, 'pay': 100}] ==> 71.7
::: hints
- Đây là **cái túi phân số**: tham lam theo lương/giờ là tối ưu.
- Sắp xếp giảm dần theo `pay / hours`, lấy lần lượt cho đến khi hết 40 giờ.
::: explain
Khác câu 19: vì được chia nhỏ, chiến lược tham lam (ưu tiên việc có lương/giờ cao nhất) cho kết quả tối ưu. Nhớ `round(total, 1)`.

===== gk21
@title: Chu vi hình chữ nhật
@level: easy
@topic: basics
@source: Giữa kì – Câu 21
@fn: cal_perimeter
::: statement
Viết hàm `cal_perimeter(a, b)` tính **chu vi** hình chữ nhật có chiều dài `a`, chiều rộng `b` (số thực).

Ví dụ: `cal_perimeter(3, 4)` → `14`
::: starter
def cal_perimeter(a, b):
    pass


print(cal_perimeter(3, 4))  # 14
::: solution
def cal_perimeter(a, b):
    return 2 * (a + b)
::: tests
3, 4 ==> 14
2.5, 1.5 ==> 8.0
::: hidden
0, 0 ==> 0
0.1, 0.2 ==> 0.6
::: hints
- Chu vi = 2 × (dài + rộng). Nhớ **return** chứ không print.
::: explain
Câu "cho điểm" – lỗi duy nhất có thể mắc là `print` thay vì `return`.

===== gk22
@title: Chọn 3 đồ vật giá trị nhất
@level: easy
@topic: collections
@source: Giữa kì – Câu 22
@fn: select_items
::: statement
`items` là dict: key = tên đồ vật, value = giá trị (nguyên, đôi một phân biệt). Nam muốn mang **đúng 3 đồ vật** có tổng giá trị lớn nhất.

Viết hàm `select_items(items)` trả về list **3 tên** có giá trị cao nhất, **sắp xếp giảm dần** theo giá trị.

```
items = {'Sword': 50, 'Shield': 40, 'Potion': 10, 'Ring of Power': 70, 'Magic Cloak': 60}
select_items(items)  # ['Ring of Power', 'Magic Cloak', 'Sword']
```
::: starter
def select_items(items):
    pass


items = {'Sword': 50, 'Shield': 40, 'Potion': 10, 'Ring of Power': 70, 'Magic Cloak': 60}
print(select_items(items))
::: solution
def select_items(items):
    return sorted(items, key=items.get, reverse=True)[:3]
::: tests
{'Sword': 50, 'Shield': 40, 'Potion': 10, 'Ring of Power': 70, 'Magic Cloak': 60} ==> ['Ring of Power', 'Magic Cloak', 'Sword']
::: hidden
{'a': 1, 'b': 2, 'c': 3} ==> ['c', 'b', 'a']
{'x': -5, 'y': 0, 'z': -1, 't': 100} ==> ['t', 'y', 'z']
::: hints
- `sorted(items.items(), key=lambda kv: kv[1], reverse=True)` sắp theo value.
- Lấy 3 phần tử đầu bằng slicing `[:3]`, rồi chỉ giữ key.
::: explain
`sorted(items, key=items.get, reverse=True)` duyệt các key và sắp theo value – một dòng là xong.

===== gk23
@title: Đếm số giá trị phân biệt
@level: easy
@topic: collections
@source: Giữa kì – Câu 23
@fn: count_distinct
::: statement
Viết hàm `count_distinct(a)` đếm số giá trị **đôi một phân biệt** trong list `a`.

- `count_distinct([1, 2, 2, 3, 1])` → `3`
- `count_distinct([5, 5, 5])` → `1`
::: starter
def count_distinct(a):
    pass


print(count_distinct([1, 2, 2, 3, 1]))  # 3
::: solution
def count_distinct(a):
    return len(set(a))
::: tests
[1, 2, 2, 3, 1] ==> 3
[5, 5, 5] ==> 1
[1, 2, 3, 4] ==> 4
::: hidden
[] ==> 0
[7] * 1000 ==> 1
::: hints
- `set` tự loại phần tử trùng.
::: explain
`len(set(a))` – thuộc lòng các tính chất của set: không trùng, không thứ tự, kiểm tra `in` rất nhanh.

===== gk24
@title: Danh sách giá trị phân biệt tăng dần
@level: easy
@topic: collections
@source: Giữa kì – Câu 24
@fn: list_distinct
::: statement
Viết hàm `list_distinct(a)` trả về **list** các giá trị đôi một phân biệt của `a` theo thứ tự **tăng dần**.

- `list_distinct([1, 2, 2, 3, 1])` → `[1, 2, 3]`
- `list_distinct([5, 5, 5])` → `[5]`
::: starter
def list_distinct(a):
    pass


print(list_distinct([1, 2, 2, 3, 1]))  # [1, 2, 3]
::: solution
def list_distinct(a):
    return sorted(set(a))
::: tests
[1, 2, 2, 3, 1] ==> [1, 2, 3]
[5, 5, 5] ==> [5]
[1, 2, 3, 4] ==> [1, 2, 3, 4]
::: hidden
[] ==> []
[10, 2, 33, 2, 10] ==> [2, 10, 33]
::: hints
- `sorted()` nhận set và **trả về list**.
::: explain
`sorted(set(a))` trả về list. Nếu viết `list(set(a))` thì **không đảm bảo thứ tự tăng dần**.

===== gk25
@title: Mã hoá Vigenère
@level: medium
@topic: string
@source: Giữa kì – Câu 25
@fn: vigenere_encrypt
::: statement
Mã Vigenère dùng từ khoá `key` (lặp tuần hoàn cho đủ độ dài) để dịch từng chữ cái của `plaintext`:
- Đổi chữ cái sang số: A = 0, B = 1, …, Z = 25
- **Cᵢ = (Pᵢ + Kᵢ) % 26**, rồi đổi Cᵢ thành chữ **IN HOA**

Viết hàm `vigenere_encrypt(plaintext, key)` (chuỗi chỉ gồm chữ cái, **không phân biệt hoa/thường**), trả về bản mã IN HOA.

Ví dụ: `plaintext = "HELLO"`, `key = "KEY"` → `"RIJVS"`
::: starter
def vigenere_encrypt(plaintext, key):
    pass


print(vigenere_encrypt("HELLO", "KEY"))  # RIJVS
::: solution
def vigenere_encrypt(plaintext, key):
    p, k = plaintext.upper(), key.upper()
    out = []
    for i, ch in enumerate(p):
        shift = ord(k[i % len(k)]) - ord('A')
        out.append(chr((ord(ch) - ord('A') + shift) % 26 + ord('A')))
    return "".join(out)
::: tests
"HELLO", "KEY" ==> "RIJVS"
"helloworld", "key" ==> "RIJVSUYVJN"
::: hidden
"A", "A" ==> "A"
"ZZZ", "b" ==> "AAA"
"attackatdawn", "LEMON" ==> "LXFOPVEFRNHR"
::: hints
- `ord('A') = 65`; vị trí của chữ c là `ord(c) - ord('A')`.
- Ký tự thứ i của key lặp lại: `key[i % len(key)]`.
- Đổi ngược số → chữ: `chr(x + ord('A'))`.
::: explain
Hai hàm cần nhớ: `ord()` (ký tự → mã số) và `chr()` (mã số → ký tự). Đổi cả hai chuỗi về `.upper()` trước để xử lý "không phân biệt hoa thường".

===== gk26
@title: Lịch làm việc trùng nhau
@level: hard
@topic: algo
@source: Giữa kì – Câu 26
@fn: count_working_days
::: statement
Ông An làm **N ngày liên tiếp rồi nghỉ 1 ngày**, lặp lại đều đặn. Ông Bình làm **M ngày rồi nghỉ 1 ngày**. Cả hai bắt đầu đi làm từ **01/01/2024**.

Từ 01/01/2024 đến ngày `A` (tính cả ngày A), có bao nhiêu ngày **cả hai cùng đi làm**?

Viết hàm `count_working_days(N, M, A)` với `A` là `datetime.date`.

Ví dụ: `count_working_days(2, 3, date(2024, 1, 10))` → `5`
::: starter
from datetime import date


def count_working_days(N, M, A):
    pass


print(count_working_days(2, 3, date(2024, 1, 10)))  # 5
::: solution
from datetime import date


def count_working_days(N, M, A):
    total_days = (A - date(2024, 1, 1)).days + 1
    count = 0
    for d in range(total_days):
        if d % (N + 1) < N and d % (M + 1) < M:
            count += 1
    return count
::: tests
2, 3, date(2024, 1, 10) ==> 5
1, 1, date(2024, 1, 1) ==> 1
::: hidden
5, 6, date(2024, 12, 31)
3, 3, date(2024, 1, 4) ==> 3
10, 1, date(2025, 3, 1)
::: hints
- Số ngày đã trôi qua: `(A - date(2024, 1, 1)).days` (phép trừ hai `date` ra `timedelta`).
- Ngày thứ d (tính từ 0) ông An đi làm khi `d % (N + 1) < N`.
::: explain
Đánh số ngày từ 0. Chu kỳ của An dài N + 1 ngày, trong đó N ngày đầu đi làm ⇒ điều kiện `d % (N+1) < N`. Nhớ **tính cả ngày A** (+1).

===== gk27
@title: Mã hoá A1Z26
@level: easy
@topic: string
@source: Giữa kì – Câu 27
@fn: encode_a1z26
::: statement
Hệ mã A1Z26: A = 1, B = 2, …, Z = 26. Mỗi chữ cái được mã hoá thành số, các số nối với nhau bằng dấu `-`.

Viết hàm `encode_a1z26(word)` (không có khoảng trắng, không phân biệt hoa/thường).

Ví dụ: `"HAPPY"` → `"8-1-16-16-25"`
::: starter
def encode_a1z26(word):
    pass


print(encode_a1z26("HAPPY"))  # 8-1-16-16-25
::: solution
def encode_a1z26(word):
    return "-".join(str(ord(c) - ord('A') + 1) for c in word.upper())
::: tests
"HAPPY" ==> "8-1-16-16-25"
"abc" ==> "1-2-3"
::: hidden
"Z" ==> "26"
"PyThOn" ==> "16-25-20-8-15-14"
::: hints
- `ord(c) - ord('A') + 1` cho vị trí 1..26 của chữ in hoa.
- Nối list chuỗi bằng `"-".join(...)` – các phần tử phải là **str**.
::: explain
`"-".join()` chỉ nối được chuỗi, nên phải `str(...)` từng số.

===== gk28
@title: Danh sách kề của đồ thị
@level: easy
@topic: collections
@source: Giữa kì – Câu 28
@fn: find_adjacency_list
::: statement
Đồ thị có hướng biểu diễn bằng dict: mỗi key là một đỉnh, value là dict `{đỉnh kề: trọng số}`.

Viết hàm `find_adjacency_list(graph)` trả về dict: mỗi đỉnh → **list các đỉnh kề** (giữ thứ tự).

```
graph = {'A': {'B': 5, 'C': 10}, 'B': {'C': 3, 'D': 8}, 'C': {'D': 2}, 'D': {}}
# → {'A': ['B', 'C'], 'B': ['C', 'D'], 'C': ['D'], 'D': []}
```
::: starter
def find_adjacency_list(graph):
    pass


graph = {'A': {'B': 5, 'C': 10}, 'B': {'C': 3, 'D': 8}, 'C': {'D': 2}, 'D': {}}
print(find_adjacency_list(graph))
::: solution
def find_adjacency_list(graph):
    return {v: list(nbrs.keys()) for v, nbrs in graph.items()}
::: tests
{'A': {'B': 5, 'C': 10}, 'B': {'C': 3, 'D': 8}, 'C': {'D': 2}, 'D': {}} ==> {'A': ['B', 'C'], 'B': ['C', 'D'], 'C': ['D'], 'D': []}
::: hidden
{} ==> {}
{'X': {}} ==> {'X': []}
{1: {2: 1, 3: 1}, 2: {1: 4}} ==> {1: [2, 3], 2: [1]}
::: hints
- Dict comprehension: `{k: ... for k, v in graph.items()}`.
- `list(v.keys())` hoặc `list(v)` lấy danh sách key.
::: explain
Dict comprehension `{k: list(v) for k, v in d.items()}` – mẫu biến đổi dict rất hay gặp.

===== gk29
@title: Giải mã Atbash
@level: easy
@topic: string
@source: Giữa kì – Câu 29
@fn: atbash_decode
::: statement
Hệ mã Atbash ánh xạ mỗi chữ cái với chữ đối xứng: A ↔ Z, B ↔ Y, …, M ↔ N.

Viết hàm `atbash_decode(code)` (không có khoảng trắng), trả về bản giải mã **IN HOA**.

Ví dụ: `"SVOOL"` → `"HELLO"`
::: starter
def atbash_decode(code):
    pass


print(atbash_decode("SVOOL"))  # HELLO
::: solution
def atbash_decode(code):
    return "".join(chr(ord('A') + ord('Z') - ord(c)) for c in code.upper())
::: tests
"SVOOL" ==> "HELLO"
"zyx" ==> "ABC"
::: hidden
"M" ==> "N"
"KbgslM" ==> "PYTHON"
::: hints
- Chữ đối xứng của c: `chr(ord('A') + ord('Z') - ord(c))`.
- Đổi về in hoa trước khi xử lý.
::: explain
Atbash là phép **đối xứng**, nên mã hoá và giải mã là cùng một hàm.

===== gk30
@title: Mã hoá Atbash
@level: easy
@topic: string
@source: Giữa kì – Câu 30
@fn: atbash_cipher
::: statement
Atbash: A ↔ Z, B ↔ Y, …, M ↔ N. Viết hàm `atbash_cipher(word)` (không có khoảng trắng), trả về kết quả **IN HOA**.

Ví dụ: `"HELLO"` → `"SVOOL"`
::: starter
def atbash_cipher(word):
    pass


print(atbash_cipher("HELLO"))  # SVOOL
::: solution
import string


def atbash_cipher(word):
    table = str.maketrans(string.ascii_uppercase, string.ascii_uppercase[::-1])
    return word.upper().translate(table)
::: tests
"HELLO" ==> "SVOOL"
"abc" ==> "ZYX"
::: hidden
"N" ==> "M"
"Python" ==> "KBGSLM"
::: hints
- Có thể dùng `str.maketrans` + `translate`, hoặc `chr(155 - ord(c))` vì ord('A') + ord('Z') = 155.
::: explain
`str.maketrans(src, dst)` tạo bảng thay thế ký tự; `string.ascii_uppercase[::-1]` là bảng chữ cái đảo ngược.

===== gk31
@title: Chu vi / diện tích hình tròn
@level: easy
@topic: basics
@source: Giữa kì – Câu 31
@fn: compute_area
::: statement
Viết hàm `compute_area(s, x)`:
- `s = 'p'` → **chu vi** hình tròn bán kính x
- `s = 'a'` → **diện tích** hình tròn bán kính x
- còn lại → `"Invalid"`

Lấy **π = 3.14**, kết quả **làm tròn 2 chữ số thập phân**.

Ví dụ: `compute_area('p', 2)` → `12.56`, `compute_area('a', 2)` → `12.56`, `compute_area('x', 2)` → `"Invalid"`
::: starter
def compute_area(s, x):
    pass


print(compute_area('p', 2))  # 12.56
::: solution
def compute_area(s, x):
    if s == 'p':
        return round(2 * 3.14 * x, 2)
    if s == 'a':
        return round(3.14 * x * x, 2)
    return "Invalid"
::: tests
'p', 2 ==> 12.56
'a', 2 ==> 12.56
'x', 2 ==> "Invalid"
::: hidden
'a', 1.5
'p', 0.33 ==> 2.07
'P', 1 ==> "Invalid"
::: hints
- Chu vi = 2πr, diện tích = πr². Dùng đúng π = 3.14 (không dùng math.pi).
::: explain
Khi đề cho **π = 3.14** thì phải dùng đúng 3.14 – dùng `math.pi` sẽ lệch kết quả sau khi làm tròn.

===== gk32
@title: Top 3 nhà trọ đáng giá
@level: medium
@topic: collections
@source: Giữa kì – Câu 32
@fn: top_value_hostels
::: statement
Danh sách nhà trọ là list dict: `{'name': 'A', 'price': 1.5, 'distance': 2.0, 'rating': 4.5}`.

**score = rating / price − distance × 0.1**

Viết hàm `top_value_hostels(hostels)` trả về **list 3 nhà trọ** (dict gốc) có score cao nhất, **sắp xếp giảm dần** theo score.
::: starter
def top_value_hostels(hostels):
    pass


hostels = [
    {'name': 'A', 'price': 1.5, 'distance': 2.0, 'rating': 4.5},
    {'name': 'B', 'price': 2.0, 'distance': 0.5, 'rating': 4.8},
    {'name': 'C', 'price': 1.2, 'distance': 5.0, 'rating': 3.9},
    {'name': 'D', 'price': 3.0, 'distance': 1.0, 'rating': 4.9},
]
print(top_value_hostels(hostels))
::: solution
def top_value_hostels(hostels):
    def score(h):
        return h['rating'] / h['price'] - h['distance'] * 0.1
    return sorted(hostels, key=score, reverse=True)[:3]
::: tests
[{'name': 'A', 'price': 1.5, 'distance': 2.0, 'rating': 4.5}, {'name': 'B', 'price': 2.0, 'distance': 0.5, 'rating': 4.8}, {'name': 'C', 'price': 1.2, 'distance': 5.0, 'rating': 3.9}, {'name': 'D', 'price': 3.0, 'distance': 1.0, 'rating': 4.9}]
::: hidden
[{'name': 'X', 'price': 1.0, 'distance': 0.0, 'rating': 5.0}, {'name': 'Y', 'price': 1.0, 'distance': 10.0, 'rating': 5.0}, {'name': 'Z', 'price': 5.0, 'distance': 0.0, 'rating': 5.0}, {'name': 'W', 'price': 2.0, 'distance': 1.0, 'rating': 4.0}]
[{'name': 'P', 'price': 2.0, 'distance': 1.0, 'rating': 3.0}, {'name': 'Q', 'price': 1.0, 'distance': 3.0, 'rating': 2.0}, {'name': 'R', 'price': 1.0, 'distance': 1.0, 'rating': 4.0}]
::: hints
- Viết hàm `score(h)` rồi `sorted(hostels, key=score, reverse=True)`.
- Lấy 3 phần tử đầu `[:3]`.
::: explain
Tham số `key=` của `sorted` nhận **hàm**, có thể là hàm tự định nghĩa hoặc `lambda h: ...`.

===== gk33
@title: Sắp xếp sinh viên theo chiều cao
@level: easy
@topic: collections
@source: Giữa kì – Câu 33
@fn: sort_students_by_height
::: statement
Danh sách sinh viên là list dict `{'name': 'Minh', 'height': 168}`. Viết hàm `sort_students_by_height(students)` trả về danh sách đã sắp xếp theo `height` **tăng dần**.

```
Input:  [{'name': 'Minh', 'height': 168}, {'name': 'Huy', 'height': 175}, {'name': 'Lan', 'height': 160}]
Output: [{'name': 'Lan', 'height': 160}, {'name': 'Minh', 'height': 168}, {'name': 'Huy', 'height': 175}]
```
::: starter
def sort_students_by_height(students):
    pass


print(sort_students_by_height([{'name': 'Minh', 'height': 168}, {'name': 'Huy', 'height': 175}, {'name': 'Lan', 'height': 160}]))
::: solution
def sort_students_by_height(students):
    return sorted(students, key=lambda s: s['height'])
::: tests
[{'name': 'Minh', 'height': 168}, {'name': 'Huy', 'height': 175}, {'name': 'Lan', 'height': 160}] ==> [{'name': 'Lan', 'height': 160}, {'name': 'Minh', 'height': 168}, {'name': 'Huy', 'height': 175}]
::: hidden
[] ==> []
[{'name': 'A', 'height': 170}, {'name': 'B', 'height': 160}, {'name': 'C', 'height': 170}] ==> [{'name': 'B', 'height': 160}, {'name': 'A', 'height': 170}, {'name': 'C', 'height': 170}]
::: hints
- `sorted(students, key=lambda s: s['height'])`.
::: explain
`sorted` là **ổn định** (stable): hai bạn cùng chiều cao giữ nguyên thứ tự ban đầu. `students.sort(...)` cũng được nhưng nó sửa list gốc và trả về `None` – đừng `return students.sort()`!

===== gk34
@title: Tổng số commit của nhóm
@level: easy
@topic: collections
@source: Giữa kì – Câu 34
@fn: count_commits
::: statement
Cho dict lưu thông tin nhóm: `{'Minh': {'lines': 150, 'commits': 12}, 'Huy': {'lines': 200, 'commits': 15}}`.

Viết hàm `count_commits(group)` trả về **tổng số commit** (số nguyên) của cả nhóm.

Ví dụ trên → `27`
::: starter
def count_commits(group):
    pass


print(count_commits({'Minh': {'lines': 150, 'commits': 12}, 'Huy': {'lines': 200, 'commits': 15}}))  # 27
::: solution
def count_commits(group):
    return sum(info['commits'] for info in group.values())
::: tests
{'Minh': {'lines': 150, 'commits': 12}, 'Huy': {'lines': 200, 'commits': 15}} ==> 27
::: hidden
{} ==> 0
{'A': {'lines': 0, 'commits': 0}, 'B': {'lines': 1, 'commits': 1}, 'C': {'lines': 5, 'commits': 100}} ==> 101
::: hints
- Duyệt `group.values()` – mỗi value là một dict con.
::: explain
Dict lồng nhau: `group['Minh']['commits']`. Duyệt `.values()` khi không cần tên.
