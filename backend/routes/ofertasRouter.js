const express = require('express')
const Router = express.Router()
const {
    getOfertas,
    getOfertasAgente,
    setOferta,
    aceptarOferta,
    rechazarOferta
} = require('../controladora/ofertasControladora')

Router.get('/', getOfertas)

Router.get('/agente', getOfertasAgente)

Router.post('/', setOferta)

Router.put('/:id', aceptarOferta)

Router.delete('/:id', rechazarOferta)

module.exports = Router