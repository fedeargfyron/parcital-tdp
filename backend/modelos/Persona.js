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
        ref: 'Usuario'
    },
    tipo:{
        type: String,
        required: true,
        default: 'interesado'
    }
}, herencia)
const persona = mongoose.model('Persona', personaSchema)


const dueñoSchema = new mongoose.Schema({
    escritura:{
        type: String,
    }
})
const dueño = persona.discriminator('Dueño', dueñoSchema)

const agenteSchema = new mongoose.Schema({
    cuil:{
        type: Number,
    },
    titulo:{
        type: String,
    },
    horarios:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario'
    }],
    sueldo:{
        type: Number,
        required: true
    }
})
const agente = persona.discriminator('Agente', agenteSchema)

module.exports = {
    persona,
    dueño,
    agente
}