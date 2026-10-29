// Bộ dữ liệu mẫu được ghi sẵn vào thư mục làm việc của Python: pd.read_csv("sales.csv") chạy được ngay.
// Sinh bằng bộ số giả ngẫu nhiên cố định để mọi máy (và bộ kiểm thử) có dữ liệu giống hệt nhau.

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const pad = (n) => String(n).padStart(2, "0");

function salesCsv() {
  const r = rng(314);
  const regions = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng"];
  const products = [
    ["Laptop", "Điện tử", 15000], ["Tai nghe", "Điện tử", 800], ["Chuột", "Điện tử", 250],
    ["Áo thun", "Thời trang", 200], ["Quần jean", "Thời trang", 450], ["Giày", "Thời trang", 900],
    ["Sách", "Văn phòng", 120], ["Bút", "Văn phòng", 15], ["Balo", "Văn phòng", 350],
  ];
  const customers = ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10"];
  const rows = ["order_id,date,region,customer_id,product,category,quantity,unit_price"];
  for (let i = 1; i <= 60; i++) {
    const [p, cat, price] = pick(r, products);
    const month = 1 + Math.floor(r() * 6);
    const day = 1 + Math.floor(r() * 28);
    let qty = String(1 + Math.floor(r() * 10));
    let region = pick(r, regions);
    if (i % 17 === 0) qty = "";            // thiếu số lượng
    if (i % 23 === 0) region = "";         // thiếu khu vực
    rows.push([`O${String(i).padStart(3, "0")}`, `2024-${pad(month)}-${pad(day)}`, region,
      pick(r, customers), p, cat, qty, price].join(","));
  }
  rows.push(rows[5]); // một dòng bị trùng lặp
  return rows.join("\n") + "\n";
}

function customersCsv() {
  const names = ["An", "Bình", "Chi", "Dũng", "Giang", "Hà", "Khánh", "Linh", "Minh", "Nam", "Oanh"];
  const tiers = ["Vàng", "Bạc", "Đồng"];
  const rows = ["customer_id,name,tier,age"];
  names.forEach((n, i) => {
    rows.push([`C${pad(i + 1)}`, n, tiers[i % 3], 19 + ((i * 7) % 30)].join(","));
  });
  return rows.join("\n") + "\n";
}

function studentsCsv() {
  const r = rng(2024);
  const first = ["Anh", "Bảo", "Châu", "Duy", "Hiếu", "Hương", "Khoa", "Lan", "Mai", "Ngọc",
    "Phúc", "Quân", "Sơn", "Thảo", "Trang", "Tú", "Uyên", "Vy", "Yến", "Long"];
  const classes = ["K62-A", "K62-B", "K62-C"];
  const rows = ["student_id,name,class,gender,attendance,study_hours,midterm,final"];
  for (let i = 0; i < 40; i++) {
    const att = 5 + Math.floor(r() * 11); // số buổi đi học / 15
    const hours = Math.round((2 + r() * 18) * 10) / 10;
    const base = 0.5 + hours * 0.3 + att * 0.2;
    const mid = Math.min(10, Math.round((base + (r() - 0.5) * 2) * 10) / 10);
    let fin = Math.min(10, Math.round((base + 0.4 + (r() - 0.5) * 2.4) * 10) / 10);
    let midS = String(mid);
    if (i % 13 === 7) midS = "";          // thiếu điểm giữa kỳ
    const finS = i % 11 === 4 ? "" : String(fin);
    rows.push([`SV${String(i + 1).padStart(3, "0")}`, first[i % first.length] + (i >= 20 ? " B" : ""),
      classes[i % 3], i % 2 ? "Nữ" : "Nam", att, hours, midS, finS].join(","));
  }
  return rows.join("\n") + "\n";
}

function stocksCsv() {
  const r = rng(7);
  const rows = ["date,ticker,close,volume"];
  const tickers = { VNM: 70, FPT: 95, HPG: 27 };
  const price = { ...tickers };
  for (let d = 1; d <= 20; d++) {
    for (const t of Object.keys(tickers)) {
      price[t] = Math.round(price[t] * (1 + (r() - 0.48) * 0.04) * 100) / 100;
      rows.push([`2024-03-${pad(d)}`, t, price[t], 1000 * (50 + Math.floor(r() * 450))].join(","));
    }
  }
  return rows.join("\n") + "\n";
}

export const DATASETS = {
  "sales.csv": salesCsv(),
  "customers.csv": customersCsv(),
  "students.csv": studentsCsv(),
  "stocks.csv": stocksCsv(),
};

export const DATASET_INFO = [
  { name: "sales.csv", desc: "61 đơn hàng 6 tháng đầu 2024: order_id, date, region, customer_id, product, category, quantity, unit_price (có ô trống + 1 dòng trùng)" },
  { name: "customers.csv", desc: "11 khách hàng: customer_id, name, tier, age" },
  { name: "students.csv", desc: "40 sinh viên: student_id, name, class, gender, attendance (/15), study_hours, midterm, final (có ô trống)" },
  { name: "stocks.csv", desc: "Giá đóng cửa 3 mã VNM, FPT, HPG trong 20 ngày: date, ticker, close, volume" },
];
