const express = require('express')
const {register,getUser,login,logout,imageUpload,editDetails} = require("../controllers/auth")
const { getAccessToRoute} = require("../middlewares/authorization/auth")
const profileImageUpload = require("../middlewares/libraries/profileImageUpload")
const router = express.Router()

router.post("/register",register);
router.post("/login",login);
router.get("/profile",getAccessToRoute,getUser);
router.get("/logout",getAccessToRoute,logout);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload)
router.put("/edit",getAccessToRoute,editDetails)


module.exports = router;