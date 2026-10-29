@title: Trực quan hoá dữ liệu
@chapter: 5
@summary: Matplotlib từ cơ bản: đường, cột, histogram, boxplot, scatter, nhiều biểu đồ; vẽ từ Pandas; EDA với tương quan, heatmap, Pearson p-value và ANOVA.

Một biểu đồ tốt trả lời **một câu hỏi** rõ ràng. Chương này đi theo từng loại biểu đồ – mỗi bài: khi nào dùng, vẽ thế nào, đọc thế nào – rồi kết thúc bằng khám phá dữ liệu (EDA) và các kiểm định thống kê hay dùng kèm biểu đồ.

Quy ước: `import matplotlib.pyplot as plt` và luôn vẽ theo kiểu **`fig, ax = plt.subplots()`** (hướng đối tượng) – rõ ràng hơn và đề thi thường yêu cầu `return ax`.

> **Đối chiếu tài liệu FTU:** Lecture 7 (EDA: `describe`, `value_counts`, `groupby`, pivot, heatmap, tương quan) và Lecture 8 / Buổi 8 (line, bar, scatter, box plot; Matplotlib – Seaborn – Plotly); bài tập vẽ biểu đồ Buổi 9; câu vẽ biểu đồ 1.5 điểm trong đề thi.

@@@ c5-1 | Biểu đồ đầu tiên: fig, ax và biểu đồ đường
@ftu: Slide Buổi 8 – line plot: xu hướng theo thời gian
@goal: Tạo `fig, ax`, vẽ biểu đồ đường, đặt tiêu đề, nhãn trục, chú thích (legend) và lưới.
@practice: v01

> **Nói đơn giản:** Matplotlib vẽ theo hình ảnh: **`fig` là tờ giấy, `ax` là khung toạ độ** vẽ trên tờ giấy đó. Biểu đồ **đường** hợp để xem dữ liệu *thay đổi theo thời gian*. Một biểu đồ tử tế luôn có đủ: tiêu đề, tên hai trục, chú thích nếu có nhiều đường.
>
> **Từ cần biết:** **`fig, ax = plt.subplots()`** = tạo giấy + khung vẽ · **`ax.plot`** = vẽ đường · **`set_title` / `set_xlabel` / `set_ylabel`** = đặt tiêu đề, nhãn trục · **`legend`** = chú giải · **`grid`** = lưới


```python
import matplotlib.pyplot as plt

thang = [1, 2, 3, 4, 5, 6]
dt_2023 = [120, 135, 128, 150, 160, 158]
dt_2024 = [130, 150, 149, 170, 182, 190]

fig, ax = plt.subplots(figsize=(6, 3.5))     # fig = cả khung hình, ax = một hệ trục
ax.plot(thang, dt_2023, marker="o", label="2023")
ax.plot(thang, dt_2024, marker="s", linestyle="--", label="2024")
ax.set_title("Doanh thu 6 tháng đầu năm")
ax.set_xlabel("Tháng")
ax.set_ylabel("Triệu đồng")
ax.legend()
ax.grid(alpha=0.3)
plt.show()
```

**Biểu đồ đường** dùng cho dữ liệu **theo thời gian** (xu hướng).

??
`fig, ax = plt.subplots()` – `ax` là gì?
- [ ] Toàn bộ cửa sổ hình
- [x] Một hệ trục (vùng vẽ) – nơi gọi `ax.plot`, `ax.set_title`…
- [ ] Danh sách dữ liệu
- [ ] Tên file ảnh
> `fig` là "tờ giấy", `ax` là "khung biểu đồ" trên tờ giấy đó. Một fig có thể chứa nhiều ax.

??
Muốn hiện chú thích "2023", "2024" cho từng đường, cần:
- [ ] Chỉ gọi `ax.legend()`
- [x] Đặt `label=` trong mỗi `ax.plot(...)` **và** gọi `ax.legend()`
- [ ] `ax.set_label(["2023", "2024"])`
- [ ] `plt.title("2023, 2024")`
> `legend()` lấy chữ từ `label` của từng đường.

Slide Buổi 8 của FTU giới thiệu ba thư viện: **Matplotlib** (phổ biến nhất), **Seaborn** (heatmap, violin, biểu đồ thống kê) và **Plotly** (biểu đồ **tương tác** – phóng to, rê chuột xem giá trị).

??
Thư viện nào nổi bật với biểu đồ **tương tác** (phóng to, rê chuột hiện giá trị)?
- [ ] Matplotlib
- [ ] Seaborn
- [x] Plotly
- [ ] NumPy
> Matplotlib/Seaborn tạo ảnh tĩnh; Plotly tạo biểu đồ HTML tương tác.

??
Dạng dữ liệu nào phù hợp nhất với biểu đồ đường?
- [x] Giá cổ phiếu theo từng ngày
- [ ] Tỉ trọng doanh thu 4 danh mục
- [ ] Doanh thu của 5 khu vực
- [ ] Phân phối điểm thi
> Đường nối các điểm theo thứ tự – hợp với trục thời gian liên tục.

@@@ c5-2 | Biểu đồ cột: so sánh giữa các nhóm
@ftu: Slide Buổi 8 – bar plot cho dữ liệu nominal/ordinal; đề thi HK I 2024–2025 câu 5b
@goal: Vẽ cột dọc/ngang, sắp xếp cột, ghi giá trị lên cột và chọn đúng loại cột cho dữ liệu.
@practice: v02

> **Nói đơn giản:** **Biểu đồ cột** để *so sánh giữa các nhóm* (doanh thu từng chi nhánh). Khi tên nhóm dài thì xoay thành cột **ngang** (`barh`) cho dễ đọc. Xếp cột từ cao xuống thấp và ghi số lên đầu cột giúp người xem hiểu ngay.
>
> **Từ cần biết:** **`bar`** = cột dọc · **`barh`** = cột ngang · **`annotate` / `bar_label`** = ghi số lên cột


```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv").dropna()
dt = (df["quantity"] * df["unit_price"]).groupby(df["region"]).sum().sort_values(ascending=False)

fig, ax = plt.subplots(figsize=(6, 3.5))
bars = ax.bar(dt.index, dt.values, color="#4C78A8")
ax.bar_label(bars, fmt="%.0f")              # ghi giá trị trên đầu cột
ax.set_title("Doanh thu theo khu vực")
ax.set_ylabel("Nghìn đồng")
plt.show()
```

**Cột** dùng để **so sánh các nhóm** (khu vực, sản phẩm…). Sắp xếp cột giảm dần giúp đọc nhanh.

??
Khi tên nhóm rất dài (tên sản phẩm), loại biểu đồ nào dễ đọc hơn?
- [ ] Cột dọc `ax.bar`
- [x] Cột ngang `ax.barh`
- [ ] Đường
- [ ] Tròn
> Nhãn nằm trên trục y, không bị chồng chéo hay phải xoay chữ.

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv").dropna()
sl = df.groupby("product")["quantity"].sum().sort_values()
fig, ax = plt.subplots(figsize=(6, 3.5))
ax.barh(sl.index, sl.values, color="#F58518")
ax.set_xlabel("Số lượng bán")
ax.set_title("Sản phẩm bán chạy")
plt.show()
```

??
`ax.bar(x, h)` – tham số thứ hai là:
- [ ] Độ rộng cột
- [x] Chiều cao các cột
- [ ] Màu cột
- [ ] Vị trí nhãn
> `ax.bar(nhãn_x, chiều_cao)`. Với `barh` là `ax.barh(nhãn_y, độ_dài)`.

??
Để cột **ngắn nhất ở dưới, dài nhất ở trên** trong `barh`, Series nên được sắp xếp:
- [x] Tăng dần
- [ ] Giảm dần
- [ ] Theo tên
- [ ] Không cần
> `barh` vẽ phần tử đầu tiên ở **dưới cùng**, nên sắp tăng dần thì cột dài nhất nằm trên cùng.

@@@ c5-3 | Histogram và boxplot: nhìn phân phối
@ftu: Slide Buổi 8 – box plot: phạm vi, phân tán; outline – xử lý ngoại lai
@goal: Vẽ histogram với số khoảng phù hợp, đọc hình dạng phân phối, vẽ boxplot và tìm giá trị ngoại lai bằng quy tắc IQR.
@practice: v03, np08

> **Nói đơn giản:** **Histogram** cho thấy *hình dáng* của dữ liệu: chia các giá trị vào những "thùng" liên tiếp rồi đếm xem mỗi thùng có bao nhiêu. **Boxplot** là bản "đóng gói": cái hộp chứa **50% dữ liệu ở giữa**, vạch trong hộp là trung vị, các chấm lẻ loi ngoài râu là **giá trị ngoại lai** (điểm bất thường).
>
> **Từ cần biết:** **ngoại lai (outlier)** = giá trị khác thường so với phần còn lại · **Q1, Q3** = mốc 25% và 75% · **IQR = Q3 − Q1** = bề rộng cái hộp · ngoại lai nếu < Q1 − 1.5·IQR hoặc > Q3 + 1.5·IQR


```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
fig, ax = plt.subplots(figsize=(6, 3.5))
ax.hist(df["final"].dropna(), bins=8, edgecolor="white")
ax.axvline(df["final"].mean(), color="red", linestyle="--", label="trung bình")
ax.set_title("Phân phối điểm cuối kỳ")
ax.set_xlabel("Điểm")
ax.set_ylabel("Số sinh viên")
ax.legend()
plt.show()
```

**Histogram** chia trục giá trị thành các khoảng (`bins`) và đếm số quan sát mỗi khoảng → thấy dữ liệu tập trung ở đâu, lệch trái/phải, có mấy đỉnh.

??
Histogram với `bins=10` có bao nhiêu cột?
- [ ] 9
- [x] 10
- [ ] 11
- [ ] Tuỳ dữ liệu
> Mỗi khoảng là một cột (có thể có cột cao 0).

### Boxplot và quy tắc IQR

```python
import pandas as pd
import matplotlib.pyplot as plt

cars = pd.read_csv("cars.csv", na_values="?").dropna()
fig, ax = plt.subplots(figsize=(6, 3.5))
groups = [g["price"].values for _, g in cars.groupby("drive_wheels")]
ax.boxplot(groups, labels=sorted(cars["drive_wheels"].unique()))
ax.set_title("Giá xe theo hệ dẫn động")
plt.show()

q1, q3 = cars["price"].quantile([0.25, 0.75])
iqr = q3 - q1
print("Ngưỡng ngoại lai:", q1 - 1.5 * iqr, q3 + 1.5 * iqr)
```

Hộp kéo từ Q1 (25%) tới Q3 (75%), vạch giữa là trung vị. Điểm nằm ngoài **[Q1 − 1.5·IQR, Q3 + 1.5·IQR]** được coi là **ngoại lai**.

??
Q1 = 20, Q3 = 30. Giá trị nào là ngoại lai theo quy tắc 1.5·IQR?
- [ ] 6
- [ ] 44
- [x] 46
- [ ] 31
> IQR = 10, ngưỡng = [20 − 15, 30 + 15] = [5, 45]. Chỉ 46 nằm ngoài.

??
Vạch ngang ở giữa hộp của boxplot là:
- [ ] Trung bình
- [x] Trung vị
- [ ] Mode
- [ ] Q3
> Boxplot dựa trên các phân vị, không dùng trung bình.

@@@ c5-4 | Biểu đồ phân tán và tương quan
@ftu: Slide Buổi 8 – scatter plot; slide Buổi 6–7 – tương quan engine-size và price
@goal: Vẽ scatter hai biến số, đọc chiều và độ mạnh của quan hệ, tính hệ số tương quan và vẽ đường xu hướng.
@practice: v04, pd13

> **Nói đơn giản:** **Biểu đồ phân tán**: mỗi chấm là *một đối tượng*, vị trí chấm theo hai con số của nó (vd chiều cao và cân nặng). Nếu các chấm xếp thành một dải đi lên thì hai đại lượng cùng tăng. **Hệ số tương quan r** (từ −1 đến 1) đo độ "dính" ấy: gần 1 = cùng tăng, gần −1 = một tăng một giảm, gần 0 = không liên quan. *Tương quan không có nghĩa là nguyên nhân.*
>
> **Từ cần biết:** **scatter** = biểu đồ chấm · **tương quan** = hai đại lượng biến đổi cùng nhau · **đường xu hướng** = đường thẳng đi gần các chấm nhất


```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("cars.csv", na_values="?").dropna()
x, y = df["engine_size"], df["price"]
a, b = np.polyfit(x, y, 1)                     # đường thẳng khớp nhất y = a·x + b

fig, ax = plt.subplots(figsize=(6, 3.5))
ax.scatter(x, y, alpha=0.7)
ax.plot(x.sort_values(), a * x.sort_values() + b, color="red")
ax.set_xlabel("Dung tích động cơ")
ax.set_ylabel("Giá")
ax.set_title(f"r = {x.corr(y):.2f}")
plt.show()
```

**Hệ số tương quan Pearson r** ∈ [−1, 1]:
- r gần **+1**: tăng cùng nhau (động cơ lớn → giá cao)
- r gần **−1**: ngược chiều (động cơ lớn → mpg thấp)
- r gần **0**: không có quan hệ **tuyến tính**

??
`df["engine_size"].corr(df["highway_mpg"])` nhiều khả năng:
- [ ] Gần +1
- [x] Âm, gần −1
- [ ] Đúng bằng 0
- [ ] Lớn hơn 1
> Động cơ càng lớn càng tốn xăng → đi được ít dặm/gallon hơn.

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?").dropna()
print(df[["engine_size", "horsepower", "highway_mpg", "price"]].corr().round(2))
```

??
r = 0.05 giữa hai biến nghĩa là:
- [ ] Hai biến hoàn toàn độc lập
- [x] Hầu như không có quan hệ **tuyến tính** (vẫn có thể có quan hệ phi tuyến)
- [ ] Quan hệ rất mạnh
- [ ] Biến này gây ra biến kia
> Pearson chỉ đo quan hệ đường thẳng. Luôn vẽ scatter để xem hình dạng.

??
Hệ số tương quan cao chứng minh điều gì?
- [ ] Biến x **gây ra** biến y
- [x] Hai biến biến động cùng nhau – chưa chứng minh quan hệ nhân quả
- [ ] Mô hình hồi quy chắc chắn đúng
- [ ] Không có ngoại lai
> "Tương quan không phải nhân quả" – có thể có biến thứ ba tác động cả hai.

@@@ c5-5 | Nhiều biểu đồ trong một hình
@ftu: Bài tập vẽ biểu đồ Buổi 9; bộ câu hỏi Lecture 7–11 – "biểu đồ tốt cần tiêu đề, nhãn trục"
@goal: Tạo lưới biểu đồ bằng `plt.subplots(nrows, ncols)`, điều khiển kích thước, dùng chung trục, sắp xếp gọn và lưu ảnh.
@practice: v05

> **Nói đơn giản:** Khi cần so sánh nhiều biểu đồ, ta vẽ chúng **cạnh nhau trong một hình**, như một khung tranh nhiều ô. `plt.subplots(2, 3)` tạo lưới 2 hàng 3 cột; mỗi ô là một `ax` riêng để vẽ vào.
>
> **Từ cần biết:** **`nrows`, `ncols`** = số hàng, số cột của lưới · **`figsize`** = kích thước hình · **`tight_layout()`** = tự dàn cho không đè lên nhau · **`savefig`** = lưu thành file ảnh


```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv").dropna()
fig, axes = plt.subplots(1, 3, figsize=(10, 3))      # 1 dòng, 3 cột → axes là mảng 3 phần tử
axes[0].hist(df["final"], bins=8)
axes[0].set_title("Điểm cuối kỳ")
axes[1].scatter(df["study_hours"], df["final"], s=15)
axes[1].set_title("Giờ học – điểm")
df.groupby("class")["final"].mean().plot(kind="bar", ax=axes[2], rot=0)
axes[2].set_title("TB theo lớp")
fig.suptitle("Tổng quan kết quả học tập")
fig.tight_layout()                                    # tự giãn để chữ không chồng nhau
fig.savefig("tong_quan.png", dpi=120)
plt.show()
```

??
`fig, axes = plt.subplots(2, 3)`. Lấy hệ trục ở **dòng 2, cột 1** (đếm từ 1):
- [ ] `axes[2][1]`
- [x] `axes[1, 0]`
- [ ] `axes[1]`
- [ ] `axes[5]`
> Lưới 2×3 → `axes` là mảng 2 chiều, chỉ số từ 0.

??
`fig.tight_layout()` dùng để:
- [ ] Thu nhỏ dữ liệu
- [x] Tự căn khoảng cách để tiêu đề, nhãn trục không chồng lên nhau
- [ ] Lưu hình
- [ ] Xoá trục thừa
> Gọi sau khi vẽ xong, trước khi lưu/hiển thị.

??
`plt.subplots(1, 2)` trả về `axes` có dạng:
- [x] Mảng 1 chiều gồm 2 hệ trục: `axes[0]`, `axes[1]`
- [ ] Một hệ trục duy nhất
- [ ] Mảng 2×1
- [ ] List 2 figure
> Một dòng hoặc một cột → mảng 1 chiều.

@@@ c5-6 | Vẽ nhanh từ Pandas và biểu đồ tròn
@ftu: Đề thi HK I 2024–2025 câu 5a (biểu đồ tròn); Final hè 2025 – biểu đồ tròn autopct
@goal: Dùng `Series.plot` / `DataFrame.plot` với `kind=` để vẽ nhanh, vẽ biểu đồ tròn đúng chỗ và biết khi nào không nên dùng.
@practice: v06

> **Nói đơn giản:** Pandas có sẵn lệnh vẽ nhanh: `df["cot"].plot(kind="bar")` – không cần dựng `fig, ax`. **Biểu đồ tròn** chỉ hợp khi vài phần *cộng lại thành 100%* (ví dụ tỉ lệ thị phần); nhiều lát thì khó so sánh, nên dùng biểu đồ cột.
>
> **Từ cần biết:** **`kind=`** = chọn loại biểu đồ (`"bar"`, `"hist"`, `"pie"`…) · **`autopct`** = hiện phần trăm trên lát tròn


Pandas gói sẵn Matplotlib: `series.plot(kind=...)` với `kind` là `"line"`, `"bar"`, `"barh"`, `"hist"`, `"box"`, `"scatter"`, `"pie"`.

```python
import pandas as pd
import matplotlib.pyplot as plt

st = pd.read_csv("stocks.csv", parse_dates=["date"])
gia = st.pivot(index="date", columns="ticker", values="close")
ax = gia.plot(figsize=(6, 3.5), title="Giá đóng cửa")     # mỗi cột một đường
ax.set_ylabel("Nghìn đồng")
plt.show()
```

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv").dropna()
ti_trong = (df["quantity"] * df["unit_price"]).groupby(df["category"]).sum()
fig, ax = plt.subplots(figsize=(4, 4))
ax.pie(ti_trong.values, labels=ti_trong.index, autopct="%1.1f%%", startangle=90)
ax.set_title("Tỉ trọng doanh thu theo danh mục")
plt.show()
```

??
Biểu đồ tròn phù hợp khi:
- [ ] So sánh doanh thu 12 tháng
- [x] Thể hiện tỉ trọng của **ít** phần (≤ 5) trong một tổng
- [ ] Thể hiện tương quan hai biến
- [ ] Có 20 sản phẩm
> Nhiều lát quá sẽ không đọc được; khi đó dùng cột ngang.

??
`gia.plot()` với `gia` là DataFrame 3 cột (VNM, FPT, HPG) vẽ ra:
- [ ] Một đường tổng
- [x] 3 đường, mỗi cột một đường, index làm trục x
- [ ] 3 biểu đồ riêng
- [ ] Lỗi
> DataFrame.plot vẽ mỗi cột thành một series, kèm legend tự động.

??
`autopct="%1.1f%%"` trong `ax.pie` làm gì?
- [ ] Đặt màu
- [x] Ghi phần trăm (1 chữ số thập phân) lên từng lát
- [ ] Xoay biểu đồ
- [ ] Tách lát ra ngoài
> `%%` là ký tự `%` thật.

@@@ c5-7 | Khám phá dữ liệu (EDA): nhóm, tương quan và heatmap
@ftu: Lecture 7 – EDA: describe, value_counts, groupby, pivot, heatmap, tương quan; đề cương – crosstab
@goal: Thực hiện EDA theo trình tự: thống kê mô tả → so sánh theo nhóm → ma trận tương quan → heatmap, và rút ra nhận xét.
@practice: pd12, pd13

> **Nói đơn giản:** **EDA (khám phá dữ liệu)** là bước *"nhìn trước khi làm"*: tính thống kê, so sánh các nhóm, xem hai cột nào liên quan nhau. **Ma trận tương quan** là bảng ghi r của từng cặp cột; **heatmap** tô màu bảng đó để mắt thấy ngay cặp nào mạnh.
>
> **Từ cần biết:** **EDA** = khám phá dữ liệu ban đầu · **`df.corr()`** = ma trận tương quan · **heatmap** = bảng tô màu theo giá trị


EDA (Exploratory Data Analysis) = **đặt câu hỏi và trả lời bằng thống kê + biểu đồ** trước khi làm mô hình. Ví dụ với `cars.csv`: *"Yếu tố nào liên quan nhiều nhất tới giá xe?"*

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?").dropna()

# 1. biến phân loại: giá trung bình theo nhóm
print(df.groupby("drive_wheels")["price"].agg(["count", "mean"]).round(0))
print(df.groupby(["drive_wheels", "body_style"])["price"].mean().unstack().round(0))

# 2. biến số: tương quan với giá
print(df.select_dtypes("number").corr()["price"].sort_values(ascending=False).round(2))
```

??
Muốn biết **biến số nào liên quan mạnh nhất** với `price`, nhìn vào:
- [ ] `df["price"].describe()`
- [x] Cột `price` trong `df.corr()`, sắp theo trị tuyệt đối
- [ ] `df["price"].value_counts()`
- [ ] `df.head()`
> Tương quan âm mạnh (gần −1) cũng là quan hệ mạnh – xét trị tuyệt đối.

### Heatmap ma trận tương quan

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("cars.csv", na_values="?").dropna()
corr = df.select_dtypes("number").corr()
fig, ax = plt.subplots(figsize=(6, 5))
im = ax.imshow(corr, cmap="RdBu_r", vmin=-1, vmax=1)
ax.set_xticks(range(len(corr)), corr.columns, rotation=45, ha="right")
ax.set_yticks(range(len(corr)), corr.columns)
for i in range(len(corr)):
    for j in range(len(corr)):
        ax.text(j, i, f"{corr.iloc[i, j]:.1f}", ha="center", va="center", fontsize=8)
fig.colorbar(im)
ax.set_title("Ma trận tương quan")
fig.tight_layout()
plt.show()
```

(Trên Colab, thư viện **Seaborn** vẽ việc này một dòng: `sns.heatmap(corr, annot=True)`.)

??
Đường chéo chính của ma trận tương quan luôn bằng:
- [ ] 0
- [x] 1
- [ ] −1
- [ ] Tuỳ dữ liệu
> Mỗi biến tương quan hoàn hảo với chính nó.

??
`df.groupby(["drive_wheels", "body_style"])["price"].mean().unstack()` cho kết quả dạng:
- [ ] Một số
- [x] Bảng: dòng là `drive_wheels`, cột là `body_style`
- [ ] Series một cấp
- [ ] List
> `unstack()` đưa cấp index thứ hai thành cột – tương đương một `pivot_table`.

@@@ c5-8 | Kiểm định thống kê trong EDA: Pearson p-value và ANOVA
@ftu: Slide Buổi 6–7 – tương quan không phải nhân quả; khoá IBM module 3 (Pearson, ANOVA)
@goal: Dùng `scipy.stats.pearsonr` để biết tương quan có ý nghĩa thống kê không, dùng ANOVA (`f_oneway`) so sánh trung bình nhiều nhóm.
@practice: pd13

> **Nói đơn giản:** Thấy hai cột "có vẻ liên quan" có thể chỉ là **may rủi**. **p-value** trả lời: *"nếu thực ra chẳng có quan hệ gì, thì xác suất thấy kết quả như thế này là bao nhiêu?"* Con số **nhỏ (thường < 0.05)** nghĩa là khó mà do may mắn → có bằng chứng quan hệ thật. **ANOVA** áp dụng ý này để hỏi: trung bình của nhiều nhóm có *thật sự* khác nhau không?
>
> **Từ cần biết:** **p-value** = xác suất thấy kết quả này nếu thực ra không có gì xảy ra · **ý nghĩa thống kê** = p < 0.05 · **`pearsonr`** = tính r và p-value · **`f_oneway`** = ANOVA


Hệ số tương quan tính trên **mẫu** nhỏ có thể do ngẫu nhiên. **p-value** cho biết xác suất thấy tương quan mạnh như vậy nếu thực ra không có quan hệ.

```python
import pandas as pd
from scipy import stats

df = pd.read_csv("cars.csv", na_values="?").dropna()
for col in ["engine_size", "horsepower", "highway_mpg", "curb_weight"]:
    r, p = stats.pearsonr(df[col], df["price"])
    print(f"{col:12s} r = {r:+.3f}   p = {p:.2e}")
```

Quy ước thường dùng (khoá IBM):
- p < 0.001: bằng chứng **rất mạnh** · p < 0.05: **có ý nghĩa** · p > 0.1: **không** có bằng chứng

??
r = 0.82 và p = 0.0000003. Kết luận:
- [x] Tương quan dương mạnh và có ý nghĩa thống kê
- [ ] Tương quan yếu
- [ ] Không có ý nghĩa vì p quá nhỏ
- [ ] Chứng minh quan hệ nhân quả
> p rất nhỏ → khó xảy ra do ngẫu nhiên. Vẫn không phải nhân quả.

### ANOVA – so sánh trung bình nhiều nhóm

Biến phân loại (ví dụ `drive_wheels`) có ảnh hưởng đến giá không? ANOVA so sánh trung bình giá giữa các nhóm:

```python
import pandas as pd
from scipy import stats

df = pd.read_csv("cars.csv", na_values="?").dropna()
nhom = [g["price"] for _, g in df.groupby("drive_wheels")]
f, p = stats.f_oneway(*nhom)
print(f"F = {f:.2f}, p = {p:.2e}")
print(df.groupby("drive_wheels")["price"].mean().round(0))
```

- **F lớn, p nhỏ** → trung bình các nhóm khác nhau thật → biến phân loại này đáng đưa vào mô hình.
- F nhỏ, p lớn → khác biệt có thể chỉ do ngẫu nhiên.

??
ANOVA cho F = 0.4, p = 0.67 khi so sánh giá theo `body_style`. Kết luận:
- [ ] `body_style` ảnh hưởng rất mạnh tới giá
- [x] Không có bằng chứng giá trung bình khác nhau giữa các kiểu thân xe
- [ ] Phải bỏ cột price
- [ ] Tương quan âm
> p lớn hơn nhiều so với 0.05 → không bác bỏ giả thuyết "các trung bình bằng nhau".

??
Dùng kiểm định nào để xem **biến phân loại** có liên quan tới biến số `price`?
- [ ] Pearson
- [x] ANOVA
- [ ] Histogram
- [ ] `value_counts`
> Pearson cho hai biến **số**; ANOVA cho biến phân loại (nhiều nhóm) với biến số.

??
`stats.pearsonr(x, y)` trả về:
- [ ] Chỉ r
- [x] Cặp (r, p-value)
- [ ] Bảng tương quan
- [ ] Phương trình hồi quy
> Mở gói: `r, p = stats.pearsonr(x, y)`.

@@@ c5-9 | Seaborn và biểu đồ "đẹp, đầy đủ thông tin" trong đề thi
@ftu: Đề cương ôn tập – "regplot, boxplot trong seaborn"; slide Buổi 8 – Matplotlib/Seaborn/Plotly
@goal: Vẽ `regplot` và `boxplot` bằng Seaborn như đề cương ôn tập yêu cầu, và vẽ biểu đồ cột/tròn đạt đủ tiêu chí chấm: tiêu đề, nhãn trục, giá trị trên cột, phần trăm, màu riêng từng cột.
@practice: fe15, fe16

> **Nói đơn giản:** **Seaborn** là Matplotlib được trang điểm sẵn: vài dòng ngắn đã ra biểu đồ đẹp. `regplot` vẽ chấm kèm đường xu hướng; `boxplot` vẽ hộp. Đề thi chấm theo *tiêu chí*: có tiêu đề, nhãn trục, chú giải, biểu đồ đúng loại – nhớ làm đủ từng mục.
>
> **Từ cần biết:** **`sns.regplot`** = chấm + đường xu hướng · **`sns.boxplot`** = hộp theo nhóm · **tiêu chí đẹp–đủ** = tiêu đề, nhãn trục, chú giải, đơn vị


Đề cương ôn tập cuối kỳ TIN314 liệt kê *"vẽ biểu đồ regplot, boxplot trong seaborn"*; đề thi 2024–2025 có câu vẽ biểu đồ tròn và cột *"thiết kế đẹp và đầy đủ thông tin, doanh thu phải đặt trên mỗi cột"*. (Lần đầu chạy ô có `import seaborn`, trang tải thư viện khoảng vài giây.)

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("cars.csv", na_values="?").dropna()
fig, axes = plt.subplots(1, 2, figsize=(10, 3.5))
sns.regplot(x="engine_size", y="price", data=df, ax=axes[0])      # scatter + đường hồi quy
axes[0].set_title("Giá theo dung tích động cơ")
sns.boxplot(x="drive_wheels", y="price", data=df, ax=axes[1])     # phân phối giá theo nhóm
axes[1].set_title("Giá theo hệ dẫn động")
fig.tight_layout()
plt.show()
```

??
`sns.regplot(x="engine_size", y="price", data=df)` vẽ:
- [ ] Biểu đồ cột
- [x] Biểu đồ phân tán kèm đường hồi quy tuyến tính (và dải tin cậy)
- [ ] Histogram
- [ ] Ma trận tương quan
> Dùng nhanh để xem quan hệ tuyến tính giữa hai biến số – đúng dạng câu hỏi EDA.

### Biểu đồ đạt điểm tối đa

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({"Chi nhanh": ["Chi nhánh 1", "Chi nhánh 2", "Chi nhánh 3"], "Doanh thu": [3, 4, 3]})
ns = pd.DataFrame({"Hang muc": ["Sản xuất", "Marketing", "R&D", "Khác"], "Ngan sach": [30, 40, 20, 10]})

fig, (a1, a2) = plt.subplots(1, 2, figsize=(10, 4))
bars = a1.bar(df["Chi nhanh"], df["Doanh thu"], color=["#4C78A8", "#F58518", "#54A24B"])  # màu riêng từng cột
a1.bar_label(bars, fmt="%g triệu USD")       # giá trị trên mỗi cột
a1.set_title("Doanh thu các chi nhánh")
a1.set_xlabel("Chi nhánh")
a1.set_ylabel("Doanh thu (triệu USD)")
a1.set_ylim(0, df["Doanh thu"].max() * 1.2)   # chừa chỗ cho nhãn

a2.pie(ns["Ngan sach"], labels=ns["Hang muc"], autopct="%1.1f%%", startangle=90,
       explode=[0, 0.08, 0, 0])               # tách lát lớn nhất
a2.set_title("Phân bổ ngân sách (%)")
fig.tight_layout()
plt.show()
```

Checklist "đẹp và đầy đủ": **tiêu đề · nhãn hai trục kèm đơn vị · giá trị/phần trăm trên hình · chú thích khi có nhiều nhóm · chữ không chồng nhau (`tight_layout`)**.

??
Đề yêu cầu "doanh thu phải đặt trên mỗi cột". Cách ngắn nhất:
- [ ] `ax.set_title(doanh_thu)`
- [x] `bars = ax.bar(...)` rồi `ax.bar_label(bars)`
- [ ] `ax.legend()`
- [ ] `plt.text()` một lần
> `bar_label` ghi giá trị cho **mọi** cột; `ax.text` cũng được nhưng phải lặp qua từng cột.

??
Biểu đồ tròn thiếu phần trăm trên các lát. Thêm tham số:
- [ ] `labels=`
- [x] `autopct="%1.1f%%"`
- [ ] `startangle=90`
- [ ] `explode=`
> `labels` là tên lát, `autopct` mới ghi phần trăm.
