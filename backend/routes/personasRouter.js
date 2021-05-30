const express = require('express')

const Router = express.Router()

const {
    getPersonas,
    getPersona,
    setPersona,
    updatePersona,
    removePersona
} = require('../controladora')

Router.get('/', getPersonas)

Router.get('/:id', getPersona)

Router.post('/', setPersona)

Router.put('/:id', updatePersona)

Router.delete('/:id', removePersona)
module.exports = Router