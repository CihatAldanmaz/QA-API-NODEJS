const Answer = require("../models/Answer");
const Question = require("../models/Question")
const CustomError = require("../helpers/error/CustomError");
const asyncWrapper = require("express-async-handler")

const answerQuestion = asyncWrapper(async(req,res,next) => {
    const information = req.body;
    

    const answer = await Answer.create({
        ...information,
        question: req.params.id,
        user: req.user.id
    })

    res.status(200)
    .json({
        success:true,
        data:answer
    })
})

const getAllAnswers = asyncWrapper(async(req,res,next) => {
    const {id} = req.params
    
    const question = await Question.findById(id).populate("answers")

   const answers = question.answers;

    res.status(200)
    .json({
        success:true,
        data:answers
    })
})

const getSingleAnswer = asyncWrapper(async (req,res,next) => {
    const {answer_id} = req.params;
    
    const answer = await Answer
    .findById(answer_id)
    .populate({
        path:"question",
        select: "title"
    })
    .populate({
        path:"user",
        select: "name profile_image"
    })

    res.status(200)
    .json({
        success:true,
        data:answer
    })
})

module.exports = {
    answerQuestion,
    getAllAnswers,
    getSingleAnswer
}