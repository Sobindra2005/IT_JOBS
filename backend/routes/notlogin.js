const express=require("express")
const router=express.Router()
const {registerPost,landingPage,loginPost,loginPage,registerPage } =require("../controllers/notlogin")

router.post("/login",loginPost)
router.post("/register",registerPost)
router.get("/login",loginPage)
router.get("/register",registerPage)
router.get("/",landingPage)

module.exports=router
