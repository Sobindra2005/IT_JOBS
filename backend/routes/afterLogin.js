const express=require("express")
const router=express.Router()
const{ messageList,postMsg,startOrGetMsg } =require('../controllers/message/messagecontroller')
const { authenticatedUserDetails } = require("../controllers/authenticateduser")
const {createJob}=require('../controllers/createJob/createJob')
const { getpost} = require("../controllers/home/home")

router.get('/',)
router.get('/msg',messageList)
router.post('/msg',startOrGetMsg)
router.post('/msg/:chatId',postMsg)
router.get('/authenticated',authenticatedUserDetails)
router.post('/createJob/:authorId',createJob)
router.get('/home',getpost)

module.exports=router