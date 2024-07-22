const mongoose= require('mongoose')


const commentSchema= new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'Jobs'
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'User'
    }

},{
    timestamps:true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports={Comment}