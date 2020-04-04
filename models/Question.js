const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify")

const QuestionSchema = new Schema ({
    title: {
        type:String,
        required:[true,"Please provide a title"],
        unique:true
    },
    content: {
        type:String,
        required:[true,"Please provide a content"],
        minlength:[10,"content must be at least 10 character"]
    },
    slug:String,
    createdAt: {
        type:Date,
        default:Date.now
    },
    user: {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: "User"
    },
    answers: [{
        type:mongoose.Schema.ObjectId,
        ref:"Answer"
    }],
    likes: [
        {
            type:mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
})

QuestionSchema.pre("save",function(next){
    if(!this.isModified("title")){
        next();
    }
    this.slug = this.makeSlug();
    next();
})

QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true   // convert to lower case, defaults to `false`
      })
}

module.exports = mongoose.model("Question",QuestionSchema)