require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')

const gruposRouter = require('./routes/gruposRouter')
const horariosRouter = require('./routes/horariosRouter')
const ofertasRouter = require('./routes/ofertasRouter')
const visitasRouter = require('./routes/visitasRouter')
const reservasRouter = require('./routes/reservasRouter')
const usuariosRouter = require('./routes/usuariosRouter')
const ventasRouter = require('./routes/ventasRouter')
const propiedadesRouter = require('./routes/propiedadesRouter')
const serviciosRouter = require('./routes/serviciosRouter')
const personasRouter = require('./routes/personasRouter')
const accionesRouter = require('./routes/accionesRouter')
const logUser = require('./routes/logUserRouter')(express, passport)
connectDB()
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}))
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
app.use(methodOverride('_method'))
/* Settear passport acá */
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)
app.use('/api/grupos', gruposRouter)
app.use('/api/horarios', horariosRouter)
app.use('/api/ofertas', ofertasRouter)
app.use('/api/visitas', visitasRouter)
app.use('/api/reservas', reservasRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/ventas', ventasRouter)
app.use('/api/logUser', logUser)
app.use('/api/propiedades', propiedadesRouter)
app.use('/api/servicios', serviciosRouter)
app.use('/api/personas', personasRouter)
app.use('/api/acciones', accionesRouter)
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))