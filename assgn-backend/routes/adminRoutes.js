const express = require('express')
const {  getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.use(authMiddleware)
router.get('/assignments', getAssignments)
router.put('/assignments/:id/accept', acceptAssignment)
router.put('/assignments/:id/reject', rejectAssignment)

module.exports = router
