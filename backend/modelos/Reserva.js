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
        type: Date
    },
    estado:{
        type: String,
        required: true,
        default: "Pendiente"
    },
    servicio:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Servicio'
    }
})

const reserva = mongoose.model('Reserva', reservaSchema)

module.exports = reserva