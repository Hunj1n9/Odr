@title: Thao tác dữ liệu với Pandas
@chapter: 4
@summary: Series/DataFrame, chọn & lọc (loc/iloc), cột mới, apply, dữ liệu thiếu, groupby, pivot, merge, chuỗi & ngày tháng.

## 1. Series và DataFrame

- **Series**: một cột có nhãn (index).
- **DataFrame**: bảng gồm nhiều Series chung index.

```python
import pandas as pd
s = pd.Series([8.5, 6.0, 9.2], index=["An", "Bình", "Chi"], name="diem")
print(s, s["Bình"], s.mean(), s[s > 7], sep="\n")

df = pd.read_csv("sales.csv")
print(type(df["region"]))      # một cột -> Series
df[["region", "product"]].head(3)   # nhiều cột -> DataFrame (2 cặp ngoặc!)
```

## 2. Chọn dữ liệu: `[]`, `loc`, `iloc`

| Cách | Theo | Ví dụ |
|---|---|---|
| `df["col"]`, `df[["a","b"]]` | tên cột | |
| `df.loc[hàng, cột]` | **nhãn** (index, tên cột); slice **bao gồm** cận cuối | `df.loc[0:4, "region"]` |
| `df.iloc[hàng, cột]` | **vị trí số nguyên**; slice **không** gồm cận cuối | `df.iloc[0:4, 2]` |

```python
import pandas as pd
df = pd.read_csv("sales.csv")
print(df.loc[0:2, ["order_id", "region"]])   # 3 dòng (0,1,2)
print(df.iloc[0:2, 0:2])                     # 2 dòng, 2 cột
print(df.iloc[-1])                           # dòng cuối
print(df.loc[df["quantity"] > 8, "product"].unique())
```

## 3. Lọc dòng theo điều kiện

```python
import pandas as pd
df = pd.read_csv("sales.csv")
hn = df[df["region"] == "Hà Nội"]
lon = df[(df["region"] == "Hà Nội") & (df["quantity"] >= 8)]       # VÀ: &
dt = df[df["category"].isin(["Điện tử", "Văn phòng"])]
khong_hn = df[~(df["region"] == "Hà Nội")]                         # PHỦ ĐỊNH: ~
q = df.query("quantity >= 9 and unit_price > 500")
print(len(hn), len(lon), len(dt), len(khong_hn), len(q))
```

> Dùng `&`, `|`, `~` (không phải `and/or/not`) và **bọc mỗi điều kiện trong ngoặc**.

## 4. Sắp xếp, cột mới, apply

```python
import pandas as pd
df = pd.read_csv("sales.csv")
df["revenue"] = df["quantity"] * df["unit_price"]              # vector hoá
df["size"] = df["quantity"].apply(lambda q: "lớn" if q >= 8 else "nhỏ")
df["vat"] = (df["revenue"] * 0.1).round(0)
df = df.rename(columns={"unit_price": "price"})
top = df.sort_values(["revenue", "order_id"], ascending=[False, True]).head(5)
top[["order_id", "product", "quantity", "price", "revenue", "size"]]
```

`map` thay giá trị theo dict, `np.where` tạo cột theo điều kiện, `pd.cut` chia khoảng:

```python
import pandas as pd
import numpy as np
st = pd.read_csv("students.csv")
st["gioi_tinh"] = st["gender"].map({"Nam": "M", "Nữ": "F"})
st["dat"] = np.where(st["final"] >= 5, "Đạt", "Không đạt")
st["muc"] = pd.cut(st["final"], bins=[0, 5, 6.5, 8, 10], labels=["Yếu", "TB", "Khá", "Giỏi"], right=False)
st[["name", "final", "dat", "muc"]].head()
```

## 5. Dữ liệu thiếu và trùng lặp

```python
import pandas as pd
df = pd.read_csv("sales.csv")
print(df.isna().sum())
print("dòng trùng:", df.duplicated().sum())

clean = (df.drop_duplicates()
           .dropna(subset=["region"])          # bỏ dòng thiếu region
           .copy())
clean["quantity"] = clean["quantity"].fillna(clean["quantity"].median()).astype(int)
print(clean.shape, clean.isna().sum().sum())
```

| Cách xử lý | Lệnh |
|---|---|
| Bỏ dòng có ô trống | `dropna()`, `dropna(subset=[...])` |
| Điền giá trị | `fillna(0)`, `fillna(df[c].mean())`, `fillna(method="ffill")` |
| Bỏ trùng | `drop_duplicates()`, `drop_duplicates(subset=["id"])` |
| Đổi kiểu | `astype(int)`, `pd.to_numeric(s, errors="coerce")` |

## 6. Gom nhóm – `groupby`

**Split → Apply → Combine**: chia theo nhóm, tính trên từng nhóm, gộp kết quả.

```python
import pandas as pd
df = pd.read_csv("sales.csv").dropna(subset=["quantity"])
df["revenue"] = df["quantity"] * df["unit_price"]

print(df.groupby("region")["revenue"].sum().sort_values(ascending=False))
print(df.groupby("category")["quantity"].agg(["count", "sum", "mean"]).round(1))
summary = df.groupby(["region", "category"]).agg(
    don_hang=("order_id", "count"),
    doanh_thu=("revenue", "sum"),
).reset_index()
summary.head(6)
```

Dòng có giá trị lớn nhất trong mỗi nhóm:

```python
import pandas as pd
st = pd.read_csv("students.csv").dropna(subset=["final"])
st.loc[st.groupby("class")["final"].idxmax(), ["class", "name", "final"]]
```

## 7. Pivot table, value_counts, crosstab

```python
import pandas as pd
df = pd.read_csv("sales.csv").dropna(subset=["region", "quantity"])
print(df["category"].value_counts())
print(df["category"].value_counts(normalize=True).round(3))
pd.pivot_table(df, index="region", columns="category", values="quantity", aggfunc="sum", fill_value=0)
```

## 8. Ghép bảng: `merge` và `concat`

```python
import pandas as pd
sales = pd.read_csv("sales.csv")
cus = pd.read_csv("customers.csv")
m = sales.merge(cus, on="customer_id", how="left")   # inner / left / right / outer
print(m.shape)
m[["order_id", "customer_id", "name", "tier"]].head()
```

`pd.concat([df1, df2])` nối theo **dòng** (cùng cột); `pd.concat([a, b], axis=1)` nối theo **cột**.

## 9. Chuỗi (`.str`) và ngày tháng (`.dt`)

```python
import pandas as pd
df = pd.read_csv("sales.csv")
df["date"] = pd.to_datetime(df["date"])
df["thang"] = df["date"].dt.month
df["thu"] = df["date"].dt.day_name()
print(df.groupby("thang")["order_id"].count())
print(df["product"].str.upper().str.contains("ÁO").sum())
print(df["order_id"].str[1:].astype(int).max())
```

## 10. Thống kê & tương quan

```python
import pandas as pd
st = pd.read_csv("students.csv")
print(st[["attendance", "study_hours", "midterm", "final"]].corr().round(2))
print(st["final"].mean(), st["final"].median(), st["final"].std())   # std mẫu (ddof=1)
print(st["final"].quantile([0.25, 0.5, 0.75]))
```

> Pandas bỏ qua NaN khi tính `mean/sum/std`. `df["col"].std()` dùng ddof=1 (độ lệch chuẩn **mẫu**), khác `np.std` (ddof=0).
