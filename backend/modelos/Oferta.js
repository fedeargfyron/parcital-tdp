const mongoose = require('mongoose')

const ofertaSchema = new mongoose.Schema({
    fecha:{
        type: Date,
        required: true,
        default: Date.now()
    },
    monto:{
        type: Number,
        required: true
    },
    interesado:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    },
    estado:{
        type: String,
        required: true,
        default: "Pendiente"
    },
})

const oferta = mongoose.model('Oferta', ofertaSchema)

module.exports = oferta