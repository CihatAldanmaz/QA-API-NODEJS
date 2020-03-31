const Question = require("../models/Question");
const CustomError = require("../helpers/error/CustomError")
const asyncWrapper = require("express-async-handler")


const askNewQuestion = asyncWrapper(async (req,res,next) => {
    const information = req.body;

    const question = await Question.create({
        ...information,
        user: req.user.id
    })

    res.status(200)
    .json({
        success:true,
        data:question
    })
})

const getAllQuestions = asyncWrapper(async (req,res,next) => {
 
    const questions = await Question.find()

   res
   .status(200)
 .json({
        success:true,
        data:questions
    })

})



const getSingleQuestion = asyncWrapper(async (req,res,next) => {
 
    const {id} = req.params;

    const question = await Question.findById(id);

    res.status(200)
    .json({
        success:true,
        data:question
    })

})

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion
}


