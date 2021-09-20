const express = require('express')

const {
    getReservas,
    getReservasAgente,
    aceptarVenta,
    anularReserva,
    getReservasGestion
} = require('../controladora/reservasControladora')
const Router = express.Router()

Router.get('/', getReservas)

Router.get('/agente', getReservasAgente)

Router.get('/gestion', getReservasGestion)

Router.put('/aceptar/:id', aceptarVenta)

Router.put('/anular/:id', anularReserva)

module.exports = Router

