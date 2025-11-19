// routes/maintenanceRoutes.js
import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
  getByUser, // ✅ thêm hàm này
} from "../controllers/maintenanceController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// 🟢 ADMIN
router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);
router.post("/", verifyToken, create);
router.put("/:id", verifyToken, update);
router.patch("/:id/status", verifyToken, updateStatus);
router.delete("/:id", verifyToken, remove);

// 🟢 USER – lấy lịch hẹn của chính họ
router.get("/my/records", verifyToken, getByUser);

export default router;
