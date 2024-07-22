const { Jobs } = require('../../models/createJob')

const addlike = async (req, res) => {
    const { userId } = req.body
    const postId = req.params.postId

    const dislike = await Jobs.findOne({ _id: postId, dislikes: { $in: [userId] } });
    if (dislike) {
        console.log('disliked already bro ')

    }
    const addlike = await Jobs.findByIdAndUpdate(postId, {
        $addToSet: {
            likes: userId
        }
    }, { new: true })
    return res.status(200).json({ msg: 'successfully added the like ' })
}

const removelike = async (req, res) => {
    const { userId } = req.body
    const postId = req.params.postId
    const removelike = await Jobs.findByIdAndUpdate(postId, {
        $pull: {
            likes: userId
        }
    }, { new: true })
    console.log(updatePost)
    return res.status(200).json({ msg: 'successfully remove the like ' })
}

const addDisLike = async (req, res) => {
    const { userId } = req.body
    const postId = req.params.postId
    const like = await Jobs.findOne({ _id: postId, likes: { $in: [userId] } });
    if (like) {
        console.log('already the liked the id ....')
    }
    const addDislike = await Jobs.findByIdAndUpdate(postId, {
        $addToSet: {
            dislikes: userId
        }
    }, { new: true })
    console.log(updatePost)
    return res.status(200).json({ msg: 'successfully added the dislike ' })
}
const removeDisLike = async (req, res) => {
    const { userId } = req.body
    const postId = req.params.postId
    const removeDisLike = await Jobs.findByIdAndUpdate(postId, {
        $pull: {
            dislikes: userId
        }
    }, { new: true })
    console.log(updatePost)
    return res.status(200).json({ msg: 'successfully adde the dislike ' })
}

module.exports = { removeDisLike, addDisLike, removelike, addlike }