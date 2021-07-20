const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    grupos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grupo',
        }
    ],
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario