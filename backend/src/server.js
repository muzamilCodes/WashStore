import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middlewares
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// API Routes
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// Interactive Swagger-style HTML Dashboard for Developers
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>⚡ SwashBuckle API Engine — Docs & Dashboard</title>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background: #0b0f19; color: #f1f5f9; padding: 40px 20px; }
        .container { max-width: 980px; margin: 0 auto; }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 24px; margin-bottom: 32px; }
        .badge { background: #4f46e5; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .status-pill { background: #064e3b; color: #34d399; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid #059669; }
        .section-title { font-size: 20px; font-weight: 800; margin: 28px 0 16px; color: #93c5fd; }
        .api-card { background: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 14px 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
        .method { font-family: 'JetBrains Mono', monospace; font-weight: 800; font-size: 13px; padding: 4px 10px; border-radius: 6px; margin-right: 12px; }
        .get { background: #065f46; color: #6ee7b7; }
        .post { background: #1e40af; color: #93c5fd; }
        .put { background: #854d0e; color: #fde047; }
        .delete { background: #991b1b; color: #fca5a5; }
        .path { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; color: #ffffff; }
        .desc { color: #94a3b8; font-size: 13px; }
        a { color: #818cf8; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div>
            <h1 style="font-size: 28px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
              <span>⚡ SwashBuckle API Engine</span>
              <span class="badge">v2.0 (INR ₹)</span>
            </h1>
            <p style="color: #94a3b8; font-size: 14px; margin-top: 6px;">
              Full-featured Node.js Express eCommerce Backend running on port <strong>${config.port}</strong>
            </p>
          </div>
          <div class="status-pill">● System Operational</div>
        </div>

        <div class="section-title">📦 Product APIs</div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/product/OnSale" target="_blank">/api/product/OnSale</a></span></div>
          <span class="desc">Hot deals & discounted products (Redux)</span>
        </div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/product/Featured" target="_blank">/api/product/Featured</a></span></div>
          <span class="desc">Featured catalog & full collections (Redux)</span>
        </div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/product" target="_blank">/api/product</a></span></div>
          <span class="desc">Filter products by category, search & sort</span>
        </div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/product/categories" target="_blank">/api/product/categories</a></span></div>
          <span class="desc">All categories with product counts</span>
        </div>
        <div class="api-card">
          <div><span class="method post">POST</span><span class="path">/api/product</span></div>
          <span class="desc">Create new product in Indian Rupees (₹)</span>
        </div>

        <div class="section-title">👤 User & Authentication APIs</div>
        <div class="api-card">
          <div><span class="method post">POST</span><span class="path">/api/user/register</span></div>
          <span class="desc">Sign up user & issue authentication cookie</span>
        </div>
        <div class="api-card">
          <div><span class="method post">POST</span><span class="path">/api/user/login</span></div>
          <span class="desc">Sign in with email & password</span>
        </div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/user/fetch" target="_blank">/api/user/fetch</a></span></div>
          <span class="desc">Fetch logged-in user profile</span>
        </div>
        <div class="api-card">
          <div><span class="method put">PUT</span><span class="path">/api/user/profile</span></div>
          <span class="desc">Update user name, phone, address & avatar</span>
        </div>

        <div class="section-title">🛒 Cart & Checkout APIs</div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/cart" target="_blank">/api/cart</a></span></div>
          <span class="desc">Get current user shopping cart</span>
        </div>
        <div class="api-card">
          <div><span class="method post">POST</span><span class="path">/api/cart/add</span></div>
          <span class="desc">Add product item to cart</span>
        </div>
        <div class="api-card">
          <div><span class="method delete">DEL</span><span class="path">/api/cart/remove/:productId</span></div>
          <span class="desc">Remove item from cart</span>
        </div>

        <div class="section-title">🧾 Orders & Invoicing (₹)</div>
        <div class="api-card">
          <div><span class="method post">POST</span><span class="path">/api/order/create</span></div>
          <span class="desc">Place order, calculate tax in ₹ & clear cart</span>
        </div>
        <div class="api-card">
          <div><span class="method get">GET</span><span class="path"><a href="/api/order/my-orders" target="_blank">/api/order/my-orders</a></span></div>
          <span class="desc">Fetch user order history</span>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Centralized Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`⚡ SwashBuckle Full Backend Engine running on http://localhost:${config.port}`);
});
