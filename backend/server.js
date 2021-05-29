require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')

connectDB()
const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)
app.use(
    session({
        secret: "391239123912",
        resave: true,
        saveUninitialized: true
    })
)
app.use(cookieParser("391239123912"))
/* Settear passport acá */
app.use(passport.initialize())
app.use(passport.session())
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))