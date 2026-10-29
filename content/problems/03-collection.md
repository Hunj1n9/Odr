Tuyển tập "Adventure in the Ancient Temple of Python" + "24h làm sinh viên trường F" (đề luyện giữa kỳ TIN314).
Các bài trùng với đề giữa kỳ (mirror_message, count_segments, select_items, max_profit, count_working_days...) đã nằm trong bộ Giữa kì.

===== tt101
@title: The Scroll – xử lý chuỗi
@level: easy
@topic: string
@source: Tuyển tập – P1.1
@fn: process_scroll
::: statement
Viết hàm `process_scroll(spell)` trả về tuple 4 phần tử:
1. độ dài chuỗi
2. số lần xuất hiện chữ `"a"`
3. chuỗi sau khi thay mọi `"a"` bằng `"c"`
4. chuỗi ở bước 3 bị **đảo ngược**

`process_scroll("abracadabra")` → `(11, 5, 'cbrcccdcbrc', 'crbcdcccrbc')`
::: starter
def process_scroll(spell):
    pass


print(process_scroll("abracadabra"))
::: solution
def process_scroll(spell):
    replaced = spell.replace("a", "c")
    return len(spell), spell.count("a"), replaced, replaced[::-1]
::: tests
"abracadabra" ==> (11, 5, 'cbrcccdcbrc', 'crbcdcccrbc')
::: hidden
"" ==> (0, 0, '', '')
"banana" ==> (6, 3, 'bcncnc', 'cncncb')
"AAA" ==> (3, 0, 'AAA', 'AAA')
::: hints
- `len()`, `str.count()`, `str.replace()`, slicing `[::-1]`.
::: explain
Chuỗi là **bất biến**: `replace` trả về chuỗi mới, không sửa chuỗi cũ. (Đề PDF gốc in sai kết quả đảo ngược, đáp án đúng là `'crbcdcccrbc'`.)

===== tt102
@title: The Inventory – list hỗn hợp
@level: easy
@topic: collections
@source: Tuyển tập – P1.2
@fn: process_backpack
::: statement
Viết hàm `process_backpack(backpack)` trả về tuple:
1. số phần tử của list
2. số phần tử **là list con**
3. list mới: thay mỗi phần tử là list bằng chuỗi `"0"`
4. từ list ở bước 3: nhân đôi mỗi phần tử (chuỗi lặp 2 lần, số nhân 2) rồi **đảo ngược** list

```
process_backpack(['potion', 10, ['map', 'compass'], 5])
# (4, 1, ['potion', 10, '0', 5], [10, '00', 20, 'potionpotion'])
```
::: starter
def process_backpack(backpack):
    pass


print(process_backpack(['potion', 10, ['map', 'compass'], 5]))
::: solution
def process_backpack(backpack):
    n_lists = sum(1 for x in backpack if isinstance(x, list))
    step3 = ["0" if isinstance(x, list) else x for x in backpack]
    final = [x * 2 for x in step3][::-1]
    return len(backpack), n_lists, step3, final
::: tests
['potion', 10, ['map', 'compass'], 5] ==> (4, 1, ['potion', 10, '0', 5], [10, '00', 20, 'potionpotion'])
::: hidden
[] ==> (0, 0, [], [])
[[1], [2, 3], 'x'] ==> (3, 2, ['0', '0', 'x'], ['xx', '00', '00'])
[1.5, 'ab'] ==> (2, 0, [1.5, 'ab'], ['abab', 3.0])
::: hints
- `isinstance(x, list)` kiểm tra list con.
- Toán tử `*` với chuỗi là lặp chuỗi: `'ab' * 2 == 'abab'`.
::: explain
Biểu thức điều kiện trong list comprehension: `[A if cond else B for x in lst]` (khác với lọc `[x for x in lst if cond]`).

===== tt103
@title: The Identification – dict
@level: easy
@topic: collections
@source: Tuyển tập – P1.3
@fn: process_shield
::: statement
Viết hàm `process_shield(shield)` trả về tuple:
1. list các **key**
2. list các **value**
3. một dict **mới** (copy) trong đó value nào là chuỗi được đổi thành `0`
4. key **đầu tiên** có value không nguyên tử (list, dict, set hoặc tuple); không có thì `None`

```
shield = {'id': 101, 'name': 'Iron Shield', 'stats': ['heavy', 'durable']}
# (['id', 'name', 'stats'], [101, 'Iron Shield', ['heavy', 'durable']],
#  {'id': 101, 'name': 0, 'stats': ['heavy', 'durable']}, 'stats')
```
::: starter
def process_shield(shield):
    pass


print(process_shield({'id': 101, 'name': 'Iron Shield', 'stats': ['heavy', 'durable']}))
::: solution
def process_shield(shield):
    modified = {k: (0 if isinstance(v, str) else v) for k, v in shield.items()}
    non_atomic = None
    for k, v in shield.items():
        if isinstance(v, (list, dict, set, tuple)):
            non_atomic = k
            break
    return list(shield.keys()), list(shield.values()), modified, non_atomic
::: tests
{'id': 101, 'name': 'Iron Shield', 'stats': ['heavy', 'durable']} ==> (['id', 'name', 'stats'], [101, 'Iron Shield', ['heavy', 'durable']], {'id': 101, 'name': 0, 'stats': ['heavy', 'durable']}, 'stats')
::: hidden
{} ==> ([], [], {}, None)
{'a': 'x', 'b': 'y'} ==> (['a', 'b'], ['x', 'y'], {'a': 0, 'b': 0}, None)
{'p': (1, 2), 'q': {'r': 1}} ==> (['p', 'q'], [(1, 2), {'r': 1}], {'p': (1, 2), 'q': {'r': 1}}, 'p')
::: hints
- `list(d.keys())`, `list(d.values())`.
- Tạo dict mới bằng dict comprehension để không sửa dict gốc.
::: explain
`d.keys()` trả về *view*, phải bọc `list(...)` nếu đề yêu cầu list.

===== tt105
@title: The Gatekeeper – kiểu của nhiều đối số
@level: easy
@topic: basics
@source: Tuyển tập – P1.5
@fn: identify_types
::: statement
Viết hàm `identify_types(*args)` nhận **số lượng tham số tuỳ ý** và trả về list kiểu dữ liệu của từng tham số.

`identify_types(10, 'magic')` → `[int, str]`
::: starter
def identify_types(*args):
    pass


print(identify_types(10, 'magic'))
::: solution
def identify_types(*args):
    return [type(x) for x in args]
::: tests
10, 'magic' ==> [int, str]
::: hidden
 ==> []
3.5, None, [1], {'a': 1}, (1,), True ==> [float, type(None), list, dict, tuple, bool]
::: hints
- `*args` gom mọi tham số vị trí thành một tuple.
- `type(x)` trả về kiểu của x.
::: explain
`*args` (tuple) và `**kwargs` (dict) cho phép hàm nhận số tham số tuỳ ý.

===== tt105b
@title: The Gatekeeper – chuỗi thành 0 (while)
@level: easy
@topic: basics
@source: Tuyển tập – P1.5
@fn: process_list
::: statement
Viết hàm `process_list(lst)` **dùng vòng `while`** duyệt list: gặp **chuỗi** thì đổi thành `0`, gặp **số** (int/float) thì giữ nguyên. Trả về list kết quả.

`process_list([10, 'magic', 20])` → `[10, 0, 20]`
::: starter
def process_list(lst):
    pass


print(process_list([10, 'magic', 20]))  # [10, 0, 20]
::: solution
def process_list(lst):
    result = []
    i = 0
    while i < len(lst):
        x = lst[i]
        if isinstance(x, str):
            result.append(0)
        elif isinstance(x, (int, float)):
            result.append(x)
        i += 1
    return result
::: tests
[10, 'magic', 20] ==> [10, 0, 20]
::: hidden
[] ==> []
['a', 'b'] ==> [0, 0]
[1.5, '2', -3] ==> [1.5, 0, -3]
::: hints
- Mẫu while: `i = 0` / `while i < len(lst):` / … / `i += 1`.
::: explain
Quên `i += 1` trong vòng `while` ⇒ **vòng lặp vô hạn** (hệ thống sẽ báo quá thời gian).

===== tt107
@title: The Selective Gate – đếm và tổng
@level: easy
@topic: basics
@source: Tuyển tập – P1.7
@fn: filter_numbers
::: statement
Viết hàm `filter_numbers(lst)` tìm các số **chia hết cho 2 nhưng không chia hết cho 3**, trả về tuple `(số lượng, tổng)`.

`filter_numbers([2, 3, 4, 6, 8, 9, 10])` → `(4, 24)`
::: starter
def filter_numbers(lst):
    pass


print(filter_numbers([2, 3, 4, 6, 8, 9, 10]))  # (4, 24)
::: solution
def filter_numbers(lst):
    picked = [x for x in lst if x % 2 == 0 and x % 3 != 0]
    return len(picked), sum(picked)
::: tests
[2, 3, 4, 6, 8, 9, 10] ==> (4, 24)
::: hidden
[] ==> (0, 0)
[6, 12] ==> (0, 0)
[-2, 14, 16] ==> (3, 28)
::: hints
- Lọc vào một list trước, sau đó `len()` và `sum()`.
::: explain
Lưu kết quả lọc vào biến để dùng lại – tránh lọc 2 lần.

===== tt109
@title: The Silent Scribe – phân tích câu
@level: easy
@topic: string
@source: Tuyển tập – P1.9
@fn: analyze_sentence
::: statement
Viết hàm `analyze_sentence(text)` (câu không có dấu câu, các từ cách nhau bởi khoảng trắng) trả về tuple:
- tổng số từ
- số từ **bắt đầu bằng nguyên âm** (A, E, I, O, U – không phân biệt hoa thường)

`analyze_sentence("Apple is on the island and under the old oak tree")` → `(11, 8)`
::: starter
def analyze_sentence(text):
    pass


print(analyze_sentence("Apple is on the island and under the old oak tree"))
::: solution
def analyze_sentence(text):
    words = text.split()
    vowel_start = sum(1 for w in words if w[0].lower() in "aeiou")
    return len(words), vowel_start
::: tests
"Apple is on the island and under the old oak tree" ==> (11, 8)
::: hidden
"" ==> (0, 0)
"Python Rocks" ==> (2, 0)
"Every Igloo Under Orion" ==> (4, 4)
::: hints
- `text.split()` tách từ; `w[0]` là chữ cái đầu.
::: explain
(Đề PDF ghi 10 từ / 6 nguyên âm là **đếm sai** – câu có 11 từ, 8 từ bắt đầu bằng nguyên âm.) Luôn tự kiểm tra lại ví dụ của đề bằng code!

===== tt110a
@title: A1Z26 – mã hoá câu có khoảng trắng
@level: easy
@topic: string
@source: Tuyển tập – P1.10
@fn: encode_a1z26
::: statement
Viết hàm `encode_a1z26(text)`: mỗi chữ in hoa đổi thành số (A=1 … Z=26), các số trong cùng một từ nối bằng `-`, **giữ nguyên khoảng trắng** giữa các từ.

`encode_a1z26("HELLO WORLD")` → `"8-5-12-12-15 23-15-18-12-4"`
::: starter
def encode_a1z26(text):
    pass


print(encode_a1z26("HELLO WORLD"))
::: solution
def encode_a1z26(text):
    return " ".join("-".join(str(ord(c) - 64) for c in word) for word in text.split(" "))
::: tests
"HELLO WORLD" ==> "8-5-12-12-15 23-15-18-12-4"
::: hidden
"A" ==> "1"
"AB CD EF" ==> "1-2 3-4 5-6"
"FTU" ==> "6-20-21"
::: hints
- Tách theo khoảng trắng → mã hoá từng từ → nối lại bằng `" "`.
::: explain
Bài "nhiều tầng": xử lý từng từ (join bằng `-`) rồi từng câu (join bằng khoảng trắng) – generator lồng nhau.

===== tt110b
@title: A1Z26 – giải mã
@level: easy
@topic: string
@source: Tuyển tập – P1.10
@fn: decode_a1z26
::: statement
Viết hàm `decode_a1z26(code)` đổi các số (1–26, nối bằng `-`, các từ cách nhau bởi khoảng trắng) về chữ in hoa.

`decode_a1z26("8-5-12-12-15 23-15-18-12-4")` → `"HELLO WORLD"`
::: starter
def decode_a1z26(code):
    pass


print(decode_a1z26("8-5-12-12-15 23-15-18-12-4"))
::: solution
def decode_a1z26(code):
    return " ".join("".join(chr(int(n) + 64) for n in word.split("-")) for word in code.split(" "))
::: tests
"8-5-12-12-15 23-15-18-12-4" ==> "HELLO WORLD"
::: hidden
"26" ==> "Z"
"1-2 3-4 5-6" ==> "AB CD EF"
::: hints
- `word.split("-")` cho list chuỗi số; `chr(int(n) + 64)` đổi về chữ.
::: explain
Ngược với encode: `int()` để đổi chuỗi số thành số rồi `chr()`.

===== tt201
@title: The Code Lock – số nguyên tố gần nhất
@level: medium
@topic: algo
@source: Tuyển tập – P2.1
@fn: unlock_door
::: statement
1. Viết hàm phụ `is_prime(n)`.
2. Viết `get_nearest_prime(n)`: nếu n nguyên tố trả về n, nếu không tìm số nguyên tố gần nhất **lớn hơn** n.
3. Viết hàm `unlock_door(input_list)` trả về list kết quả áp dụng `get_nearest_prime` cho từng phần tử.

`unlock_door([4, 11, 20])` → `[5, 11, 23]`
::: starter
def is_prime(n):
    pass


def get_nearest_prime(n):
    pass


def unlock_door(input_list):
    pass


print(unlock_door([4, 11, 20]))  # [5, 11, 23]
::: solution
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True


def get_nearest_prime(n):
    while not is_prime(n):
        n += 1
    return n


def unlock_door(input_list):
    return [get_nearest_prime(x) for x in input_list]
::: tests
[4, 11, 20] ==> [5, 11, 23]
::: hidden
[] ==> []
[0, 1, 2] ==> [2, 2, 2]
[100, 1000] ==> [101, 1009]
::: hints
- Chia nhỏ bài thành các hàm con – dễ kiểm tra từng phần.
::: explain
Chia bài lớn thành hàm nhỏ là cách "Part 2" của đề muốn kiểm tra.

===== tt202
@title: The Merchant's Ledger – list các dict
@level: easy
@topic: collections
@source: Tuyển tập – P2.2
@fn: process_ledger
::: statement
`items` là list dict `{'item': tên, 'price': giá}`. Viết hàm `process_ledger(items)` trả về tuple:
1. tổng giá
2. **tên** món đắt nhất
3. list các món có `price > 50`

```
data = [{'item': 'Apple', 'price': 10}, {'item': 'Sword', 'price': 200}, {'item': 'Paper', 'price': 5}]
process_ledger(data)  # (215, 'Sword', [{'item': 'Sword', 'price': 200}])
```
::: starter
def process_ledger(items):
    pass


data = [{'item': 'Apple', 'price': 10}, {'item': 'Sword', 'price': 200}, {'item': 'Paper', 'price': 5}]
print(process_ledger(data))
::: solution
def process_ledger(items):
    total = sum(i['price'] for i in items)
    best = max(items, key=lambda i: i['price'])['item']
    expensive = [i for i in items if i['price'] > 50]
    return total, best, expensive
::: tests
[{'item': 'Apple', 'price': 10}, {'item': 'Sword', 'price': 200}, {'item': 'Paper', 'price': 5}] ==> (215, 'Sword', [{'item': 'Sword', 'price': 200}])
::: hidden
[{'item': 'A', 'price': 50}] ==> (50, 'A', [])
[{'item': 'A', 'price': 60.5}, {'item': 'B', 'price': 70}] ==> (130.5, 'B', [{'item': 'A', 'price': 60.5}, {'item': 'B', 'price': 70}])
::: hints
- `max(items, key=lambda i: i['price'])` trả về **cả dict**, sau đó lấy `['item']`.
::: explain
`max/min/sorted` với `key=` là vũ khí số 1 cho dữ liệu dạng list-of-dict (giống một bảng).

===== tt203
@title: The Tent – công thức Heron
@level: easy
@topic: algo
@source: Tuyển tập – P2.3
@fn: tent_area
::: statement
Ba cọc lều ở toạ độ p1, p2, p3 (tuple (x, y)). Viết hàm `tent_area(p1, p2, p3)` tính diện tích tam giác bằng **công thức Heron**:

Area = √(s(s−a)(s−b)(s−c)), s = (a + b + c) / 2

Trả về diện tích **làm tròn 2 chữ số**. `tent_area((0, 0), (0, 3), (4, 0))` → `6.0`
::: starter
import math


def tent_area(p1, p2, p3):
    pass


print(tent_area((0, 0), (0, 3), (4, 0)))  # 6.0
::: solution
import math


def dist(p, q):
    return math.sqrt((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2)


def tent_area(p1, p2, p3):
    a, b, c = dist(p1, p2), dist(p2, p3), dist(p3, p1)
    s = (a + b + c) / 2
    return round(math.sqrt(max(s * (s - a) * (s - b) * (s - c), 0)), 2)
::: tests
(0, 0), (0, 3), (4, 0) ==> 6.0
::: hidden
(0, 0), (1, 0), (0, 1) ==> 0.5
(1, 1), (4, 5), (7, 1) ==> 12.0
(0, 0), (1, 1), (2, 2) ==> 0.0
::: hints
- Viết hàm `dist(p, q)` theo Pythagoras, hoặc dùng `math.dist(p, q)`.
::: explain
Với 3 điểm thẳng hàng, sai số làm tròn có thể khiến tích bên trong căn hơi âm (−1e−15) ⇒ `math.sqrt` báo lỗi. Dùng `max(..., 0)` để an toàn.

===== tt204
@title: The Moat – chu vi hình tròn
@level: easy
@topic: basics
@source: Tuyển tập – P2.4
@fn: calc_circle
::: statement
Viết hàm `calc_circle(radius)`: nếu bán kính âm trả về `"Invalid"`, ngược lại trả về chu vi **C = 2πr** (dùng `math.pi`) làm tròn 2 chữ số.

`calc_circle(5)` → `31.42`
::: starter
import math


def calc_circle(radius):
    pass


print(calc_circle(5))  # 31.42
::: solution
import math


def calc_circle(radius):
    if radius < 0:
        return "Invalid"
    return round(2 * math.pi * radius, 2)
::: tests
5 ==> 31.42
-1 ==> "Invalid"
::: hidden
0 ==> 0.0
2.5 ==> 15.71
::: hints
- `import math` rồi dùng `math.pi`.
::: explain
So sánh với câu giữa kỳ dùng π = 3.14: luôn đọc kỹ đề yêu cầu hằng số nào.

===== tt205
@title: The Fireball – giải phương trình bậc 2
@level: easy
@topic: algo
@source: Tuyển tập – P2.5
@fn: solve_quad
::: statement
Viết hàm `solve_quad(a, b, c)` (a ≠ 0) giải **ax² + bx + c = 0**:
- Δ < 0 → `"No Solution"`
- Δ = 0 → một nghiệm `-b / (2a)` (float)
- Δ > 0 → tuple `(x1, x2)` với x1 = (−b + √Δ) / 2a, x2 = (−b − √Δ) / 2a

`solve_quad(1, -3, 2)` → `(2.0, 1.0)`
::: starter
import math


def solve_quad(a, b, c):
    pass


print(solve_quad(1, -3, 2))  # (2.0, 1.0)
::: solution
import math


def solve_quad(a, b, c):
    delta = b ** 2 - 4 * a * c
    if delta < 0:
        return "No Solution"
    if delta == 0:
        return -b / (2 * a)
    sq = math.sqrt(delta)
    return (-b + sq) / (2 * a), (-b - sq) / (2 * a)
::: tests
1, -3, 2 ==> (2.0, 1.0)
1, 2, 1 ==> -1.0
1, 0, 1 ==> "No Solution"
::: hidden
2, -7, 3 ==> (3.0, 0.5)
-1, 0, 4 ==> (-2.0, 2.0)
::: hints
- Thứ tự trong tuple: nghiệm với dấu `+` trước.
- Chú ý ngoặc: `(2 * a)` – viết `-b / 2 * a` là sai!
::: explain
`-b / 2 * a` được tính là `(-b / 2) * a`. Lỗi ưu tiên toán tử này rất phổ biến.

===== tt206
@title: The Archive of Words – tần suất từ
@level: medium
@topic: string
@source: Tuyển tập – P2.6
@fn: analyze_archive
::: statement
Cho đoạn văn (có chữ hoa/thường, dấu câu, nhiều khoảng trắng). Viết hàm `analyze_archive(text)` trả về tuple:
1. dict tần suất từ (sau khi **chuyển chữ thường** và **bỏ mọi ký tự không phải chữ/số/khoảng trắng**), theo thứ tự xuất hiện
2. list **3 từ** xuất hiện nhiều nhất theo tần suất giảm dần (bằng nhau thì từ xuất hiện trước đứng trước)
3. từ **dài nhất** (bằng nhau lấy từ đứng trước); văn bản rỗng thì `""`

```
analyze_archive("Magic is in the air. The magic of wisdom, the magic of code!")
# ({'magic': 3, 'is': 1, 'in': 1, 'the': 3, 'air': 1, 'of': 2, 'wisdom': 1, 'code': 1},
#  ['magic', 'the', 'of'], 'wisdom')
```
::: starter
def analyze_archive(text):
    pass


print(analyze_archive("Magic is in the air. The magic of wisdom, the magic of code!"))
::: solution
def analyze_archive(text):
    clean = "".join(c.lower() if c.isalnum() or c.isspace() else "" for c in text)
    words = clean.split()
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    top3 = sorted(freq, key=lambda w: freq[w], reverse=True)[:3]
    longest = max(words, key=len) if words else ""
    return freq, top3, longest
::: tests
"Magic is in the air. The magic of wisdom, the magic of code!" ==> ({'magic': 3, 'is': 1, 'in': 1, 'the': 3, 'air': 1, 'of': 2, 'wisdom': 1, 'code': 1}, ['magic', 'the', 'of'], 'wisdom')
::: hidden
"" ==> ({}, [], "")
"A a A, b! B c" ==> ({'a': 3, 'b': 2, 'c': 1}, ['a', 'b', 'c'], 'a')
"Data-driven decisions; data matters." ==> ({'datadriven': 1, 'decisions': 1, 'data': 1, 'matters': 1}, ['datadriven', 'decisions', 'data'], 'datadriven')
::: hints
- Làm sạch: giữ ký tự nếu `c.isalnum() or c.isspace()`.
- `sorted(..., reverse=True)` là **ổn định** nên các từ cùng tần suất giữ thứ tự xuất hiện.
::: explain
(Đề PDF ghi `'the': 2` là sai – "The" viết hoa cũng là "the" sau khi chuyển chữ thường, nên `'the': 3`.)

===== tt207
@title: The Echo of Repetition
@level: easy
@topic: collections
@source: Tuyển tập – P2.7
@fn: echo_repetition
::: statement
Viết hàm `echo_repetition(lst)` trả về tuple:
1. list phần tử **phân biệt** theo thứ tự xuất hiện đầu tiên
2. dict tần suất (theo thứ tự xuất hiện)
3. phần tử xuất hiện **nhiều nhất** (bằng nhau lấy phần tử xuất hiện trước); list rỗng → `None`

`echo_repetition([3, 5, 3, 2, 5, 3, 1])` → `([3, 5, 2, 1], {3: 3, 5: 2, 2: 1, 1: 1}, 3)`
::: starter
def echo_repetition(lst):
    pass


print(echo_repetition([3, 5, 3, 2, 5, 3, 1]))
::: solution
def echo_repetition(lst):
    freq = {}
    for x in lst:
        freq[x] = freq.get(x, 0) + 1
    most = max(freq, key=freq.get) if freq else None
    return list(freq), freq, most
::: tests
[3, 5, 3, 2, 5, 3, 1] ==> ([3, 5, 2, 1], {3: 3, 5: 2, 2: 1, 1: 1}, 3)
::: hidden
[] ==> ([], {}, None)
['b', 'a', 'a', 'b'] ==> (['b', 'a'], {'b': 2, 'a': 2}, 'b')
::: hints
- Dict trong Python 3.7+ **giữ thứ tự chèn** ⇒ `list(freq)` chính là các phần tử phân biệt theo thứ tự xuất hiện.
- `list(set(lst))` **không** giữ thứ tự.
::: explain
`max(freq, key=freq.get)` trả về key có value lớn nhất, gặp hoà thì lấy key đứng trước.

===== tt208
@title: The Prime Oracle
@level: medium
@topic: algo
@source: Tuyển tập – P2.8
@fn: prime_oracle
::: statement
Viết hàm `prime_oracle(lst)` trả về tuple:
1. list các số nguyên tố trong lst (giữ thứ tự)
2. số lượng số nguyên tố
3. số nguyên tố lớn nhất
4. số nguyên tố **nhỏ nhất lớn hơn** số nguyên tố lớn nhất

Nếu không có số nguyên tố: `([], 0, None, None)`.

`prime_oracle([10, 3, 7, 11, 4, 13, 17, 8])` → `([3, 7, 11, 13, 17], 5, 17, 19)`
::: starter
def prime_oracle(lst):
    pass


print(prime_oracle([10, 3, 7, 11, 4, 13, 17, 8]))
::: solution
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True


def prime_oracle(lst):
    primes = [x for x in lst if is_prime(x)]
    if not primes:
        return [], 0, None, None
    big = max(primes)
    nxt = big + 1
    while not is_prime(nxt):
        nxt += 1
    return primes, len(primes), big, nxt
::: tests
[10, 3, 7, 11, 4, 13, 17, 8] ==> ([3, 7, 11, 13, 17], 5, 17, 19)
::: hidden
[] ==> ([], 0, None, None)
[1, 4, 6] ==> ([], 0, None, None)
[2] ==> ([2], 1, 2, 3)
[23, 2, 23] ==> ([23, 2, 23], 3, 23, 29)
::: hints
- Tái sử dụng hàm `is_prime`.
::: explain
Xử lý trường hợp đặc biệt (không có số nguyên tố) **trước** để tránh `max([])`.

===== tt209
@title: The Ancient Archive – khoảng cách Euclid
@level: medium
@topic: collections
@source: Tuyển tập – P2.9
@fn: analyze_artifacts
::: statement
`artifacts` là list dict có các key `ID`, `Name`, `Value`, `Location` (tuple (x, y)). Viết hàm `analyze_artifacts(artifacts)` trả về tuple:
1. số artifact
2. **tên** artifact có Value cao nhất
3. list **tên** của 5 artifact khác **gần nhất** với artifact đó (khoảng cách Euclid tăng dần)

| ID | Name | Value | Location |
|---|---|---|---|
| 1 | Crystal Orb | 120 | (2, 3) |
| 2 | Phoenix Feather | 300 | (5, 7) |
| 3 | Silver Rune | 250 | (6, 9) |
| 4 | Dragon Scale | 500 | (7, 8) |
| 5 | Mystic Scroll | 150 | (1, 2) |
| 6 | Golden Chalice | 450 | (9, 10) |

→ `(6, 'Dragon Scale', ['Silver Rune', 'Phoenix Feather', 'Golden Chalice', 'Crystal Orb', 'Mystic Scroll'])`
::: starter
import math


def analyze_artifacts(artifacts):
    pass


data = [
    {'ID': 1, 'Name': 'Crystal Orb', 'Value': 120, 'Location': (2, 3)},
    {'ID': 2, 'Name': 'Phoenix Feather', 'Value': 300, 'Location': (5, 7)},
    {'ID': 3, 'Name': 'Silver Rune', 'Value': 250, 'Location': (6, 9)},
    {'ID': 4, 'Name': 'Dragon Scale', 'Value': 500, 'Location': (7, 8)},
    {'ID': 5, 'Name': 'Mystic Scroll', 'Value': 150, 'Location': (1, 2)},
    {'ID': 6, 'Name': 'Golden Chalice', 'Value': 450, 'Location': (9, 10)},
]
print(analyze_artifacts(data))
::: solution
import math


def analyze_artifacts(artifacts):
    best = max(artifacts, key=lambda a: a['Value'])
    bx, by = best['Location']
    others = [a for a in artifacts if a['ID'] != best['ID']]
    others.sort(key=lambda a: math.hypot(a['Location'][0] - bx, a['Location'][1] - by))
    return len(artifacts), best['Name'], [a['Name'] for a in others[:5]]
::: tests
[{'ID': 1, 'Name': 'Crystal Orb', 'Value': 120, 'Location': (2, 3)}, {'ID': 2, 'Name': 'Phoenix Feather', 'Value': 300, 'Location': (5, 7)}, {'ID': 3, 'Name': 'Silver Rune', 'Value': 250, 'Location': (6, 9)}, {'ID': 4, 'Name': 'Dragon Scale', 'Value': 500, 'Location': (7, 8)}, {'ID': 5, 'Name': 'Mystic Scroll', 'Value': 150, 'Location': (1, 2)}, {'ID': 6, 'Name': 'Golden Chalice', 'Value': 450, 'Location': (9, 10)}] ==> (6, 'Dragon Scale', ['Silver Rune', 'Phoenix Feather', 'Golden Chalice', 'Crystal Orb', 'Mystic Scroll'])
::: hidden
[{'ID': 1, 'Name': 'A', 'Value': 1, 'Location': (0, 0)}, {'ID': 2, 'Name': 'B', 'Value': 9, 'Location': (3, 4)}] ==> (2, 'B', ['A'])
[{'ID': 1, 'Name': 'A', 'Value': 5, 'Location': (0, 0)}, {'ID': 2, 'Name': 'B', 'Value': 1, 'Location': (10, 0)}, {'ID': 3, 'Name': 'C', 'Value': 2, 'Location': (0, 1)}, {'ID': 4, 'Name': 'D', 'Value': 3, 'Location': (2, 2)}, {'ID': 5, 'Name': 'E', 'Value': 4, 'Location': (-1, 0)}, {'ID': 6, 'Name': 'F', 'Value': 0, 'Location': (5, 5)}, {'ID': 7, 'Name': 'G', 'Value': 2, 'Location': (0, -3)}] ==> (7, 'A', ['C', 'E', 'D', 'G', 'F'])
::: hints
- Khoảng cách: `math.hypot(dx, dy)` hoặc `math.sqrt(dx**2 + dy**2)`.
- Loại chính artifact đó ra trước khi sắp xếp.
::: explain
Đây là ý tưởng của **k-Nearest Neighbors**: tìm k điểm gần nhất theo khoảng cách Euclid.

===== tt210
@title: The Digit Oracle
@level: easy
@topic: algo
@source: Tuyển tập – P2.10
@fn: analyze_perfect
::: statement
Số nguyên dương là "perfect" nếu chia hết cho tổng các chữ số của nó. Viết hàm `analyze_perfect(lst)` trả về tuple `(list số perfect, số lượng, số perfect lớn nhất hoặc None)`.

`analyze_perfect([18, 21, 12, 19, 20])` → `([18, 21, 12, 20], 4, 21)`
::: starter
def digit_sum(n):
    pass


def is_perfect(n):
    pass


def analyze_perfect(lst):
    pass


print(analyze_perfect([18, 21, 12, 19, 20]))
::: solution
def digit_sum(n):
    return sum(int(d) for d in str(n))


def is_perfect(n):
    s = digit_sum(n)
    return s > 0 and n % s == 0


def analyze_perfect(lst):
    perfect = [x for x in lst if is_perfect(x)]
    return perfect, len(perfect), max(perfect) if perfect else None
::: tests
[18, 21, 12, 19, 20] ==> ([18, 21, 12, 20], 4, 21)
::: hidden
[] ==> ([], 0, None)
[19, 23] ==> ([], 0, None)
[1, 2, 3, 111] ==> ([1, 2, 3, 111], 4, 111)
::: hints
- Chia thành 3 hàm nhỏ như đề gợi ý.
::: explain
Biểu thức `A if cond else B` dùng được ngay trong `return`.

===== tt213
@title: The Mirror Pairs
@level: easy
@topic: algo
@source: Tuyển tập – P2.13
@fn: count_mirror_pairs
::: statement
Đếm số cặp chỉ số **(i, j)** với **i < j** và `lst[i] == lst[j]`. Viết hàm `count_mirror_pairs(lst)`.

`count_mirror_pairs([1, 2, 1, 2, 1])` → `4`
::: starter
def count_mirror_pairs(lst):
    pass


print(count_mirror_pairs([1, 2, 1, 2, 1]))  # 4
::: solution
def count_mirror_pairs(lst):
    seen = {}
    pairs = 0
    for x in lst:
        pairs += seen.get(x, 0)
        seen[x] = seen.get(x, 0) + 1
    return pairs
::: tests
[1, 2, 1, 2, 1] ==> 4
::: hidden
[] ==> 0
['a', 'a', 'a', 'a'] ==> 6
[1, 2, 3] ==> 0
::: hints
- Cách dễ: 2 vòng lặp `for i` / `for j in range(i + 1, n)`.
- Cách nhanh: phần tử xuất hiện k lần tạo k·(k−1)/2 cặp.
::: explain
Lời giải O(n): khi gặp x, nó tạo cặp với **mọi** x đã gặp trước đó.

===== tt301
@title: The Rabbit Population – Fibonacci
@level: easy
@topic: algo
@source: Tuyển tập – P3.1
@fn: rabbit_population
::: statement
Dãy Fibonacci bắt đầu `0, 1, 1, 2, 3, 5, …`. Viết hàm `rabbit_population(n)` trả về tuple `(dãy n số đầu tiên, số thứ n)`. Nếu n ≤ 0 trả về `([], None)`.

`rabbit_population(10)` → `([0, 1, 1, 2, 3, 5, 8, 13, 21, 34], 34)`
::: starter
def rabbit_population(n):
    pass


print(rabbit_population(10))
::: solution
def rabbit_population(n):
    if n <= 0:
        return [], None
    seq = [0, 1][:n]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq, seq[-1]
::: tests
10 ==> ([0, 1, 1, 2, 3, 5, 8, 13, 21, 34], 34)
1 ==> ([0], 0)
::: hidden
0 ==> ([], None)
2 ==> ([0, 1], 1)
3 ==> ([0, 1, 1], 1)
::: hints
- Bắt đầu với `[0, 1]`, thêm `seq[-1] + seq[-2]` cho đến khi đủ n phần tử.
- Cẩn thận n = 1 (chỉ có `[0]`).
::: explain
Chỉ số âm: `seq[-1]` là phần tử cuối, `seq[-2]` là phần tử áp chót.

===== tt302
@title: The Signal – tích chập (convolution)
@level: medium
@topic: algo
@source: Tuyển tập – P3.2
@fn: process_signal
::: statement
Thực hiện tích chập kiểu "valid" (cửa sổ trượt): với mỗi vị trí i, nhân từng phần tử của `signal[i : i+k]` với `kernel` rồi cộng lại.

`process_signal([1, 5, 2], [0.5, 0.5])` → `[3.0, 3.5]`
::: starter
def process_signal(signal, kernel):
    pass


print(process_signal([1, 5, 2], [0.5, 0.5]))  # [3.0, 3.5]
::: solution
def process_signal(signal, kernel):
    k = len(kernel)
    return [sum(s * w for s, w in zip(signal[i:i + k], kernel))
            for i in range(len(signal) - k + 1)]
::: tests
[1, 5, 2], [0.5, 0.5] ==> [3.0, 3.5]
::: hidden
[1, 2, 3, 4, 5], [1, 0, -1] ==> [-2, -2, -2]
[1, 2], [1, 1, 1] ==> []
[2, 4, 6, 8], [0.25] ==> [0.5, 1.0, 1.5, 2.0]
::: hints
- Số vị trí cửa sổ: `len(signal) - len(kernel) + 1`.
- `zip(a, b)` ghép từng cặp phần tử.
::: explain
Trung bình trượt (moving average) chính là tích chập với kernel `[1/k]*k` – rất hay dùng để làm mượt chuỗi thời gian giá cổ phiếu.

===== tt303
@title: The Grid Path – đường đi chi phí nhỏ nhất
@level: hard
@topic: algo
@source: Tuyển tập – P3.3
@fn: min_path_sum
::: statement
Lưới số `grid`; đi từ góc trên-trái đến góc dưới-phải, **chỉ đi sang phải hoặc xuống dưới**. Chi phí là tổng các ô đi qua (gồm cả ô đầu và cuối). Viết hàm `min_path_sum(grid)` trả về chi phí nhỏ nhất.

`min_path_sum([[1, 3], [4, 1]])` → `5`
::: starter
def min_path_sum(grid):
    pass


print(min_path_sum([[1, 3], [4, 1]]))  # 5
::: solution
def min_path_sum(grid):
    R, C = len(grid), len(grid[0])
    dp = [[0] * C for _ in range(R)]
    for i in range(R):
        for j in range(C):
            if i == 0 and j == 0:
                dp[i][j] = grid[0][0]
            elif i == 0:
                dp[i][j] = dp[i][j - 1] + grid[i][j]
            elif j == 0:
                dp[i][j] = dp[i - 1][j] + grid[i][j]
            else:
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    return dp[-1][-1]
::: tests
[[1, 3], [4, 1]] ==> 5
[[1, 3, 1], [1, 5, 1], [4, 2, 1]] ==> 7
::: hidden
[[5]] ==> 5
[[1, 2, 3]] ==> 6
[[1], [2], [3]] ==> 6
[[9, 1, 1, 1], [1, 9, 9, 1], [1, 1, 1, 1]] ==> 14
::: hints
- Quy hoạch động: `dp[i][j]` = chi phí nhỏ nhất để đến ô (i, j).
- Ô (i, j) chỉ đến được từ ô trên `(i-1, j)` hoặc ô trái `(i, j-1)`.
::: explain
Tạo ma trận bằng `[[0] * C for _ in range(R)]`. **Đừng** dùng `[[0] * C] * R` – các hàng sẽ là cùng một list!

===== tt304
@title: The Maze – ô an toàn
@level: easy
@topic: basics
@source: Tuyển tập – P3.4
@fn: is_safe
::: statement
Bản đồ là list chuỗi, `.` là đường, `#` là tường. Viết hàm `is_safe(x, y, game_map)` trả về `True` nếu (x, y) – x là **hàng**, y là **cột** – nằm trong bản đồ **và** không phải tường.

`is_safe(0, 2, ['..#', '...', '#..'])` → `False`
::: starter
def is_safe(x, y, game_map):
    pass


print(is_safe(0, 2, ['..#', '...', '#..']))  # False
::: solution
def is_safe(x, y, game_map):
    if not (0 <= x < len(game_map) and 0 <= y < len(game_map[0])):
        return False
    return game_map[x][y] != '#'
::: tests
0, 2, ['..#', '...', '#..'] ==> False
1, 1, ['..#', '...', '#..'] ==> True
::: hidden
-1, 0, ['..#', '...', '#..'] ==> False
3, 0, ['..#', '...', '#..'] ==> False
2, 0, ['..#', '...', '#..'] ==> False
0, 3, ['..#', '...', '#..'] ==> False
2, 2, ['..#', '...', '#..'] ==> True
::: hints
- Kiểm tra biên **trước** khi truy cập `game_map[x][y]` để tránh IndexError.
- Chỉ số âm trong Python không báo lỗi (lấy từ cuối) – nên phải kiểm tra `0 <= x`.
::: explain
So sánh chuỗi `0 <= x < n` là cú pháp đặc biệt rất tiện của Python.

===== tt306
@title: The Clusters – gán cụm k-Means
@level: easy
@topic: ml
@source: Tuyển tập – P3.6
@fn: assign_cluster
::: statement
Cho điểm A và hai tâm cụm C1, C2 (tuple (x, y)). Viết hàm `assign_cluster(a, c1, c2)` trả về tuple `(d1, d2, nhan)`:
- d1, d2: khoảng cách Euclid từ A đến C1, C2 (làm tròn 2 chữ số)
- nhan: `"C1"` nếu d1 ≤ d2, ngược lại `"C2"`

`assign_cluster((1, 1), (1, 0), (10, 11))` → `(1.0, 13.45, 'C1')`
::: starter
import math


def assign_cluster(a, c1, c2):
    pass


print(assign_cluster((1, 1), (1, 0), (10, 11)))
::: solution
import math


def assign_cluster(a, c1, c2):
    d1 = math.dist(a, c1)
    d2 = math.dist(a, c2)
    return round(d1, 2), round(d2, 2), "C1" if d1 <= d2 else "C2"
::: tests
(1, 1), (1, 0), (10, 11) ==> (1.0, 13.45, 'C1')
::: hidden
(5, 5), (0, 0), (6, 6) ==> (7.07, 1.41, 'C2')
(0, 0), (1, 0), (-1, 0) ==> (1.0, 1.0, 'C1')
::: hints
- `math.dist(p, q)` tính khoảng cách Euclid.
::: explain
Đây chính là bước **gán cụm** trong thuật toán K-Means (bước còn lại là cập nhật tâm = trung bình các điểm trong cụm).

===== tt307
@title: The Unknown Plant – 1-NN
@level: easy
@topic: ml
@source: Tuyển tập – P3.7
@fn: knn_predict
::: statement
Dữ liệu huấn luyện 1 chiều `x_train` với nhãn `y_labels`. Viết hàm `knn_predict(x_train, y_labels, target)` trả về **nhãn của điểm gần nhất** (|x − target| nhỏ nhất; bằng nhau lấy điểm đứng trước).

`knn_predict([1, 2, 10], ['Small', 'Small', 'Big'], 3)` → `'Small'`
::: starter
def knn_predict(x_train, y_labels, target):
    pass


print(knn_predict([1, 2, 10], ['Small', 'Small', 'Big'], 3))  # Small
::: solution
def knn_predict(x_train, y_labels, target):
    best = min(range(len(x_train)), key=lambda i: abs(x_train[i] - target))
    return y_labels[best]
::: tests
[1, 2, 10], ['Small', 'Small', 'Big'], 3 ==> 'Small'
[1, 2, 10], ['Small', 'Small', 'Big'], 7 ==> 'Big'
::: hidden
[5], ['X'], 100 ==> 'X'
[0, 10], ['A', 'B'], 5 ==> 'A'
[1.5, 2.5, 3.5], ['a', 'b', 'c'], 3.4 ==> 'c'
::: hints
- Tìm **chỉ số** i có `abs(x_train[i] - target)` nhỏ nhất: `min(range(n), key=...)`.
::: explain
`min(range(n), key=f)` trả về chỉ số (argmin) – tương đương `np.argmin`.

===== tt308
@title: The Geomancer's Trial
@level: hard
@topic: algo
@source: Tuyển tập – P3.8
@fn: geomancer_trial
::: statement
Cho 4 điểm `p1, p2, p3, p4`. Viết hàm `geomancer_trial(p1, p2, p3, p4)` trả về tuple:
1. `True` nếu có **3 điểm bất kỳ thẳng hàng**, ngược lại `False`
2. điểm **đầu tiên** (theo thứ tự p1..p4) nằm **trong hoặc trên cạnh** tam giác tạo bởi 3 điểm còn lại; không có thì `None`
3. cặp điểm **gần nhau nhất** dạng tuple `(pi, pj)` với i < j (bằng nhau lấy cặp xét trước)
4. khoảng cách của cặp đó, làm tròn 2 chữ số

`geomancer_trial((0, 0), (4, 0), (0, 4), (1, 1))` → `(False, (1, 1), ((0, 0), (1, 1)), 1.41)`
::: starter
import math
from itertools import combinations


def geomancer_trial(p1, p2, p3, p4):
    pass


print(geomancer_trial((0, 0), (4, 0), (0, 4), (1, 1)))
::: solution
import math
from itertools import combinations


def area2(a, b, c):
    # hai lần diện tích (có dấu) của tam giác abc
    return a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])


def geomancer_trial(p1, p2, p3, p4):
    pts = [p1, p2, p3, p4]
    colinear = any(area2(a, b, c) == 0 for a, b, c in combinations(pts, 3))
    inside = None
    for i, p in enumerate(pts):
        a, b, c = [q for j, q in enumerate(pts) if j != i]
        whole = abs(area2(a, b, c))
        parts = abs(area2(p, a, b)) + abs(area2(p, b, c)) + abs(area2(p, a, c))
        if whole > 0 and parts == whole:
            inside = p
            break
    pair = min(combinations(pts, 2), key=lambda pq: math.dist(*pq))
    return colinear, inside, pair, round(math.dist(*pair), 2)
::: tests
(0, 0), (4, 0), (0, 4), (1, 1) ==> (False, (1, 1), ((0, 0), (1, 1)), 1.41)
::: hidden
(0, 0), (1, 1), (2, 2), (5, 0) ==> (True, (1, 1), ((0, 0), (1, 1)), 1.41)
(0, 0), (10, 0), (0, 10), (10, 10) ==> (False, None, ((0, 0), (10, 0)), 10.0)
(2, 0), (0, 0), (4, 0), (2, 3) ==> (True, (2, 0), ((2, 0), (0, 0)), 2.0)
::: hints
- 3 điểm thẳng hàng ⇔ diện tích tam giác = 0: `x1(y2−y3) + x2(y3−y1) + x3(y1−y2) == 0`.
- P nằm trong/trên tam giác ABC ⇔ S(PAB) + S(PBC) + S(PCA) = S(ABC).
- `itertools.combinations(pts, 2)` liệt kê mọi cặp.
::: explain
Dùng "2 lần diện tích" (số nguyên) thay vì diện tích ×0.5 giúp so sánh chính xác, không lo sai số float. Tam giác suy biến (3 điểm thẳng hàng) không có "bên trong".

===== tt309
@title: The Triad of Balance – 3SUM
@level: hard
@topic: algo
@source: Tuyển tập – P3.9
@fn: find_triad_balance
::: statement
Tìm mọi bộ ba **không trùng lặp** (a, b, c) trong list (có thể có số trùng) sao cho a + b + c = 0. Mỗi bộ là tuple **sắp xếp không giảm**; danh sách kết quả sắp xếp tăng dần.

Viết hàm `find_triad_balance(nums)` trả về `(danh_sach_bo_ba, so_luong)`.

`find_triad_balance([-1, 0, 1, 2, -1, -4])` → `([(-1, -1, 2), (-1, 0, 1)], 2)`
::: starter
def find_triad_balance(nums):
    pass


print(find_triad_balance([-1, 0, 1, 2, -1, -4]))
::: solution
def find_triad_balance(nums):
    a = sorted(nums)
    found = set()
    n = len(a)
    for i in range(n - 2):
        lo, hi = i + 1, n - 1
        while lo < hi:
            s = a[i] + a[lo] + a[hi]
            if s == 0:
                found.add((a[i], a[lo], a[hi]))
                lo += 1
                hi -= 1
            elif s < 0:
                lo += 1
            else:
                hi -= 1
    result = sorted(found)
    return result, len(result)
::: tests
[-1, 0, 1, 2, -1, -4] ==> ([(-1, -1, 2), (-1, 0, 1)], 2)
::: hidden
[] ==> ([], 0)
[0, 0, 0, 0] ==> ([(0, 0, 0)], 1)
[1, 2, 3] ==> ([], 0)
[-2, 0, 1, 1, 2, -1, -4, 3] ==> ([(-4, 1, 3), (-2, -1, 3), (-2, 0, 2), (-2, 1, 1), (-1, 0, 1)], 5)
::: hints
- Cách dễ: duyệt `combinations(nums, 3)`, `tuple(sorted(bo))` rồi cho vào `set` để loại trùng.
- Cách nhanh: sắp xếp + hai con trỏ (O(n²)).
::: explain
Lưu tuple vào `set` để loại trùng (tuple hashable, list thì không).

===== tt310
@title: The Forbidden Passage – đếm đường đi tránh quái
@level: hard
@topic: algo
@source: Tuyển tập – P3.10
@fn: forbidden_passage
::: statement
Lưới 8×8, toạ độ (hàng, cột) từ 1 đến 8. Đi từ **(1, 1)** đến **(8, 8)**, mỗi bước chỉ **tăng hàng hoặc tăng cột** 1 đơn vị, không được đi vào ô có quái vật (`monsters` là list toạ độ).

Viết hàm `forbidden_passage(monsters)` trả về **số đường đi an toàn**; nếu không có đường nào trả về `"No safe path"`.

`forbidden_passage([])` → `3432`
::: starter
def forbidden_passage(monsters):
    pass


print(forbidden_passage([]))  # 3432
::: solution
def forbidden_passage(monsters):
    bad = set(monsters)
    dp = [[0] * 9 for _ in range(9)]
    for i in range(1, 9):
        for j in range(1, 9):
            if (i, j) in bad:
                dp[i][j] = 0
            elif i == 1 and j == 1:
                dp[i][j] = 1
            else:
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    return dp[8][8] if dp[8][8] > 0 else "No safe path"
::: tests
[] ==> 3432
[(1, 2), (2, 1)] ==> "No safe path"
::: hidden
[(8, 8)] ==> "No safe path"
[(4, 4)]
[(2, 2), (3, 5), (6, 3), (7, 7)]
[(1, 1)] ==> "No safe path"
::: hints
- Số cách đến ô (i, j) = số cách đến ô trên + số cách đến ô trái.
- Ô có quái: số cách = 0.
::: explain
Không có quái: số đường = C(14, 7) = 3432 (chọn 7 bước "xuống" trong 14 bước). DP đếm đường đi là dạng hay ra.

===== tt311
@title: The Sage of Polynomials
@level: hard
@topic: string
@source: Tuyển tập – P3.11
@fn: sage_polynomials
::: statement
Hai đa thức dạng chuỗi như `"2x^2 + 3x + 1"`, `"x - 1"` (hệ số nguyên, có thể có khoảng trắng). Viết hàm `sage_polynomials(p1, p2)` trả về tuple `(tổng, tích)` dạng chuỗi theo quy tắc:
- các hạng tử theo **bậc giảm dần**, bỏ hạng tử hệ số 0, **không có khoảng trắng**
- hệ số 1 / −1 viết là `x`, `-x`, `x^2`, `-x^2` (trừ hằng số); bậc 1 viết `x`, bậc 0 chỉ viết số
- đa thức 0 viết `"0"`

`sage_polynomials("2x^2 + 3x + 1", "x - 1")` → `('2x^2+4x', '2x^3+x^2-2x-1')`
::: starter
def sage_polynomials(p1, p2):
    pass


print(sage_polynomials("2x^2 + 3x + 1", "x - 1"))
::: solution
def parse_poly(s):
    s = s.replace(" ", "").replace("-", "+-")
    poly = {}
    for term in s.split("+"):
        if not term:
            continue
        if "x" in term:
            coef, _, exp = term.partition("x")
            coef = 1 if coef == "" else -1 if coef == "-" else int(coef)
            exp = int(exp[1:]) if exp.startswith("^") else 1
        else:
            coef, exp = int(term), 0
        poly[exp] = poly.get(exp, 0) + coef
    return poly


def to_string(poly):
    terms = []
    for exp in sorted(poly, reverse=True):
        c = poly[exp]
        if c == 0:
            continue
        if exp == 0:
            terms.append(str(c))
            continue
        coef = "" if c == 1 else "-" if c == -1 else str(c)
        terms.append(coef + ("x" if exp == 1 else f"x^{exp}"))
    return "+".join(terms).replace("+-", "-") if terms else "0"


def sage_polynomials(p1, p2):
    a, b = parse_poly(p1), parse_poly(p2)
    total = dict(a)
    for e, c in b.items():
        total[e] = total.get(e, 0) + c
    prod = {}
    for e1, c1 in a.items():
        for e2, c2 in b.items():
            prod[e1 + e2] = prod.get(e1 + e2, 0) + c1 * c2
    return to_string(total), to_string(prod)
::: tests
"2x^2 + 3x + 1", "x - 1" ==> ('2x^2+4x', '2x^3+x^2-2x-1')
::: hidden
"x", "-x" ==> ('0', '-x^2')
"5", "3" ==> ('8', '15')
"-x^3 + 2", "x^3 - 2x + 4" ==> ('-2x+6', '-x^6+2x^4-2x^3-4x+8')
"x + 1", "x + 1" ==> ('2x+2', 'x^2+2x+1')
::: hints
- Mẹo parse: thay `"-"` bằng `"+-"` rồi `split("+")` – mỗi phần là một hạng tử có dấu.
- Lưu đa thức bằng dict `{bậc: hệ số}`. Nhân: cộng bậc, nhân hệ số.
::: explain
Biểu diễn dữ liệu tốt (dict bậc → hệ số) làm phần tính toán trở nên đơn giản; phần khó nhất là định dạng chuỗi đầu ra.

===== tt312
@title: Chuẩn hoá Min-Max
@level: easy
@topic: ml
@source: Tuyển tập – Bonus
@fn: normalize_data
::: statement
Viết hàm `normalize_data(raw_scores)` chuẩn hoá về [0, 1]: **x' = (x − min) / (max − min)**. List rỗng → `[]`; mọi giá trị bằng nhau → toàn `0.0`.

`normalize_data([2, 4, 6])` → `[0.0, 0.5, 1.0]`
::: starter
def normalize_data(raw_scores):
    pass


print(normalize_data([2, 4, 6]))  # [0.0, 0.5, 1.0]
::: solution
def normalize_data(raw_scores):
    if not raw_scores:
        return []
    lo, hi = min(raw_scores), max(raw_scores)
    if lo == hi:
        return [0.0] * len(raw_scores)
    return [(x - lo) / (hi - lo) for x in raw_scores]
::: tests
[2, 4, 6] ==> [0.0, 0.5, 1.0]
::: hidden
[] ==> []
[5, 5] ==> [0.0, 0.0]
[10, 0, 5, 2.5] ==> [1.0, 0.0, 0.5, 0.25]
::: hints
- Xử lý 2 trường hợp đặc biệt trước để tránh chia cho 0.
::: explain
Min-Max scaling là bước tiền xử lý quen thuộc trước khi chạy KNN / K-Means (thư viện: `sklearn.preprocessing.MinMaxScaler`).

===== tt401
@title: Mất vé xe tháng
@level: easy
@topic: collections
@source: Tuyển tập – P4.1
@fn: analyze_lost_tickets
::: statement
`days` là list (tăng dần) các ngày trong năm bị mất vé. Viết hàm `analyze_lost_tickets(days)` trả về tuple:
1. số lần mất, 2. ngày sớm nhất, 3. ngày muộn nhất,
4. list khoảng cách giữa các lần liên tiếp,
5. dự đoán 3 ngày mất tiếp theo, giả sử khoảng cách tiếp theo **bằng khoảng cách đầu tiên** (nếu chỉ có 1 ngày thì dùng khoảng cách 7).

`analyze_lost_tickets([3, 10, 17, 24])` → `(4, 3, 24, [7, 7, 7], [31, 38, 45])`
::: starter
def analyze_lost_tickets(days):
    pass


print(analyze_lost_tickets([3, 10, 17, 24]))
::: solution
def analyze_lost_tickets(days):
    diffs = [days[i + 1] - days[i] for i in range(len(days) - 1)]
    step = diffs[0] if diffs else 7
    nxt = [days[-1] + step * k for k in range(1, 4)]
    return len(days), min(days), max(days), diffs, nxt
::: tests
[3, 10, 17, 24] ==> (4, 3, 24, [7, 7, 7], [31, 38, 45])
::: hidden
[100] ==> (1, 100, 100, [], [107, 114, 121])
[1, 5, 6] ==> (3, 1, 6, [4, 1], [10, 14, 18])
::: hints
- Khoảng cách: `[days[i+1] - days[i] for i in range(len(days) - 1)]`.
::: explain
Hiệu các phần tử liên tiếp (`np.diff`, `Series.diff()`) là thao tác cơ bản khi phân tích chuỗi thời gian.

===== tt402
@title: Conan nhà tập – confusion matrix
@level: medium
@topic: eval
@source: Tuyển tập – P4.2
@fn: analyze_camera_ai
::: statement
Camera AI dự đoán `y_pred` (1 = có trộm, 0 = không) so với thực tế `y_true`. Viết hàm `analyze_camera_ai(y_true, y_pred)` trả về tuple `(TP, TN, FP, FN, precision, recall)`:
- precision = TP / (TP + FP), recall = TP / (TP + FN) (mẫu số 0 thì trả 0)
- precision, recall **làm tròn 2 chữ số**

`analyze_camera_ai([1, 0, 1, 1, 0], [1, 1, 0, 1, 0])` → `(2, 1, 1, 1, 0.67, 0.67)`
::: starter
def analyze_camera_ai(y_true, y_pred):
    pass


print(analyze_camera_ai([1, 0, 1, 1, 0], [1, 1, 0, 1, 0]))
::: solution
def analyze_camera_ai(y_true, y_pred):
    pairs = list(zip(y_true, y_pred))
    tp = sum(1 for t, p in pairs if t == 1 and p == 1)
    tn = sum(1 for t, p in pairs if t == 0 and p == 0)
    fp = sum(1 for t, p in pairs if t == 0 and p == 1)
    fn = sum(1 for t, p in pairs if t == 1 and p == 0)
    precision = round(tp / (tp + fp), 2) if tp + fp else 0
    recall = round(tp / (tp + fn), 2) if tp + fn else 0
    return tp, tn, fp, fn, precision, recall
::: tests
[1, 0, 1, 1, 0], [1, 1, 0, 1, 0] ==> (2, 1, 1, 1, 0.67, 0.67)
::: hidden
[0, 0], [0, 0] ==> (0, 2, 0, 0, 0, 0)
[1, 1, 1, 0], [1, 0, 0, 0] ==> (1, 1, 0, 2, 1.0, 0.33)
::: hints
- `zip(y_true, y_pred)` ghép cặp (thực tế, dự đoán).
- TP: thật 1 – đoán 1; FP: thật 0 – đoán 1 (báo nhầm); FN: thật 1 – đoán 0 (bỏ sót).
::: explain
Precision: trong những lần báo động, bao nhiêu % đúng. Recall: trong những vụ trộm thật, bắt được bao nhiêu %.

===== tt403
@title: Đội bóng FTU
@level: medium
@topic: collections
@source: Tuyển tập – P4.3
@fn: analyze_football_team
::: statement
`players` là dict `{tên: {'pos': vị trí, 'skill': điểm}}` (skill đôi một khác nhau). Viết hàm `analyze_football_team(players)` trả về tuple:
1. dict `{vị trí: số cầu thủ}`
2. dict `{vị trí: (tên, skill)}` cầu thủ giỏi nhất mỗi vị trí
3. list tên **11 cầu thủ skill cao nhất** (giảm dần theo skill), bất kể vị trí
::: starter
def analyze_football_team(players):
    pass


players = {'An': {'pos': 'FW', 'skill': 88}, 'Bình': {'pos': 'GK', 'skill': 75},
           'Cường': {'pos': 'DF', 'skill': 80}, 'Dũng': {'pos': 'FW', 'skill': 91}}
print(analyze_football_team(players))
::: solution
def analyze_football_team(players):
    pos_count = {}
    best = {}
    for name, info in players.items():
        p, s = info['pos'], info['skill']
        pos_count[p] = pos_count.get(p, 0) + 1
        if p not in best or s > best[p][1]:
            best[p] = (name, s)
    top11 = sorted(players, key=lambda n: players[n]['skill'], reverse=True)[:11]
    return pos_count, best, top11
::: tests
{'An': {'pos': 'FW', 'skill': 88}, 'Bình': {'pos': 'GK', 'skill': 75}, 'Cường': {'pos': 'DF', 'skill': 80}, 'Dũng': {'pos': 'FW', 'skill': 91}} ==> ({'FW': 2, 'GK': 1, 'DF': 1}, {'FW': ('Dũng', 91), 'GK': ('Bình', 75), 'DF': ('Cường', 80)}, ['Dũng', 'An', 'Cường', 'Bình'])
::: hidden
{}
{'P1': {'pos': 'GK', 'skill': 60}, 'P2': {'pos': 'DF', 'skill': 61}, 'P3': {'pos': 'DF', 'skill': 62}, 'P4': {'pos': 'DF', 'skill': 63}, 'P5': {'pos': 'DF', 'skill': 64}, 'P6': {'pos': 'MF', 'skill': 65}, 'P7': {'pos': 'MF', 'skill': 66}, 'P8': {'pos': 'MF', 'skill': 67}, 'P9': {'pos': 'FW', 'skill': 68}, 'P10': {'pos': 'FW', 'skill': 69}, 'P11': {'pos': 'FW', 'skill': 70}, 'P12': {'pos': 'GK', 'skill': 71}, 'P13': {'pos': 'MF', 'skill': 59}}
::: hints
- Một vòng lặp duyệt `players.items()` có thể làm cả việc đếm và tìm max theo nhóm.
::: explain
"Đếm theo nhóm" và "max theo nhóm" – trong Pandas chính là `groupby('pos').size()` và `groupby('pos')['skill'].idxmax()`.

===== tt404
@title: Thường nhật của một Wibu
@level: medium
@topic: collections
@source: Tuyển tập – P4.4
@fn: wibu_schedule
::: statement
`anime_dict` = `{tên: (số tập đã xem, tổng số tập)}`. Viết hàm `wibu_schedule(anime_dict)` trả về tuple:
1. dict `{tên: "xx.x%"}` phần trăm hoàn thành (1 chữ số thập phân, tổng tập = 0 thì `"0.0%"`)
2. tên anime **chưa xong nhưng còn ít tập nhất** (bằng nhau lấy anime đứng trước); xem hết rồi thì `None`
3. số ngày cần để xem hết mọi anime nếu mỗi ngày xem **5 tập** (làm tròn lên)

`wibu_schedule({'Naruto': (200, 220), 'OnePiece': (1000, 1100), 'Conan': (30, 30)})` → `({'Naruto': '90.9%', 'OnePiece': '90.9%', 'Conan': '100.0%'}, 'Naruto', 24)`
::: starter
import math


def wibu_schedule(anime_dict):
    pass


print(wibu_schedule({'Naruto': (200, 220), 'OnePiece': (1000, 1100), 'Conan': (30, 30)}))
::: solution
import math


def wibu_schedule(anime_dict):
    analysis = {}
    remaining = {}
    for name, (watched, total) in anime_dict.items():
        pct = watched / total * 100 if total > 0 else 0
        analysis[name] = f"{pct:.1f}%"
        if total - watched > 0:
            remaining[name] = total - watched
    closest = min(remaining, key=remaining.get) if remaining else None
    days = math.ceil(sum(remaining.values()) / 5)
    return analysis, closest, days
::: tests
{'Naruto': (200, 220), 'OnePiece': (1000, 1100), 'Conan': (30, 30)} ==> ({'Naruto': '90.9%', 'OnePiece': '90.9%', 'Conan': '100.0%'}, 'Naruto', 24)
::: hidden
{} ==> ({}, None, 0)
{'A': (0, 0), 'B': (12, 12)} ==> ({'A': '0.0%', 'B': '100.0%'}, None, 0)
{'X': (1, 3), 'Y': (0, 2)} ==> ({'X': '33.3%', 'Y': '0.0%'}, 'X', 1)
::: hints
- f-string định dạng: `f"{pct:.1f}%"`.
- Làm tròn lên: `math.ceil`.
- Unpack tuple ngay trong vòng for: `for name, (w, t) in d.items()`.
::: explain
`math.ceil(x)` làm tròn **lên**, `round(x)` làm tròn **gần nhất** (và kiểu "banker's rounding": `round(2.5) == 2`!).

===== tt405
@title: Bài tập nhóm – phát hiện free-rider
@level: medium
@topic: collections
@source: Tuyển tập – P4.5
@fn: analyze_group_work
::: statement
`group_data = {tên: {'lines': số dòng code, 'commits': số commit}}`. Viết hàm `analyze_group_work(group_data)` trả về tuple:
1. tổng số dòng code, 2. tổng số commit,
3. dict `{tên: {'pct': % đóng góp theo số dòng (làm tròn 2 chữ số), 'is_freerider': bool}}` với free-rider là người có **pct < 15** hoặc **commits < 5**. (Tổng dòng = 0 thì pct = 0.)
::: starter
def analyze_group_work(group_data):
    pass


print(analyze_group_work({'Minh': {'lines': 150, 'commits': 12},
                          'Huy': {'lines': 200, 'commits': 15},
                          'Lan': {'lines': 30, 'commits': 3}}))
::: solution
def analyze_group_work(group_data):
    total_lines = sum(m['lines'] for m in group_data.values())
    total_commits = sum(m['commits'] for m in group_data.values())
    results = {}
    for name, m in group_data.items():
        pct = round(m['lines'] / total_lines * 100, 2) if total_lines else 0
        results[name] = {'pct': pct, 'is_freerider': pct < 15 or m['commits'] < 5}
    return total_lines, total_commits, results
::: tests
{'Minh': {'lines': 150, 'commits': 12}, 'Huy': {'lines': 200, 'commits': 15}, 'Lan': {'lines': 30, 'commits': 3}} ==> (380, 30, {'Minh': {'pct': 39.47, 'is_freerider': False}, 'Huy': {'pct': 52.63, 'is_freerider': False}, 'Lan': {'pct': 7.89, 'is_freerider': True}})
::: hidden
{} ==> (0, 0, {})
{'A': {'lines': 0, 'commits': 10}} ==> (0, 10, {'A': {'pct': 0, 'is_freerider': True}})
{'A': {'lines': 50, 'commits': 4}, 'B': {'lines': 50, 'commits': 9}} ==> (100, 13, {'A': {'pct': 50.0, 'is_freerider': True}, 'B': {'pct': 50.0, 'is_freerider': False}})
::: hints
- Tính tổng trước, rồi duyệt lại để tính phần trăm.
::: explain
Biểu thức so sánh `pct < 15 or commits < 5` tự trả về bool – không cần `if ... True else False`.

===== tt406
@title: WC nhà B – chọn buồng riêng tư nhất
@level: hard
@topic: algo
@source: Tuyển tập – P4.6
@fn: wc_simulation
::: statement
`status` là list 0/1 (0 = trống, 1 = có người). Lần lượt `num_people` người vào, mỗi người chọn buồng **trống** có **khoảng cách tới buồng có người gần nhất là lớn nhất** (bằng nhau chọn chỉ số nhỏ nhất). Nếu chưa ai dùng buồng nào thì chọn buồng 0. Hết buồng trống thì dừng.

Viết hàm `wc_simulation(status, num_people=5)` trả về list trạng thái cuối (không sửa list đầu vào).

`wc_simulation([1, 0, 0, 0, 0, 0, 0], 2)` → `[1, 0, 0, 1, 0, 0, 1]`
::: starter
def wc_simulation(status, num_people=5):
    pass


print(wc_simulation([1, 0, 0, 0, 0, 0, 0], 2))
::: solution
def wc_simulation(status, num_people=5):
    cur = list(status)
    for _ in range(num_people):
        empty = [i for i, x in enumerate(cur) if x == 0]
        if not empty:
            break
        occupied = [i for i, x in enumerate(cur) if x == 1]
        if not occupied:
            cur[0] = 1
            continue
        best = max(empty, key=lambda i: (min(abs(i - o) for o in occupied), -i))
        cur[best] = 1
    return cur
::: tests
[1, 0, 0, 0, 0, 0, 0], 2 ==> [1, 0, 0, 1, 0, 0, 1]
::: hidden
[0, 0, 0], 1 ==> [1, 0, 0]
[1, 1], 3 ==> [1, 1]
[0, 0, 0, 0, 0] ==> [1, 1, 1, 1, 1]
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0], 3
::: hints
- Mỗi lượt: tìm các buồng trống, tính khoảng cách tới buồng có người gần nhất, chọn max.
- Hoà thì chỉ số nhỏ nhất: `max(..., key=lambda i: (d(i), -i))`.
::: explain
Key là tuple `(khoảng cách, -i)`: so sánh tuple theo thứ tự từng phần tử – mẹo xử lý điều kiện hoà rất gọn.

===== tt407
@title: Cục đá trường F
@level: easy
@topic: basics
@source: Tuyển tập – P4.7
@fn: calculate_pass_prob
::: statement
Xác suất qua môn cơ bản là **0.6**; mỗi lần "lạy cụ" cộng thêm **0.05**, tối đa **1.0**. Viết hàm `calculate_pass_prob(k_bows)` trả về xác suất cuối cùng (làm tròn 2 chữ số).

`calculate_pass_prob(3)` → `0.75`, `calculate_pass_prob(100)` → `1.0`
::: starter
def calculate_pass_prob(k_bows):
    pass


print(calculate_pass_prob(3))  # 0.75
::: solution
def calculate_pass_prob(k_bows):
    return round(min(0.6 + 0.05 * k_bows, 1.0), 2)
::: tests
3 ==> 0.75
100 ==> 1.0
::: hidden
0 ==> 0.6
8 ==> 1.0
7 ==> 0.95
::: hints
- `min(giá trị, 1.0)` để chặn trên.
::: explain
`0.6 + 0.05 * 3` cho `0.7500000000000001` do sai số float – vì vậy nên `round`. (Và chăm học thì hơn lạy cụ 😄)

===== tt408
@title: FTU Losers Club – thống kê điểm
@level: medium
@topic: collections
@source: Tuyển tập – P4.8
@fn: analyze_scores
::: statement
Viết hàm `analyze_scores(scores)` trả về tuple 3 phần:
1. `(max, min, số người qua môn (≥ 5))`
2. `(mean, median, mode)` – mean làm tròn 2 chữ số; mode là giá trị xuất hiện nhiều nhất (bằng nhau lấy giá trị xuất hiện trước)
3. dict phân cụm theo tâm gần nhất trong `{'Giỏi': 9.0, 'TB': 6.0, 'Yếu': 3.0}`: `{'Giỏi': [...], 'TB': [...], 'Yếu': [...]}` (khoảng cách bằng nhau ưu tiên theo thứ tự Giỏi, TB, Yếu)

`analyze_scores([9, 7.5, 4, 5, 9])` → `((9, 4, 4), (6.9, 7.5, 9), {'Giỏi': [9, 7.5, 9], 'TB': [5], 'Yếu': [4]})`
::: starter
import statistics


def analyze_scores(scores):
    pass


print(analyze_scores([9, 7.5, 4, 5, 9]))
::: solution
import statistics


def analyze_scores(scores):
    basic = (max(scores), min(scores), sum(1 for s in scores if s >= 5))
    stats = (round(statistics.mean(scores), 2), statistics.median(scores), statistics.mode(scores))
    centroids = {'Giỏi': 9.0, 'TB': 6.0, 'Yếu': 3.0}
    clusters = {k: [] for k in centroids}
    for s in scores:
        label = min(centroids, key=lambda k: abs(s - centroids[k]))
        clusters[label].append(s)
    return basic, stats, clusters
::: tests
[9, 7.5, 4, 5, 9] ==> ((9, 4, 4), (6.9, 7.5, 9), {'Giỏi': [9, 7.5, 9], 'TB': [5], 'Yếu': [4]})
::: hidden
[5] ==> ((5, 5, 1), (5, 5, 5), {'Giỏi': [], 'TB': [5], 'Yếu': []})
[1, 2, 3, 4, 10, 10, 7.5] ==> ((10, 1, 3), (5.36, 4, 10), {'Giỏi': [10, 10, 7.5], 'TB': [], 'Yếu': [1, 2, 3, 4]})
::: hints
- Thư viện `statistics`: `mean`, `median`, `mode`.
- Gán cụm: `min(centroids, key=lambda k: abs(s - centroids[k]))`.
::: explain
`statistics.mode` (Python ≥ 3.8) trả về giá trị xuất hiện nhiều nhất **đầu tiên** khi hoà, không báo lỗi.

===== tt409
@title: Ở trọ – lọc và xếp hạng
@level: medium
@topic: collections
@source: Tuyển tập – P4.9
@fn: find_accommodation
::: statement
`houses` là list dict `{'name', 'p' (giá, triệu), 'd' (km), 'r' (rating)}`. Viết hàm `find_accommodation(houses)` trả về tuple:
1. **tên** nhà rẻ nhất trong bán kính **≤ 3 km** (không có thì `None`)
2. list top 3 tuple `(tên, score)` theo **score = r / p − d × 0.1** giảm dần (xét **tất cả** nhà), score làm tròn 2 chữ số
::: starter
def find_accommodation(houses):
    pass


houses = [{'name': 'A', 'p': 2.0, 'd': 1.0, 'r': 4.0},
          {'name': 'B', 'p': 1.5, 'd': 4.0, 'r': 4.5},
          {'name': 'C', 'p': 3.0, 'd': 0.5, 'r': 4.8},
          {'name': 'D', 'p': 1.8, 'd': 2.5, 'r': 3.5}]
print(find_accommodation(houses))
::: solution
def find_accommodation(houses):
    near = [h for h in houses if h['d'] <= 3.0]
    cheapest = min(near, key=lambda h: h['p'])['name'] if near else None
    ranked = sorted(((h['name'], round(h['r'] / h['p'] - h['d'] * 0.1, 2)) for h in houses),
                    key=lambda t: t[1], reverse=True)
    return cheapest, ranked[:3]
::: tests
[{'name': 'A', 'p': 2.0, 'd': 1.0, 'r': 4.0}, {'name': 'B', 'p': 1.5, 'd': 4.0, 'r': 4.5}, {'name': 'C', 'p': 3.0, 'd': 0.5, 'r': 4.8}, {'name': 'D', 'p': 1.8, 'd': 2.5, 'r': 3.5}]
::: hidden
[{'name': 'X', 'p': 1.0, 'd': 5.0, 'r': 3.0}] ==> (None, [('X', 2.5)])
[{'name': 'A', 'p': 1.0, 'd': 1.0, 'r': 5.0}, {'name': 'B', 'p': 2.0, 'd': 0.0, 'r': 5.0}] ==> ('A', [('A', 4.9), ('B', 2.5)])
::: hints
- Lọc trước (`d <= 3`), sau đó `min(..., key=...)`.
- Tạo list tuple `(name, score)` rồi `sorted(..., key=lambda t: t[1], reverse=True)`.
::: explain
Bài "lọc → tính chỉ số → xếp hạng → lấy top k" là khung của rất nhiều bài phân tích dữ liệu.

===== tt411
@title: Phòng quản lý đào tạo – mô phỏng hàng đợi
@level: hard
@topic: algo
@source: Tuyển tập – P4.11
@fn: pd_training_simulation
::: statement
Mỗi sinh viên là dict `{'name', 'year', 'service'}` (service = số phút cần phục vụ), danh sách theo thứ tự đến (tất cả đến lúc 0). Viết hàm `pd_training_simulation(students)` trả về tuple:
1. **thời gian chờ trung bình** khi phục vụ theo hàng đợi FIFO 1 quầy
2. thời gian chờ trung bình khi **ưu tiên năm cao hơn** (year giảm dần, cùng năm giữ thứ tự đến), 1 quầy
3. **thời điểm hoàn thành** người cuối khi có **2 quầy** song song: mỗi người (theo thứ tự đến) vào quầy **rảnh sớm hơn** (bằng nhau chọn quầy 0)

Các trung bình làm tròn 2 chữ số. Danh sách rỗng → `(0, 0, 0)`.
::: starter
def pd_training_simulation(students):
    pass


sv = [{'name': 'A', 'year': 1, 'service': 10}, {'name': 'B', 'year': 4, 'service': 5},
      {'name': 'C', 'year': 2, 'service': 20}]
print(pd_training_simulation(sv))  # (8.33, 10.0, 25)
::: solution
def avg_wait(order):
    t, waits = 0, []
    for s in order:
        waits.append(t)
        t += s['service']
    return round(sum(waits) / len(waits), 2)


def pd_training_simulation(students):
    if not students:
        return 0, 0, 0
    fifo = avg_wait(students)
    prio = avg_wait(sorted(students, key=lambda s: s['year'], reverse=True))
    counters = [0, 0]
    for s in students:
        idx = 0 if counters[0] <= counters[1] else 1
        counters[idx] += s['service']
    return fifo, prio, max(counters)
::: tests
[{'name': 'A', 'year': 1, 'service': 10}, {'name': 'B', 'year': 4, 'service': 5}, {'name': 'C', 'year': 2, 'service': 20}] ==> (8.33, 10.0, 25)
::: hidden
[] ==> (0, 0, 0)
[{'name': 'A', 'year': 3, 'service': 7}] ==> (0.0, 0.0, 7)
[{'name': 'A', 'year': 1, 'service': 10}, {'name': 'B', 'year': 1, 'service': 10}, {'name': 'C', 'year': 4, 'service': 10}, {'name': 'D', 'year': 2, 'service': 30}]
::: hints
- Viết hàm phụ `avg_wait(order)`: người thứ k chờ bằng tổng thời gian phục vụ của những người trước.
- 2 quầy: giữ list `counters = [0, 0]` là thời điểm mỗi quầy rảnh.
::: explain
Mô phỏng (simulation) là một ứng dụng "tính toán khoa học" quan trọng. Lưu ý `sorted` ổn định nên cùng năm giữ thứ tự đến.

===== tt412
@title: Chạm mặt ex – danger zones
@level: medium
@topic: collections
@source: Tuyển tập – P4.12
@fn: avoid_ex
::: statement
Viết hàm `avoid_ex(ex_loc_probs, nam_schedule, ex_schedule)`:
- `ex_loc_probs`: dict `{địa điểm: xác suất gặp ex}`
- hai lịch trình là list dict `{'time': ..., 'location': ...}`

Trả về tuple:
1. dict `{địa điểm: xác suất an toàn = 1 − p}` (làm tròn 2 chữ số)
2. list tuple `(time, location)` – các "danger zone" mà Nam và ex **cùng thời gian, cùng địa điểm**, theo thứ tự trong lịch của ex
::: starter
def avoid_ex(ex_loc_probs, nam_schedule, ex_schedule):
    pass


probs = {'Thư viện': 0.3, 'Canteen': 0.7}
nam = [{'time': '8h', 'location': 'Thư viện'}, {'time': '12h', 'location': 'Canteen'}]
ex = [{'time': '8h', 'location': 'Canteen'}, {'time': '12h', 'location': 'Canteen'}]
print(avoid_ex(probs, nam, ex))
::: solution
def avoid_ex(ex_loc_probs, nam_schedule, ex_schedule):
    safe = {loc: round(1 - p, 2) for loc, p in ex_loc_probs.items()}
    nam_at = {item['time']: item['location'] for item in nam_schedule}
    danger = [(e['time'], e['location']) for e in ex_schedule
              if nam_at.get(e['time']) == e['location']]
    return safe, danger
::: tests
{'Thư viện': 0.3, 'Canteen': 0.7}, [{'time': '8h', 'location': 'Thư viện'}, {'time': '12h', 'location': 'Canteen'}], [{'time': '8h', 'location': 'Canteen'}, {'time': '12h', 'location': 'Canteen'}] ==> ({'Thư viện': 0.7, 'Canteen': 0.3}, [('12h', 'Canteen')])
::: hidden
{}, [], [] ==> ({}, [])
{'A': 1.0}, [{'time': 1, 'location': 'A'}], [{'time': 2, 'location': 'A'}] ==> ({'A': 0.0}, [])
::: hints
- Chuyển lịch của Nam thành dict `{time: location}` để tra cứu nhanh.
::: explain
Biến list thành dict tra cứu (lookup) là kỹ thuật tối ưu kinh điển – giống phép **join** giữa hai bảng.

===== tt414
@title: Xuân Hòa – chia đội
@level: medium
@topic: collections
@source: Tuyển tập – P4.14
@fn: xuan_hoa_training
::: statement
`students` là list dict `{'name', 'height', 'shooting', 'fitness', 'marching'}`. Viết hàm `xuan_hoa_training(students)` trả về tuple:
1. trung vị chiều cao, 2. khoảng biến thiên (max − min) chiều cao
3. sau khi **sắp xếp theo chiều cao tăng dần**, chia thành 4 đội kiểu **round-robin** (người thứ i vào đội i % 4) – trả về list 4 list **tên**
4. dict `{'Shooters': [...], 'Scouts': [...]}`: Shooters có shooting > 8; Scouts có fitness > 7 **và** marching > 7 (theo thứ tự đã sắp xếp)

Không được sửa list đầu vào.
::: starter
import statistics


def xuan_hoa_training(students):
    pass
::: solution
import statistics


def xuan_hoa_training(students):
    ordered = sorted(students, key=lambda s: s['height'])
    heights = [s['height'] for s in ordered]
    teams = [[], [], [], []]
    for i, s in enumerate(ordered):
        teams[i % 4].append(s['name'])
    roles = {
        'Shooters': [s['name'] for s in ordered if s['shooting'] > 8],
        'Scouts': [s['name'] for s in ordered if s['fitness'] > 7 and s['marching'] > 7],
    }
    return statistics.median(heights), max(heights) - min(heights), teams, roles
::: tests
[{'name': 'A', 'height': 170, 'shooting': 9, 'fitness': 8, 'marching': 8}, {'name': 'B', 'height': 160, 'shooting': 5, 'fitness': 9, 'marching': 6}, {'name': 'C', 'height': 175, 'shooting': 10, 'fitness': 5, 'marching': 9}, {'name': 'D', 'height': 165, 'shooting': 7, 'fitness': 8, 'marching': 9}, {'name': 'E', 'height': 180, 'shooting': 6, 'fitness': 6, 'marching': 6}] ==> (170, 20, [['B', 'E'], ['D'], ['A'], ['C']], {'Shooters': ['A', 'C'], 'Scouts': ['D', 'A']})
::: hidden
[{'name': 'X', 'height': 150, 'shooting': 0, 'fitness': 0, 'marching': 0}] ==> (150, 0, [['X'], [], [], []], {'Shooters': [], 'Scouts': []})
::: hints
- `sorted()` tạo list mới, không sửa list gốc (khác `list.sort()`).
- `teams[i % 4].append(...)` với `enumerate`.
::: explain
Round-robin bằng `i % k` là mẹo chia đều phần tử vào k nhóm.

===== tt415
@title: Xuân Hòa 2 – điểm danh
@level: medium
@topic: collections
@source: Tuyển tập – P4.15
@fn: attendance_analytics
::: statement
`data` là list dict `{'name', 'days': list 0/1}` (1 = có mặt). Viết hàm `attendance_analytics(data)` trả về tuple:
1. list tên **5 sinh viên có tỉ lệ đi học thấp nhất** (tăng dần theo tỉ lệ; bằng nhau giữ thứ tự ban đầu)
2. "watch list": tên các sinh viên có xác suất vắng dự đoán **> 0.3**, trong đó xác suất vắng = số buổi vắng / tổng buổi, và **nhân đôi** nếu 2 buổi cuối cùng đều vắng (theo thứ tự ban đầu)
::: starter
def attendance_analytics(data):
    pass
::: solution
def attendance_analytics(data):
    rate = lambda sv: sum(sv['days']) / len(sv['days'])
    bottom5 = [sv['name'] for sv in sorted(data, key=rate)[:5]]
    watch = []
    for sv in data:
        d = sv['days']
        p = d.count(0) / len(d)
        if len(d) >= 2 and d[-1] == 0 and d[-2] == 0:
            p *= 2
        if p > 0.3:
            watch.append(sv['name'])
    return bottom5, watch
::: tests
[{'name': 'A', 'days': [1, 1, 1, 1, 0, 0]}, {'name': 'B', 'days': [1, 1, 1, 1, 1, 1]}, {'name': 'C', 'days': [0, 1, 0, 1, 1, 1]}, {'name': 'D', 'days': [1, 0, 1, 1, 1, 1]}, {'name': 'E', 'days': [0, 0, 0, 1, 1, 1]}, {'name': 'F', 'days': [1, 1, 1, 1, 1, 0]}] ==> (['E', 'A', 'C', 'D', 'F'], ['A', 'C', 'E'])
::: hidden
[] ==> ([], [])
[{'name': 'X', 'days': [0]}] ==> (['X'], ['X'])
::: hints
- `list.count(0)` đếm số buổi vắng.
::: explain
Không nên thêm key `'rate'` vào dict gốc như lời giải trong tài liệu – sửa dữ liệu đầu vào là "tác dụng phụ" xấu.
