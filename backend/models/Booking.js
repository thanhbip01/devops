// backend/models/Booking.js
import db from "../config/db.js";

const Booking = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO bookings (owner_name, owner_email, phone, car, date, status)
                   VALUES (?, ?, ?, ?, ?, 'Chờ duyệt')`;
      db.query(
        sql,
        [data.owner_name || data.name, data.owner_email || null, data.phone, data.car, data.date],
        (err, result) => {
          if (err) return reject(err);
          resolve({ id: result.insertId, ...data });
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM bookings ORDER BY created_at DESC";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM bookings WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE bookings SET status = ? WHERE id = ?";
      db.query(sql, [status, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM bookings WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

export default Booking;
