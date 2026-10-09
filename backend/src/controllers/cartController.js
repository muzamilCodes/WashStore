import { db } from '../db/storage.js';

export const getCart = (req, res) => {
  const data = db.read();
  const userId = req.user?.userId || "guest";
  const userCart = data.carts[userId] || [];

  return res.status(200).json({
    message: "Cart fetched successfully",
    payload: userCart
  });
};

export const addToCart = (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const data = db.read();
  const userId = req.user?.userId || "guest";

  const product = data.products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!data.carts[userId]) {
    data.carts[userId] = [];
  }

  const existing = data.carts[userId].find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    data.carts[userId].push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  db.write(data);
  return res.status(200).json({
    message: "Item added to cart",
    payload: data.carts[userId]
  });
};

export const removeFromCart = (req, res) => {
  const id = parseInt(req.params.productId);
  const data = db.read();
  const userId = req.user?.userId || "guest";

  if (data.carts[userId]) {
    data.carts[userId] = data.carts[userId].filter(item => item.id !== id);
    db.write(data);
  }

  return res.status(200).json({
    message: "Item removed from cart",
    payload: data.carts[userId] || []
  });
};

export const clearCart = (req, res) => {
  const data = db.read();
  const userId = req.user?.userId || "guest";
  data.carts[userId] = [];
  db.write(data);

  return res.status(200).json({ message: "Cart cleared" });
};
