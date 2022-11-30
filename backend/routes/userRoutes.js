import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logInUser,
  getMe,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/:id", getUser);
router.post("/login", logInUser);
router.post("/", createUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

export default router;
