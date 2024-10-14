const express = require('express')
const { uploadAssignment, getAllAdmins } = require('../controllers/userController')

const router = express.Router()

// router.post('/register', registerUser)
// router.post('/login', loginUser)
router.post('/upload', uploadAssignment)
router.get('/admins', getAllAdmins)

module.exports = router
