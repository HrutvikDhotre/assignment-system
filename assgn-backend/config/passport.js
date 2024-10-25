const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id })
            let isNewUser = false;

            if (!user) {
                isNewUser = true; 
                user = new User({
                    googleId: profile.id,
                    username: profile.emails[0].value,
                    name: profile.displayName,
                    role: 'user'
                })
                await user.save()
            }

            const token = createToken(user._id)
            const role = user.role
            done(null, { token, isNewUser, role })
        } catch (error) {
            done(error, null)
        }
    }
))

