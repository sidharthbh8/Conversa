const express = require('express');
const authorize = require('../middleware/authorize');
const { getUser } = require('../controllers/userControllers');
const router = express.Router();

router.get('/', authorize, getUser) 

module.exports = router;