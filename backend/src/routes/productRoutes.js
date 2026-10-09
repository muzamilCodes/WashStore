import express from "express";
import { getOnSaleProducts, getFeaturedProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/OnSale", getOnSaleProducts);
router.get("/Featured", getFeaturedProducts);

export default router;
