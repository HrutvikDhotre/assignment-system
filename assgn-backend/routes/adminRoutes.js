const express = require('express')
const {  getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController')

const router = express.Router()

// router.post('/register', registerAdmin)
// router.post('/login', loginAdmin)
router.get('/assignments', getAssignments)
router.put('/assignments/:id/accept', acceptAssignment)
router.put('/assignments/:id/reject', rejectAssignment)

module.exports = router
