const express = require('express')

const Router = express.Router()

const {
    getUsuario,
    getUsuarios,
    setUsuario,
    updateUsuario,
    removeUsuario,
    getUsuariosDisponibles
} = require('../controladora/usuariosControladora')
Router.get('/', getUsuarios)

Router.get('/disponibles', getUsuariosDisponibles)

Router.get('/:id', getUsuario)

Router.post('/', setUsuario)

Router.put('/:id', updateUsuario)

Router.delete('/:id', removeUsuario)

module.exports = Router