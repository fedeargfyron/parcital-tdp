const express = require('express')

const Router = express.Router()

const {
    getUsuario,
    getUsuarios,
    setUsuario,
    updateUsuario,
    removeUsuario,
    getUsuariosDisponibles,
    updateContraseña,
    resetUserPassword
} = require('../controladora/usuariosControladora')
Router.get('/', getUsuarios)

Router.get('/disponibles', getUsuariosDisponibles)

Router.post('/updatePassword', updateContraseña)

Router.get('/:id', getUsuario)

Router.post('/', setUsuario)

Router.put('/:id', updateUsuario)

Router.delete('/:id', removeUsuario)

Router.post('/resetPassword', resetUserPassword)

module.exports = Router