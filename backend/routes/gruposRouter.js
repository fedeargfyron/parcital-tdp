const express = require('express')
const { 
    getGrupos,
    getGrupo,
    setGrupo,
    updateGrupo,
    deleteGrupo 
} = require('../controladora/gruposControladora')
const Router = express.Router()

Router.get('/', getGrupos)

Router.get('/:id', getGrupo)

Router.post('/', setGrupo)

Router.put('/:id', updateGrupo)

Router.delete('/:id', deleteGrupo)

module.exports = Router