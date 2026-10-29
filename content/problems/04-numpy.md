Chương 3 – NumPy: mảng, vector hoá, thống kê, đại số tuyến tính.

===== np01
@title: Thống kê nhanh với NumPy
@level: easy
@topic: numpy
@fn: basic_stats
::: statement
Viết hàm `basic_stats(values)` nhận list số, dùng NumPy trả về tuple `(mean, std, min, max)` – mỗi giá trị là **float làm tròn 2 chữ số**. `std` là độ lệch chuẩn **tổng thể** (mặc định của `np.std`, ddof = 0).

`basic_stats([2, 4, 4, 4, 5, 5, 7, 9])` → `(5.0, 2.0, 2.0, 9.0)`
::: starter
import numpy as np


def basic_stats(values):
    pass


print(basic_stats([2, 4, 4, 4, 5, 5, 7, 9]))
::: solution
import numpy as np


def basic_stats(values):
    a = np.array(values, dtype=float)
    return (round(float(a.mean()), 2), round(float(a.std()), 2),
            round(float(a.min()), 2), round(float(a.max()), 2))
::: tests
[2, 4, 4, 4, 5, 5, 7, 9] ==> (5.0, 2.0, 2.0, 9.0)
::: hidden
[1] ==> (1.0, 0.0, 1.0, 1.0)
[1.5, 2.5, 10] ==> (4.67, 3.79, 1.5, 10.0)
::: hints
- `np.array(values)` rồi `.mean()`, `.std()`, `.min()`, `.max()`.
- `np.std` mặc định ddof=0 (tổng thể); Pandas `.std()` mặc định ddof=1 (mẫu) – hay bị nhầm!
::: explain
**Khác biệt hay bị hỏi:** `np.std(a)` chia cho n, `pd.Series(a).std()` chia cho n − 1. Muốn giống nhau: `np.std(a, ddof=1)`.

===== np02
@title: Map Grid – thay min/max và cắt mảng
@level: easy
@topic: numpy
@source: Tuyển tập – P1.4
@fn: process_map_grid
::: statement
Cho mảng 2 chiều `grid` (NumPy). Viết hàm `process_map_grid(grid)` trả về tuple:
1. `shape` của mảng
2. mảng **mới**: mọi ô bằng giá trị nhỏ nhất → `0`, mọi ô bằng giá trị lớn nhất → `1`
3. trung bình của **mảng mới** (float, làm tròn 2 chữ số)
4. mảng con 2×2 ở góc trên-trái của **mảng gốc**

(Bản gốc trong tuyển tập dùng mảng ngẫu nhiên 5×5 – ở đây truyền mảng vào để chấm được.)
::: starter
import numpy as np


def process_map_grid(grid):
    pass


g = np.array([[5, 20, 99], [40, 5, 60], [70, 80, 90]])
print(process_map_grid(g))
::: solution
import numpy as np


def process_map_grid(grid):
    out = grid.copy()
    out[grid == grid.min()] = 0
    out[grid == grid.max()] = 1
    return grid.shape, out, round(float(out.mean()), 2), grid[:2, :2]
::: tests
np.array([[5, 20, 99], [40, 5, 60], [70, 80, 90]])
::: hidden
np.arange(1, 26).reshape(5, 5)
np.array([[3, 3], [3, 7]])
::: hints
- Boolean indexing: `out[grid == grid.min()] = 0`.
- Slicing 2 chiều: `grid[:2, :2]`.
- Nhớ `.copy()` để không sửa mảng gốc.
::: explain
`b = a` **không** copy mảng – hai tên cùng trỏ vào một mảng. Phải `a.copy()`. Slicing NumPy cũng trả về *view* (sửa view là sửa mảng gốc).

===== np03
@title: Lọc phần tử bằng mặt nạ boolean
@level: easy
@topic: numpy
@fn: above_mean
::: statement
Viết hàm `above_mean(arr)` nhận mảng NumPy 1 chiều, trả về **mảng** các phần tử **lớn hơn trung bình** của mảng (giữ thứ tự).

`above_mean(np.array([1, 5, 3, 8, 2]))` → `array([5, 8])`
::: starter
import numpy as np


def above_mean(arr):
    pass


print(above_mean(np.array([1, 5, 3, 8, 2])))
::: solution
import numpy as np


def above_mean(arr):
    return arr[arr > arr.mean()]
::: tests
np.array([1, 5, 3, 8, 2])
::: hidden
np.array([4, 4, 4])
np.array([-1.5, 0.0, 2.5, 10.0])
::: hints
- `arr > arr.mean()` tạo mảng True/False; `arr[mask]` lấy các phần tử True.
::: explain
**Vector hoá**: không cần vòng lặp, NumPy xử lý cả mảng cùng lúc – nhanh hơn hàng chục lần.

===== np04
@title: Chuẩn hoá Z-score
@level: easy
@topic: numpy
@fn: zscore
::: statement
Viết hàm `zscore(arr)` trả về mảng **z = (x − mean) / std** (std tổng thể, ddof=0), làm tròn 3 chữ số bằng `np.round`. Nếu std = 0 trả về mảng toàn 0.0 cùng shape.
::: starter
import numpy as np


def zscore(arr):
    pass


print(zscore(np.array([2, 4, 4, 4, 5, 5, 7, 9])))
::: solution
import numpy as np


def zscore(arr):
    arr = np.asarray(arr, dtype=float)
    s = arr.std()
    if s == 0:
        return np.zeros_like(arr)
    return np.round((arr - arr.mean()) / s, 3)
::: tests
np.array([2, 4, 4, 4, 5, 5, 7, 9])
::: hidden
np.array([5, 5, 5])
np.array([1.0, 2.0])
np.array([[1, 2], [3, 4]])
::: hints
- Broadcasting: `arr - arr.mean()` trừ một số khỏi mọi phần tử.
::: explain
Chuẩn hoá Z-score là `StandardScaler` trong scikit-learn.

===== np05
@title: Đại số tuyến tính – giải hệ phương trình
@level: medium
@topic: numpy
@fn: solve_system
::: statement
Giải hệ phương trình tuyến tính **A·x = b**. Viết hàm `solve_system(A, b)` (A, b là list) trả về **mảng nghiệm x làm tròn 4 chữ số**; nếu ma trận suy biến (định thức ≈ 0, |det| < 1e-12) trả về `None`.

Ví dụ: 2x + y = 5, x − y = 1 → `array([2., 1.])`
::: starter
import numpy as np


def solve_system(A, b):
    pass


print(solve_system([[2, 1], [1, -1]], [5, 1]))
::: solution
import numpy as np


def solve_system(A, b):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)
    if abs(np.linalg.det(A)) < 1e-12:
        return None
    return np.round(np.linalg.solve(A, b), 4)
::: tests
[[2, 1], [1, -1]], [5, 1]
::: hidden
[[1, 2], [2, 4]], [3, 6] ==> None
[[3, 2, -1], [2, -2, 4], [-1, 0.5, -1]], [1, -2, 0]
::: hints
- `np.linalg.solve(A, b)`, `np.linalg.det(A)`.
::: explain
Không nên tính `inv(A) @ b` – `solve` nhanh và chính xác hơn.

===== np06
@title: Lợi nhuận danh mục đầu tư
@level: medium
@topic: numpy
@fn: portfolio_stats
::: statement
`returns` là ma trận lợi suất hằng ngày (mỗi hàng là một ngày, mỗi cột là một cổ phiếu), `weights` là tỷ trọng danh mục. Viết hàm `portfolio_stats(returns, weights)` trả về tuple:
1. mảng lợi suất danh mục mỗi ngày = `returns @ weights`
2. lợi suất trung bình của danh mục (float)
3. **chỉ số cột** (cổ phiếu) có lợi suất trung bình cao nhất (int)

(Mọi số thực làm tròn 4 chữ số.)
::: starter
import numpy as np


def portfolio_stats(returns, weights):
    pass


r = np.array([[0.01, 0.02], [0.03, -0.01], [-0.02, 0.04]])
w = np.array([0.6, 0.4])
print(portfolio_stats(r, w))
::: solution
import numpy as np


def portfolio_stats(returns, weights):
    daily = np.round(returns @ weights, 4)
    avg = round(float((returns @ weights).mean()), 4)
    best = int(np.argmax(returns.mean(axis=0)))
    return daily, avg, best
::: tests
np.array([[0.01, 0.02], [0.03, -0.01], [-0.02, 0.04]]), np.array([0.6, 0.4])
::: hidden
np.array([[0.1, 0.0, -0.1]]), np.array([0.2, 0.3, 0.5])
np.array([[0.01, 0.02, 0.03], [0.02, 0.01, 0.0]]), np.array([1/3, 1/3, 1/3])
::: hints
- Nhân ma trận: toán tử `@` hoặc `np.dot`.
- Trung bình **theo cột**: `returns.mean(axis=0)`; vị trí max: `np.argmax`.
::: explain
`axis=0` = gộp theo chiều hàng (kết quả cho từng **cột**); `axis=1` = cho từng **hàng**. Câu hỏi kinh điển trong đề thi.

===== np07
@title: Trung bình trượt
@level: medium
@topic: numpy
@fn: moving_average
::: statement
Viết hàm `moving_average(prices, k)` trả về mảng trung bình trượt cửa sổ k (chỉ các cửa sổ đầy đủ), làm tròn 2 chữ số.

`moving_average([1, 2, 3, 4, 5], 3)` → `array([2., 3., 4.])`
::: starter
import numpy as np


def moving_average(prices, k):
    pass


print(moving_average([1, 2, 3, 4, 5], 3))
::: solution
import numpy as np


def moving_average(prices, k):
    a = np.asarray(prices, dtype=float)
    return np.round(np.convolve(a, np.ones(k) / k, mode="valid"), 2)
::: tests
[1, 2, 3, 4, 5], 3
::: hidden
[10, 20], 1
[70.5, 71.2, 69.8, 72.4, 73.0, 72.1], 4
::: hints
- `np.convolve(a, np.ones(k) / k, mode="valid")`.
- Hoặc dùng `np.cumsum`, hoặc vòng lặp.
::: explain
Pandas: `s.rolling(k).mean()` (kết quả có k−1 giá trị NaN đầu).

===== np08
@title: Đếm theo khoảng (histogram)
@level: easy
@topic: numpy
@fn: count_bins
::: statement
Viết hàm `count_bins(scores)` đếm số điểm (thang 10) rơi vào từng khoảng **[0, 4), [4, 5.5), [5.5, 7), [7, 8.5), [8.5, 10]**. Trả về **list** 5 số nguyên.

`count_bins([3, 4, 5.5, 7, 8.5, 10, 6.9])` → `[1, 1, 2, 1, 2]`
::: starter
import numpy as np


def count_bins(scores):
    pass


print(count_bins([3, 4, 5.5, 7, 8.5, 10, 6.9]))
::: solution
import numpy as np


def count_bins(scores):
    counts, _ = np.histogram(scores, bins=[0, 4, 5.5, 7, 8.5, 10])
    return [int(c) for c in counts]
::: tests
[3, 4, 5.5, 7, 8.5, 10, 6.9] ==> [1, 1, 2, 1, 2]
::: hidden
[] ==> [0, 0, 0, 0, 0]
[0, 0, 10] ==> [2, 0, 0, 0, 1]
::: hints
- `np.histogram(data, bins=[...])` trả về `(counts, edges)`; khoảng cuối cùng **bao gồm** cận phải.
::: explain
Đổi `np.int64` về `int` thuần (`int(c)`) khi đề yêu cầu list số nguyên.
