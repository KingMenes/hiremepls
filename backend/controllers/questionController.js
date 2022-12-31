import { json } from "express";
import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";


export const getQuestions = asyncHandler(async (req, res) => {
  // const { questionsList } = await DBDAO.getQuestions({})
  const questionsList = await Question.find();
  res.json(questionsList);
});

export const createQuestion = asyncHandler(async (req, res) => {
  if (!req.body.user) return res.json({ error: "Must be logged in" });
  if (!req.body.question) {
    res.status(400);
    throw new Error("Please add a question");
  }

  const question = await Question.create({
    question: req.body.question,
    author: req.body.user,
    date: new Date(),
    comments: [],
    // reputation: [],
    tags: req.body.tags,
    authorName: req.body.user.username,
  });

  res.json(question);
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { view, id, question: quest, tags, body, position, company, user: currentUser } = req.body
  if (view) {
    const question = await Question.findById(view)
    let views = question.views

    question.views = views + 1
    await question.save()
    res.json(question)
    return
  }
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  const user = await User.findOne({ email: req?.session?.user?.email });
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //checking if author is same as user

  if (question.author.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedQuestion = await Question.findById(id);
  updatedQuestion.question = quest
  updatedQuestion.tags = tags
  updatedQuestion.body = body
  updatedQuestion.position = position
  updatedQuestion.company = company

  await updatedQuestion.save()

  res.json(updatedQuestion);
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }

  const user = await User.findOne({ email: req.session.user.email });

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //checking if author is same as user
  if (question.author.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await question.remove();

  res.json({ question });
});
