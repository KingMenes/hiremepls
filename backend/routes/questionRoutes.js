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
router.post("/", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
