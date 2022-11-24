// const mongoose = require("mongoose");
// const userSchema = require("./userModel");
import mongoose from "mongoose";
import userSchema from "./userModel.js"

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please add a question"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add an author"],
    ref: "User",
  },
  date: {
    type: Date,
    required: [true, "Please add a date"],
  },
  reputation: {
    //likes/dislikes
    type: Array,
    required: [true, "Please add reps"],
  },
  comments: {
    // might change
    type: Array,
  },
  tags: {
    type: Array,
    required: [true, 'Please add at least one tag']
  }
});
export default mongoose.model("Question", questionSchema)
// module.exports = mongoose.model("Question", questionSchema);
