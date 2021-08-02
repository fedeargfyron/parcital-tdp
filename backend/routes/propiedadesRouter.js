const express = require('express')

const Router = express.Router()

const {
    getPropiedades,
    getPropiedad,
    setPropiedad,
    updatePropiedad,
    removePropiedad
} = require('../controladora/propiedadesControladora')

Router.get('/', getPropiedades)

Router.get('/:id', getPropiedad)

Router.post('/', setPropiedad)

Router.put('/:id', updatePropiedad)

Router.delete('/:id', removePropiedad)

module.exports = Router