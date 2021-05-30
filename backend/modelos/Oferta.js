const mongoose = require('mongoose')

const ofertaSchema = new mongoose.Schema({
    fecha:{
        type: Date,
        required: true
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
        required: true
    },
})

const oferta = mongoose.model('Oferta', ofertaSchema)

module.exports = oferta