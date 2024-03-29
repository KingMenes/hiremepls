import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

export const getQuestions = asyncHandler(async (req, res) => {
  const questionsList = await Question.find();
  res.json(questionsList);
});

export const getQuestion = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const question = await Question.findById(req.params.id);
  res.json(question);
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
    reputation: { likes: { count: 0 }, dislikes: { count: 0 } },
    tags: req.body.tags,
    authorName: req.body.user.username,
  });

  res.json(question);
});

export const repQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rep, username } = req.body;

  const question = await Question.findOne({ _id: id });
  let discount = question.reputation.dislikes.count;
  let licount = question.reputation.likes.count;

  if (rep === "like") {
    if (question.reputation.dislikes[username]) {
      delete question.reputation.dislikes[username];
      question.reputation.dislikes.count = discount - 1;
    }
    if (question.reputation.likes[username]) {
      delete question.reputation.likes[username];
      question.reputation.likes.count = licount - 1;
    } else {
      question.reputation.likes[username] = rep;
      question.reputation.likes.count = licount + 1;
    }
  }
  if (rep === "dislike") {
    if (question.reputation.likes[username]) {
      delete question.reputation.likes[username];
      question.reputation.likes.count = licount - 1;
    }
    if (question.reputation.dislikes[username]) {
      delete question.reputation.dislikes[username];
      question.reputation.dislikes.count = discount - 1;
    } else {
      question.reputation.dislikes[username] = rep;
      question.reputation.dislikes.count = discount + 1;
    }
  }
  question.markModified("reputation");
  await question.save();
  res.json(question);
});

// This is used to increment the views. Not be be confused with getQuestion().
// Should be renamed to avoid confusion.
export const viewQuestion = asyncHandler(async (req, res) => {
  const { view } = req.body;
  const question = await Question.findById(view);
  let views = question?.views;
  question.views = views + 1;
  await question.save();
  res.json(question);
  return;
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const {
    id,
    question: quest,
    tags,
    body,
    position,
    company,
    user: currentUser,
  } = req.body;

  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  const user = await User.findOne({ email: currentUser.email });
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
  updatedQuestion.question = quest;
  updatedQuestion.tags = tags;
  updatedQuestion.body = body;
  updatedQuestion.position = position;
  updatedQuestion.company = company;

  await updatedQuestion.save();

  res.json(updatedQuestion);
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }

  const user = await User.findOne({ email: req?.headers?.user });

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

export const addComment = asyncHandler(async (req, res) => {
  const { id, user: currentUser, comment } = req.body;
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  const user = await User.findOne({ email: currentUser.email });
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("Not logged in!");
  }
  const comm = await Comment.create({
    body: comment.body,
    author: { username: comment.user.username, email: comment.user.email },
    reputation: { likes: { count: 0 }, dislikes: { count: 0 } },
    date: new Date(),
  });

  question.comments.push(comm);
  question.save();
  res.json(question);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId, questionId } = req.params;
  const question = await Question.findById(questionId);
  const comment = await Comment.findById(commentId);
  for (let i = 0; i < question.comments.length; i++) {
    let comment = question.comments[i];
    if (comment._id.toString() === commentId) {
      question.comments.splice(i, 1);
      await question.save();
      break;
    }
  }
  await comment.remove();

  res.json(question);
});

export const updateComment = asyncHandler(async (req, res) => {
  const { comment: body, reply, user } = req.body;
  const { questionId, commentId } = req.params;

  const question = await Question.findById(questionId);
  const comment = await Comment.findById(commentId);
  console.log(reply);
  if (reply) {
    comment.replies.push({ reply, user });
    await comment.save();
  }
  if (body) {
    comment.body = body;
    await comment.save();
  }

  for (let i = 0; i < question.comments.length; i++) {
    let comm = question.comments[i];
    if (comm._id.toString() === commentId) {
      question.comments[i] = comment;
      await question.save();
      break;
    }
  }
  console.log(question.comments);
  res.json(question);
});
const reputation = async (question, comment) => {
  for (let i = 0; i < question.comments.length; i++) {
    let com = question.comments[i];
    if (com._id.toString() === comment._id.toString()) {
      question.comments[i] = comment;
      question.markModified(`comments`);
      await question.save();
    }
  }

  return question;
};
export const repComment = asyncHandler(async (req, res) => {
  const { rep, user } = req.body;
  const { questionId, commentId } = req.params;
  const question = await Question.findById(questionId);
  const comment = await Comment.findById(commentId);
  let liked = comment.reputation.likes.count;
  let disliked = comment.reputation.dislikes.count;

  if (rep === "like") {
    if (comment.reputation.dislikes[user.username]) {
      delete comment.reputation.dislikes[user.username];
      comment.reputation.dislikes.count = disliked - 1;
      comment.markModified(`reputation`);
      await comment.save();
    }
    if (!comment.reputation.likes[user.username]) {
      comment.reputation.likes[user.username] = rep;
      comment.reputation.likes.count = liked + 1;
      comment.markModified(`reputation`);
      comment.save();
      const resi = await reputation(question, comment);
      return res.json(resi);
    } else if (comment.reputation.likes[user.username]) {
      delete comment.reputation.likes[user.username];
      comment.reputation.likes.count = liked - 1;
      comment.markModified(`reputation`);
      await comment.save();
      const resi = await reputation(question, comment);
      return res.json(resi);
    }
  } else if (rep === "dislike") {
    if (comment.reputation.likes[user.username]) {
      delete comment.reputation.likes[user.username];
      comment.reputation.likes.count = liked - 1;
      comment.markModified(`reputation`);
      await comment.save();
    }
    if (!comment.reputation.dislikes[user.username]) {
      comment.reputation.dislikes[user.username] = rep;
      comment.reputation.dislikes.count = disliked + 1;
      comment.markModified(`reputation`);
      comment.save();
      const resi = await reputation(question, comment);
      return res.json(resi);
    } else if (comment.reputation.dislikes[user.username]) {
      delete comment.reputation.dislikes[user.username];
      comment.reputation.dislikes.count = disliked - 1;
      comment.markModified(`reputation`);
      await comment.save();
      const resi = await reputation(question, comment);
      return res.json(resi);
    }
  }
});
