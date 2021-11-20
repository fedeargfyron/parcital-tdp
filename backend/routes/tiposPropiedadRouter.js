const express = require('express')

const Router = express.Router()

const {
    getTiposPropiedad,
    removeTipoPropiedad
} = require('../controladora/tiposPropiedadControladora')

Router.get('/', getTiposPropiedad)

Router.delete('/:id', removeTipoPropiedad)



module.exports = Router