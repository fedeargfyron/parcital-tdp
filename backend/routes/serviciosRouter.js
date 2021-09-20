const express = require('express')

const Router = express.Router()

const {
    getServicio,
    getServicios,
    setServicioVenta,
    removeServicio,
    getServiciosVenta,
    getServicioVenta
} = require('../controladora/serviciosControladora')

Router.get('/', getServicios)

Router.get('/venta', getServiciosVenta)

Router.get('/venta/:id', getServicioVenta)

Router.get('/:id', getServicio)

Router.post('/:id', setServicioVenta)

Router.put('/:id', removeServicio)

module.exports = Router