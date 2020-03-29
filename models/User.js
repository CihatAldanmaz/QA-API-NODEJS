const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

const UserSchema = new Schema ({
    name : {
        type: String,
        required: [true, "Please provide a name"]
    },
    email : {
        type:String,
        required:true,
        unique:[true, "Please try a different an email"],
        match : [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email"
        ]
    },
    role: {
        type : String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type:String,
        minlength: [6, "Password must be min 6 digits"],
        required: [true, "Please provide a valid password"],
        select: false
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    title: {
        type:String
    },
    about: {
        type:String
    },
    location: {
        type:String
    },
    website:{
        type:String
    },
    profile_image:{
        type:String,
        default:"default.jpg"
    },
    blocked:{
        type:Boolean,
        default:false
    }
});

UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;

    const payload = {
        id: this._id,
        name:this.name
    };

    const token = jwt.sign(payload,JWT_SECRET_KEY)
    
    return token;
} 

UserSchema.pre("save",function(next){
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
           this.password = hash;
           next();
        });
    });
    
})



module.exports = mongoose.model("User",UserSchema);
