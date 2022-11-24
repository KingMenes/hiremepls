import express from "express";
const router = express.Router();

// import QuestionsCtrl from "../controllers/questionController.js";
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controllers/questionController.js"

router.get('/', getQuestions)
router.post('/', createQuestion)
router.put('/:id', updateQuestion)
router.delete('/id', deleteQuestion)
// router.route("/").get(QuestionsCtrl.apiGetQuestions);

export default router;
