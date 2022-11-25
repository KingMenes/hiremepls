import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.json({ error: "user not found" })
    }
    res.json(user)
})

//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export const createUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body
    if (!username) {
        res.status(400)
        throw new Error('Please add a username')
    }
    if (!password) {
        res.status(400)
        throw new Error('Please add a password')
    }
    if (!email) {
        res.status(400)
        throw new Error('Please add an email address')
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }
    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        reputation: [],
    })

    if (user) {
        res.status(201).json({ _id: user.id, token: generateToken(user._id), username: user.username, email: user.email, reputation: user.reputation })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

export const logInUser = asyncHandler(async (req, res) => {
    const { email, password, id } = req.body
    const user = await User.findOne(email)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ _id: user.id, token: generateToken(user._id), username: user.username, email: user.email, reputation: user.reputation })
    } else {
        res.status(400)
        throw new Error('Invalid credentals')
    }
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
