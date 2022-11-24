const mongoose = require("mongoose");
const userSchema = require("./userModel");

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
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
        required:[true, 'Please add at least one tag']
  }
});

module.exports = mongoose.model("Question", questionSchema);
