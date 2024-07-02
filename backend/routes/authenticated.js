const express=require("express")

const { authenticatedUserDetails } = require("../controllers/authenticateduser")
const router=express.Router()

router.get('/authenticated',authenticatedUserDetails)

module.exports=router