import express from "express";
import { registerUser, loginUser, fetchUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/fetch", fetchUser);

export default router;
