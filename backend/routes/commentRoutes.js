import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentController.js";

router.get("/", getComments);
router.post("/", protect, createComment);
router.put("/:id", protect, updateComment);
router.delete("/id", protect, deleteComment);

export default router;
