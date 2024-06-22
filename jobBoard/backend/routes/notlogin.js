const express=require("express")
const router=express.Router()
const {registerPost,loginPost} =require("../controllers/notlogin")

router.post("/login",loginPost)
router.post("/register",registerPost)

module.exports=router
