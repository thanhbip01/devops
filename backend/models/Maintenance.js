// backend/models/Maintenance.js
import db from "../config/db.js";

const Maintenance = {
  // 🟢 Lấy toàn bộ lịch bảo dưỡng (Admin)
  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM maintenance_records ORDER BY created_at DESC";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // 🟢 Lấy theo ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM maintenance_records WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  // 🟢 Tạo mới bản ghi bảo dưỡng
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO maintenance_records
        (booking_id, car, owner_name, owner_email, phone, description, date, cost, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [
          data.booking_id || null,
          data.car,
          data.owner_name,
          data.owner_email || null,
          data.phone,
          data.description || "",
          data.date,
          data.cost || 0,
          data.status || "Đang xử lý",
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  // 🟢 Cập nhật bản ghi
  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE maintenance_records
        SET car=?, owner_name=?, owner_email=?, phone=?, description=?, date=?, cost=?, status=?
        WHERE id=?
      `;
      db.query(
        sql,
        [
          data.car,
          data.owner_name,
          data.owner_email || null,
          data.phone,
          data.description || "",
          data.date,
          data.cost || 0,
          data.status || "Đang xử lý",
          id,
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows);
        }
      );
    });
  },

  // 🟢 Cập nhật trạng thái riêng (Dùng cho “Đồng ý” / “Từ chối”)
  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE maintenance_records SET status=? WHERE id=?";
      db.query(sql, [status, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  },

  // 🟢 Lọc theo email người dùng (cho MyAppointments.jsx)
  findByOwnerEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM maintenance_records WHERE owner_email = ? ORDER BY created_at DESC";
      db.query(sql, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  // 🟢 Xóa bản ghi
  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM maintenance_records WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      });
    });
  },
};

export default Maintenance;
