import mongoose from "mongoose";
import User from "./userModel.js";
import Comment from "./commentModel.js"

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
    required: [true, "Please add at least one tag"],
  },
});
export default mongoose.model("Question", questionSchema);
