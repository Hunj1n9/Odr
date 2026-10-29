@title: Phát triển mô hình học máy cơ bản
@chapter: 6
@summary: X và y, hồi quy tuyến tính đơn và bội, đánh giá bằng biểu đồ, R²/MSE, hồi quy đa thức và Pipeline, dự đoán ra quyết định, phân loại và phân cụm.

Bản tiếng Anh của đề cương gọi chương này là **Model Development** – tên trùng với module 4 của khoá IBM *Data Analysis with Python*. Ví dụ xuyên suốt: **dự đoán giá xe** (`cars.csv`). Cuối chương có thêm phân loại (đỗ/trượt) và phân cụm.

Mọi mô hình scikit-learn dùng **cùng một mẫu 3 bước**: tạo mô hình → `fit(X, y)` → `predict(X_moi)`.

> **Đối chiếu tài liệu FTU:** Lecture 9 – Phát triển mô hình P1 (học có/không giám sát, scikit-learn, hồi quy đơn/bội, đa thức, Pipeline, MSE, R²) và Lecture 10 (phân loại, **sigmoid**, logistic); đề cương ôn tập: "hồi quy đơn biến, đa biến: hệ số, intercept; mean_squared_error, R-square".

@@@ c6-1 | Học máy là gì? Biến đầu vào X và mục tiêu y
@ftu: Lecture 9 (bộ câu hỏi 25–30) – học có/không giám sát, scikit-learn, biến độc lập/phụ thuộc
@goal: Phân biệt học có giám sát / không giám sát, hồi quy / phân loại; tách đúng X (DataFrame 2 chiều) và y (Series).
@practice: ml06

> **Nói đơn giản:** **Học máy** là cho máy xem *thật nhiều ví dụ có đáp án* để nó tự rút ra quy luật, rồi dùng quy luật đó **đoán cái mới**. Hãy nghĩ như cho học sinh xem 1000 đề đã giải. Hai thứ cần phân biệt: **X** = *thông tin đầu vào* dùng để đoán (diện tích, số phòng), **y** = *đáp án* cần đoán (giá nhà). Đoán một **con số** gọi là *hồi quy*; đoán một **nhãn** (đỗ/trượt) gọi là *phân loại*.
>
> **Từ cần biết:** **có giám sát** = dữ liệu có đáp án y · **không giám sát** = không có đáp án, máy tự tìm cấu trúc · **X** = bảng 2 chiều, viết `df[["a"]]` (hai ngoặc) · **y** = một cột, viết `df["b"]`


| Loại | Có y? | Ví dụ | Mô hình |
|---|---|---|---|
| **Hồi quy** (có giám sát) | y là **số** | dự đoán giá xe, điểm thi | LinearRegression |
| **Phân loại** (có giám sát) | y là **nhãn** | đỗ/trượt, gian lận/không | LogisticRegression, KNN, cây quyết định |
| **Phân cụm** (không giám sát) | không có y | chia nhóm khách hàng | KMeans |

??
Dự đoán **khách hàng có rời bỏ dịch vụ hay không** là bài toán:
- [ ] Hồi quy
- [x] Phân loại
- [ ] Phân cụm
- [ ] Không phải học máy
> Đầu ra là nhãn (rời bỏ / ở lại).

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?").dropna()
X = df[["horsepower"]]          # 2 ngoặc → DataFrame 2 chiều (n dòng × 1 cột)
y = df["price"]                 # 1 ngoặc → Series 1 chiều
print(X.shape, y.shape)
print(df[["horsepower"]].ndim, df["horsepower"].ndim)
```

??
Vì sao viết `X = df[["horsepower"]]` thay vì `df["horsepower"]`?
- [ ] Để chạy nhanh hơn
- [x] scikit-learn yêu cầu X là 2 chiều (dòng = mẫu, cột = biến)
- [ ] Để bỏ ô thiếu
- [ ] Không khác gì nhau
> Truyền Series 1 chiều vào `fit` sẽ lỗi "Expected 2D array". y thì để 1 chiều.

??
Chia nhóm khách hàng theo hành vi mua sắm, **không có nhãn có sẵn**:
- [ ] Hồi quy tuyến tính
- [ ] Hồi quy logistic
- [x] Phân cụm (KMeans)
- [ ] Cây quyết định
> Không có y → học không giám sát.

@@@ c6-2 | Hồi quy tuyến tính đơn
@ftu: Lecture 9 – hồi quy tuyến tính đơn biến; đề 5/1/2024 – hệ số, hệ số chặn
@goal: Huấn luyện `LinearRegression` với một biến, đọc ý nghĩa hệ số góc (`coef_`) và hệ số chặn (`intercept_`), dự đoán giá trị mới.
@practice: ml01, ml05

> **Nói đơn giản:** Hồi quy tuyến tính đơn là **kẻ một đường thẳng đi qua đám chấm sao cho gần tất cả chấm nhất**. Đường đó có dạng `y = a·x + b`. **Hệ số góc `a`** cho biết *x tăng 1 đơn vị thì y thay đổi khoảng bao nhiêu*; **hệ số chặn `b`** là giá trị y khi x = 0. `fit` là bước "học", `predict` là bước "đoán".
>
> **Từ cần biết:** **`fit(X, y)`** = cho mô hình học · **`predict(X)`** = dự đoán · **`coef_`** = hệ số góc · **`intercept_`** = hệ số chặn


Mô hình: **ŷ = b₀ + b₁·x**. Máy tìm b₀, b₁ sao cho tổng bình phương sai số nhỏ nhất.

```python
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
lm = LinearRegression()
lm.fit(df[["horsepower"]], df["price"])
print("b0 (intercept):", round(lm.intercept_, 1))
print("b1 (coef):", round(lm.coef_[0], 1))
moi = pd.DataFrame({"horsepower": [100, 150]})
print(lm.predict(moi).round(0))
```

**Đọc hệ số:** b₁ ≈ 300 nghĩa là *mỗi mã lực tăng thêm, giá dự đoán tăng khoảng 300* (đơn vị tiền của dữ liệu).

??
Mô hình `price = -9000 + 310 · horsepower`. Xe 120 mã lực có giá dự đoán:
- [x] 28200
- [ ] 37200
- [ ] 310
- [ ] -8690
> -9000 + 310 × 120 = 28200.

??
`lm.coef_` của mô hình một biến có dạng:
- [ ] Một số thực
- [x] Mảng 1 phần tử – lấy số bằng `lm.coef_[0]`
- [ ] DataFrame
- [ ] Tuple (b0, b1)
> `coef_` luôn là mảng (mỗi biến một hệ số); `intercept_` là một số.

??
Hệ số góc âm (ví dụ giá theo `highway_mpg` là −2000) nghĩa là:
- [ ] Mô hình sai
- [x] Mpg càng cao, giá dự đoán càng thấp
- [ ] Giá luôn âm
- [ ] Không có quan hệ
> Dấu của hệ số cho chiều quan hệ; xe tiết kiệm xăng thường là xe nhỏ, rẻ.

@@@ c6-3 | Hồi quy tuyến tính bội
@ftu: Lecture 9 – hồi quy đa biến; đề cương ôn tập – Model Development
@goal: Đưa nhiều biến (kể cả biến giả) vào mô hình, đọc từng hệ số "khi các biến khác giữ nguyên".
@practice: ml07

> **Nói đơn giản:** Khi có **nhiều biến X** (diện tích, số phòng, tuổi nhà…), mô hình có nhiều hệ số. Mỗi hệ số được đọc là: *"khi **các biến khác giữ nguyên**, biến này tăng 1 thì y thay đổi bấy nhiêu"*. Cụm "giữ nguyên các biến khác" là chìa khoá để diễn giải đúng.
>
> **Từ cần biết:** **hệ số** = mức ảnh hưởng của từng biến · **biến giả** = cột 0/1 đại diện cho một nhãn chữ · **`LinearRegression`** = mô hình đường thẳng/mặt phẳng


**ŷ = b₀ + b₁x₁ + b₂x₂ + … + bₙxₙ**

```python
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
cols = ["horsepower", "curb_weight", "engine_size", "highway_mpg"]
lm = LinearRegression().fit(df[cols], df["price"])
print(pd.Series(lm.coef_, index=cols).round(2))
print("intercept:", round(lm.intercept_, 1))
```

Hệ số của `curb_weight` là mức thay đổi giá khi tăng 1 đơn vị khối lượng **trong khi các biến khác không đổi**.

??
Trong hồi quy bội, `len(lm.coef_)` bằng:
- [ ] 1
- [x] Số cột của X
- [ ] Số dòng của X
- [ ] Số cột + 1
> Mỗi biến một hệ số. Hệ số chặn nằm riêng trong `intercept_`.

Thêm biến phân loại qua biến giả (Chương 4):

```python
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = pd.get_dummies(df[["horsepower", "drive_wheels"]], columns=["drive_wheels"], drop_first=True, dtype=int)
print(X.columns.tolist())
lm = LinearRegression().fit(X, df["price"])
print(pd.Series(lm.coef_, index=X.columns).round(0))
```

??
Vì sao dùng `drop_first=True` khi tạo biến giả cho hồi quy?
- [ ] Để bớt dòng dữ liệu
- [x] Để tránh một cột thừa – các biến giả cộng lại luôn bằng 1 gây đa cộng tuyến hoàn hảo
- [ ] Vì sklearn không nhận 3 cột
- [ ] Để tăng R²
> Nhóm bị bỏ trở thành "nhóm gốc"; hệ số các nhóm còn lại là chênh lệch so với nhóm gốc.

??
Hệ số của `drive_wheels_rwd` là +9000 (nhóm gốc là `4wd`). Ý nghĩa:
- [x] Xe dẫn động cầu sau đắt hơn xe 4wd khoảng 9000 khi các biến khác như nhau
- [ ] Mọi xe rwd giá 9000
- [ ] Xe rwd rẻ hơn 9000
- [ ] Có 9000 xe rwd
> Hệ số biến giả = chênh lệch trung bình so với nhóm gốc.

@@@ c6-4 | Đánh giá mô hình bằng biểu đồ
@ftu: Khoá IBM module 4 – residual plot, distribution plot (đề cương FTU dùng regplot)
@goal: Vẽ và đọc biểu đồ hồi quy, biểu đồ phần dư (residual plot) và biểu đồ so sánh phân phối giá trị thật – dự đoán.

> **Nói đơn giản:** Để xem mô hình có tốt không, ta **nhìn bằng mắt**. **Phần dư = giá trị thật − giá trị đoán** (mô hình sai bao nhiêu). Biểu đồ phần dư tốt thì các chấm *rải ngẫu nhiên quanh 0*; nếu chúng tạo thành hình cong hay hình phễu thì mô hình đang bỏ sót điều gì đó.
>
> **Từ cần biết:** **phần dư (residual)** = sai số của từng điểm · **residual plot** = biểu đồ phần dư · **phân phối** = hình dáng các giá trị (histogram)


```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
X, y = df[["highway_mpg"]], df["price"]
lm = LinearRegression().fit(X, y)
yhat = lm.predict(X)
resid = y - yhat

fig, axes = plt.subplots(1, 2, figsize=(10, 3.5))
axes[0].scatter(X["highway_mpg"], y, s=15)
xs = X["highway_mpg"].sort_values()
axes[0].plot(xs, lm.predict(xs.to_frame()), color="red")
axes[0].set_title("Đường hồi quy")
axes[1].scatter(X["highway_mpg"], resid, s=15)
axes[1].axhline(0, color="gray", linestyle="--")
axes[1].set_title("Phần dư (y − ŷ)")
fig.tight_layout()
plt.show()
```

**Đọc residual plot:** nếu phần dư **rải ngẫu nhiên quanh 0** → mô hình tuyến tính phù hợp. Nếu phần dư có **hình cong** (chữ U) → quan hệ phi tuyến, nên thử hồi quy đa thức (bài 6.6).

??
Residual plot có dạng hình chữ U rõ rệt. Nên:
- [ ] Kết luận mô hình tuyến tính hoàn hảo
- [x] Thử mô hình phi tuyến, ví dụ hồi quy đa thức
- [ ] Xoá hết dữ liệu ngoại lai
- [ ] Đổi sang phân cụm
> Phần dư có quy luật nghĩa là mô hình bỏ sót cấu trúc của dữ liệu.

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
cols = ["horsepower", "curb_weight", "engine_size", "highway_mpg"]
yhat = LinearRegression().fit(df[cols], df["price"]).predict(df[cols])
fig, ax = plt.subplots(figsize=(6, 3.5))
ax.hist(df["price"], bins=12, alpha=0.5, label="Giá thật")
ax.hist(yhat, bins=12, alpha=0.5, label="Giá dự đoán")
ax.legend()
ax.set_title("Phân phối giá thật và dự đoán (hồi quy bội)")
plt.show()
```

Với **hồi quy bội** không vẽ được đường hồi quy 2D → so sánh **phân phối** giá thật và giá dự đoán: hai phân phối càng trùng nhau, mô hình càng khớp.

??
Phần dư (residual) của một quan sát là:
- [ ] ŷ − x
- [x] y − ŷ (giá trị thật trừ giá trị dự đoán)
- [ ] y × ŷ
- [ ] Hệ số góc
> Phần dư dương: mô hình dự đoán **thấp hơn** thực tế.

??
Mô hình nhiều biến – cách trực quan nào phù hợp nhất để xem độ khớp?
- [ ] Đường hồi quy trên scatter 2D
- [x] So sánh phân phối y thật và ŷ (hoặc scatter y thật – ŷ)
- [ ] Biểu đồ tròn
- [ ] Boxplot của X
> Không thể vẽ mặt phẳng nhiều chiều; so sánh y với ŷ là cách chung cho mọi mô hình.

@@@ c6-5 | Đo độ khớp: R², MSE, RMSE, MAE
@ftu: Lecture 9 (câu 42–45) – MSE, R²; outline – Adjusted R²
@goal: Tính và diễn giải R², MSE, RMSE, MAE bằng `sklearn.metrics`; so sánh hai mô hình trên cùng dữ liệu.
@practice: ml03

> **Nói đơn giản:** Cần một **con số** để chấm điểm mô hình. **R²** nói mô hình giải thích được *bao nhiêu phần trăm* biến động của y (0 → 1, càng gần 1 càng tốt). **MAE** là "trung bình đoán lệch bao nhiêu", dễ hiểu nhất. **MSE/RMSE** cũng đo sai số nhưng phạt nặng các lần lệch lớn; RMSE có cùng đơn vị với y.
>
> **Từ cần biết:** **R²** = mức độ giải thích (0–1) · **MAE** = sai số tuyệt đối trung bình · **MSE** = sai số bình phương trung bình · **RMSE** = căn bậc hai của MSE


| Chỉ số | Công thức | Ý nghĩa | Tốt khi |
|---|---|---|---|
| MAE | trung bình \|y − ŷ\| | sai số trung bình | nhỏ |
| MSE | trung bình (y − ŷ)² | phạt nặng sai số lớn | nhỏ |
| RMSE | √MSE | cùng đơn vị với y | nhỏ |
| R² | 1 − SS_res / SS_tot | % biến động của y được giải thích | gần 1 |

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

df = pd.read_csv("cars.csv", na_values="?").dropna()
y = df["price"]
for cols in (["highway_mpg"], ["horsepower", "curb_weight", "engine_size", "highway_mpg"]):
    lm = LinearRegression().fit(df[cols], y)
    yhat = lm.predict(df[cols])
    mse = mean_squared_error(y, yhat)
    print(f"{len(cols)} biến: R² = {r2_score(y, yhat):.3f}  RMSE = {np.sqrt(mse):,.0f}  MAE = {mean_absolute_error(y, yhat):,.0f}")
print("lm.score cũng là R²:", round(lm.score(df[cols], y), 3))
```

??
R² = 0.76 nghĩa là:
- [ ] Mô hình dự đoán đúng 76% số xe
- [x] Mô hình giải thích được khoảng 76% biến động của giá
- [ ] Sai số trung bình 0.76
- [ ] 76% dữ liệu được dùng để huấn luyện
> R² không phải "độ chính xác %" – đó là tỉ lệ phương sai được giải thích.

??
Giá xe tính bằng đô-la. Chỉ số nào có **cùng đơn vị** với giá?
- [ ] MSE
- [x] RMSE và MAE
- [ ] R²
- [ ] Cả bốn
> MSE có đơn vị bình phương (đô-la²); R² không có đơn vị.

Vì R² không bao giờ giảm khi thêm biến, người ta dùng **R² hiệu chỉnh** (Adjusted R²) để "phạt" mô hình nhiều biến:

**R²_adj = 1 − (1 − R²)·(n − 1)/(n − p − 1)**, với n là số quan sát, p là số biến.

```python
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
n = len(df)
for cols in (["horsepower"], ["horsepower", "curb_weight", "engine_size", "highway_mpg", "city_mpg"]):
    r2 = LinearRegression().fit(df[cols], df["price"]).score(df[cols], df["price"])
    p = len(cols)
    print(len(cols), "biến: R² =", round(r2, 4), " R² hiệu chỉnh =", round(1 - (1 - r2) * (n - 1) / (n - p - 1), 4))
```

??
Thêm biến vào hồi quy tuyến tính, R² **trên dữ liệu huấn luyện**:
- [x] Không bao giờ giảm
- [ ] Luôn giảm
- [ ] Không đổi
- [ ] Bằng 0
> Vì vậy R² trên chính dữ liệu huấn luyện dễ "đánh lừa" – Chương 7 sẽ đánh giá trên dữ liệu **chưa thấy**.

@@@ c6-6 | Hồi quy đa thức và Pipeline
@ftu: Lecture 9 (câu 39–41) – polynomial features, Pipeline; đề cuối kỳ mẫu câu 18
@goal: Mô hình hoá quan hệ cong bằng `PolynomialFeatures`, gom các bước chuẩn hoá → biến đổi → mô hình vào một `Pipeline`.
@practice: ml07

> **Nói đơn giản:** Không phải quan hệ nào cũng là đường thẳng; có khi nó **cong**. Hồi quy **đa thức** thêm các cột `x²`, `x³` để vẽ được đường cong. **Pipeline** là *dây chuyền lắp ráp*: dữ liệu đi qua lần lượt các bước (chuẩn hoá → thêm cột đa thức → mô hình) trong một lệnh duy nhất.
>
> **Từ cần biết:** **`PolynomialFeatures(degree=2)`** = thêm cột x² · **bậc (degree)** = số mũ cao nhất · **`Pipeline`** = chuỗi bước nối nhau chạy tuần tự


Hồi quy đa thức bậc 2: **ŷ = b₀ + b₁x + b₂x²** – vẫn là hồi quy *tuyến tính theo hệ số*, chỉ thêm cột x².

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("cars.csv", na_values="?").dropna()
x, y = df["highway_mpg"], df["price"]
for bac in [1, 2, 3]:
    p = np.poly1d(np.polyfit(x, y, bac))
    print(bac, np.round(p.coefficients, 2))

p2 = np.poly1d(np.polyfit(x, y, 2))
xs = np.linspace(x.min(), x.max(), 100)
fig, ax = plt.subplots(figsize=(6, 3.5))
ax.scatter(x, y, s=15)
ax.plot(xs, p2(xs), color="red")
ax.set_title("Hồi quy đa thức bậc 2: giá theo highway_mpg")
plt.show()
```

??
`PolynomialFeatures(degree=2)` với **một** biến x tạo ra các cột:
- [ ] Chỉ x²
- [x] 1, x, x²
- [ ] x, 2x
- [ ] x, √x
> Mặc định có cột hằng số 1 (`include_bias=True`).

### Pipeline: gom nhiều bước thành một mô hình

```python
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
cols = ["horsepower", "curb_weight", "engine_size", "highway_mpg"]
pipe = Pipeline([
    ("scale", StandardScaler()),                       # 1. chuẩn hoá z-score
    ("poly", PolynomialFeatures(degree=2, include_bias=False)),   # 2. thêm bình phương và tích chéo
    ("model", LinearRegression()),                     # 3. hồi quy
])
pipe.fit(df[cols], df["price"])
print("R² (pipeline bậc 2):", round(pipe.score(df[cols], df["price"]), 3))
print(pipe.predict(df[cols].head(3)).round(0), df["price"].head(3).tolist())
```

??
Lợi ích chính của `Pipeline` là:
- [ ] Tăng R² gấp đôi
- [x] Gọi `fit`/`predict` một lần cho mọi bước, đảm bảo dữ liệu mới được biến đổi **giống hệt** dữ liệu huấn luyện
- [ ] Không cần dữ liệu
- [ ] Thay thế được Pandas
> Tránh quên chuẩn hoá dữ liệu mới, hoặc chuẩn hoá bằng thông số khác.

??
4 biến, `PolynomialFeatures(degree=2, include_bias=False)` tạo bao nhiêu cột?
- [ ] 8
- [x] 14
- [ ] 16
- [ ] 5
> 4 cột gốc + 4 bình phương + 6 tích chéo (tổ hợp chập 2 của 4) = 14. Bậc càng cao, số cột tăng rất nhanh.

@@@ c6-7 | Dự đoán và ra quyết định
@ftu: Đáp án 20 câu thực hành FTU – dự đoán giá xe 4 năm tuổi từ mô hình
@goal: Dùng mô hình để dự đoán giá trị mới, kiểm tra tính hợp lý của dự đoán, chọn mô hình theo R²/MSE và trả lời câu hỏi kinh doanh.

> **Nói đơn giản:** Bài này là **dùng mô hình vào việc thật**: đưa thông tin mới (vd căn nhà 70 m², 2 phòng) để đoán giá. Trước khi tin, hãy *thử xem kết quả có hợp lý không* (giá không thể âm, không thể vô lý). Rồi trả lời câu hỏi kinh doanh bằng tiếng thường, đừng chỉ ném ra con số.
>
> **Từ cần biết:** **dự đoán** = đầu ra của mô hình cho dữ liệu mới · **tính hợp lý** = kiểm tra kết quả có phi lý không · **so sánh mô hình** = chọn cái có R² cao, sai số thấp


Mô hình chỉ có giá trị khi giúp **ra quyết định**. Ví dụ: *"Với ngân sách 25 000, nên tìm xe công suất tối đa bao nhiêu?"*

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("cars.csv", na_values="?").dropna()
lm = LinearRegression().fit(df[["horsepower"]], df["price"])
hp = pd.DataFrame({"horsepower": np.arange(60, 200, 10)})
hp["gia_du_doan"] = lm.predict(hp).round(0)
print(hp.to_string(index=False))
print("Công suất lớn nhất trong ngân sách:", hp.loc[hp["gia_du_doan"] <= 25000, "horsepower"].max())
```

**Kiểm tra tính hợp lý:**
- Giá dự đoán âm, hay quá lớn? → mô hình có vấn đề hoặc đang **ngoại suy** quá xa dữ liệu.
- Chỉ tin dự đoán trong **khoảng giá trị đã thấy** của x (ở đây khoảng 59–186 mã lực).

??
Dữ liệu huấn luyện có horsepower từ 59 đến 186. Dự đoán giá cho xe 600 mã lực:
- [ ] Đáng tin như mọi dự đoán khác
- [x] Là ngoại suy xa – rất kém tin cậy
- [ ] Bị sklearn từ chối
- [ ] Luôn bằng giá trung bình
> Quan hệ tuyến tính quan sát được chưa chắc kéo dài ra ngoài vùng dữ liệu.

??
Hai mô hình trên cùng dữ liệu: A có R² = 0.76, MSE = 3.9e7; B có R² = 0.81, MSE = 3.1e7. Theo các chỉ số này:
- [ ] Chọn A
- [x] Chọn B – R² cao hơn và MSE thấp hơn
- [ ] Không so sánh được
- [ ] Chọn mô hình có ít biến hơn trong mọi trường hợp
> Nhưng phải so sánh trên **dữ liệu kiểm tra** để chắc chắn B không bị quá khớp (Chương 7).

??
Mô hình dự đoán một xe có giá **âm**. Điều này cho thấy:
- [ ] Xe đó miễn phí
- [x] Mô hình không phù hợp ở vùng đó (ngoại suy hoặc quan hệ phi tuyến)
- [ ] Dữ liệu bị đọc sai kiểu
- [ ] R² bằng 1
> Luôn kiểm tra dự đoán có hợp lý về mặt kinh tế.

@@@ c6-8 | Phân loại: hồi quy logistic, KNN và cây quyết định
@ftu: Lecture 10 (câu 46–48) – phân loại nhị phân, hàm sigmoid; outline – Logistic Regression, KNN Classifier
@goal: Huấn luyện ba mô hình phân loại phổ biến, dự đoán nhãn và xác suất, hiểu khi nào cần chuẩn hoá dữ liệu.
@practice: ml02, ml08, ml09

> **Nói đơn giản:** Bây giờ đoán **nhãn** thay vì con số. **Logistic** (tên có chữ "hồi quy" nhưng làm phân loại) cho ra *xác suất* thuộc mỗi nhóm. **KNN** làm như *hỏi k người hàng xóm gần nhất rồi bỏ phiếu*. **Cây quyết định** hỏi một chuỗi câu có/không ("thu nhập > 10 triệu?") để đi đến kết luận. KNN dựa vào khoảng cách nên cần **chuẩn hoá** dữ liệu trước.
>
> **Từ cần biết:** **nhãn (class)** = nhóm cần đoán · **`predict_proba`** = xác suất mỗi nhóm · **k** = số hàng xóm xét · **chuẩn hoá** = đưa các cột về cùng thang đo


Câu hỏi: *từ giờ tự học, chuyên cần và điểm giữa kỳ, dự đoán sinh viên đạt **final ≥ 7** hay không?*

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

df = pd.read_csv("students.csv").dropna()
X = df[["study_hours", "attendance", "midterm"]]
y = (df["final"] >= 7).astype(int)
print("Tỉ lệ nhãn 1:", round(y.mean(), 2))

for ten, m in [("Logistic", LogisticRegression(max_iter=1000)),
               ("KNN k=5", KNeighborsClassifier(n_neighbors=5)),
               ("Cây sâu 3", DecisionTreeClassifier(max_depth=3, random_state=0))]:
    m.fit(X, y)
    print(f"{ten:10s} độ chính xác trên dữ liệu huấn luyện: {m.score(X, y):.2f}")
```

??
Với bộ phân loại, `model.score(X, y)` trả về:
- [ ] R²
- [x] Độ chính xác (accuracy) – tỉ lệ dự đoán đúng
- [ ] MSE
- [ ] Xác suất
> Với mô hình hồi quy, `score` là R²; với bộ phân loại là accuracy.

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("students.csv").dropna()
X = df[["study_hours", "attendance", "midterm"]]
y = (df["final"] >= 7).astype(int)
m = LogisticRegression(max_iter=1000).fit(X, y)
moi = pd.DataFrame({"study_hours": [6, 16], "attendance": [8, 14], "midterm": [5.0, 7.5]})
print(m.predict(moi))                     # nhãn 0/1
print(m.predict_proba(moi).round(2))      # [P(nhãn 0), P(nhãn 1)]
```

Hồi quy logistic đưa tổ hợp tuyến tính z = b₀ + b₁x₁ + … qua **hàm sigmoid** σ(z) = 1 / (1 + e^(−z)) để được xác suất trong khoảng (0, 1); xác suất ≥ 0.5 → dự đoán lớp 1.

```python
import numpy as np
z = np.array([-5, -1, 0, 1, 5])
print((1 / (1 + np.exp(-z))).round(3))
```

??
Hàm sigmoid cho đầu ra trong khoảng nào?
- [ ] (−∞, +∞)
- [x] (0, 1)
- [ ] [−1, 1]
- [ ] Chỉ 0 hoặc 1
> Vì vậy đầu ra của logistic được hiểu là xác suất; σ(0) = 0.5.

??
`predict_proba(X)[:, 1]` cho:
- [ ] Nhãn dự đoán
- [x] Xác suất thuộc lớp 1
- [ ] Xác suất thuộc lớp 0
- [ ] Độ chính xác
> Mỗi dòng có một xác suất cho từng lớp, cộng lại bằng 1. Cột 1 ứng với lớp 1.

??
Vì sao nên **chuẩn hoá** dữ liệu trước KNN?
- [ ] KNN chỉ nhận số từ 0 đến 1
- [x] KNN dựa vào khoảng cách – biến có thang đo lớn sẽ áp đảo các biến khác
- [ ] Để cây quyết định chạy nhanh hơn
- [ ] Không cần thiết
> Ví dụ `curb_weight` (~3000) lấn át `engine_size` (~150). Cây quyết định thì không bị ảnh hưởng bởi thang đo.

@@@ c6-9 | Phân cụm với K-Means
@ftu: Outline Chương 5 – K-Means, Elbow method, Silhouette score; bộ câu hỏi câu 27 – phân cụm khách hàng
@goal: Chuẩn hoá dữ liệu, chạy `KMeans`, đọc tâm cụm và mô tả từng cụm bằng groupby; chọn k bằng phương pháp khuỷu tay.
@practice: ml12, tt306

> **Nói đơn giản:** **Phân cụm** không có đáp án sẵn: máy tự **gom các điểm giống nhau thành k nhóm**, như xếp khách hàng thành vài "kiểu người". **Tâm cụm** là điểm trung bình của mỗi nhóm; đọc tâm cụm để biết nhóm đó là kiểu người nào. Chọn k bằng *phương pháp khuỷu tay*: tăng k và tìm chỗ biểu đồ bắt đầu "gập".
>
> **Từ cần biết:** **K-Means** = thuật toán gom k cụm · **tâm cụm (centroid)** = điểm đại diện của cụm · **`inertia_`** = độ "lỏng" của các cụm · **elbow** = điểm gập để chọn k


```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = StandardScaler().fit_transform(df[["engine_size", "price"]])
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
df["cum"] = km.labels_
print(df.groupby("cum")[["engine_size", "price"]].mean().round(0))
print(df["cum"].value_counts().sort_index().tolist())
```

Mô tả cụm bằng trung bình các biến gốc: ví dụ *cụm 0 = xe nhỏ giá rẻ, cụm 2 = xe sang động cơ lớn*.

??
`random_state=0` trong KMeans để:
- [ ] Tăng độ chính xác
- [x] Kết quả lặp lại được mỗi lần chạy (khởi tạo tâm cụm cố định)
- [ ] Bắt buộc k = 0
- [ ] Bỏ dữ liệu thiếu
> KMeans khởi tạo tâm ngẫu nhiên; cố định seed để mọi người ra cùng kết quả.

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = StandardScaler().fit_transform(df[["engine_size", "price"]])
inertia = [KMeans(n_clusters=k, n_init=10, random_state=0).fit(X).inertia_ for k in range(1, 8)]
fig, ax = plt.subplots(figsize=(5, 3))
ax.plot(range(1, 8), inertia, marker="o")
ax.set_xlabel("k")
ax.set_ylabel("Inertia")
ax.set_title("Phương pháp khuỷu tay")
plt.show()
```

Ngoài khuỷu tay, có thể dùng **Silhouette score** (từ −1 đến 1, càng cao các cụm càng tách biệt):

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

df = pd.read_csv("cars.csv", na_values="?").dropna()
X = StandardScaler().fit_transform(df[["engine_size", "price"]])
for k in range(2, 6):
    labels = KMeans(n_clusters=k, n_init=10, random_state=0).fit_predict(X)
    print(k, round(silhouette_score(X, labels), 3))
```

??
Trong phương pháp khuỷu tay, chọn k ở đâu?
- [ ] Nơi inertia lớn nhất
- [ ] k lớn nhất có thể
- [x] Điểm "gãy" mà sau đó inertia giảm chậm hẳn lại
- [ ] Luôn k = 2
> Inertia luôn giảm khi k tăng (k = số điểm thì inertia = 0); chọn chỗ thêm cụm không còn đáng kể.

??
K-Means thuộc loại học nào?
- [ ] Có giám sát – hồi quy
- [ ] Có giám sát – phân loại
- [x] Không giám sát
- [ ] Học tăng cường
> Không dùng nhãn y; tự tìm nhóm từ dữ liệu.
