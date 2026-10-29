@title: Dự án phân tích dữ liệu với Python
@chapter: 8
@summary: Khung dự án nhóm (30% điểm): chọn đề tài, cấu trúc notebook, mẫu code end-to-end và cách trình bày.

## 1. Tiêu chí chấm dự án (theo đề cương)

| Tiêu chí | Cách đạt điểm cao |
|---|---|
| **Xác định vấn đề rõ ràng, hợp lý, khả thi** | Câu hỏi cụ thể, đo được, có dữ liệu để trả lời |
| **Chương trình dễ hiểu** | Chia hàm, đặt tên biến có nghĩa, chú thích, notebook có tiêu đề từng phần |
| **Chương trình chạy đúng, ra kết quả theo yêu cầu** | "Restart & Run all" chạy không lỗi; kết quả có biểu đồ + kết luận |

## 2. Gợi ý đề tài phù hợp sinh viên FTU

- Phân tích giá cổ phiếu VN30: lợi suất, biến động, tương quan giữa các ngành.
- Dữ liệu xuất nhập khẩu Việt Nam (Tổng cục Hải quan / World Bank): xu hướng, thị trường chính.
- Phân khúc khách hàng thương mại điện tử bằng RFM + K-Means.
- Dự đoán giá nhà/căn hộ Hà Nội từ dữ liệu rao bán.
- Khảo sát sinh viên: thời gian tự học, làm thêm và kết quả học tập.

Nguồn dữ liệu mở: Kaggle, World Bank Open Data, GSO (Tổng cục Thống kê), vnstock (cổ phiếu).

## 3. Cấu trúc notebook chuẩn

1. **Giới thiệu** – bối cảnh, câu hỏi nghiên cứu, mô tả dữ liệu
2. **Nhập & làm sạch** – xử lý thiếu, trùng, sai kiểu; ghi lại mọi quyết định
3. **EDA** – thống kê mô tả, 4–6 biểu đồ có nhận xét
4. **Mô hình** – chia train/test, ít nhất 2 mô hình để so sánh
5. **Đánh giá** – chỉ số phù hợp, so với baseline
6. **Kết luận & khuyến nghị** – trả lời câu hỏi ban đầu, hạn chế, hướng phát triển

## 4. Mẫu dự án end-to-end (chạy thử từng bước)

**Câu hỏi:** *Giờ tự học và số buổi đi học ảnh hưởng thế nào đến điểm cuối kỳ TIN314? Có thể cảnh báo sớm sinh viên có nguy cơ trượt không?*

### Bước 1–2: Nhập và làm sạch

```python
import pandas as pd

def load_and_clean(path):
    df = pd.read_csv(path)
    report = {"ban_dau": len(df), "thieu_final": int(df["final"].isna().sum())}
    df = df.dropna(subset=["final"]).copy()
    df["midterm"] = df["midterm"].fillna(df["midterm"].median())
    df["passed"] = (df["final"] >= 5).astype(int)
    report["sau_lam_sach"] = len(df)
    return df, report

df, report = load_and_clean("students.csv")
print(report)
df.head()
```

### Bước 3: Khám phá dữ liệu (EDA)

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv").dropna(subset=["final"])
print(df[["attendance", "study_hours", "midterm", "final"]].describe().round(2))
print("\nTương quan với điểm cuối kỳ:")
print(df[["attendance", "study_hours", "midterm", "final"]].corr()["final"].round(2))

fig, axes = plt.subplots(1, 2, figsize=(10, 3.5))
axes[0].scatter(df["study_hours"], df["final"], alpha=0.7)
axes[0].set(title="Giờ tự học vs điểm", xlabel="Giờ/tuần", ylabel="Điểm cuối kỳ")
df.groupby("attendance")["final"].mean().plot(ax=axes[1], marker="o", title="Điểm TB theo số buổi đi học")
fig.tight_layout()
```

### Bước 4–5: Mô hình và đánh giá

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error, r2_score, recall_score, accuracy_score

df = pd.read_csv("students.csv").dropna(subset=["final"])
X = df[["study_hours", "attendance"]]
X_tr, X_te, y_tr, y_te = train_test_split(X, df["final"], test_size=0.25, random_state=42)

for name, model in [("Baseline (đoán TB)", DummyRegressor()), ("Hồi quy tuyến tính", LinearRegression())]:
    pred = model.fit(X_tr, y_tr).predict(X_te)
    print(f"{name:20s} MAE={mean_absolute_error(y_te, pred):.2f}  R²={r2_score(y_te, pred):.2f}")

y_fail = (df["final"] < 5).astype(int)                     # 1 = có nguy cơ trượt
Xa, Xb, ya, yb = train_test_split(X, y_fail, test_size=0.25, random_state=42, stratify=y_fail)
clf = LogisticRegression(class_weight="balanced").fit(Xa, ya)
pb = clf.predict(Xb)
print(f"Cảnh báo trượt: accuracy={accuracy_score(yb, pb):.2f}, recall={recall_score(yb, pb):.2f}")
```

### Bước 6: Kết luận (viết bằng lời trong notebook)

> *"Mỗi giờ tự học thêm/tuần gắn với mức tăng ~0.3 điểm cuối kỳ. Mô hình tuyến tính giảm sai số so với baseline. Hệ thống cảnh báo ưu tiên **recall** để không bỏ sót sinh viên có nguy cơ trượt. Hạn chế: mẫu nhỏ (40 SV), chưa có biến về động lực học tập."*

## 5. Mẹo trình bày

- 10–15 slide; mỗi slide 1 thông điệp + 1 biểu đồ.
- Bắt đầu bằng **câu hỏi**, kết thúc bằng **câu trả lời và khuyến nghị**.
- Phân công rõ ràng (tránh bị đánh giá "free-rider" như bài tập *Bài tập nhóm* trong tuyển tập 😉), dùng Git/Google Drive để quản lý phiên bản.
- Chuẩn bị trả lời: *vì sao chọn mô hình này? dữ liệu có thiên lệch không? kết quả dùng được vào việc gì?*
