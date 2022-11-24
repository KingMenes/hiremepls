import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

export const getUser = asyncHandler(async (req, res) => {
    // const { questionsList } = await DBDAO.getQuestions({})
    const user = await User.findById(req.params.id)
    if (!user) {
        res.json({ error: "user not found" })
    }
    res.json(user)
})

export const createUser = asyncHandler(async (req, res) => {
    if (!req.body.question) {
        res.status(400)
        throw new Error('Please add a question')
    }

    const question = await Question.create({
        question: req.body.question,
        author: req.body.author,
        date: new Date(),
        comments: [],
        reputation: [],
        tags: req.body.tags,
    })

    res.json(question)
})

export const updateUser = asyncHandler(async (req, res) => {
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

export const deleteUser = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)
    if (!question) {
        res.status(400)
        throw new Error('Question not found')
    }
    await question.remove()
    res.json({ "id": req.params.id })
})
