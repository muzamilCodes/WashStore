import express from "express";
import {
  getOnSaleProducts,
  getFeaturedProducts,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} from "../controllers/productController.js";

const router = express.Router();

router.get("/OnSale", getOnSaleProducts);
router.get("/Featured", getFeaturedProducts);
router.get("/categories", getCategories);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
