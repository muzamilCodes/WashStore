import express from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cartController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, getCart);
router.post("/add", authenticate, addToCart);
router.delete("/remove/:productId", authenticate, removeFromCart);
router.delete("/clear", authenticate, clearCart);

export default router;
