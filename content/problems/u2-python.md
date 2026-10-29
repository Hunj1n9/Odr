Bài tập nhỏ đi kèm các bài học Chương 2 – Python cơ bản.

===== u2-01
@title: Đổi phút ra giờ và phút
@level: easy
@topic: basics
@unit: c2-1
@fn: doi_gio
::: statement
Viết hàm `doi_gio(phut)` nhận tổng số phút (số nguyên ≥ 0), trả về **tuple** `(gio, phut_le)`.

- `doi_gio(135)` → `(2, 15)`
- `doi_gio(59)` → `(0, 59)`
::: starter
def doi_gio(phut):
    gio = 0        # sửa dòng này
    phut_le = 0    # và dòng này
    return gio, phut_le
::: solution
def doi_gio(phut):
    return phut // 60, phut % 60
::: tests
135 ==> (2, 15)
59 ==> (0, 59)
::: hidden
0 ==> (0, 0)
60 ==> (1, 0)
1441 ==> (24, 1)
::: hints
- Số giờ: chia lấy phần nguyên `//`.
- Số phút lẻ: chia lấy dư `%`.
::: explain
Cặp `//` và `%` dùng để đổi đơn vị (giờ–phút, ngày–giờ, nghìn–đồng…) và tách chữ số.

===== u2-02
@title: Chữ số hàng chục
@level: easy
@topic: basics
@unit: c2-1
@fn: hang_chuc
::: statement
Viết hàm `hang_chuc(n)` trả về chữ số hàng chục của số nguyên `n` (n có thể âm; nếu n < 10 về giá trị tuyệt đối thì trả về 0).

- `hang_chuc(1234)` → `3`
- `hang_chuc(-57)` → `5`
- `hang_chuc(8)` → `0`
::: starter
def hang_chuc(n):
    pass
::: solution
def hang_chuc(n):
    return abs(n) // 10 % 10
::: tests
1234 ==> 3
-57 ==> 5
8 ==> 0
::: hidden
100 ==> 0
90 ==> 9
-1000009 ==> 0
::: hints
- Bỏ dấu bằng `abs(n)`.
- Bỏ chữ số hàng đơn vị: `// 10`; sau đó lấy chữ số cuối: `% 10`.
::: explain
`abs(n) // 10 % 10`. Chú ý số âm: `-57 % 10` trong Python bằng 3 (không phải 7), nên phải lấy `abs` trước.

===== u2-03
@title: Trung bình 3 điểm
@level: easy
@topic: basics
@unit: c2-2
@fn: trung_binh_3
::: statement
Viết hàm `trung_binh_3(a, b, c)` nhận ba điểm (có thể là **chuỗi** hoặc số, ví dụ `"7.5"`), trả về trung bình cộng làm tròn 2 chữ số.

- `trung_binh_3(7, 8, 9)` → `8.0`
- `trung_binh_3("7.5", 8, "6")` → `7.17`
::: starter
def trung_binh_3(a, b, c):
    return round((a + b + c) / 3, 2)
::: solution
def trung_binh_3(a, b, c):
    return round((float(a) + float(b) + float(c)) / 3, 2)
::: tests
7, 8, 9 ==> 8.0
"7.5", 8, "6" ==> 7.17
::: hidden
"10", "10", "10" ==> 10.0
0, 0, 1 ==> 0.33
"5.25", 6.5, 7 ==> 6.25
::: hints
- Chuỗi phải đổi sang số trước khi cộng: `float(a)`.
::: explain
`float()` nhận cả số lẫn chuỗi số. Làm tròn **sau** khi chia, không làm tròn từng điểm.

===== u2-04
@title: Che số thẻ ngân hàng
@level: easy
@topic: string
@unit: c2-3
@fn: che_so_the
::: statement
Khi in hoá đơn, chỉ hiện **4 chữ số cuối** của số thẻ, các ký tự còn lại thay bằng `*`.

Viết hàm `che_so_the(s)` (s là chuỗi chữ số, độ dài ≥ 4).

- `che_so_the("1234567812345678")` → `"************5678"`
- `che_so_the("9876")` → `"9876"`
::: starter
def che_so_the(s):
    pass
::: solution
def che_so_the(s):
    return "*" * (len(s) - 4) + s[-4:]
::: tests
"1234567812345678" ==> "************5678"
"9876" ==> "9876"
::: hidden
"12345" ==> "*2345"
"000011112222" ==> "********2222"
::: hints
- 4 ký tự cuối: `s[-4:]`.
- Lặp chuỗi: `"*" * k`.
::: explain
Cắt lát với chỉ số âm `s[-4:]` lấy 4 ký tự cuối bất kể độ dài chuỗi.

===== u2-05
@title: Đảo từng nửa chuỗi
@level: easy
@topic: string
@unit: c2-3
@fn: dao_nua
::: statement
Chia chuỗi `s` thành hai nửa: nửa đầu gồm `len(s) // 2` ký tự, nửa sau là phần còn lại. Trả về chuỗi gồm **nửa sau đứng trước, nửa đầu đứng sau**.

- `dao_nua("abcdef")` → `"defabc"`
- `dao_nua("abcde")` → `"cdeab"`
::: starter
def dao_nua(s):
    pass
::: solution
def dao_nua(s):
    k = len(s) // 2
    return s[k:] + s[:k]
::: tests
"abcdef" ==> "defabc"
"abcde" ==> "cdeab"
::: hidden
"" ==> ""
"a" ==> "a"
"FTU2025" ==> "2025FTU"
::: hints
- `k = len(s) // 2`; nửa đầu `s[:k]`, nửa sau `s[k:]`.
::: explain
`s[:k] + s[k:]` luôn bằng `s` – hai lát cắt bổ sung cho nhau, không trùng không sót.

===== u2-06
@title: Chuẩn hoá họ tên
@level: easy
@topic: string
@unit: c2-4
@fn: chuan_hoa_ten
::: statement
Dữ liệu khảo sát có họ tên viết lộn xộn. Viết hàm `chuan_hoa_ten(s)`: bỏ khoảng trắng thừa (đầu, cuối, giữa các từ), viết hoa chữ cái đầu mỗi từ, các chữ còn lại viết thường.

- `chuan_hoa_ten("  nGUYỄN   văn  an ")` → `"Nguyễn Văn An"`
::: starter
def chuan_hoa_ten(s):
    return s.strip()
::: solution
def chuan_hoa_ten(s):
    return " ".join(w.capitalize() for w in s.split())
::: tests
"  nGUYỄN   văn  an " ==> "Nguyễn Văn An"
"lê thị BÌNH" ==> "Lê Thị Bình"
::: hidden
"an" ==> "An"
"   " ==> ""
"TRẦN  minh   QUÂN" ==> "Trần Minh Quân"
::: hints
- `s.split()` (không tham số) tách theo mọi khoảng trắng và bỏ phần rỗng.
- `w.capitalize()` viết hoa chữ đầu, hạ các chữ sau.
- Ghép lại: `" ".join(...)`.
::: explain
Bộ ba `split()` → xử lý từng từ → `" ".join()` là mẫu xử lý chuỗi phổ biến nhất. `s.title()` cũng gần đúng nhưng xử lý sai một số trường hợp như dấu nháy.

===== u2-07
@title: Định dạng tiền
@level: easy
@topic: string
@unit: c2-4
@fn: dinh_dang_tien
::: statement
Viết hàm `dinh_dang_tien(so_tien)` trả về chuỗi số tiền có dấu phẩy phân cách hàng nghìn, theo sau là `" VND"`. Số tiền là số nguyên.

- `dinh_dang_tien(1234567)` → `"1,234,567 VND"`
- `dinh_dang_tien(500)` → `"500 VND"`
::: starter
def dinh_dang_tien(so_tien):
    return str(so_tien) + " VND"
::: solution
def dinh_dang_tien(so_tien):
    return f"{so_tien:,} VND"
::: tests
1234567 ==> "1,234,567 VND"
500 ==> "500 VND"
::: hidden
0 ==> "0 VND"
1000 ==> "1,000 VND"
-25000 ==> "-25,000 VND"
::: hints
- f-string: `f"{x:,}"` thêm dấu phẩy phân cách hàng nghìn.
::: explain
Định dạng trong f-string: `:,` phân cách nghìn, `:.2f` 2 chữ số thập phân, `:.1%` phần trăm, `:>8` căn phải.

===== u2-08
@title: Phí vận chuyển
@level: easy
@topic: basics
@unit: c2-5
@fn: phi_ship
::: statement
Một shop tính phí giao hàng theo cân nặng `kg` và nơi nhận (`noi_thanh` là `True`/`False`):

| Cân nặng | Nội thành | Ngoại thành |
|---|---|---|
| ≤ 1 kg | 15000 | 25000 |
| > 1 kg và ≤ 5 kg | 25000 | 40000 |
| > 5 kg | 25000 + 5000 cho mỗi kg vượt 5 (làm tròn **lên** kg) | 40000 + 8000 cho mỗi kg vượt 5 (làm tròn lên) |

Viết hàm `phi_ship(kg, noi_thanh)`.

- `phi_ship(0.5, True)` → `15000`
- `phi_ship(6.2, False)` → `56000` (vượt 1.2 kg → tính 2 kg)
::: starter
import math


def phi_ship(kg, noi_thanh):
    pass
::: solution
import math


def phi_ship(kg, noi_thanh):
    if noi_thanh:
        nen, buoc, them = 15000, 25000, 5000
    else:
        nen, buoc, them = 25000, 40000, 8000
    if kg <= 1:
        return nen
    if kg <= 5:
        return buoc
    return buoc + math.ceil(kg - 5) * them
::: tests
0.5, True ==> 15000
6.2, False ==> 56000
::: hidden
1, False ==> 25000
5, True ==> 25000
3, False ==> 40000
10, True ==> 50000
5.01, True ==> 30000
::: hints
- Xét nội/ngoại thành trước để lấy bảng giá, rồi xét cân nặng từ nhỏ tới lớn.
- Làm tròn lên: `math.ceil(kg - 5)`.
::: explain
Chú ý biên: đúng 1 kg và đúng 5 kg. Đề nói "≤" thì dùng `<=`.

===== u2-09
@title: Năm nhuận
@level: easy
@topic: basics
@unit: c2-5
@fn: nam_nhuan
::: statement
Năm nhuận là năm chia hết cho 4 nhưng không chia hết cho 100, **hoặc** chia hết cho 400. Viết hàm `nam_nhuan(y)` trả về `True`/`False`.
::: starter
def nam_nhuan(y):
    return y % 4 == 0
::: solution
def nam_nhuan(y):
    return (y % 4 == 0 and y % 100 != 0) or y % 400 == 0
::: tests
2024 ==> True
1900 ==> False
2000 ==> True
::: hidden
2023 ==> False
2100 ==> False
2400 ==> True
4 ==> True
::: hints
- Kết hợp điều kiện bằng `and`, `or` và ngoặc.
::: explain
Có thể `return` thẳng biểu thức điều kiện – không cần `if ...: return True else: return False`.

===== u2-10
@title: Tổng các bội số
@level: easy
@topic: basics
@unit: c2-6
@fn: tong_boi
::: statement
Viết hàm `tong_boi(n, k)` trả về tổng các số từ 1 đến `n` (tính cả n) chia hết cho `k`.

- `tong_boi(10, 3)` → `18` (3 + 6 + 9)
::: starter
def tong_boi(n, k):
    tong = 0
    # viết vòng for ở đây
    return tong
::: solution
def tong_boi(n, k):
    tong = 0
    for i in range(1, n + 1):
        if i % k == 0:
            tong += i
    return tong
::: tests
10, 3 ==> 18
10, 5 ==> 15
::: hidden
2, 3 ==> 0
100, 1 ==> 5050
1000, 7 ==> 71071
::: hints
- `for i in range(1, n + 1)` – nhớ `+ 1` để lấy cả n.
- Hoặc gọn hơn: `sum(range(k, n + 1, k))`.
::: explain
Lỗi hay gặp: `range(n)` chạy từ 0 đến n − 1, bỏ mất n.

===== u2-11
@title: Bảng cửu chương thành list
@level: easy
@topic: collections
@unit: c2-6
@fn: cuu_chuong
::: statement
Viết hàm `cuu_chuong(n)` trả về list các chuỗi `"n x i = kq"` với i từ 1 đến 10.

- `cuu_chuong(3)[0]` là `"3 x 1 = 3"`, `cuu_chuong(3)[9]` là `"3 x 10 = 30"`.
::: starter
def cuu_chuong(n):
    kq = []
    return kq
::: solution
def cuu_chuong(n):
    kq = []
    for i in range(1, 11):
        kq.append(f"{n} x {i} = {n * i}")
    return kq
::: tests
2
7
::: hidden
0
12
::: hints
- Tạo list rỗng, `for i in range(1, 11)`, `append` từng chuỗi f-string.
::: explain
Mẫu "list rỗng → for → append" – sẽ viết gọn hơn bằng comprehension ở bài 2.12.

===== u2-12
@title: Bao lâu thì tiền gấp đôi?
@level: easy
@topic: basics
@unit: c2-7
@fn: nam_gap_doi
::: statement
Gửi tiết kiệm với lãi suất `r` %/năm, lãi nhập gốc mỗi năm. Viết hàm `nam_gap_doi(r)` trả về số năm **ít nhất** để số tiền ≥ 2 lần ban đầu (`r > 0`).

- `nam_gap_doi(7)` → `11`
- `nam_gap_doi(100)` → `1`
::: starter
def nam_gap_doi(r):
    tien = 1.0
    nam = 0
    # dùng while
    return nam
::: solution
def nam_gap_doi(r):
    tien = 1.0
    nam = 0
    while tien < 2:
        tien *= 1 + r / 100
        nam += 1
    return nam
::: tests
7 ==> 11
100 ==> 1
::: hidden
10 ==> 8
1 ==> 70
50 ==> 2
::: hints
- Lặp `while tien < 2`, mỗi vòng nhân `1 + r / 100` và tăng `nam`.
::: explain
`while` dùng khi không biết trước số lần lặp. "Quy tắc 72": số năm ≈ 72 / r.

===== u2-13
@title: Số chữ số
@level: easy
@topic: basics
@unit: c2-7
@fn: so_chu_so
::: statement
Viết hàm `so_chu_so(n)` đếm số chữ số của số nguyên `n` **bằng vòng lặp while** (không được dùng `str`). Quy ước `so_chu_so(0)` là 1; số âm bỏ dấu.
::: starter
def so_chu_so(n):
    pass
::: solution
def so_chu_so(n):
    n = abs(n)
    if n == 0:
        return 1
    dem = 0
    while n > 0:
        n //= 10
        dem += 1
    return dem
::: tests
2025 ==> 4
0 ==> 1
-7 ==> 1
::: hidden
10 ==> 2
999999 ==> 6
-1000000000 ==> 10
::: hints
- Mỗi lần `n //= 10` là bỏ một chữ số.
- Trường hợp 0 phải xử lý riêng vì vòng while không chạy.
::: explain
Bài tập rèn tư duy vòng lặp; thực tế có thể dùng `len(str(abs(n)))` (hệ thống không cấm, nhưng hãy thử cách while).

===== u2-14
@title: Trung bình bỏ điểm cao nhất và thấp nhất
@level: easy
@topic: collections
@unit: c2-8
@fn: tb_cat_ngon
::: statement
Ban giám khảo chấm điểm; để công bằng, bỏ **một** điểm cao nhất và **một** điểm thấp nhất rồi tính trung bình các điểm còn lại (làm tròn 2 chữ số). List có ít nhất 3 phần tử. Không được làm thay đổi list đầu vào.

- `tb_cat_ngon([7, 9, 8, 10, 6])` → `8.0`
::: starter
def tb_cat_ngon(ds):
    pass
::: solution
def tb_cat_ngon(ds):
    s = sorted(ds)[1:-1]
    return round(sum(s) / len(s), 2)
::: tests
[7, 9, 8, 10, 6] ==> 8.0
[5, 5, 5] ==> 5.0
::: hidden
[1, 2, 3, 4] ==> 2.5
[9.5, 8.25, 7, 10, 7] ==> 8.25
[10, 0, 10, 0] ==> 5.0
::: hints
- `sorted(ds)` tạo list mới đã sắp xếp; bỏ đầu và cuối bằng `[1:-1]`.
- Cách khác: `(sum(ds) - max(ds) - min(ds)) / (len(ds) - 2)`.
::: explain
Dùng `sorted` (không phải `ds.sort()`) để không làm hỏng dữ liệu của người gọi.

===== u2-15
@title: Lọc điểm qua môn
@level: easy
@topic: collections
@unit: c2-8
@fn: loc_qua_mon
::: statement
Viết hàm `loc_qua_mon(ds)` trả về list các điểm **≥ 4** (qua môn ở FTU), sắp xếp **giảm dần**.

- `loc_qua_mon([3.5, 8, 4, 9.5, 2])` → `[9.5, 8, 4]`
::: starter
def loc_qua_mon(ds):
    kq = []
    return kq
::: solution
def loc_qua_mon(ds):
    kq = []
    for d in ds:
        if d >= 4:
            kq.append(d)
    return sorted(kq, reverse=True)
::: tests
[3.5, 8, 4, 9.5, 2] ==> [9.5, 8, 4]
[] ==> []
::: hidden
[1, 2, 3] ==> []
[4, 4, 10] ==> [10, 4, 4]
::: hints
- Duyệt, `if d >= 4: kq.append(d)`.
- Cuối cùng `sorted(kq, reverse=True)`.
::: explain
Đọc kỹ "≥ 4" (có dấu bằng) và "giảm dần".

===== u2-16
@title: Phần tử chung của hai danh sách
@level: easy
@topic: collections
@unit: c2-9
@fn: phan_tu_chung
::: statement
Viết hàm `phan_tu_chung(a, b)` trả về list các giá trị xuất hiện ở **cả hai** list, không trùng lặp, sắp xếp tăng dần.

- `phan_tu_chung([1, 2, 2, 3], [2, 3, 4])` → `[2, 3]`
::: starter
def phan_tu_chung(a, b):
    pass
::: solution
def phan_tu_chung(a, b):
    return sorted(set(a) & set(b))
::: tests
[1, 2, 2, 3], [2, 3, 4] ==> [2, 3]
[1], [2] ==> []
::: hidden
[], [1, 2] ==> []
[5, 1, 5, 9], [9, 5, 5] ==> [5, 9]
["b", "a"], ["a", "c", "b"] ==> ["a", "b"]
::: hints
- Giao của hai set: `set(a) & set(b)`.
- `sorted()` một set trả về list.
::: explain
Set loại trùng lặp tự động và tìm giao/hợp rất nhanh.

===== u2-17
@title: Thống kê nhanh trả về tuple
@level: easy
@topic: collections
@unit: c2-9
@fn: thong_ke
::: statement
Viết hàm `thong_ke(ds)` trả về tuple `(nho_nhat, lon_nhat, trung_binh)` với trung bình làm tròn 2 chữ số. List không rỗng.

- `thong_ke([4, 8, 6])` → `(4, 8, 6.0)`
::: starter
def thong_ke(ds):
    return [min(ds), max(ds)]
::: solution
def thong_ke(ds):
    return min(ds), max(ds), round(sum(ds) / len(ds), 2)
::: tests
[4, 8, 6] ==> (4, 8, 6.0)
[5] ==> (5, 5, 5.0)
::: hidden
[1, 2] ==> (1, 2, 1.5)
[-3, 10, 2.5, 7] ==> (-3, 10, 4.12)
::: hints
- `return a, b, c` tạo tuple.
::: explain
Hệ thống phân biệt list và tuple: `[4, 8, 6.0]` ≠ `(4, 8, 6.0)`.

===== u2-18
@title: Đếm từ trong câu
@level: easy
@topic: collections
@unit: c2-10
@fn: dem_tu
::: statement
Viết hàm `dem_tu(cau)` trả về dict `{từ: số lần xuất hiện}`, không phân biệt hoa thường (đưa hết về chữ thường). Các từ cách nhau bởi khoảng trắng.

- `dem_tu("An an Binh")` → `{"an": 2, "binh": 1}`
::: starter
def dem_tu(cau):
    d = {}
    return d
::: solution
def dem_tu(cau):
    d = {}
    for w in cau.lower().split():
        d[w] = d.get(w, 0) + 1
    return d
::: tests
"An an Binh" ==> {"an": 2, "binh": 1}
"" ==> {}
::: hidden
"a b c a b a" ==> {"a": 3, "b": 2, "c": 1}
"  FTU   ftu " ==> {"ftu": 2}
::: hints
- `cau.lower().split()`.
- `d[w] = d.get(w, 0) + 1`.
::: explain
Mẫu đếm tần suất bằng dict – thuộc lòng. `collections.Counter` cho kết quả tương tự.

===== u2-19
@title: Sinh viên điểm cao nhất
@level: easy
@topic: collections
@unit: c2-10
@fn: thu_khoa
::: statement
Cho dict `{tên: điểm}`. Viết hàm `thu_khoa(d)` trả về **tên** người điểm cao nhất; nếu nhiều người bằng điểm, trả về tên đứng trước theo thứ tự bảng chữ cái. Dict rỗng trả về `None`.

- `thu_khoa({"Lan": 9, "An": 9, "Bình": 7})` → `"An"`
::: starter
def thu_khoa(d):
    return max(d, key=d.get)
::: solution
def thu_khoa(d):
    if not d:
        return None
    cao = max(d.values())
    return min(ten for ten in d if d[ten] == cao)
::: tests
{"Lan": 9, "An": 9, "Bình": 7} ==> "An"
{} ==> None
::: hidden
{"X": 5} ==> "X"
{"C": 8.5, "B": 8.0, "A": 6} ==> "C"
{"Minh": 10, "Hoa": 10, "Nam": 10} ==> "Hoa"
::: hints
- Tìm điểm cao nhất bằng `max(d.values())`.
- Lọc những tên có điểm đó rồi lấy `min` (thứ tự chữ cái).
::: explain
`max(d, key=d.get)` chỉ trả về người gặp **đầu tiên** khi hoà – không đúng yêu cầu "theo bảng chữ cái". Đọc kỹ cách xử lý hoà!

===== u2-20
@title: Tính lương có làm thêm giờ
@level: easy
@topic: basics
@unit: c2-11
@fn: tinh_luong
::: statement
Viết hàm `tinh_luong(gio, don_gia=25000, he_so=1.5)`: 40 giờ đầu tính `don_gia`/giờ; mỗi giờ vượt 40 tính `don_gia * he_so`. Trả về số tiền (giữ nguyên kiểu tính toán, không làm tròn).

- `tinh_luong(45)` → `1187500.0`
- `tinh_luong(30, 30000)` → `900000`
::: starter
def tinh_luong(gio):
    return gio * 25000
::: solution
def tinh_luong(gio, don_gia=25000, he_so=1.5):
    if gio <= 40:
        return gio * don_gia
    return 40 * don_gia + (gio - 40) * don_gia * he_so
::: tests
45 ==> 1187500.0
30, 30000 ==> 900000
::: hidden
40 ==> 1000000
50, 20000, 2 ==> 1200000
41, 10000 ==> 415000.0
::: hints
- Khai báo giá trị mặc định ngay trong dòng `def`.
- Tách 2 trường hợp: `gio <= 40` và còn lại.
::: explain
Tham số có giá trị mặc định phải đứng **sau** tham số bắt buộc.

===== u2-21
@title: Bình phương các số lẻ (comprehension)
@level: easy
@topic: collections
@unit: c2-12
@fn: binh_phuong_le
::: statement
Viết hàm `binh_phuong_le(ds)` trả về list bình phương của các số **lẻ** trong `ds`, giữ nguyên thứ tự. Hãy viết **một dòng** bằng list comprehension.

- `binh_phuong_le([1, 2, 3, 4, 5])` → `[1, 9, 25]`
::: starter
def binh_phuong_le(ds):
    return [x for x in ds]
::: solution
def binh_phuong_le(ds):
    return [x ** 2 for x in ds if x % 2 != 0]
::: tests
[1, 2, 3, 4, 5] ==> [1, 9, 25]
[] ==> []
::: hidden
[2, 4] ==> []
[-3, 0, 7] ==> [9, 49]
::: hints
- Mẫu `[biểu_thức for x in ds if điều_kiện]`.
- Số lẻ: `x % 2 != 0` (đúng cả với số âm).
::: explain
Viết `x % 2 == 1` cũng đúng với số âm trong Python (`-3 % 2 == 1`), nhưng `!= 0` an toàn ở mọi ngôn ngữ.

===== u2-22
@title: Xếp hạng sinh viên
@level: medium
@topic: collections
@unit: c2-12
@fn: xep_hang
::: statement
Cho list các tuple `(tên, điểm)`. Viết hàm `xep_hang(ds)` trả về **list tên** sắp xếp theo điểm **giảm dần**; cùng điểm thì theo tên **tăng dần**.

- `xep_hang([("Chi", 8), ("An", 9), ("Bình", 8)])` → `["An", "Bình", "Chi"]`
::: starter
def xep_hang(ds):
    return [t for t, d in sorted(ds)]
::: solution
def xep_hang(ds):
    return [t for t, d in sorted(ds, key=lambda x: (-x[1], x[0]))]
::: tests
[("Chi", 8), ("An", 9), ("Bình", 8)] ==> ["An", "Bình", "Chi"]
[] ==> []
::: hidden
[("Z", 5), ("Y", 5), ("X", 5)] ==> ["X", "Y", "Z"]
[("A", 1), ("B", 2), ("C", 3)] ==> ["C", "B", "A"]
[("Mai", 7.5), ("Lan", 9.25), ("Hoa", 7.5)] ==> ["Lan", "Hoa", "Mai"]
::: hints
- `sorted(ds, key=lambda x: (-x[1], x[0]))`.
- Rồi lấy tên bằng comprehension.
::: explain
Key là tuple → so sánh lần lượt từng phần. Đổi dấu điểm để giảm dần mà tên vẫn tăng dần.

===== u2-23
@title: Cộng các giá trị hợp lệ
@level: easy
@topic: basics
@unit: c2-13
@fn: tong_hop_le
::: statement
Dữ liệu nhập tay có lẫn giá trị sai. Viết hàm `tong_hop_le(ds)` nhận list chuỗi, cộng những chuỗi chuyển được thành số thực, **bỏ qua** những chuỗi lỗi. Trả về tổng làm tròn 2 chữ số.

- `tong_hop_le(["3.5", "abc", "2", ""])` → `5.5`
::: starter
def tong_hop_le(ds):
    return round(sum(float(x) for x in ds), 2)
::: solution
def tong_hop_le(ds):
    tong = 0
    for x in ds:
        try:
            tong += float(x)
        except ValueError:
            pass
    return round(tong, 2)
::: tests
["3.5", "abc", "2", ""] ==> 5.5
[] ==> 0
::: hidden
["1e3", "-2.25", "x1"] ==> 997.75
["N/A", "?"] ==> 0
[" 7 ", "0.1", "0.2"] ==> 7.3
::: hints
- Đặt `float(x)` trong `try`, bắt `ValueError`.
- `pass` = không làm gì.
::: explain
`float(" 7 ")` vẫn chạy (tự bỏ khoảng trắng); `float("")` và `float("N/A")` gây `ValueError`.

===== u2-24
@title: Đếm cặp có tổng bằng k
@level: medium
@topic: algo
@unit: c2-14
@fn: dem_cap
::: statement
Viết hàm `dem_cap(ds, k)` đếm số cặp chỉ số `(i, j)` với `i < j` mà `ds[i] + ds[j] == k`.

- `dem_cap([1, 2, 3, 4, 3], 6)` → `2` (2+4 và 3+3)
::: starter
def dem_cap(ds, k):
    pass
::: solution
def dem_cap(ds, k):
    dem = 0
    for i in range(len(ds)):
        for j in range(i + 1, len(ds)):
            if ds[i] + ds[j] == k:
                dem += 1
    return dem
::: tests
[1, 2, 3, 4, 3], 6 ==> 2
[1, 1, 1], 2 ==> 3
::: hidden
[], 0 ==> 0
[5], 10 ==> 0
[0, 0, 0, 0], 0 ==> 6
[-1, 7, 3, 3, 9], 6 ==> 2
::: hints
- Hai vòng lặp lồng nhau, `j` bắt đầu từ `i + 1`.
- Hoặc `itertools.combinations(ds, 2)`.
::: explain
`j` từ `i + 1` đảm bảo mỗi cặp chỉ đếm một lần và không ghép phần tử với chính nó.

===== u2-25
@title: Đếm số nguyên tố trong đoạn
@level: medium
@topic: algo
@unit: c2-14
@fn: dem_nguyen_to
::: statement
Viết hàm `dem_nguyen_to(a, b)` đếm các số nguyên tố trong đoạn `[a, b]` (tính cả hai đầu, a ≤ b, có thể âm).

- `dem_nguyen_to(1, 10)` → `4` (2, 3, 5, 7)
::: starter
def dem_nguyen_to(a, b):
    pass
::: solution
def la_nt(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True


def dem_nguyen_to(a, b):
    return sum(1 for n in range(a, b + 1) if la_nt(n))
::: tests
1, 10 ==> 4
10, 20 ==> 4
::: hidden
-5, 1 ==> 0
2, 2 ==> 1
1, 1000 ==> 168
99990, 100000 ==> 1
::: hints
- Viết hàm phụ `la_nt(n)` thử ước từ 2 tới `int(n ** 0.5)`.
- Số < 2 không phải nguyên tố.
::: explain
Tách hàm phụ giúp code dễ đọc và dễ kiểm tra. Thử tới √n để không bị quá thời gian với test lớn.

===== u2-26
@title: Chẵn, lẻ hay số 0
@level: easy
@topic: basics
@unit: c2-15
@fn: chan_le
::: statement
Đề thi yêu cầu nhập `a` từ bàn phím và xác định chẵn/lẻ bằng `if – elif – else`. Viết hàm `chan_le(s)` nhận **chuỗi** `s` (như kết quả của `input()`), trả về `"Số 0"`, `"Chẵn"` hoặc `"Lẻ"`.

- `chan_le("7")` → `"Lẻ"`
::: starter
def chan_le(s):
    if s % 2 == 0:
        return "Chẵn"
    else:
        return "Lẻ"
::: solution
def chan_le(s):
    a = int(s)
    if a == 0:
        return "Số 0"
    elif a % 2 == 0:
        return "Chẵn"
    else:
        return "Lẻ"
::: tests
"7" ==> "Lẻ"
"0" ==> "Số 0"
::: hidden
"-4" ==> "Chẵn"
"  12 " ==> "Chẵn"
"-3" ==> "Lẻ"
::: hints
- Đổi chuỗi sang số: `int(s)` (tự bỏ khoảng trắng hai đầu).
- Xét số 0 trước, rồi chẵn, cuối cùng lẻ.
::: explain
`"7" % 2` gây lỗi vì `%` với chuỗi là phép định dạng chuỗi kiểu cũ – nhớ đổi kiểu dữ liệu nhập vào.

===== u2-27
@title: Số ngày còn lại đến hạn nộp
@level: easy
@topic: basics
@unit: c2-16
@fn: con_lai
::: statement
Viết hàm `con_lai(hom_nay, han)` – hai chuỗi ngày dạng `"dd/mm/yyyy"` – trả về số ngày từ `hom_nay` đến `han` (âm nếu đã quá hạn).

- `con_lai("20/12/2024", "05/01/2025")` → `16`
::: starter
from datetime import datetime


def con_lai(hom_nay, han):
    return 0
::: solution
from datetime import datetime


def con_lai(hom_nay, han):
    a = datetime.strptime(hom_nay, "%d/%m/%Y")
    b = datetime.strptime(han, "%d/%m/%Y")
    return (b - a).days
::: tests
"20/12/2024", "05/01/2025" ==> 16
"01/03/2024", "01/02/2024" ==> -29
::: hidden
"01/01/2025", "01/01/2025" ==> 0
"28/02/2023", "01/03/2023" ==> 1
"01/01/2024", "31/12/2024" ==> 365
::: hints
- `datetime.strptime(chuoi, "%d/%m/%Y")`.
- Hiệu hai datetime là `timedelta`, lấy `.days`.
::: explain
Đừng tự tách chuỗi và tính tay – năm nhuận, số ngày mỗi tháng đã được `datetime` xử lý.

===== u2-28
@title: Phiếu điểm bằng format()
@level: easy
@topic: string
@unit: c2-16
@fn: phieu_diem
::: statement
Viết hàm `phieu_diem(ten, diem)` dùng `str.format()` trả về chuỗi: tên **căn trái** trong 10 ký tự, dấu `|`, điểm **căn phải** trong 6 ký tự với **2 chữ số thập phân**.

- `phieu_diem("Lan", 8.5)` → `"Lan       |  8.50"`
::: starter
def phieu_diem(ten, diem):
    return "{} | {}".format(ten, diem)
::: solution
def phieu_diem(ten, diem):
    return "{:<10}|{:>6.2f}".format(ten, diem)
::: tests
"Lan", 8.5 ==> "Lan       |  8.50"
"Nguyen Van", 10 ==> "Nguyen Van| 10.00"
::: hints
- `{:<10}` căn trái độ rộng 10; `{:>6.2f}` căn phải độ rộng 6, 2 chữ số thập phân.
::: explain
Cùng cú pháp với f-string: `f"{ten:<10}|{diem:>6.2f}"`.

===== u2-29
@title: Ngày đạt chỉ tiêu doanh thu
@level: easy
@topic: collections
@source: Dạng bài thực hành FTU (Lecture 3–6)
@unit: c2-12
@fn: ngay_dat_chi_tieu
::: statement
List `ds` là doanh thu từng ngày trong tuần (ngày đóng cửa ghi 0). Viết hàm `ngay_dat_chi_tieu(ds, moc)` trả về tuple:
1. list **số thứ tự ngày** (đếm từ 1) có doanh thu ≥ `moc`,
2. doanh thu trung bình của các ngày **mở cửa** (doanh thu > 0), làm tròn 2; không có ngày mở cửa thì 0,
3. list doanh thu sau khi **thưởng 10%** cho những ngày ≥ 15 (làm tròn 2), các ngày khác giữ nguyên.

- `ngay_dat_chi_tieu([8, 12, 0, 15], 10)` → `([2, 4], 11.67, [8, 12, 0, 16.5])`
::: starter
def ngay_dat_chi_tieu(ds, moc):
    ngay = [i for i, v in enumerate(ds) if v >= moc]
    tb = sum(ds) / len(ds)
    return ngay, round(tb, 2), ds
::: solution
def ngay_dat_chi_tieu(ds, moc):
    ngay = [i for i, v in enumerate(ds, start=1) if v >= moc]
    mo_cua = [v for v in ds if v > 0]
    tb = round(sum(mo_cua) / len(mo_cua), 2) if mo_cua else 0
    thuong = [round(v * 1.1, 2) if v >= 15 else v for v in ds]
    return ngay, tb, thuong
::: tests
[8, 12, 0, 15], 10 ==> ([2, 4], 11.67, [8, 12, 0, 16.5])
[0, 0], 1 ==> ([], 0, [0, 0])
::: hidden
[20, 5, 0, 30, 9, 18, 6], 10 ==> ([1, 4, 6], 14.67, [22.0, 5, 0, 33.0, 9, 19.8, 6])
[15], 15 ==> ([1], 15.0, [16.5])
::: hints
- `enumerate(ds, start=1)` để đánh số ngày từ 1.
- Comprehension có `if ... else` đặt **trước** `for`.
::: explain
Ba lỗi thường gặp: đếm ngày từ 0, tính trung bình cả ngày đóng cửa, và chia cho 0 khi không có ngày mở cửa.

===== u2-30
@title: Lọc giao dịch lớn bằng vòng lặp
@level: easy
@topic: collections
@source: Dạng bài tự luận ôn giữa kỳ FTU
@unit: c2-8
@fn: loc_giao_dich
::: statement
Viết hàm `loc_giao_dich(ds, nguong=500)` dùng **vòng lặp** (không dùng pandas) trả về tuple `(list giao dịch ≥ nguong, tổng các giao dịch đó)`. List rỗng → `([], 0)`.

- `loc_giao_dich([120, 800, 450, 1000, 500])` → `([800, 1000, 500], 2300)`
::: starter
def loc_giao_dich(ds, nguong=500):
    kq = []
    for x in ds:
        if x > nguong:
            kq.append(x)
    return kq, sum(ds)
::: solution
def loc_giao_dich(ds, nguong=500):
    kq = []
    tong = 0
    for x in ds:
        if x >= nguong:
            kq.append(x)
            tong += x
    return kq, tong
::: tests
[120, 800, 450, 1000, 500] ==> ([800, 1000, 500], 2300)
[] ==> ([], 0)
::: hidden
[100, 200], 150 ==> ([200], 200)
[499, 500.5], 500 ==> ([500.5], 500.5)
::: hints
- "Từ ngưỡng trở lên" là `>=`.
- Cộng dồn trong cùng vòng lặp.
::: explain
Code mẫu sai hai chỗ: dùng `>` (bỏ sót đúng 500) và cộng tổng **mọi** giao dịch.
