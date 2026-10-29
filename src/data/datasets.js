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

// Dữ liệu ô tô kiểu "Automobile" (khoá IBM Data Analysis with Python): ô thiếu ghi bằng "?".
function carsCsv() {
  const r = rng(2024);
  const makes = [["toyota", 0.9], ["honda", 0.95], ["mazda", 1.0], ["bmw", 1.6], ["audi", 1.5], ["volvo", 1.3], ["nissan", 0.95], ["mercedes", 1.8]];
  const rows = ["make,fuel_type,body_style,drive_wheels,engine_size,horsepower,curb_weight,city_mpg,highway_mpg,price"];
  for (let i = 1; i <= 80; i++) {
    const [make, lux] = pick(r, makes);
    const fuel = r() < 0.15 ? "diesel" : "gas";
    const body = pick(r, ["sedan", "sedan", "hatchback", "wagon", "convertible"]);
    const drive = lux > 1.2 ? (r() < 0.8 ? "rwd" : "4wd") : (r() < 0.8 ? "fwd" : "rwd");
    const engine = Math.round(90 + r() * 120 + (lux - 1) * 60);
    const hp = Math.round(engine * (0.62 + r() * 0.25));
    const weight = Math.round(1900 + engine * 6 + r() * 500);
    const city = Math.round(52 - engine * 0.13 - r() * 6 + (fuel === "diesel" ? 5 : 0));
    const highway = city + 4 + Math.floor(r() * 5);
    const price = Math.round((engine * 75 + hp * 60 + weight * 1.5 - 4000) * lux + (r() - 0.5) * 3000);
    const cells = [make, fuel, body, drive, engine, hp, weight, city, highway, price];
    if (i % 13 === 0) cells[5] = "?";   // thiếu horsepower
    if (i % 19 === 0) cells[9] = "?";   // thiếu giá
    rows.push(cells.join(","));
  }
  return rows.join("\n") + "\n";
}

// Dữ liệu giá nhà kiểu "King County house sales" (đề cuối kỳ mẫu TIN314 dùng bộ này).
function housesCsv() {
  const r = rng(1960);
  const rows = ["id,date,price,bedrooms,bathrooms,sqft_living,sqft_lot,floors,waterfront,view,condition,grade,sqft_above,sqft_basement,lat"];
  for (let i = 1; i <= 120; i++) {
    const bedrooms = 1 + Math.floor(r() * 5);
    const bathrooms = Math.max(1, Math.round((bedrooms * 0.6 + r() * 1.5) * 4) / 4);
    const grade = 5 + Math.floor(r() * 6 + bedrooms * 0.3);
    const living = Math.round((600 + bedrooms * 380 + grade * 120 + r() * 600) / 10) * 10;
    const basement = r() < 0.4 ? Math.round(living * (0.15 + r() * 0.25) / 10) * 10 : 0;
    const floors = [1, 1, 1.5, 2, 2, 3][Math.floor(r() * 6)];
    const waterfront = r() < 0.06 ? 1 : 0;
    const view = waterfront ? 3 + Math.floor(r() * 2) : Math.floor(r() * r() * 4);
    const condition = 2 + Math.floor(r() * 4);
    const lat = Math.round((47.2 + r() * 0.55) * 10000) / 10000;
    const lot = Math.round((3000 + r() * 12000) / 10) * 10;
    const price = Math.round((-900000 + living * 210 + grade * 95000 + waterfront * 600000 + view * 45000
      + (lat - 47.2) * 900000 + bathrooms * 20000 + (r() - 0.5) * 160000) / 1000) * 1000;
    const month = 1 + Math.floor(r() * 12);
    rows.push([7000000 + i * 137, `2014-${pad(month)}-${pad(1 + Math.floor(r() * 28))}`, Math.max(price, 90000), bedrooms, bathrooms,
      living, lot, floors, waterfront, view, condition, grade, living - basement, basement, lat].join(","));
  }
  return rows.join("\n") + "\n";
}

export const DATASETS = {
  "sales.csv": salesCsv(),
  "customers.csv": customersCsv(),
  "students.csv": studentsCsv(),
  "stocks.csv": stocksCsv(),
  "cars.csv": carsCsv(),
  "houses.csv": housesCsv(),
};

export const DATASET_INFO = [
  { name: "sales.csv", desc: "61 đơn hàng 6 tháng đầu 2024: order_id, date, region, customer_id, product, category, quantity, unit_price (có ô trống + 1 dòng trùng)" },
  { name: "customers.csv", desc: "11 khách hàng: customer_id, name, tier, age" },
  { name: "students.csv", desc: "40 sinh viên: student_id, name, class, gender, attendance (/15), study_hours, midterm, final (có ô trống)" },
  { name: "cars.csv", desc: "80 ô tô: make, fuel_type, body_style, drive_wheels, engine_size, horsepower, curb_weight, city_mpg, highway_mpg, price (ô thiếu ghi \"?\")" },
  { name: "houses.csv", desc: "120 căn nhà kiểu King County: price, bedrooms, bathrooms, sqft_living, sqft_lot, floors, waterfront, view, condition, grade, sqft_above, sqft_basement, lat" },
  { name: "stocks.csv", desc: "Giá đóng cửa 3 mã VNM, FPT, HPG trong 20 ngày: date, ticker, close, volume" },
];
