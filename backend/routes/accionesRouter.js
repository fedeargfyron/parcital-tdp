const express = require('express')
const Router = express.Router()
const {
    getAcciones,
    getAccionesModulo
} = require('../controladora/accionesControladora')

Router.get('/', getAcciones)

Router.get('/modulos', getAccionesModulo)

module.exports = Router