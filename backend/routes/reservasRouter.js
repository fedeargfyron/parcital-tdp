const express = require('express')

const {
    getReservas,
    getReservasAgente,
    setReserva,
    anularReserva
} = require('../controladora/reservasControladora')
const Router = express.Router()

Router.get('/', getReservas)

Router.get('/agente', getReservasAgente)

Router.put('/:id', anularReserva)

module.exports = Router

