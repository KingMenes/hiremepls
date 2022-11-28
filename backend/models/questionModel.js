import mongoose from "mongoose";
import User from "./userModel.js";
import Comment from "./commentModel.js";

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
    default: [0, 0],
  },
  comments: {
    // might change
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Question", questionSchema);
