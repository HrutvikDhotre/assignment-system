const User = require('../models/User')
const Assignment = require('../models/Assignment')

const uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body
    const userId = req.userId

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
    uploadAssignment,
    getAllAdmins
}
