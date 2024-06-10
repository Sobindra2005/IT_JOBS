const express=require("express")
const router=express.Router()

const {homePage}=require('../controllers/afterlogin')

router.get("/home",homePage)

module.exports=router