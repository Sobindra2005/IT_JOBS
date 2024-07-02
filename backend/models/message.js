const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'applicants',
            required: true

        },
        recieverId:{
            type:Schema.Types.ObjectId,
            ref:'applicants',
            required:true
        },
        Text: {
            type: String,
            required: true,
            trim: true
        }

    }
)

const message=mongoose.model('message',messageSchema)

module.exports=message
