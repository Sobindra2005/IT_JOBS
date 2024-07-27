const { Jobs } = require('../../models/createJob')
const { io } = require('../../server')
const { collectionByIdandName } = require('../CollectionByIdandName')


const addlike = async (req, res) => {
    try {
        console.log('here in like')
        const postId = req.params.postId
        console.log(postId)
        const addlike = await Jobs.findByIdAndUpdate(postId, {
            $addToSet: {
                likes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Jobs, postId)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('err occur here in like :-', err)
    }
}



const addDisLike = async (req, res) => {
    try {
        console.log(' here is dislike ')
        const postId = req.params.postId
        const addDislike = await Jobs.findByIdAndUpdate(postId, {
            $addToSet: {
                dislikes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Jobs, postId)
        return res.status(200).json(data)
    }
    catch (err) { // const data = collectionByIdandName(Jobs, postId)
        // console.log(data)
        // return res.status(200).json(data)
        console.log('err occur here in dislike :-', err)
    }

}
const removeDisLike = async (req, res) => {
    try {
        console.log('here in remove dislike ')
        const postId = req.params.postId
        const removeDisLike = await Jobs.findByIdAndUpdate(postId, {
            $pull: {
                dislikes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Jobs, postId)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('err occur here in remove dislike :-', err)
    }
}

const removelike = async (req, res) => {
    try {
        console.log('here in unlike ')
        const postId = req.params.postId
        const removelike = await Jobs.findByIdAndUpdate(postId, {
            $pull: {
                likes: req.user._id
            }
        }, { new: true })
        const data = await collectionByIdandName(Jobs, postId)
        return res.status(200).json(data)
    }
    catch (err) {
        console.log('err occur here in unlike :-', err)
    }
}

module.exports = { removeDisLike, addDisLike, removelike, addlike }