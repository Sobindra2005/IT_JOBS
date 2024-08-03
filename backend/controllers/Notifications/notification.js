const { Notification } = require('../../models/notifications')
const { server } = require('../../server')

const jobapplyNotification = async (req, res) => {
    const { receiverId, userId, jobrole } = req.body
    const message = `has applied for the ${jobrole} position.`
    const newNotification = new Notification({
        receiverId,
        userId,
        message
    })
    await newNotification.save()
    const populateNotify = await Notification.findById(newNotification._id).populate('userId').exec()
    return res.status(200).json(populateNotify)
}

const getNotifications=async (req,res)=>{
   console.log('i am here ')
   const notifications = await Notification.find({receiverId:req.user._id}).populate('userId').sort({updatedAt: -1 }).exec()
   return res.status(200).json(notifications)
}

module.exports = { jobapplyNotification,getNotifications }
