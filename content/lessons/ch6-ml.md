@title: Phát triển mô hình học máy cơ bản
@chapter: 6
@summary: Học có/không giám sát, quy trình fit–predict, hồi quy tuyến tính, logistic, KNN, cây quyết định, K-Means và tiền xử lý.

## 1. Học máy là gì?

Máy **học quy luật từ dữ liệu** thay vì lập trình viên viết luật bằng tay.

| Loại | Dữ liệu | Bài toán | Ví dụ | Mô hình |
|---|---|---|---|---|
| **Có giám sát** – hồi quy | X + nhãn **số** | dự đoán giá trị | điểm cuối kỳ, giá nhà | `LinearRegression` |
| **Có giám sát** – phân loại | X + nhãn **lớp** | dự đoán nhóm | đỗ/trượt, spam | `LogisticRegression`, `KNeighborsClassifier`, `DecisionTreeClassifier` |
| **Không giám sát** – phân cụm | chỉ X | tìm nhóm tự nhiên | phân khúc khách hàng | `KMeans` |

Thuật ngữ: **X** = đặc trưng (features, ma trận 2 chiều), **y** = nhãn/mục tiêu (target, 1 chiều).

## 2. Quy trình chuẩn với scikit-learn

Mọi mô hình trong sklearn dùng chung giao diện: **khởi tạo → `fit(X, y)` → `predict(X_new)` → đánh giá**.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

df = pd.read_csv("students.csv").dropna(subset=["final"])
X = df[["study_hours", "attendance"]]     # 2 ngoặc -> DataFrame (2 chiều)
y = df["final"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)               # 1. học
y_pred = model.predict(X_test)            # 2. dự đoán
print("Hệ số:", model.coef_.round(3), "Hệ số chặn:", round(model.intercept_, 3))
print("MAE:", round(mean_absolute_error(y_test, y_pred), 3), "R²:", round(r2_score(y_test, y_pred), 3))
```

> **X phải 2 chiều.** Với một đặc trưng dùng `df[["col"]]` hoặc `np.array(x).reshape(-1, 1)`. Viết `df["col"]` sẽ gây lỗi *Expected 2D array*.

## 3. Hồi quy tuyến tính

Tìm đường thẳng **ŷ = a·x + b** sao cho tổng bình phương sai số nhỏ nhất. Đây chính là bài trong tuyển tập (dự đoán điểm từ giờ tự học):

```python
import numpy as np
from sklearn.linear_model import LinearRegression

hours = [5, 10, 15, 20, 8, 12, 18, 6, 14, 16]
scores = [5.0, 6.0, 7.5, 8.5, 5.5, 6.5, 8.0, 5.2, 7.0, 7.8]
X = np.array(hours).reshape(-1, 1)
model = LinearRegression().fit(X[:8], scores[:8])
a, b = model.coef_[0], model.intercept_
print(f"điểm ≈ {a:.3f} × giờ + {b:.3f}")
print("Dự đoán 10 giờ:", model.predict([[10]])[0], "| tính tay:", a * 10 + b)

# công thức bình phương tối thiểu tự tính
x, y = np.array(hours[:8]), np.array(scores[:8])
a2 = ((x - x.mean()) * (y - y.mean())).sum() / ((x - x.mean()) ** 2).sum()
print("tự tính a =", round(a2, 3), "b =", round(y.mean() - a2 * x.mean(), 3))
```

## 4. Hồi quy logistic – phân loại nhị phân

Dự đoán **xác suất** thuộc lớp 1 bằng hàm sigmoid, rồi so với ngưỡng 0.5.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression

attendance = np.array([12, 8, 14, 6, 13, 7, 15, 5, 11, 9]).reshape(-1, 1)
passed = np.array([1, 0, 1, 0, 1, 0, 1, 0, 1, 0])
clf = LogisticRegression().fit(attendance, passed)
for buoi in [6, 9, 10, 11, 14]:
    p = clf.predict_proba([[buoi]])[0][1]
    print(f"{buoi:>2} buổi -> P(đỗ) = {p:.2f} -> dự đoán {clf.predict([[buoi]])[0]}")
```

## 5. K láng giềng gần nhất (KNN)

Dự đoán theo **đa số k điểm gần nhất**. Nhạy với thang đo → nên chuẩn hoá.

```python
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

st = pd.read_csv("students.csv").dropna(subset=["final"])
X = st[["attendance", "study_hours"]]
y = (st["final"] >= 5).astype(int)
knn = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)).fit(X, y)
new = pd.DataFrame({"attendance": [6, 14], "study_hours": [3, 15]})
print(knn.predict(new), knn.predict_proba(new).round(2))
```

## 6. Cây quyết định

Chia dữ liệu bằng chuỗi câu hỏi "có/không" – **dễ giải thích** cho người không chuyên.

```python
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text

st = pd.read_csv("students.csv").dropna(subset=["midterm", "final"])
X = st[["attendance", "study_hours", "midterm"]]
y = (st["final"] >= 5).astype(int)
tree = DecisionTreeClassifier(max_depth=2, random_state=0).fit(X, y)
print(export_text(tree, feature_names=list(X.columns)))
print(dict(zip(X.columns, tree.feature_importances_.round(3))))
```

## 7. Phân cụm K-Means

Lặp 2 bước: **gán** mỗi điểm vào tâm gần nhất → **cập nhật** tâm = trung bình các điểm trong cụm.

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

sales = pd.read_csv("sales.csv").drop_duplicates().dropna(subset=["quantity"])
sales["revenue"] = sales["quantity"] * sales["unit_price"]
cust = sales.groupby("customer_id")[["quantity", "revenue"]].sum()
X = StandardScaler().fit_transform(cust)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
cust["cluster"] = km.labels_
print(cust.groupby("cluster").mean().round(0))
print("Inertia (tổng khoảng cách trong cụm):", round(km.inertia_, 2))
```

Chọn k bằng **phương pháp khuỷu tay (elbow)**: vẽ inertia theo k, chọn điểm "gãy".

## 8. Tiền xử lý dữ liệu

| Vấn đề | Giải pháp |
|---|---|
| Thang đo khác nhau | `StandardScaler` (z-score), `MinMaxScaler` ([0,1]) |
| Biến phân loại (chữ) | `pd.get_dummies` / `OneHotEncoder` |
| Ô trống | `dropna`, `fillna`, `SimpleImputer` |

```python
import pandas as pd
st = pd.read_csv("students.csv")
X = pd.get_dummies(st[["class", "gender", "study_hours"]], columns=["class", "gender"], drop_first=True)
X.head()
```

> **Rò rỉ dữ liệu (data leakage):** chỉ `fit` scaler trên tập **train**, rồi `transform` cả train và test. Dùng `Pipeline` để sklearn tự làm đúng.
