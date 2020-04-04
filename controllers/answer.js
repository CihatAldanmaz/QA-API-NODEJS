const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError")
const asyncWrapper = require("express-async-handler")

const answerQuestion = asyncWrapper(async(req,res,next) => {
    const information = req.body;

    const answer = await Answer.create({
        ...information,
        user: req.user.id
        
    })

    res.status(200)
    .json({
        success:true,
        data:answer
    })
})

module.exports = {
    answerQuestion
}