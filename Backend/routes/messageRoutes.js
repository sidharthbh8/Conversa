const express = require('express')
const router = express.Router()
const { sendMessage, getMessage } = require('../controllers/messageController')
const authorize = require('../middleware/authorize')

router.post('/api/messages/send/:id', authorize, sendMessage)
router.get('/api/messages/:id', authorize, getMessage)

module.exports = router