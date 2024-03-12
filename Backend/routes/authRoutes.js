const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authControllers');

router.post('/api/auth/signup', signup)

router.post('/api/auth/logout', logout)

router.post('/api/auth/login', login)

module.exports = router;