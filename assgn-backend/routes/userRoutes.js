const express = require('express')
const { uploadAssignment, getAllAdmins, assignRole } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.use(authMiddleware)
router.post('/upload', uploadAssignment)
router.get('/admins', getAllAdmins)
router.put('/assign-role', assignRole)

module.exports = router
