Bài tập nhỏ đi kèm các bài học Chương 0 (dành cho người mới hoàn toàn).

===== u0-01
@title: Câu trả lời cho mọi thứ
@level: easy
@topic: basics
@unit: c0-1
@fn: cau_tra_loi
::: statement
Đây là bài đầu tiên, rất nhẹ nhàng. Hàm `cau_tra_loi()` dưới đây đã dựng khung sẵn. Việc của bạn: **thay dấu `...` bằng số `42`**, rồi bấm **Nộp & chấm**.

- `cau_tra_loi()` → `42`

`return` nghĩa là "trả ra kết quả này". Chưa cần hiểu sâu – bài 8 sẽ giải thích.
::: starter
def cau_tra_loi():
    return ...


print(cau_tra_loi())
::: solution
def cau_tra_loi():
    return 42
::: tests
==> 42
::: hints
- Xoá ba dấu chấm `...` và gõ `42` vào chỗ đó.
- Dòng đúng là: `return 42`
::: explain
`return` đưa kết quả ra khỏi hàm. Hệ thống chấm gọi hàm và so sánh giá trị nhận được với đáp án.

===== u0-02
@title: Lời chào đúng từng chữ
@level: easy
@topic: string
@unit: c0-2
@fn: loi_chao
::: statement
Hàm `loi_chao()` phải trả về **đúng** dòng chữ `Xin chào Python!` – chú ý chữ hoa, dấu cách và dấu chấm than.

- `loi_chao()` → `"Xin chào Python!"`

Nhớ: **chữ phải nằm trong dấu ngoặc kép** `" "`.
::: starter
def loi_chao():
    return ...


print(loi_chao())
::: solution
def loi_chao():
    return "Xin chào Python!"
::: tests
==> "Xin chào Python!"
::: hints
- Thay `...` bằng một đoạn chữ đặt trong dấu ngoặc kép.
- `return "Xin chào Python!"`
::: explain
Máy tính so sánh từng ký tự: sai một chữ hoa, một dấu cách hay quên ngoặc kép là bị tính sai.

===== u0-03
@title: Tính tiền mua bút
@level: easy
@topic: basics
@unit: c0-3
@fn: tong_tien
::: statement
Một cái bút giá `gia` đồng, bạn mua `so_luong` cái. Viết hàm `tong_tien(gia, so_luong)` trả về tổng số tiền phải trả.

- `tong_tien(5000, 3)` → `15000`

Gợi ý theo bài học: dùng một biến để "cất" kết quả rồi trả ra.
::: starter
def tong_tien(gia, so_luong):
    # bước 1: nhân gia với so_luong rồi cất vào biến tong
    tong = ...
    # bước 2: trả biến tong ra
    return tong


print(tong_tien(5000, 3))
::: solution
def tong_tien(gia, so_luong):
    tong = gia * so_luong
    return tong
::: tests
5000, 3 ==> 15000
12000, 2 ==> 24000
::: hidden
0, 10 ==> 0
7500, 1 ==> 7500
::: hints
- Phép nhân trong Python là dấu `*`.
- `tong = gia * so_luong`
::: explain
`tong = gia * so_luong` nghĩa là "lấy gia nhân so_luong rồi cất vào hộp tên tong". Có thể viết gọn `return gia * so_luong`.

===== u0-04
@title: Ghép hai số thành một chuỗi
@level: easy
@topic: string
@unit: c0-4
@fn: ghep_so
::: statement
Viết hàm `ghep_so(a, b)` nhận hai số nguyên và trả về **chuỗi** ghép hai số đó cạnh nhau (không phải phép cộng!).

- `ghep_so(12, 34)` → `"1234"`
- `ghep_so(5, 5)` → `"55"`

Gợi ý: đổi mỗi số thành chữ bằng `str()`, rồi nối bằng `+`.
::: starter
def ghep_so(a, b):
    chu_a = str(a)
    chu_b = ...
    return chu_a + chu_b


print(ghep_so(12, 34))
::: solution
def ghep_so(a, b):
    chu_a = str(a)
    chu_b = str(b)
    return chu_a + chu_b
::: tests
12, 34 ==> "1234"
5, 5 ==> "55"
::: hidden
0, 7 ==> "07"
100, 1 ==> "1001"
::: hints
- Làm giống dòng `chu_a = str(a)` cho biến `b`.
- `chu_b = str(b)`
::: explain
Với chữ, `+` là phép **nối**. Nếu quên `str()` thì `a + b` sẽ cộng hai số (12 + 34 = 46) – sai kiểu kết quả.

===== u0-05
@title: Hoá đơn bằng f-string
@level: easy
@topic: string
@unit: c0-5
@fn: hoa_don
::: statement
Viết hàm `hoa_don(gia, so_luong)` trả về chuỗi có dạng `Tổng: <số tiền> đồng`, trong đó số tiền = `gia * so_luong`.

- `hoa_don(5000, 3)` → `"Tổng: 15000 đồng"`
::: starter
def hoa_don(gia, so_luong):
    return f"Tổng: {...} đồng"


print(hoa_don(5000, 3))
::: solution
def hoa_don(gia, so_luong):
    return f"Tổng: {gia * so_luong} đồng"
::: tests
5000, 3 ==> "Tổng: 15000 đồng"
200, 4 ==> "Tổng: 800 đồng"
::: hidden
0, 9 ==> "Tổng: 0 đồng"
::: hints
- Trong cặp ngoặc nhọn `{ }` có thể viết phép tính.
- `{gia * so_luong}`
::: explain
f-string chèn giá trị vào chữ: phần ngoài `{ }` giữ nguyên, phần trong `{ }` được tính rồi điền vào.

===== u0-06
@title: Đạt hay chưa đạt
@level: easy
@topic: basics
@unit: c0-6
@fn: dat_hay_chua
::: statement
Viết hàm `dat_hay_chua(diem)`: nếu `diem` từ **5 trở lên** trả về `"Đạt"`, ngược lại trả về `"Chưa đạt"`.

- `dat_hay_chua(7.5)` → `"Đạt"`
- `dat_hay_chua(4)` → `"Chưa đạt"`

Chú ý: đúng **5** thì vẫn là "Đạt".
::: starter
def dat_hay_chua(diem):
    # chỗ này đang sai một chút - hãy sửa phép so sánh
    if diem > 5:
        return "Đạt"
    else:
        return "Chưa đạt"


print(dat_hay_chua(7.5))
::: solution
def dat_hay_chua(diem):
    if diem >= 5:
        return "Đạt"
    else:
        return "Chưa đạt"
::: tests
7.5 ==> "Đạt"
4 ==> "Chưa đạt"
::: hidden
5 ==> "Đạt"
4.9 ==> "Chưa đạt"
10 ==> "Đạt"
0 ==> "Chưa đạt"
::: hints
- Đúng 5 vẫn phải là "Đạt", nên cần "lớn hơn hoặc bằng", viết là `>=`.
- `if diem >= 5:`
::: explain
Dùng `>=` (lớn hơn hoặc bằng) để điểm đúng bằng 5 vẫn được tính là đạt. Nếu dùng `>` thì 5 sẽ bị sai.

===== u0-07
@title: Tổng từ 1 đến n
@level: easy
@topic: algo
@unit: c0-7
@fn: tong_den
::: statement
Viết hàm `tong_den(n)` trả về tổng `1 + 2 + ... + n` bằng vòng lặp `for` và kỹ thuật "heo đất" (cộng dồn).

- `tong_den(5)` → `15`
- `tong_den(1)` → `1`
::: starter
def tong_den(n):
    tong = 0
    for so in range(1, n + 1):
        # cộng thêm so vào tong
        ...
    return tong


print(tong_den(5))
::: solution
def tong_den(n):
    tong = 0
    for so in range(1, n + 1):
        tong = tong + so
    return tong
::: tests
5 ==> 15
1 ==> 1
::: hidden
10 ==> 55
100 ==> 5050
0 ==> 0
::: hints
- Giống ví dụ trong bài: `tong = tong + so`.
- Vì `range(1, n + 1)` dừng **trước** n + 1, nên nó gồm cả n.
::: explain
`range(1, n + 1)` cho các số 1, 2, ..., n. Mỗi lượt ta bỏ thêm `so` vào `tong`. `return tong` nằm **ngoài** vòng lặp (thụt lề ít hơn) để chỉ chạy sau khi cộng xong.

===== u0-08
@title: Chu vi hình chữ nhật
@level: easy
@topic: basics
@unit: c0-8
@fn: chu_vi
::: statement
Viết hàm `chu_vi(dai, rong)` **trả về** chu vi hình chữ nhật: `(dài + rộng) × 2`.

- `chu_vi(4, 3)` → `14`

Nhớ dùng `return`, không dùng `print`!
::: starter
def chu_vi(dai, rong):
    print((dai + rong) * 2)


print(chu_vi(4, 3))
::: solution
def chu_vi(dai, rong):
    return (dai + rong) * 2
::: tests
4, 3 ==> 14
10, 5 ==> 30
::: hidden
1, 1 ==> 4
0, 7 ==> 14
::: hints
- Hàm đang dùng `print` nên trả về "không có gì". Đổi `print` thành `return`.
- `return (dai + rong) * 2`
::: explain
`print` chỉ hiện chữ lên màn hình; hệ thống chấm cần giá trị `return`. Đây là lỗi số một của người mới.

===== u0-09
@title: Tìm lỗi: tính tuổi
@level: easy
@topic: basics
@unit: c0-9
@fn: tinh_tuoi
::: statement
Hàm `tinh_tuoi(nam_sinh)` phải trả về tuổi của một người trong năm **2025**.

- `tinh_tuoi(2005)` → `20`

Đoạn code mẫu chạy được nhưng cho kết quả **sai**. Hãy đọc kết quả in ra (nó đang ra `-20`), tìm lỗi và sửa. Đây là kỹ năng "gỡ lỗi" – lập trình viên làm việc này mỗi ngày!
::: starter
def tinh_tuoi(nam_sinh):
    return nam_sinh - 2025


print(tinh_tuoi(2005))
::: solution
def tinh_tuoi(nam_sinh):
    return 2025 - nam_sinh
::: tests
2005 ==> 20
1990 ==> 35
::: hidden
2025 ==> 0
2000 ==> 25
::: hints
- Phép trừ có thứ tự: tuổi = năm hiện tại − năm sinh.
- Đảo hai vế: `2025 - nam_sinh`.
::: explain
Lỗi này không làm chương trình sập nhưng cho kết quả sai (gọi là lỗi logic). Cách phát hiện: tự chạy thử với một ví dụ và so sánh với kết quả bạn mong đợi.
