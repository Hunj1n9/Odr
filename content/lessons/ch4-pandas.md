@title: Thao tác dữ liệu với Pandas
@chapter: 4
@summary: Series, DataFrame, chọn/lọc dữ liệu, làm sạch (thiếu, trùng, sai kiểu), chuẩn hoá, binning, biến giả, apply, groupby, pivot và ghép bảng.

Pandas là công cụ bạn dùng nhiều nhất trong thi và dự án. Chương chia 12 bài nhỏ theo đúng thứ tự làm việc thật: **tạo/chọn → lọc/sắp xếp → làm sạch → biến đổi → tổng hợp → ghép bảng**.

Mẹo: sau mỗi lệnh hãy xem lại kết quả (`df.head()`), đừng viết một mạch 10 dòng rồi mới chạy.

> **Đối chiếu tài liệu FTU:** Buổi 6–7 (slide "Tiền xử lý dữ liệu & EDA": thuộc tính DataFrame, `dropna`, `replace(np.nan, mean)`, `astype`, chuẩn hoá, `get_dummies`); đề thi HK I 2024–2025 dành 5–7 điểm cho dữ liệu thiếu, trùng lặp, chuẩn hoá và mã hoá – xem bài 4.13, 4.14.

@@@ c4-1 | Series – một cột dữ liệu
@ftu: Slide Buổi 6–7 – làm quen với Pandas
@goal: Tạo Series có chỉ số, truy cập theo nhãn, tính toán vector hoá và dùng các hàm thống kê của Series.
@practice: pd13

> **Nói đơn giản:** **Series** là *một cột* của bảng Excel, nhưng mỗi ô còn có **nhãn** (gọi là chỉ số) để tra cứu. Phép toán trên Series tác động lên cả cột cùng lúc, giống kéo công thức xuống toàn cột trong Excel.
>
> **Từ cần biết:** **Series** = một cột có nhãn · **`index`** = nhãn các hàng · **thống kê** = `mean()`, `max()`, `sum()` … tính trên cả cột


`Series` = mảng NumPy + **nhãn** (index) cho từng phần tử. Mỗi cột của DataFrame là một Series.

```python
import pandas as pd
doanh_thu = pd.Series([120, 95, 140], index=["T1", "T2", "T3"], name="doanh_thu")
print(doanh_thu)
print(doanh_thu["T2"], doanh_thu.iloc[0])
print(doanh_thu * 1.1)                 # tính trên cả Series
print(doanh_thu.mean(), doanh_thu.idxmax(), doanh_thu.pct_change().round(3).tolist())
```

??
`s = pd.Series([10, 20, 30], index=["a", "b", "c"])`. `s["b"]` bằng:
- [ ] `10`
- [x] `20`
- [ ] `"b"`
- [ ] Lỗi
> Truy cập theo **nhãn** "b".

```python
import pandas as pd
s = pd.Series({"Hà Nội": 5, "TP.HCM": 8, "Đà Nẵng": 3})   # tạo từ dict: khoá → index
print(s.sort_values(ascending=False))
print(s[s > 4])
print(s.sum(), s.max(), s.describe().round(2).to_dict())
```

??
`pd.Series([4, 9, 1]).idxmax()` trả về:
- [ ] `9`
- [x] `1`
- [ ] `2`
- [ ] `[1]`
> `idxmax` trả về **nhãn** (index) của giá trị lớn nhất – ở đây index mặc định 0,1,2 nên là 1.

??
Phép nào trả về Series các giá trị **lớn hơn 4**?
- [ ] `s > 4`
- [x] `s[s > 4]`
- [ ] `s.filter(4)`
- [ ] `s.max(4)`
> `s > 4` chỉ cho Series True/False; dùng nó làm chỉ số để lọc.

@@@ c4-2 | DataFrame: tạo bảng, chọn và thêm cột
@ftu: Slide Buổi 6–7 – thuộc tính DataFrame (dtypes, columns, axes, ndim, size, shape, values); đề cương – drop, add, rename column
@goal: Tạo DataFrame từ dict, chọn một/nhiều cột, thêm cột tính toán, đổi tên và xoá cột.
@practice: pd04

> **Nói đơn giản:** **DataFrame** là *cả tờ bảng tính*, gồm nhiều cột (Series) cùng chung nhãn hàng. Chọn **một cột** viết `df["ten"]`; chọn **nhiều cột** phải viết **hai cặp ngoặc** `df[["ten", "tuoi"]]` (ngoặc ngoài là cú pháp chọn, ngoặc trong là một list tên cột). Thêm cột mới chỉ cần gán: `df["moi"] = ...`.
>
> **Từ cần biết:** **DataFrame** = bảng dữ liệu · **cột** = một đặc điểm (tuổi, lương) · **dòng** = một đối tượng (một người) · **`drop`** = xoá cột/dòng


```python
import pandas as pd
df = pd.DataFrame({
    "ten": ["An", "Bình", "Chi", "Dũng"],
    "gk": [7.0, 8.5, 6.0, 9.0],
    "ck": [8.0, 7.5, 5.5, 9.5],
})
print(df["ten"])              # 1 cột → Series
print(df[["ten", "ck"]])      # nhiều cột → DataFrame (2 cặp ngoặc!)
df["tong"] = df["gk"] * 0.4 + df["ck"] * 0.6    # thêm cột tính toán
df
```

Tạo DataFrame từ mảng NumPy và xem các thuộc tính (Buổi 06 FTU):

```python
import numpy as np
import pandas as pd
df = pd.DataFrame(np.arange(12).reshape(4, 3), columns=["a", "b", "c"], index=["w", "x", "y", "z"])
print(df)
print(df.shape, df.ndim, df.size, df.axes)
print(df.values[:2])                 # dạng mảng NumPy
print(df.sum(), df.sum(axis=1).tolist())   # tổng theo cột (mặc định) và theo dòng
print(df.sample(2, random_state=0))  # lấy mẫu ngẫu nhiên 2 dòng
```

??
`df[["ten"]]` và `df["ten"]` khác nhau thế nào?
- [ ] Giống hệt nhau
- [x] `df[["ten"]]` là DataFrame một cột; `df["ten"]` là Series
- [ ] `df[["ten"]]` lỗi
- [ ] `df["ten"]` là list
> Truyền **list** tên cột → DataFrame. Truyền **một** tên → Series.

```python
import pandas as pd
df = pd.DataFrame({"ten": ["An", "Bình"], "gk": [7.0, 8.5], "ck": [8.0, 7.5]})
df = df.rename(columns={"gk": "giua_ky", "ck": "cuoi_ky"})
df = df.drop(columns=["giua_ky"])
df["dat"] = df["cuoi_ky"] >= 8
df.insert(0, "stt", [1, 2])
print(df)
print(df.columns.tolist(), len(df))
```

??
Sau `df.drop(columns=["gk"])` (không gán lại), `df` có còn cột `gk`?
- [x] Còn – `drop` trả về bảng mới, phải viết `df = df.drop(...)`
- [ ] Không – cột đã bị xoá
- [ ] Lỗi
- [ ] Tuỳ phiên bản
> Đa số thao tác Pandas trả về **bảng mới**. Quên gán lại là lỗi rất phổ biến.

??
Thêm cột `thanh_tien = so_luong × don_gia` đúng cách là:
- [ ] `df.thanh_tien = df.so_luong * df.don_gia`
- [x] `df["thanh_tien"] = df["so_luong"] * df["don_gia"]`
- [ ] `df.add("thanh_tien", so_luong * don_gia)`
- [ ] `df["thanh_tien"] = [so_luong * don_gia]`
> Tạo cột mới phải dùng `df["tên"] = ...`. Cách dấu chấm chỉ dùng để **đọc** cột có sẵn.

@@@ c4-3 | Chọn dòng và ô: loc và iloc
@ftu: Đề cương ôn tập – "loc, iloc (học kĩ)"; đề 5/1/2024 – lấy dòng bằng loc
@goal: Dùng `loc` (theo nhãn) và `iloc` (theo vị trí) để lấy dòng, cột, ô; đặt cột làm chỉ số với `set_index`.
@practice: pd15

> **Nói đơn giản:** Có hai cách "chỉ tay" vào bảng: **`loc`** tìm theo **tên (nhãn)**, giống tìm nhà theo *tên chủ nhà*; **`iloc`** tìm theo **vị trí**, giống đếm *nhà thứ mấy* trong dãy. Chữ **i** trong `iloc` là *integer* (số nguyên) để dễ nhớ.
>
> **Từ cần biết:** **`loc[hàng, cột]`** = theo nhãn (cuối khoảng được **bao gồm**) · **`iloc[hàng, cột]`** = theo vị trí số (cuối khoảng **không** bao gồm) · **`set_index`** = chọn cột làm nhãn hàng


```python
import pandas as pd
df = pd.read_csv("students.csv", index_col="student_id")
print(df.loc["SV003"])                         # 1 dòng theo nhãn
print(df.loc["SV001":"SV003", ["name", "final"]])   # loc: LẤY CẢ điểm cuối
print(df.iloc[0, 1])                           # dòng 0, cột 1 theo vị trí
print(df.iloc[:3, :2])                         # iloc: KHÔNG lấy điểm cuối
```

| | `loc` | `iloc` |
|---|---|---|
| Dựa vào | **nhãn** (tên dòng/cột) | **vị trí** 0, 1, 2… |
| Lát cắt `a:b` | lấy cả `b` | không lấy `b` |

??
Bảng có index 0..9. `df.loc[2:4]` lấy bao nhiêu dòng?
- [ ] 2
- [x] 3
- [ ] 4
- [ ] 5
> `loc` lấy cả nhãn cuối: 2, 3, 4. Còn `df.iloc[2:4]` chỉ lấy 2 dòng.

```python
import pandas as pd
df = pd.read_csv("students.csv")
print(df.loc[df["final"] >= 9, ["name", "final"]])   # loc + điều kiện + chọn cột
df.loc[df["final"] > 10, "final"] = 10                # sửa theo điều kiện
print(df.at[0, "name"], df.iloc[-1]["name"])          # .at lấy 1 ô nhanh
```

??
Lấy **dòng cuối cùng** của bảng bất kể index là gì:
- [ ] `df.loc[-1]`
- [x] `df.iloc[-1]`
- [ ] `df[-1]`
- [ ] `df.last()`
> `iloc` theo vị trí nên hỗ trợ số âm. `loc[-1]` tìm **nhãn** -1 → thường lỗi KeyError.

??
Sửa cột `final` thành 10 cho các dòng có `final > 10`:
- [ ] `df[df["final"] > 10]["final"] = 10`
- [x] `df.loc[df["final"] > 10, "final"] = 10`
- [ ] `df["final"].loc = 10`
- [ ] `df.final > 10 = 10`
> Cách 1 là "chained assignment" – có thể sửa trên bản sao và không có tác dụng (kèm cảnh báo). Dùng `loc[điều_kiện, cột]`.

@@@ c4-4 | Lọc dòng theo điều kiện
@ftu: Bộ câu hỏi giữa kỳ Lecture 3–6 câu 27 – lọc nhiều điều kiện
@goal: Lọc với một hoặc nhiều điều kiện (`& | ~`), dùng `isin`, `between`, `str.contains` và `query`.
@practice: pd05

> **Nói đơn giản:** Lọc dòng là nói với bảng: *"chỉ giữ những dòng thoả điều kiện này"*. Điều kiện cho ra một cột đúng/sai, bảng sẽ giữ dòng nào là `True`. Ghép nhiều điều kiện thì dùng `&` (và), `|` (hoặc), `~` (không) và **bắt buộc đặt mỗi điều kiện trong ngoặc tròn**.
>
> **Từ cần biết:** **`df[df["tuoi"] > 18]`** = giữ người trên 18 tuổi · **`isin([...])`** = giá trị nằm trong danh sách · **`between(a, b)`** = nằm trong khoảng · **`str.contains`** = chứa đoạn chữ


```python
import pandas as pd
df = pd.read_csv("sales.csv")
hn = df[df["region"] == "Hà Nội"]
lon = df[(df["quantity"] >= 8) & (df["unit_price"] > 300)]      # VÀ – nhớ ngoặc
hai_noi = df[df["region"].isin(["Hà Nội", "Đà Nẵng"])]
print(len(hn), len(lon), len(hai_noi))
print(df[df["unit_price"].between(100, 500)]["product"].unique())
print(df.query("quantity > 8 and category == 'Điện tử'")[["product", "quantity"]])
```

??
Lọc đơn **không** thuộc Hà Nội:
- [ ] `df[df.region not "Hà Nội"]`
- [x] `df[df["region"] != "Hà Nội"]`
- [ ] `df[!df["region"] == "Hà Nội"]`
- [ ] `df.drop("Hà Nội")`
> Hoặc `df[~(df["region"] == "Hà Nội")]` – `~` là phủ định trong Pandas.

??
Vì sao `df[df.a > 1 & df.b < 5]` báo lỗi?
- [ ] Không được so sánh hai cột
- [x] `&` ưu tiên cao hơn `>`/`<`, phải đặt ngoặc từng điều kiện
- [ ] Phải dùng `and`
- [ ] Phải dùng `loc`
> Viết `df[(df.a > 1) & (df.b < 5)]`. Dùng `and` sẽ gây lỗi "truth value of a Series is ambiguous".

??
`df["region"].isin(["Hà Nội", "TP.HCM"])` trả về:
- [ ] Các dòng thuộc 2 khu vực
- [x] Series True/False cho từng dòng
- [ ] Số dòng thuộc 2 khu vực
- [ ] Danh sách khu vực
> `isin` tạo mặt nạ; đặt trong `df[...]` để lọc, hoặc `.sum()` để đếm.

@@@ c4-5 | Sắp xếp và lấy top N
@ftu: Bộ câu hỏi giữa kỳ Lecture 3–6 câu 28 – sort_values nhiều cột
@goal: Sắp xếp theo một/nhiều cột, lấy N dòng lớn nhất/nhỏ nhất, xếp hạng và đặt lại chỉ số.
@practice: pd07

> **Nói đơn giản:** Sắp xếp bảng giống **xếp hạng thi đua**. `sort_values` xếp theo cột bạn chọn; `nlargest(3, "cot")` lấy ngay 3 dòng cao nhất ("top 3"). Sau khi sắp xếp, nhãn hàng bị xáo trộn – dùng `reset_index` để đánh số lại từ 0.
>
> **Từ cần biết:** **`ascending=False`** = xếp giảm dần · **`nlargest` / `nsmallest`** = top lớn nhất / nhỏ nhất · **`rank`** = thứ hạng của từng giá trị · **`reset_index`** = đánh số lại hàng


```python
import pandas as pd
df = pd.read_csv("students.csv").dropna(subset=["final"])
print(df.sort_values("final", ascending=False).head(3)[["name", "final"]])
print(df.sort_values(["class", "final"], ascending=[True, False]).head(4)[["class", "name", "final"]])
print(df.nlargest(3, "study_hours")[["name", "study_hours"]])
df["hang"] = df["final"].rank(ascending=False, method="min").astype(int)
print(df.sort_values("hang")[["name", "final", "hang"]].head(5).reset_index(drop=True))
```

??
Sắp xếp theo `class` tăng dần, trong cùng lớp theo `final` giảm dần:
- [ ] `df.sort_values(["class", "final"], ascending=False)`
- [x] `df.sort_values(["class", "final"], ascending=[True, False])`
- [ ] `df.sort_values("class").sort_values("final")`
- [ ] `df.sort(["class", -"final"])`
> `ascending` nhận list tương ứng với từng cột.

??
`reset_index(drop=True)` dùng để:
- [ ] Xoá toàn bộ dữ liệu
- [x] Đánh lại chỉ số 0, 1, 2… và bỏ chỉ số cũ
- [ ] Sắp xếp lại theo index
- [ ] Xoá cột đầu tiên
> Sau khi lọc/sắp xếp, index bị "lộn xộn"; `drop=True` để không thêm cột index cũ vào bảng.

??
`df.nlargest(3, "price")` tương đương:
- [ ] `df.head(3)`
- [x] `df.sort_values("price", ascending=False).head(3)`
- [ ] `df["price"].max(3)`
- [ ] `df.sort_values("price").head(3)`
> Lấy 3 dòng có `price` lớn nhất.

@@@ c4-6 | Dữ liệu thiếu và trùng lặp
@ftu: Slide Buổi 6–7 – xử lý dữ liệu thiếu (dropna, replace bằng trung bình/tần suất); đề thi HK I 2024–2025 câu 2
@goal: Phát hiện ô thiếu, chọn giữa xoá (`dropna`) và điền (`fillna` bằng trung bình/trung vị/mode), loại dòng trùng.
@practice: pd03, pd04

> **Nói đơn giản:** Dữ liệu thật hay có **ô trống** (hiện là `NaN`) và **dòng lặp**. Bạn có hai lựa chọn với ô trống: **bỏ** dòng đó (`dropna`) hoặc **điền** giá trị hợp lý (`fillna`) – ví dụ điền trung bình của cột. Nhiều ô thiếu thì bỏ; ít thì điền, để không mất thông tin.
>
> **Từ cần biết:** **`NaN`** = ô thiếu · **`isna()`** = ô nào thiếu · **trung vị** = giá trị ở giữa khi xếp thứ tự (ít bị lệch bởi số quá lớn) · **mode** = giá trị xuất hiện nhiều nhất · **`drop_duplicates`** = bỏ dòng trùng


```python
import pandas as pd
df = pd.read_csv("sales.csv")
print(df.isna().sum())                 # số ô thiếu mỗi cột
print("Dòng trùng:", df.duplicated().sum())
print(df[df.isna().any(axis=1)].head())
```

Ba lựa chọn khi gặp ô thiếu (theo khoá IBM *Data Analysis with Python*):
1. **Xoá** dòng/cột – khi thiếu ít, hoặc thiếu ở biến mục tiêu.
2. **Thay** bằng trung bình (biến số), **mode** – giá trị xuất hiện nhiều nhất (biến phân loại).
3. **Giữ nguyên** nếu thông tin "thiếu" có ý nghĩa.

Bài giảng FTU (Buổi 6 & 7, bộ dữ liệu ô tô của IBM) xử lý ký hiệu `?` theo cách **thay thế rồi đổi kiểu**:

```python
import numpy as np
import pandas as pd
cars = pd.read_csv("cars.csv")                          # đọc thường: "?" là chuỗi
cars = cars.replace("?", np.nan)                        # 1. "?" → NaN
cars["horsepower"] = cars["horsepower"].astype("float") # 2. đổi kiểu
tb = cars["horsepower"].mean()
cars["horsepower"] = cars["horsepower"].replace(np.nan, tb)   # 3. thay NaN bằng trung bình
cars.dropna(subset=["price"], axis=0, inplace=True)     # 4. bỏ dòng thiếu giá
print(cars["horsepower"].dtype, cars.isna().sum().sum(), cars.shape)
```

```python
import pandas as pd
df = pd.read_csv("sales.csv").drop_duplicates()
df = df.dropna(subset=["quantity"])                          # thiếu số lượng → bỏ đơn
df["region"] = df["region"].fillna(df["region"].mode()[0])   # thiếu khu vực → mode
print(df.isna().sum().sum(), df.shape)

cars = pd.read_csv("cars.csv", na_values="?")
cars["horsepower"] = cars["horsepower"].fillna(cars["horsepower"].mean())
cars = cars.dropna(subset=["price"])                         # thiếu giá (biến cần dự đoán) → bỏ
print(cars.isna().sum().sum(), cars.shape)
```

??
Cột `price` là **biến cần dự đoán** và có vài ô thiếu. Nên:
- [ ] Điền bằng giá trung bình
- [x] Xoá các dòng thiếu giá
- [ ] Điền bằng 0
- [ ] Giữ nguyên rồi huấn luyện
> Điền biến mục tiêu bằng giá trị "bịa" sẽ dạy mô hình sai. Thường xoá các dòng đó.

??
Cột phân loại `region` có ô thiếu, điền bằng gì là hợp lý nhất?
- [ ] Trung bình
- [x] Mode (giá trị xuất hiện nhiều nhất)
- [ ] 0
- [ ] Trung vị
> Không tính được trung bình của chữ. `df["region"].mode()[0]` – `mode()` trả về Series nên lấy phần tử `[0]`.

??
`df.isna().sum()` trả về:
- [ ] Tổng số ô thiếu toàn bảng
- [x] Số ô thiếu của từng cột
- [ ] Danh sách dòng thiếu
- [ ] True/False
> Muốn tổng toàn bảng: `df.isna().sum().sum()`.

@@@ c4-7 | Chuyển kiểu, đổi đơn vị và chuẩn hoá
@ftu: Slide Buổi 6–7 – kiểu dữ liệu sai, `astype`, chuẩn hoá; đề thi HK I 2024–2025 câu 4a–b
@goal: Sửa kiểu dữ liệu sai (`astype`, `to_numeric`), đổi đơn vị, chuẩn hoá cột số bằng 3 cách: chia max, min-max, z-score.
@practice: tt312, np04

> **Nói đơn giản:** Thường một cột số bị đọc nhầm thành chữ (vd `"1,200"`), phải **ép về số** (`astype`, `to_numeric`). **Chuẩn hoá** là đưa các cột về *cùng một thang* để so sánh công bằng: tuổi chạy 0–100 còn lương chạy hàng triệu, nếu không chuẩn hoá thì lương "lấn át" tuổi.
>
> **Từ cần biết:** **`astype`** = đổi kiểu cột · **min-max** = đưa về khoảng 0–1 · **z-score** = đo mỗi giá trị cách trung bình bao nhiêu độ lệch chuẩn


### Định dạng dữ liệu

```python
import pandas as pd
raw = pd.read_csv("cars.csv")                     # quên na_values → horsepower là chuỗi
print(raw["horsepower"].dtype)
raw["horsepower"] = pd.to_numeric(raw["horsepower"], errors="coerce")   # lỗi → NaN
print(raw["horsepower"].dtype, raw["horsepower"].isna().sum())

# đổi đơn vị: miles per gallon → lít/100 km
raw["city_L100km"] = (235 / raw["city_mpg"]).round(2)
print(raw[["city_mpg", "city_L100km"]].head(3))
```

??
`pd.to_numeric(s, errors="coerce")` làm gì với giá trị `"?"`?
- [ ] Báo lỗi
- [x] Đổi thành `NaN`
- [ ] Đổi thành 0
- [ ] Giữ nguyên `"?"`
> `coerce` = ép: giá trị không chuyển được thành số sẽ thành `NaN`.

### Chuẩn hoá (normalization)

Các cột có thang đo rất khác nhau (giá ~ 20 000, mã lực ~ 100) khiến nhiều mô hình bị lệch. Ba cách phổ biến:

| Cách | Công thức | Khoảng giá trị |
|---|---|---|
| Chia cho max | x / max | (0, 1] |
| Min-max | (x − min) / (max − min) | [0, 1] |
| Z-score | (x − mean) / std | quanh 0, đa số trong [−3, 3] |

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?").dropna()
x = df["engine_size"]
df["es_max"] = x / x.max()
df["es_minmax"] = (x - x.min()) / (x.max() - x.min())
df["es_z"] = (x - x.mean()) / x.std()
print(df[["engine_size", "es_max", "es_minmax", "es_z"]].describe().round(2).loc[["min", "max", "mean"]])
```

??
Sau chuẩn hoá min-max, giá trị **nhỏ nhất** của cột là:
- [x] `0`
- [ ] `-1`
- [ ] `1`
- [ ] Trung bình
> (min − min) / (max − min) = 0; giá trị lớn nhất thành 1.

??
Sau chuẩn hoá z-score, **trung bình** cột xấp xỉ:
- [x] `0`
- [ ] `1`
- [ ] `0.5`
- [ ] Bằng trung bình cũ
> Trừ trung bình → trung bình mới bằng 0; chia độ lệch chuẩn → độ lệch chuẩn mới bằng 1.

@@@ c4-8 | Phân nhóm (binning) và biến giả
@ftu: Slide Buổi 6–7 – biến giả `get_dummies`; Final hè 2025 – cut/qcut
@goal: Chia biến số thành các nhóm bằng `pd.cut`/`pd.qcut`, biến cột phân loại thành biến giả 0/1 với `get_dummies`.
@practice: pd11

> **Nói đơn giản:** **Binning** là chia số thành **các thùng/nhóm**: tuổi 7, 15, 40, 70 → *thiếu nhi / thanh niên / trung niên / cao tuổi*. **Biến giả** (`get_dummies`) đổi một cột chữ thành nhiều cột 0/1, vì mô hình chỉ hiểu số: cột "thành phố" gồm Hà Nội/Huế → hai cột *là_Hà_Nội*, *là_Huế*.
>
> **Từ cần biết:** **`pd.cut`** = chia theo khoảng giá trị bạn đặt · **`pd.qcut`** = chia sao cho mỗi nhóm có số dòng gần bằng nhau · **`get_dummies`** = tạo cột 0/1 cho mỗi nhãn


### Binning – chia khoảng

Đôi khi "giá thấp / trung bình / cao" có ý nghĩa hơn con số chính xác:

```python
import numpy as np
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])
bins = np.linspace(df["price"].min(), df["price"].max(), 4)     # 3 khoảng bằng nhau → 4 mốc
df["muc_gia"] = pd.cut(df["price"], bins, labels=["Thấp", "Trung bình", "Cao"], include_lowest=True)
print(df["muc_gia"].value_counts())

diem = pd.Series([3.5, 5.0, 6.9, 8.5, 9.2])
print(pd.cut(diem, bins=[0, 4, 5.5, 7, 8.5, 10], labels=["F", "D", "C", "B", "A"], right=False).tolist())
```

??
Muốn 3 nhóm giá **bằng nhau về độ rộng**, cần bao nhiêu mốc trong `np.linspace(min, max, ?)`?
- [ ] 3
- [x] 4
- [ ] 2
- [ ] 6
> n khoảng cần n + 1 mốc. (`pd.qcut` thì chia theo **số lượng** bằng nhau mỗi nhóm.)

### Biến giả (dummy / one-hot)

Mô hình chỉ hiểu số. Cột `fuel_type` có 2 giá trị `gas`/`diesel` → tách thành các cột 0/1:

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?")
dummy = pd.get_dummies(df["fuel_type"], prefix="fuel", dtype=int)
print(dummy.head(3))
df = pd.concat([df, dummy], axis=1).drop(columns=["fuel_type"])
print(df.columns.tolist())
```

??
Cột `drive_wheels` có 3 giá trị `fwd`, `rwd`, `4wd`. `pd.get_dummies(df["drive_wheels"])` tạo bao nhiêu cột?
- [ ] 1
- [ ] 2
- [x] 3
- [ ] 4
> Mỗi giá trị một cột 0/1. (Khi đưa vào hồi quy có thể dùng `drop_first=True` để bỏ một cột thừa.)

??
Vì sao phải biến cột chữ thành biến giả trước khi đưa vào `LinearRegression`?
- [ ] Để file nhỏ hơn
- [x] Vì mô hình chỉ tính toán được với số
- [ ] Vì Pandas không đọc được chữ
- [ ] Để vẽ biểu đồ đẹp hơn
> Hồi quy nhân hệ số với giá trị cột – "gas" không nhân được.

@@@ c4-9 | Biến đổi với apply, map, .str và .dt
@ftu: Outline – tiền xử lý chuỗi, tách datetime tạo cột mới
@goal: Áp dụng hàm cho từng giá trị/dòng, ánh xạ bằng dict, xử lý chuỗi hàng loạt với `.str` và ngày tháng với `.dt`.
@practice: pd10, pd11

> **Nói đơn giản:** Khi có sẵn hàm bạn muốn làm cho **mỗi ô**, `apply` giao việc đó cho cả cột. `map` tra theo một **bảng đổi** (ví dụ "Nam" → 1, "Nữ" → 0). `.str` và `.dt` là "hộp công cụ" để xử lý chữ hàng loạt và ngày tháng hàng loạt (như `df["ten"].str.upper()`).
>
> **Từ cần biết:** **`apply`** = áp hàm cho từng giá trị/dòng · **`map`** = đổi giá trị theo dict · **`.str.…`** = hàm chuỗi cho cả cột · **`.dt.…`** = hàm ngày tháng cho cả cột


```python
import pandas as pd
df = pd.read_csv("students.csv").dropna(subset=["final"])

def xep_loai(d):
    return "Giỏi" if d >= 8 else ("Khá" if d >= 6.5 else "TB")

df["loai"] = df["final"].apply(xep_loai)                 # hàm cho từng giá trị
df["gioi_tinh"] = df["gender"].map({"Nam": "M", "Nữ": "F"})   # ánh xạ bằng dict
df["tong"] = df.apply(lambda r: 0.4 * r["midterm"] + 0.6 * r["final"], axis=1)  # theo dòng
print(df[["name", "final", "loai", "gioi_tinh", "tong"]].head().round(2))
```

??
`df.apply(f, axis=1)` gọi hàm `f` với:
- [ ] Từng cột
- [x] Từng dòng (dạng Series)
- [ ] Từng ô
- [ ] Cả bảng
> `axis=1` → mỗi lần nhận một dòng; truy cập giá trị bằng `r["tên_cột"]`.

```python
import pandas as pd
df = pd.read_csv("sales.csv")
print(df["product"].str.upper().head(3).tolist())
print(df["product"].str.contains("Áo").sum(), df["region"].str.len().max())
df["date"] = pd.to_datetime(df["date"])
df["thang"] = df["date"].dt.month
print(df["date"].dt.day_name().head(3).tolist(), df["thang"].value_counts().sort_index().to_dict())
```

??
Lấy tháng từ cột ngày `df["date"]` (đã là datetime):
- [ ] `df["date"].month`
- [x] `df["date"].dt.month`
- [ ] `df["date"].str.month`
- [ ] `month(df["date"])`
> Thao tác ngày tháng trên Series đi qua `.dt`, thao tác chuỗi đi qua `.str`.

??
`df["tier"].map({"Vàng": 3, "Bạc": 2})` với giá trị `"Đồng"` (không có trong dict) cho:
- [ ] `0`
- [ ] Lỗi KeyError
- [x] `NaN`
- [ ] `"Đồng"`
> `map` với dict: giá trị không có trong dict thành `NaN`.

@@@ c4-10 | Gom nhóm với groupby
@ftu: Slide Buổi 6–7 / Lecture 7 – groupby; bộ câu hỏi giữa kỳ câu 29
@goal: Dùng mẫu **split–apply–combine**: `groupby` một/nhiều cột, tổng hợp bằng `sum/mean/count/size` và `agg` nhiều hàm.
@practice: pd06, pd12, pd16

> **Nói đơn giản:** `groupby` làm theo ba bước, như **chấm điểm theo lớp**: (1) *tách* học sinh thành từng lớp, (2) *tính* điểm trung bình mỗi lớp, (3) *gộp* kết quả thành một bảng mới. Mẫu này tên là **split–apply–combine** và dùng ở khắp mọi nơi.
>
> **Từ cần biết:** **`groupby("lop")`** = tách theo cột lop · **`agg`** = tính nhiều thống kê cùng lúc · **`size`** = đếm số dòng mỗi nhóm · **`count`** = đếm số ô có dữ liệu


```python
import pandas as pd
df = pd.read_csv("sales.csv").drop_duplicates().dropna()
df["revenue"] = df["quantity"] * df["unit_price"]

print(df.groupby("region")["revenue"].sum().sort_values(ascending=False))
print(df.groupby("category")["quantity"].mean().round(2))
print(df.groupby(["region", "category"])["revenue"].sum().head(6))
```

`groupby` = **tách** bảng theo nhóm → **áp** hàm tổng hợp cho mỗi nhóm → **gộp** kết quả.

??
`df.groupby("region")["revenue"].sum()` trả về:
- [ ] Một số – tổng doanh thu
- [x] Series: mỗi khu vực một tổng doanh thu
- [ ] DataFrame gốc đã sắp xếp
- [ ] Danh sách khu vực
> Index của kết quả là các giá trị của `region`.

```python
import pandas as pd
df = pd.read_csv("students.csv")
bang = df.groupby("class").agg(
    si_so=("name", "size"),
    tb_final=("final", "mean"),
    cao_nhat=("final", "max"),
).round(2)
print(bang)
print(df.groupby("class")["final"].agg(["mean", "std", "count"]).round(2))
```

??
`size` và `count` khác nhau thế nào trong groupby?
- [ ] Giống nhau
- [x] `size` đếm mọi dòng; `count` chỉ đếm ô **không thiếu**
- [ ] `count` đếm cả ô thiếu
- [ ] `size` chỉ dùng cho số
> Cột `final` có ô trống → `count` nhỏ hơn `size`.

??
Lấy kết quả groupby thành DataFrame có cột `region` bình thường (không làm index):
- [ ] `df.groupby("region").sum().index()`
- [x] `df.groupby("region", as_index=False)["revenue"].sum()` hoặc thêm `.reset_index()`
- [ ] `df.groupby("region").to_frame()`
- [ ] Không làm được
> Tiện khi cần ghép (merge) hoặc vẽ biểu đồ tiếp.

@@@ c4-11 | Bảng pivot và bảng chéo
@ftu: Lecture 7 – pivot table, heatmap; bộ câu hỏi giữa kỳ câu 30
@goal: Tạo bảng hai chiều bằng `pivot_table` và `crosstab`, điền ô trống, thêm tổng hàng/cột.
@practice: pd08

> **Nói đơn giản:** **Pivot table** giống PivotTable trong Excel: biến dữ liệu dài thành **bảng hai chiều** (hàng là một đặc điểm, cột là đặc điểm khác, ô là con số tổng hợp). **Crosstab** là bảng *đếm chéo*, vd có bao nhiêu nam/nữ ở mỗi lớp.
>
> **Từ cần biết:** **`pivot_table`** = bảng tổng hợp hai chiều · **`values`** = số cần tính · **`aggfunc`** = tính gì (tổng, trung bình…) · **`margins`** = thêm hàng/cột tổng


```python
import pandas as pd
df = pd.read_csv("sales.csv").drop_duplicates().dropna()
df["revenue"] = df["quantity"] * df["unit_price"]
pv = df.pivot_table(index="region", columns="category", values="revenue",
                    aggfunc="sum", fill_value=0, margins=True, margins_name="Tổng")
pv
```

Cấu trúc: `index` = nhãn dòng, `columns` = nhãn cột, `values` = giá trị cần tổng hợp, `aggfunc` = cách tổng hợp.

??
`pivot_table(index="region", columns="category", values="revenue", aggfunc="sum")` – mỗi ô là:
- [ ] Số đơn hàng
- [x] Tổng doanh thu của khu vực đó trong danh mục đó
- [ ] Doanh thu trung bình
- [ ] Doanh thu lớn nhất
> `aggfunc` quyết định cách tổng hợp; mặc định là `"mean"`!

```python
import pandas as pd
cars = pd.read_csv("cars.csv", na_values="?")
print(pd.crosstab(cars["drive_wheels"], cars["body_style"]))           # đếm số xe
print(cars.groupby(["drive_wheels", "body_style"])["price"].mean().unstack().round(0))
```

??
`aggfunc` mặc định của `pivot_table` là:
- [ ] `sum`
- [x] `mean`
- [ ] `count`
- [ ] `max`
> Hay bị quên – đề hỏi "tổng doanh thu" mà không ghi `aggfunc="sum"` sẽ ra trung bình.

??
`pd.crosstab(a, b)` mặc định tính:
- [x] Số lần xuất hiện của mỗi cặp giá trị (a, b)
- [ ] Tổng của a theo b
- [ ] Tương quan giữa a và b
- [ ] Trung bình
> Bảng tần suất chéo – rất hay dùng khi khám phá hai biến phân loại.

@@@ c4-12 | Ghép bảng: merge và concat
@ftu: Outline – tổ chức và tái cấu trúc dữ liệu
@goal: Ghép hai bảng theo khoá chung với `merge` (inner/left/right/outer) và nối bảng chồng lên nhau với `concat`.
@practice: pd09, pd16

> **Nói đơn giản:** **`merge`** ghép hai bảng **theo cột chung**, giống hàm VLOOKUP của Excel (ví dụ ghép bảng đơn hàng với bảng khách hàng qua mã khách). **`concat`** thì chỉ **xếp bảng này chồng lên bảng kia** (cùng loại cột). Bốn kiểu `how` quyết định xử lý khi dòng không có đôi.
>
> **Từ cần biết:** **khoá (key)** = cột chung dùng để ghép · **`inner`** = chỉ giữ dòng có ở cả hai · **`left`** = giữ hết bảng trái · **`outer`** = giữ tất cả · **`concat`** = nối chồng


```python
import pandas as pd
sales = pd.read_csv("sales.csv").drop_duplicates()
cus = pd.read_csv("customers.csv")
m = sales.merge(cus, on="customer_id", how="left")
print(m[["order_id", "customer_id", "name", "tier"]].head())
print(len(sales), len(m))
```

| `how` | Giữ lại |
|---|---|
| `inner` (mặc định) | chỉ khoá có ở **cả hai** bảng |
| `left` | mọi dòng bảng trái |
| `right` | mọi dòng bảng phải |
| `outer` | mọi dòng của cả hai |

??
Bảng đơn hàng có khách `C99` không có trong bảng khách hàng. `merge(..., how="inner")` thì đơn đó:
- [ ] Được giữ, cột tên khách là `NaN`
- [x] Bị loại khỏi kết quả
- [ ] Gây lỗi
- [ ] Được ghép với khách đầu tiên
> `inner` chỉ giữ khoá có ở cả hai bảng. Dùng `how="left"` để giữ mọi đơn.

```python
import pandas as pd
q1 = pd.DataFrame({"thang": [1, 2], "dt": [100, 120]})
q2 = pd.DataFrame({"thang": [4, 5], "dt": [90, 150]})
print(pd.concat([q1, q2], ignore_index=True))          # nối dọc (thêm dòng)

a = pd.DataFrame({"ma": ["S1", "S2"], "gk": [7, 8]})
b = pd.DataFrame({"ma_sv": ["S2", "S1"], "ck": [9, 6]})
print(a.merge(b, left_on="ma", right_on="ma_sv"))       # khoá khác tên
```

??
Nối bảng tháng 1–3 với bảng tháng 4–6 (cùng các cột) thành một bảng dài hơn:
- [ ] `pd.merge(q1, q2)`
- [x] `pd.concat([q1, q2], ignore_index=True)`
- [ ] `q1 + q2`
- [ ] `q1.join(q2)`
> `concat` xếp chồng các bảng; `merge` ghép ngang theo khoá.

??
Hai bảng có cột khoá tên khác nhau (`ma` và `ma_sv`). Dùng tham số nào?
- [ ] `on=["ma", "ma_sv"]`
- [x] `left_on="ma", right_on="ma_sv"`
- [ ] `key="ma"`
- [ ] Không ghép được
> `on` chỉ dùng khi cột khoá cùng tên ở hai bảng.

@@@ c4-13 | Dạng đề thi: thiếu dữ liệu và trùng lặp nâng cao
@ftu: Đề thi HK I 2024–2025 câu 2–3; Final hè 2025 (thresh, interpolate, duplicated, keep="last")
@goal: Giải trọn các câu làm sạch trong đề cuối kỳ thật: bỏ dòng/cột thiếu theo tỉ lệ (`thresh`), bỏ dòng thiếu nhiều nhất, nội suy, các biến thể `drop_duplicates`/`duplicated`.
@practice: fe08, fe09, fe10, fe11

> **Nói đơn giản:** Bài này luyện các câu làm sạch **dạng đề thi thật**. Đa số là kết hợp những mảnh đã học: đếm ô thiếu, bỏ dòng/cột theo ngưỡng, điền giá trị. Hãy đọc đề *chậm*, tự hỏi "cần bảng nào ra, bước nào trước", rồi gõ từng lệnh nhỏ và xem kết quả.
>
> **Từ cần biết:** **`thresh=n`** = giữ dòng/cột có *ít nhất n* ô có dữ liệu · **nội suy** = đoán ô thiếu từ các ô hai bên · **`isna().sum()`** = đếm ô thiếu mỗi cột


Đề thực hành học kỳ I 2024–2025 dành **5/10 điểm** cho hai câu: xử lý dữ liệu thiếu (2 điểm) và trùng lặp (3 điểm). Mỗi ý chỉ một hai dòng – nhưng phải đúng tham số.

### Dữ liệu thiếu theo tỉ lệ

```python
import pandas as pd
df = pd.DataFrame({
    "Ten": ["Phuong", "Dao", "Mai", "Yen", "Vinh"],
    "Chi tieu": [15, None, None, None, 20],
    "Tuoi": [20, None, 22, None, 24],
    "So thich": ["Doc sach", "Xem phim", None, None, "Doc sach"],
})
print(df.isna().sum(axis=1).tolist())                 # số ô thiếu mỗi dòng
print(df[df.isna().mean(axis=1) < 0.5])               # bỏ dòng thiếu ≥ 50%
print(df.dropna(thresh=3))                            # giữ dòng có ≥ 3 ô KHÔNG thiếu
print(df.drop(index=df.isna().sum(axis=1).idxmax()))  # bỏ dòng thiếu nhiều nhất
print(df.dropna(axis=1, thresh=4).columns.tolist())   # bỏ CỘT có < 4 ô không thiếu
print(df["Tuoi"].interpolate().tolist())              # nội suy tuyến tính cho cột số
```

??
Bảng 4 cột. `df.dropna(thresh=3)` giữ lại những dòng:
- [ ] Thiếu ít nhất 3 ô
- [x] Có ít nhất 3 ô **không** thiếu
- [ ] Thiếu đúng 3 ô
- [ ] 3 dòng đầu
> `thresh` đếm số ô có dữ liệu cần để giữ dòng. Dòng thiếu 2/4 ô (chỉ còn 2 ô) sẽ bị bỏ.

??
`df.isna().sum(axis=1).idxmax()` trả về:
- [ ] Số ô thiếu lớn nhất
- [x] Chỉ số (nhãn) của dòng có nhiều ô thiếu nhất
- [ ] Tên cột thiếu nhiều nhất
- [ ] Bảng đã xoá
> `sum(axis=1)` đếm theo **dòng**; `idxmax` lấy nhãn dòng. Cột thiếu nhiều nhất là `df.isna().sum().idxmax()`.

### Trùng lặp: subset, keep và đánh dấu

```python
import pandas as pd
df = pd.DataFrame({
    "Ten": ["Phuong", "Binh", "Thinh", "Phuong", "Linh"],
    "Chi tieu": [15, 20, 12, 20, 15],
    "Tuoi": [25, 21, 22, 25, 24],
})
print(df.duplicated().sum())                                     # trùng HOÀN TOÀN: 0
print(df.drop_duplicates(subset=["Tuoi"]))                       # trùng theo 1 cột
print(df.drop_duplicates(subset=["Ten", "Tuoi"], keep="last"))   # giữ dòng cuối
df["is_duplicate"] = df.duplicated(subset=["Ten", "Tuoi"])       # đánh dấu, không xoá
print(df[df.duplicated(subset=["Ten", "Tuoi"], keep=False)])     # xem TẤT CẢ bản trùng
print(df.value_counts(subset=["Ten", "Tuoi"]).head(2))           # tần suất từng tổ hợp
```

??
Hai dòng giống hệt nhau. `df.duplicated().sum()` bằng:
- [ ] 2
- [x] 1
- [ ] 0
- [ ] Lỗi
> Mặc định `keep="first"`: lần xuất hiện đầu không bị coi là trùng.

??
Muốn **giữ dòng cuối cùng** trong các dòng trùng theo `Ten` và `Tuoi`:
- [ ] `df.drop_duplicates(["Ten", "Tuoi"], last=True)`
- [x] `df.drop_duplicates(subset=["Ten", "Tuoi"], keep="last")`
- [ ] `df.drop_duplicates(keep=-1)`
- [ ] `df.duplicated(keep="last")`
> `duplicated` chỉ **đánh dấu**; `drop_duplicates` mới xoá.

??
`df.duplicated(keep=False)` đánh dấu True cho:
- [ ] Không dòng nào
- [x] Mọi dòng thuộc nhóm trùng, kể cả lần xuất hiện đầu
- [ ] Chỉ dòng cuối
- [ ] Dòng không trùng
> Dùng để xem toàn bộ các bản trùng trước khi quyết định giữ dòng nào.

@@@ c4-14 | Mã hoá nhãn và xử lý cột chữ theo dạng đề thi
@ftu: Đề thi HK I 2024–2025 câu 4c–d (LabelEncoder, One-Hot); Final hè 2025 (rsplit, contains, cut/qcut)
@goal: Dùng `LabelEncoder` và One-Hot đúng chỗ, tách họ tên bằng `str.rsplit(expand=True)`, tìm chuỗi bằng `str.contains`, phân biệt `pd.cut` và `pd.qcut`.
@practice: fe12, fe13, fe14

> **Nói đơn giản:** Mô hình chỉ hiểu số, nên cột chữ phải được **mã hoá**. **LabelEncoder** gán mỗi nhãn một số (Hà Nội=0, Huế=1…) – nhanh nhưng vô tình tạo *thứ bậc giả*. **One-Hot** tạo một cột 0/1 cho mỗi nhãn nên công bằng hơn. Hai kiểu ngày/chữ khác (`rsplit`, `contains`) giúp tách họ tên, tìm từ khoá.
>
> **Từ cần biết:** **LabelEncoder** = nhãn → số 0,1,2… · **One-Hot** = mỗi nhãn một cột 0/1 · **`str.rsplit`** = cắt chuỗi từ bên phải · **`pd.cut` vs `pd.qcut`** = chia theo khoảng vs chia theo số lượng đều


### LabelEncoder và One-Hot

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.DataFrame({"Cong ty": ["A", "B", "C", "D"],
                   "Nganh nghe": ["Bat dong san", "Cong nghe", "Bat dong san", "Cong nghe"]})
df["Nganh_ma"] = LabelEncoder().fit_transform(df["Nganh nghe"])     # 0, 1 theo thứ tự chữ cái
one_hot = pd.get_dummies(df["Nganh nghe"], prefix="Nganh", dtype=int)
print(pd.concat([df, one_hot], axis=1))
```

| | LabelEncoder | One-Hot (`get_dummies`) |
|---|---|---|
| Kết quả | một cột số 0, 1, 2… | mỗi giá trị một cột 0/1 |
| Dùng cho | biến mục tiêu, biến có thứ bậc | biến đầu vào không có thứ bậc |
| Rủi ro | mô hình hiểu nhầm "2 > 1" | nhiều cột khi có nhiều giá trị |

??
`LabelEncoder().fit_transform(["Y te", "Cong nghe", "Y te", "Bat dong san"])` cho:
- [ ] `[0, 1, 0, 2]`
- [x] `[2, 1, 2, 0]`
- [ ] `[1, 2, 1, 3]`
- [ ] `[2, 0, 2, 1]`
> Nhãn được sắp theo chữ cái: Bat dong san → 0, Cong nghe → 1, Y te → 2.

### Xử lý chuỗi họ tên, tìm sản phẩm

```python
import pandas as pd
df = pd.DataFrame({"Ten khach hang": ["  Nguyen Van An", "TRAN THI BINH  ", "le minh"],
                   "San pham": ["iPhone 13", "iPad Air", "iPhone SE"]})
df["Ten khach hang"] = df["Ten khach hang"].str.strip().str.title()
df[["Ho va ten dem", "Ten"]] = df["Ten khach hang"].str.rsplit(n=1, expand=True)
print(df)
print(df[df["San pham"].str.contains("iPhone")])
```

??
Tách "Nguyen Van An" thành "Nguyen Van" và "An":
- [ ] `str.split(n=1, expand=True)`
- [x] `str.rsplit(n=1, expand=True)`
- [ ] `str.split(expand=True)`
- [ ] `str.partition()`
> `rsplit(n=1)` tách một lần **từ bên phải**; `split(n=1)` cho "Nguyen" | "Van An".

### cut và qcut

```python
import pandas as pd
thu_nhap = pd.Series([50, 120, 180, 250, 390, 420, 580, 600])
print(pd.cut(thu_nhap, bins=[0, 200, 400, 600], labels=["Thấp", "TB", "Cao"]).value_counts().sort_index().tolist())
print(pd.qcut(thu_nhap, q=3, labels=["Thấp", "TB", "Cao"]).value_counts().sort_index().tolist())
```

??
Khác biệt giữa `pd.cut` và `pd.qcut`:
- [x] `cut` chia theo **mốc giá trị**; `qcut` chia theo **phân vị** để mỗi nhóm có số phần tử xấp xỉ bằng nhau
- [ ] Giống nhau
- [ ] `qcut` chỉ dùng cho chuỗi
- [ ] `cut` luôn chia đều số phần tử
> Ví dụ trên: `cut` theo mốc 0–200–400–600 cho 3–2–3 người; `qcut` đặt mốc tại các phân vị 1/3 và 2/3 nên số người mỗi nhóm gần bằng nhau bất kể giá trị trải rộng thế nào.
