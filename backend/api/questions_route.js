import express from "express";

const router = express.Router();
import QuestionsCtrl from "./questions.controller.js";

router.route("/").get(QuestionsCtrl.apiGetQuestions);

export default router;
