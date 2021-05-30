const express = require('express')
const Router = express.Router()
const {
    getOfertas,
    getOfertasAgente,
    setOferta,
    updateOferta
} = require('../controladora/ofertasControladora')

Router.get('/', getOfertas)

Router.get('/agente', getOfertasAgente)

Router.post('/', setOferta)

Router.put('/:id', updateOferta)

module.exports = Router