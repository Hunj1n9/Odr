@title: Đánh giá và tinh chỉnh mô hình
@chapter: 7
@summary: MAE/MSE/RMSE/R², ma trận nhầm lẫn, precision/recall/F1, overfitting, cross-validation và GridSearchCV.

## 1. Đánh giá mô hình hồi quy

| Chỉ số | Công thức | Ý nghĩa |
|---|---|---|
| MAE | mean(\|y − ŷ\|) | sai trung bình bao nhiêu đơn vị – dễ diễn giải |
| MSE | mean((y − ŷ)²) | phạt nặng sai số lớn |
| RMSE | √MSE | cùng đơn vị với y |
| R² | 1 − SS_res / SS_tot | tỉ lệ biến động của y được giải thích (1 là hoàn hảo, 0 = đoán trung bình) |

```python
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

y_true = np.array([3, 5, 7, 9])
y_pred = np.array([2.5, 5, 8, 8])
mae = np.mean(np.abs(y_true - y_pred))
mse = np.mean((y_true - y_pred) ** 2)
r2 = 1 - ((y_true - y_pred) ** 2).sum() / ((y_true - y_true.mean()) ** 2).sum()
print("tự tính :", mae, mse, np.sqrt(mse), r2)
print("sklearn :", mean_absolute_error(y_true, y_pred), mean_squared_error(y_true, y_pred), r2_score(y_true, y_pred))
```

## 2. Đánh giá mô hình phân loại

**Ma trận nhầm lẫn** (sklearn: hàng = thực tế, cột = dự đoán):

|  | Dự đoán 0 | Dự đoán 1 |
|---|---|---|
| **Thực tế 0** | TN | FP (báo nhầm) |
| **Thực tế 1** | FN (bỏ sót) | TP |

- **Accuracy** = (TP + TN) / tổng – dễ gây hiểu lầm khi dữ liệu lệch lớp.
- **Precision** = TP / (TP + FP) – trong các lần báo "dương", đúng bao nhiêu?
- **Recall** = TP / (TP + FN) – trong các ca dương thật, bắt được bao nhiêu?
- **F1** = 2PR / (P + R) – cân bằng P và R.

```python
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, classification_report

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 0, 1, 1, 1, 0, 0, 1, 0]
print(confusion_matrix(y_true, y_pred))
print("acc", accuracy_score(y_true, y_pred), "P", precision_score(y_true, y_pred),
      "R", recall_score(y_true, y_pred), "F1", round(f1_score(y_true, y_pred), 3))
print(classification_report(y_true, y_pred, target_names=["Trượt", "Đỗ"]))
```

### Chọn Precision hay Recall?

| Tình huống | Sai lầm nguy hiểm hơn | Ưu tiên |
|---|---|---|
| Cảnh báo sớm SV có nguy cơ trượt, phát hiện bệnh, gian lận thẻ | **Bỏ sót** (FN) | **Recall** |
| Lọc thư rác, gợi ý đầu tư rủi ro cao | **Báo nhầm** (FP) | **Precision** |

> **Bẫy accuracy:** 95 SV đỗ, 5 trượt – mô hình "ai cũng đỗ" có accuracy 95% nhưng recall lớp "trượt" = 0!

## 3. Overfitting và underfitting

- **Underfitting**: mô hình quá đơn giản – sai nhiều trên cả train lẫn test.
- **Overfitting**: "học thuộc" train – train rất tốt, test kém.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

st = pd.read_csv("students.csv").dropna(subset=["midterm", "final"])
X = st[["attendance", "study_hours", "midterm"]]
y = (st["final"] >= 5).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
for depth in [1, 2, 3, 5, None]:
    m = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X_tr, y_tr)
    print(f"max_depth={depth}: train={m.score(X_tr, y_tr):.2f}  test={m.score(X_te, y_te):.2f}")
```

## 4. Kiểm định chéo (cross-validation)

Chia dữ liệu thành k phần; lần lượt dùng 1 phần làm test, k−1 phần làm train → k điểm số. Ổn định hơn một lần chia, đặc biệt khi ít dữ liệu.

```python
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression

st = pd.read_csv("students.csv").dropna(subset=["final"])
scores = cross_val_score(LinearRegression(), st[["study_hours", "attendance"]], st["final"], cv=5, scoring="r2")
print(scores.round(3), "→ TB", scores.mean().round(3), "±", scores.std().round(3))
```

## 5. Tinh chỉnh siêu tham số – GridSearchCV

**Tham số** (hệ số a, b…) mô hình tự học; **siêu tham số** (k của KNN, max_depth của cây…) do ta chọn.

```python
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

st = pd.read_csv("students.csv").dropna(subset=["final"])
X = st[["attendance", "study_hours"]]
y = (st["final"] >= 5).astype(int)
pipe = Pipeline([("scale", StandardScaler()), ("knn", KNeighborsClassifier())])
gs = GridSearchCV(pipe, {"knn__n_neighbors": [1, 3, 5, 7, 9], "knn__weights": ["uniform", "distance"]}, cv=5)
gs.fit(X, y)
print("Tốt nhất:", gs.best_params_, "| accuracy CV:", round(gs.best_score_, 3))
```

## 6. Checklist đánh giá mô hình

1. Chia train/test (hoặc cross-validation) **trước** khi làm bất cứ gì với test.
2. So sánh với **mô hình cơ sở** (baseline: đoán trung bình / lớp phổ biến nhất).
3. Chọn chỉ số phù hợp với **bài toán kinh doanh**.
4. Kiểm tra overfitting: so sánh điểm train và test.
5. Giải thích mô hình: hệ số hồi quy, độ quan trọng đặc trưng.
