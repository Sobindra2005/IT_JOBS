const{getUser}=require('../services/authentication')

function tokenAuthentication(req,res,next){

    const authorizationHeader=res.headers['Authorization']
    if (!authorizationHeader) {
     console.log('no authorization header')
    }
    const token =authorizationHeader.split('Bearer ')[1]
    if(!token) return console.log('no token')
    const user=getUser(token)
    if(!user) return console.log('no user ')
    req.user=user
    next()
}

module.exports={tokenAuthentication}