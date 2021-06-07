const express = require('express')

const Router = express.Router()

const {
    getServicio,
    getServicios,
    setServicioVenta,
    removeServicio
} = require('../controladora/serviciosControladora')

Router.get('/', getServicios)

Router.get('/:id', getServicio)

Router.post('/', setServicioVenta)

Router.put('/:id', removeServicio)

module.exports = Router