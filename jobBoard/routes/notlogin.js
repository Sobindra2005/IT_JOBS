const express=require("express")
const router=express.Router()
const {landingPage,loginPage, registerPage,registerPost,loginPost} =require("../controllers/notlogin")


router.get("/",landingPage)
router.get("/login",loginPage)
router.post("/login",loginPost)
router.get("/register",registerPage)
router.post("/register",registerPost)

module.exports=router
