import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

// import QuestionsCtrl from "../controllers/questionController.js";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "../controllers/questionController.js";

router.get("/", protect, getQuestions);
router.post("/", protect, createQuestion);
router.put("/:id", protect, updateQuestion);
router.delete("/id", protect, deleteQuestion);
// router.route("/").get(QuestionsCtrl.apiGetQuestions);

export default router;
