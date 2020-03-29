const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError")
const asyncWrapper = require("express-async-handler")
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers")
const {comparePassword} = require("../helpers/input/inputHelpers")

const register = asyncWrapper(async (req, res, next) => {

  const { name, email, password } = req.body;

  
    const user = await User.create({
        name,
        email,
        password
      });
      sendJwtToClient(user,res)
      // const token = user.generateJwtFromUser();
      
      // res.json({
      //   success: true,
      //   data: user
      // });
      
});

const login = asyncWrapper(async (req,res,next) => {
  const {email,password} = req.body;

  const user = await User.findOne({email}).select("+password");
  
  if(!comparePassword(password,user.password)){
    return next(new CustomError("Please check your email and password"))
  }

  sendJwtToClient(user,res)

})

const logout = asyncWrapper(async (req,res,next) => {
  
return res
.status(200)
.json({
  success: true
})

})

const errorTest = (req, res, next) => {
  //some code
  return next(new CustomError("Custom Error Message",400));
};

const getUser = (req,res,next) => {
    res.json({
        success:true,
        data:{
          id: req.user.id,
          name: req.user.name
        }
    })
}

module.exports = {
  register,
  getUser,
  login,
  logout
};
