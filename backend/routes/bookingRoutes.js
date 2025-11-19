// routes/bookingRoutes.js
import express from "express";
import { createBooking, getBookings, updateBookingStatus, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:id", updateBookingStatus);   // cập nhật status + tạo maintenance_records
router.delete("/:id", deleteBooking);

export default router;
