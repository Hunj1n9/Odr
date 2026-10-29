@title: Trực quan hoá dữ liệu
@chapter: 5
@summary: Cấu trúc Figure/Axes, 6 loại biểu đồ cốt lõi, subplots, vẽ từ Pandas và chọn biểu đồ phù hợp.

## 1. Figure và Axes

- **Figure**: cả khung hình (có thể chứa nhiều biểu đồ).
- **Axes**: một biểu đồ cụ thể (có trục x, y, tiêu đề…).

Cách viết khuyên dùng – hướng đối tượng:

```python
import matplotlib.pyplot as plt

months = ["T1", "T2", "T3", "T4", "T5", "T6"]
revenue = [120, 135, 128, 160, 172, 190]
cost = [90, 95, 100, 110, 115, 120]

fig, ax = plt.subplots(figsize=(7, 3.5))
ax.plot(months, revenue, marker="o", label="Doanh thu")
ax.plot(months, cost, marker="s", linestyle="--", label="Chi phí")
ax.set_title("Kết quả kinh doanh 6 tháng")
ax.set_xlabel("Tháng")
ax.set_ylabel("Triệu đồng")
ax.legend()
ax.grid(alpha=0.3)
```

## 2. Sáu loại biểu đồ cốt lõi

| Câu hỏi | Biểu đồ | Lệnh |
|---|---|---|
| Thay đổi theo thời gian? | Đường (line) | `ax.plot` |
| So sánh các nhóm? | Cột (bar/barh) | `ax.bar`, `ax.barh` |
| Phân phối của một biến? | Histogram | `ax.hist` |
| Quan hệ giữa 2 biến số? | Phân tán (scatter) | `ax.scatter` |
| So sánh phân phối giữa nhóm, tìm ngoại lai? | Hộp (boxplot) | `ax.boxplot` |
| Tỉ trọng trong tổng thể (ít nhóm)? | Tròn (pie) | `ax.pie` |

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv").dropna(subset=["region", "quantity"])
df["revenue"] = df["quantity"] * df["unit_price"]
rev = df.groupby("region")["revenue"].sum().sort_values(ascending=False)

fig, ax = plt.subplots(figsize=(6, 3.5))
bars = ax.bar(rev.index, rev.values, color="#4C78A8")
ax.bar_label(bars, fmt="%.0f", fontsize=8)
ax.set_title("Doanh thu theo khu vực")
ax.set_ylabel("Doanh thu")
```

```python
import pandas as pd
import matplotlib.pyplot as plt
st = pd.read_csv("students.csv")

fig, ax = plt.subplots(figsize=(6, 3.5))
ax.hist(st["final"].dropna(), bins=10, range=(0, 10), edgecolor="black", color="#F58518")
ax.axvline(st["final"].mean(), color="red", linestyle="--", label="Trung bình")
ax.set_title("Phân phối điểm cuối kỳ")
ax.set_xlabel("Điểm")
ax.set_ylabel("Số sinh viên")
ax.legend()
```

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
st = pd.read_csv("students.csv").dropna(subset=["final"])

fig, ax = plt.subplots(figsize=(6, 4))
sc = ax.scatter(st["study_hours"], st["final"], c=st["attendance"], cmap="viridis")
a, b = np.polyfit(st["study_hours"], st["final"], 1)      # đường xu hướng
xs = np.linspace(st["study_hours"].min(), st["study_hours"].max(), 50)
ax.plot(xs, a * xs + b, color="red", label=f"y = {a:.2f}x + {b:.2f}")
fig.colorbar(sc, label="Số buổi đi học")
ax.set_xlabel("Giờ tự học")
ax.set_ylabel("Điểm cuối kỳ")
ax.legend()
```

## 3. Nhiều biểu đồ: `subplots`

```python
import pandas as pd
import matplotlib.pyplot as plt
st = pd.read_csv("students.csv").dropna(subset=["final"])
classes = sorted(st["class"].unique())

fig, axes = plt.subplots(1, 3, figsize=(12, 3.5))
axes[0].boxplot([st.loc[st["class"] == c, "final"] for c in classes], labels=classes)
axes[0].set_title("Điểm theo lớp")
axes[1].bar(classes, st.groupby("class")["final"].mean().loc[classes], color="#59A14F")
axes[1].set_title("Điểm TB theo lớp")
counts = st["gender"].value_counts()
axes[2].pie(counts.values, labels=counts.index, autopct="%1.1f%%", startangle=90)
axes[2].set_title("Giới tính")
fig.suptitle("Tổng quan lớp TIN314")
fig.tight_layout()
```

## 4. Vẽ nhanh từ Pandas

Mỗi Series/DataFrame có `.plot(kind=...)` dùng Matplotlib bên dưới:

```python
import pandas as pd
stocks = pd.read_csv("stocks.csv", parse_dates=["date"])
prices = stocks.pivot(index="date", columns="ticker", values="close")
ax = (prices / prices.iloc[0] * 100).plot(figsize=(7, 3.5), title="Chỉ số giá (ngày đầu = 100)")
ax.set_ylabel("Chỉ số")
```

```python
import pandas as pd
df = pd.read_csv("sales.csv").dropna(subset=["region", "quantity"])
pd.crosstab(df["region"], df["category"]).plot(kind="bar", stacked=True, figsize=(6, 3.5), rot=0)
```

## 5. Seaborn (tham khảo)

Trên máy tính / Colab bạn có thể dùng Seaborn để vẽ đẹp nhanh hơn (trang này không cài sẵn Seaborn):

```py
import seaborn as sns
sns.histplot(data=st, x="final", hue="class", kde=True)
sns.boxplot(data=st, x="class", y="final")
sns.heatmap(st.corr(numeric_only=True), annot=True, cmap="coolwarm")
sns.pairplot(st[["study_hours", "attendance", "final"]])
```

## 6. Nguyên tắc biểu đồ "ăn điểm"

- Luôn có **tiêu đề, nhãn trục, đơn vị**; có legend khi nhiều đường.
- Cột nên **sắp xếp** theo giá trị; trục y của biểu đồ cột bắt đầu từ 0.
- Không dùng pie khi > 5 nhóm; không dùng 3D.
- Một biểu đồ – **một thông điệp**: tiêu đề có thể là kết luận ("Hà Nội dẫn đầu doanh thu").
