// frontend/src/pages/Maintenance.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Maintenance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách bảo dưỡng:", err);
      alert("Không thể tải danh sách!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa lịch này không?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Xóa thành công!");
      fetchBookings();
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("Xóa thất bại!");
    }
  };

  // booking: object booking; status: string ("Đã hoàn thành" or "Đã hủy")
  const handleStatusChange = async (booking, status) => {
    try {
      const token = localStorage.getItem("token");

      // gọi backend; backend sẽ update booking và insert maintenance_records
      await axios.put(
        `http://localhost:5000/api/bookings/${booking.id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ Đã cập nhật: ${status}`);
      fetchBookings();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", err);
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🧾 Quản lý lịch bảo dưỡng</h1>

      {loading ? <p>Đang tải...</p> : records.length === 0 ? (
        <p>Chưa có lịch đặt nào.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-xl">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 border">Tên khách hàng</th>
              <th className="p-3 border">Số điện thoại</th>
              <th className="p-3 border">Xe</th>
              <th className="p-3 border">Ngày hẹn</th>
              <th className="p-3 border">Trạng thái</th>
              <th className="p-3 border">Ngày tạo</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.owner_name || r.name}</td>
                <td className="p-2 border">{r.phone}</td>
                <td className="p-2 border">{r.car}</td>
                <td className="p-2 border">{r.date}</td>
                <td className="p-2 border">{r.status || "Chờ xử lý"}</td>
                <td className="p-2 border">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleStatusChange(r, "Đã hoàn thành")}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                  >
                    ✅ Đồng ý
                  </button>
                  <button
                    onClick={() => handleStatusChange(r, "Đã hủy")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    ❌ Từ chối
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    🗑 Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Maintenance;
