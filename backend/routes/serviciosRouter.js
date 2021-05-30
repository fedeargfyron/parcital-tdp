const express = require('express')

const Router = express.Router()

const {
    getServicio,
    getServicios,
    setServicio,
    removeServicio
} = require('../controladora/serviciosControladora')

Router.get('/', getServicios)

Router.get('/:id', getServicio)

Router.post('/', setServicio)

Router.delete('/:id', removeServicio)

module.exports = Router