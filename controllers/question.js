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

const editQuestion = asyncWrapper(async(req,res,next) => {
    const {id} = req.params;
    const {title,content} = req.body;

    let question = await Question.findById(id)

    question.title = title;
    question.content = content;

    question = await question.save()

    return res.status(200)
    .json({
        success:true,
        data:question
    })
    
})

const deleteQuestion = asyncWrapper(async(req,res,next) => {
    const id = req.params.id;

    await Question.findByIdAndDelete(id);
    console.log(id)
    res.status(200)
    .json({
        success:true,
        questionID:id
    })
})

const likeQuestion = asyncWrapper(async(req,res,next) => {
    const {id} = req.params;

    const question = await Question.findById(id)
    console.log(question)
    if(question.likes.includes(req.user.id)){
        return next(new CustomError("You already liked this it",400))
    }

    question.likes.push(req.user.id);

    await question.save();

    return res.status(200)
    .json({
        success: true,
        data:question
    })
})

const undoLike = asyncWrapper(async(req,res,next) => {
    const {id} = req.params

    let question = await Question.findById(id);

    if(!question.likes.includes(req.user.id)){
        return next(new CustomError("You can't undolike this question"))
    }

    const index = question.likes.indexOf(req.user.id)
    question.likes.splice(index,1)

    await question.save();

    res.status(200)
    .json({
        success:true,
        data:question
    })
})

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLike
}


