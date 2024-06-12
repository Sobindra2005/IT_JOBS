const express=require("express")
const router=express.Router()

const {homePage,jobAppliedPage,messagePage,notificationsPage,searchPage,profilePage}=require('../controllers/afterlogin')

router.get("/home",homePage)
router.get("/jobApplied",jobAppliedPage)
router.get("/message",messagePage)
router.get("/notifications",notificationsPage)
router.get("/search",searchPage)
router.get("/profile",profilePage)



module.exports=router