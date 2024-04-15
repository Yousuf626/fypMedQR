const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

// Forgot password and send an OTP to the user's email
router.post('/forgot-password', userController.forgotPassword);

// Change password using OTP
router.post('/change-password-with-otp', userController.changePasswordWithOTP);

router.get('/user-info',);



module.exports = router;
