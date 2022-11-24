const mongoose = require("mongoose"); 

const commentSchema = mongoose.Schema(
    {
        body: {
            type: String,
            required:[true, 'Please add a body']
        },
        reputation: {
            //likes/dislikes
            type: Array,
            required: [true, "Please add reps"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please add an author"],
            ref:"User",
        },
        replies: {
            type: Array,
        },
        date: {
            type: Date,
            required:[true, 'Please add date']
        }
    }
)