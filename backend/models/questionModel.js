import mongoose from "mongoose";
import User from "./userModel.js";
import Comment from "./commentModel.js";

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please add a question"],
  },
  body: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
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
    // type: mongoose.Schema.Types.Array,
    // default: [0, 0],
  },
  comments: {
    // might change
    type: mongoose.Schema.Types.Array,
    default: [],
    ref: "Comment"
  },
  tags: {
    type: mongoose.Schema.Types.Array,
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  },
  authorName: {
    type: String,
  },
});
export default mongoose.model("Question", questionSchema);
