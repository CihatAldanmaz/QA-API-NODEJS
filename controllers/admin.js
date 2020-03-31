const User = require("../models/User")
const CustomError = require("../helpers/error/CustomError")
const asyncWrapper = require("express-async-handler")

const blockUser = asyncWrapper( async(req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id)

    user.blocked= !user.blocked

    await user.save()
    return res.status(200)
    .json({
        success : true,
        message: "Block - Unblocked sucessfull"
    })
})

const deleteUser = asyncWrapper( async(req,res,next) => {
   const {id} = req.params;

   const user = await User.findById(id);
   await user.remove()

   return res.status(200)
   .json({
       success:true,
       message:"User deleted"
   })
})

module.exports = {
    blockUser,
    deleteUser
}