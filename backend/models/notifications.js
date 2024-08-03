const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
    ,
    isRead: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const Notification= mongoose.model('Notification',NotificationSchema)


module.exports={Notification}