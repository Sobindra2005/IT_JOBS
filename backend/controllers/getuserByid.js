const { User } = require('../models/register')


const getUserById= async(req,res)=>{
    console.log('i am here ')
const id = req.params.id
    const user= await User.find({_id:id})
    console.log(user)
    return res.status(200).json({user})
}

module.exports={getUserById}