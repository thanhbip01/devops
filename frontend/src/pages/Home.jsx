import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="text-center bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
          🚗 Hệ thống Quản lý Lịch Bảo Dưỡng Gara
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Đặt lịch, quản lý và theo dõi bảo dưỡng xe nhanh chóng – hiện đại – tiện lợi.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/booking"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
          >
            Đặt lịch bảo dưỡng
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
