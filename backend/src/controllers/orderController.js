import { db } from '../db/storage.js';

export const createOrder = (req, res) => {
  const { items, shippingAddress, paymentMethod = "UPI" } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Order must contain at least one item" });
  }

  const data = db.read();
  const userId = req.user?.userId || data.users[0].userId;

  let totalNumeric = 0;
  items.forEach(item => {
    const p = parseInt(String(item.price).replace(/\D/g, '')) || 0;
    totalNumeric += p * (item.quantity || 1);
  });

  const newOrder = {
    orderId: "ord_" + Date.now(),
    userId,
    items,
    totalAmount: "₹" + totalNumeric.toLocaleString('en-IN'),
    status: "Confirmed",
    shippingAddress: shippingAddress || "Default Delivery Address, India",
    paymentMethod,
    createdAt: new Date().toISOString()
  };

  data.orders.unshift(newOrder);
  // Clear cart on order creation
  if (data.carts[userId]) {
    data.carts[userId] = [];
  }
  db.write(data);

  return res.status(201).json({
    message: "Order placed successfully! 🛍️",
    payload: newOrder
  });
};

export const getOrders = (req, res) => {
  const data = db.read();
  const userId = req.user?.userId;
  const orders = userId ? data.orders.filter(o => o.userId === userId) : data.orders;

  return res.status(200).json({
    message: "Orders fetched",
    payload: orders
  });
};

export const getOrderById = (req, res) => {
  const data = db.read();
  const order = data.orders.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.status(200).json({
    message: "Order details",
    payload: order
  });
};
