const express = require('express')
const Router = express.Router()
const {
    getAccionesModulo
} = require('../controladora/accionesControladora')

Router.get('/modulos', getAccionesModulo)

module.exports = Router