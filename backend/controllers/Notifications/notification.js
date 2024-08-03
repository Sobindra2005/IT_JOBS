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

const commentNotification = async (req, res) => {
    const { receiverId, userId, jobrole } = req.body
    if (userId == receiverId) {
        return res.status(200).json('same user ')
    }
    else {
        const message = `just commented on your ${jobrole} job role post.`
        const newNotification = new Notification({
            receiverId,
            userId,
            message
        })
        await newNotification.save()
        const populateNotify = await Notification.findById(newNotification._id).populate('userId').exec()
        return res.status(200).json(populateNotify)
    }
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

const likeNotification = async (req, res) => {
    const { receiverId, userId, jobrole } = req.body
   console.log( receiverId, userId, jobrole )
    if (userId == receiverId) {
        return res.status(200).json('same user ')
    }
    else {
        const message = `just disliked on your ${jobrole} job role post.`
        const newNotification = new Notification({
            receiverId,
            userId,
            message
        })
        await newNotification.save()
        const populateNotify = await Notification.findById(newNotification._id).populate('userId').exec()
        return res.status(200).json(populateNotify)
    }
}
const dislikeNotification = async (req, res) => {
    const { receiverId, userId, jobrole } = req.body
    if (userId == receiverId) {
        return res.status(200).json('same user ')
    }
    else {
        const message = `just liked on your ${jobrole} job role post.`
        const newNotification = new Notification({
            receiverId,
            userId,
            message
        })
        await newNotification.save()
        const populateNotify = await Notification.findById(newNotification._id).populate('userId').exec()
        return res.status(200).json(populateNotify)
    }
}

module.exports = { jobapplyNotification, getNotifications, commentNotification, seenHandle,dislikeNotification,likeNotification }
