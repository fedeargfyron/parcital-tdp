const express = require('express')

const Router = express.Router()

const {
    getVentas,
    setVenta
} = require('../controladora/ventasControladora')

Router.get('/', getVentas)

Router.post('/', setVenta)

module.exports = Router