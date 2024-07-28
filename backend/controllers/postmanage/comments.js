const { Comment } = require('../../models/comment')

const postComment = async (req, res) => {
    const { comment, userId } = req.body;
    const postId = req.params.postId;
    const newComments = new Comment({
        comment:comment,
       postId: postId,
       UserId: userId
    })

    await newComments.save()
    return res.status(200).json({ msg: "successfully posted the message " })
}

const { collectionByIdandName } = require('../CollectionByIdandName')


const addlike = async (req, res) => {
    try {
        console.log('here in like')
        const cmtId = req.params.cmtId
        console.log(cmtId)
        const addlike = await Comment.findByIdAndUpdate(cmtId, {
            $addToSet: {
                likes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Comment, cmtId)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('err occur here in like :-', err)
    }
}



const addDislike = async (req, res) => {
    try {
        console.log(' here is dislike ')
        const cmtId = req.params.cmtId
        const addDislike = await Comment.findByIdAndUpdate(cmtId, {
            $addToSet: {
                dislikes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Comment, cmtId)
        return res.status(200).json(data)
    }
    catch (err) { 
        console.log('err occur here in dislike :-', err)
    }

}
const rmdislike = async (req, res) => {
    try {
        console.log('here in remove dislike ')
        const cmtId = req.params.cmtId
        const removeDisLike = await Comment.findByIdAndUpdate(cmtId, {
            $pull: {
                dislikes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Comment, cmtId)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('err occur here in remove dislike :-', err)
    }
}

const rmlike = async (req, res) => {
    try {
        console.log('here in unlike ')
        const cmtId = req.params.cmtId
        const removelike = await Comment.findByIdAndUpdate(cmtId, {
            $pull: {
                likes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Comment, cmtId)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('err occur here in unlike :-', err)
    }
}

module.exports = { rmlike, rmdislike, addlike, addDislike ,postComment}
