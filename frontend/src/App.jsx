import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Maintenance from "./pages/Maintenance";
import MyAppointments from "./pages/MyAppointments";



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/MyAppointments" element={<MyAppointments />} />

      </Routes>
    </div>
  );
}

export default App;
