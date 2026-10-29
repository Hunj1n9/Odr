Bài tập nhỏ đi kèm các bài học Chương 7 – Đánh giá và tinh chỉnh mô hình.

===== u7-01
@title: R² trên tập huấn luyện và tập kiểm tra
@level: easy
@topic: eval
@unit: c7-1
@fn: r2_train_test
::: statement
Viết hàm `r2_train_test(cac_cot, test_size)`: với `cars.csv` (bỏ mọi dòng thiếu), chia dữ liệu bằng `train_test_split(X, y, test_size=test_size, random_state=1)`, huấn luyện `LinearRegression` dự đoán `price` từ `cac_cot` **chỉ trên tập train**, trả về tuple `(R² train, R² test)` làm tròn 3.
::: starter
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


def r2_train_test(cac_cot, test_size):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X, y = df[cac_cot], df["price"]
    lm = LinearRegression().fit(X, y)
    return round(lm.score(X, y), 3), round(lm.score(X, y), 3)
::: solution
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


def r2_train_test(cac_cot, test_size):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X, y = df[cac_cot], df["price"]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=test_size, random_state=1)
    lm = LinearRegression().fit(X_tr, y_tr)
    return round(float(lm.score(X_tr, y_tr)), 3), round(float(lm.score(X_te, y_te)), 3)
::: tests
["horsepower"], 0.3
["horsepower", "curb_weight", "engine_size", "highway_mpg"], 0.3
::: hidden
["highway_mpg"], 0.2
["engine_size", "city_mpg"], 0.5
::: hints
- Thứ tự trả về: `X_train, X_test, y_train, y_test`.
- `fit` trên train, `score` trên cả hai.
::: explain
Code mẫu đánh giá trên chính dữ liệu đã học – hai con số giống nhau và không nói được gì về khả năng dự đoán.

===== u7-02
@title: Kích thước các tập sau khi chia
@level: easy
@topic: eval
@unit: c7-1
@fn: kich_thuoc_tap
::: statement
Viết hàm `kich_thuoc_tap(n, test_size)` tạo dữ liệu giả `X = [[i] for i in range(n)]`, `y = list(range(n))`, chia bằng `train_test_split(..., test_size=test_size, random_state=0)` và trả về tuple `(số dòng train, số dòng test)`.

- `kich_thuoc_tap(10, 0.3)` → `(7, 3)`
::: starter
from sklearn.model_selection import train_test_split


def kich_thuoc_tap(n, test_size):
    return n, 0
::: solution
from sklearn.model_selection import train_test_split


def kich_thuoc_tap(n, test_size):
    X = [[i] for i in range(n)]
    y = list(range(n))
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=test_size, random_state=0)
    return len(X_tr), len(X_te)
::: tests
10, 0.3 ==> (7, 3)
100, 0.25 ==> (75, 25)
::: hidden
7, 0.3 ==> (4, 3)
80, 0.2 ==> (64, 16)
5, 0.5 ==> (2, 3)
::: hints
- `len(X_train)`, `len(X_test)`.
::: explain
Số dòng test = **làm tròn lên** n × test_size (7 × 0.3 = 2.1 → 3).

===== u7-03
@title: Điểm kiểm định chéo
@level: easy
@topic: eval
@unit: c7-2
@fn: cv_r2
::: statement
Viết hàm `cv_r2(cac_cot, k)`: với `cars.csv` (bỏ mọi dòng thiếu), tính `cross_val_score(LinearRegression(), X, y, cv=k)` (R²) để dự đoán `price` từ `cac_cot`. Trả về tuple `(trung bình, độ lệch chuẩn)` của các điểm, làm tròn 3.
::: starter
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression


def cv_r2(cac_cot, k):
    return 0, 0
::: solution
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression


def cv_r2(cac_cot, k):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    s = cross_val_score(LinearRegression(), df[cac_cot], df["price"], cv=k)
    return round(float(s.mean()), 3), round(float(s.std()), 3)
::: tests
["horsepower"], 5
["horsepower", "curb_weight", "engine_size", "highway_mpg"], 4
::: hidden
["highway_mpg"], 3
["engine_size"], 10
::: hints
- `s = cross_val_score(LinearRegression(), X, y, cv=k)`; `s.mean()`, `s.std()`.
::: explain
Độ lệch chuẩn lớn → điểm phụ thuộc nhiều vào cách chia, nên thận trọng khi kết luận.

===== u7-04
@title: MSE kiểm định chéo
@level: easy
@topic: eval
@unit: c7-2
@fn: cv_mse
::: statement
Viết hàm `cv_mse(cot, k)` trả về **MSE trung bình (số dương)** của hồi quy tuyến tính `price ~ cot` trên `cars.csv` (bỏ mọi dòng thiếu) với `k`-fold, làm tròn tới hàng đơn vị (`int`). Dùng `scoring="neg_mean_squared_error"`.
::: starter
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression


def cv_mse(cot, k):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    s = cross_val_score(LinearRegression(), df[[cot]], df["price"], cv=k, scoring="neg_mean_squared_error")
    return int(round(s.mean()))
::: solution
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression


def cv_mse(cot, k):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    s = cross_val_score(LinearRegression(), df[[cot]], df["price"], cv=k, scoring="neg_mean_squared_error")
    return int(round(-s.mean()))
::: tests
"horsepower", 5
"highway_mpg", 4
::: hidden
"engine_size", 3
"curb_weight", 5
::: hints
- Điểm trả về là **âm** của MSE → đổi dấu.
::: explain
Quên đổi dấu sẽ ra MSE âm – vô nghĩa.

===== u7-05
@title: Chọn bậc đa thức tốt nhất
@level: medium
@topic: eval
@unit: c7-3
@fn: bac_tot_nhat
::: statement
Viết hàm `bac_tot_nhat(bac_max)`: với `cars.csv` (bỏ mọi dòng thiếu), X = `[["horsepower"]]`, y = `price`, chia `train_test_split(X, y, test_size=0.4, random_state=0)`. Với mỗi bậc từ 1 đến `bac_max`, huấn luyện `make_pipeline(StandardScaler(), PolynomialFeatures(bac), LinearRegression())` trên train và tính R² test. Trả về tuple `(bậc có R² test cao nhất, R² đó làm tròn 3)`. Hoà thì chọn bậc nhỏ hơn.
::: starter
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression


def bac_tot_nhat(bac_max):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X, y = df[["horsepower"]], df["price"]
    best = None
    for bac in range(1, bac_max + 1):
        m = make_pipeline(StandardScaler(), PolynomialFeatures(bac), LinearRegression()).fit(X, y)
        r2 = m.score(X, y)
        if best is None or r2 > best[1]:
            best = (bac, round(r2, 3))
    return best
::: solution
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression


def bac_tot_nhat(bac_max):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X, y = df[["horsepower"]], df["price"]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.4, random_state=0)
    best = None
    for bac in range(1, bac_max + 1):
        m = make_pipeline(StandardScaler(), PolynomialFeatures(bac), LinearRegression()).fit(X_tr, y_tr)
        r2 = m.score(X_te, y_te)
        if best is None or r2 > best[1]:
            best = (bac, r2)
    return best[0], round(float(best[1]), 3)
::: tests
5
8
::: hidden
1
3
::: hints
- So sánh bằng R² **test**, chỉ `fit` trên train.
- Dùng `>` (không phải `>=`) để giữ bậc nhỏ hơn khi hoà.
::: explain
Chọn theo R² train sẽ luôn ra bậc lớn nhất – đó chính là quá khớp.

===== u7-06
@title: Ảnh hưởng của alpha trong Ridge
@level: medium
@topic: eval
@unit: c7-4
@fn: ridge_alpha
::: statement
Viết hàm `ridge_alpha(alpha)`: với `cars.csv` (bỏ mọi dòng thiếu), X = 4 cột `horsepower, curb_weight, engine_size, highway_mpg`, y = `price`, chia `test_size=0.3, random_state=1`. Huấn luyện `make_pipeline(StandardScaler(), PolynomialFeatures(2), Ridge(alpha=alpha))` trên train. Trả về tuple `(R² test làm tròn 3, trị tuyệt đối lớn nhất của các hệ số Ridge làm tròn 0 – kiểu int)`.
::: starter
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge


def ridge_alpha(alpha):
    return 0, 0
::: solution
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge


def ridge_alpha(alpha):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
    y = df["price"]
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=1)
    m = make_pipeline(StandardScaler(), PolynomialFeatures(2), Ridge(alpha=alpha)).fit(X_tr, y_tr)
    return round(float(m.score(X_te, y_te)), 3), int(round(np.abs(m[-1].coef_).max()))
::: tests
0.1
10
::: hidden
1
100
1000
::: hints
- Bước cuối của pipeline: `m[-1]` → `m[-1].coef_`.
::: explain
So sánh kết quả các alpha: hệ số nhỏ dần khi alpha tăng; R² test thường tăng rồi giảm – alpha vừa phải là tốt nhất.

===== u7-07
@title: GridSearchCV cho Ridge
@level: medium
@topic: eval
@unit: c7-5
@fn: tim_alpha
::: statement
Viết hàm `tim_alpha(ds_alpha)`: với `cars.csv` (bỏ mọi dòng thiếu), X = 4 cột như bài trước, y = `price`. Tạo `Pipeline([("scale", StandardScaler()), ("ridge", Ridge())])`, chạy `GridSearchCV` với lưới `{"ridge__alpha": ds_alpha}` và `cv=4`. Trả về tuple `(alpha tốt nhất, best_score_ làm tròn 3)`.
::: starter
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge


def tim_alpha(ds_alpha):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
    y = df["price"]
    pipe = Pipeline([("scale", StandardScaler()), ("ridge", Ridge())])
    grid = GridSearchCV(pipe, {"alpha": ds_alpha}, cv=4)
    grid.fit(X, y)
    return grid.best_params_["alpha"], round(grid.best_score_, 3)
::: solution
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge


def tim_alpha(ds_alpha):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X = df[["horsepower", "curb_weight", "engine_size", "highway_mpg"]]
    y = df["price"]
    pipe = Pipeline([("scale", StandardScaler()), ("ridge", Ridge())])
    grid = GridSearchCV(pipe, {"ridge__alpha": ds_alpha}, cv=4)
    grid.fit(X, y)
    return grid.best_params_["ridge__alpha"], round(float(grid.best_score_), 3)
::: tests
[0.01, 1, 10, 100]
[1000, 10000]
::: hidden
[0.1, 0.5, 2, 5, 20]
::: hints
- Khoá lưới phải là `"ridge__alpha"` (tên bước + hai gạch dưới + tên tham số).
::: explain
Code mẫu dùng khoá `"alpha"` nên GridSearchCV báo lỗi "Invalid parameter".

===== u7-08
@title: Số láng giềng tốt nhất cho KNN
@level: medium
@topic: eval
@unit: c7-5
@fn: k_tot_nhat
::: statement
Viết hàm `k_tot_nhat(ds_k)`: từ `students.csv` (bỏ mọi dòng thiếu), X = `study_hours, attendance, midterm`, y = `final >= 7` (0/1). Dò `n_neighbors` trong `ds_k` bằng `GridSearchCV(make_pipeline(StandardScaler(), KNeighborsClassifier()), {"kneighborsclassifier__n_neighbors": ds_k}, cv=4)`. Trả về tuple `(k tốt nhất, best_score_ làm tròn 3)`.
::: starter
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier


def k_tot_nhat(ds_k):
    return ds_k[0], 0.0
::: solution
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier


def k_tot_nhat(ds_k):
    df = pd.read_csv("students.csv").dropna()
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    pipe = make_pipeline(StandardScaler(), KNeighborsClassifier())
    grid = GridSearchCV(pipe, {"kneighborsclassifier__n_neighbors": ds_k}, cv=4)
    grid.fit(X, y)
    return grid.best_params_["kneighborsclassifier__n_neighbors"], round(float(grid.best_score_), 3)
::: tests
[1, 3, 5, 7]
::: hidden
[3, 9, 15]
[2, 4, 6]
::: hints
- `make_pipeline` tự đặt tên bước bằng tên lớp viết thường: `kneighborsclassifier`.
::: explain
Không chuẩn hoá thì `attendance` và `study_hours` có thang đo khác `midterm` → khoảng cách KNN bị lệch.

===== u7-09
@title: Tự tính precision, recall, F1
@level: easy
@topic: eval
@unit: c7-6
@fn: chi_so_phan_loai
::: statement
Viết hàm `chi_so_phan_loai(y_that, y_du_doan)` (lớp dương là 1) trả về tuple `(accuracy, precision, recall, f1)` làm tròn 3 **không dùng sklearn** – tự đếm TP, FP, FN, TN. Nếu mẫu số bằng 0 thì chỉ số đó bằng 0.
::: starter
def chi_so_phan_loai(y_that, y_du_doan):
    dung = sum(1 for a, b in zip(y_that, y_du_doan) if a == b)
    acc = dung / len(y_that)
    return round(acc, 3), round(acc, 3), round(acc, 3), round(acc, 3)
::: solution
def chi_so_phan_loai(y_that, y_du_doan):
    tp = sum(1 for a, b in zip(y_that, y_du_doan) if a == 1 and b == 1)
    fp = sum(1 for a, b in zip(y_that, y_du_doan) if a == 0 and b == 1)
    fn = sum(1 for a, b in zip(y_that, y_du_doan) if a == 1 and b == 0)
    tn = sum(1 for a, b in zip(y_that, y_du_doan) if a == 0 and b == 0)
    acc = (tp + tn) / len(y_that)
    p = tp / (tp + fp) if tp + fp else 0
    r = tp / (tp + fn) if tp + fn else 0
    f1 = 2 * p * r / (p + r) if p + r else 0
    return round(acc, 3), round(p, 3), round(r, 3), round(f1, 3)
::: tests
[1, 0, 1, 1, 0], [1, 0, 0, 1, 1] ==> (0.6, 0.667, 0.667, 0.667)
[0, 0, 0], [0, 0, 0] ==> (1.0, 0, 0, 0)
::: hidden
[1, 1, 1, 1], [1, 1, 0, 0] ==> (0.5, 1.0, 0.5, 0.667)
[0, 1, 0, 1, 0, 0], [1, 1, 1, 1, 0, 0] ==> (0.667, 0.5, 1.0, 0.667)
::: hints
- Đếm 4 loại bằng `zip(y_that, y_du_doan)`.
- F1 = 2·P·R / (P + R).
::: explain
Test 2: không có lớp dương nào → precision/recall không xác định; đề quy ước bằng 0 (sklearn cũng làm vậy với `zero_division=0`).

===== u7-10
@title: Ma trận nhầm lẫn trên tập kiểm tra
@level: medium
@topic: eval
@unit: c7-6
@fn: ma_tran_test
::: statement
Viết hàm `ma_tran_test(ten)`: từ `students.csv` (bỏ mọi dòng thiếu), X = `study_hours, attendance, midterm`, y = `final >= 7`, chia `train_test_split(X, y, test_size=0.4, random_state=0, stratify=y)`. Huấn luyện mô hình `ten` (`"logistic"` = `LogisticRegression(max_iter=1000)`, `"tree"` = `DecisionTreeClassifier(max_depth=3, random_state=0)`) trên train; trả về **ma trận nhầm lẫn** trên test dạng list lồng `[[TN, FP], [FN, TP]]`.
::: starter
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix


def ma_tran_test(ten):
    return [[0, 0], [0, 0]]
::: solution
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix


def ma_tran_test(ten):
    df = pd.read_csv("students.csv").dropna()
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.4, random_state=0, stratify=y)
    m = LogisticRegression(max_iter=1000) if ten == "logistic" else DecisionTreeClassifier(max_depth=3, random_state=0)
    m.fit(X_tr, y_tr)
    return confusion_matrix(y_te, m.predict(X_te)).tolist()
::: tests
"logistic"
::: hidden
"tree"
::: hints
- `confusion_matrix(y_that, y_du_doan).tolist()`.
::: explain
Tổng các ô = số dòng của tập test. Đọc theo dòng: dòng là nhãn thật, cột là nhãn dự đoán.

===== u7-11
@title: Chuẩn hoá đúng cách (không rò rỉ)
@level: medium
@topic: eval
@unit: c7-7
@fn: chuan_hoa_dung
::: statement
Viết hàm `chuan_hoa_dung(X_train, X_test)` (list các list số) chuẩn hoá z-score: **chỉ** tính trung bình và độ lệch chuẩn từ `X_train` (dùng `StandardScaler`), rồi áp dụng cho cả hai tập. Trả về `X_test` đã chuẩn hoá dạng list lồng, làm tròn 3.

- `chuan_hoa_dung([[1], [3]], [[2], [5]])` → `[[0.0], [3.0]]`
::: starter
import numpy as np
from sklearn.preprocessing import StandardScaler


def chuan_hoa_dung(X_train, X_test):
    sc = StandardScaler()
    return np.round(sc.fit_transform(X_test), 3).tolist()
::: solution
import numpy as np
from sklearn.preprocessing import StandardScaler


def chuan_hoa_dung(X_train, X_test):
    sc = StandardScaler().fit(X_train)
    return np.round(sc.transform(X_test), 3).tolist()
::: tests
[[1], [3]], [[2], [5]] ==> [[0.0], [3.0]]
[[0, 10], [2, 30]], [[1, 20], [4, 0]] ==> [[0.0, 0.0], [3.0, -2.0]]
::: hidden
[[5], [5], [8], [10]], [[7]] ==> [[0.0]]
[[1], [2], [3]], [[1], [3], [9]] ==> [[-1.225], [1.225], [8.573]]
::: hints
- `fit` trên train, `transform` trên test – **không** `fit_transform` trên test.
::: explain
Code mẫu tính thông số từ chính tập test (rò rỉ dữ liệu). `StandardScaler` dùng độ lệch chuẩn tổng thể (chia n).

===== u7-12
@title: Pipeline có điền ô thiếu
@level: medium
@topic: eval
@unit: c7-7
@fn: pipeline_day_du
::: statement
Viết hàm `pipeline_day_du(k)`: từ `students.csv` (chỉ bỏ dòng thiếu `final`), X = `study_hours, attendance, midterm` (**midterm còn ô thiếu**), y = `final >= 7`. Tạo `make_pipeline(SimpleImputer(strategy="mean"), StandardScaler(), KNeighborsClassifier(k))`, chia `test_size=0.3, random_state=0, stratify=y`, huấn luyện trên train và trả về accuracy trên test làm tròn 3.
::: starter
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier


def pipeline_day_du(k):
    df = pd.read_csv("students.csv").dropna(subset=["final"])
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    model = make_pipeline(StandardScaler(), KNeighborsClassifier(k))
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
    model.fit(X_tr, y_tr)
    return round(model.score(X_te, y_te), 3)
::: solution
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier


def pipeline_day_du(k):
    df = pd.read_csv("students.csv").dropna(subset=["final"])
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    model = make_pipeline(SimpleImputer(strategy="mean"), StandardScaler(), KNeighborsClassifier(k))
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
    model.fit(X_tr, y_tr)
    return round(float(model.score(X_te, y_te)), 3)
::: tests
5
3
::: hidden
1
7
::: hints
- Thêm `SimpleImputer(strategy="mean")` làm bước **đầu tiên** của pipeline.
::: explain
KNN không nhận NaN; code mẫu báo lỗi "Input X contains NaN". Imputer trong pipeline tính trung bình **chỉ từ train** – không rò rỉ.

===== u7-13
@title: Hồi quy có tốt hơn đoán trung bình không?
@level: medium
@topic: eval
@source: Dạng bài thực hành FTU (Lecture 11)
@unit: c7-7
@fn: so_voi_baseline
::: statement
Một mô hình chỉ có giá trị nếu tốt hơn cách "luôn đoán bằng trung bình". Viết hàm `so_voi_baseline(cac_cot)`: với `cars.csv` (bỏ mọi dòng thiếu), chia `train_test_split(X, y, test_size=0.3, random_state=42)`, huấn luyện `LinearRegression` dự đoán `price` từ `cac_cot`. Baseline dự đoán mọi xe bằng **trung bình `y_train`**. Trả về tuple `(MSE mô hình, MSE baseline, "Hồi quy" hoặc "Baseline")` – MSE làm tròn tới hàng đơn vị (int).
::: starter
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error


def so_voi_baseline(cac_cot):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X_tr, X_te, y_tr, y_te = train_test_split(df[cac_cot], df["price"], test_size=0.3, random_state=42)
    m = LinearRegression().fit(X_tr, y_tr)
    base = [y_te.mean()] * len(y_te)
    a = mean_squared_error(y_te, m.predict(X_te))
    b = mean_squared_error(y_te, base)
    return int(round(a)), int(round(b)), "Hồi quy" if a < b else "Baseline"
::: solution
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error


def so_voi_baseline(cac_cot):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X_tr, X_te, y_tr, y_te = train_test_split(df[cac_cot], df["price"], test_size=0.3, random_state=42)
    m = LinearRegression().fit(X_tr, y_tr)
    base = [y_tr.mean()] * len(y_te)
    a = mean_squared_error(y_te, m.predict(X_te))
    b = mean_squared_error(y_te, base)
    return int(round(a)), int(round(b)), "Hồi quy" if a < b else "Baseline"
::: tests
["horsepower", "curb_weight"]
["city_mpg"]
::: hidden
["engine_size", "highway_mpg", "horsepower"]
::: hints
- Baseline phải dùng trung bình của **tập huấn luyện** – dùng trung bình tập test là "nhìn trộm" đáp án.
::: explain
Code mẫu tính baseline bằng `y_te.mean()` – rò rỉ dữ liệu khiến baseline tốt một cách giả tạo.
