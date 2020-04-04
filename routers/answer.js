const express = require("express");
const router = express.Router({ mergeParams: true});
const { answerQuestion, getAllAnswers, getSingleAnswer } = require("../controllers/answer");
const { getAccessToRoute } = require("../middlewares/authorization/auth")

router.post("/", getAccessToRoute, answerQuestion);
router.get("/", getAllAnswers)
router.get("/:answer_id", getSingleAnswer)

module.exports = router;