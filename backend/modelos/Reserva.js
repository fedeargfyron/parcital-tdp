const mongoose = require('mongoose')

const reservaSchema = mongoose.Schema({
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    },
    monto:{
        type: Number,
        required: true
    },
    fecha_inicio:{
        type: Date,
        required: true,
        default: Date.now()
    },
    fecha_fin:{
        type: Date,
        required: true,
        default: Date.now() + 30
    },
    estado:{
        type: String,
        required: true,
        default: "Pendiente"
    },
})

const reserva = mongoose.model('Reserva', reservaSchema)

module.exports = reserva