@title: Đánh giá và tinh chỉnh mô hình
@chapter: 7
@summary: Chia train/test, kiểm định chéo, quá khớp – dưới khớp, hồi quy Ridge, GridSearchCV, chỉ số phân loại và tránh rò rỉ dữ liệu.

Bản tiếng Anh của đề cương gọi chương này là **Model Evaluation** (khoá IBM: *Model Evaluation and Refinement*). Câu hỏi trung tâm: **mô hình có dự đoán tốt trên dữ liệu nó chưa từng thấy không?** – và làm sao điều chỉnh để tốt hơn.

> **Đối chiếu tài liệu FTU:** Lecture 11 – Đánh giá chất lượng và tinh chỉnh mô hình (train/test, `train_test_split`, overfitting/underfitting); outline môn học: confusion matrix, accuracy, precision, recall, Adjusted R², lỗi Type I/II.

@@@ c7-1 | Dữ liệu huấn luyện và dữ liệu kiểm tra
@ftu: Lecture 11 (câu 49–52) – train/test, `train_test_split`
@goal: Giải thích vì sao không đánh giá trên dữ liệu huấn luyện, chia dữ liệu bằng `train_test_split` với `test_size` và `random_state`.
@practice: ml06

Đánh giá mô hình trên chính dữ liệu đã học giống **cho học sinh làm lại đúng đề đã chữa** – điểm cao chưa nói lên gì. Ta giữ lại một phần dữ liệu làm **tập kiểm tra (test)**:

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
y = df["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)
print(X_train.shape, X_test.shape)

lm = LinearRegression().fit(X_train, y_train)       # chỉ học trên train
print("R² train:", round(lm.score(X_train, y_train), 3))
print("R² test :", round(lm.score(X_test, y_test), 3))
```

??
`train_test_split(X, y, test_size=0.3)` trả về các phần theo thứ tự:
- [ ] `X_train, y_train, X_test, y_test`
- [x] `X_train, X_test, y_train, y_test`
- [ ] `X_test, X_train, y_test, y_train`
- [ ] `train, test`
> Thứ tự: hai phần của X trước, rồi hai phần của y. Nhầm thứ tự là lỗi rất hay gặp.

??
`random_state=1` dùng để:
- [ ] Lấy 1% dữ liệu làm test
- [x] Cố định cách chia ngẫu nhiên để chạy lại ra cùng kết quả
- [ ] Chỉ lấy dòng đầu tiên
- [ ] Tăng độ chính xác
> Không cố định thì mỗi lần chạy chia khác nhau → điểm số dao động, khó so sánh.

??
Mô hình có R² train = 0.95 nhưng R² test = 0.40. Điều này cho thấy:
- [ ] Mô hình rất tốt
- [x] Mô hình học thuộc dữ liệu huấn luyện, dự đoán kém trên dữ liệu mới (quá khớp)
- [ ] Dữ liệu test bị lỗi
- [ ] Cần bỏ tập test
> Khoảng cách lớn giữa train và test là dấu hiệu quá khớp (bài 7.3).

@@@ c7-2 | Kiểm định chéo (cross-validation)
@ftu: Lecture 11 – đánh giá trên dữ liệu chưa dùng để huấn luyện; khoá IBM module 5
@goal: Dùng `cross_val_score` để đánh giá ổn định hơn một lần chia, đọc trung bình và độ lệch chuẩn các fold, dùng `cross_val_predict`.
@practice: ml10

Một lần chia train/test có thể "may" hoặc "rủi". **K-fold cross-validation** chia dữ liệu thành k phần; lần lượt mỗi phần làm test một lần, k − 1 phần còn lại làm train.

```python
import pandas as pd
from sklearn.model_selection import cross_val_score, cross_val_predict
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
y = df["price"]
scores = cross_val_score(LinearRegression(), X, y, cv=5)          # mặc định: R² cho hồi quy
print(scores.round(3))
print("R² trung bình:", round(scores.mean(), 3), "±", round(scores.std(), 3))

mse = -cross_val_score(LinearRegression(), X, y, cv=5, scoring="neg_mean_squared_error")
print("MSE trung bình:", round(mse.mean()))
yhat = cross_val_predict(LinearRegression(), X, y, cv=5)          # dự đoán "ngoài mẫu" cho từng dòng
print(yhat[:3].round(0), y.values[:3])
```

??
`cross_val_score(model, X, y, cv=5)` trả về:
- [ ] Một số – điểm tốt nhất
- [x] Mảng 5 điểm, mỗi fold một điểm
- [ ] Mô hình đã huấn luyện
- [ ] Dự đoán cho mỗi dòng
> Thường báo cáo trung bình ± độ lệch chuẩn của mảng này.

??
Vì sao `scoring="neg_mean_squared_error"` lại có dấu âm?
- [ ] Vì MSE luôn âm
- [x] scikit-learn quy ước "điểm càng lớn càng tốt", nên lấy âm của MSE; đổi dấu lại khi đọc
- [ ] Do lỗi phiên bản
- [ ] Để R² dương
> Cùng lý do với `neg_mean_absolute_error`, `neg_root_mean_squared_error`.

??
Với `cv=5`, mỗi dòng dữ liệu được dùng làm **test** bao nhiêu lần?
- [x] Đúng 1 lần
- [ ] 5 lần
- [ ] 4 lần
- [ ] 0 lần
> Mỗi dòng thuộc đúng một fold; nó nằm trong tập train ở 4 lần còn lại.

@@@ c7-3 | Quá khớp, dưới khớp và chọn độ phức tạp
@ftu: Lecture 11 (câu 60) – overfitting; outline – overfit/underfit
@goal: Nhận diện underfitting/overfitting qua điểm train–test, vẽ đường R² theo bậc đa thức và chọn bậc tốt nhất trên tập test.
@practice: ml07

- **Dưới khớp (underfitting):** mô hình quá đơn giản → kém cả train lẫn test.
- **Quá khớp (overfitting):** mô hình quá phức tạp, học cả nhiễu → train rất tốt, test kém.
- Mục tiêu: độ phức tạp cho **điểm test cao nhất**.

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
X, y = df[["horsepower"]], df["price"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.4, random_state=0)
bac_list, r2_tr, r2_te = range(1, 9), [], []
for bac in bac_list:
    m = make_pipeline(StandardScaler(), PolynomialFeatures(bac), LinearRegression()).fit(X_tr, y_tr)
    r2_tr.append(m.score(X_tr, y_tr))
    r2_te.append(m.score(X_te, y_te))

fig, ax = plt.subplots(figsize=(6, 3.5))
ax.plot(bac_list, r2_tr, marker="o", label="train")
ax.plot(bac_list, r2_te, marker="s", label="test")
ax.set_xlabel("Bậc đa thức")
ax.set_ylabel("R²")
ax.legend()
plt.show()
print("Bậc tốt nhất trên test:", bac_list[r2_te.index(max(r2_te))])
```

??
Tăng bậc đa thức từ 1 lên 8, R² **train** thường:
- [x] Tăng (hoặc không giảm)
- [ ] Giảm mạnh
- [ ] Không đổi
- [ ] Bằng 0
> Mô hình phức tạp hơn luôn khớp dữ liệu huấn luyện ít nhất tốt bằng mô hình đơn giản.

??
Nên chọn bậc đa thức dựa vào:
- [ ] R² train cao nhất
- [x] R² test (hoặc cross-validation) cao nhất
- [ ] Bậc lớn nhất có thể
- [ ] Bậc 1 trong mọi trường hợp
> Điểm trên dữ liệu chưa thấy mới phản ánh khả năng dự đoán thật.

??
Mô hình có R² train = 0.30 và R² test = 0.28. Vấn đề có khả năng nhất là:
- [ ] Quá khớp
- [x] Dưới khớp – mô hình quá đơn giản hoặc thiếu biến quan trọng
- [ ] Rò rỉ dữ liệu
- [ ] Không có vấn đề gì
> Cả hai đều thấp và gần nhau → cần mô hình giàu thông tin hơn.

@@@ c7-4 | Hồi quy Ridge: kiềm chế hệ số
@ftu: Khoá IBM module 5 – Ridge regression (Lecture 11 – tinh chỉnh mô hình)
@goal: Hiểu ý tưởng điều chuẩn (regularization), huấn luyện `Ridge(alpha=...)`, quan sát ảnh hưởng của alpha tới hệ số và điểm test.

Khi có nhiều biến (đặc biệt sau `PolynomialFeatures`), hệ số có thể phình to → quá khớp. **Ridge** thêm "hình phạt" α·Σb² vào hàm mất mát:
- α = 0 → giống hồi quy tuyến tính thường
- α lớn → hệ số bị kéo về gần 0 → mô hình đơn giản hơn

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
y = df["price"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
for a in [0.001, 0.1, 1, 10, 100, 1000]:
    m = make_pipeline(StandardScaler(), PolynomialFeatures(2), Ridge(alpha=a)).fit(X_tr, y_tr)
    he_so = m[-1].coef_
    print(f"alpha={a:<7} R² test={m.score(X_te, y_te):.3f}  |hệ số| lớn nhất={np.abs(he_so).max():,.0f}")
```

??
Tăng `alpha` trong Ridge thì các hệ số:
- [ ] Tăng lên
- [x] Bị thu nhỏ về gần 0
- [ ] Không đổi
- [ ] Đổi dấu hết
> Hình phạt lớn hơn → mô hình "dè dặt" hơn → giảm phương sai, tăng độ chệch.

??
Ridge với `alpha = 0` tương đương:
- [x] `LinearRegression`
- [ ] Mô hình luôn dự đoán trung bình
- [ ] `PolynomialFeatures`
- [ ] Không chạy được
> Không có hình phạt thì chỉ còn bình phương tối thiểu thông thường.

??
Vì sao nên chuẩn hoá (StandardScaler) trước Ridge?
- [ ] Ridge chỉ nhận số dương
- [x] Hình phạt áp lên độ lớn hệ số – biến có thang đo khác nhau sẽ bị phạt không công bằng
- [ ] Để R² bằng 1
- [ ] Không cần thiết
> Chuẩn hoá đưa mọi biến về cùng thang đo để α tác động đồng đều.

@@@ c7-5 | Tìm siêu tham số tốt nhất với GridSearchCV
@ftu: Khoá IBM module 5 – GridSearchCV (Lecture 11 – tinh chỉnh mô hình)
@goal: Phân biệt tham số và siêu tham số, dùng `GridSearchCV` thử lưới giá trị với cross-validation, đọc `best_params_`, `best_score_` và dùng `best_estimator_`.
@practice: ml11

- **Tham số**: mô hình tự học (hệ số b).
- **Siêu tham số**: người đặt trước khi học (`alpha`, bậc đa thức, `n_neighbors`, `max_depth`…).

```python
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
y = df["price"]
pipe = Pipeline([("scale", StandardScaler()), ("poly", PolynomialFeatures()), ("ridge", Ridge())])
grid = GridSearchCV(pipe, {"poly__degree": [1, 2, 3], "ridge__alpha": [0.1, 1, 10, 100]}, cv=4)
grid.fit(X, y)
print(grid.best_params_)
print("R² CV tốt nhất:", round(grid.best_score_, 3))
best = grid.best_estimator_                  # đã huấn luyện lại trên toàn bộ dữ liệu
print(best.predict(X.head(2)).round(0))
```

Tên tham số trong Pipeline: **`<tên bước>__<tham số>`** (hai dấu gạch dưới).

??
Lưới `{"poly__degree": [1, 2, 3], "ridge__alpha": [0.1, 1, 10, 100]}` với `cv=4` huấn luyện bao nhiêu lần (chưa tính lần refit cuối)?
- [ ] 7
- [ ] 12
- [x] 48
- [ ] 4
> 3 × 4 = 12 tổ hợp, mỗi tổ hợp 4 fold → 48 lần.

??
`n_neighbors` của KNN là:
- [ ] Tham số mô hình tự học
- [x] Siêu tham số – phải chọn trước, có thể dò bằng GridSearchCV
- [ ] Số dòng dữ liệu
- [ ] Độ chính xác
> Tương tự `max_depth` của cây, `alpha` của Ridge, `C` của logistic.

??
Đặt siêu tham số cho bước `knn` trong Pipeline, khoá đúng là:
- [ ] `"n_neighbors"`
- [ ] `"knn.n_neighbors"`
- [x] `"knn__n_neighbors"`
- [ ] `"knn_n_neighbors"`
> Hai dấu gạch dưới nối tên bước và tên tham số.

@@@ c7-6 | Đánh giá mô hình phân loại
@ftu: Outline Chương 4 & 6 – confusion matrix, accuracy, precision, recall, lỗi Type I/II
@goal: Đọc ma trận nhầm lẫn, tính accuracy, precision, recall, F1 và chọn chỉ số phù hợp khi dữ liệu mất cân bằng.
@practice: ml04, ml13, tt402

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, classification_report

df = pd.read_csv("students.csv").dropna()
X = df[["study_hours", "attendance", "midterm"]]
y = (df["final"] >= 7).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.4, random_state=0, stratify=y)
m = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
pred = m.predict(X_te)
print(confusion_matrix(y_te, pred))
print("accuracy", round(accuracy_score(y_te, pred), 3), "precision", round(precision_score(y_te, pred), 3),
      "recall", round(recall_score(y_te, pred), 3), "F1", round(f1_score(y_te, pred), 3))
print(classification_report(y_te, pred, zero_division=0))
```

Ma trận nhầm lẫn của scikit-learn (lớp 0 ở trên/trái):

| | dự đoán 0 | dự đoán 1 |
|---|---|---|
| **thật 0** | TN | FP |
| **thật 1** | FN | TP |

- **Precision** = TP / (TP + FP): trong những ca *báo là 1*, bao nhiêu đúng?
- **Recall** = TP / (TP + FN): trong những ca *thật là 1*, bắt được bao nhiêu?
- **F1** = trung bình điều hoà của precision và recall.

??
TP = 30, FP = 10, FN = 20, TN = 40. Precision bằng:
- [x] 0.75
- [ ] 0.60
- [ ] 0.70
- [ ] 0.67
> 30 / (30 + 10) = 0.75. Recall = 30 / (30 + 20) = 0.60; accuracy = 70 / 100 = 0.70.

??
1000 giao dịch có 10 giao dịch gian lận. Mô hình luôn đoán "không gian lận" đạt accuracy:
- [ ] 1%
- [ ] 50%
- [x] 99% – nhưng recall lớp gian lận bằng 0
- [ ] 0%
> Với dữ liệu mất cân bằng, accuracy đánh lừa; hãy xem recall/precision/F1 của lớp hiếm.

??
Sàng lọc bệnh nguy hiểm – bỏ sót người bệnh rất tốn kém. Ưu tiên chỉ số:
- [ ] Precision
- [x] Recall
- [ ] Accuracy
- [ ] R²
> Recall cao = ít bỏ sót (FN thấp), chấp nhận một số báo động nhầm.

@@@ c7-7 | Quy trình đánh giá đúng: tránh rò rỉ dữ liệu
@ftu: Đáp án 20 câu thực hành FTU – so sánh hồi quy với dự đoán trung bình (baseline)
@goal: Nhận ra rò rỉ dữ liệu (data leakage), luôn fit bộ tiền xử lý chỉ trên tập train (qua Pipeline), và viết một quy trình đánh giá hoàn chỉnh.

**Rò rỉ dữ liệu**: thông tin từ tập test "lọt" vào quá trình huấn luyện → điểm đẹp giả tạo. Ví dụ hay gặp:
- Chuẩn hoá (`fit_transform`) trên **toàn bộ** dữ liệu rồi mới chia train/test.
- Điền ô thiếu bằng trung bình của **toàn bộ** dữ liệu.
- Dùng biến "nhìn trước tương lai" (ví dụ `final` để dự đoán đỗ/trượt cuối kỳ).

```python
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

df = pd.read_csv("students.csv").dropna(subset=["final"])
X = df[["study_hours", "attendance", "midterm"]]        # midterm có ô thiếu
y = (df["final"] >= 7).astype(int)

model = make_pipeline(SimpleImputer(strategy="mean"), StandardScaler(), KNeighborsClassifier(5))
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
model.fit(X_tr, y_tr)                  # imputer + scaler chỉ học từ train
print("accuracy test:", round(model.score(X_te, y_te), 3))
print("CV 5-fold:", cross_val_score(model, X, y, cv=5).round(2))
```

Đặt mọi bước tiền xử lý trong **Pipeline**: khi `fit` trên train hoặc trong từng fold của CV, các bước đó chỉ "nhìn thấy" dữ liệu train.

??
Đoạn nào gây **rò rỉ dữ liệu**?
- [ ] Chia train/test rồi `scaler.fit(X_train)`
- [x] `X = StandardScaler().fit_transform(X)` rồi mới `train_test_split`
- [ ] Đặt scaler trong Pipeline rồi `cross_val_score`
- [ ] `train_test_split(..., random_state=0)`
> Scaler đã dùng trung bình/độ lệch chuẩn tính cả trên dữ liệu test.

??
Dự đoán sinh viên đỗ/trượt cuối kỳ, đưa cột `final` (điểm thi cuối kỳ) vào X:
- [ ] Hợp lý vì tương quan rất cao
- [x] Sai – đó là thông tin chỉ có **sau** khi biết kết quả, mô hình vô dụng khi dùng thật
- [ ] Bắt buộc
- [ ] Chỉ sai với KNN
> Biến đầu vào phải có sẵn tại thời điểm cần dự đoán.

??
`stratify=y` trong `train_test_split` để:
- [ ] Sắp xếp y tăng dần
- [x] Giữ tỉ lệ các lớp trong train và test giống tỉ lệ ở toàn bộ dữ liệu
- [ ] Bỏ lớp hiếm
- [ ] Chia đều số dòng
> Quan trọng khi dữ liệu nhỏ hoặc mất cân bằng – tránh tập test thiếu hẳn một lớp.
