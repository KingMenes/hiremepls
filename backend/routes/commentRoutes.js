import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentsController.js";

router.get("/", getComments);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/id", deleteComment);
export default router;
