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
| **Bài giảng** | 8 chương theo đề cương, chia thành **74 bài nhỏ** (mỗi bài một ý, 10–20 phút): lý thuyết ngắn → ví dụ chạy được → câu hỏi kiểm tra xen giữa → bài tập chấm tự động ngay trong trang. Có thanh tiến độ từng chương, tự đánh dấu hoàn thành khi làm đúng hết |
| **Luyện code** | 290 bài chấm tự động: **131 bài tập theo bài học**, **18 bài dạng đề thi thật FTU**, 20 bài khởi động, **34 câu đề giữa kỳ**, 44 bài **tuyển tập 30 bài**, NumPy, Pandas, trực quan hoá, học máy. Gợi ý từng bước, lời giải + giải thích lỗi thường gặp |
| **Trắc nghiệm** | 363 câu: 231 câu kiểm tra nhanh trong bài học, 68 câu tổng hợp theo chương, 64 câu "đoán output" (đáp án được kiểm chứng bằng cách chạy code thật). Đảo phương án, ôn lại câu sai |
| **Thi thử** | Đề dạng FTU 2024–2025 (90 phút, theo cấu trúc đề thật), đề cuối kỳ mô phỏng 90 phút/6 câu, đề giữa kỳ 60 phút, chuyên đề dữ liệu, luyện nhanh; đồng hồ, tự nộp khi hết giờ, chấm điểm /10 |
| **Sổ tay Python** | Notebook kiểu Jupyter dùng chung biến giữa các ô, có sẵn `sales.csv`, `customers.csv`, `students.csv`, `stocks.csv`, `cars.csv`, `houses.csv`, hỗ trợ `import seaborn`, `input()` |
| **Tiến độ** | Lưu trong trình duyệt (localStorage); xuất/nhập file JSON để chuyển máy |

## Cấu trúc

```
index.html, assets/style.css     giao diện
src/main.js                      router + khởi động
src/views/*.js                   các trang (home, learn, problems, problem, quiz, exam, play)
src/py/worker.js, runner.js      chạy Pyodide trong web worker, tự khởi động lại khi lặp vô hạn
src/py/grader.py                 chạy code kiểu notebook + chấm bài, so sánh kết quả (số thực, DataFrame, ndarray…)
src/data/datasets.js             sinh dữ liệu mẫu cố định
content/lessons/*.md             bài giảng: mỗi chương gồm nhiều bài nhỏ + câu hỏi nhanh
content/problems/0*.md           ngân hàng bài tập (đề giữa kỳ, tuyển tập, NumPy, Pandas, dạng đề FTU, …)
content/problems/u*.md           bài tập đi kèm từng bài học (@unit)
content/quizzes.md               trắc nghiệm tổng hợp theo chương
content/quizzes-output.md        câu đoán output (có ::: code để tự kiểm chứng)
scripts/validate.mjs             kiểm tra toàn bộ nội dung bằng Pyodide trong Node
```

## Nguồn nội dung

- Khung 8 chương, phân bổ thời lượng và cách đánh giá (10% chuyên cần, 30% dự án nhóm, 60% thi thực hành trên máy 90 phút) lấy từ đề cương học phần trên trang QLĐT FTU – cả ba phiên bản: [KTKT TIN314 (2025)](https://qldt.ftu.edu.vn/ktkt-tin314-_-lap-trinh-cho-phan-tich-du-lieu-va-tinh-toan-khoa-hoc/), [TIN314 (2023)](https://qldt.ftu.edu.vn/tin314-lap-trinh-cho-phan-tich-du-lieu-va-tinh-toan-khoa-hoc-programming-for-data-analysis-and-scientific-computing-2/) và bản tiếng Anh [TIN314E](https://qldt.ftu.edu.vn/tin314e-programming-for-data-analysis-and-scientific-computing/).
- Đề cương chỉ ghi tên chương. Tên chương bản tiếng Anh (*Importing & Loading Data*, *Data Manipulation*, *Model Development*, *Model Evaluation*) trùng với các module của khoá IBM *Data Analysis with Python*, nên Chương 3–7 bổ sung đúng các chủ đề đó: nhập dữ liệu và SQL, xử lý ô thiếu / chuẩn hoá / binning / biến giả, EDA với Pearson và ANOVA, hồi quy đơn – bội – đa thức – Pipeline, train/test, cross-validation, Ridge, GridSearchCV.
- Tài liệu TIN314 sinh viên FTU chia sẻ công khai trên Studocu: [đề thi kết thúc học phần thực hành HK I 2024–2025](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/de-thi-ket-thuc-hoc-phan-tin314-thuc-hanh-hoc-ky-i-2024-2025/132935620), [đề cuối kỳ mẫu và đề 5/1/2024](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/de-ck-mau-that-de-ck-mau-that/105669858), [đề cương ôn tập cuối kỳ](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/de-cuong-on-tap-cho-tin314-python-cac-cau-lenh/89586297), [bộ câu hỏi Final hè 2025](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/tong-hop-cau-hoi-final-lap-trinh-hk-he-2025/134216182), [slide Buổi 8 – Trực quan hoá](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/lecture-8-data-visualization-for-student/79236524). Thêm: [LEC 2 – Python cơ bản](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/lec-2-python-co-ban-thanh-phan-cu-phap-va-kieu-du-lieu-co-ban/130589533), [ghi chú Buổi 02–06](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/vo-ghi-tong-hop/86672043), [slide Buổi 6 & 7 – Tiền xử lý & EDA](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/lecture-6-7-data-pre-processing-eda-for-student/77675556), [bộ câu hỏi Lecture 7–11](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/bo-cau-hoi-lecture-7-11-moi/173941787), [outline môn học](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/lap-trinh-cho-phan-tich-du-lieu-va-tinh-toan-khoa-hoc-outline-thi-giua-ky/167142152). Mỗi chương có ô "Đối chiếu tài liệu FTU" và **mỗi bài nhỏ có dòng `@ftu`** (hiện trên trang: "📚 Theo tài liệu FTU") ghi buổi học/slide/đề thi tương ứng – bộ kiểm tra bắt buộc trường này. Thêm [Buổi 5 – Ứng dụng Python vào phân tích dữ liệu](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/lap-trinh-may-tinh-buoi-5-ung-dung-python-vao-phan-tich-du-lieu-tinh314e/176359926), [bộ câu hỏi ôn giữa kỳ Lecture 3–6](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/python-bo-cau-hoi-on-tap-lecture-giua-ky-lap-trinh-python/176662572) và [bộ 20 câu thực hành FTU](https://www.studocu.vn/vn/document/truong-dai-hoc-ngoai-thuong/lap-trinh-trong-ptdl-ttkh/ftu-dap-an-20-cau-python-thuc-hanh-chuan/175585914). Mỗi chương có ô "Đối chiếu tài liệu FTU" ghi rõ buổi học/slide tương ứng; các chủ đề có trong tài liệu FTU nhưng trước đó thiếu (datetime, `format()`, `replace("?", np.nan)`, `df.columns`, sigmoid, Adjusted R², Silhouette, Plotly) đã được bổ sung. Các tài liệu này xác nhận cấu trúc đề: Phần I Python cơ bản (3 điểm) + Phần II Data Wrangling, EDA và Modelling (6–7 điểm), dùng đúng tên module của khoá IBM. Website **không chép lại đề**: bộ "Dạng đề thi thật FTU" (`08-ftu-exam.md`) và các bài 2.15, 4.13, 4.14, 5.9 được viết mới theo đúng dạng câu hỏi, với dữ liệu khác.
- Đề giữa kỳ và bộ "Tuyển tập 30 bài" do người học cung cấp.

## Thêm bài học nhỏ

Trong `content/lessons/chX-*.md`, mỗi bài nhỏ bắt đầu bằng:

```
@@@ c2-3 | Tên bài
@goal: Sau bài này bạn sẽ …
@practice: b02, b06        (tuỳ chọn – bài luyện thêm trong ngân hàng)

Nội dung Markdown, ```python là ô chạy được, ```py là code tĩnh.

??
Câu hỏi kiểm tra nhanh
- [ ] phương án sai
- [x] phương án đúng
> Giải thích
```

Bài tập đi kèm đặt trong `content/problems/uX-*.md` với dòng `@unit: c2-3`. Ô code minh hoạ lỗi ghi chú `# lỗi cố ý` (bộ kiểm tra yêu cầu ô đó phải báo lỗi).

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

Bộ kiểm tra đảm bảo: lời giải mẫu qua 100% test và khớp mọi `==> mong đợi`, code khởi đầu không tự qua hết test, mọi đoạn ```` ```python ```` trong bài giảng chạy không lỗi, mọi bài nhỏ có mục tiêu, câu hỏi nhanh và bài tập, trắc nghiệm có đúng một đáp án, câu đoán output khớp với output thật khi chạy code.

## Triển khai

Trang hoàn toàn tĩnh – có thể đưa lên GitHub Pages, Netlify, Vercel… mà không cần backend.
