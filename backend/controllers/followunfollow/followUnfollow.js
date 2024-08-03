const { Following } = require('../../models/following')

const getFollowData = (req, res) => {

}

const Follow = async (req, res) => {
    const { userId } = req.body
    const addFollow = await Following.findByIdAndUpdate(userId, { $addToSet: { following: req.user._id } }, { new: true })
    return res.status(200).json(addFollow)
}

const unFollow = async (req, res) => {
    const { userId } = req.body
    const unFollow = await Following.findByIdAndUpdate(userId, { $pull: { following: req.user._id } }, { new: true })
    return res.status(200).json(unFollow)
}

module.exports = { unFollow, Follow }