const User = require('../models/User')
const Assignment = require('../models/Assignment')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

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

const assignRole = async (req, res) => {
    try {
        const { role } = req.body
        const userId = req.userId

        const updatedUser = await User.findByIdAndUpdate(userId, { role: role }, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        const token = createToken(updatedUser._id)
        res.status(201).json({ message: 'Role assigned to the user', token, userRole: role })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to assign role.' })
    }
}

module.exports = {
    uploadAssignment,
    getAllAdmins,
    assignRole
}
