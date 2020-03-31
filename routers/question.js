const express = require('express')
const {askNewQuestion, getAllQuestions, getSingleQuestion} = require('../controllers/question')
const router = express.Router()
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers")
const { getAccessToRoute } = require("../middlewares/authorization/auth")

router.get("/", getAllQuestions)
router.get("/:id", checkQuestionExist, getSingleQuestion)
router.post("/ask", getAccessToRoute, askNewQuestion)



module.exports = router;