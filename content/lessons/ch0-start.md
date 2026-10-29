@title: Làm quen với lập trình (từ con số 0)
@chapter: 0
@summary: Dành cho người chưa từng viết code: lập trình là gì, lệnh print, biến, số và chữ, if, vòng lặp, hàm, cách đọc lỗi – mỗi bài một ý, vừa đọc vừa gõ.

Chương này dành cho bạn nếu **chưa từng viết một dòng code nào**. Không cần giỏi toán, không cần biết tiếng Anh.

Cách học ở đây rất đơn giản, lặp lại ở mọi bài:

1. **Đọc một ý nhỏ** (khoảng 5–10 phút), có ví dụ đời thường.
2. **Bấm nút Chạy** ở ô code để xem điều gì xảy ra – rồi **tự sửa vài chữ và chạy lại**. Nghịch code là cách học nhanh nhất.
3. **Trả lời 1–2 câu hỏi nhanh** để kiểm tra mình đã hiểu chưa.
4. **Làm một bài tập nhỏ** rồi bấm *Nộp & chấm* – hệ thống báo đúng/sai ngay.

> **Đừng lo nếu mắc lỗi hay làm sai.** Lập trình viên giỏi nhất cũng gặp lỗi mỗi ngày. Máy tính không "chê" bạn – nó chỉ nói cho bạn biết chỗ cần sửa. Học xong chương này (khoảng 2–3 ngày, mỗi ngày 2–3 bài), bạn sẽ đủ nền để vào Chương 2 và làm các bài luyện thi.

@@@ c0-1 | Lập trình là gì?
@ftu: Bổ trợ cho người mới – chuẩn bị cho Buổi 1 (giới thiệu Python)
@goal: Hiểu lập trình là viết **chỉ dẫn từng bước** cho máy tính, và biết bấm Chạy để xem kết quả.

### Máy tính rất nhanh nhưng... rất "ngốc"

Hãy tưởng tượng bạn nhờ một người máy nấu mì. Nếu chỉ nói "nấu mì đi" thì nó đứng yên – vì nó **không tự biết** gì cả. Bạn phải nói từng bước thật rõ:

1. Đun sôi 500 ml nước.
2. Cho gói mì vào.
3. Đợi 3 phút.
4. Cho gia vị rồi tắt bếp.

**Lập trình là viết ra những bước như vậy cho máy tính**, bằng một ngôn ngữ mà nó hiểu. Danh sách các bước đó gọi là **chương trình** (program), hay **code** (mã). Ngôn ngữ chúng ta dùng tên là **Python** – nó dễ đọc, gần với tiếng Anh nên rất hợp cho người mới.

| Đời thường | Lập trình |
|---|---|
| Công thức nấu ăn | Chương trình (code) |
| Một bước trong công thức | Một dòng lệnh |
| Làm theo công thức | **Chạy** chương trình |
| Món ăn ra lò | **Kết quả** (output) |

### Chạy code đầu tiên

Ô dưới đây chứa code thật. Bấm nút **Chạy** ngay bên dưới ô và nhìn phần kết quả:

```python
print("Xin chào, đây là chương trình đầu tiên của tôi!")
```

Bạn vừa ra lệnh cho máy tính **in một câu lên màn hình** – và nó làm đúng. Giờ hãy **sửa câu chữ trong dấu ngoặc kép** thành tên của bạn rồi bấm Chạy lại.

??
Chương trình máy tính giống thứ gì nhất trong đời thường?
- [ ] Một bức tranh
- [x] Một công thức nấu ăn: danh sách các bước làm lần lượt
- [ ] Một cuốn từ điển
- [ ] Một chiếc điện thoại
> Chương trình là chuỗi chỉ dẫn từng bước. Máy tính làm đúng theo thứ tự đó, không tự đoán ý bạn.

??
"Chạy" một chương trình nghĩa là gì?
- [ ] Xoá chương trình đi
- [x] Bảo máy tính thực hiện các dòng lệnh và cho ta xem kết quả
- [ ] Lưu chương trình vào ổ đĩa
- [ ] Dịch chương trình sang tiếng Việt
> Viết code chỉ là soạn công thức; bấm Chạy mới là lúc máy tính thật sự làm theo.

### Về các bài tập trong web này

Mọi bài tập đều có **khung hàm** sẵn như sau (bài sau sẽ giải thích kỹ):

```text
def ten_bai_tap():
    return ...      ← bạn chỉ cần thay dấu ... bằng câu trả lời
```

Ở bài đầu này bạn chỉ cần: **thay `...` bằng đáp án** (một số), rồi bấm **Nộp & chấm**. Chưa cần hiểu `def` hay `return` – cứ coi đó là "cái khung" đã dựng sẵn.

@@@ c0-2 | Lệnh print và dấu ngoặc kép
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 2 (print, chuỗi)
@goal: Dùng `print` để in chữ và số; biết chữ phải nằm trong dấu ngoặc kép; nhận ra sai một ký tự là máy báo lỗi.

### `print` = "in ra màn hình"

`print` là lệnh thông dụng nhất. Viết `print(` rồi đặt thứ cần in vào giữa hai dấu ngoặc tròn:

```python
print("Học Python thật dễ")
print(2025)
print(3 + 4)
```

Quan sát 3 dòng trên:
- `"Học Python thật dễ"` là **chữ**, nên phải nằm trong **dấu ngoặc kép** `" "`. Máy tính coi mọi thứ trong dấu ngoặc kép là chữ để in nguyên văn.
- `2025` là **số**, không cần ngoặc kép.
- `3 + 4` là phép tính – máy tính tự **tính ra 7** rồi mới in.

Máy tính cũng làm phép tính trong ngoặc kép? Hãy so sánh:

```python
print(3 + 4)       # in 7  – máy tính tính toán
print("3 + 4")     # in nguyên văn: 3 + 4  – vì đây là chữ
```

> Phần sau dấu `#` là **ghi chú** cho con người đọc. Máy tính bỏ qua nó hoàn toàn.

In nhiều thứ cùng lúc bằng cách ngăn cách bằng dấu phẩy – `print` tự chèn dấu cách:

```python
print("Năm nay là", 2025)
print("Điểm:", 8, "trên", 10)
```

### Máy tính rất khắt khe về từng ký tự

Con người đọc "print" hay "Print" đều hiểu. Máy tính thì **không**: viết hoa, viết thường, thiếu một dấu ngoặc là nó báo lỗi. Ô dưới cố tình viết sai (chữ `P` hoa) – hãy bấm Chạy để xem lỗi trông thế nào:

```python
Print("Xin chào")     # lỗi cố ý: print phải viết thường
```

Dòng cuối của thông báo là `NameError: name 'Print' is not defined` – nghĩa là "tôi không biết lệnh nào tên `Print`". Sửa lại thành `print` là hết lỗi. Chuyện này xảy ra thường xuyên, đừng hoảng!

??
Dòng nào in ra đúng chữ `Xin chao` lên màn hình?
- [ ] `print(Xin chao)`
- [x] `print("Xin chao")`
- [ ] `Print("Xin chao")`
- [ ] `print "Xin chao"`
> Chữ phải nằm trong dấu ngoặc kép; `print` viết thường và có cặp ngoặc tròn.

??
`print("2 + 3")` in ra gì?
- [ ] `5`
- [x] `2 + 3`
- [ ] Lỗi
- [ ] `"2 + 3"`
> Trong dấu ngoặc kép là chữ nên được in nguyên văn. Muốn máy tính cộng thì viết `print(2 + 3)`.

@@@ c0-3 | Biến: chiếc hộp có dán nhãn
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 2 (biến, phép toán)
@goal: Tạo biến bằng dấu `=`, hiểu biến là tên gắn với một giá trị, và biết giá trị trong biến có thể đổi.

### Vấn đề: nhớ một giá trị

Bạn mua 3 cái bút, mỗi cái 5000 đồng. Muốn máy tính tính tiền, rồi lát nữa dùng lại số tiền đó – nó phải **nhớ** các con số. Nơi để nhớ gọi là **biến**.

> **Biến giống một chiếc hộp có dán nhãn.** Bạn bỏ giá trị vào hộp, dán nhãn tên lên hộp. Cần dùng thì gọi tên nhãn, máy tính mở hộp lấy giá trị ra.

Bỏ giá trị vào hộp bằng dấu **`=`**:

```python
gia_but = 5000        # hộp tên gia_but, bên trong là 5000
so_luong = 3          # hộp tên so_luong, bên trong là 3
tong_tien = gia_but * so_luong
print(tong_tien)
```

Quan trọng nhất: **dấu `=` trong lập trình không phải "bằng nhau" như toán học**. Nó nghĩa là **"cất giá trị bên phải vào hộp có tên bên trái"**. Vì vậy `tong_tien = gia_but * so_luong` đọc là: "lấy 5000 × 3 rồi cất vào hộp tên `tong_tien`".

Dấu `*` là phép **nhân** (phép chia là `/`, cộng `+`, trừ `-`).

### Giá trị trong hộp có thể thay

```python
diem = 6
print(diem)
diem = 9          # bỏ giá trị mới vào hộp, giá trị cũ biến mất
print(diem)
diem = diem + 1   # lấy giá trị hiện tại, cộng 1, cất lại
print(diem)
```

Dòng `diem = diem + 1` rất hay gặp: "lấy điểm hiện tại (9), cộng thêm 1 được 10, rồi cất lại vào hộp `diem`". Kết quả in ra: 6, 9, 10.

### Đặt tên cho hộp

- Chỉ dùng **chữ thường không dấu, số và dấu gạch dưới `_`** (ví dụ `gia_but`, `diem_tb`).
- **Không bắt đầu bằng số**, không có dấu cách (`so luong` ✗, `so_luong` ✓).
- Đặt tên **có nghĩa** – `tong_tien` dễ hiểu hơn `x`. Bạn của tương lai sẽ cảm ơn bạn.

??
Sau khi chạy xong đoạn code này, `a` bằng bao nhiêu?
```py
a = 4
a = a + 3
```
- [ ] 4
- [x] 7
- [ ] 3
- [ ] Lỗi
> `a = a + 3` nghĩa là lấy giá trị hiện tại của `a` (4), cộng 3 được 7, rồi cất lại vào `a`.

??
Tên biến nào **không hợp lệ**?
- [ ] `diem_tb`
- [ ] `so_luong`
- [x] `2lan`
- [ ] `ten`
> Tên biến không được bắt đầu bằng chữ số.

@@@ c0-4 | Số và chữ: hai loại dữ liệu khác nhau
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 2–3 (kiểu dữ liệu, ép kiểu)
@goal: Phân biệt số (`int`, `float`) với chữ (`str`), hiểu vì sao `"5" + "5"` ra `"55"`, và đổi qua lại bằng `int()`, `str()`.

### Máy tính phân biệt "5" và 5

Với chúng ta, `5` và `"5"` giống nhau. Với máy tính, chúng **khác loại**. Mỗi giá trị thuộc một **kiểu dữ liệu** (data type). Ba kiểu bạn gặp đầu tiên:

| Kiểu | Tên Python | Ví dụ | Hiểu đơn giản |
|---|---|---|---|
| Số nguyên | `int` | `7`, `-3`, `2025` | số không có phần lẻ |
| Số thực | `float` | `3.14`, `0.5` | số có dấu chấm thập phân (viết **dấu chấm**, không dùng dấu phẩy) |
| Chữ | `str` | `"An"`, `"5"` | chuỗi ký tự, nằm trong ngoặc kép |

Lệnh `type(...)` cho biết kiểu của một giá trị:

```python
print(type(7))
print(type(3.14))
print(type("5"))
```

### Cùng là `+` nhưng làm việc khác nhau

```python
print(5 + 5)          # số + số  → cộng: 10
print("5" + "5")      # chữ + chữ → NỐI lại: 55
print("Xin " + "chào")  # Xin chào
```

Với số, `+` là **cộng**. Với chữ, `+` là **nối** hai đoạn chữ lại với nhau. Đây là lý do `"5" + "5"` ra `55` chứ không phải `10`.

Còn trộn số với chữ thì sao? Máy tính không biết nên cộng hay nối nên báo lỗi:

```python
print("Tôi có " + 3 + " quả táo")     # lỗi cố ý: không nối được chữ với số
```

### Đổi kiểu

Muốn nối số vào chữ, hãy **đổi số thành chữ** bằng `str()`. Ngược lại, `int()` đổi chữ thành số nguyên:

```python
so_qua = 3
print("Tôi có " + str(so_qua) + " quả táo")

nhap = "12"                  # đây là CHỮ
print(int(nhap) + 1)         # đổi thành số rồi mới cộng được: 13
```

Dữ liệu người dùng gõ vào thường là **chữ**, nên `int()` sẽ rất hay dùng.

??
`print("7" + "3")` in ra gì?
- [ ] `10`
- [x] `73`
- [ ] `"10"`
- [ ] Lỗi
> Hai giá trị đều là chữ nên `+` nối chúng lại thành `73`.

??
`int("20") + 5` cho kết quả gì?
- [ ] `"205"`
- [ ] Lỗi
- [x] `25`
- [ ] `20 5`
> `int("20")` đổi chữ `"20"` thành số 20; sau đó 20 + 5 = 25.

@@@ c0-5 | Ghép chữ và số bằng f-string
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 2–3 (format / f-string)
@goal: Dùng f-string `f"... {biến} ..."` để chèn giá trị vào câu một cách gọn gàng.

Bài trước, nối số vào chữ phải gọi `str()` rất rườm rà. Python có cách **gọn hơn nhiều**: đặt chữ **`f`** ngay trước dấu ngoặc kép, rồi viết tên biến trong **dấu ngoặc nhọn `{ }`** – Python tự thay bằng giá trị:

```python
ten = "Lan"
tuoi = 20
print(f"Xin chào {ten}, bạn {tuoi} tuổi")
```

Hãy hình dung f-string là **một tờ đơn có chỗ trống**: phần chữ cố định giữ nguyên, phần trong `{ }` được điền bằng giá trị biến. Trong `{ }` còn viết được **phép tính**:

```python
gia = 5000
so_luong = 3
print(f"Tổng tiền: {gia * so_luong} đồng")
```

Muốn hiện số đẹp hơn, thêm `:,` để có dấu phân cách hàng nghìn, `:.2f` để lấy 2 chữ số thập phân:

```python
luong = 12500000
ti_le = 0.8567
print(f"Lương: {luong:,} đồng")      # 12,500,000
print(f"Tỉ lệ: {ti_le:.2f}")         # 0.86
```

??
Với `ten = "Nam"`, dòng nào in ra `Chào Nam!`?
- [ ] `print("Chào {ten}!")`
- [x] `print(f"Chào {ten}!")`
- [ ] `print(f"Chào ten!")`
- [ ] `print(f"Chào (ten)!")`
> Cần chữ `f` đứng trước ngoặc kép, và tên biến nằm trong ngoặc nhọn `{ }`. Thiếu `f` thì `{ten}` bị in nguyên văn.

@@@ c0-6 | Quyết định với if / else
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 3 (if / elif / else)
@goal: Viết được câu điều kiện `if ... else ...`, dùng các phép so sánh `==`, `>`, `<`, `>=`, và hiểu vì sao phải thụt lề.

### Cuộc sống đầy "nếu... thì..."

*Nếu trời mưa thì mang ô, nếu không thì đội mũ.* Máy tính cũng ra quyết định như vậy bằng **`if`** (nếu) và **`else`** (nếu không):

```python
diem = 7.5

if diem >= 5:
    print("Đạt")
else:
    print("Chưa đạt")
```

Đọc từng dòng:
- `if diem >= 5:` → "**Nếu** điểm lớn hơn hoặc bằng 5 **thì**…" (nhớ dấu **`:`** ở cuối dòng).
- Dòng thụt vào bên dưới là việc làm **khi điều kiện đúng**.
- `else:` → "**Nếu không** thì…", và dòng thụt vào bên dưới là việc làm khi điều kiện sai.

**Thụt lề** (đẩy vào khoảng 4 dấu cách) là *bắt buộc* trong Python. Nó cho máy biết dòng nào thuộc về `if`, dòng nào thuộc về `else`. Quên thụt lề là lỗi phổ biến nhất của người mới.

### Các phép so sánh

| Viết | Nghĩa |
|---|---|
| `a == b` | a **bằng** b (hai dấu `=`!) |
| `a != b` | a khác b |
| `a > b`, `a < b` | lớn hơn, nhỏ hơn |
| `a >= b`, `a <= b` | lớn hơn hoặc bằng, nhỏ hơn hoặc bằng |

Nhớ phân biệt: **một dấu `=` là "cất vào hộp"**, **hai dấu `==` là "hỏi có bằng nhau không"**.

Nhiều nhánh hơn thì thêm **`elif`** (viết tắt của "else if" – *nếu không thì nếu*):

```python
diem = 8.2

if diem >= 8:
    print("Giỏi")
elif diem >= 6.5:
    print("Khá")
elif diem >= 5:
    print("Trung bình")
else:
    print("Yếu")
```

Máy tính xét **từ trên xuống**, gặp điều kiện đầu tiên đúng thì làm và **bỏ qua các nhánh còn lại**. Thử đổi `diem` thành 5.5, 9, 3 rồi chạy lại xem sao.

??
`5 == 5` cho giá trị gì?
- [ ] `5`
- [x] `True` (đúng)
- [ ] `False` (sai)
- [ ] Lỗi
> `==` là phép hỏi "có bằng nhau không?" và trả lời `True` hoặc `False`.

??
Đoạn code in ra gì?
```py
x = 4
if x > 10:
    print("A")
else:
    print("B")
```
- [ ] `A`
- [x] `B`
- [ ] `A` rồi `B`
- [ ] Không in gì
> 4 không lớn hơn 10 nên điều kiện sai, máy tính làm nhánh `else` và in `B`.

@@@ c0-7 | Lặp lại với vòng lặp for
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 3 (vòng lặp for, range)
@goal: Dùng `for ... in range(...)` để lặp lại việc nhiều lần và cộng dồn kết quả vào một biến.

### Đừng làm đi làm lại bằng tay

Muốn in "Chào" 5 lần, bạn có thể copy 5 dòng `print`. Còn 1000 lần thì sao? Hãy để máy tính **lặp lại** giúp, bằng vòng lặp **`for`**:

```python
for lan in range(5):
    print("Chào")
```

`range(5)` tạo ra dãy 5 số **0, 1, 2, 3, 4** (bắt đầu từ **0**, và **không** có số 5). Mỗi lượt lặp, biến `lan` nhận một số trong dãy và các dòng **thụt vào** bên dưới được làm một lần. Hãy xem `lan` thay đổi thế nào:

```python
for lan in range(5):
    print("Lượt số", lan)
```

Muốn đếm từ 1 đến 5 thì dùng `range(1, 6)` – bắt đầu từ 1, **dừng trước 6**:

```python
for so in range(1, 6):
    print(so)
```

### Cộng dồn: kỹ thuật quan trọng

Tính tổng 1 + 2 + 3 + 4 + 5. Ý tưởng như **bỏ tiền vào heo đất**: bắt đầu với 0, mỗi lượt bỏ thêm một khoản:

```python
tong = 0                  # heo đất rỗng
for so in range(1, 6):
    tong = tong + so      # bỏ thêm 'so' vào heo
print(tong)               # 15
```

Chú ý `print(tong)` **thụt lề ít hơn** – nó nằm *ngoài* vòng lặp nên chỉ chạy **một lần** sau khi lặp xong.

??
`range(3)` tạo ra những số nào?
- [ ] 1, 2, 3
- [x] 0, 1, 2
- [ ] 0, 1, 2, 3
- [ ] 3
> `range(n)` đi từ 0 và dừng **trước** n, nên `range(3)` là 0, 1, 2.

??
Đoạn code in ra gì?
```py
tong = 0
for so in range(1, 4):
    tong = tong + so
print(tong)
```
- [ ] `3`
- [ ] `10`
- [x] `6`
- [ ] `0`
> Cộng dồn 1 + 2 + 3 = 6. `range(1, 4)` gồm 1, 2, 3.

@@@ c0-8 | Hàm: cỗ máy nhận vào và trả ra
@ftu: Bổ trợ cho người mới – chuẩn bị cho LEC 3–4 (hàm, return)
@goal: Hiểu hàm là một "cỗ máy" có đầu vào (tham số) và đầu ra (`return`), viết được hàm đơn giản, và phân biệt `print` với `return`.

### Ý tưởng: máy xay sinh tố

Bỏ **trái cây** vào máy, bấm nút, máy **trả ra ly sinh tố**. Bạn không cần biết lưỡi dao quay thế nào bên trong; bạn chỉ cần biết *bỏ gì vào* và *nhận gì ra*. **Hàm** (function) trong lập trình y như vậy:

```
đầu vào  →  [ hàm xử lý ]  →  đầu ra
```

Ví dụ hàm tính bình phương của một số:

```python
def binh_phuong(x):
    return x * x

print(binh_phuong(5))
print(binh_phuong(12))
```

Giải thích từng phần:
- **`def`** = "định nghĩa" – "tôi sắp tạo một cỗ máy mới".
- **`binh_phuong`** = tên cỗ máy (bạn tự đặt).
- **`(x)`** = **tham số**: tên gọi cho thứ được bỏ vào máy. Mỗi lần gọi, `x` nhận một giá trị khác.
- Dấu **`:`** ở cuối dòng và các dòng **thụt lề** bên dưới là "bên trong cỗ máy".
- **`return`** = "**trả ra** kết quả này".

Tạo hàm xong chưa có gì chạy. Phải **gọi hàm** bằng cách viết `binh_phuong(5)` – lúc đó `x` = 5 và máy trả ra 25.

Hàm có thể nhận **nhiều** thứ, cách nhau bằng dấu phẩy:

```python
def dien_tich_chu_nhat(dai, rong):
    return dai * rong

print(dien_tich_chu_nhat(4, 3))
```

### `print` và `return` KHÁC NHAU (rất quan trọng!)

- `print` **hiện chữ lên màn hình** cho con người đọc. Giá trị đó "biến mất" sau khi hiện.
- `return` **đưa kết quả ra khỏi hàm** để chỗ gọi hàm *dùng tiếp* được.

Hãy so sánh:

```python
def cong_return(a, b):
    return a + b

def cong_print(a, b):
    print(a + b)

ket_qua = cong_return(2, 3)
print(ket_qua + 10)        # dùng tiếp được: 15

# với cong_print thì ket_qua2 chỉ nhận được "không có gì" (None):
# ket_qua2 = cong_print(2, 3); ket_qua2 + 10 sẽ báo lỗi
```

**Hệ thống chấm bài trên web này (và cả đề thi thật) đọc giá trị `return`**, không đọc những gì bạn `print`. Khi đề bảo "trả về", hãy luôn dùng `return`.

??
Hàm này khi gọi `gap_doi(4)` trả ra giá trị nào?
```py
def gap_doi(n):
    return n * 2
```
- [ ] `4`
- [x] `8`
- [ ] `2`
- [ ] Không trả ra gì
> Gọi `gap_doi(4)` thì `n` = 4, và `return n * 2` trả ra 8.

??
Đề bài yêu cầu "viết hàm **trả về** tổng hai số". Hàm nào đúng?
- [ ] `def tong(a, b): print(a + b)`
- [x] `def tong(a, b): return a + b`
- [ ] `def tong(a, b): a + b`
- [ ] `def tong(a, b): tong = a + b`
> Chỉ `return` mới đưa kết quả ra cho hệ thống chấm. `print` chỉ hiện chữ; hai cách còn lại không trả gì cả.

@@@ c0-9 | Khi gặp lỗi: bình tĩnh và đọc
@ftu: Bổ trợ cho người mới – chuẩn bị cho Buổi 1–2 (đọc lỗi, gỡ lỗi)
@goal: Biết đọc thông báo lỗi từ dòng cuối, nhận ra 3 lỗi người mới hay gặp nhất, và có sẵn "từ điển" các từ khoá đã học.

### Lỗi không đáng sợ

Gặp lỗi là **chuyện hằng ngày**. Thông báo lỗi thật ra là máy tính đang **chỉ cho bạn chỗ cần sửa**. Mẹo: **đọc dòng cuối cùng** của thông báo – nó nói tên lỗi và lý do.

Ba lỗi bạn sẽ gặp nhiều nhất khi mới học:

**1. Quên dấu `:` hoặc dấu ngoặc** → `SyntaxError` ("sai cú pháp", tức viết sai ngữ pháp).

```python
for i in range(3)           # lỗi cố ý: thiếu dấu hai chấm ở cuối
    print(i)
```

**2. Gõ sai tên / dùng biến chưa tạo** → `NameError` ("không biết tên này").

```python
ten = "An"
print(tên)                  # lỗi cố ý: tạo 'ten' nhưng gọi 'tên' (có dấu)
```

**3. Quên thụt lề** → `IndentationError`.

```python
if 3 > 2:
print("đúng")               # lỗi cố ý: dòng này phải thụt vào
```

### Quy trình tự sửa lỗi (4 bước)

1. **Đừng hoảng**, đọc **dòng cuối** của thông báo.
2. Tìm chữ **`line N`** – lỗi nằm ở (hoặc ngay trước) dòng thứ N trong code.
3. Kiểm tra các "thủ phạm quen thuộc": thiếu `:`, thiếu/dư ngoặc, sai chữ hoa–thường, quên thụt lề, quên ngoặc kép.
4. Sửa **một chỗ**, chạy lại. Đừng sửa nhiều chỗ một lúc.

### Từ điển nhỏ cho người mới

| Từ | Nghĩa dễ hiểu |
|---|---|
| **Code / mã** | Các dòng lệnh bạn viết |
| **Chạy (run)** | Bảo máy tính làm theo code |
| **Biến** | Chiếc hộp có nhãn để nhớ giá trị |
| **Kiểu dữ liệu** | Loại của giá trị: số nguyên `int`, số thực `float`, chữ `str` |
| **Chuỗi (`str`)** | Một đoạn chữ, nằm trong ngoặc kép |
| **`print`** | Lệnh hiện kết quả lên màn hình |
| **`if` / `else`** | "Nếu… thì… nếu không thì…" |
| **`for`** | Lặp lại một việc nhiều lần |
| **Hàm (`def`)** | Cỗ máy: nhận đầu vào, trả đầu ra |
| **Tham số** | Tên gọi của thứ bỏ vào hàm |
| **`return`** | Trả kết quả ra khỏi hàm |
| **Lỗi (error/bug)** | Chỗ viết sai khiến máy không chạy được |

Bạn đã đi hết những kiến thức nền quan trọng nhất. **Chương 1 và Chương 2** sẽ đào sâu những ý này (chuỗi, list, dict, kiểu số…) – và giờ bạn sẽ thấy chúng quen hơn nhiều.

??
Bạn thấy thông báo lỗi dài. Nên đọc **từ đâu** trước?
- [ ] Bỏ qua và chạy lại cho tới khi hết
- [x] Dòng cuối cùng (tên lỗi và lý do), rồi tìm `line N` để biết chỗ sai
- [ ] Dòng đầu tiên
- [ ] Xoá hết code viết lại từ đầu
> Dòng cuối nói rõ lỗi gì; số dòng `line N` cho biết tìm ở đâu trong code của bạn.

??
Đoạn code này bị lỗi gì?
```py
def gap_ba(x)
    return x * 3
```
- [x] `SyntaxError` – thiếu dấu `:` sau dòng `def`
- [ ] `NameError`
- [ ] Không lỗi
- [ ] `ZeroDivisionError`
> Các dòng `def`, `if`, `for` luôn kết thúc bằng dấu `:`. Thiếu nó là `SyntaxError`.
