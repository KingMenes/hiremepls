import express from "express"

const router = express.Router()
import QuestionsCtrl from "../controllers/questionController.js"

router.route("/").get(QuestionsCtrl.apiGetQuestions)




export default router
