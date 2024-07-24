const { Jobs } = require('../../models/createJob')
const { io } = require('../../server')

const NotifyClientsAboutThePost = async (postId) => {
  try{  console.log('here in notifyclient ')
    const postdetails = await Jobs.findOne({ _id: postId })

    io.emit('post data', postdetails)}
    catch(err){
        console.log('err occur here in NotifyClient :-',err)
    }
}


const addlike = async (req, res) => {
  try{  console.log('here in like')
    const { userId } = req.body
    const postId = req.params.postId
    const addlike = await Jobs.findByIdAndUpdate(postId, {
        $addToSet: {
            likes: userId
        }
    }, { new: true })


    NotifyClientsAboutThePost(postId)}
    catch(err){
        console.log('err occur here in like :-',err)
    }


}



const addDisLike = async (req, res) => {
    try {
        console.log(' here is dislike ')
        const { userId } = req.body
        const postId = req.params.postId
        const addDislike = await Jobs.findByIdAndUpdate(postId, {
            $addToSet: {
                dislikes: userId
            }
        }, { new: true })

        NotifyClientsAboutThePost(postId)
    }
    catch (err) {
        console.log('err occur here in dislike :-', err)
    }

}
const removeDisLike = async (req, res) => {
    try {
        console.log('here in remove dislike ')
        const { userId } = req.body
        const postId = req.params.postId
        const removeDisLike = await Jobs.findByIdAndUpdate(postId, {
            $pull: {
                dislikes: userId
            }
        }, { new: true })
        NotifyClientsAboutThePost(postId)
    }
    catch(err) {
        console.log('err occur here in remove dislike :-', err)
    }
}

const removelike = async (req, res) => {
    try {
        console.log('here in unlike ')
        const { userId } = req.body
        const postId = req.params.postId
        const removelike = await Jobs.findByIdAndUpdate(postId, {
            $pull: {
                likes: userId
            }
        }, { new: true })
console.log(removelike)
        NotifyClientsAboutThePost(postId)
    }
    catch (err) {
        console.log('err occur here in unlike :-', err)
    }
}

module.exports = { removeDisLike, addDisLike, removelike, addlike }