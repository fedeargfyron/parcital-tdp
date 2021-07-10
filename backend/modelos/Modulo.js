const mongoose = require('mongoose')

const herencia = { discriminatorKey: "tipo"}

const moduloSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
}, herencia)

const Modulo = mongoose.model('Modulo', moduloSchema)

const SubmoduloSchema = mongoose.Schema({
    modulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modulo"
    }
})

const SubModulo = Modulo.discriminator('Submodulo', SubmoduloSchema)

module.exports = {
    Modulo,
    SubModulo
}