const express = require("express");
const router = express.Router();
const { answerQuestion } = require("../controllers/answer")

router.get("/", (req,res,next) => {res.send("Hello Answer")})

module.exports = router;