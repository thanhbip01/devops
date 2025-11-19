import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import context

function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // ✅ lấy từ context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between">
      <div className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        Gara Manager
      </div>

      <div className="space-x-4">
        <Link to="/">Trang chủ</Link>
        {isLoggedIn ? (
          <>
            <Link to="/myAppointments">MyAppointments</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/maintenance">Maintenance</Link>
            <button onClick={handleLogout} className="hover:underline">
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
