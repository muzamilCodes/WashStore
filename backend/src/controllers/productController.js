import { onSaleProducts, featuredProducts } from "../data/products.js";

export const getOnSaleProducts = (req, res) => {
  return res.status(200).json({
    message: "On sale products fetched successfully",
    payload: onSaleProducts
  });
};

export const getFeaturedProducts = (req, res) => {
  return res.status(200).json({
    message: "Featured products fetched successfully",
    payload: featuredProducts
  });
};
