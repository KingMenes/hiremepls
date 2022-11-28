import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "../controllers/questionController.js";

router.get("/", getQuestions);
router.post("/", protect, createQuestion);
router.put("/:id", protect, updateQuestion);
router.delete("/id", protect, deleteQuestion);

export default router;
