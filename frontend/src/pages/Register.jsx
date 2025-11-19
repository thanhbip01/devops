import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // ✅ thêm useNavigate

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ khởi tạo

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      alert("✅ Đăng ký thành công!");
      navigate("/login"); // ✅ chuyển sang trang login
    } catch (err) {
      alert("❌ Lỗi: " + err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🧍‍♂️ Đăng ký tài khoản
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Họ và tên"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
