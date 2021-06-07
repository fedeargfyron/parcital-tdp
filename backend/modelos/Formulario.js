const mongoose = require('mongoose')

const formularioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    acciones: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accion"
        }
    ]
})

const Formulario = mongoose.model('Formulario', formularioSchema)

module.exports = Formulario