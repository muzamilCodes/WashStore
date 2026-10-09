import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5095;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

// Root health check
app.get("/", (req, res) => {
  res.json({
    message: "⚡ SwashBuckle API Server is running in INR (₹) mode!",
    port: PORT,
    endpoints: [
      "GET /api/product/OnSale",
      "GET /api/product/Featured",
      "POST /api/user/register",
      "POST /api/user/login",
      "GET /api/user/fetch"
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
