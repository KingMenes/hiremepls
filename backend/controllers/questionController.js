import DBDAO from "../dao/questionsDAO.js";
import asyncHandler from "express-async-handler"
import Question from "../models/questionModel.js"
// export default class QuestionsController {
//   static async apiGetQuestions(req, res, next) {
//     const { questionsList, totalNumQuestions } = await DBDAO.getQuestions({});
//     let response = {
//       questions: questionsList,
//       // page: page,
//       // filters: filters,
//       // entries_per_page: questionsPerPage,
//       total_results: totalNumQuestions,
//     };
//     res.json(response);
//   }
// }

export const getQuestions = asyncHandler(async (req, res) => {
  // const { questionsList } = await DBDAO.getQuestions({})
  const questionsList = await Question.find()
  res.json(questionsList)
})

export const createQuestion = asyncHandler(async (req, res) => {
  if (!req.body.question) {
    res.status(400)
    throw new Error('Please add a question')
  }

  const question = await Question.create({
    question: req.body.question,

  })

  res.json(question)
})

export const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
  if (!question) {
    res.status(400)
    throw new Error('Question not found')
  }

  const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(updatedQuestion)
})

export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
  if (!question) {
    res.status(400)
    throw new Error('Question not found')
  }
  await question.remove()
  res.json({ "id": req.params.id })
})
