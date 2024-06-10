const{getUser}=require('../services/authentication')

function tokenAuthentication(req,res,next){
    const authorizationHeader=req.headers['authorization']
    const token =authorizationHeader.split("Bearer ")[1]
    if(!authorizationHeader || !token ) return res.redirect("/")
    const user=getUser(token)
    if(!user) return res.redirect("/")
    req.user=user
    next()
}

module.exports={tokenAuthentication}