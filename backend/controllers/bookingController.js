// backend/controllers/bookingController.js
import Booking from "../models/Booking.js";
import Maintenance from "../models/Maintenance.js"; // import để tạo bản ghi bảo dưỡng

export const createBooking = async (req, res) => {
  try {
    const { name, owner_name, owner_email, phone, car, date } = req.body;
    const data = {
      owner_name: owner_name || name,
      owner_email: owner_email || req.body.owner_email || null,
      phone,
      car,
      date,
    };
    const booking = await Booking.create(data);
    res.status(201).json({ message: "Đặt lịch thành công!", booking });
  } catch (error) {
    console.error("Lỗi createBooking:", error);
    res.status(500).json({ message: "Lỗi khi đặt lịch!" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error("Lỗi getBookings:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách!" });
  }
};

// update status + tạo maintenance_records
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Thiếu trạng thái" });

    // 1) cập nhật status trong bookings
    await Booking.updateStatus(id, status);

    // 2) lấy booking để tạo maintenance record
    const booking = await Booking.getById(id);
    if (!booking) return res.status(404).json({ message: "Booking không tồn tại" });

    // Tạo object cho maintenance_records
    const maintData = {
      booking_id: id,
      car: booking.car,
      owner_name: booking.owner_name || booking.name,
      owner_email: booking.owner_email || null, // có thể null nếu không gửi
      phone: booking.phone,
      date: booking.date,
      description: `Booking #${id} đã được cập nhật trạng thái -> ${status}`,
      status: status === "Đã hoàn thành" ? "Đang xử lý" : (status === "Đã hủy" ? "Đã hủy" : status),
      cost: 0,
    };

    // 3) Insert vào maintenance_records
    await Maintenance.create(maintData);

    res.json({ message: "Cập nhật trạng thái và tạo bản ghi bảo dưỡng thành công!" });
  } catch (error) {
    console.error("Lỗi updateBookingStatus:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái!" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.delete(id);
    res.json({ message: "Xóa thành công!" });
  } catch (error) {
    console.error("Lỗi deleteBooking:", error);
    res.status(500).json({ message: "Lỗi khi xóa!" });
  }
};
