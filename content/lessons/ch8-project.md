@title: Dự án phân tích dữ liệu với Python
@chapter: 8
@summary: Làm dự án nhóm (30% điểm) theo đúng tiêu chí chấm: xác định vấn đề, làm sạch có kiểm chứng, EDA có chủ đích, mô hình và diễn giải, code dễ hiểu và trình bày.

Đề cương chấm dự án nhóm (30%) theo 3 tiêu chí: **(1) xác định vấn đề rõ ràng, hợp lý, khả thi; (2) chương trình viết dễ hiểu; (3) chương trình chạy đúng, ra kết quả theo yêu cầu**. Năm bài nhỏ dưới đây đi qua từng giai đoạn, ví dụ xuyên suốt là bộ `cars.csv`.

> **Đối chiếu tài liệu FTU:** Buổi 12–15: dự án nhóm 30% (tiêu chí trong đề cương) và trình bày cuối kỳ. Các báo cáo nhóm TIN314 (lớp ML144…) được chia sẻ công khai thường phân tích giá bất động sản, hành vi khách hàng, trì hoãn chuyến bay – đúng quy trình trong chương này.

@@@ c8-1 | Xác định vấn đề và câu hỏi phân tích
@ftu: Đề cương QLĐT – tiêu chí "xác định vấn đề rõ ràng, hợp lý, khả thi"
@goal: Viết câu hỏi phân tích rõ ràng, đo được và khả thi với dữ liệu có sẵn; chia thành 3–5 câu hỏi con.

Câu hỏi tốt **cụ thể – đo được – có dữ liệu để trả lời**:

| Kém | Tốt |
|---|---|
| "Phân tích thị trường ô tô" | "Những đặc điểm kỹ thuật nào ảnh hưởng nhiều nhất tới giá xe, và dự đoán giá sai lệch trung bình bao nhiêu?" |
| "Sinh viên học thế nào?" | "Số giờ tự học và chuyên cần giải thích được bao nhiêu % biến động điểm cuối kỳ TIN314?" |

Từ câu hỏi chính, tách các **câu hỏi con**, mỗi câu ứng với một bảng hoặc biểu đồ:
1. Giá xe phân bố thế nào? (histogram)
2. Giá khác nhau giữa các hệ dẫn động? (boxplot + ANOVA)
3. Biến số nào tương quan mạnh với giá? (ma trận tương quan)
4. Mô hình nào dự đoán tốt nhất trên dữ liệu kiểm tra? (bảng R², RMSE)

??
Câu hỏi nào **khả thi** nhất với bộ `cars.csv` (hãng, nhiên liệu, kiểu thân, dẫn động, động cơ, công suất, khối lượng, mpg, giá)?
- [ ] Màu xe nào bán chạy nhất năm 2024?
- [x] Công suất và khối lượng xe giải thích bao nhiêu % biến động giá?
- [ ] Khách hàng nữ thích hãng xe nào?
- [ ] Giá xe sẽ thế nào sau 10 năm?
> Chỉ câu này dùng các cột có trong dữ liệu. Các câu khác cần dữ liệu màu xe, khách hàng, hoặc chuỗi thời gian dài.

??
Tiêu chí "xác định vấn đề **rõ ràng**" nghĩa là:
- [ ] Đề tài càng rộng càng tốt
- [x] Người đọc hiểu ngay cần trả lời câu hỏi gì, đo bằng chỉ số nào
- [ ] Dùng càng nhiều thuật ngữ càng tốt
- [ ] Có ít nhất 10 câu hỏi
> Một câu hỏi chính + vài câu hỏi con đo được là đủ.

Kiểm tra tính khả thi ngay từ đầu: dữ liệu có bao nhiêu dòng, những cột nào bị thiếu nhiều?

```python
import pandas as pd
df = pd.read_csv("cars.csv", na_values="?")
print(df.shape)
print((df.isna().mean() * 100).round(1).sort_values(ascending=False).head(4))
print(df.dtypes.value_counts())
```

??
Một cột bị thiếu 85% giá trị. Cách xử lý hợp lý nhất khi lập kế hoạch dự án:
- [ ] Điền bằng trung bình rồi dùng như bình thường
- [x] Cân nhắc bỏ cột hoặc đổi câu hỏi – không nên dựa vào cột này
- [ ] Bỏ 85% số dòng
- [ ] Không cần quan tâm
> Điền 85% bằng giá trị "bịa" làm cột gần như vô nghĩa; hãy ghi rõ hạn chế trong báo cáo.

@@@ c8-2 | Làm sạch dữ liệu có kiểm chứng
@ftu: Đáp án 20 câu thực hành FTU câu 2 – làm sạch rồi `to_csv` file sạch; tiêu chí "chạy đúng"
@goal: Gom toàn bộ bước làm sạch vào một hàm có thể chạy lại, ghi lại quyết định và kiểm tra kết quả bằng `assert`.

Đừng làm sạch rải rác ở nhiều ô notebook. Viết **một hàm** – chạy lại từ đầu bất cứ lúc nào, ra cùng kết quả (tiêu chí "chạy đúng"):

```python
import pandas as pd

def lam_sach(path):
    """Đọc và làm sạch cars.csv. Trả về DataFrame sẵn sàng phân tích."""
    df = pd.read_csv(path, na_values="?")
    n0 = len(df)
    df = df.drop_duplicates()
    df = df.dropna(subset=["price"])                                       # biến mục tiêu: bỏ dòng thiếu
    df["horsepower"] = df["horsepower"].fillna(df["horsepower"].mean())    # biến đầu vào: điền TB
    df["highway_L100km"] = (235 / df["highway_mpg"]).round(2)              # đổi đơn vị
    df = pd.concat([df, pd.get_dummies(df["fuel_type"], prefix="fuel", dtype=int)], axis=1)
    print(f"Làm sạch: {n0} → {len(df)} dòng")
    return df

df = lam_sach("cars.csv")

# Kiểm chứng – sai là báo lỗi ngay
assert df["price"].notna().all()
assert df["horsepower"].isna().sum() == 0
assert (df["price"] > 0).all()
print("Đạt mọi kiểm tra ✓", df.shape)
```

??
`assert df["price"].notna().all()` làm gì?
- [ ] Xoá giá trị thiếu
- [x] Dừng chương trình với `AssertionError` nếu còn giá trị thiếu
- [ ] In số ô thiếu
- [ ] Điền 0 vào ô thiếu
> `assert điều_kiện` không làm gì nếu điều kiện đúng; sai thì báo lỗi – "lưới an toàn" cho dữ liệu.

??
Vì sao nên gom làm sạch vào một hàm thay vì sửa tay từng ô?
- [ ] Hàm chạy nhanh hơn
- [x] Chạy lại được từ đầu, dễ kiểm tra, đồng đội đọc hiểu được các quyết định
- [ ] Vì Pandas bắt buộc
- [ ] Để file nhỏ hơn
> Notebook chạy các ô lộn thứ tự là nguồn lỗi "trên máy em chạy được" kinh điển.

??
Trong báo cáo, phần làm sạch nên ghi:
- [ ] Không cần ghi
- [x] Đã xoá/điền những gì, theo cách nào, số dòng trước và sau, vì sao
- [ ] Chỉ ghi số dòng cuối cùng
- [ ] Toàn bộ code
> Người chấm cần thấy quyết định hợp lý và có lý do.

@@@ c8-3 | Khám phá dữ liệu có chủ đích
@ftu: Báo cáo nhóm TIN314 ML144 (bất động sản, chuyến bay, khách hàng) – cấu trúc EDA
@goal: Mỗi câu hỏi con có một bảng/biểu đồ và **một câu nhận xét**; dùng hàm để tạo các bảng tổng hợp lặp lại.

EDA trong dự án không phải "vẽ thật nhiều" – mỗi biểu đồ trả lời **một** câu hỏi con và kèm **một câu kết luận**.

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("cars.csv", na_values="?").dropna(subset=["price"])

def tong_hop(df, nhom, gia_tri="price"):
    """Bảng số lượng, trung bình, trung vị của gia_tri theo nhom – sắp giảm dần theo trung bình."""
    return (df.groupby(nhom)[gia_tri].agg(so_xe="count", tb="mean", trung_vi="median")
              .round(0).sort_values("tb", ascending=False))

print(tong_hop(df, "drive_wheels"))
print(tong_hop(df, "make").head(3))

fig, axes = plt.subplots(1, 2, figsize=(10, 3.5))
df["price"].plot(kind="hist", bins=12, ax=axes[0], title="Q1. Phân phối giá")
df.boxplot(column="price", by="drive_wheels", ax=axes[1])
axes[1].set_title("Q2. Giá theo hệ dẫn động")
fig.suptitle("")
fig.tight_layout()
plt.show()
```

**Nhận xét mẫu:** *"Xe dẫn động cầu sau (rwd) có giá trung vị cao gần gấp đôi xe cầu trước (fwd); khác biệt có ý nghĩa thống kê (ANOVA p < 0.001)."*

??
Một nhận xét EDA tốt nên:
- [ ] Mô tả lại biểu đồ có màu gì
- [x] Nêu phát hiện chính bằng con số cụ thể và liên hệ câu hỏi
- [ ] Dài ít nhất một trang
- [ ] Chỉ ghi "xem biểu đồ"
> Ví dụ: "Giá trung bình xe rwd ≈ 37 000, cao hơn fwd ≈ 17 000".

??
Viết hàm `tong_hop(df, nhom)` thay vì copy-paste code groupby cho từng cột có lợi gì?
- [x] Ít lặp code, sửa một chỗ áp dụng mọi nơi – đúng tiêu chí "chương trình dễ hiểu"
- [ ] Bắt buộc với Pandas
- [ ] Làm kết quả chính xác hơn
- [ ] Không có lợi gì
> Nguyên tắc DRY – Don't Repeat Yourself.

??
Đồ thị nào trả lời câu hỏi "giá có khác nhau giữa các nhóm dẫn động"?
- [ ] Biểu đồ đường theo thời gian
- [x] Boxplot giá theo nhóm (kèm ANOVA)
- [ ] Biểu đồ tròn
- [ ] Histogram của horsepower
> Boxplot so sánh phân phối của một biến số giữa các nhóm.

@@@ c8-4 | Mô hình và diễn giải cho người không chuyên
@ftu: Đáp án 20 câu thực hành FTU câu 4–5, 10 – diễn giải hệ số, so sánh sai số
@goal: So sánh vài mô hình trên tập kiểm tra trong một bảng, chọn mô hình hợp lý và diễn giải hệ số/sai số bằng ngôn ngữ kinh doanh.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv("cars.csv", na_values="?").dropna()
cols = ["horsepower", "curb_weight", "engine_size", "highway_mpg"]
X_tr, X_te, y_tr, y_te = train_test_split(df[cols], df["price"], test_size=0.3, random_state=1)

models = {
    "Hồi quy đơn (horsepower)": (make_pipeline(LinearRegression()), ["horsepower"]),
    "Hồi quy bội (4 biến)": (make_pipeline(LinearRegression()), cols),
    "Đa thức bậc 2 + Ridge": (make_pipeline(StandardScaler(), PolynomialFeatures(2), Ridge(alpha=10)), cols),
}
rows = []
for ten, (m, c) in models.items():
    m.fit(X_tr[c], y_tr)
    pred = m.predict(X_te[c])
    rows.append({"mô hình": ten, "R² test": round(r2_score(y_te, pred), 3),
                 "RMSE test": round(float(np.sqrt(mean_squared_error(y_te, pred))))})
print(pd.DataFrame(rows).to_string(index=False))
```

**Diễn giải cho người không chuyên:**
- *"Mô hình giải thích khoảng 80% chênh lệch giá giữa các xe."* (R²)
- *"Dự đoán thường lệch khoảng ±5 000 so với giá thật."* (RMSE)
- *"Mỗi 10 mã lực tăng thêm, giá tăng khoảng 3 000, khi các yếu tố khác như nhau."* (hệ số)

??
Câu diễn giải RMSE = 5200 nào phù hợp cho nhà quản lý?
- [ ] "Căn bậc hai sai số bình phương trung bình bằng 5200"
- [x] "Giá dự đoán thường lệch khoảng 5 200 so với giá thật"
- [ ] "Mô hình đúng 52%"
- [ ] "R² bằng 5200"
> RMSE cùng đơn vị với giá – diễn giải như mức sai lệch điển hình.

??
Mô hình phức tạp có R² test 0.82, mô hình hồi quy bội 4 biến có R² test 0.80 và dễ giải thích hơn nhiều. Với dự án môn học nên:
- [ ] Luôn chọn mô hình phức tạp
- [x] Có thể chọn mô hình đơn giản hơn và giải thích lý do (chênh lệch nhỏ, dễ diễn giải)
- [ ] Không chọn mô hình nào
- [ ] Chọn mô hình có R² train cao nhất
> Đánh đổi giữa độ chính xác và khả năng diễn giải là một quyết định hợp lý cần nêu trong báo cáo.

??
Hạn chế nào **nên** nêu trong báo cáo?
- [ ] Không nên nêu hạn chế vì bị trừ điểm
- [x] Dữ liệu nhỏ (khoảng 70 xe), chỉ một lần chia train/test, có thể thiếu biến quan trọng (thương hiệu, năm sản xuất)
- [ ] Python chạy chậm
- [ ] Biểu đồ không đủ màu
> Nêu hạn chế cho thấy bạn hiểu giới hạn của kết quả – là điểm cộng.

@@@ c8-5 | Code dễ hiểu và trình bày dự án
@ftu: Đề cương QLĐT – tiêu chí "chương trình viết dễ hiểu"; Buổi 15 – trình bày dự án
@goal: Tổ chức notebook theo cấu trúc chuẩn, đặt tên – comment – tách hàm đúng cách, chuẩn bị báo cáo và thuyết trình theo tiêu chí chấm.

### Cấu trúc notebook / báo cáo gợi ý

1. **Giới thiệu** – bối cảnh, câu hỏi chính, câu hỏi con
2. **Dữ liệu** – nguồn, mô tả các cột, số dòng
3. **Làm sạch** – hàm `lam_sach()` + bảng trước/sau
4. **Khám phá** – mỗi câu hỏi con: biểu đồ + một câu kết luận
5. **Mô hình** – bảng so sánh trên tập test, mô hình được chọn
6. **Kết luận & hạn chế** – trả lời câu hỏi chính bằng con số, hạn chế, hướng mở rộng

### Viết code dễ hiểu

```python
# ✗ Khó hiểu
def f(d):
    return sum(x["q"] * x["p"] for x in d) / len(d) if d else 0

# ✓ Dễ hiểu: tên rõ nghĩa, docstring, từng bước
def gia_tri_tb_don(ds_don):
    """Giá trị trung bình mỗi đơn hàng = tổng doanh thu / số đơn."""
    if not ds_don:
        return 0
    tong_doanh_thu = sum(don["so_luong"] * don["don_gia"] for don in ds_don)
    return tong_doanh_thu / len(ds_don)

print(gia_tri_tb_don([{"so_luong": 2, "don_gia": 50}, {"so_luong": 1, "don_gia": 100}]))
```

Quy tắc: tên biến **nói lên ý nghĩa**; mỗi hàm làm **một việc**; hằng số đặt tên (`NGUONG_DAT = 5`); comment giải thích **vì sao**, không nhắc lại code làm gì; chạy lại notebook **từ đầu đến cuối** (Restart & Run All) trước khi nộp.

??
Comment nào hữu ích nhất?
- [ ] `x = x + 1  # cộng x thêm 1`
- [x] `df = df.dropna(subset=["price"])  # giá là biến mục tiêu nên không điền, chỉ bỏ`
- [ ] `# code`
- [ ] `import pandas as pd  # import pandas`
> Comment tốt giải thích **lý do** của quyết định.

??
Trước khi nộp notebook, việc **quan trọng nhất** để đảm bảo tiêu chí "chương trình chạy đúng" là:
- [ ] Xoá hết output
- [x] Restart kernel và chạy toàn bộ từ đầu, không lỗi
- [ ] Đổi tên file
- [ ] Thêm nhiều màu cho biểu đồ
> Notebook chỉ chạy được nhờ biến còn sót lại trong bộ nhớ sẽ lỗi trên máy người chấm.

??
Trong buổi thuyết trình dự án (buổi 15), nên bắt đầu bằng:
- [ ] Toàn bộ code từ dòng đầu
- [x] Câu hỏi chính và câu trả lời ngắn gọn bằng con số
- [ ] Lịch sử ngôn ngữ Python
- [ ] Danh sách thư viện đã dùng
> Người nghe cần biết ngay "nhóm tìm ra điều gì"; chi tiết kỹ thuật để sau.
