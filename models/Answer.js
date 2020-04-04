const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./Question")

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

AnswerSchema.pre("save", async function(next){
    if(!this.isModified("user")){
        return next();
    }
    console.log("hereisgo")

    try {
    const question = await Question.findById(this.question)

    question.answers.push(this._id);

    await question.save();
        next();
    } catch (error) {
        return new(err)
    }

    

})

module.exports = mongoose.model("Answer",AnswerSchema)
