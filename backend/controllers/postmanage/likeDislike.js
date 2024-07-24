const { Jobs } = require('../../models/createJob')
const {io} =require('../../server')

const NotifyClientsAboutThePost=async (postId)=>{
    const postdetails = await Jobs.findOne({ _id: postId })
    console.log(postdetails)
    io.emit('post data',postdetails)
}


const addlike = async (req, res) => {
    
    const { userId } = req.body
    const postId = req.params.postId
    const addlike = await Jobs.findByIdAndUpdate(postId, {
        $addToSet: {
            likes: userId
        }
    }, { new: true })


    NotifyClientsAboutThePost(postId)
    

}



const addDisLike = async (req, res) => {
 
    const { userId } = req.body
    const postId = req.params.postId
    const addDislike = await Jobs.findByIdAndUpdate(postId, {
        $addToSet: {
            dislikes: userId
        }
    }, { new: true })

    NotifyClientsAboutThePost(postId)
   
}
const removeDisLike = async (req, res) => {

    const { userId } = req.body
    const postId = req.params.postId
    const removeDisLike = await Jobs.findByIdAndUpdate(postId, {
        $pull: {
            dislikes: userId
        }
    }, { new: true })
    NotifyClientsAboutThePost(postId)

}

const removelike = async (req, res) => {
 
    const { userId } = req.body
    const postId = req.params.postId
    const removelike = await Jobs.findByIdAndUpdate(postId, {
        $pull: {
            likes: userId
        }
    }, { new: true })
 
    NotifyClientsAboutThePost(postId)
   
}

module.exports = { removeDisLike, addDisLike, removelike, addlike }