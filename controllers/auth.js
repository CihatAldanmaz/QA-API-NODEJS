const User = require("../models/User");


const register = async (req,res,next) => {
    //Post Data
    const name = "mustfa murat coskun";
    const email = "coskun@gmail.com";
    const password = "123456";

    // async,await

const user = await User.create({
        name,
        email,
        password
    });

    res
    .json({
        success:true,
        data: user
    })
}

const errorTest = (req,res,next) => {
    //some code
    return next(new Error("Failed"))
}

module.exports = {
    register,
    errorTest
}