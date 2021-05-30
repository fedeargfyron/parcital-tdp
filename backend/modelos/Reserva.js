const mongoose = require('mongoose')

const reservaSchema = mongoose.model({
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
        required: true
    },
    fecha_fin:{
        type: Date,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
})

const reserva = mongoose.model('Reserva', reservaSchema)

module.exports = reserva