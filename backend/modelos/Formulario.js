const mongoose = require('mongoose')

const formularioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    modulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modulo"
    }
})

const Formulario = mongoose.model('Formulario', formularioSchema)

module.exports = Formulario