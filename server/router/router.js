const express = require('express')
const router = express.Router()
const userController = require('../controller/userController.js')
const threadController = require('../controller/threadController')
const commentController = require('../controller/commentController')
const authentication = require('../middleware/authentication')

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)

router.get('/threads',threadController.getThreads)
router.get('/threads/:id',threadController.getSpecificThread)

router.get('/comment/:threadId',commentController.getThreadComment)

router.get('/mythread',authentication,threadController.getMyThread)
router.post('/mythread',authentication,threadController.addThread)
router.put('/mythread/:id',authentication,threadController.updateThread)
router.delete('/mythread/:id',authentication,threadController.deleteThread)

router.get('/mycomment',authentication,commentController.getMyComment)
router.post('/mycomment',authentication,commentController.addComment)
router.put('/mycomment/:id',authentication,commentController.updateComment)
router.delete('/mycomment/:id',authentication,commentController.deleteComment)

module.exports = router