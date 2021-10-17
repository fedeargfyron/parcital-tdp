const mongoose = require('mongoose')

const audLogSchema = mongoose.Schema({
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"
    },
    accion:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

const AudLog = mongoose.model('AudLog', audLogSchema)

module.exports = AudLog