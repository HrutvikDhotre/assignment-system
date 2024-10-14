const express = require('express')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/admins', adminRoutes)
app.use('/',authRoutes)

const PORT = 3000
mongoose.connect('mongodb://localhost:27017/assignmentDB').then(() => {
    console.log("connected to the db")
    app.listen(PORT, () => {
        console.log("listening to port " + PORT)
    })

}).catch((err) => console.log(err))