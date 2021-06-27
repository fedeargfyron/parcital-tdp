const mongoose = require('mongoose')

const accionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    formulario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formulario"
    }
})

const Accion = mongoose.model('Accion', accionSchema)

module.exports = Accion