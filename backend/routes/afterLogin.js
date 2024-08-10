const express = require("express")
const router = express.Router()
const { messageList, postMsg, startOrGetMsg ,latestMsg} = require('../controllers/message/messagecontroller')
const { authenticatedUserDetails } = require("../controllers/authenticateduser")
const { createJob } = require('../controllers/createJob/createJob')
const { getpost } = require("../controllers/home/home")
const { jobapply } = require("../controllers/jobapply/jobapply")
const { removeDisLike, addDisLike, removelike, addlike } = require('../controllers/postmanage/likeDislike')
const { postComment } = require('../controllers/postmanage/comments')
const { getUserById } = require('../controllers/getuserByid')
const { getappliedJobs } = require("../controllers/job/Jobseeker")
const { getJobs, ApplicantsList, RejectHandle, pendingHandle, AcceptHandle } = require("../controllers/job/jobcreator")
const { getNotifications, seenHandle, Notify } = require("../controllers/Notifications/notification")
const { Follow, unFollow } = require("../controllers/followunfollow/followUnfollow")
const upload = require('../config.multer')
const { profileSetup } = require("../controllers/profileSetup/profileSetup")
const { getProfileData } = require("../controllers/profile/profile")

router.get('/getUser/:id', getUserById)
router.get('/',)
router.get('/msg', messageList)
router.post('/msg', startOrGetMsg)
router.post('/msg/:chatId', postMsg)
router.get('/authenticated', authenticatedUserDetails)
router.post('/createJob/:authorId', createJob)
router.get('/home', getpost)
router.get('/profile/:id',getProfileData)
router.get('/latestmsg/:receiverId',latestMsg)

router.post('/jobapply', jobapply)

router.put('/adddislike/:postId', addDisLike)
router.put('/addlike/:postId', addlike)
router.delete('/removedislike/:postId', removeDisLike)
router.delete('/removelike/:postId', removelike)
router.post('/comment/:postId', postComment)

router.get('/postedjob', getJobs)
router.get('/appliedJobs', getappliedJobs)
router.get('/applicants/:postId', ApplicantsList)

router.patch('/accept/:id', AcceptHandle)
router.patch('/reject/:id', RejectHandle)
router.patch('/pending/:id', pendingHandle)

router.post('/notify', Notify)

router.get('/notification', getNotifications)

router.put('/follow', Follow)
router.delete('/unfollow', unFollow)

router.post('/seen', seenHandle)

router.post('/profileSetup', upload.single('profilePic'), profileSetup)

module.exports = router