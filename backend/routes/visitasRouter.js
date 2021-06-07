const express = require('express')

const Router = express.Router()
const {
    getVisitas,
    getVisitasAgente,
    setVisita,
    updateVisita
} = require('../controladora/visitasControladora')
Router.get('/', getVisitas)

Router.get('/agente', getVisitasAgente)

Router.post('/', setVisita)

module.exports = Router