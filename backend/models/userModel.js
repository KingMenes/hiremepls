// const mongoose = require("mongoose"); //Mongoose is a package that helps interface with MongoDB
// const questionSchema = require("./questionModel"); //Required to access questions submitted by users

import mongoose from "mongoose";
import questionSchema from "./questionModel.js";
// Defines a schema, or a structure for data that will be sent to MongoDB.
// Usually just the attributes an object would have
const userSchema = mongoose.Schema(
  {
    username: {
      type: String, // Defines the type of data going in, in this case the username will be a string

      // first element is a boolean to describe if this property is required.
      // second element is the message returned if the required property is not provided.
      required: [true, "Please add a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"], //hashed, obviously
    },
    role: {
      type: String,
      required: [true, "Please add a role"], //roles can be user, admin, etc.
    },
    reputation: {
      // will be a 2 element array with number of likes and number of dislikes a user has.
      type: Array,
      required: [true, "Please provide an array of likes/dislikes"],
    },
    nameLower: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true, //timestamps of when objects are created in DB.
  }
);

export default mongoose.model("User", userSchema);
