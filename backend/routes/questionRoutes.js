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
  updateComment,
  repComment,
} from "../controllers/questionController.js";

router.get("/", getQuestions);
router.get("/:id", getQuestion);
router.post("/", createQuestion);
router.put("/:questionId/repComment/:commentId", repComment);
router.put("/:questionId/comment/:commentId", updateComment);
router.put("/rep/:id", repQuestion);
router.put("/view/:id", viewQuestion);
router.put("/comments/:id", addComment);
router.put("/:id", updateQuestion);
router.delete("/:questionId/comment/:commentId", deleteComment);
router.delete("/:id", deleteQuestion);

export default router;
