const mongoose = require('mongoose')
const herencia = { discriminatorKey: 'tipo'}

const personaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    domicilio:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    tipo:{
        type: String,
        required: true
    },
}, herencia)
const persona = mongoose.model('Persona', personaSchema)


const dueñoSchema = new mongoose.Schema({
    escritura:{
        type: String,
        required: true
    }
})
const dueño = persona.discriminator('Dueño', dueñoSchema)

const agenteSchema = new mongoose.Schema({
    cuil:{
        type: Number,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    horarios:[{
        horario:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Horario'
        }
    }]
})
const agente = persona.discriminator('Agente', agenteSchema)

module.exports = {
    persona,
    dueño,
    agente
}