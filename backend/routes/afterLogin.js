const express=require("express")
const router=express.Router()
const{ messageList,postMsg,startOrGetMsg } =require('../controllers/message/messagecontroller')
const { authenticatedUserDetails } = require("../controllers/authenticateduser")

router.get('/',)
router.get('/msg',messageList)
router.post('/msg',startOrGetMsg)
router.post('/msg/:chatId',postMsg)
router.get('/authenticated',authenticatedUserDetails)

module.exports=router