const express = require('express')
const { authRegister, authLogin, sendEmailOnOtp, varifyEmailOtp, logout, resendOtp } = require('../controllers/auth.controller')
const { authMiddleware } = require('../middleware/auth.middleware')

const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.post("/sendEmail-OTP",authMiddleware,sendEmailOnOtp)
router.post("/varify-otp",authMiddleware,varifyEmailOtp)
router.post("/logOut",logout)
router.post('/resend-otp',authMiddleware,resendOtp)

module.exports = router