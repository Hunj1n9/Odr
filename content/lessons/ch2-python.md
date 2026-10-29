@title: Python cơ bản
@chapter: 2
@summary: Biến, số, chuỗi, if, vòng lặp, list/tuple/set/dict, hàm, comprehension, xử lý lỗi và các mẫu thuật toán hay thi.

> **Mới học lập trình?** Hãy học **Chương 0 – Làm quen với lập trình** trước (9 bài ngắn, giải thích từ con số 0). Các bài dưới đây sẽ dễ hơn rất nhiều khi bạn đã quen biến, `print`, `if`, `for` và hàm.

Đây là chương **quan trọng nhất cho bài thi**: đề giữa kỳ và phần lớn đề cuối kỳ là viết hàm Python thuần. Chương được chia thành 16 bài nhỏ – mỗi bài một khái niệm, học xong làm bài tập luôn. Đừng học dồn: **2–3 bài mỗi ngày** là đủ.

> **Đối chiếu tài liệu FTU:** Buổi 2–4 (LEC 2 "Python cơ bản – thành phần cú pháp và kiểu dữ liệu", LEC 3; ghi chú Buổi 02–04): số và `round`, chuỗi + slicing + phương thức chuỗi, **datetime**, `input`, quy tắc đặt tên, if, module/package, list – dict – tuple – set, comprehension, `format()`. Phần I đề cuối kỳ (3 điểm) lấy từ chương này.

@@@ c2-1 | Biến và phép toán số học
@ftu: LEC 2–3 & ghi chú Buổi 02–04 – toán tử số học, gán biến, quy tắc đặt tên; đề cương ôn tập Phần I Module 1
@goal: Gán biến, phân biệt `int` / `float`, dùng đúng 7 phép toán `+ - * / // % **`.
@practice: b01, gk21, gk31

> **Nói đơn giản:** Nhớ lại: **biến là chiếc hộp có nhãn** (bài 0.3). Bài này thêm hai phép chia mà đề thi rất thích. Hãy tưởng tượng chia **17 cái kẹo cho 5 bạn**: mỗi bạn được **3** cái (đó là `//`, phần nguyên) và **thừa 2** cái (đó là `%`, phần dư).
>
> **Từ cần biết:** **`int`** = số nguyên (3) · **`float`** = số có phần lẻ (3.4) · **`//`** = chia lấy phần nguyên · **`%`** = chia lấy dư · `**` = luỹ thừa (`2 ** 3` = 8)


Biến là **cái tên gắn với một giá trị**. Gán bằng dấu `=`:

```python
gia = 120000        # int – số nguyên
thue = 0.1          # float – số thực
so_luong = 3
tong = gia * so_luong * (1 + thue)
print(tong, type(gia), type(tong))
```

Quy tắc đặt tên: chữ thường, nối bằng `_`, không bắt đầu bằng số, không trùng từ khoá (`if`, `for`, `def`…). Tránh đặt tên trùng hàm có sẵn như `sum`, `max`, `list`. Quy ước cộng đồng Python (bài giảng FTU nhắc tới): `joined_lower` cho biến/hàm, `ALL_CAPS` cho hằng số (`LAI_SUAT = 0.07`), `StudlyCaps` cho lớp (class). Có thể gán nhiều biến cùng lúc: `a = b = 0`, `x, y = 1, 2`.

??
Tên biến nào **hợp lệ**?
- [ ] `2nd_place`
- [ ] `diem-tb`
- [x] `diem_tb`
- [ ] `for`
> Tên không bắt đầu bằng số, không chứa `-` (Python hiểu là phép trừ), không trùng từ khoá.

### Bảy phép toán

```python
a, b = 17, 5
print(a + b, a - b, a * b)   # 22 12 85
print(a / b)                 # 3.4  – chia thường, LUÔN ra float
print(a // b)                # 3    – chia lấy phần nguyên
print(a % b)                 # 2    – chia lấy dư
print(a ** 2)                # 289  – luỹ thừa
```

`//` và `%` cực kỳ hay dùng trong đề thi:
- `n % 2 == 0` → n chẵn; `n % 10` → chữ số cuối; `n // 10` → bỏ chữ số cuối.
- Đổi 135 phút: `135 // 60` giờ và `135 % 60` phút.

??
`print(17 // 5, 17 % 5)` in ra:
- [ ] `3.4 2`
- [x] `3 2`
- [ ] `3 3`
- [ ] `2 3`
> 17 = 5 × 3 + 2 → thương nguyên 3, dư 2.

??
`10 / 2` cho kết quả gì?
- [ ] `5`
- [x] `5.0`
- [ ] `"5"`
- [ ] Lỗi
> Phép `/` **luôn** trả về float, kể cả khi chia hết. Muốn số nguyên dùng `//`.

Thứ tự ưu tiên giống toán: `**` → `* / // %` → `+ -`. Không chắc thì thêm ngoặc.

??
`2 + 3 * 2 ** 2` bằng bao nhiêu?
- [ ] `100`
- [ ] `22`
- [x] `14`
- [ ] `25`
> `2 ** 2 = 4` trước, rồi `3 * 4 = 12`, cuối cùng `2 + 12 = 14`.

@@@ c2-2 | Chuyển kiểu và làm tròn
@ftu: LEC 2–3 & ghi chú Buổi 02–04 – int, float, `round(x, n)`; đề cương ôn tập – `type()`
@goal: Chuyển đổi giữa `int`, `float`, `str`, `bool`; làm tròn đúng với `round`; hiểu vì sao `0.1 + 0.2 != 0.3`.
@practice: b15, gk01

> **Nói đơn giản:** Mỗi giá trị nằm trong một "loại hộp" (số nguyên, số thực, chữ, đúng/sai). **Chuyển kiểu** là đổi giá trị sang hộp loại khác. Chuyện `0.1 + 0.2` không đúng bằng `0.3` giống như 1/3 viết thập phân không bao giờ hết: máy tính lưu số lẻ bằng hệ nhị phân nên có sai số siêu nhỏ.
>
> **Từ cần biết:** **`bool`** = đúng/sai (`True`/`False`) · **`round(x, n)`** = làm tròn x đến n chữ số lẻ · **`int(7.9)`** = cắt bỏ phần lẻ (=7), *không* làm tròn


```python
print(int("12") + 1)      # chuỗi → số nguyên
print(float("3.5") * 2)   # chuỗi → số thực
print(str(10) + " điểm")  # số → chuỗi
print(int(7.9))           # cắt phần thập phân (không làm tròn!) → 7
print(bool(0), bool(5), bool(""), bool("a"))
```

??
`int(7.9)` trả về:
- [x] `7`
- [ ] `8`
- [ ] `7.9`
- [ ] Lỗi
> `int()` **cắt bỏ** phần thập phân, không làm tròn. Muốn làm tròn dùng `round(7.9)` → `8`.

### Làm tròn – nguồn mất điểm số 1

```python
print(round(3.14159, 2))   # 3.14
print(round(2.5), round(3.5))   # 2 4  ← làm tròn về số CHẴN gần nhất
print(round(2.675, 2))     # 2.67 – do sai số biểu diễn số thực
print(0.1 + 0.2, 0.1 + 0.2 == 0.3)
```

Máy tính lưu số thực ở hệ nhị phân nên có sai số nhỏ. Vì vậy:
- **So sánh số thực** bằng `abs(a - b) < 1e-9` hoặc `math.isclose(a, b)`.
- **Làm tròn ở bước cuối cùng**, đúng số chữ số đề yêu cầu.

??
`round(2.5)` bằng bao nhiêu?
- [ ] `3`
- [x] `2`
- [ ] `2.5`
- [ ] `3.0`
> Python làm tròn "kiểu ngân hàng": số đúng giữa (.5) làm tròn về số chẵn gần nhất → `2`. `round(3.5)` = `4`.

??
`round(7.456, 1)` trả về kiểu gì?
- [ ] `str` `"7.5"`
- [x] `float` `7.5`
- [ ] `int` `7`
- [ ] `float` `7.4`
> `round(x, n)` trả về **số** float. Còn `f"{x:.1f}"` trả về **chuỗi** – đọc kỹ đề yêu cầu số hay chuỗi.

@@@ c2-3 | Chuỗi: chỉ số và cắt lát
@ftu: LEC 2–3 & ghi chú Buổi 02–04 – indexing & slicing `s[start:stop:step]`
@goal: Truy cập ký tự bằng chỉ số dương/âm, cắt chuỗi `s[a:b:c]`, đảo chuỗi, dùng `len` và `in`.
@practice: b02, b06

> **Nói đơn giản:** Một chuỗi giống **một hàng ghế đánh số từ 0**: ký tự đầu là ghế số 0. Đánh số âm thì đếm **từ cuối lên**: `-1` là ghế cuối cùng. **Cắt lát** `s[a:b]` giống cắt một khúc bánh mì: lấy từ ghế `a` đến **ngay trước** ghế `b`.
>
> **Từ cần biết:** **chỉ số (index)** = số thứ tự của một ký tự · **cắt lát (slicing)** = lấy một đoạn · **`len(s)`** = đếm số ký tự · **`s[::-1]`** = đọc chuỗi ngược từ cuối về đầu


Chuỗi (`str`) là dãy ký tự, **đánh số từ 0**. Chỉ số âm đếm từ cuối:

```
 s =  P   y   t   h   o   n
      0   1   2   3   4   5
     -6  -5  -4  -3  -2  -1
```

```python
s = "Python"
print(len(s), s[0], s[5], s[-1], s[-2])
print(s[0:3], s[2:], s[:4], s[-3:])   # cắt lát: [start:stop) – không lấy stop
print(s[::2], s[::-1])                # bước 2; đảo ngược
print("th" in s, "TH" in s)
```

??
`s = "FTU2025"`. `s[3:]` là gì?
- [ ] `"U2025"`
- [x] `"2025"`
- [ ] `"FTU"`
- [ ] `"025"`
> Lấy từ chỉ số 3 (ký tự `'2'`) đến hết.

??
`"Python"[1:4]` bằng:
- [ ] `"Pyth"`
- [x] `"yth"`
- [ ] `"ytho"`
- [ ] `"yt"`
> Lấy chỉ số 1, 2, 3 – **không lấy** chỉ số 4.

Chuỗi là **bất biến**: không sửa được từng ký tự (`s[0] = "J"` báo lỗi). Muốn đổi thì tạo chuỗi mới:

```python
s = "Python"
s2 = "J" + s[1:]
print(s2)
print("abc" * 3, "ab" + "cd")
```

??
Cách nào kiểm tra chuỗi `s` là **đối xứng** (palindrome)?
- [ ] `s == s[1:]`
- [x] `s == s[::-1]`
- [ ] `s == reversed(s)`
- [ ] `s[0] == s[-1]`
> `s[::-1]` đảo ngược chuỗi. `reversed(s)` trả về iterator, không phải chuỗi; so sánh đầu–cuối chỉ kiểm tra 2 ký tự.

@@@ c2-4 | Phương thức chuỗi và f-string
@ftu: LEC 2–3 & ghi chú Buổi 02–04 – phương thức chuỗi (capitalize, count, endswith, find, split, swapcase, title)
@goal: Dùng `lower/upper/strip/split/join/replace/count/find`, định dạng số bằng f-string.
@practice: b07, b20, gk27

> **Nói đơn giản:** **Phương thức** là chức năng "gắn liền" với chuỗi, gọi bằng dấu chấm: `ten.upper()` nghĩa là "chuỗi `ten` ơi, hãy tự đổi sang chữ hoa". `split` cắt một câu thành các từ, `join` ghép các từ lại thành câu – giống tách và ghép các toa tàu.
>
> **Từ cần biết:** **`strip()`** = bỏ khoảng trắng hai đầu · **`split()`** = cắt chuỗi thành list · **`join()`** = ghép list thành chuỗi · **`replace(a, b)`** = thay a bằng b · **f-string** = câu có chỗ trống `{}` (xem bài 0.5)


```python
s = "  Foreign Trade University  "
t = s.strip()                 # bỏ khoảng trắng 2 đầu
print(t.lower(), "|", t.upper())
print(t.split())              # tách theo khoảng trắng → list
print("-".join(["a", "b", "c"]))
print(t.replace(" ", "_"), t.count("e"), t.find("Trade"), t.find("xyz"))
print(t.startswith("For"), t.endswith("ty"), "123".isdigit(), "abc".isalpha())
```

Các phương thức **trả về chuỗi mới** – không sửa chuỗi gốc. Phải gán lại: `s = s.strip()`.

??
`"a,b,,c".split(",")` trả về:
- [ ] `['a', 'b', 'c']`
- [x] `['a', 'b', '', 'c']`
- [ ] `['a,b,,c']`
- [ ] `['a', 'b', ',', 'c']`
> Giữa hai dấu phẩy liền nhau là chuỗi rỗng `''`. Còn `split()` không tham số tách theo mọi khoảng trắng và bỏ phần rỗng.

??
Sau khi chạy, `ten` bằng gì?
```py
ten = "lan"
ten.upper()
```
- [ ] `"LAN"`
- [x] `"lan"`
- [ ] `None`
- [ ] Lỗi
> `upper()` trả về chuỗi mới nhưng không được gán lại → `ten` không đổi.

### f-string

```python
ten, diem, ti_le = "Minh", 8.456, 0.857
print(f"{ten} được {diem:.2f} điểm")     # 2 chữ số thập phân
print(f"Tỉ lệ: {ti_le:.1%}")             # phần trăm
print(f"{1234567:,}")                    # phân cách hàng nghìn
print(f"|{ten:>8}|{ten:<8}|{ten:^8}|")   # căn phải / trái / giữa
```

??
`f"{0.4567:.1%}"` cho ra:
- [ ] `"0.5%"`
- [x] `"45.7%"`
- [ ] `"45.6%"`
- [ ] `"0.46"`
> `%` nhân 100 rồi thêm dấu `%`, làm tròn 1 chữ số → `45.7%`.

@@@ c2-16 | Ngày giờ (datetime) và định dạng chuỗi với format()
@ftu: LEC 2–3 & ghi chú Buổi 02–04 – kiểu datetime, `strptime` với `%m/%d/%Y %I:%M:%S %p`, hàm `format()`
@goal: Tạo và đọc ngày giờ bằng `datetime`, chuyển chuỗi ↔ ngày với `strptime`/`strftime`, tính khoảng cách bằng `timedelta`; định dạng chuỗi với `str.format()` và ký tự đặc biệt `\n`, `\t`.

> **Nói đơn giản:** Ngày giờ **không phải chữ cũng không phải số thường** mà là một kiểu riêng, nên máy mới tính được "cách nhau bao nhiêu ngày". Hai lệnh dễ nhầm: **`strptime`** đọc chữ thành ngày (p = *parse*, phân tích), **`strftime`** viết ngày thành chữ (f = *format*, định dạng). Chuỗi như `%d/%m/%Y` là "khuôn" mô tả ngày viết thế nào.
>
> **Từ cần biết:** **`datetime`** = kiểu ngày giờ · **`timedelta`** = một khoảng thời gian (ví dụ 5 ngày) · **`%d`** ngày, **`%m`** tháng, **`%Y`** năm 4 chữ số


Bài này bám theo LEC 2–3 của FTU (Buổi 02): *kiểu datetime, chuyển chuỗi thành datetime, hàm format()*.

### datetime

```python
from datetime import datetime, date, timedelta

dt = datetime(2024, 12, 20, 7, 30)          # năm, tháng, ngày, giờ, phút
print(dt, dt.year, dt.month, dt.day, dt.hour)
print(dt.strftime("%d/%m/%Y %H:%M"))         # ngày → chuỗi
s = "12/20/2024 07:30:00 AM"
d2 = datetime.strptime(s, "%m/%d/%Y %I:%M:%S %p")   # chuỗi → ngày (định dạng phải khớp)
print(d2 == dt)
han_nop = dt + timedelta(days=14)            # cộng 14 ngày
print(han_nop.date(), (han_nop - dt).days, date(2025, 1, 1).weekday())
```

| Mã | Nghĩa | Mã | Nghĩa |
|---|---|---|---|
| `%d` | ngày 01–31 | `%H` | giờ 00–23 |
| `%m` | tháng 01–12 | `%I` | giờ 01–12 |
| `%Y` | năm 4 chữ số | `%M` | phút |
| `%y` | năm 2 chữ số | `%S` | giây |
| `%p` | AM/PM | `%A` | tên thứ |

??
Chuyển chuỗi `"25/12/2024"` thành `datetime`, viết đúng là:
- [ ] `datetime.strftime("25/12/2024", "%d/%m/%Y")`
- [x] `datetime.strptime("25/12/2024", "%d/%m/%Y")`
- [ ] `datetime("25/12/2024")`
- [ ] `datetime.strptime("25/12/2024", "%m/%d/%Y")`
> **p**arse (strptime): chuỗi → ngày; **f**ormat (strftime): ngày → chuỗi. Định dạng phải khớp đúng thứ tự ngày/tháng.

??
`(datetime(2024, 3, 1) - datetime(2024, 2, 1)).days` bằng:
- [ ] 28
- [x] 29
- [ ] 30
- [ ] 31
> 2024 là năm nhuận nên tháng 2 có 29 ngày. Trừ hai datetime cho ra `timedelta`.

### str.format() và ký tự đặc biệt

```python
print("{} được {} điểm".format("Lan", 9))
print("{1} {0}".format("one", "two"))            # chọn theo vị trí
print("{:.5}".format("xylophone"))               # cắt còn 5 ký tự
print("[{:>8}] [{:<8}] [{:^8}]".format("A", "B", "C"))
print("{:.2f} | {:,} | {:.1%}".format(3.14159, 1234567, 0.256))
print("Dòng 1\nDòng 2\tcó tab")                 # \n xuống dòng, \t tab
print("Lan".swapcase(), "nguyễn văn an".title(), "ftu data".capitalize())
```

??
`"{1}-{0}".format("a", "b")` cho:
- [ ] `"a-b"`
- [x] `"b-a"`
- [ ] `"1-0"`
- [ ] Lỗi
> Số trong `{}` là vị trí đối số truyền vào `format`, đếm từ 0.

??
`"FTU data".swapcase()` bằng:
- [ ] `"FTU DATA"`
- [x] `"ftu DATA"`
- [ ] `"Ftu Data"`
- [ ] `"ftu data"`
> `swapcase` đảo hoa ↔ thường từng ký tự; `title` viết hoa đầu mỗi từ; `capitalize` chỉ viết hoa chữ đầu chuỗi.

@@@ c2-5 | Câu lệnh điều kiện if / elif / else
@ftu: LEC 2–3 & ghi chú Buổi 02–04 – câu lệnh if / if-else / if-elif-else; toán tử so sánh & logic
@goal: Viết điều kiện nhiều nhánh, dùng so sánh và `and / or / not`, tránh lỗi thứ tự nhánh.
@practice: b03, b19, gk04

> **Nói đơn giản:** `if / elif / else` là **ngã rẽ**: máy kiểm tra các điều kiện **từ trên xuống**, gặp điều kiện đúng đầu tiên thì đi nhánh đó và **bỏ qua phần còn lại**. Vì vậy thứ tự các nhánh quan trọng – xếp điều kiện hẹp (như `>= 9`) lên trước điều kiện rộng (như `>= 5`).
>
> **Từ cần biết:** **`and`** = cả hai cùng đúng · **`or`** = ít nhất một cái đúng · **`not`** = đảo ngược đúng/sai · **`elif`** = "nếu không thì nếu…"


```python
def xep_loai(diem):
    if diem >= 8.5:
        return "A"
    elif diem >= 7:
        return "B"
    elif diem >= 5.5:
        return "C"
    elif diem >= 4:
        return "D"
    else:
        return "F"

print(xep_loai(9), xep_loai(7), xep_loai(3.9))
```

Python xét các nhánh **từ trên xuống**, gặp nhánh đúng đầu tiên thì dừng. Vì vậy với ngưỡng "≥", xếp **từ cao xuống thấp**.

??
Hàm sau trả về gì khi `diem = 9`?
```py
def loai(diem):
    if diem >= 5:
        return "Đạt"
    elif diem >= 8:
        return "Giỏi"
```
- [ ] `"Giỏi"`
- [x] `"Đạt"`
- [ ] `None`
- [ ] Lỗi
> 9 ≥ 5 đúng ngay ở nhánh đầu nên trả về "Đạt" – nhánh "Giỏi" không bao giờ chạy tới. Phải đặt điều kiện chặt hơn lên trước.

### So sánh và kết hợp điều kiện

`==` (bằng), `!=` (khác), `<`, `<=`, `>`, `>=`. Kết hợp bằng `and`, `or`, `not`. Python cho phép viết gọn `0 <= x <= 10`.

```python
tuoi, co_the = 20, True
print(tuoi >= 18 and co_the)
print(tuoi < 6 or tuoi > 60)
print(not co_the, 0 <= tuoi <= 25)
nam = 2024
print((nam % 4 == 0 and nam % 100 != 0) or nam % 400 == 0)   # năm nhuận
```

??
`x = 7`. Biểu thức nào cho kết quả **False**?
- [ ] `x > 5 and x < 10`
- [ ] `x % 2 == 0 or x > 5`
- [x] `not (x > 5)`
- [ ] `5 <= x <= 7`
> `x > 5` là True nên `not (x > 5)` là False. Phương án 2: vế trái False nhưng vế phải True, `or` chỉ cần một vế đúng.

??
Lỗi phổ biến: viết `if x = 5:` thay vì:
- [ ] `if x := 5:`
- [x] `if x == 5:`
- [ ] `if x is 5:`
- [ ] `if (x = 5):`
> `=` là gán, `==` là so sánh. `if x = 5:` gây `SyntaxError`.

@@@ c2-6 | Vòng lặp for và range
@ftu: Đề cương ôn tập Phần I – vòng lặp for; bộ câu hỏi giữa kỳ Lecture 3–6 câu 1–2
@goal: Duyệt chuỗi/list bằng `for`, sinh dãy số bằng `range(start, stop, step)`, dùng biến tích luỹ và `enumerate`.
@practice: b04, gk05, b10

> **Nói đơn giản:** Vòng `for` giống **đi dọc dãy nhà và gõ cửa từng nhà**: mỗi lượt bạn làm việc với một phần tử trong dãy. `range(start, stop, step)` là cách tạo dãy số để đi: bắt đầu từ `start`, dừng **trước** `stop`, mỗi bước nhảy `step`.
>
> **Từ cần biết:** **duyệt** = đi qua từng phần tử · **biến tích luỹ** = biến cộng dồn kết quả như heo đất (bài 0.7) · **`enumerate`** = vừa lấy số thứ tự vừa lấy phần tử


```python
for i in range(5):          # 0 1 2 3 4
    print(i, end=" ")
print()
print(list(range(2, 10, 3)))    # [2, 5, 8]
print(list(range(10, 0, -2)))   # [10, 8, 6, 4, 2]
```

`range(stop)` bắt đầu từ 0 và **không lấy** `stop`.

??
`list(range(1, 10, 4))` là:
- [ ] `[1, 4, 7, 10]`
- [x] `[1, 5, 9]`
- [ ] `[1, 5]`
- [ ] `[4, 8]`
> Bắt đầu 1, mỗi bước +4: 1, 5, 9; 13 vượt quá 10 nên dừng.

### Mẫu "biến tích luỹ"

Đa số bài thi dùng mẫu: *khởi tạo → duyệt → cập nhật → trả về*.

```python
def tong_chan(n):
    tong = 0                    # 1. khởi tạo
    for i in range(1, n + 1):   # 2. duyệt
        if i % 2 == 0:
            tong += i           # 3. cập nhật
    return tong                 # 4. trả về (ngoài vòng lặp!)

print(tong_chan(10))
```

??
Hàm sau trả về gì với `n = 3`?
```py
def f(n):
    tong = 0
    for i in range(n):
        tong += i
        return tong
```
- [ ] `3`
- [x] `0`
- [ ] `6`
- [ ] `None`
> `return` nằm **trong** vòng lặp nên hàm kết thúc ngay ở lần lặp đầu (i = 0). Lỗi thụt lề cực kỳ phổ biến!

Duyệt trực tiếp phần tử, hoặc cả chỉ số lẫn phần tử với `enumerate`:

```python
ds = ["An", "Bình", "Chi"]
for ten in ds:
    print(ten.upper())
for i, ten in enumerate(ds, start=1):
    print(i, ten)
for c in "FTU":
    print(c, end="-")
```

??
`for i, x in enumerate(["a", "b"]):` lần lặp đầu `i` bằng:
- [x] `0`
- [ ] `1`
- [ ] `"a"`
- [ ] `None`
> `enumerate` mặc định đếm từ 0; dùng `enumerate(ds, start=1)` để bắt đầu từ 1.

@@@ c2-7 | Vòng lặp while, break, continue
@ftu: Bộ câu hỏi giữa kỳ Lecture 3–6 – vòng lặp, `break`/`continue`
@goal: Dùng `while` khi không biết trước số lần lặp, thoát sớm bằng `break`, bỏ qua bằng `continue`, tránh lặp vô hạn.
@practice: gk12, gk15

> **Nói đơn giản:** `for` dùng khi bạn **biết trước** phải lặp bao nhiêu lần. `while` dùng khi **không biết trước**: "*chừng nào* còn đói thì còn ăn". Nguy hiểm duy nhất: nếu điều kiện **không bao giờ sai** thì máy lặp mãi không dừng (lặp vô hạn) – luôn nhớ có bước làm điều kiện dần thay đổi.
>
> **Từ cần biết:** **`break`** = dừng hẳn vòng lặp · **`continue`** = bỏ qua lượt này, sang lượt kế · **lặp vô hạn** = vòng lặp không bao giờ kết thúc


```python
# Gửi 10 triệu, lãi 7%/năm: sau bao nhiêu năm vượt 20 triệu?
tien, nam = 10.0, 0
while tien < 20:
    tien *= 1.07
    nam += 1
print(nam, round(tien, 2))
```

`while` lặp **khi điều kiện còn đúng**. Trong thân phải có lệnh làm điều kiện thay đổi, nếu không sẽ lặp vô hạn (trên trang này bấm **■ Dừng**).

??
Đoạn nào lặp **vô hạn**?
- [ ] `i = 0` / `while i < 3: i += 1`
- [x] `i = 0` / `while i < 3: print(i)`
- [ ] `i = 5` / `while i > 0: i -= 2`
- [ ] `i = 0` / `while i != 4: i += 2`
> Không có lệnh thay đổi `i` nên `i < 3` mãi đúng.

```python
# Tách chữ số bằng // và %
n, tong = 2025, 0
while n > 0:
    tong += n % 10
    n //= 10
print(tong)

# break: tìm số đầu tiên chia hết cho 7 trong list
for x in [12, 15, 21, 28]:
    if x % 7 == 0:
        print("Tìm thấy", x)
        break

# continue: bỏ qua số âm
for x in [3, -1, 4, -5]:
    if x < 0:
        continue
    print(x, end=" ")
```

??
In ra gì?
```py
for i in range(5):
    if i == 3:
        break
    print(i, end=" ")
```
- [ ] `0 1 2 3`
- [x] `0 1 2`
- [ ] `0 1 2 4`
- [ ] `3`
> Tới `i == 3` thì `break` thoát vòng lặp trước khi in.

??
In ra gì?
```py
for i in range(5):
    if i % 2 == 0:
        continue
    print(i, end=" ")
```
- [ ] `0 2 4`
- [x] `1 3`
- [ ] `0 1 2 3 4`
- [ ] Không in gì
> `continue` bỏ qua phần còn lại với số chẵn → chỉ in số lẻ.

@@@ c2-8 | List – danh sách
@ftu: Ghi chú Buổi 04 – list: append, insert, index, count, sort vs sorted, reverse, pop, remove, extend
@goal: Tạo, truy cập, thêm/xoá phần tử list; dùng `len/sum/max/min`; phân biệt `sort()` và `sorted()`.
@practice: b09, gk03, gk22

> **Nói đơn giản:** List là **danh sách mua sắm**: có thứ tự, đánh số từ 0, thêm bớt sửa thoải mái. `append` ghi thêm món vào cuối danh sách. Điểm hay nhầm: `sort()` **sắp xếp ngay trên danh sách gốc**, còn `sorted()` **tạo một danh sách mới** đã sắp xếp và giữ nguyên bản gốc.
>
> **Từ cần biết:** **phần tử** = một mục trong list · **`append(x)`** = thêm x vào cuối · **`len`, `sum`, `max`, `min`** = đếm, cộng, lớn nhất, nhỏ nhất


```python
diem = [7.5, 9, 6, 8.5]
print(diem[0], diem[-1], diem[1:3], len(diem))
diem.append(10)          # thêm cuối
diem.insert(0, 5)        # chèn vào vị trí 0
diem.remove(6)           # xoá theo GIÁ TRỊ (lần xuất hiện đầu)
x = diem.pop()           # lấy và xoá phần tử cuối
print(diem, x)
print(sum(diem), max(diem), min(diem), sum(diem) / len(diem))
print(8.5 in diem, diem.index(9), [1, 2] + [3], [0] * 3)
```

??
Sau đoạn code, `a` là gì?
```py
a = [1, 2, 3]
a.append([4, 5])
```
- [ ] `[1, 2, 3, 4, 5]`
- [x] `[1, 2, 3, [4, 5]]`
- [ ] `[[1, 2, 3], 4, 5]`
- [ ] Lỗi
> `append` thêm **một** phần tử (ở đây là cả list `[4, 5]`). Muốn nối từng phần tử dùng `a.extend([4, 5])` hoặc `a + [4, 5]`.

### `sort()` và `sorted()` – lỗi kinh điển

```python
a = [3, 1, 2]
b = sorted(a)            # trả về list MỚI, a giữ nguyên
print(a, b)
a.sort(reverse=True)     # sắp xếp TẠI CHỖ, trả về None
print(a)
print(a.sort())          # None!
```

??
Hàm này trả về gì?
```py
def sap_xep(ds):
    return ds.sort()
```
- [ ] List đã sắp xếp
- [x] `None`
- [ ] List gốc chưa sắp xếp
- [ ] Lỗi
> `list.sort()` sửa list tại chỗ và trả về `None`. Viết `return sorted(ds)`.

List là **khả biến** và được truyền theo tham chiếu – sửa trong hàm là sửa luôn list của người gọi:

```python
def them(ds):
    ds.append(99)

goc = [1, 2]
them(goc)
print(goc)           # [1, 2, 99]
copy = goc.copy()    # muốn giữ bản gốc thì copy
copy.append(0)
print(goc, copy)
```

??
`a = [1, 2]; b = a; b.append(3)`. Lúc này `a` là:
- [ ] `[1, 2]`
- [x] `[1, 2, 3]`
- [ ] `[3]`
- [ ] Lỗi
> `b = a` không tạo bản sao – `a` và `b` cùng trỏ tới một list. Dùng `b = a.copy()` hoặc `a[:]`.

@@@ c2-9 | Tuple và Set
@ftu: LEC 3 – tuple bất biến, set `issubset`; so sánh list/dict/set/tuple
@goal: Dùng tuple để trả về nhiều giá trị/đóng gói dữ liệu bất biến; dùng set để loại trùng và tìm giao/hợp/hiệu.
@practice: gk23, gk24

> **Nói đơn giản:** **Tuple** giống danh sách bị **khoá chặt**: tạo xong không sửa được (hợp để giữ một cặp như toạ độ `(x, y)`). **Set** giống **một túi bi không có thứ tự và không có hai viên giống nhau** – rất tiện để loại trùng. Giao/hợp/hiệu của set chính là biểu đồ Venn quen thuộc ở môn toán.
>
> **Từ cần biết:** **bất biến** = không sửa được sau khi tạo · **giao `&`** = phần chung · **hợp `|`** = gộp lại · **hiệu `-`** = có ở A nhưng không ở B


### Tuple – list "đóng băng"

```python
diem_a = (10.5, 20.0)          # toạ độ, không đổi được
x, y = diem_a                  # "mở gói" (unpacking)
print(x, y, diem_a[0], len(diem_a))

def min_max(ds):
    return min(ds), max(ds)    # trả về tuple 2 phần tử

lo, hi = min_max([4, 9, 1])
print(lo, hi, min_max([4, 9, 1]))
a, b = 1, 2
a, b = b, a                    # đổi chỗ không cần biến tạm
print(a, b)
```

??
`def f(): return 1, 2` thì `f()` trả về:
- [ ] `[1, 2]`
- [x] `(1, 2)`
- [ ] `1`
- [ ] Lỗi vì return 2 giá trị
> Nhiều giá trị cách nhau bởi dấu phẩy tạo thành **tuple**. Khi đề yêu cầu trả về list, phải viết `[1, 2]`; trả về tuple khi thấy `(..., ...)` trong ví dụ.

### Set – tập hợp không trùng lặp

```python
s = set([3, 1, 3, 2, 1])
print(s, len(s))                   # {1, 2, 3}
a, b = {1, 2, 3, 4}, {3, 4, 5}
print(a & b, a | b, a - b, a ^ b)  # giao, hợp, hiệu, hiệu đối xứng
s.add(10)
print(10 in s, sorted(s))          # set không có thứ tự → sorted để ra list tăng dần
print({1, 2}.issubset({1, 2, 3}), {x % 3 for x in range(10)})   # tập con; set comprehension
```

So sánh nhanh 4 cấu trúc: **list** `[ ]` có thứ tự, sửa được, cho phép trùng · **tuple** `( )` có thứ tự, **không** sửa được · **set** `{ }` không thứ tự, không trùng · **dict** `{k: v}` tra cứu theo khoá.

??
`len(set("banana"))` bằng:
- [ ] `6`
- [x] `3`
- [ ] `2`
- [ ] `1`
> Các ký tự phân biệt: b, a, n → 3.

??
`{1, 2, 3} - {2, 3, 4}` là:
- [x] `{1}`
- [ ] `{4}`
- [ ] `{1, 4}`
- [ ] `{2, 3}`
> Hiệu `a - b`: phần tử có trong a nhưng không có trong b.

@@@ c2-10 | Dict – từ điển
@ftu: Ghi chú Buổi 04 – dictionary; đề cương ôn tập – keys/values/items, `get` với giá trị mặc định
@goal: Tạo và tra cứu dict, thêm/sửa khoá, duyệt `items()`, dùng `get` và mẫu đếm tần suất.
@practice: b08, b11, gk34

> **Nói đơn giản:** Dict là **cuốn danh bạ**: bạn tra theo **tên** (gọi là *khoá*) để ra **số điện thoại** (gọi là *giá trị*), chứ không tra theo số thứ tự. Dùng `.get(khoá)` an toàn hơn `[khoá]` vì nếu không tìm thấy nó không báo lỗi. Mẫu "đếm tần suất" (mỗi từ xuất hiện mấy lần) là bài thi rất hay gặp.
>
> **Từ cần biết:** **khoá (key)** = nhãn để tra cứu · **giá trị (value)** = nội dung ứng với khoá · **`items()`** = duyệt từng cặp (khoá, giá trị)


```python
sv = {"ten": "Lan", "lop": "K62", "diem": 8.5}
print(sv["ten"], sv.get("tuoi"), sv.get("tuoi", 0))
sv["diem"] = 9          # sửa
sv["tuoi"] = 20         # thêm khoá mới
del sv["lop"]
print(sv, len(sv), "ten" in sv)
for k, v in sv.items():
    print(k, "→", v)
print(list(sv.keys()), list(sv.values()))
```

??
`d = {"a": 1}`. `d["b"]` gây lỗi gì?
- [ ] `IndexError`
- [x] `KeyError`
- [ ] Trả về `None`
- [ ] `NameError`
> Khoá không tồn tại → `KeyError`. Dùng `d.get("b")` (trả về `None`) hoặc `d.get("b", 0)` để an toàn.

### Mẫu đếm tần suất (xuất hiện trong rất nhiều đề)

```python
tu = "an binh an chi binh an".split()
dem = {}
for w in tu:
    dem[w] = dem.get(w, 0) + 1
print(dem)

from collections import Counter     # cách ngắn hơn
c = Counter(tu)
print(c, c.most_common(1), c["an"])
```

??
Kết quả `d`?
```py
d = {}
for ch in "aba":
    d[ch] = d.get(ch, 0) + 1
```
- [ ] `{'a': 1, 'b': 1}`
- [x] `{'a': 2, 'b': 1}`
- [ ] `{'a': 2, 'b': 2}`
- [ ] `KeyError`
> `get(ch, 0)` trả về 0 cho khoá mới nên không lỗi; 'a' xuất hiện 2 lần.

??
Duyệt dict `d` lấy cả khoá và giá trị:
- [ ] `for k, v in d:`
- [x] `for k, v in d.items():`
- [ ] `for k, v in d.keys():`
- [ ] `for (k, v) in enumerate(d):`
> `for k in d` chỉ cho khoá. `items()` cho cặp (khoá, giá trị).

@@@ c2-11 | Hàm: tham số, giá trị mặc định, phạm vi biến
@ftu: Đề cương ôn tập Phần I – "thực hành viết hàm def"; Buổi 03 – tự viết module
@goal: Viết hàm có tham số mặc định, gọi bằng tên tham số, hiểu biến cục bộ và hàm trả về `None`.
@practice: b14, b15

> **Nói đơn giản:** Đây là phần nâng cấp của bài 0.8. **Tham số mặc định** là giá trị dự phòng: nếu người gọi không đưa gì thì dùng giá trị đó. **Biến cục bộ** là biến chỉ "sống" trong hàm, như đồ trong phòng riêng – ra ngoài thì không thấy. Hàm không có `return` sẽ trả về `None` (nghĩa là "không có gì").
>
> **Từ cần biết:** **tham số mặc định** = `def f(x, n=2)` (nếu bỏ qua n thì n=2) · **phạm vi biến** = biến dùng được ở đâu · **`None`** = giá trị "trống"


```python
def diem_hp(cc, gk, ck, w=(0.1, 0.3, 0.6)):
    """Điểm học phần TIN314: 10% chuyên cần, 30% dự án, 60% thi."""
    return round(cc * w[0] + gk * w[1] + ck * w[2], 2)

print(diem_hp(10, 8, 7))
print(diem_hp(10, 8, 7, w=(0.1, 0.4, 0.5)))
print(diem_hp(ck=7, gk=8, cc=10))     # gọi bằng tên – thứ tự tuỳ ý
```

??
`def f(a, b=2): return a * b`. `f(5)` bằng:
- [ ] Lỗi thiếu tham số
- [x] `10`
- [ ] `5`
- [ ] `7`
> `b` có giá trị mặc định 2 nên có thể bỏ qua khi gọi.

### Biến cục bộ và `None`

```python
def tinh():
    ket_qua = 42        # biến cục bộ: chỉ tồn tại trong hàm
    return ket_qua

print(tinh())

def quen_return(x):
    y = x * 2           # quên return

print(quen_return(5))   # None
```

??
Hàm không có lệnh `return` sẽ trả về:
- [ ] `0`
- [ ] `""`
- [x] `None`
- [ ] Lỗi
> Mọi hàm Python đều trả về giá trị; nếu không có `return` thì trả về `None`.

Hàm nhận số lượng tham số tuỳ ý với `*args`:

```python
def trung_binh(*so):
    return sum(so) / len(so) if so else 0

print(trung_binh(1, 2, 3), trung_binh())
```

### Tự viết module và import lại

Hàm hay dùng có thể lưu vào file `.py` rồi `import` ở notebook khác (Buổi 03 FTU: *tái sử dụng modules*):

```python
with open("tien_ich.py", "w", encoding="utf-8") as f:
    f.write("def vat(gia, thue=0.1):\n    return gia * (1 + thue)\n")

import tien_ich as ti
print(ti.vat(100), ti.vat(100, 0.08))
```

??
Trong `def f(*so):`, gọi `f(1, 2, 3)` thì `so` là:
- [ ] `[1, 2, 3]`
- [x] `(1, 2, 3)`
- [ ] `1`
- [ ] `{1, 2, 3}`
> `*args` gom các đối số vị trí thành một **tuple**.

@@@ c2-12 | List comprehension, lambda và sắp xếp theo khoá
@ftu: LEC 3 – list/dict/set comprehension; đề cuối kỳ mẫu câu 8 (list comprehension có điều kiện)
@goal: Viết list/dict comprehension có điều kiện, dùng `lambda` làm `key` cho `sorted/max/min`.
@practice: gk33, gk32, b12

> **Nói đơn giản:** **List comprehension** là cách viết gọn một vòng `for` thành một dòng. Cách đọc: `[x * 2 for x in ds if x > 0]` = "với mỗi `x` trong `ds`, **nếu** `x > 0`, lấy `x * 2`". **`lambda`** là hàm không có tên, viết trên một dòng, thường dùng để chỉ cho máy biết **sắp xếp theo tiêu chí nào**.
>
> **Từ cần biết:** **comprehension** = viết gọn tạo list/dict · **`lambda x: ...`** = hàm tí hon một dòng · **`key=`** = tiêu chí để sắp xếp/so sánh


Comprehension = cách viết gọn của mẫu "tạo list rỗng → for → append":

```python
nums = [3, 8, 1, 6, 5]
binh_phuong = [x ** 2 for x in nums]
so_chan = [x for x in nums if x % 2 == 0]
nhan = ["chẵn" if x % 2 == 0 else "lẻ" for x in nums]
dem_chu = {w: len(w) for w in ["an", "binh", "chi"]}
print(binh_phuong, so_chan, nhan, dem_chu, sep="\n")
```

Mẫu: `[biểu_thức for x in dãy if điều_kiện]`. Có `else` thì đặt **trước** `for`: `[a if đk else b for x in dãy]`.

??
`[x * 2 for x in range(5) if x % 2 == 1]` bằng:
- [ ] `[0, 2, 4, 6, 8]`
- [x] `[2, 6]`
- [ ] `[1, 3]`
- [ ] `[2, 4]`
> Lọc x lẻ: 1, 3 → nhân 2: 2, 6.

### `lambda` và `key=`

`lambda x: biểu_thức` là hàm vô danh một dòng. Hay dùng nhất làm **tiêu chí sắp xếp**:

```python
sv = [("An", 8.5, 20), ("Bình", 9.0, 19), ("Chi", 8.5, 19)]
print(sorted(sv, key=lambda s: s[1], reverse=True))   # theo điểm giảm dần
print(sorted(sv, key=lambda s: (-s[1], s[0])))         # điểm giảm, hoà thì tên tăng
print(max(sv, key=lambda s: s[1]))                     # SV điểm cao nhất
print(sorted(["chuối", "táo", "dưa hấu"], key=len))
```

??
`sorted(["bb", "a", "ccc"], key=len)` trả về:
- [x] `['a', 'bb', 'ccc']`
- [ ] `['ccc', 'bb', 'a']`
- [ ] `['a', 'bb', 'ccc', 3]`
- [ ] `[1, 2, 3]`
> Sắp theo độ dài tăng dần; kết quả vẫn là các chuỗi gốc.

??
Sắp xếp list dict `ds` theo `"tuoi"` **giảm dần**, hoà thì theo `"ten"` tăng dần:
- [ ] `sorted(ds, key=lambda d: (d["tuoi"], d["ten"]), reverse=True)`
- [x] `sorted(ds, key=lambda d: (-d["tuoi"], d["ten"]))`
- [ ] `sorted(ds, key=lambda d: d["tuoi"] - d["ten"])`
- [ ] `ds.sort("tuoi", "ten")`
> Đổi dấu số để giảm dần cho riêng tiêu chí đó. `reverse=True` sẽ đảo cả tên.

@@@ c2-13 | Xử lý lỗi với try / except
@ftu: Bộ câu hỏi giữa kỳ Lecture 3–6 – "ngoại lệ"; tự luận "tìm và sửa lỗi"
@goal: Bắt lỗi bằng `try/except` đúng loại, dùng `else/finally`, chủ động `raise` khi dữ liệu sai.
@practice: b14, tt105

> **Nói đơn giản:** `try / except` giống **tấm lưới của người đi xiếc**: bạn *thử* làm việc nguy hiểm; nếu bị "rơi" (xảy ra lỗi) thì rơi vào lưới thay vì làm cả chương trình sập. Bạn quyết định làm gì khi rơi. `raise` ngược lại: *chủ động* báo lỗi khi thấy dữ liệu sai.
>
> **Từ cần biết:** **`try`** = thử làm · **`except`** = nếu lỗi thì làm việc này · **`finally`** = luôn làm dù có lỗi hay không · **`raise`** = tự báo lỗi


```python
def chia_an_toan(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(chia_an_toan(6, 3), chia_an_toan(1, 0))

def doc_so(s):
    try:
        return float(s)
    except ValueError:          # "abc" không chuyển thành số được
        return 0.0

print([doc_so(x) for x in ["3.5", "abc", "7"]])
```

??
`float("abc")` gây lỗi gì?
- [ ] `TypeError`
- [x] `ValueError`
- [ ] `NameError`
- [ ] `ZeroDivisionError`
> Đúng kiểu (`str`) nhưng giá trị không hợp lệ → `ValueError`. `TypeError` là sai kiểu, ví dụ `float([1])`.

??
In ra gì?
```py
try:
    x = 1 / 0
    print("A")
except ZeroDivisionError:
    print("B")
finally:
    print("C")
```
- [ ] `A C`
- [x] `B C`
- [ ] `A B C`
- [ ] `B`
> Lỗi xảy ra ở dòng chia → bỏ qua `print("A")`, nhảy vào `except`; `finally` luôn chạy.

Chủ động báo lỗi khi đầu vào không hợp lệ:

```python
def can_bac_hai(x):
    if x < 0:
        raise ValueError("x phải không âm")
    return x ** 0.5

try:
    can_bac_hai(-4)
except ValueError as e:
    print("Lỗi:", e)
```

??
Nên bắt lỗi như thế nào?
- [ ] Luôn `except:` trống để bắt mọi thứ
- [x] Bắt đúng loại lỗi dự kiến, ví dụ `except ValueError:`
- [ ] Không bao giờ dùng try/except
- [ ] Đặt cả chương trình trong một khối try
> `except:` trống che mất cả lỗi do chính bạn viết sai, rất khó tìm bug.

@@@ c2-14 | Mẫu thuật toán hay gặp trong đề thi
@ftu: Đề giữa kỳ TIN314 (34 câu CodeRunner) và "Tuyển tập 30 bài"
@goal: Nhận ra và viết nhanh 5 mẫu: đếm có điều kiện, tìm max/min có tiêu chí, kiểm tra số nguyên tố, duyệt cặp/bộ ba, min-so-far.
@practice: gk02, gk09, gk10, gk16

> **Nói đơn giản:** Đề thi lặp lại vài **"công thức quen"** – giống vài món cơ bản mà đầu bếp nào cũng thuộc. Học thuộc *khung* của từng mẫu: **đếm có điều kiện** = biến đếm bắt đầu 0, gặp phần tử thoả điều kiện thì `+1`; **tìm lớn nhất** = giữ một biến "kỷ lục" và cập nhật khi gặp số lớn hơn.
>
> **Từ cần biết:** **biến đếm** = biến tăng thêm 1 mỗi lần thoả điều kiện · **số nguyên tố** = chỉ chia hết cho 1 và chính nó · **min-so-far** = giá trị nhỏ nhất đã gặp tới giờ


Đề giữa kỳ cho thấy phần lớn câu hỏi là các **mẫu lặp đi lặp lại**. Thuộc 5 mẫu này là làm được đa số câu dễ–trung bình.

```python
# 1. Đếm có điều kiện
def dem(ds):
    return sum(1 for x in ds if x % 2 == 0 and x % 3 != 0)

# 2. Kiểm tra số nguyên tố – chỉ cần thử tới căn bậc hai
def la_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

print(dem([2, 3, 4, 6, 8]), [n for n in range(20) if la_nguyen_to(n)])
```

??
Vì sao kiểm tra nguyên tố chỉ cần thử ước tới `√n`?
- [ ] Vì Python không tính được số lớn hơn
- [x] Nếu n = a × b với a ≤ b thì a ≤ √n, nên nếu có ước thì có ước ≤ √n
- [ ] Vì số nguyên tố luôn nhỏ hơn √n
- [ ] Không đúng, phải thử tới n − 1
> Thử tới √n cho kết quả giống thử tới n − 1 nhưng nhanh hơn rất nhiều – test ẩn thường có số lớn.

```python
from itertools import combinations

# 3. Duyệt mọi cặp / bộ ba (tổ hợp)
ds = [-1, 0, 1, 2, -3]
print(sum(1 for a, b, c in combinations(ds, 3) if a + b + c == 0))

# 4. Min-so-far: lợi nhuận lớn nhất khi mua trước bán sau
gia = [7, 1, 5, 3, 6, 4]
thap_nhat, loi_nhuan = float("inf"), 0
for g in gia:
    thap_nhat = min(thap_nhat, g)
    loi_nhuan = max(loi_nhuan, g - thap_nhat)
print(loi_nhuan)

# 5. Phần tử xuất hiện nhiều nhất, hoà thì lấy số nhỏ nhất
from collections import Counter
c = Counter([3, 1, 3, 1, 2])
nhieu = max(c.values())
print(min(x for x in c if c[x] == nhieu))
```

??
`list(combinations([1, 2, 3], 2))` có bao nhiêu phần tử?
- [ ] 6
- [x] 3
- [ ] 9
- [ ] 2
> Tổ hợp chập 2 của 3 = 3: (1,2), (1,3), (2,3). Thứ tự không quan trọng, không lặp lại phần tử.

??
Giá cổ phiếu `[9, 2, 6, 1, 4]`. Lợi nhuận lớn nhất mua 1 lần, bán 1 lần (mua trước bán sau) là:
- [ ] `8`
- [x] `4`
- [ ] `3`
- [ ] `5`
> Mua giá 2, bán giá 6 → 4. Không được "mua 1 bán 9" vì 9 đứng trước.

??
Đề yêu cầu "nếu hoà, trả về số **nhỏ nhất**". Với `Counter([5, 5, 2, 2, 9])`, dùng `c.most_common(1)[0][0]` trả về:
- [x] `5` – sai yêu cầu, vì most_common giữ thứ tự xuất hiện đầu tiên
- [ ] `2` – đúng yêu cầu
- [ ] `9`
- [ ] Lỗi
> 5 và 2 cùng 2 lần; `most_common` ưu tiên phần tử gặp trước (5). Phải tự lọc các phần tử có tần suất lớn nhất rồi lấy `min`.

@@@ c2-15 | Dạng câu hỏi Phần I đề thi FTU: input, chuỗi, list, hàm
@ftu: Đề cuối kỳ mẫu Phần I (câu 1–10), đề 5/1/2024 câu 1–5
@goal: Làm nhanh nhóm câu Phần I (3 điểm) của đề cuối kỳ thật: nhập từ bàn phím bằng `input()`, cắt chuỗi, kiểm tra list, list comprehension có điều kiện và viết hàm.
@practice: fe01, fe02, fe03, fe04, fe05, fe06

> **Nói đơn giản:** Đây là dạng đề **"thi thật"**. Điều dễ vấp nhất: `input()` **luôn trả về chữ**, kể cả khi người dùng gõ số – nên phải đổi bằng `int(...)` hoặc `float(...)` trước khi tính toán. Hãy đọc kỹ đề rồi chia nhỏ thành các bước, làm từng bước như trong Chương 0.
>
> **Từ cần biết:** **`input()`** = nhận chữ người dùng gõ vào · **chuỗi → số** = `int(input())` · **tách dữ liệu** = `.split()` để cắt dòng thành các phần


Các đề cuối kỳ TIN314 (đề mẫu, đề 5/1/2024) mở đầu bằng khoảng 10 câu Python cơ bản, mỗi câu vài dòng code. Ví dụ dạng câu: *"nhập diện tích và giá nhà từ bàn phím, tính giá trên m²"*, *"lấy chữ FTU và chữ Data từ chuỗi"*, *"kiểm tra số chẵn/lẻ bằng if–elif–else"*, *"tạo list 50→150 bằng list comprehension rồi kiểm tra sự tồn tại của 60 và 12"*.

### `input()` – nhập từ bàn phím

`input()` luôn trả về **chuỗi** → phải đổi kiểu trước khi tính toán. (Trên trang này, ô code đọc dữ liệu nhập từ hộp *stdin* của Sổ tay; ô dưới đây giả lập người dùng nhập 5 rồi 3.)

```python
dien_tich = float(input("Diện tích (m2): "))
gia = float(input("Giá (tỷ): "))
print("Giá trên m2:", round(gia / dien_tich, 3))
```

??
`x = input()` và người dùng gõ `7`. `x * 2` cho:
- [ ] `14`
- [x] `"77"`
- [ ] `7`
- [ ] Lỗi
> `input()` trả về chuỗi `"7"`; chuỗi × 2 là lặp lại. Phải viết `int(input())`.

### Chuỗi, chẵn/lẻ và hàm

```python
b = "FTU Data"
print(b[:3], b[4:], len(b))           # cắt theo vị trí
print(b.split()[0], b.split()[-1])    # cắt theo từ – tổng quát hơn

a = 7
if a == 0:
    print("Số 0")
elif a % 2 == 0:
    print("Chẵn")
else:
    print("Lẻ")

def production(A, K, L, alpha=0.3):  # hàm sản xuất Cobb-Douglas
    return A * K ** alpha * L ** (1 - alpha)

print(round(production(1.2, 100, 50), 2))
```

??
Viết hàm sản xuất Q = A·K^α·L^(1−α), cách viết đúng là:
- [ ] `A * K ^ alpha * L ^ (1 - alpha)`
- [x] `A * K ** alpha * L ** (1 - alpha)`
- [ ] `A * K * alpha * L * (1 - alpha)`
- [ ] `A * pow(K) * pow(L)`
> Luỹ thừa là `**`. Dấu `^` trong Python là phép XOR bit.

### List: tồn tại, đầu–cuối, comprehension có điều kiện

```python
python_list = [x for x in range(50, 151)]
print(len(python_list), 60 in python_list, 12 in python_list)

ds = [990, 290, 587, 227, 313, 55, 822, 256, 612, 167, 551, 452, 37]
dau, cuoi = ds[:10], ds[-10:]
print(max(dau), min(dau), dau[::-1][:3])
print([x for x in ds if 1 <= x <= 200 and x % 7 != 0])
```

??
`range(50, 151)` có bao nhiêu số?
- [ ] 100
- [x] 101
- [ ] 150
- [ ] 151
> Từ 50 đến 150 tính cả hai đầu: 150 − 50 + 1 = 101.

??
Lấy 10 phần tử **cuối** của list `ds`:
- [ ] `ds[10:]`
- [x] `ds[-10:]`
- [ ] `ds[:-10]`
- [ ] `ds.last(10)`
> `ds[:-10]` là mọi phần tử **trừ** 10 phần tử cuối.

> **Mẹo thi:** đề yêu cầu "in ra" thì phải có `print(...)` (hoặc để biểu thức ở dòng cuối ô Jupyter). Đọc kỹ tên biến đề yêu cầu (ví dụ `first_ten_units`, `list_nums`) và đặt **đúng tên**.
