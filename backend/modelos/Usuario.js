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
    nombre: {
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    grupos: [
        {
            grupo:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Grupo',
            }
        }
    ],
    estado: {
        type: Boolean,
        required: true
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario