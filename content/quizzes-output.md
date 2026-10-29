Ngân hàng câu "đoán output". Mỗi câu có phần ::: code – bộ kiểm tra (npm run validate) chạy đoạn code thật và bảo đảm đáp án đánh dấu * trùng với output. Đáp án dạng `Lỗi: <TênLỗi>` nghĩa là đoạn code báo lỗi.

===== o2-01
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(7 // 2, 7 % 2, -7 // 2)
::: options
`3 1 -3`
*`3 1 -4`
`3.5 1 -3.5`
`3 1 -3.5`
::: explain
`//` làm tròn **xuống** (về −∞), nên `-7 // 2` là −4, không phải −3.

===== o2-02
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(type(10 / 5).__name__, 10 // 5)
::: options
`int 2`
*`float 2`
`float 2.0`
`int 2.0`
::: explain
`/` luôn ra float (2.0) → kiểu `float`; `//` giữa hai int ra int.

===== o2-03
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
s = "Programming"
print(s[3:7], s[-3:], s[::3])
::: options
*`gram ing Pgmn`
`gram ing Pgai`
`gramm ing Pgmn`
`ogra ing Pram`
::: explain
`s[3:7]` lấy chỉ số 3–6: "gram". `s[::3]` lấy chỉ số 0, 3, 6, 9: P, g, m, n (P-r-o-**g**-r-a-**m**-m-i-**n**-g).

===== o2-04
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
s = "a-b-c"
print(s.split("-", 1))
::: options
`['a', 'b', 'c']`
*`['a', 'b-c']`
`['a-b', 'c']`
`['a', '-b-c']`
::: explain
Tham số thứ hai `maxsplit=1`: chỉ tách tại dấu `-` đầu tiên.

===== o2-05
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print("  FTU  ".strip().lower().center(7, "*"))
::: options
`**FTU**`
*`**ftu**`
`*ftu*`
`ftu****`
::: explain
Sau `strip` và `lower` còn "ftu" (3 ký tự); `center(7, "*")` thêm 2 dấu `*` mỗi bên.

===== o2-06
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
x = 5
if x > 3:
    x += 1
if x > 5:
    x *= 2
else:
    x -= 1
print(x)
::: options
`6`
`5`
*`12`
`10`
::: explain
Hai câu `if` độc lập: x thành 6, rồi 6 > 5 nên nhân 2 → 12.

===== o2-07
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
tong = 0
for i in range(1, 10, 3):
    tong += i
print(tong)
::: options
`45`
*`12`
`22`
`15`
::: explain
i lần lượt 1, 4, 7 → tổng 12.

===== o2-08
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
n, dem = 100, 0
while n > 1:
    n //= 3
    dem += 1
print(n, dem)
::: options
`0 5`
*`1 4`
`1 5`
`0 4`
::: explain
100 → 33 → 11 → 3 → 1: bốn lần chia, dừng khi n = 1.

===== o2-09
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
kq = []
for i in range(3):
    for j in range(i):
        kq.append(i * 10 + j)
print(kq)
::: options
`[0, 10, 11, 20, 21, 22]`
*`[10, 20, 21]`
`[0, 10, 20, 21]`
`[10, 11, 20, 21]`
::: explain
i = 0: không lặp; i = 1: j = 0 → 10; i = 2: j = 0, 1 → 20, 21.

===== o2-10
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
a = [3, 1, 2]
b = a
b.append(0)
c = sorted(a)
print(a, c)
::: options
`[3, 1, 2] [0, 1, 2, 3]`
*`[3, 1, 2, 0] [0, 1, 2, 3]`
`[0, 1, 2, 3] [0, 1, 2, 3]`
`[3, 1, 2, 0] [1, 2, 3]`
::: explain
`b = a` cùng trỏ một list nên `a` cũng có thêm 0; `sorted` tạo list mới, không đổi `a`.

===== o2-11
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
a = [5, 2, 8]
print(a.sort(), a)
::: options
`[2, 5, 8] [2, 5, 8]`
*`None [2, 5, 8]`
`None [5, 2, 8]`
`[2, 5, 8] [5, 2, 8]`
::: explain
`sort()` sắp xếp tại chỗ và trả về `None`.

===== o2-12
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
a = [1, 2, 3, 4, 5]
print(a[1:-1], a[::-2], a[10:])
::: options
`[2, 3, 4] [5, 3, 1] Lỗi`
*`[2, 3, 4] [5, 3, 1] []`
`[2, 3, 4, 5] [5, 3, 1] []`
`[2, 3, 4] [4, 2] []`
::: explain
Cắt lát vượt quá độ dài **không** lỗi mà trả về list rỗng (khác với `a[10]` gây IndexError).

===== o2-13
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
a = [1, 2, 3]
print(a[3])
::: options
`3`
`None`
*`Lỗi: IndexError`
`[]`
::: explain
Chỉ số hợp lệ là 0, 1, 2 (hoặc −1, −2, −3).

===== o2-14
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
t = (1, 2, 3)
t[0] = 9
print(t)
::: options
`(9, 2, 3)`
`(1, 2, 3)`
*`Lỗi: TypeError`
`Lỗi: IndexError`
::: explain
Tuple bất biến: không gán lại phần tử được.

===== o2-15
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
s = {3, 1, 3, 2}
s.add(1)
print(len(s), sorted(s))
::: options
`5 [1, 1, 2, 3, 3]`
*`3 [1, 2, 3]`
`4 [1, 2, 3, 3]`
`3 {1, 2, 3}`
::: explain
Set tự loại trùng; `sorted` một set trả về **list**.

===== o2-16
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
d = {"a": 1, "b": 2}
d["a"] += 10
d["c"] = d.get("c", 0) + 1
print(d)
::: options
`{'a': 1, 'b': 2, 'c': 1}`
*`{'a': 11, 'b': 2, 'c': 1}`
`{'a': 11, 'b': 2}`
`Lỗi: KeyError`
::: explain
`get("c", 0)` an toàn khi khoá chưa có.

===== o2-17
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
d = {"x": 3, "y": 1, "z": 2}
print(max(d), max(d, key=d.get), sorted(d.values()))
::: options
`x x [1, 2, 3]`
*`z x [1, 2, 3]`
`z z [3, 1, 2]`
`3 x [1, 2, 3]`
::: explain
`max(d)` so sánh **khoá** ("z" lớn nhất theo bảng chữ cái); `key=d.get` so sánh theo giá trị.

===== o2-18
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
def f(a, b=2, *args):
    return a + b + sum(args)
print(f(1), f(1, 1), f(1, 1, 1, 1))
::: options
`1 2 4`
*`3 2 4`
`3 2 3`
`Lỗi: TypeError`
::: explain
`f(1)`: b mặc định 2 → 3. `f(1, 1, 1, 1)`: args = (1, 1) → 4.

===== o2-19
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
def g(x):
    if x > 0:
        return "dương"
print(g(5), g(-5))
::: options
`dương âm`
*`dương None`
`dương`
`Lỗi: TypeError`
::: explain
Nhánh x ≤ 0 không có `return` → hàm trả về `None`. Luôn kiểm tra mọi nhánh đều có return.

===== o2-20
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print([x * x for x in range(6) if x % 2])
::: options
`[0, 4, 16]`
*`[1, 9, 25]`
`[1, 4, 9, 16, 25]`
`[0, 1, 4, 9, 16, 25]`
::: explain
`x % 2` khác 0 (True) với x lẻ: 1, 3, 5.

===== o2-21
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
words = ["kiwi", "fig", "banana", "apple"]
print(sorted(words, key=lambda w: (len(w), w)))
::: options
`['apple', 'banana', 'fig', 'kiwi']`
*`['fig', 'kiwi', 'apple', 'banana']`
`['fig', 'kiwi', 'banana', 'apple']`
`['banana', 'apple', 'kiwi', 'fig']`
::: explain
Sắp theo độ dài trước (3, 4, 5, 6); bằng độ dài thì theo chữ cái.

===== o2-22
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
from collections import Counter
c = Counter("mississippi")
print(c.most_common(2))
::: options
`[('s', 4), ('i', 4)]`
*`[('i', 4), ('s', 4)]`
`[('i', 4), ('p', 2)]`
`[('m', 1), ('i', 4)]`
::: explain
'i' và 's' cùng 4 lần; khi hoà, `most_common` giữ thứ tự gặp đầu tiên ('i' xuất hiện trước 's').

===== o2-23
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
try:
    x = int("12a")
    print("A")
except ValueError:
    print("B", end=" ")
else:
    print("C", end=" ")
finally:
    print("D")
::: options
`A D`
*`B D`
`B C D`
`A C D`
::: explain
Có lỗi → chạy `except`; `else` chỉ chạy khi **không** lỗi; `finally` luôn chạy.

===== o2-24
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(round(2.5), round(3.5), round(-1.5), int(-1.5))
::: options
`3 4 -2 -2`
*`2 4 -2 -1`
`2 4 -1 -1`
`3 4 -1 -2`
::: explain
`round` làm tròn về số chẵn khi đúng .5; `int` cắt bỏ phần thập phân (về phía 0).

===== o2-25
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(f"{1234.5678:,.2f}|{0.25:.0%}|{7:03d}")
::: options
`1234.57|25%|007`
*`1,234.57|25%|007`
`1,234.57|0.25%|7`
`1,234.5678|25%|007`
::: explain
`,.2f` phân cách nghìn + 2 chữ số; `.0%` nhân 100 không số lẻ; `03d` đệm số 0 cho đủ 3 chữ số.

===== o2-26
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
x = [1, 2, 3]
y = [i for i in x]
y[0] = 100
z = x
z[1] = 200
print(x)
::: options
`[100, 200, 3]`
*`[1, 200, 3]`
`[1, 2, 3]`
`[100, 2, 3]`
::: explain
`y` là list mới (comprehension tạo bản sao); `z = x` là cùng một list.

===== o2-27
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print("5" + "3", "5" * 3, int("5") + 3)
::: options
`8 15 8`
*`53 555 8`
`53 15 8`
`Lỗi: TypeError`
::: explain
Chuỗi + chuỗi là nối; chuỗi × số là lặp lại.

===== o2-28
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
def tong(ds):
    t = 0
    for x in ds:
        t += x
        return t
print(tong([4, 5, 6]))
::: options
`15`
*`4`
`None`
`6`
::: explain
`return` thụt lề nằm **trong** vòng lặp → trả về ngay sau phần tử đầu.

===== o2-29
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
a = [[0] * 2] * 2
a[0][0] = 1
print(a)
::: options
`[[1, 0], [0, 0]]`
*`[[1, 0], [1, 0]]`
`[[1, 1], [0, 0]]`
`Lỗi: TypeError`
::: explain
`[[0] * 2] * 2` tạo hai tham chiếu tới **cùng một** list con. Dùng `[[0] * 2 for _ in range(2)]` để có hai list độc lập.

===== o2-30
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
nums = [4, 7, 1, 9]
print(nums.index(max(nums)), sum(nums) / len(nums), min(nums, key=lambda v: abs(v - 5)))
::: options
`9 5.25 4`
*`3 5.25 4`
`3 5.25 7`
`3 5 4`
::: explain
`index(9)` = 3; trung bình 21/4 = 5.25; số gần 5 nhất là 4 (cách 1) – 7 cách 2.

===== o2-31
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
for i, ch in enumerate("abc", start=1):
    print(f"{i}{ch}", end=" ")
::: options
`0a 1b 2c`
*`1a 2b 3c`
`a1 b2 c3`
`1 2 3`
::: explain
`start=1` bắt đầu đếm từ 1.

===== o2-32
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(list(zip([1, 2, 3], "ab")))
::: options
`[(1, 'a'), (2, 'b'), (3, None)]`
*`[(1, 'a'), (2, 'b')]`
`Lỗi: ValueError`
`[(1, 2, 3), ('a', 'b')]`
::: explain
`zip` dừng ở dãy ngắn nhất.

===== o2-33
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(bool([]), bool([0]), bool(""), bool(" "), bool(0.0))
::: options
`False False False False False`
*`False True False True False`
`True True False True False`
`False True False False False`
::: explain
List rỗng, chuỗi rỗng, số 0 là False; list có phần tử (kể cả 0) và chuỗi có dấu cách là True.

===== o2-34
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
x = 10
def f():
    x = 5
    return x
print(f(), x)
::: options
`5 5`
*`5 10`
`10 10`
`Lỗi: NameError`
::: explain
`x = 5` trong hàm tạo biến **cục bộ**, không đụng tới `x` toàn cục.

===== o2-35
@chapter: 2
::: question
Đoạn code in ra gì?
::: code
print(sorted([3, -5, 2, -1], key=abs), sorted("bAc"))
::: options
`[-5, -1, 2, 3] ['A', 'b', 'c']`
*`[-1, 2, 3, -5] ['A', 'b', 'c']`
`[-1, 2, 3, -5] ['b', 'A', 'c']`
`[-5, 3, 2, -1] ['a', 'b', 'c']`
::: explain
`key=abs` so theo trị tuyệt đối; chữ hoa đứng trước chữ thường theo mã Unicode.

===== o3-01
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
a = np.arange(6).reshape(2, 3)
print(a.shape, a[1, 2], a[:, 1].tolist())
::: options
`(3, 2) 5 [1, 4]`
*`(2, 3) 5 [1, 4]`
`(2, 3) 4 [3, 4, 5]`
`(2, 3) 5 [3, 4, 5]`
::: explain
`[[0, 1, 2], [3, 4, 5]]`: dòng 1 cột 2 là 5; cột 1 là [1, 4].

===== o3-02
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
a = np.array([[1, 2], [3, 4]])
print(a.sum(axis=0).tolist(), a.sum(axis=1).tolist(), a.sum())
::: options
`[3, 7] [4, 6] 10`
*`[4, 6] [3, 7] 10`
`[4, 6] [3, 7] [10]`
`[1, 2] [3, 4] 10`
::: explain
`axis=0` cộng dọc theo các dòng → mỗi cột một tổng.

===== o3-03
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
a = np.array([1, 2, 3])
print((a * 2).tolist(), (a + a).tolist(), [1, 2, 3] * 2)
::: options
`[2, 4, 6] [2, 4, 6] [2, 4, 6]`
*`[2, 4, 6] [2, 4, 6] [1, 2, 3, 1, 2, 3]`
`[1, 2, 3, 1, 2, 3] [2, 4, 6] [2, 4, 6]`
`[2, 4, 6] [1, 2, 3, 1, 2, 3] [1, 2, 3, 1, 2, 3]`
::: explain
Mảng NumPy tính từng phần tử; list nhân số là lặp lại.

===== o3-04
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
a = np.array([5, 12, 7, 20, 3])
print(a[a > 6].tolist(), (a > 6).sum(), np.where(a > 6, 1, 0).tolist())
::: options
`[12, 20] 2 [0, 1, 0, 1, 0]`
*`[12, 7, 20] 3 [0, 1, 1, 1, 0]`
`[12, 7, 20] 3 [False, True, True, True, False]`
`[7, 12, 20] 3 [0, 1, 1, 1, 0]`
::: explain
Mặt nạ giữ nguyên thứ tự; tổng các True là số phần tử thoả điều kiện.

===== o3-05
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
print(np.linspace(0, 1, 5).tolist(), np.arange(0, 1, 0.25).tolist())
::: options
`[0.0, 0.25, 0.5, 0.75] [0.0, 0.25, 0.5, 0.75, 1.0]`
*`[0.0, 0.25, 0.5, 0.75, 1.0] [0.0, 0.25, 0.5, 0.75]`
`[0.0, 0.2, 0.4, 0.6, 0.8] [0.0, 0.25, 0.5, 0.75]`
`[0.0, 0.25, 0.5, 0.75, 1.0] [0.0, 0.25, 0.5, 0.75, 1.0]`
::: explain
`linspace` lấy cả điểm cuối; `arange` thì không.

===== o3-06
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
a = np.array([3, 9, 1, 9])
print(a.argmax(), a.argmin(), np.unique(a).tolist())
::: options
`3 2 [1, 3, 9]`
*`1 2 [1, 3, 9]`
`1 2 [3, 9, 1]`
`9 1 [1, 3, 9]`
::: explain
`argmax` trả về vị trí **đầu tiên** của giá trị lớn nhất; `unique` trả về các giá trị khác nhau đã sắp xếp.

===== o3-07
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import numpy as np
a = np.array([1, 2, 3, 4])
b = a[1:3]
b[0] = 99
print(a.tolist())
::: options
`[1, 2, 3, 4]`
*`[1, 99, 3, 4]`
`[99, 2, 3, 4]`
`[1, 99, 99, 4]`
::: explain
Cắt lát mảng NumPy là **view** – chung bộ nhớ với mảng gốc. Muốn bản sao độc lập: `a[1:3].copy()`. (List Python thì cắt lát tạo bản sao.)

===== o3-09
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import json
d = json.loads('{"a": [1, 2], "b": null, "c": true}')
print(d["a"][1], d["b"], d["c"])
::: options
`2 null true`
*`2 None True`
`1 None True`
`2 None true`
::: explain
JSON `null`/`true` thành `None`/`True` của Python.

===== o3-10
@chapter: 3
::: question
Đoạn code in ra gì?
::: code
import io
import pandas as pd
df = pd.read_csv(io.StringIO("a;b\n1;2\n3;?"), sep=";", na_values="?")
print(df.shape, df["b"].isna().sum(), df["b"].dtype)
::: options
`(3, 2) 1 object`
*`(2, 2) 1 float64`
`(2, 2) 0 object`
`(2, 1) 1 float64`
::: explain
Dòng đầu là tiêu đề → 2 dòng dữ liệu; `?` thành NaN nên cột `b` là số thực.

===== o4-01
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
s = pd.Series([10, 20, 30], index=["a", "b", "c"])
print(s["b"], s.iloc[-1], s[s > 15].index.tolist())
::: options
`20 10 ['b', 'c']`
*`20 30 ['b', 'c']`
`20 30 [20, 30]`
`b 30 ['b', 'c']`
::: explain
`s["b"]` theo nhãn; `iloc[-1]` theo vị trí cuối; lọc rồi lấy index.

===== o4-02
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"x": [1, 2, 3, 4]}, index=[10, 20, 30, 40])
print(df.loc[20:30, "x"].tolist(), df.iloc[1:3, 0].tolist())
::: options
`[2] [2, 3]`
*`[2, 3] [2, 3]`
`[2, 3] [2]`
`Lỗi: KeyError`
::: explain
`loc` lấy cả nhãn cuối (20, 30); `iloc` theo vị trí 1, 2 – không lấy 3.

===== o4-03
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"a": [1, 2], "b": [3, 4]})
df.drop(columns=["a"])
print(df.columns.tolist())
::: options
`['b']`
*`['a', 'b']`
`['a']`
`[]`
::: explain
`drop` trả về bảng mới; không gán lại thì `df` không đổi.

===== o4-04
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
s = pd.Series([1, None, 3, None])
print(s.isna().sum(), s.mean(), s.fillna(0).sum(), s.count())
::: options
`2 1.0 4.0 4`
*`2 2.0 4.0 2`
`2 2.0 4.0 4`
`0 2.0 4.0 2`
::: explain
`mean` bỏ qua NaN: (1 + 3)/2 = 2; `count` chỉ đếm ô không thiếu.

===== o4-05
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"k": ["a", "b", "a", "b", "a"], "v": [1, 2, 3, 4, 5]})
print(df.groupby("k")["v"].sum().to_dict(), df.groupby("k").size().to_dict())
::: options
`{'a': 3, 'b': 2} {'a': 9, 'b': 6}`
*`{'a': 9, 'b': 6} {'a': 3, 'b': 2}`
`{'a': 3.0, 'b': 3.0} {'a': 3, 'b': 2}`
`{'a': 9, 'b': 6} {'a': 9, 'b': 6}`
::: explain
`sum` cộng giá trị theo nhóm; `size` đếm số dòng mỗi nhóm.

===== o4-06
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"k": ["x", "x", "y"], "v": [2, 4, 9]})
print(df.pivot_table(index="k", values="v").loc["x", "v"])
::: options
`6`
*`3.0`
`2`
`4`
::: explain
`aggfunc` mặc định của `pivot_table` là **mean**: (2 + 4)/2 = 3.0.

===== o4-07
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
a = pd.DataFrame({"id": [1, 2, 3], "x": ["a", "b", "c"]})
b = pd.DataFrame({"id": [2, 3, 4], "y": [20, 30, 40]})
print(len(a.merge(b, on="id")), len(a.merge(b, on="id", how="left")), len(a.merge(b, on="id", how="outer")))
::: options
`3 3 3`
*`2 3 4`
`2 2 4`
`3 3 4`
::: explain
inner: id 2, 3; left: giữ 3 dòng của a; outer: id 1, 2, 3, 4.

===== o4-08
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"n": [3, 1, 2], "t": ["c", "a", "b"]})
print(df.sort_values("n")["t"].tolist(), df.sort_values("n").index.tolist())
::: options
`['a', 'b', 'c'] [0, 1, 2]`
*`['a', 'b', 'c'] [1, 2, 0]`
`['c', 'a', 'b'] [1, 2, 0]`
`['a', 'b', 'c'] [2, 0, 1]`
::: explain
Sắp xếp giữ nguyên nhãn index cũ – dùng `reset_index(drop=True)` nếu muốn đánh lại 0, 1, 2.

===== o4-09
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
s = pd.Series(["Hà Nội", "hải phòng", "Huế"])
print(s.str.lower().str.startswith("h").sum(), s.str.len().tolist())
::: options
`2 [6, 9, 3]`
*`3 [6, 9, 3]`
`3 [5, 8, 3]`
`1 [6, 9, 3]`
::: explain
Sau khi hạ chữ thường, cả 3 bắt đầu bằng "h". `len` đếm cả dấu cách.

===== o4-10
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
s = pd.Series(["Vàng", "Bạc", "Đồng"])
print(s.map({"Vàng": 3, "Bạc": 2}).tolist())
::: options
`[3, 2, 0]`
*`[3.0, 2.0, nan]`
`[3, 2, 'Đồng']`
`Lỗi: KeyError`
::: explain
Giá trị không có trong dict thành NaN, nên cả cột chuyển sang float.

===== o4-11
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"a": [1, 1, 2], "b": [5, 5, 6]})
print(df.duplicated().tolist(), len(df.drop_duplicates()))
::: options
`[True, True, False] 1`
*`[False, True, False] 2`
`[False, False, False] 3`
`[False, True, True] 1`
::: explain
Lần xuất hiện đầu tiên không bị coi là trùng (`keep="first"`).

===== o4-12
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
print(pd.cut([1, 5, 10], bins=[0, 5, 10], labels=["thấp", "cao"]).tolist())
::: options
`['thấp', 'cao', 'cao']`
*`['thấp', 'thấp', 'cao']`
`['thấp', nan, 'cao']`
`['cao', 'thấp', 'cao']`
::: explain
Khoảng mặc định đóng bên phải: (0, 5] và (5, 10] → 5 thuộc "thấp".

===== o4-13
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
d = pd.get_dummies(pd.Series(["a", "b", "a"]), dtype=int)
print(d.columns.tolist(), d["a"].tolist())
::: options
`['a'] [1, 0, 1]`
*`['a', 'b'] [1, 0, 1]`
`['a', 'b'] [0, 1, 0]`
`['b'] [0, 1, 0]`
::: explain
Mỗi giá trị khác nhau một cột 0/1.

===== o4-14
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
df = pd.DataFrame({"x": [1, 2, 3, 4]})
print(df[(df.x > 1) & (df.x < 4)]["x"].tolist(), df.x.between(2, 3).sum())
::: options
`[2, 3, 4] 2`
*`[2, 3] 2`
`[2, 3] 1`
`[1, 2, 3, 4] 2`
::: explain
`between` gồm cả hai đầu.

===== o4-15
@chapter: 4
::: question
Đoạn code in ra gì?
::: code
import pandas as pd
s = pd.Series([100, 110, 99])
print(s.pct_change().round(2).tolist()[1:], s.diff().tolist()[1:])
::: options
`[0.1, 0.1] [10.0, 11.0]`
*`[0.1, -0.1] [10.0, -11.0]`
`[10.0, -10.0] [10.0, -11.0]`
`[0.1, -0.11] [10.0, -11.0]`
::: explain
(110 − 100)/100 = 0.1; (99 − 110)/110 = −0.1 sau làm tròn; `diff` là hiệu tuyệt đối.

===== o6-01
@chapter: 6
::: question
Đoạn code in ra gì?
::: code
from sklearn.linear_model import LinearRegression
m = LinearRegression().fit([[1], [2], [3]], [3, 5, 7])
print(round(m.coef_[0], 2), round(m.intercept_, 2), round(m.predict([[10]])[0], 2))
::: options
`3.0 2.0 32.0`
*`2.0 1.0 21.0`
`2.0 3.0 23.0`
`1.0 2.0 12.0`
::: explain
Dữ liệu nằm đúng trên đường y = 2x + 1.

===== o6-02
@chapter: 6
::: question
Đoạn code in ra gì?
::: code
from sklearn.preprocessing import PolynomialFeatures
print(PolynomialFeatures(2).fit_transform([[3]]).tolist())
::: options
`[[3.0, 9.0]]`
*`[[1.0, 3.0, 9.0]]`
`[[9.0]]`
`[[1.0, 3.0, 6.0]]`
::: explain
Mặc định có cột hằng số 1, rồi x, x².

===== o7-01
@chapter: 7
::: question
Đoạn code in ra gì?
::: code
from sklearn.metrics import r2_score
print(r2_score([1, 2, 3], [2, 2, 2]), r2_score([1, 2, 3], [1, 2, 3]))
::: options
`0.5 1.0`
*`0.0 1.0`
`-1.0 1.0`
`1.0 0.0`
::: explain
Luôn dự đoán bằng trung bình (2) cho R² = 0; dự đoán hoàn hảo cho R² = 1.

===== o7-02
@chapter: 7
::: question
Đoạn code in ra gì?
::: code
from sklearn.metrics import confusion_matrix
print(confusion_matrix([0, 1, 1, 0, 1], [0, 1, 0, 1, 1]).tolist())
::: options
`[[2, 1], [1, 1]]`
*`[[1, 1], [1, 2]]`
`[[1, 1], [2, 1]]`
`[[2, 1], [1, 2]]`
::: explain
Dòng = thật, cột = dự đoán: thật 0 → (0, 1) một mỗi loại; thật 1 → 1 FN, 2 TP.

===== o7-03
@chapter: 7
::: question
Đoạn code in ra gì?
::: code
from sklearn.model_selection import train_test_split
a, b = train_test_split(list(range(10)), test_size=0.2, random_state=0)
print(len(a), len(b))
::: options
`2 8`
*`8 2`
`10 2`
`8 10`
::: explain
Truyền **một** dãy thì trả về hai phần: train trước, test sau.
