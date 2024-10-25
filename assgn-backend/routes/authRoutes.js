const express = require('express')
const { login, register, googleOAuthCallback } = require('../controllers/authController')
const passport = require('passport')
const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), googleOAuthCallback)


module.exports = router