const jwt =require('jsonwebtoken')
const crypto=require('crypto')

require('dotenv').config()
const secretkey = process.env.secretkey


 function setUser(user){
if(!user){
    console.log('invalid user ')
}
    return jwt.sign({
    _id:user._id,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email
    },'secretkey', { expiresIn: '30d' })

}

 function getUser(token){
    if(!token) return console.log('invalid token !!!')
    const user= jwt.verify(token,'secretkey')
   if(!user){
    console.log('invalid token')

    }
    return user
}

module.exports={getUser,setUser}