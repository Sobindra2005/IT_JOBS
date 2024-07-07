const express=require("express")
const router=express.Router()
const{ messageList,postMsg,startOrGetMsg } =require('../controllers/message/messagecontroller')

router.get('/',)
router.get('/msg',messageList)
router.post('/msg',startOrGetMsg)
router.post('/msg/:chatId',postMsg)

module.exports=router