import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import Question from '../models/questionModel.js'

export const getComments = asyncHandler(async (req, res) => {
  const commentsList = await Comment.find();
  console.log(req.user);
  res.json(commentsList);
});

export const createComment = asyncHandler(async (req, res) => {
  if (!req.body.body) {
    res.status(400);
    throw new Error("Please add a comment");
  }

  const comment = await Comment.create({
    body: req.body.body,
    author: req.user.id,
    date: new Date(),
  });

  res.json(comment);
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  const { comment: commentBody, user: userFront, commentId, questionId } = req.body
  if (commentId) {
    await comment.replies.push({ comment: commentBody, user: userFront })
    await comment.save()
    console.log(comment)
    res.json(comment)
    return
  }


  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //checking if author is same as user
  if (comment.author.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedComment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //checking if author is same as user
  if (comment.author.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await comment.remove();
  res.json({ id: req.params.id });
});
