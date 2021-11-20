const express = require('express')

const Router = express.Router()

const {
    getTiposPropiedad
} = require('../controladora/tiposPropiedadControladora')

Router.get('/', getTiposPropiedad)



module.exports = Router