Ngân hàng câu hỏi trắc nghiệm TIN314. Đáp án đúng đánh dấu bằng * ở đầu dòng.

===== q1-01
@chapter: 1
::: question
Thư viện nào dùng chủ yếu để làm việc với **dữ liệu dạng bảng** (đọc CSV, lọc, nhóm, ghép bảng)?
::: options
NumPy
*Pandas
Matplotlib
scikit-learn
::: explain
Pandas cung cấp DataFrame. NumPy là mảng số, Matplotlib vẽ biểu đồ, scikit-learn là học máy.

===== q1-02
@chapter: 1
::: question
Thứ tự hợp lý của một dự án phân tích dữ liệu là:
::: options
Mô hình → Làm sạch → Đặt câu hỏi → Trực quan hoá
*Đặt câu hỏi → Thu thập → Làm sạch → Khám phá (EDA) → Mô hình → Đánh giá → Truyền đạt
Thu thập → Mô hình → Đặt câu hỏi → Báo cáo
Trực quan hoá → Thu thập → Làm sạch → Mô hình
::: explain
Luôn bắt đầu từ câu hỏi nghiên cứu, làm sạch và khám phá dữ liệu trước khi mô hình hoá.

===== q1-03
@chapter: 1
::: question
Python xác định một **khối lệnh** (thân hàm, thân vòng lặp) bằng:
::: options
Dấu ngoặc nhọn `{ }`
Từ khoá `begin ... end`
*Thụt lề (thường 4 dấu cách)
Dấu chấm phẩy `;`
::: explain
Thụt lề là cú pháp bắt buộc trong Python; sai thụt lề gây `IndentationError`.

===== q1-04
@chapter: 1
::: question
Kết quả của `type(3 / 1)` là gì?
::: options
`int`
*`float`
`str`
Lỗi
::: explain
Phép `/` luôn trả về số thực: `3 / 1 == 3.0`. Muốn chia nguyên dùng `//`.

===== q1-05
@chapter: 1
::: question
Thư viện nào cung cấp các mô hình như `LinearRegression`, `KMeans`, hàm `train_test_split`?
::: options
Pandas
SciPy
*scikit-learn (`sklearn`)
Matplotlib
::: explain
scikit-learn là thư viện học máy chuẩn trong Python.

===== q2-01
@chapter: 2
::: question
Output của đoạn code?
```python
print(17 // 5, 17 % 5, -7 // 2)
```
::: options
`3.4 2 -3`
*`3 2 -4`
`3 2 -3`
`4 2 -4`
::: explain
`//` làm tròn **xuống** (về −∞): −7 // 2 = −3.5 làm tròn xuống = −4.

===== q2-02
@chapter: 2
::: question
Output?
```python
s = "TIN314"
print(s[1:4], s[-2:], s[::-1])
```
::: options
`TIN 14 413NIT`
*`IN3 14 413NIT`
`IN3 4 413NIT`
`IN31 14 TIN314`
::: explain
`s[1:4]` lấy chỉ số 1, 2, 3 → "IN3"; `s[-2:]` lấy 2 ký tự cuối; `[::-1]` đảo chuỗi.

===== q2-03
@chapter: 2
::: question
Output?
```python
a = [1, 2, 3]
b = a
b.append(4)
print(len(a))
```
::: options
3
*4
Lỗi
0
::: explain
`b = a` không sao chép – a và b trỏ cùng một list. Muốn sao chép: `b = a.copy()`.

===== q2-04
@chapter: 2
::: question
Hàm sau trả về gì khi gọi `f(5)`?
```python
def f(x):
    print(x * 2)
```
::: options
10
`"10"`
*`None` (và in ra 10)
Lỗi
::: explain
Hàm không có `return` sẽ trả về `None`. Đây là lỗi mất điểm số 1 khi thi CodeRunner.

===== q2-05
@chapter: 2
::: question
Output?
```python
nums = [3, 1, 2]
x = nums.sort()
print(x, nums)
```
::: options
`[1, 2, 3] [1, 2, 3]`
`[1, 2, 3] [3, 1, 2]`
*`None [1, 2, 3]`
`None [3, 1, 2]`
::: explain
`list.sort()` sắp xếp tại chỗ và trả về `None`. `sorted(nums)` mới trả về list mới.

===== q2-06
@chapter: 2
::: question
Output?
```python
print([x * x for x in range(6) if x % 2 == 1])
```
::: options
`[0, 4, 16]`
*`[1, 9, 25]`
`[1, 9, 25, 49]`
`[1, 3, 5]`
::: explain
`range(6)` = 0..5; số lẻ 1, 3, 5 → bình phương 1, 9, 25.

===== q2-07
@chapter: 2
::: question
Output?
```python
d = {"a": 1, "b": 2}
print(d.get("c", 0) + d["b"])
```
::: options
Lỗi `KeyError`
*2
3
`None`
::: explain
`d.get("c", 0)` trả về giá trị mặc định 0 khi không có key → 0 + 2 = 2. Còn `d["c"]` sẽ lỗi KeyError.

===== q2-08
@chapter: 2
::: question
Output?
```python
print(len(set([1, 2, 2, 3, 3, 3])), sorted({3, 1, 2}))
```
::: options
`6 [3, 1, 2]`
*`3 [1, 2, 3]`
`3 {1, 2, 3}`
`1 [1, 2, 3]`
::: explain
set loại phần tử trùng; `sorted()` nhận set và trả về **list** đã sắp xếp.

===== q2-09
@chapter: 2
::: question
Output?
```python
print(round(2.5), round(3.5), round(2.675, 2))
```
::: options
`3 4 2.68`
*`2 4 2.67`
`2 3 2.67`
`3 4 2.67`
::: explain
`round` làm tròn "về số chẵn" khi ở giữa (2.5 → 2), và 2.675 thực ra được lưu là 2.67499999… nên ra 2.67.

===== q2-10
@chapter: 2
::: question
Output?
```python
x = 0
for i in range(1, 10):
    if i % 3 == 0:
        continue
    if i > 7:
        break
    x += i
print(x)
```
::: options
45
*19
12
27
::: explain
Cộng i = 1, 2, 4, 5, 7 (bỏ 3, 6 do continue; dừng tại 8 do break) → 19.

===== q2-11
@chapter: 2
::: question
Output?
```python
words = ["bb", "a", "ccc", "dd"]
print(sorted(words, key=len))
```
::: options
`['a', 'bb', 'ccc', 'dd']`
*`['a', 'bb', 'dd', 'ccc']`
`['ccc', 'bb', 'dd', 'a']`
`['a', 'dd', 'bb', 'ccc']`
::: explain
Sắp theo độ dài; `sorted` ổn định nên "bb" và "dd" (cùng độ dài 2) giữ thứ tự ban đầu.

===== q2-12
@chapter: 2
::: question
Đoạn code nào **gây lỗi**?
::: options
`"a" * 3`
`[0] * 3`
*`"Điểm: " + 9`
`str(9) + "đ"`
::: explain
Không thể cộng chuỗi với số → `TypeError`. Dùng `"Điểm: " + str(9)` hoặc f-string.

===== q2-13
@chapter: 2
::: question
Output?
```python
def f(a, b=2, *args):
    return a + b + len(args)
print(f(1), f(1, 5), f(1, 5, 7, 8))
```
::: options
*`3 6 8`
`3 6 21`
`3 7 8`
Lỗi vì thiếu tham số b
::: explain
f(1) = 1+2+0 (b dùng giá trị mặc định); f(1,5) = 6; f(1,5,7,8): args = (7, 8) nên len(args) = 2 → 1+5+2 = 8.

===== q2-14
@chapter: 2
::: question
Output?
```python
from collections import Counter
print(Counter("banana").most_common(1))
```
::: options
`[('b', 1)]`
`[('n', 2)]`
*`[('a', 3)]`
`{'a': 3}`
::: explain
"banana" có a×3, n×2, b×1. `most_common(1)` trả về list chứa tuple (phần tử, số lần).

===== q2-15
@chapter: 2
::: question
Cách tạo ma trận 3×3 toàn số 0 **đúng** (các hàng độc lập) là:
::: options
`[[0] * 3] * 3`
*`[[0] * 3 for _ in range(3)]`
`[0] * 9`
`[[0, 0, 0]] * 3`
::: explain
`[[0] * 3] * 3` tạo 3 tham chiếu tới **cùng một hàng** – sửa một ô sẽ đổi cả cột.

===== q2-16
@chapter: 2
::: question
Output?
```python
print(max([("An", 7), ("Bình", 9), ("Chi", 8)], key=lambda t: t[1])[0])
```
::: options
`9`
*`Bình`
`("Bình", 9)`
`Chi`
::: explain
`max` với key so sánh phần tử thứ 2; trả về cả tuple ("Bình", 9), `[0]` lấy tên.

===== q3-01
@chapter: 3
::: question
File dùng dấu chấm phẩy làm phân cách. Đọc đúng bằng:
::: options
`pd.read_csv("f.csv", delimiter=None)`
*`pd.read_csv("f.csv", sep=";")`
`pd.read_csv("f.csv", split=";")`
`pd.read_excel("f.csv")`
::: explain
Tham số `sep` (hoặc `delimiter`) chỉ định ký tự phân cách.

===== q3-02
@chapter: 3
::: question
Khi ghi DataFrame ra CSV, muốn **không** ghi thêm cột chỉ số 0, 1, 2… thì dùng:
::: options
`df.to_csv("out.csv", header=False)`
*`df.to_csv("out.csv", index=False)`
`df.to_csv("out.csv", sep=False)`
`df.save("out.csv")`
::: explain
`index=False` bỏ cột index khi ghi file.

===== q3-03
@chapter: 3
::: question
Output?
```python
import numpy as np
a = np.array([1, 2, 3])
print(a * 2, [1, 2, 3] * 2)
```
::: options
`[2 4 6] [2, 4, 6]`
*`[2 4 6] [1, 2, 3, 1, 2, 3]`
`[1 2 3 1 2 3] [1, 2, 3, 1, 2, 3]`
Lỗi
::: explain
NumPy tính theo từng phần tử (vector hoá); list nhân 2 là **lặp lại** list.

===== q3-04
@chapter: 3
::: question
`m = np.arange(12).reshape(3, 4)`. `m.mean(axis=0)` trả về mảng có bao nhiêu phần tử?
::: options
3
*4
12
1
::: explain
`axis=0` gộp theo chiều hàng → còn lại một giá trị cho mỗi **cột** (4 cột).

===== q3-05
@chapter: 3
::: question
Output?
```python
import numpy as np
a = np.array([5, 12, 7, 20])
print(a[a > 6])
```
::: options
`[True True True True]`
*`[12  7 20]`
`[False True True True]`
`[5]`
::: explain
`a > 6` là mặt nạ boolean; `a[mask]` lấy các phần tử ứng với True.

===== q3-06
@chapter: 3
::: question
`np.std([2, 4, 4, 4, 5, 5, 7, 9])` bằng 2.0. Vậy `pd.Series([2, 4, 4, 4, 5, 5, 7, 9]).std()` sẽ:
::: options
Cũng bằng 2.0
*Lớn hơn 2.0 (≈ 2.14) vì Pandas dùng ddof = 1
Nhỏ hơn 2.0
Báo lỗi
::: explain
NumPy mặc định độ lệch chuẩn tổng thể (chia n), Pandas mặc định độ lệch chuẩn mẫu (chia n − 1).

===== q3-07
@chapter: 3
::: question
`np.zeros((2, 3)).shape` là:
::: options
`(3, 2)`
*`(2, 3)`
`6`
`(2,)`
::: explain
Shape là (số hàng, số cột).

===== q3-08
@chapter: 3
::: question
Vì sao nên dùng `with open("f.txt") as f:` thay vì `f = open("f.txt")`?
::: options
Đọc nhanh hơn
*File tự động được đóng kể cả khi có lỗi
Để đọc được tiếng Việt
Bắt buộc theo cú pháp
::: explain
Context manager `with` đảm bảo `f.close()` được gọi.

===== q4-01
@chapter: 4
::: question
`df[["a", "b"]]` và `df["a"]` lần lượt trả về kiểu gì?
::: options
Series, DataFrame
*DataFrame, Series
DataFrame, DataFrame
list, Series
::: explain
Một tên cột → Series; danh sách tên cột (2 cặp ngoặc) → DataFrame.

===== q4-02
@chapter: 4
::: question
Với DataFrame index 0..9, `df.loc[0:3]` và `df.iloc[0:3]` trả về lần lượt bao nhiêu dòng?
::: options
3 và 3
*4 và 3
3 và 4
4 và 4
::: explain
`loc` theo nhãn và **bao gồm** cận cuối; `iloc` theo vị trí và **không bao gồm** cận cuối.

===== q4-03
@chapter: 4
::: question
Lọc dòng có `region` là "Hà Nội" **và** `quantity > 5`:
::: options
`df[df["region"] == "Hà Nội" and df["quantity"] > 5]`
*`df[(df["region"] == "Hà Nội") & (df["quantity"] > 5)]`
`df[df["region"] == "Hà Nội" & df["quantity"] > 5]`
`df.filter(region="Hà Nội", quantity=5)`
::: explain
Dùng `&` với Series và bọc ngoặc từng điều kiện (vì `&` ưu tiên cao hơn `==`).

===== q4-04
@chapter: 4
::: question
`df.isna().sum()` trả về:
::: options
Tổng số ô trống của cả bảng (1 số)
*Số ô trống của từng cột (Series)
Các dòng có ô trống
DataFrame True/False
::: explain
`isna()` cho bảng True/False; `.sum()` cộng theo cột. Tổng cả bảng: `df.isna().sum().sum()`.

===== q4-05
@chapter: 4
::: question
Tính **tổng doanh thu theo từng khu vực**:
::: options
`df.sum("revenue").groupby("region")`
*`df.groupby("region")["revenue"].sum()`
`df["region"].sum()["revenue"]`
`df.pivot("region").sum()`
::: explain
Mẫu chuẩn: `df.groupby(cột_nhóm)[cột_giá_trị].hàm_tổng_hợp()`.

===== q4-06
@chapter: 4
::: question
Output?
```python
import pandas as pd
s = pd.Series([3, None, 5])
print(s.mean(), s.count(), len(s))
```
::: options
`nan 3 3`
*`4.0 2 3`
`2.67 3 3`
`4.0 3 3`
::: explain
Pandas bỏ qua NaN khi tính mean; `count()` đếm ô **không** trống; `len` đếm cả ô trống.

===== q4-07
@chapter: 4
::: question
Ghép bảng đơn hàng với bảng khách hàng, **giữ lại mọi đơn hàng** kể cả khi không tìm thấy khách:
::: options
`orders.merge(customers, on="customer_id", how="inner")`
*`orders.merge(customers, on="customer_id", how="left")`
`orders.merge(customers, on="customer_id", how="right")`
`pd.concat([orders, customers])`
::: explain
`left` giữ toàn bộ bảng bên trái (orders); cột của customers sẽ là NaN nếu không khớp.

===== q4-08
@chapter: 4
::: question
Sau khi lọc `df2 = df[df["x"] > 0]`, gán `df2["y"] = 1` gây cảnh báo *SettingWithCopyWarning*. Cách khắc phục tốt nhất:
::: options
Tắt cảnh báo
*Viết `df2 = df[df["x"] > 0].copy()`
Dùng `df2.y = 1`
Dùng vòng lặp for
::: explain
`.copy()` tạo DataFrame độc lập, tránh mơ hồ giữa "view" và "copy".

===== q4-09
@chapter: 4
::: question
Muốn index đánh lại 0, 1, 2… sau khi lọc/sắp xếp và **bỏ** index cũ:
::: options
`df.reset_index()`
*`df.reset_index(drop=True)`
`df.set_index(0)`
`df.reindex()`
::: explain
Không có `drop=True`, index cũ sẽ thành một cột mới tên "index".

===== q4-10
@chapter: 4
::: question
Lấy **dòng có điểm cao nhất trong mỗi lớp**:
::: options
`df.groupby("class")["final"].max()`
*`df.loc[df.groupby("class")["final"].idxmax()]`
`df.sort_values("final").head(1)`
`df.groupby("class").first()`
::: explain
`max()` chỉ trả về giá trị; `idxmax()` trả về **index** của dòng max để lấy cả dòng bằng `loc`.

===== q4-11
@chapter: 4
::: question
Chuyển cột chuỗi ngày `"2024-03-15"` sang kiểu ngày rồi lấy tháng:
::: options
`df["date"].month`
*`pd.to_datetime(df["date"]).dt.month`
`df["date"].str.month`
`int(df["date"][5:7])`
::: explain
Sau `pd.to_datetime`, dùng accessor `.dt` (`.dt.year`, `.dt.month`, `.dt.day_name()`…).

===== q4-12
@chapter: 4
::: question
`df["category"].value_counts(normalize=True)` trả về:
::: options
Số lần xuất hiện mỗi giá trị
*Tỉ lệ (0–1) xuất hiện mỗi giá trị
Các giá trị duy nhất
Số giá trị duy nhất
::: explain
`normalize=True` chia cho tổng → tỉ lệ. `nunique()` cho số giá trị duy nhất, `unique()` cho danh sách.

===== q5-01
@chapter: 5
::: question
Muốn xem **phân phối** điểm thi của 300 sinh viên, biểu đồ phù hợp nhất là:
::: options
Biểu đồ tròn
*Histogram
Biểu đồ đường
Biểu đồ cột theo từng sinh viên
::: explain
Histogram chia trục giá trị thành các khoảng (bins) và đếm số quan sát mỗi khoảng.

===== q5-02
@chapter: 5
::: question
Thể hiện **mối quan hệ giữa hai biến số** (giờ tự học và điểm):
::: options
Pie chart
*Scatter plot
Bar chart
Histogram
::: explain
Scatter plot đặt mỗi quan sát là một điểm (x, y), thấy được xu hướng và ngoại lai.

===== q5-03
@chapter: 5
::: question
`fig, axes = plt.subplots(2, 3)` – truy cập biểu đồ ở **hàng 2, cột 1** bằng:
::: options
`axes[2][1]`
*`axes[1, 0]`
`axes[1]`
`axes[0, 1]`
::: explain
`axes` là mảng 2×3, chỉ số bắt đầu từ 0: hàng 2 → 1, cột 1 → 0.

===== q5-04
@chapter: 5
::: question
Boxplot **không** trực tiếp cho biết thông tin nào?
::: options
Trung vị
Tứ phân vị Q1, Q3
Giá trị ngoại lai
*Giá trị trung bình cộng (mean)
::: explain
Đường giữa hộp là **trung vị**; mean không hiển thị mặc định (trừ khi `showmeans=True`).

===== q5-05
@chapter: 5
::: question
Lệnh đặt tiêu đề cho một Axes `ax`:
::: options
`ax.title("Doanh thu")`
*`ax.set_title("Doanh thu")`
`plt.set_title("Doanh thu")`
`ax.label("Doanh thu")`
::: explain
Với Axes dùng `set_title`, `set_xlabel`, `set_ylabel`; với pyplot dùng `plt.title`, `plt.xlabel`.

===== q5-06
@chapter: 5
::: question
Theo dõi giá cổ phiếu FPT trong 60 phiên, biểu đồ phù hợp nhất là:
::: options
*Biểu đồ đường
Biểu đồ tròn
Histogram
Boxplot
::: explain
Dữ liệu theo thời gian → biểu đồ đường để thấy xu hướng.

===== q6-01
@chapter: 6
::: question
Dự đoán **giá căn hộ** (một số thực) từ diện tích, vị trí… là bài toán:
::: options
Phân loại
*Hồi quy
Phân cụm
Giảm chiều
::: explain
Biến mục tiêu là số liên tục → hồi quy. Nhãn rời rạc (đỗ/trượt) → phân loại.

===== q6-02
@chapter: 6
::: question
Phân khúc khách hàng thành các nhóm **khi chưa có nhãn** là bài toán:
::: options
Hồi quy tuyến tính
Phân loại có giám sát
*Phân cụm (học không giám sát)
Hồi quy logistic
::: explain
Không có nhãn → học không giám sát; K-Means là thuật toán phân cụm phổ biến.

===== q6-03
@chapter: 6
::: question
Lỗi *"Expected 2D array, got 1D array instead"* khi gọi `model.fit(X, y)` thường do:
::: options
y là mảng 2 chiều
*X chỉ có một đặc trưng và đang là mảng/Series 1 chiều
Chưa import numpy
Dữ liệu có NaN
::: explain
X phải 2 chiều: dùng `df[["col"]]` hoặc `np.array(x).reshape(-1, 1)`.

===== q6-04
@chapter: 6
::: question
`train_test_split(X, y, test_size=0.2, random_state=42)` trả về theo thứ tự:
::: options
`X_train, y_train, X_test, y_test`
*`X_train, X_test, y_train, y_test`
`X_test, X_train, y_test, y_train`
`train, test`
::: explain
Thứ tự: hai phần của X trước, rồi hai phần của y. `random_state` giúp kết quả lặp lại được.

===== q6-05
@chapter: 6
::: question
Mô hình hồi quy `ŷ = 0.3x + 4.2` với x là giờ tự học. Ý nghĩa của 0.3 là:
::: options
Điểm khi không học
*Mỗi giờ tự học thêm, điểm dự đoán tăng 0.3
Độ chính xác của mô hình
Sai số trung bình
::: explain
Hệ số góc (`coef_`) là mức thay đổi của y khi x tăng 1 đơn vị; 4.2 là hệ số chặn (`intercept_`).

===== q6-06
@chapter: 6
::: question
`LogisticRegression().predict_proba(X_new)` trả về:
::: options
Nhãn 0/1
*Xác suất thuộc từng lớp, mỗi hàng dạng `[P(lớp 0), P(lớp 1)]`
Hệ số của mô hình
Độ chính xác
::: explain
Xác suất lớp 1 lấy bằng `predict_proba(X)[:, 1]`.

===== q6-07
@chapter: 6
::: question
Vì sao cần chuẩn hoá (StandardScaler) trước khi dùng KNN hoặc K-Means?
::: options
Để mô hình chạy nhanh hơn
*Vì thuật toán dựa trên khoảng cách – biến có thang đo lớn sẽ áp đảo
Để loại bỏ dữ liệu thiếu
Vì sklearn bắt buộc
::: explain
Ví dụ doanh thu (triệu) và số lượng (đơn vị) – không chuẩn hoá thì khoảng cách gần như chỉ phụ thuộc doanh thu.

===== q6-08
@chapter: 6
::: question
Trong K-Means, mỗi vòng lặp gồm hai bước:
::: options
Chia train/test và đánh giá
*Gán điểm vào tâm gần nhất, rồi cập nhật tâm = trung bình các điểm trong cụm
Tính gradient và cập nhật trọng số
Chọn k và vẽ biểu đồ
::: explain
Lặp đến khi các tâm không đổi (hội tụ).

===== q6-09
@chapter: 6
::: question
Biến `class` có giá trị "K62-A", "K62-B", "K62-C". Cách đưa vào mô hình tuyến tính đúng là:
::: options
Đổi thành 1, 2, 3
*One-hot encoding: `pd.get_dummies(df, columns=["class"])`
Xoá biến đó
Đổi sang chữ thường
::: explain
Gán 1, 2, 3 ngầm tạo ra thứ tự/khoảng cách không có thật; one-hot tạo các cột 0/1.

===== q7-01
@chapter: 7
::: question
Mô hình đạt accuracy 99% trên train nhưng 65% trên test. Hiện tượng này là:
::: options
Underfitting
*Overfitting
Data leakage có lợi
Mô hình tốt
::: explain
Học thuộc dữ liệu train, không tổng quát hoá. Giải pháp: mô hình đơn giản hơn (giảm max_depth), thêm dữ liệu, regularization.

===== q7-02
@chapter: 7
::: question
Ma trận nhầm lẫn của sklearn `confusion_matrix(y_true, y_pred)` với nhãn 0/1 có dạng:
::: options
`[[TP, FP], [FN, TN]]`
*`[[TN, FP], [FN, TP]]`
`[[TP, FN], [FP, TN]]`
`[[TN, FN], [FP, TP]]`
::: explain
Hàng = thực tế (0 rồi 1), cột = dự đoán (0 rồi 1).

===== q7-03
@chapter: 7
::: question
TP = 30, FP = 10, FN = 20, TN = 40. Precision và Recall lần lượt là:
::: options
0.6 và 0.75
*0.75 và 0.6
0.7 và 0.7
0.75 và 0.67
::: explain
Precision = 30/(30+10) = 0.75; Recall = 30/(30+20) = 0.6.

===== q7-04
@chapter: 7
::: question
Hệ thống **cảnh báo sớm sinh viên có nguy cơ trượt** nên ưu tiên chỉ số nào?
::: options
Precision
*Recall
Accuracy
R²
::: explain
Bỏ sót sinh viên yếu (FN) nguy hiểm hơn cảnh báo nhầm, nên cần recall cao.

===== q7-05
@chapter: 7
::: question
Bộ dữ liệu có 95% giao dịch hợp lệ, 5% gian lận. Mô hình luôn đoán "hợp lệ" có:
::: options
Accuracy 5%, recall lớp gian lận 100%
*Accuracy 95%, recall lớp gian lận 0%
Accuracy 50%
Precision lớp gian lận 95%
::: explain
Đây là lý do accuracy gây hiểu lầm khi dữ liệu mất cân bằng lớp.

===== q7-06
@chapter: 7
::: question
R² = 0 có nghĩa là:
::: options
Mô hình dự đoán hoàn hảo
*Mô hình không tốt hơn việc luôn đoán giá trị trung bình
Sai số bằng 0
Hệ số góc bằng 0
::: explain
R² = 1 − SS_res/SS_tot. R² có thể âm nếu mô hình tệ hơn đoán trung bình.

===== q7-07
@chapter: 7
::: question
5-fold cross-validation nghĩa là:
::: options
Huấn luyện 5 mô hình khác loại
*Chia dữ liệu thành 5 phần, lần lượt mỗi phần làm tập kiểm tra, 4 phần còn lại để huấn luyện
Lặp lại train_test_split 5 lần với test_size = 0.5
Dùng 5 đặc trưng tốt nhất
::: explain
Kết quả là 5 điểm số; lấy trung bình để đánh giá ổn định hơn.

===== q7-08
@chapter: 7
::: question
Trong `GridSearchCV`, `n_neighbors` của KNN hoặc `max_depth` của cây quyết định được gọi là:
::: options
Tham số (học từ dữ liệu)
*Siêu tham số (do người dùng chọn)
Đặc trưng
Nhãn
::: explain
GridSearchCV thử mọi tổ hợp siêu tham số và chọn tổ hợp có điểm cross-validation tốt nhất (`best_params_`).

===== q7-09
@chapter: 7
::: question
Đâu là **rò rỉ dữ liệu** (data leakage)?
::: options
Chia train/test với random_state cố định
*Fit StandardScaler trên toàn bộ dữ liệu (cả test) rồi mới chia train/test
Dùng cross-validation
Bỏ các dòng có ô trống
::: explain
Thông tin của tập test (mean, std) đã "lọt" vào quá trình huấn luyện. Nên fit scaler chỉ trên train (dùng Pipeline).

===== q8-01
@chapter: 8
::: question
Theo đề cương, tiêu chí nào **không** nằm trong tiêu chí chấm dự án môn học?
::: options
Xác định vấn đề rõ ràng, hợp lý, khả thi
Chương trình dễ hiểu
Chương trình chạy đúng, ra kết quả theo yêu cầu
*Sử dụng mô hình học sâu (deep learning)
::: explain
Không yêu cầu mô hình phức tạp – quan trọng là vấn đề rõ ràng, code dễ hiểu và chạy đúng.

===== q8-02
@chapter: 8
::: question
Trước khi nộp notebook dự án, việc nên làm nhất là:
::: options
Xoá hết output cho gọn
*Restart kernel & Run All để chắc chắn chạy từ đầu đến cuối không lỗi
Gộp mọi code vào một ô
Đổi tên biến thành a, b, c cho ngắn
::: explain
Notebook hay bị lỗi do chạy các ô không theo thứ tự; Run All từ đầu đảm bảo tái lập được kết quả.

===== q8-03
@chapter: 8
::: question
Để đánh giá mô hình dự án có thực sự hữu ích, nên so sánh nó với:
::: options
Không cần so sánh
*Một mô hình cơ sở (baseline) đơn giản, ví dụ luôn đoán trung bình
Kết quả trên tập huấn luyện
Mô hình của nhóm khác
::: explain
Nếu mô hình không tốt hơn baseline thì chưa mang lại giá trị (sklearn có `DummyRegressor`, `DummyClassifier`).
