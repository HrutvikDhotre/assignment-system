const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

const register = async (req, res) => {
    const { username, password, role, name } = req.body
    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword, role, name })
        await user.save()
        const token = createToken(user._id)
        res.status(201).json({ message: 'User registered successfully', token, userRole: user.role })

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
            const token = createToken(user._id)
            res.status(201).json({ message: 'Login successful', token, userRole: user.role })
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