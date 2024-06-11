const express=require("express")
const router=express.Router()

const {homePage,redirectJobApplied,redirectProfile,redirectMessage,redirectNotifications,redirectSearch}=require('../controllers/afterlogin')

router.get("/home",homePage)
router.get("/jobApplied",redirectJobApplied)
router.get("/message",redirectMessage)
router.get("/notifications",redirectNotifications)
router.get("/search",redirectSearch)
router.get("/profile",redirectProfile)



module.exports=router