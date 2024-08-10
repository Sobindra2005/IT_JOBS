const { profile } = require('../../models/profileSetup');


const getProfileData=async (req,res)=>{
console.log(req.params)
const id=req.params.id
    const userData= await profile.findOne({userId:id}).populate('profilePic').exec()
    return res.status(200).json(userData)
}

module.exports={getProfileData}