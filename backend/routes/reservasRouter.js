const express = require('express')

const {
    getReservas,
    getReservasAgente,
    setReserva,
    updateReserva
} = require('../controladora/reservasControladora')
const Router = express.Router()

Router.get('/', getReservas)

Router.get('/agente', getReservasAgente)

Router.post('/', setReserva)

Router.put('/', updateReserva)

module.exports = Router

