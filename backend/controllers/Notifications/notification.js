const { Notification } = require('../../models/notifications')
const { server } = require('../../server')

const Notify = async (req, res) => {
    const { receiverId, userId, jobrole ,message} = req.body
    
    const newNotification = new Notification({
        receiverId,
        userId,
        message
    })
    await newNotification.save()
    const populateNotify = await Notification.findById(newNotification._id).populate('userId').exec()
    return res.status(200).json(populateNotify)
}



const getNotifications = async (req, res) => {
    const notifications = await Notification.find({ receiverId: req.user._id }).populate('userId').sort({ createdAt: -1 }).exec()
    return res.status(200).json(notifications)
}

const seenHandle = async (req, res) => {
    const { notificationId } = req.body
    await Notification.findByIdAndUpdate(notificationId, { isRead: true })
    const notifications = await Notification.find({ receiverId: req.user._id }).populate('userId').sort({ createdAt: -1 }).exec()
    return res.status(200).json(notifications)
}
module.exports = {  getNotifications, seenHandle,Notify}
