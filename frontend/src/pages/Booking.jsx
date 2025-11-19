import React, { useState } from "react";
import axios from "axios";

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", car: "", date: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", form);
      alert(res.data.message);
      setForm({ name: "", phone: "", car: "", date: "" });
    } catch (error) {
      alert("❌ Lỗi khi gửi dữ liệu: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          📅 Đặt Lịch Bảo Dưỡng Xe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["name", "phone", "car"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 mb-2 capitalize">
                {field === "name"
                  ? "Họ và tên"
                  : field === "phone"
                  ? "Số điện thoại"
                  : "Xe của bạn"}
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mb-2">Ngày bảo dưỡng</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
            }`}
          >
            {loading ? "Đang gửi..." : "Xác nhận đặt lịch"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
