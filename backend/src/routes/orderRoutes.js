import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authenticate, createOrder);
router.get("/my-orders", authenticate, getOrders);
router.get("/:orderId", authenticate, getOrderById);

export default router;
