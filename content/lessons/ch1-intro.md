@title: Giới thiệu Python cho khoa học dữ liệu
@chapter: 1
@summary: Vì sao Python, cách chạy code, import thư viện, quy trình một dự án dữ liệu và cách đọc thông báo lỗi.

Chương mở đầu: **không cần biết lập trình trước**. Mỗi bài nhỏ dưới đây chỉ có một ý chính, đọc khoảng 10 phút, có câu hỏi kiểm tra ngay và một bài tập nhỏ để bạn tự viết code.

> **Đối chiếu tài liệu FTU:** Buổi 1 trên lớp (đề cương: 3 tiết lý thuyết). Outline môn học FTU mở đầu bằng: dữ liệu là gì, quy trình phân tích dữ liệu, vai trò dữ liệu trong kinh tế, giới thiệu Google Colab và các thư viện Pandas, NumPy, Matplotlib, Seaborn – đúng các bài dưới đây.

@@@ c1-1 | Python và hệ sinh thái khoa học dữ liệu
@ftu: Outline môn học – Chương 0–1 (Python cho phân tích kinh tế, giới thiệu Pandas/NumPy/Matplotlib/Seaborn); đề cương QLĐT Chương 1
@goal: Giải thích được vì sao dân kinh tế học Python, và biết mỗi thư viện NumPy, Pandas, Matplotlib, scikit-learn dùng để làm gì.

### Vì sao là Python?

Excel rất tốt với vài nghìn dòng. Khi dữ liệu lên tới hàng trăm nghìn dòng, cần lặp lại báo cáo mỗi tuần, hoặc cần chạy mô hình dự báo – bạn cần một ngôn ngữ lập trình. Python được chọn vì:

- **Dễ đọc** – code gần với tiếng Anh, ít ký hiệu.
- **Miễn phí, mã nguồn mở** – có sẵn hàng nghìn thư viện.
- **Một ngôn ngữ cho cả quy trình** – từ đọc file, làm sạch, vẽ biểu đồ tới học máy.

??
Lý do **chính** khiến Python phổ biến trong phân tích dữ liệu là gì?
- [ ] Python chạy nhanh nhất trong mọi ngôn ngữ
- [x] Cú pháp dễ đọc và có hệ sinh thái thư viện dữ liệu rất mạnh, miễn phí
- [ ] Python chỉ chạy được trên Windows
- [ ] Python không cần cài đặt thư viện nào
> Python không phải nhanh nhất (C/C++ nhanh hơn), nhưng dễ học và có NumPy, Pandas, scikit-learn… giúp làm việc với dữ liệu rất nhanh.

### Bốn thư viện bạn sẽ dùng suốt học phần

| Thư viện | Làm gì | Ví dụ | Chương |
|---|---|---|---|
| **NumPy** | Mảng số, tính toán nhanh trên cả mảng | trung bình 1 triệu giá trị | 3 |
| **Pandas** | Bảng dữ liệu (DataFrame) – như Excel trong code | đọc CSV, lọc, nhóm | 3–4 |
| **Matplotlib** | Vẽ biểu đồ | biểu đồ cột doanh thu | 5 |
| **scikit-learn** | Học máy | dự đoán điểm, giá xe | 6–7 |

Thử chạy ô code dưới đây (bấm **▶ Chạy**). Bạn chưa cần hiểu từng dòng – chỉ cần thấy 3 thư viện cùng làm việc:

```python
import numpy as np
import pandas as pd

diem = np.array([7.5, 8.0, 6.5, 9.0])     # NumPy: mảng số
print("Điểm trung bình:", diem.mean())

bang = pd.DataFrame({"ten": ["An", "Bình", "Chi", "Dũng"], "diem": diem})   # Pandas: bảng
bang
```

??
Bạn cần **đọc file CSV doanh thu, lọc các đơn ở Hà Nội và tính tổng theo tháng**. Thư viện phù hợp nhất là:
- [ ] Matplotlib
- [x] Pandas
- [ ] scikit-learn
- [ ] math
> Đọc/lọc/nhóm dữ liệu dạng bảng là việc của Pandas. Matplotlib vẽ biểu đồ, scikit-learn chạy mô hình.

??
Muốn **xây mô hình dự đoán** giá xe từ công suất động cơ, bạn dùng thư viện nào?
- [ ] Pandas
- [ ] Matplotlib
- [x] scikit-learn
- [ ] NumPy
> scikit-learn (`sklearn`) chứa các mô hình học máy như `LinearRegression`. Chương 6–7 học kỹ.

> **Ghi nhớ:** NumPy = mảng số · Pandas = bảng · Matplotlib = biểu đồ · scikit-learn = mô hình.

@@@ c1-2 | Chạy những dòng code đầu tiên
@ftu: Outline môn học – mục Google Colab, cài đặt môi trường; LEC 2 (thụt lề, biến không cần khai báo kiểu)
@goal: Dùng `print()`, viết chú thích `#`, hiểu "ô code" kiểu Jupyter và viết hàm đầu tiên có `return`.

### Ô code (cell) và `print()`

Trên lớp bạn dùng **Jupyter Notebook** hoặc **Google Colab**: code chia thành từng ô, chạy ô nào xem kết quả ô đó. Trang này hoạt động giống hệt vậy.

```python
print("Xin chào TIN314!")      # in ra màn hình
print("Năm", 2025, "học Python")  # print nhận nhiều giá trị, tự thêm dấu cách
# Dòng bắt đầu bằng # là chú thích: Python bỏ qua
2025 - 1960                      # dòng CUỐI của ô là biểu thức → tự hiển thị giá trị
```

Hai cách thấy kết quả:
1. `print(...)` – in ra bất cứ lúc nào.
2. Biểu thức ở **dòng cuối** của ô – notebook tự hiển thị (chỉ dòng cuối!).

??
Chạy ô sau trong notebook, màn hình hiện gì?
```py
3 + 4
10 * 2
```
- [ ] `7` và `20`
- [x] Chỉ `20`
- [ ] Chỉ `7`
- [ ] Không hiện gì
> Notebook chỉ tự hiển thị giá trị của **dòng cuối**. Muốn thấy cả hai, dùng `print(3 + 4)`.

### Hàm đầu tiên: `def` và `return`

Khi thi, đề luôn yêu cầu **viết hàm**. Hàm nhận đầu vào (tham số) và **trả về** kết quả bằng `return`:

```python
def tinh_tuoi(nam_sinh):
    return 2025 - nam_sinh      # thân hàm thụt vào 4 dấu cách

print(tinh_tuoi(2005))
print(tinh_tuoi(1960))
```

- `def tên_hàm(tham_số):` – dòng khai báo, kết thúc bằng dấu `:`.
- Thân hàm **thụt lề 4 dấu cách**.
- `return` gửi kết quả về cho nơi gọi hàm. Hệ thống chấm bài so sánh **giá trị return**, không đọc những gì bạn `print`.

??
Hệ thống chấm CodeRunner gọi `tinh(2)` và so sánh với kết quả đúng `4`. Hàm nào **được điểm**?
```py
def tinh(x):          # (1)
    print(x * 2)

def tinh(x):          # (2)
    return x * 2
```
- [ ] (1)
- [x] (2)
- [ ] Cả hai
- [ ] Không hàm nào
> Hàm (1) chỉ in ra rồi trả về `None` → sai. Luôn dùng `return` khi đề yêu cầu "trả về".

@@@ c1-3 | Import thư viện
@ftu: Ghi chú Buổi 03 – tái sử dụng module/package, `import ... as ...`
@goal: Viết đúng 3 kiểu `import`, dùng được hàm trong module `math`, `statistics` và quy ước `np`, `pd`, `plt`.

Thư viện (module) phải được **nạp** trước khi dùng:

```python
import math                    # 1. nạp cả module → gọi math.sqrt
print(math.sqrt(16), math.pi)

import numpy as np             # 2. nạp và đặt tên ngắn (quy ước của cộng đồng)
print(np.mean([1, 2, 3, 4]))

from statistics import median  # 3. chỉ lấy một hàm → gọi thẳng median()
print(median([5, 1, 9, 3]))
```

Quy ước bạn **phải thuộc** (đề thi và tài liệu đều viết như vậy):

```py
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

??
Sau `import numpy as np`, lệnh nào đúng?
- [ ] `numpy.mean([1, 2])`
- [x] `np.mean([1, 2])`
- [ ] `mean([1, 2])`
- [ ] `np.Mean([1, 2])`
> Đã đặt bí danh `np` thì phải gọi qua `np.`. Python phân biệt hoa thường nên `Mean` sai.

??
Đoạn code sau báo lỗi gì?
```py
from math import sqrt
print(math.sqrt(9))
```
- [ ] Không lỗi, in `3.0`
- [x] `NameError` – tên `math` chưa được định nghĩa
- [ ] `ImportError`
- [ ] `TypeError`
> `from math import sqrt` chỉ đưa tên `sqrt` vào chương trình, **không** có tên `math`. Viết `sqrt(9)` hoặc `import math`.

Một số module có sẵn hay dùng trong đề thi: `math` (căn, làm tròn, ƯCLN), `statistics` (mean, median, mode), `random`, `collections` (Counter), `itertools` (combinations).

```python
import math
print(math.ceil(4.2), math.floor(4.8), math.gcd(12, 18), math.comb(5, 2))
```

??
`math.ceil(4.2)` trả về:
- [ ] `4`
- [x] `5`
- [ ] `4.2`
- [ ] `4.0`
> `ceil` = làm tròn **lên** (trần), `floor` = làm tròn **xuống** (sàn).

@@@ c1-4 | Quy trình một dự án dữ liệu
@ftu: Buổi 5 – các bước phân tích dữ liệu; outline – tổng quan quy trình phân tích
@goal: Kể đúng thứ tự 7 bước của một dự án khoa học dữ liệu và biết mỗi bước được học ở chương nào.

Dự án nhóm (30% điểm) chấm theo tiêu chí: *xác định vấn đề rõ ràng – code dễ hiểu – chạy đúng*. Mọi dự án đi theo cùng một quy trình:

| Bước | Việc | Chương |
|---|---|---|
| 1. Đặt câu hỏi | "Giờ tự học ảnh hưởng thế nào tới điểm?" | 8 |
| 2. Thu thập & nhập dữ liệu | đọc CSV, Excel, cơ sở dữ liệu | 3 |
| 3. Làm sạch | ô trống, trùng lặp, sai kiểu | 4 |
| 4. Khám phá (EDA) | thống kê mô tả, biểu đồ | 4–5 |
| 5. Xây mô hình | hồi quy, phân loại | 6 |
| 6. Đánh giá & tinh chỉnh | R², MSE, cross-validation | 7 |
| 7. Truyền đạt | biểu đồ, báo cáo, thuyết trình | 8 |

??
Bước nào nên làm **đầu tiên** trong một dự án?
- [ ] Chạy mô hình học máy
- [ ] Vẽ thật nhiều biểu đồ
- [x] Xác định câu hỏi cần trả lời
- [ ] Làm sạch dữ liệu
> Không có câu hỏi rõ ràng thì không biết cần dữ liệu gì, làm sạch thế nào, đánh giá ra sao.

Cả quy trình chỉ trong vài dòng (cuối khoá bạn tự viết được – giờ chỉ cần chạy và quan sát):

```python
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("students.csv")                 # 2. nhập
df = df.dropna(subset=["final"])                 # 3. làm sạch: bỏ dòng thiếu điểm
print(df[["study_hours", "final"]].describe().round(2))   # 4. khám phá

model = LinearRegression().fit(df[["study_hours"]], df["final"])   # 5. mô hình
print(f"Mỗi giờ tự học thêm ≈ +{model.coef_[0]:.2f} điểm")         # 7. kết luận
```

??
Xử lý ô trống và dòng trùng lặp thuộc bước nào?
- [ ] Đặt câu hỏi
- [x] Làm sạch dữ liệu
- [ ] Đánh giá mô hình
- [ ] Truyền đạt
> Làm sạch (data cleaning / wrangling) – Chương 4. Thường chiếm 60–80% thời gian của dự án thật.

??
"Mô hình dự đoán đúng 85% trên dữ liệu kiểm tra" là kết quả của bước nào?
- [ ] Nhập dữ liệu
- [ ] Khám phá dữ liệu
- [x] Đánh giá mô hình
- [ ] Làm sạch
> Đo độ chính xác trên dữ liệu chưa thấy là bước đánh giá (Chương 7).

@@@ c1-5 | Đọc thông báo lỗi
@ftu: Bộ câu hỏi ôn giữa kỳ Lecture 3–6 – phần "ngoại lệ"
@goal: Đọc traceback từ dòng cuối, nhận ra 5 lỗi hay gặp nhất (SyntaxError, IndentationError, NameError, TypeError, ZeroDivisionError) và tự sửa.

Gặp lỗi là chuyện bình thường. Kỹ năng quan trọng là **đọc dòng cuối** của thông báo: tên lỗi + mô tả.

```python
diem = 8
print("Điểm của bạn: " + diem)     # lỗi cố ý: ghép chuỗi với số
```

Dòng cuối báo `TypeError: can only concatenate str (not "int") to str` – "chỉ ghép được chuỗi với chuỗi". Sửa bằng `str(diem)` hoặc f-string:

```python
diem = 8
print("Điểm của bạn: " + str(diem))
print(f"Điểm của bạn: {diem}")      # f-string: cách nên dùng
```

| Lỗi | Nghĩa | Ví dụ |
|---|---|---|
| `SyntaxError` | sai cú pháp | quên `:` sau `def f(x)` |
| `IndentationError` | thụt lề sai | thân hàm không thụt vào |
| `NameError` | dùng tên chưa có | gõ `Print`, quên `import` |
| `TypeError` | sai kiểu dữ liệu | `"a" + 1` |
| `ZeroDivisionError` | chia cho 0 | `5 / 0` |

??
`print(diem_tb)` khi chưa từng gán `diem_tb` gây lỗi gì?
- [ ] `TypeError`
- [ ] `SyntaxError`
- [x] `NameError`
- [ ] `ValueError`
> Tên chưa được định nghĩa → `NameError`. Hay gặp khi gõ sai chính tả tên biến.

??
Đoạn code này lỗi gì?
```py
def binh_phuong(x)
    return x * x
```
- [x] `SyntaxError` – thiếu dấu `:`
- [ ] `IndentationError`
- [ ] `NameError`
- [ ] Không lỗi
> Dòng `def`, `if`, `for`, `while` luôn kết thúc bằng `:`.

??
Đọc traceback nên bắt đầu từ đâu?
- [ ] Dòng đầu tiên
- [x] Dòng cuối cùng (tên lỗi + mô tả), rồi tìm số dòng trong code của bạn
- [ ] Ở giữa
- [ ] Bỏ qua, chạy lại là hết
> Dòng cuối cho biết lỗi gì; các dòng `line N` phía trên chỉ ra chỗ xảy ra lỗi.
