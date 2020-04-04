const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref: "Question",
        required:true
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Answer",AnswerSchema)
