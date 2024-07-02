const express=require("express")
const { messageList } = require("../controllers/message/messagecontroller")
const router=express.Router()

router.get('/',)
router.get('/msg',messageList)

module.exports=router