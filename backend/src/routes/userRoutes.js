import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateProfile
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/fetch", authenticate, fetchUser);
router.put("/profile", authenticate, updateProfile);

export default router;
