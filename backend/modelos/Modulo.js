const mongoose = require('mongoose')

const herencia = { discriminatorKey: "Tipo"}

const moduloSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
}, herencia)

const Modulo = mongoose.model('Modulo', moduloSchema)

const moduloPrincipalSchema = mongoose.Schema({
    submodulos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Modulo"
        }
    ]
})

const moduloPrincipal = Modulo.discriminator('Modulo Principal', moduloPrincipalSchema)

const SubmoduloSchema = mongoose.Schema({
    formularios:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Formulario"
        }
    ]
})

const SubModulo = Modulo.discriminator('Submodulo', SubmoduloSchema)

module.exports = {
    moduloPrincipal,
    SubModulo
}