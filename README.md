# TIN314 Lab

Website học và luyện thi học phần **TIN314 – Lập trình cho phân tích dữ liệu và tính toán khoa học** (Đại học Ngoại thương). Python chạy thật ngay trong trình duyệt (Pyodide: NumPy, Pandas, Matplotlib, scikit-learn), chấm bài tự động bằng test ẩn giống hệ thống CodeRunner dùng trong thi.

## Chạy trên máy

```bash
npm start
```

Mở http://localhost:5314. (Chỉ cần Python 3 để chạy web server tĩnh. Lần đầu mở, trình duyệt tải Pyodide từ CDN ~10 giây, sau đó được cache.)

Không mở trực tiếp `index.html` bằng `file://` – trình duyệt chặn ES module và web worker.

## Tính năng

| Mục | Nội dung |
|---|---|
| **Bài giảng** | 8 chương theo đúng đề cương chi tiết + "Bí kíp thi"; 70 đoạn code chạy/sửa được ngay trên trang |
| **Luyện code** | 141 bài chấm tự động: 20 bài khởi động, **34 câu đề giữa kỳ**, 44 bài **tuyển tập 30 bài**, NumPy, Pandas, trực quan hoá, học máy. Gợi ý từng bước, lời giải + giải thích lỗi thường gặp |
| **Trắc nghiệm** | 68 câu theo 8 chương (chủ yếu "đoán output"), đảo phương án, ôn lại câu sai |
| **Thi thử** | Đề cuối kỳ mô phỏng 90 phút/6 câu, đề giữa kỳ 60 phút, chuyên đề dữ liệu, luyện nhanh; đồng hồ, tự nộp khi hết giờ, chấm điểm /10 |
| **Sổ tay Python** | Notebook kiểu Jupyter dùng chung biến giữa các ô, có sẵn `sales.csv`, `customers.csv`, `students.csv`, `stocks.csv`, hỗ trợ `input()` |
| **Tiến độ** | Lưu trong trình duyệt (localStorage); xuất/nhập file JSON để chuyển máy |

## Cấu trúc

```
index.html, assets/style.css     giao diện
src/main.js                      router + khởi động
src/views/*.js                   các trang (home, learn, problems, problem, quiz, exam, play)
src/py/worker.js, runner.js      chạy Pyodide trong web worker, tự khởi động lại khi lặp vô hạn
src/py/grader.py                 chạy code kiểu notebook + chấm bài, so sánh kết quả (số thực, DataFrame, ndarray…)
src/data/datasets.js             sinh dữ liệu mẫu cố định
content/problems/*.md            ngân hàng bài tập
content/lessons/*.md             bài giảng
content/quizzes.md               trắc nghiệm
scripts/validate.mjs             kiểm tra toàn bộ nội dung bằng Pyodide trong Node
```

## Thêm bài tập

Mỗi bài trong `content/problems/*.md`:

```
===== gk01
@title: Tên bài
@level: easy | medium | hard
@topic: basics | algo | string | collections | numpy | io | pandas | viz | ml | eval
@source: Giữa kì – Câu 1
@fn: ten_ham
::: statement
Đề bài (Markdown)
::: starter
code khởi đầu
::: solution
lời giải mẫu
::: tests
tham_so_1, tham_so_2 ==> ket_qua_mong_doi
::: hidden
test ẩn (vế "==> ..." là tuỳ chọn – kết quả luôn được tính từ lời giải mẫu)
::: hints
- gợi ý 1
::: explain
giải thích
```

Bài không chấm theo giá trị trả về (ví dụ biểu đồ) dùng phần `::: check` định nghĩa `def check(ns)` trả về danh sách `{"name", "ok", "msg"}`. Hàm không tham số dùng dòng test `-`.

Sau khi sửa nội dung, chạy:

```bash
npm install
npm run validate
```

Bộ kiểm tra đảm bảo: lời giải mẫu qua 100% test và khớp mọi `==> mong đợi`, code khởi đầu không tự qua hết test, mọi đoạn ```` ```python ```` trong bài giảng chạy không lỗi, trắc nghiệm có đáp án.

## Triển khai

Trang hoàn toàn tĩnh – có thể đưa lên GitHub Pages, Netlify, Vercel… mà không cần backend.
