Bài tập nhỏ đi kèm các bài học Chương 6 – Phát triển mô hình.

===== u6-01
@title: Chuẩn bị X và y
@level: easy
@topic: ml
@unit: c6-1
@fn: tach_X_y
::: statement
Viết hàm `tach_X_y(cac_cot, muc_tieu)`: đọc `cars.csv` (coi `?` là thiếu), **bỏ các dòng thiếu** ở những cột dùng tới (`cac_cot` và `muc_tieu`), tạo `X` là DataFrame các cột `cac_cot` và `y` là Series `muc_tieu`. Trả về tuple `(X.shape, y.shape)`.

- `tach_X_y(["horsepower"], "price")` → `((70, 1), (70,))`
::: starter
import pandas as pd


def tach_X_y(cac_cot, muc_tieu):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X = df[cac_cot]
    y = df[[muc_tieu]]
    return X.shape, y.shape
::: solution
import pandas as pd


def tach_X_y(cac_cot, muc_tieu):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=cac_cot + [muc_tieu])
    X = df[cac_cot]
    y = df[muc_tieu]
    return X.shape, y.shape
::: tests
["horsepower"], "price" ==> ((70, 1), (70,))
["engine_size", "curb_weight"], "price"
::: hidden
["engine_size"], "city_mpg" ==> ((80, 1), (80,))
["horsepower", "engine_size"], "highway_mpg"
::: hints
- `dropna(subset=cac_cot + [muc_tieu])` – chỉ bỏ dòng thiếu ở cột cần dùng.
- y là Series: `df[muc_tieu]` (một cặp ngoặc).
::: explain
`dropna()` không tham số bỏ dòng thiếu ở **bất kỳ** cột nào – có thể mất dữ liệu không cần thiết.

===== u6-02
@title: Hồi quy tuyến tính đơn
@level: easy
@topic: ml
@unit: c6-2
@fn: hoi_quy_don
::: statement
Viết hàm `hoi_quy_don(cot_x)`: với `cars.csv` (coi `?` là thiếu, bỏ dòng thiếu ở `cot_x` hoặc `price`), huấn luyện `LinearRegression` dự đoán `price` từ một biến `cot_x`. Trả về tuple `(b0, b1)` = (hệ số chặn, hệ số góc), làm tròn 2 chữ số.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def hoi_quy_don(cot_x):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=[cot_x, "price"])
    lm = LinearRegression()
    return 0, 0
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def hoi_quy_don(cot_x):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=[cot_x, "price"])
    lm = LinearRegression().fit(df[[cot_x]], df["price"])
    return round(float(lm.intercept_), 2), round(float(lm.coef_[0]), 2)
::: tests
"horsepower"
"highway_mpg"
::: hidden
"engine_size"
"curb_weight"
::: hints
- `lm.fit(df[[cot_x]], df["price"])` – X hai ngoặc.
- `lm.intercept_`, `lm.coef_[0]`.
::: explain
`float(...)` đổi kiểu số NumPy thành số Python cho gọn khi in.

===== u6-03
@title: Dự đoán giá theo công suất
@level: easy
@topic: ml
@unit: c6-2
@fn: du_doan_gia
::: statement
Viết hàm `du_doan_gia(ds_hp)`: huấn luyện hồi quy tuyến tính `price ~ horsepower` trên `cars.csv` (bỏ dòng thiếu ở hai cột này), rồi trả về list giá dự đoán (làm tròn tới hàng đơn vị, kiểu `int`) cho từng giá trị công suất trong `ds_hp`.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def du_doan_gia(ds_hp):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["horsepower", "price"])
    lm = LinearRegression().fit(df[["horsepower"]], df["price"])
    return lm.predict(ds_hp)
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def du_doan_gia(ds_hp):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["horsepower", "price"])
    lm = LinearRegression().fit(df[["horsepower"]], df["price"])
    moi = pd.DataFrame({"horsepower": ds_hp})
    return [int(round(v)) for v in lm.predict(moi)]
::: tests
[100, 150]
[120]
::: hidden
[59]
[60, 90, 120, 180]
::: hints
- Dữ liệu mới cũng phải là bảng 2 chiều có **đúng tên cột**: `pd.DataFrame({"horsepower": ds_hp})`.
::: explain
Truyền list 1 chiều vào `predict` gây lỗi "Expected 2D array". Dùng DataFrame có đúng tên cột như lúc `fit` để tránh cả cảnh báo "feature names".

===== u6-04
@title: Hệ số hồi quy bội
@level: easy
@topic: ml
@unit: c6-3
@fn: he_so_hoi_quy_boi
::: statement
Viết hàm `he_so_hoi_quy_boi(cac_cot)`: với `cars.csv` (coi `?` là thiếu, bỏ dòng thiếu ở các cột dùng tới), hồi quy `price` theo các cột trong `cac_cot`. Trả về dict `{tên cột: hệ số làm tròn 2}` theo đúng thứ tự `cac_cot`.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def he_so_hoi_quy_boi(cac_cot):
    return {}
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def he_so_hoi_quy_boi(cac_cot):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=cac_cot + ["price"])
    lm = LinearRegression().fit(df[cac_cot], df["price"])
    return {c: round(float(b), 2) for c, b in zip(cac_cot, lm.coef_)}
::: tests
["horsepower", "curb_weight"]
["engine_size", "highway_mpg"]
::: hidden
["horsepower", "curb_weight", "engine_size", "highway_mpg"]
["city_mpg"]
::: hints
- `zip(cac_cot, lm.coef_)` ghép tên cột với hệ số.
::: explain
Hệ số trong hồi quy bội khác hệ số hồi quy đơn của cùng biến – vì giờ mỗi hệ số được hiểu "khi các biến khác giữ nguyên".

===== u6-05
@title: Hồi quy với biến giả
@level: medium
@topic: ml
@unit: c6-3
@fn: chenh_lech_dan_dong
::: statement
Viết hàm `chenh_lech_dan_dong()`: với `cars.csv` (bỏ dòng thiếu `horsepower` hoặc `price`), hồi quy `price` theo `horsepower` **và** biến giả của `drive_wheels` (dùng `pd.get_dummies(..., drop_first=True, dtype=int)` – nhóm gốc là `4wd`). Trả về dict `{tên cột biến giả: hệ số làm tròn 0 (int)}`.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def chenh_lech_dan_dong():
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["horsepower", "price"])
    X = df[["horsepower"]]
    lm = LinearRegression().fit(X, df["price"])
    return {}
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def chenh_lech_dan_dong():
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["horsepower", "price"])
    X = pd.get_dummies(df[["horsepower", "drive_wheels"]], columns=["drive_wheels"], drop_first=True, dtype=int)
    lm = LinearRegression().fit(X, df["price"])
    coef = pd.Series(lm.coef_, index=X.columns)
    return {c: int(round(coef[c])) for c in X.columns if c.startswith("drive_wheels_")}
::: tests
-
::: hints
- `pd.get_dummies(df[["horsepower", "drive_wheels"]], columns=["drive_wheels"], drop_first=True, dtype=int)`.
- Lấy hệ số theo tên cột bằng `pd.Series(lm.coef_, index=X.columns)`.
::: explain
Các cột thu được là `drive_wheels_fwd` và `drive_wheels_rwd`; hệ số là chênh lệch giá so với xe 4wd cùng công suất.

===== u6-06
@title: Phần dư của mô hình
@level: easy
@topic: ml
@unit: c6-4
@fn: phan_du
::: statement
Viết hàm `phan_du(x, y)` (hai list số) huấn luyện hồi quy tuyến tính y theo x và trả về list **phần dư** `y − ŷ`, làm tròn 2 chữ số.

- `phan_du([1, 2, 3], [2, 4, 6])` → `[0.0, 0.0, 0.0]`
::: starter
import numpy as np
from sklearn.linear_model import LinearRegression


def phan_du(x, y):
    X = np.array(x).reshape(-1, 1)
    lm = LinearRegression().fit(X, y)
    return (lm.predict(X) - np.array(y)).round(2).tolist()
::: solution
import numpy as np
from sklearn.linear_model import LinearRegression


def phan_du(x, y):
    X = np.array(x, dtype=float).reshape(-1, 1)
    lm = LinearRegression().fit(X, y)
    return (np.array(y) - lm.predict(X)).round(2).tolist()
::: tests
[1, 2, 3], [2, 4, 6] ==> [0.0, 0.0, 0.0]
[1, 2, 3, 4], [1, 3, 2, 4] ==> [-0.3, 0.9, -0.9, 0.3]
::: hidden
[0, 1, 2, 3, 4], [1, 2, 5, 10, 17] ==> [2.0, -1.0, -2.0, -1.0, 2.0]
[10, 20, 30], [5, 5, 8] ==> [0.5, -1.0, 0.5]
::: hints
- Phần dư = **thật − dự đoán**, không phải ngược lại.
- `np.array(x).reshape(-1, 1)` biến list thành ma trận một cột.
::: explain
Test thứ ba (y = x² + 1): phần dư có dạng **chữ U** (dương – âm – dương) → dấu hiệu quan hệ cong, nên dùng hồi quy đa thức.

===== u6-07
@title: Bốn chỉ số đánh giá hồi quy
@level: easy
@topic: eval
@unit: c6-5
@fn: chi_so_hoi_quy
::: statement
Viết hàm `chi_so_hoi_quy(y_that, y_du_doan)` trả về tuple `(MAE, MSE, RMSE, R2)` – mỗi giá trị làm tròn 3 chữ số – dùng `sklearn.metrics`.
::: starter
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def chi_so_hoi_quy(y_that, y_du_doan):
    return 0, 0, 0, 0
::: solution
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def chi_so_hoi_quy(y_that, y_du_doan):
    mse = mean_squared_error(y_that, y_du_doan)
    return (round(float(mean_absolute_error(y_that, y_du_doan)), 3), round(float(mse), 3),
            round(float(np.sqrt(mse)), 3), round(float(r2_score(y_that, y_du_doan)), 3))
::: tests
[3, 5, 7], [2.5, 5, 8] ==> (0.5, 0.417, 0.645, 0.844)
[1, 2, 3], [1, 2, 3] ==> (0.0, 0.0, 0.0, 1.0)
::: hidden
[10, 20, 30, 40], [12, 18, 33, 37] ==> (2.5, 6.5, 2.55, 0.948)
[5, 5, 6], [6, 6, 6] ==> (0.667, 0.667, 0.816, -2.0)
::: hints
- RMSE = `np.sqrt(mse)`.
- Thứ tự tham số: `metric(y_that, y_du_doan)`.
::: explain
R² có thể **âm** khi mô hình còn tệ hơn việc luôn dự đoán bằng trung bình (test cuối).

===== u6-08
@title: So sánh R² mô hình đơn và bội
@level: easy
@topic: eval
@unit: c6-5
@fn: so_sanh_r2
::: statement
Viết hàm `so_sanh_r2(cot_don, cac_cot_boi)`: với `cars.csv` (bỏ mọi dòng có ô thiếu), tính R² **trên chính dữ liệu huấn luyện** của (1) hồi quy `price` theo một cột `cot_don` và (2) hồi quy theo danh sách `cac_cot_boi`. Trả về tuple `(r2_don, r2_boi)` làm tròn 4.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def so_sanh_r2(cot_don, cac_cot_boi):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    return 0, 0
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def so_sanh_r2(cot_don, cac_cot_boi):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    y = df["price"]
    a = LinearRegression().fit(df[[cot_don]], y).score(df[[cot_don]], y)
    b = LinearRegression().fit(df[cac_cot_boi], y).score(df[cac_cot_boi], y)
    return round(float(a), 4), round(float(b), 4)
::: tests
"highway_mpg", ["horsepower", "curb_weight", "engine_size", "highway_mpg"]
::: hidden
"horsepower", ["horsepower", "engine_size"]
"curb_weight", ["curb_weight", "city_mpg", "highway_mpg"]
::: hints
- `model.score(X, y)` của hồi quy trả về R².
::: explain
Mô hình bội luôn có R² huấn luyện ≥ mô hình con của nó. Đó chưa phải bằng chứng mô hình bội dự đoán tốt hơn trên dữ liệu mới.

===== u6-09
@title: R² của hồi quy đa thức (Pipeline)
@level: medium
@topic: ml
@unit: c6-6
@fn: r2_da_thuc
::: statement
Viết hàm `r2_da_thuc(bac)`: với `cars.csv` (bỏ dòng thiếu `price`), tạo `Pipeline` gồm `StandardScaler` → `PolynomialFeatures(degree=bac)` → `LinearRegression`, huấn luyện dự đoán `price` từ **một** biến `highway_mpg`, trả về R² trên dữ liệu huấn luyện làm tròn 4.
::: starter
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression


def r2_da_thuc(bac):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    pipe = Pipeline([("model", LinearRegression())])
    pipe.fit(df[["highway_mpg"]], df["price"])
    return round(pipe.score(df[["highway_mpg"]], df["price"]), 4)
::: solution
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression


def r2_da_thuc(bac):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
    pipe = Pipeline([
        ("scale", StandardScaler()),
        ("poly", PolynomialFeatures(degree=bac)),
        ("model", LinearRegression()),
    ])
    X, y = df[["highway_mpg"]], df["price"]
    pipe.fit(X, y)
    return round(float(pipe.score(X, y)), 4)
::: tests
2
3
::: hidden
1
4
::: hints
- `Pipeline([("scale", StandardScaler()), ("poly", PolynomialFeatures(degree=bac)), ("model", LinearRegression())])`.
::: explain
R² huấn luyện tăng dần theo bậc – nhưng bậc cao dễ quá khớp. Chương 7 dùng dữ liệu kiểm tra để chọn bậc.

===== u6-10
@title: Xe nào vừa ngân sách?
@level: medium
@topic: ml
@unit: c6-7
@fn: vua_ngan_sach
::: statement
Một khách hàng có `ngan_sach` và đang cân nhắc các mức công suất trong `ds_hp`. Viết hàm `vua_ngan_sach(ds_hp, ngan_sach)`: huấn luyện hồi quy `price ~ horsepower` trên `cars.csv` (bỏ dòng thiếu ở hai cột), dự đoán giá cho từng mức và trả về list các mức công suất có giá dự đoán **≤ ngân sách**, sắp xếp tăng dần.
::: starter
import pandas as pd
from sklearn.linear_model import LinearRegression


def vua_ngan_sach(ds_hp, ngan_sach):
    return ds_hp
::: solution
import pandas as pd
from sklearn.linear_model import LinearRegression


def vua_ngan_sach(ds_hp, ngan_sach):
    df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["horsepower", "price"])
    lm = LinearRegression().fit(df[["horsepower"]], df["price"])
    moi = pd.DataFrame({"horsepower": ds_hp})
    gia = lm.predict(moi)
    return sorted(h for h, g in zip(ds_hp, gia) if g <= ngan_sach)
::: tests
[80, 100, 120, 140, 160], 25000
[150, 70], 1000 ==> []
::: hints
- Dự đoán cho cả list một lần, rồi `zip(ds_hp, gia)` để lọc.
::: explain
Mô hình biến câu hỏi kinh doanh ("ngân sách này mua được xe mạnh cỡ nào?") thành phép tính cụ thể.

===== u6-11
@title: Độ chính xác của ba bộ phân loại
@level: medium
@topic: ml
@unit: c6-8
@fn: do_chinh_xac
::: statement
Viết hàm `do_chinh_xac(ten)`: từ `students.csv` (bỏ mọi dòng thiếu), X = `study_hours, attendance, midterm`, y = 1 nếu `final >= 7` ngược lại 0. Huấn luyện mô hình theo `ten`:
- `"logistic"`: `LogisticRegression(max_iter=1000)`
- `"knn"`: `KNeighborsClassifier(n_neighbors=5)`
- `"tree"`: `DecisionTreeClassifier(max_depth=3, random_state=0)`

Trả về độ chính xác **trên dữ liệu huấn luyện** làm tròn 3.
::: starter
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier


def do_chinh_xac(ten):
    return 0.0
::: solution
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier


def do_chinh_xac(ten):
    df = pd.read_csv("students.csv").dropna()
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    models = {
        "logistic": LogisticRegression(max_iter=1000),
        "knn": KNeighborsClassifier(n_neighbors=5),
        "tree": DecisionTreeClassifier(max_depth=3, random_state=0),
    }
    m = models[ten].fit(X, y)
    return round(float(m.score(X, y)), 3)
::: tests
"logistic"
"knn"
::: hidden
"tree"
::: hints
- Gom ba mô hình vào một dict rồi chọn theo `ten`.
- Với bộ phân loại, `score` là accuracy.
::: explain
Độ chính xác trên dữ liệu huấn luyện thường **lạc quan** – đặc biệt với cây quyết định sâu. Chương 7 đánh giá bằng train/test split.

===== u6-12
@title: Xác suất đạt điểm cao
@level: medium
@topic: ml
@unit: c6-8
@fn: xac_suat_dat
::: statement
Viết hàm `xac_suat_dat(gio, chuyen_can, giua_ky)`: huấn luyện `LogisticRegression(max_iter=1000)` như bài trước (y = `final >= 7`), trả về xác suất (làm tròn 3) để một sinh viên mới có các giá trị này thuộc lớp 1.
::: starter
import pandas as pd
from sklearn.linear_model import LogisticRegression


def xac_suat_dat(gio, chuyen_can, giua_ky):
    df = pd.read_csv("students.csv").dropna()
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    m = LogisticRegression(max_iter=1000).fit(X, y)
    moi = pd.DataFrame({"study_hours": [gio], "attendance": [chuyen_can], "midterm": [giua_ky]})
    return int(m.predict(moi)[0])
::: solution
import pandas as pd
from sklearn.linear_model import LogisticRegression


def xac_suat_dat(gio, chuyen_can, giua_ky):
    df = pd.read_csv("students.csv").dropna()
    X = df[["study_hours", "attendance", "midterm"]]
    y = (df["final"] >= 7).astype(int)
    m = LogisticRegression(max_iter=1000).fit(X, y)
    moi = pd.DataFrame({"study_hours": [gio], "attendance": [chuyen_can], "midterm": [giua_ky]})
    return round(float(m.predict_proba(moi)[0, 1]), 3)
::: tests
6, 8, 5.0
16, 14, 7.5
::: hidden
12, 10, 6.0
20, 15, 9.0
3, 5, 3.0
::: hints
- `predict_proba(moi)[0, 1]`: dòng 0, cột lớp 1.
::: explain
`predict` chỉ cho nhãn 0/1 (ngưỡng 0.5); `predict_proba` cho mức độ chắc chắn – hữu ích để xếp hạng rủi ro.

===== u6-13
@title: Kích thước các cụm xe
@level: medium
@topic: ml
@unit: c6-9
@fn: kich_thuoc_cum
::: statement
Viết hàm `kich_thuoc_cum(k)`: với `cars.csv` (bỏ mọi dòng thiếu), chuẩn hoá hai cột `engine_size`, `price` bằng `StandardScaler`, chạy `KMeans(n_clusters=k, n_init=10, random_state=0)` và trả về list **số xe mỗi cụm sắp xếp giảm dần**.
::: starter
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans


def kich_thuoc_cum(k):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(df[["engine_size", "price"]])
    return pd.Series(km.labels_).value_counts().tolist()
::: solution
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans


def kich_thuoc_cum(k):
    df = pd.read_csv("cars.csv", na_values="?").dropna()
    X = StandardScaler().fit_transform(df[["engine_size", "price"]])
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    return sorted(pd.Series(km.labels_).value_counts().tolist(), reverse=True)
::: tests
2
3
::: hidden
4
1 ==> [70]
::: hints
- Quên chuẩn hoá thì `price` (hàng chục nghìn) lấn át hoàn toàn `engine_size` (hàng trăm).
::: explain
Chuẩn hoá trước khi phân cụm vì K-Means dùng khoảng cách Euclid.

===== u6-14
@title: R² hiệu chỉnh
@level: easy
@topic: eval
@unit: c6-5
@fn: r2_hieu_chinh
::: statement
Viết hàm `r2_hieu_chinh(r2, n, p)` trả về R² hiệu chỉnh `1 − (1 − r2)·(n − 1)/(n − p − 1)`, làm tròn 4.

- `r2_hieu_chinh(0.8, 50, 4)` → `0.7822`
::: starter
def r2_hieu_chinh(r2, n, p):
    return round(r2, 4)
::: solution
def r2_hieu_chinh(r2, n, p):
    return round(1 - (1 - r2) * (n - 1) / (n - p - 1), 4)
::: tests
0.8, 50, 4 ==> 0.7822
1.0, 10, 3 ==> 1.0
::: hidden
0.5, 100, 1 ==> 0.4949
0.3, 20, 10 ==> -0.4778
::: hints
- Viết đúng công thức, chú ý ngoặc ở mẫu số `(n - p - 1)`.
::: explain
Nhiều biến mà R² tăng không đáng kể thì R² hiệu chỉnh **giảm** – thậm chí âm (test cuối).

===== u6-15
@title: Tự tính MSE để so sánh hai cách dự đoán
@level: easy
@topic: eval
@source: Dạng bài thực hành FTU (Lecture 9)
@unit: c6-5
@fn: so_sanh_mse
::: statement
Viết hàm `so_sanh_mse(y_that, du_a, du_b)` **không dùng sklearn**, trả về tuple:
1. MSE của A, 2. MSE của B (trung bình bình phương sai số),
3. `"A"`, `"B"` hoặc `"Bằng nhau"` – cách có MSE nhỏ hơn,
4. số quan sát mà A dự đoán **cao hơn** giá trị thật (phần dư y − ŷ âm).

Nếu độ dài khác nhau hoặc list rỗng thì trả về `None`.

- `so_sanh_mse([300, 400], [320, 390], [280, 420])` → `(250.0, 400.0, "A", 1)`
::: starter
def so_sanh_mse(y_that, du_a, du_b):
    a = sum(y - p for y, p in zip(y_that, du_a)) / len(y_that)
    b = sum(y - p for y, p in zip(y_that, du_b)) / len(y_that)
    return a, b, "A" if a < b else "B", 0
::: solution
def so_sanh_mse(y_that, du_a, du_b):
    if not y_that or len(y_that) != len(du_a) or len(y_that) != len(du_b):
        return None

    def mse(pred):
        return sum((y - p) ** 2 for y, p in zip(y_that, pred)) / len(y_that)

    a, b = mse(du_a), mse(du_b)
    tot = "A" if a < b else "B" if b < a else "Bằng nhau"
    cao_hon = sum(1 for y, p in zip(y_that, du_a) if y - p < 0)
    return a, b, tot, cao_hon
::: tests
[300, 400], [320, 390], [280, 420] ==> (250.0, 400.0, "A", 1)
[], [], [] ==> None
::: hidden
[300, 400, 500, 350, 450], [320, 390, 470, 360, 460], [280, 420, 520, 330, 430] ==> (320.0, 400.0, "A", 3)
[1, 2], [2, 1], [0, 3] ==> (1.0, 1.0, "Bằng nhau", 1)
[1], [1, 2], [1] ==> None
::: hints
- Bình phương sai số **trước** khi lấy trung bình – sai số âm và dương không được triệt tiêu.
::: explain
Code mẫu quên bình phương: trung bình sai số có thể gần 0 dù mô hình rất tệ.
