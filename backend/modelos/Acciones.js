const mongoose = require('mongoose')

const accionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
})

const Accion = mongoose.model('Accion', accionSchema)

module.exports = Accion