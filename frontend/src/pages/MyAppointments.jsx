import React, { useEffect, useState } from "react";
import axios from "axios";

function MyAppointments() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/maintenance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setList(res.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi tải lịch của tôi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📅 Lịch hẹn của tôi</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : list.length === 0 ? (
        <p>Bạn chưa có lịch hẹn nào.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-xl">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 border">Xe</th>
              <th className="p-3 border">Ngày</th>
              <th className="p-3 border">Mô tả</th>
              <th className="p-3 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.car}</td>
                <td className="p-2 border">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-2 border">{r.description}</td>
                <td className="p-2 border">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAppointments;
