const express = require('express')

const Router = express.Router()

const {
    getPropiedades,
    getPropiedad,
    setPropiedad,
    updatePropiedad,
    removePropiedad,
    getPropiedadesDisponibles
} = require('../controladora/propiedadesControladora')

Router.get('/', getPropiedades)

Router.get('/disponibles', getPropiedadesDisponibles)

Router.get('/:id', getPropiedad)

Router.post('/', setPropiedad)

Router.put('/:id', updatePropiedad)

Router.delete('/:id', removePropiedad)

module.exports = Router