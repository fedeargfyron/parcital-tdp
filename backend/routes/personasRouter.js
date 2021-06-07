const express = require('express')

const Router = express.Router()

const {
    getPersonas,
    getPersona,
    setPersona,
    updatePersona,
    removePersona,
    registrarPersona
} = require('../controladora/personasControladora')

Router.get('/', getPersonas)

Router.get('/:id', getPersona)

Router.post('/', setPersona)

Router.put('/:id', updatePersona)

Router.delete('/:id', removePersona)

Router.post('/registrar', registrarPersona)
module.exports = Router