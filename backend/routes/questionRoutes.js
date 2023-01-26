import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
  repQuestion,
  viewQuestion,
  addComment,
  getQuestion,
  deleteComment,
  updateComment
} from "../controllers/questionController.js";

router.get("/", getQuestions);
router.get("/:id", getQuestion);
router.post("/", protect, createQuestion);
router.put("/:questionId/comment/:commentId", protect, updateComment)
router.put("/rep/:id", protect, repQuestion);
router.put("/view/:id", protect, viewQuestion);
router.put("/comments/:id", protect, addComment);
router.put("/:id", protect, updateQuestion);
router.delete("/:questionId/comment/:commentId", protect, deleteComment)
router.delete("/:id", protect, deleteQuestion);

export default router;
