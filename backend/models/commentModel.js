import mongoose from "mongoose";
import User from "./userModel.js";
import Comment from "./commentModel.js";

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: [true, "Please add a body"],
  },
  reputation: {
    //likes/dislikes
    // type: mongoose.Schema.Types.Array,
    // default: [0, 0],
  },
  author: {
    // type: mongoose.Schema.Types.ObjectId,
    // required: [true, "Please add an author"],
    // ref: "User",
  },
  replies: {
    type: mongoose.Schema.Types.Array,
    default: [],
  },
  date: {
    type: Date,
    required: [true, "Please add date"],
  },
});

export default mongoose.model("Comment", commentSchema);
