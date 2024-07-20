const{getUser}=require('../services/authentication')

function tokenAuthentication(req,res,next){
console.log(req.headers)
    const authorizationHeader=req.headers['authorization']
  
    if (!authorizationHeader) {
     console.log('no authorization header')
    }
    const token =authorizationHeader.split('Bearer ')[1]
    if(!token) return console.log('no token')
    const user=getUser(token)
    if(!user) return res.redirect('/')
    req.user=user
    next()
}

module.exports={tokenAuthentication}