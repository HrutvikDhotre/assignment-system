const dotenv = require('dotenv')
dotenv.config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).json({ message: 'Authorization token required.' })

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id }).select('_id')
        req.userId = user ? user._id : null
        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        else
            return res.status(401).json({ message: 'Not authorized.' });

    }
}

module.exports = authMiddleware