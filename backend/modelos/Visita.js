const mongoose = require('mongoose')

const visitaSchema = new mongoose.Schema({
    fecha:{
        type: Date,
        required: true
    },
    horario:{
        type: String,
        required: true
    },
    interesado:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Servicio"
    },
    estado:{
        type: String,
        required: true,
        default: "Pendiente"
    },
})

const visita = mongoose.model('Visita', visitaSchema)

module.exports = visita