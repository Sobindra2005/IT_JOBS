const mongoose = require('mongoose')

const followingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref:'User',
            required:true
        },
        following: [{
            type: mongoose.Types.ObjectId,
            ref:'User',
            required:true
    }]
    }
,{
    timestamps:true
}
)

const Following = mongoose.model('Following', followingSchema)

module.exports = {Following} 
