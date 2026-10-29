Chương 3–4 – Nhập dữ liệu và thao tác với Pandas. Các file sales.csv, customers.csv, students.csv, stocks.csv có sẵn.

===== pd01
@title: Đọc CSV và kích thước bảng
@level: easy
@topic: io
@fn: table_shape
::: statement
Viết hàm `table_shape(path)` đọc file CSV bằng Pandas và trả về tuple `(số dòng, số cột, list tên cột)`.

`table_shape("customers.csv")` → `(11, 4, ['customer_id', 'name', 'tier', 'age'])`
::: starter
import pandas as pd


def table_shape(path):
    pass


print(table_shape("customers.csv"))
::: solution
import pandas as pd


def table_shape(path):
    df = pd.read_csv(path)
    return df.shape[0], df.shape[1], list(df.columns)
::: tests
"customers.csv" ==> (11, 4, ['customer_id', 'name', 'tier', 'age'])
"sales.csv"
::: hidden
"students.csv"
"stocks.csv"
::: hints
- `pd.read_csv(path)`; `df.shape` là tuple (dòng, cột); `df.columns`.
::: explain
`df.shape`, `df.columns`, `df.dtypes`, `df.head()`, `df.info()`, `df.describe()` – 6 lệnh đầu tiên khi gặp bất kỳ bộ dữ liệu nào.

===== pd02
@title: Đọc dữ liệu từ chuỗi CSV
@level: easy
@topic: io
@fn: parse_csv_text
::: statement
Dữ liệu đôi khi là **chuỗi** (dán từ email, API…). Viết hàm `parse_csv_text(text)` đọc chuỗi CSV (dấu phân cách `;`) thành DataFrame, và trả về DataFrame đó **sắp xếp theo cột `price` giảm dần**, index đánh lại từ 0.

```
text = "item;price\nA;10\nB;30\nC;20"
# →   item  price
#  0    B     30
#  1    C     20
#  2    A     10
```
::: starter
import io
import pandas as pd


def parse_csv_text(text):
    pass


print(parse_csv_text("item;price\nA;10\nB;30\nC;20"))
::: solution
import io
import pandas as pd


def parse_csv_text(text):
    df = pd.read_csv(io.StringIO(text), sep=";")
    return df.sort_values("price", ascending=False).reset_index(drop=True)
::: tests
"item;price\nA;10\nB;30\nC;20"
::: hidden
"item;price;qty\nX;1.5;3\nY;2.5;1"
::: hints
- `pd.read_csv(io.StringIO(text), sep=";")`.
- `.sort_values("price", ascending=False).reset_index(drop=True)`.
::: explain
`reset_index(drop=True)` bỏ index cũ (0, 2, 1…) và đánh lại 0, 1, 2. Thiếu bước này DataFrame sẽ **không bằng** kết quả mong đợi.

===== pd03
@title: Báo cáo dữ liệu thiếu
@level: easy
@topic: pandas
@fn: missing_report
::: statement
Viết hàm `missing_report(df)` trả về **dict** `{tên cột: số ô thiếu}` **chỉ gồm các cột có thiếu** dữ liệu (theo thứ tự cột).

Thử với `pd.read_csv("sales.csv")`.
::: starter
import pandas as pd


def missing_report(df):
    pass


print(missing_report(pd.read_csv("sales.csv")))
::: solution
import pandas as pd


def missing_report(df):
    counts = df.isna().sum()
    return {col: int(n) for col, n in counts.items() if n > 0}
::: tests
pd.read_csv("sales.csv")
pd.read_csv("students.csv")
::: hidden
pd.read_csv("customers.csv") ==> {}
pd.DataFrame({'a': [1, None, None], 'b': ['x', 'y', None]}) ==> {'a': 2, 'b': 1}
::: hints
- `df.isna().sum()` đếm NaN mỗi cột (trả về Series).
::: explain
`isna()` tạo bảng True/False; `sum()` coi True = 1 nên ra số ô thiếu mỗi cột.

===== pd04
@title: Làm sạch dữ liệu bán hàng
@level: medium
@topic: pandas
@fn: clean_sales
::: statement
Viết hàm `clean_sales(df)` làm sạch bảng sales:
1. **Xoá dòng trùng lặp** hoàn toàn
2. Xoá các dòng **thiếu `region`**
3. Điền `quantity` thiếu bằng **trung vị** (median) của cột quantity (tính sau bước 2), rồi đổi cột quantity sang **int**
4. Thêm cột `revenue = quantity * unit_price`
5. **Đánh lại index** từ 0

Trả về DataFrame kết quả (không sửa df đầu vào).
::: starter
import pandas as pd


def clean_sales(df):
    pass


sales = pd.read_csv("sales.csv")
clean = clean_sales(sales)
print(clean.shape)
clean.head()
::: solution
import pandas as pd


def clean_sales(df):
    out = df.drop_duplicates().dropna(subset=["region"]).copy()
    out["quantity"] = out["quantity"].fillna(out["quantity"].median()).astype(int)
    out["revenue"] = out["quantity"] * out["unit_price"]
    return out.reset_index(drop=True)
::: tests
pd.read_csv("sales.csv")
::: hidden
pd.DataFrame({'region': ['A', None, 'B', 'B'], 'quantity': [1.0, 2.0, None, None], 'unit_price': [10, 20, 30, 30]})
::: hints
- `drop_duplicates()`, `dropna(subset=["region"])`, `fillna(...)`, `astype(int)`.
- Gọi `.copy()` sau khi lọc để tránh cảnh báo SettingWithCopyWarning.
::: explain
Thứ tự các bước quan trọng: trung vị phải tính **sau** khi đã xoá dòng trùng và dòng thiếu region, đúng như đề yêu cầu.

===== pd05
@title: Lọc theo nhiều điều kiện
@level: easy
@topic: pandas
@fn: big_orders
::: statement
Viết hàm `big_orders(df, region, min_qty)` trả về DataFrame các đơn hàng ở khu vực `region` **và** có `quantity >= min_qty`, chỉ giữ các cột `['order_id', 'product', 'quantity']`, index đánh lại từ 0.

`big_orders(pd.read_csv("sales.csv"), "Hà Nội", 8)`
::: starter
import pandas as pd


def big_orders(df, region, min_qty):
    pass


big_orders(pd.read_csv("sales.csv"), "Hà Nội", 8)
::: solution
import pandas as pd


def big_orders(df, region, min_qty):
    mask = (df["region"] == region) & (df["quantity"] >= min_qty)
    return df.loc[mask, ["order_id", "product", "quantity"]].reset_index(drop=True)
::: tests
pd.read_csv("sales.csv"), "Hà Nội", 8
pd.read_csv("sales.csv"), "TP.HCM", 5
::: hidden
pd.read_csv("sales.csv"), "Cần Thơ", 1
pd.read_csv("sales.csv"), "Đà Nẵng", 1
::: hints
- Kết hợp điều kiện bằng `&` (và), `|` (hoặc), mỗi điều kiện trong **ngoặc tròn**.
- `df.loc[mask, [các cột]]`.
::: explain
Dùng `and`/`or` với Series sẽ báo lỗi *"The truth value of a Series is ambiguous"* – phải dùng `&`, `|`, `~` và bọc ngoặc.

===== pd06
@title: Doanh thu theo khu vực (groupby)
@level: medium
@topic: pandas
@fn: revenue_by_region
::: statement
Viết hàm `revenue_by_region(df)`:
1. bỏ các dòng thiếu `region` hoặc `quantity`
2. tính doanh thu từng dòng = quantity × unit_price
3. trả về **Series** tổng doanh thu theo `region`, **sắp xếp giảm dần**
::: starter
import pandas as pd


def revenue_by_region(df):
    pass


revenue_by_region(pd.read_csv("sales.csv"))
::: solution
import pandas as pd


def revenue_by_region(df):
    d = df.dropna(subset=["region", "quantity"])
    revenue = d["quantity"] * d["unit_price"]
    return revenue.groupby(d["region"]).sum().sort_values(ascending=False)
::: tests
pd.read_csv("sales.csv")
::: hidden
pd.DataFrame({'region': ['A', 'B', 'A', None], 'quantity': [1, 2, 3, 4], 'unit_price': [10, 1, 10, 100]})
::: hints
- `df.groupby("region")["revenue"].sum()` sau khi tạo cột revenue.
- `.sort_values(ascending=False)`.
::: explain
**Split – Apply – Combine**: `groupby` chia nhóm, áp hàm tổng hợp (`sum`, `mean`, `count`, `agg`), rồi gộp kết quả.

===== pd07
@title: Top N sản phẩm doanh thu cao nhất
@level: medium
@topic: pandas
@fn: top_products
::: statement
Viết hàm `top_products(df, n)` trả về **list tên** n sản phẩm có tổng doanh thu (quantity × unit_price, bỏ dòng thiếu quantity) cao nhất, giảm dần.
::: starter
import pandas as pd


def top_products(df, n):
    pass


print(top_products(pd.read_csv("sales.csv"), 3))
::: solution
import pandas as pd


def top_products(df, n):
    d = df.dropna(subset=["quantity"]).assign(revenue=lambda x: x["quantity"] * x["unit_price"])
    return d.groupby("product")["revenue"].sum().nlargest(n).index.tolist()
::: tests
pd.read_csv("sales.csv"), 3
pd.read_csv("sales.csv"), 1
::: hidden
pd.read_csv("sales.csv"), 9
::: hints
- `groupby("product")["revenue"].sum().nlargest(n)` rồi lấy `.index.tolist()`.
::: explain
`nlargest(n)` = `sort_values(ascending=False).head(n)`.

===== pd08
@title: Bảng pivot khu vực × danh mục
@level: medium
@topic: pandas
@fn: region_category_pivot
::: statement
Viết hàm `region_category_pivot(df)` (bỏ dòng thiếu region/quantity) trả về bảng pivot: **hàng = region**, **cột = category**, giá trị = **tổng số lượng** (quantity), ô trống điền **0**, kiểu int.
::: starter
import pandas as pd


def region_category_pivot(df):
    pass


region_category_pivot(pd.read_csv("sales.csv"))
::: solution
import pandas as pd


def region_category_pivot(df):
    d = df.dropna(subset=["region", "quantity"])
    return d.pivot_table(index="region", columns="category", values="quantity",
                         aggfunc="sum", fill_value=0).astype(int)
::: tests
pd.read_csv("sales.csv")
::: hidden
pd.DataFrame({'region': ['A', 'A', 'B'], 'category': ['x', 'y', 'x'], 'quantity': [1.0, 2.0, 5.0]})
::: hints
- `df.pivot_table(index=..., columns=..., values=..., aggfunc="sum", fill_value=0)`.
::: explain
`pivot_table` = groupby 2 chiều. Tương đương `df.groupby(["region", "category"])["quantity"].sum().unstack(fill_value=0)`.

===== pd09
@title: Ghép bảng đơn hàng với khách hàng (merge)
@level: medium
@topic: pandas
@fn: orders_by_tier
::: statement
Viết hàm `orders_by_tier(sales, customers)`:
1. ghép (**inner join**) hai bảng theo `customer_id`
2. trả về **dict** `{tier: số đơn hàng}` (đếm số dòng sau khi ghép, bao gồm cả dòng trùng)

`orders_by_tier(pd.read_csv("sales.csv"), pd.read_csv("customers.csv"))`
::: starter
import pandas as pd


def orders_by_tier(sales, customers):
    pass


print(orders_by_tier(pd.read_csv("sales.csv"), pd.read_csv("customers.csv")))
::: solution
import pandas as pd


def orders_by_tier(sales, customers):
    merged = sales.merge(customers, on="customer_id", how="inner")
    return {k: int(v) for k, v in merged["tier"].value_counts().items()}
::: tests
pd.read_csv("sales.csv"), pd.read_csv("customers.csv")
::: hidden
pd.DataFrame({'customer_id': ['C01', 'C99', 'C01']}), pd.DataFrame({'customer_id': ['C01'], 'tier': ['Vàng']}) ==> {'Vàng': 2}
::: hints
- `sales.merge(customers, on="customer_id", how="inner")`.
- `value_counts()` đếm số lần xuất hiện mỗi giá trị.
::: explain
4 kiểu join: `inner` (chỉ khớp), `left` (giữ hết bảng trái), `right`, `outer`. Hiểu rõ để không mất / nhân bản dữ liệu.

===== pd10
@title: Doanh thu theo tháng
@level: medium
@topic: pandas
@fn: monthly_revenue
::: statement
Viết hàm `monthly_revenue(df)` (bỏ dòng thiếu quantity):
1. chuyển cột `date` sang kiểu ngày (`pd.to_datetime`)
2. tính doanh thu từng dòng
3. trả về **dict** `{"YYYY-MM": tổng doanh thu}` sắp xếp theo tháng tăng dần (giá trị là int)

Ví dụ một phần tử: `'2024-01': 123456`
::: starter
import pandas as pd


def monthly_revenue(df):
    pass


print(monthly_revenue(pd.read_csv("sales.csv")))
::: solution
import pandas as pd


def monthly_revenue(df):
    d = df.dropna(subset=["quantity"]).copy()
    d["date"] = pd.to_datetime(d["date"])
    d["revenue"] = d["quantity"] * d["unit_price"]
    s = d.groupby(d["date"].dt.strftime("%Y-%m"))["revenue"].sum().sort_index()
    return {k: int(v) for k, v in s.items()}
::: tests
pd.read_csv("sales.csv")
::: hidden
pd.DataFrame({'date': ['2024-02-03', '2024-01-31', '2024-02-28'], 'quantity': [1, 2, 3], 'unit_price': [100, 10, 1]}) ==> {'2024-01': 20, '2024-02': 103}
::: hints
- `pd.to_datetime(df["date"])`, rồi `.dt.strftime("%Y-%m")` hoặc `.dt.to_period("M")`.
::: explain
Accessor `.dt` cho cột ngày: `.dt.year`, `.dt.month`, `.dt.day_name()`, `.dt.strftime(...)`.

===== pd11
@title: Xếp loại sinh viên với apply
@level: medium
@topic: pandas
@fn: classify_students
::: statement
Viết hàm `classify_students(df)` với bảng students:
1. bỏ sinh viên thiếu `midterm` hoặc `final`
2. tính `total = 0.1 × chuyên cần + 0.3 × midterm + 0.6 × final`, trong đó điểm chuyên cần = `attendance / 15 × 10`; làm tròn 1 chữ số
3. cột `rank`: `"Giỏi"` nếu total ≥ 8, `"Khá"` nếu ≥ 6.5, `"TB"` nếu ≥ 5, còn lại `"Yếu"`
4. trả về DataFrame gồm các cột `['student_id', 'total', 'rank']`, index đánh lại từ 0
::: starter
import pandas as pd


def classify_students(df):
    pass


classify_students(pd.read_csv("students.csv")).head(10)
::: solution
import pandas as pd


def rank_of(t):
    if t >= 8:
        return "Giỏi"
    if t >= 6.5:
        return "Khá"
    if t >= 5:
        return "TB"
    return "Yếu"


def classify_students(df):
    d = df.dropna(subset=["midterm", "final"]).copy()
    d["total"] = (0.1 * d["attendance"] / 15 * 10 + 0.3 * d["midterm"] + 0.6 * d["final"]).round(1)
    d["rank"] = d["total"].apply(rank_of)
    return d[["student_id", "total", "rank"]].reset_index(drop=True)
::: tests
pd.read_csv("students.csv")
::: hidden
pd.DataFrame({'student_id': ['a', 'b', 'c'], 'attendance': [15, 0, 10], 'midterm': [10, 5, None], 'final': [10, 4, 8]})
::: hints
- Phép tính trên cả cột là vector hoá: `0.3 * d["midterm"]`.
- `d["total"].apply(ham)` áp hàm cho từng phần tử.
::: explain
Cũng có thể dùng `pd.cut(total, bins=[-1, 5, 6.5, 8, 11], right=False, labels=[...])` để phân loại theo khoảng.

===== pd12
@title: Thống kê điểm theo lớp
@level: medium
@topic: pandas
@fn: class_summary
::: statement
Viết hàm `class_summary(df)` trả về DataFrame, mỗi hàng là một `class` (index), các cột:
- `n`: số sinh viên **có điểm final**
- `mean_final`: trung bình final (làm tròn 2)
- `max_final`: điểm final cao nhất
- `pass_rate`: tỉ lệ (0–1, làm tròn 2) sinh viên có final ≥ 5 trên số sinh viên **có điểm final**
::: starter
import pandas as pd


def class_summary(df):
    pass


class_summary(pd.read_csv("students.csv"))
::: solution
import pandas as pd


def class_summary(df):
    d = df.dropna(subset=["final"])
    g = d.groupby("class")["final"]
    return pd.DataFrame({
        "n": g.count(),
        "mean_final": g.mean().round(2),
        "max_final": g.max(),
        "pass_rate": g.apply(lambda s: (s >= 5).mean()).round(2),
    })
::: tests
pd.read_csv("students.csv")
::: hidden
pd.DataFrame({'class': ['A', 'A', 'B'], 'final': [4.0, 6.0, None]})
::: hints
- `df.groupby("class")["final"].agg(["count", "mean", "max"])` rồi đổi tên cột.
- Tỉ lệ đậu: trung bình của biểu thức boolean `(s >= 5).mean()`.
::: explain
Mẹo: **trung bình của một cột True/False chính là tỉ lệ True**.

===== pd13
@title: Tương quan giờ học và điểm
@level: medium
@topic: pandas
@fn: study_correlation
::: statement
Viết hàm `study_correlation(df)` trả về **hệ số tương quan Pearson** giữa `study_hours` và `final` (bỏ dòng thiếu final), làm tròn 3 chữ số (float).
::: starter
import pandas as pd


def study_correlation(df):
    pass


print(study_correlation(pd.read_csv("students.csv")))
::: solution
import pandas as pd


def study_correlation(df):
    d = df.dropna(subset=["final"])
    return round(float(d["study_hours"].corr(d["final"])), 3)
::: tests
pd.read_csv("students.csv")
::: hidden
pd.DataFrame({'study_hours': [1, 2, 3], 'final': [2, 4, 6]}) ==> 1.0
pd.DataFrame({'study_hours': [1, 2, 3, 4], 'final': [8, 6, None, 2]}) ==> -1.0
::: hints
- `series1.corr(series2)` hoặc `df[["a", "b"]].corr()`.
::: explain
Hệ số tương quan r ∈ [−1, 1]: gần 1 – cùng chiều mạnh, gần −1 – ngược chiều mạnh, gần 0 – không có quan hệ **tuyến tính**.

===== pd14
@title: Lợi suất cổ phiếu
@level: hard
@topic: pandas
@fn: stock_returns
::: statement
Với bảng `stocks.csv` (date, ticker, close, volume), viết hàm `stock_returns(df)`:
1. pivot thành bảng: index = date, cột = ticker, giá trị = close
2. tính lợi suất ngày `pct_change()` (bỏ hàng đầu tiên NaN)
3. trả về tuple `(mã có lợi suất trung bình cao nhất, mã có độ biến động (std) cao nhất, lợi suất tích luỹ của từng mã dạng dict làm tròn 4)` với lợi suất tích luỹ = close cuối / close đầu − 1
::: starter
import pandas as pd


def stock_returns(df):
    pass


print(stock_returns(pd.read_csv("stocks.csv")))
::: solution
import pandas as pd


def stock_returns(df):
    prices = df.pivot(index="date", columns="ticker", values="close").sort_index()
    rets = prices.pct_change().dropna()
    cumulative = (prices.iloc[-1] / prices.iloc[0] - 1).round(4)
    return rets.mean().idxmax(), rets.std().idxmax(), {k: float(v) for k, v in cumulative.items()}
::: tests
pd.read_csv("stocks.csv")
::: hidden
pd.DataFrame({'date': ['d1', 'd1', 'd2', 'd2', 'd3', 'd3'], 'ticker': ['A', 'B'] * 3, 'close': [10, 10, 11, 9, 12, 12], 'volume': [1] * 6}) ==> ('B', 'B', {'A': 0.2, 'B': 0.2})
::: hints
- `df.pivot(index=..., columns=..., values=...)`.
- `idxmax()` trả về **nhãn** (tên mã) của giá trị lớn nhất.
- `iloc[0]` / `iloc[-1]` lấy hàng đầu / cuối.
::: explain
`loc` dùng **nhãn**, `iloc` dùng **vị trí số nguyên** – câu hỏi lý thuyết kinh điển.

===== pd15
@title: Phân tích artifact bằng DataFrame
@level: medium
@topic: pandas
@source: Tuyển tập – P2.9 (bản DataFrame)
@fn: nearest_artifacts
::: statement
DataFrame có cột `Name`, `Value`, `X`, `Y`. Viết hàm `nearest_artifacts(df, k)` trả về **list tên** k artifact (khác artifact giá trị cao nhất) gần artifact **giá trị cao nhất** nhất (khoảng cách Euclid tăng dần). Dùng thao tác vector hoá của Pandas, không dùng vòng lặp.
::: starter
import numpy as np
import pandas as pd


def nearest_artifacts(df, k):
    pass


df = pd.DataFrame({'Name': ['Crystal Orb', 'Phoenix Feather', 'Silver Rune', 'Dragon Scale', 'Mystic Scroll', 'Golden Chalice'],
                   'Value': [120, 300, 250, 500, 150, 450],
                   'X': [2, 5, 6, 7, 1, 9], 'Y': [3, 7, 9, 8, 2, 10]})
print(nearest_artifacts(df, 3))
::: solution
import numpy as np
import pandas as pd


def nearest_artifacts(df, k):
    best = df.loc[df["Value"].idxmax()]
    others = df.drop(index=best.name)
    dist = np.sqrt((others["X"] - best["X"]) ** 2 + (others["Y"] - best["Y"]) ** 2)
    return others.loc[dist.sort_values(kind="stable").index[:k], "Name"].tolist()
::: tests
pd.DataFrame({'Name': ['Crystal Orb', 'Phoenix Feather', 'Silver Rune', 'Dragon Scale', 'Mystic Scroll', 'Golden Chalice'], 'Value': [120, 300, 250, 500, 150, 450], 'X': [2, 5, 6, 7, 1, 9], 'Y': [3, 7, 9, 8, 2, 10]}), 3 ==> ['Silver Rune', 'Phoenix Feather', 'Golden Chalice']
::: hidden
pd.DataFrame({'Name': ['a', 'b', 'c'], 'Value': [1, 3, 2], 'X': [0, 0, 5], 'Y': [0, 1, 1]}), 5 ==> ['a', 'c']
::: hints
- `df["Value"].idxmax()` cho index của dòng giá trị lớn nhất.
- Tính khoảng cách cho cả cột cùng lúc rồi `sort_values()`.
::: explain
So sánh với bản dùng list-of-dict: Pandas giúp code ngắn và nhanh hơn với dữ liệu lớn.

===== pd16
@title: Khách hàng chi tiêu nhiều nhất mỗi hạng
@level: hard
@topic: pandas
@fn: top_customer_per_tier
::: statement
Viết hàm `top_customer_per_tier(sales, customers)`:
1. bỏ dòng trùng và dòng thiếu quantity trong sales, tính doanh thu
2. tổng chi tiêu theo `customer_id`, ghép với bảng customers
3. trả về **dict** `{tier: tên khách chi tiêu nhiều nhất trong hạng đó}`, sắp xếp key theo bảng chữ cái
::: starter
import pandas as pd


def top_customer_per_tier(sales, customers):
    pass


print(top_customer_per_tier(pd.read_csv("sales.csv"), pd.read_csv("customers.csv")))
::: solution
import pandas as pd


def top_customer_per_tier(sales, customers):
    s = sales.drop_duplicates().dropna(subset=["quantity"])
    spend = (s["quantity"] * s["unit_price"]).groupby(s["customer_id"]).sum().rename("spend").reset_index()
    m = spend.merge(customers, on="customer_id")
    best = m.loc[m.groupby("tier")["spend"].idxmax()]
    return dict(sorted(zip(best["tier"], best["name"])))
::: tests
pd.read_csv("sales.csv"), pd.read_csv("customers.csv")
::: hidden
pd.DataFrame({'customer_id': ['C1', 'C2', 'C1'], 'quantity': [1, 5, 1], 'unit_price': [10, 1, 10]}), pd.DataFrame({'customer_id': ['C1', 'C2'], 'name': ['An', 'Bình'], 'tier': ['Vàng', 'Vàng']}) ==> {'Vàng': 'An'}
::: hints
- `groupby("tier")["spend"].idxmax()` trả về index của dòng lớn nhất mỗi nhóm → dùng `.loc[...]`.
::: explain
Mẫu "dòng có giá trị lớn nhất trong mỗi nhóm" = `df.loc[df.groupby(g)[col].idxmax()]` – rất đáng thuộc.
