const mongoose = require('mongoose')

const ventaSchema = new mongoose.Schema({
    propiedad:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Propiedad"
    },
    agente:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Agente"
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    total:{
        type: Number,
        required: true,
    },
    ingreso:{
        type: Number
    }
})

const venta = mongoose.model('Venta', ventaSchema)

module.exports = venta