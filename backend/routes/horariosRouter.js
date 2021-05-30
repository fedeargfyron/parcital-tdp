const express = require('express')
const Router = express.Router()
const {
    getHorarios,
    getHorario,
    setHorario,
    updateHorario,
    removeHorario
} = require('../controladora/horariosControladora')


Router.get('/', getHorarios)

Router.get('/:id', getHorario)

Router.post('/', setHorario)

Router.put('/:id', updateHorario)

Router.delete('/:id', removeHorario)

module.exports = Router