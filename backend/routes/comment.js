const express = require('express')
const router = express.Router()
const { rmlike, rmdislike, addlike, addDislike } = require('../controllers/postmanage/comments')

router.put('/addlike/:cmtId', addlike)
router.delete('/rmlike/:cmtId', rmlike)
router.put('/addDislike/:cmtId', addDislike)
router.delete('/rmdislike/:cmtId', rmdislike)


module.exports = router