import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logInUser,
  getMe,
  isAuth,
  logoutUser,
} from "../controllers/userController.js";
import { restoreUser, setTokenCookie } from "../auth.js";

const router = express.Router();

router.get("/me", getMe);
router.get("/isAuth", restoreUser, isAuth);
router.get("/:id", getUser);
router.get("/:username", getUser);
router.post("/login", logInUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/", logoutUser);
router.delete("/:id", deleteUser);

export default router;
