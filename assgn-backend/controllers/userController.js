const bcrypt = require('bcrypt')
const User = require('../models/User')
const Assignment = require('../models/Assignment')

const uploadAssignment = async (req, res) => {
    const { userId, task, adminId } = req.body
    console.log(req.body)
    try {
        const assignment = new Assignment({ userId, task, adminId })
        await assignment.save()
        res.status(201).json({ message: 'Assignment uploaded successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to upload assignment' })
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('name')
        res.status(201).json(admins)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch admins' })
    }
}

module.exports = {
    // registerUser,
    // loginUser,
    uploadAssignment,
    getAllAdmins
}
