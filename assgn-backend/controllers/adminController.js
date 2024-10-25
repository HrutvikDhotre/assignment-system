const Assignment = require('../models/Assignment')

const getAssignments = async (req, res) => {
    const adminId = req.userId
    try {
        const assignments = await Assignment.find({ adminId }).populate('userId', 'name')
        res.status(201).json(assignments)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch assignments' })
    }
}

const acceptAssignment = async (req, res) => {
    const { id } = req.params
    try {
        await Assignment.findByIdAndUpdate(id, { status: 'accepted' })
        res.status(201).json({ message: 'Assignment accepted' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to accept assignment' })
    }
}

const rejectAssignment = async (req, res) => {
    const { id } = req.params
    try {
        await Assignment.findByIdAndUpdate(id, { status: 'rejected' })
        res.json({ message: 'Assignment rejected' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to reject assignment' })
    }
}

module.exports = {
    getAssignments,
    acceptAssignment,
    rejectAssignment,
}
