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

module.exports = { postComment }