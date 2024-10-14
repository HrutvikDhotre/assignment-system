const bcrypt = require('bcrypt')
const User = require('../models/User')
const Assignment = require('../models/Assignment')

const register = async (req, res) => {
    const { username, password, role, name } = req.body
    console.log(req.body)
    try {
        console.log("in")
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("in")
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword, role, name })
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'User registration failed' })
    }
}

const login = async (req, res) => {
    const { username, password, role } = req.body
    try {
        const user = await User.findOne({ username })
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(201).json({ message: 'Login successful', userId: user._id, userRole: user.role })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed' })
    }
}

module.exports = {
    login,
    register
}