// controllers/maintenanceController.js
import Maintenance from "../models/Maintenance.js";

// 🟢 Lấy tất cả lịch bảo dưỡng
export const getAll = async (req, res) => {
  try {
    const data = await Maintenance.getAll();
    res.json(data);
  } catch (err) {
    console.error("❌ Lỗi getAll:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách bảo dưỡng!" });
  }
};

// 🟢 Lấy chi tiết theo ID
export const getById = async (req, res) => {
  try {
    const item = await Maintenance.getById(req.params.id);
    if (!item) return res.status(404).json({ message: "Không tìm thấy!" });
    res.json(item);
  } catch (err) {
    console.error("❌ Lỗi getById:", err);
    res.status(500).json({ message: "Lỗi khi lấy chi tiết!" });
  }
};

// 🟢 Tạo mới
export const create = async (req, res) => {
  try {
    const id = await Maintenance.create(req.body);
    res.status(201).json({ message: "Thêm bảo dưỡng thành công!", id });
  } catch (err) {
    console.error("❌ Lỗi create:", err);
    res.status(500).json({ message: "Không thể tạo bản ghi bảo dưỡng!" });
  }
};

// 🟢 Cập nhật thông tin
export const update = async (req, res) => {
  try {
    await Maintenance.update(req.params.id, req.body);
    res.json({ message: "Cập nhật thành công!" });
  } catch (err) {
    console.error("❌ Lỗi update:", err);
    res.status(500).json({ message: "Không thể cập nhật!" });
  }
};

// 🟢 Cập nhật trạng thái (Đồng ý / Từ chối)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Đã hoàn thành", "Đang xử lý", "Đã hủy"].includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ!" });
    }
    await Maintenance.updateStatus(req.params.id, status);
    res.json({ message: "Cập nhật trạng thái thành công!" });
  } catch (err) {
    console.error("❌ Lỗi updateStatus:", err);
    res.status(500).json({ message: "Không thể cập nhật trạng thái!" });
  }
};

// 🟢 Xóa
export const remove = async (req, res) => {
  try {
    await Maintenance.delete(req.params.id);
    res.json({ message: "Đã xóa thành công!" });
  } catch (err) {
    console.error("❌ Lỗi remove:", err);
    res.status(500).json({ message: "Không thể xóa bản ghi!" });
  }
};

// 🟢 Lấy lịch của người dùng hiện tại
export const getByUser = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(400).json({ message: "Không tìm thấy email người dùng!" });

    const data = await Maintenance.getByUserEmail(email);
    res.json(data);
  } catch (err) {
    console.error("❌ Lỗi getByUser:", err);
    res.status(500).json({ message: "Không thể lấy dữ liệu người dùng!" });
  }
};
