const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true }
});

// userSchema.statics.signUp = async function (email, password, name) {
//     const exists = this.findOne({ email })
//     if (!exists)
//         throw new Error("Email already exists")
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const user = await this.create({ username : email, password: hashedPassword, role, name })
//     // const user = new User({ username, password: hashedPassword, role, name })
//     // await user.save()
//     return user
// }

module.exports = mongoose.model('User', userSchema)
