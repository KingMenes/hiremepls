import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
  repQuestion,
} from "../controllers/questionController.js";

router.get("/", getQuestions);
router.post("/", protect, createQuestion);
router.put("/rep/:id", protect, repQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", protect, deleteQuestion);

export default router;
