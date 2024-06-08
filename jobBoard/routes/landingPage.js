const express=require("express")
const router=express.Router()
const {landingPage} =require("../controllers/landingpage")

router.get("/",landingPage)

module.exports=router
