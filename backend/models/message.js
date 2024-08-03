const mongoose = require('mongoose')


const recordSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true
        },
        receiverId: {
            type: String,
            required: true
        },
        chatId: {
            type: String,
            required: true
        },

    },
    { timestamps: true }
)
const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'applicants',
            required: true

        },
        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'applicants',
            required: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)
const MsgRecord = mongoose.model('MsgRecord', recordSchema)

module.exports = { MsgRecord, Message }
