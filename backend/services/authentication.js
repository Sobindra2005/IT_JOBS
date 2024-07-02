const jwt =require('jsonwebtoken')
const crypto=require('crypto')

require('dotenv').config()
const secretkey = process.env.secretkey


 function setUser(user){

    return jwt.sign({
    _id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email
    },'secretkey', { expiresIn: '30d' })

}

 function getUser(token){
    if(!token) return null
    return jwt.verify(token,'secretkey')
}

module.exports={getUser,setUser}