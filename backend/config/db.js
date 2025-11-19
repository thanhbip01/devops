import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// ================== KẾT NỐI DATABASE ==================
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Lỗi kết nối MySQL:", err);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
    connection.release();
  }
});

// ================== TẠO BẢNG BOOKINGS ==================
const createBookingTable = `
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_name VARCHAR(100) NOT NULL,
  owner_email VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  car VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Chờ xử lý',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

db.query(createBookingTable, (err) => {
  if (err) {
    console.error("❌ Lỗi tạo bảng bookings:", err.sqlMessage);
  } else {
    console.log("✅ Bảng bookings đã sẵn sàng!");
  }
});

// ================== TẠO BẢNG maintenance_records ==================
const createMaintenanceTable = `
CREATE TABLE IF NOT EXISTS maintenance_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  car VARCHAR(100) NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  owner_email VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  description TEXT,
  date DATETIME NOT NULL,
  cost DECIMAL(10,2) DEFAULT 0,
  status ENUM('Đã hoàn thành', 'Đang xử lý', 'Đã hủy') DEFAULT 'Đang xử lý',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;
`;

db.query(createMaintenanceTable, (err) => {
  if (err) {
    console.error("❌ Lỗi tạo bảng maintenance_records:", err.sqlMessage);
  } else {
    console.log("✅ Bảng maintenance_records đã sẵn sàng!");
  }
});

// ================== EXPORT DB ==================
export default db;
