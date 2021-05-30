const mongoose = require('mongoose')

const visitaSchema = new mongoose.Schema({
    fecha_inicio:{
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
    estado:{
        type: String,
        required: true
    },
})

const visita = mongoose.model('Visita', visitaSchema)

module.exports = visita