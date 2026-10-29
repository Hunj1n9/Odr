@title: Giới thiệu Python cho khoa học dữ liệu
@chapter: 1
@summary: Vì sao Python, hệ sinh thái thư viện, quy trình một dự án dữ liệu và cách học hiệu quả với trang này.

## Mục tiêu chương

Sau chương này bạn sẽ:
- hiểu vì sao Python là ngôn ngữ số 1 cho phân tích dữ liệu,
- biết vai trò của các thư viện **NumPy, Pandas, Matplotlib, scikit-learn**,
- nắm được **quy trình một dự án khoa học dữ liệu** (đề cương yêu cầu bạn làm trọn quy trình này trong dự án nhóm 30%),
- chạy được những dòng code Python đầu tiên.

## Vì sao là Python?

| Lý do | Ý nghĩa với sinh viên kinh tế |
|---|---|
| Cú pháp gần với tiếng Anh, dễ đọc | Học nhanh, tập trung vào bài toán thay vì cú pháp |
| Thư viện dữ liệu cực mạnh, miễn phí | Thay Excel khi dữ liệu lớn, tự động hoá báo cáo |
| Cộng đồng lớn nhất | Gặp lỗi gì cũng tìm được lời giải |
| Dùng từ phân tích → học máy → web | Một ngôn ngữ cho cả sự nghiệp |

## Hệ sinh thái thư viện

| Thư viện | Dùng để | Chương |
|---|---|---|
| **NumPy** | Mảng số nhiều chiều, tính toán vector hoá, đại số tuyến tính | 3 |
| **Pandas** | Bảng dữ liệu (DataFrame): đọc, làm sạch, lọc, nhóm, ghép | 3–4 |
| **Matplotlib** (+ Seaborn) | Vẽ biểu đồ | 5 |
| **scikit-learn** | Học máy: hồi quy, phân loại, phân cụm, đánh giá | 6–7 |
| **SciPy / statistics** | Thống kê, tối ưu, tính toán khoa học | 2–3 |

Trên lớp bạn sẽ dùng **Jupyter Notebook** hoặc **Google Colab**. Trang web này chạy Python **ngay trong trình duyệt** (công nghệ Pyodide), nên mọi ô code bên dưới đều sửa và chạy được – hãy thử!

```python
print("Xin chào TIN314!")
2024 - 1960   # FTU thành lập năm 1960 – giá trị dòng cuối được hiển thị tự động
```

## Quy trình một dự án dữ liệu

1. **Đặt câu hỏi** – Ví dụ: "Số giờ tự học ảnh hưởng thế nào đến điểm cuối kỳ?"
2. **Thu thập & nhập dữ liệu** – file CSV/Excel, API, web… (Chương 3)
3. **Làm sạch** – xử lý ô trống, trùng lặp, sai kiểu dữ liệu (Chương 4)
4. **Khám phá & trực quan hoá (EDA)** – thống kê mô tả, biểu đồ (Chương 4–5)
5. **Mô hình hoá** – hồi quy, phân loại, phân cụm (Chương 6)
6. **Đánh giá & tinh chỉnh** – MAE, R², accuracy, cross-validation (Chương 7)
7. **Truyền đạt kết quả** – báo cáo, biểu đồ, thuyết trình (Chương 8)

Một ví dụ "chạy thử" toàn bộ quy trình chỉ trong vài dòng (chưa cần hiểu hết, cuối khoá bạn sẽ tự viết được):

```python
import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv("students.csv")                 # 2. nhập dữ liệu
df = df.dropna(subset=["final"])                 # 3. làm sạch
print(df[["study_hours", "final"]].describe())   # 4. khám phá

model = LinearRegression().fit(df[["study_hours"]], df["final"])   # 5. mô hình
print(f"Mỗi giờ tự học thêm ≈ +{model.coef_[0]:.2f} điểm cuối kỳ")  # 7. kết luận
```

## Những dòng Python đầu tiên

```python
ten = "Lan"            # chuỗi (str)
tuoi = 20              # số nguyên (int)
diem_tb = 8.25         # số thực (float)
qua_mon = diem_tb >= 5 # luận lý (bool)

print(ten, "năm nay", tuoi, "tuổi")
print(f"{ten} có điểm TB {diem_tb} → qua môn? {qua_mon}")
print(type(ten), type(tuoi), type(diem_tb), type(qua_mon))
```

> **Lưu ý:** Python phân biệt chữ hoa/thường (`Ten` khác `ten`) và dùng **thụt lề 4 dấu cách** để xác định khối lệnh thay vì dấu `{ }`.

## Học hiệu quả với trang này

- **Bài giảng**: đọc, *sửa code và chạy lại* – đừng chỉ đọc.
- **Luyện code**: 140+ bài chấm bằng test ẩn giống thi CodeRunner. Làm theo thứ tự: Khởi động → Giữa kì → Tuyển tập → Dữ liệu → Học máy.
- **Trắc nghiệm**: luyện kỹ năng *đọc code* và đoán output.
- **Thi thử**: mô phỏng phòng thi 90 phút. Mục tiêu ≥ 8.5 trước khi thi thật.
- **Sổ tay Python**: chỗ thực hành tự do như Jupyter, có sẵn dữ liệu mẫu.
