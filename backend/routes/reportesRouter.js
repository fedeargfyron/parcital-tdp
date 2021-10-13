const express = require('express')

const Router = express.Router()

const {
    getIngresos,
    getActividadServicios,
    getIngresoPropiedades,
    getDuracionServicios,
} = require('../controladora/reportesControladora')

Router.get('/Ingresos', getIngresos)

Router.get('/ActividadServicios', getActividadServicios)

Router.get('/IngresoPropiedades', getIngresoPropiedades)

Router.get('/DuracionServicios', getDuracionServicios)

module.exports = Router