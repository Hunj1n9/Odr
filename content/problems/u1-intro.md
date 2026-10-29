Bài tập nhỏ đi kèm các bài học Chương 1.

===== u1-01
@title: Python bao nhiêu tuổi?
@level: easy
@topic: basics
@unit: c1-1
@fn: tuoi_python
::: statement
Python ra đời năm **1991**. Viết hàm `tuoi_python(nam)` trả về số năm Python đã tồn tại tính đến năm `nam`.

- `tuoi_python(2025)` → `34`
::: starter
def tuoi_python(nam):
    # thay pass bằng return <biểu thức>
    pass


print(tuoi_python(2025))
::: solution
def tuoi_python(nam):
    return nam - 1991
::: tests
2025 ==> 34
1991 ==> 0
::: hidden
2000 ==> 9
2050 ==> 59
::: hints
- Kết quả là `nam - 1991`.
- Viết `return nam - 1991` (thụt vào 4 dấu cách).
::: explain
Hàm đơn giản nhất: một dòng `return`. Nếu viết `print(nam - 1991)` thì hàm trả về `None` và bị chấm sai.

===== u1-02
@title: Lời chào
@level: easy
@topic: string
@unit: c1-2
@fn: chao
::: statement
Viết hàm `chao(ten)` trả về chuỗi `"Xin chào, <ten>!"`.

- `chao("Lan")` → `"Xin chào, Lan!"`

Chú ý đúng từng ký tự: dấu phẩy, dấu cách, dấu chấm than.
::: starter
def chao(ten):
    pass


print(chao("Lan"))
::: solution
def chao(ten):
    return f"Xin chào, {ten}!"
::: tests
"Lan" ==> "Xin chào, Lan!"
"FTU" ==> "Xin chào, FTU!"
::: hidden
"" ==> "Xin chào, !"
"Nguyễn Văn A" ==> "Xin chào, Nguyễn Văn A!"
::: hints
- Ghép chuỗi: `"Xin chào, " + ten + "!"`.
- Hoặc f-string: `f"Xin chào, {ten}!"`.
::: explain
Hệ thống so sánh chuỗi **chính xác từng ký tự** – thiếu dấu cách hay dấu chấm than đều sai.

===== u1-03
@title: Đổi giờ sang phút
@level: easy
@topic: basics
@unit: c1-2
@fn: doi_phut
::: statement
Viết hàm `doi_phut(gio)` trả về số phút tương ứng với `gio` giờ.

- `doi_phut(2)` → `120`
- `doi_phut(1.5)` → `90.0`
::: starter
def doi_phut(gio):
    pass
::: solution
def doi_phut(gio):
    return gio * 60
::: tests
2 ==> 120
1.5 ==> 90.0
::: hidden
0 ==> 0
0.25 ==> 15.0
::: hints
- 1 giờ = 60 phút.
::: explain
Phép nhân `*`. Số thực nhân số nguyên cho ra số thực (`1.5 * 60 = 90.0`).

===== u1-04
@title: Cạnh huyền với math
@level: easy
@topic: basics
@unit: c1-3
@fn: canh_huyen
::: statement
Viết hàm `canh_huyen(a, b)` trả về độ dài cạnh huyền của tam giác vuông có hai cạnh góc vuông `a`, `b`, **làm tròn 2 chữ số thập phân**.

Công thức: c = √(a² + b²) → dùng `math.sqrt` và `round(x, 2)`.

- `canh_huyen(3, 4)` → `5.0`
- `canh_huyen(1, 1)` → `1.41`
::: starter
import math


def canh_huyen(a, b):
    pass
::: solution
import math


def canh_huyen(a, b):
    return round(math.sqrt(a ** 2 + b ** 2), 2)
::: tests
3, 4 ==> 5.0
1, 1 ==> 1.41
::: hidden
5, 12 ==> 13.0
2.5, 6 ==> 6.5
7, 9 ==> 11.4
::: hints
- `a ** 2` là a bình phương.
- `round(math.sqrt(...), 2)`.
::: explain
`import math` đặt ở đầu file; gọi hàm qua `math.sqrt`. Hoặc `math.hypot(a, b)` làm đúng việc này.

===== u1-05
@title: Trung vị điểm với statistics
@level: easy
@topic: basics
@unit: c1-3
@fn: trung_vi
::: statement
Viết hàm `trung_vi(ds_diem)` trả về **trung vị** (median) của danh sách điểm, dùng module `statistics`.

- `trung_vi([7, 9, 5])` → `7`
- `trung_vi([6, 8, 7, 9])` → `7.5`
::: starter
def trung_vi(ds_diem):
    pass
::: solution
from statistics import median


def trung_vi(ds_diem):
    return median(ds_diem)
::: tests
[7, 9, 5] ==> 7
[6, 8, 7, 9] ==> 7.5
::: hidden
[10] ==> 10
[1, 2, 3, 4, 100] ==> 3
::: hints
- `from statistics import median` rồi `return median(ds_diem)`.
::: explain
Trung vị là giá trị ở giữa sau khi sắp xếp; số phần tử chẵn thì lấy trung bình hai số giữa. Trung vị ít bị ảnh hưởng bởi giá trị ngoại lai (100 ở test cuối) hơn trung bình.

===== u1-06
@title: Tỉ lệ qua môn
@level: easy
@topic: basics
@unit: c1-4
@fn: ti_le_qua
::: statement
Câu hỏi phân tích đầu tiên: *lớp có bao nhiêu phần trăm sinh viên qua môn?*

Viết hàm `ti_le_qua(so_qua, si_so)` trả về tỉ lệ phần trăm, **làm tròn 1 chữ số**.

- `ti_le_qua(45, 60)` → `75.0`
- `ti_le_qua(1, 3)` → `33.3`
::: starter
def ti_le_qua(so_qua, si_so):
    pass
::: solution
def ti_le_qua(so_qua, si_so):
    return round(so_qua / si_so * 100, 1)
::: tests
45, 60 ==> 75.0
1, 3 ==> 33.3
::: hidden
0, 10 ==> 0.0
40, 40 ==> 100.0
2, 3 ==> 66.7
::: hints
- Tỉ lệ = `so_qua / si_so * 100`.
- Làm tròn: `round(x, 1)`.
::: explain
Phép chia `/` luôn cho số thực. Làm tròn **sau cùng**, không làm tròn giữa chừng.

===== u1-07
@title: Sửa lỗi TypeError
@level: easy
@topic: string
@unit: c1-5
@fn: mo_ta
::: statement
Đồng đội viết hàm `mo_ta(ten, diem)` để trả về chuỗi `"<ten>: <diem> điểm"` nhưng chạy bị `TypeError`. Hãy sửa.

- `mo_ta("An", 8)` → `"An: 8 điểm"`
- `mo_ta("Bình", 7.5)` → `"Bình: 7.5 điểm"`
::: starter
def mo_ta(ten, diem):
    return ten + ": " + diem + " điểm"
::: solution
def mo_ta(ten, diem):
    return f"{ten}: {diem} điểm"
::: tests
"An", 8 ==> "An: 8 điểm"
"Bình", 7.5 ==> "Bình: 7.5 điểm"
::: hidden
"Chi", 10 ==> "Chi: 10 điểm"
"D", 0 ==> "D: 0 điểm"
::: hints
- Bấm Chạy thử với `print(mo_ta("An", 8))` và đọc dòng cuối của lỗi.
- Không ghép trực tiếp chuỗi với số: dùng `str(diem)` hoặc f-string.
::: explain
`str + int` gây `TypeError`. f-string `f"{ten}: {diem} điểm"` tự chuyển mọi giá trị thành chuỗi.

===== u1-08
@title: Sửa lỗi chia cho 0
@level: easy
@topic: basics
@unit: c1-5
@fn: diem_tb
::: statement
Hàm `diem_tb(tong, so_mon)` trả về điểm trung bình `tong / so_mon`. Nếu `so_mon` bằng 0 thì chương trình bị `ZeroDivisionError` – khi đó hãy trả về `0`.

- `diem_tb(24, 3)` → `8.0`
- `diem_tb(0, 0)` → `0`
::: starter
def diem_tb(tong, so_mon):
    return tong / so_mon
::: solution
def diem_tb(tong, so_mon):
    if so_mon == 0:
        return 0
    return tong / so_mon
::: tests
24, 3 ==> 8.0
0, 0 ==> 0
::: hidden
10, 4 ==> 2.5
15, 0 ==> 0
::: hints
- Kiểm tra trước: `if so_mon == 0:` thì `return 0`.
::: explain
Luôn nghĩ tới **trường hợp biên** (0, rỗng, âm) – test ẩn hay kiểm tra đúng những trường hợp này. Chương 2 sẽ học kỹ `if` và `try/except`.
