const express = require('express');
const router = express.Router();
const { registerUser, login, verifyOtp } = require('../Controller/authController');

router.post('/register', registerUser);
router.post('/login', login);   
router.post('/verify-otp', verifyOtp);

module.exports = router;