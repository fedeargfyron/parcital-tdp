const mongoose = require('mongoose')
const { discriminator } = require('./Reserva')

var herencia = { discriminatorKey: 'tipo'}
const tipoPropiedadSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true
    }
}, herencia)

const Tipo_Propiedad = mongoose.model('Tipo Propiedad', tipoPropiedadSchema)

const tipoCasaSchema = new mongoose.Schema({
    cantidad_habitaciones:{
        type: Number,
        required: true
    },
    cantidad_pisos:{
        type: Number,
        required: true
    },
    cochera:{
        type: Boolean,
        required: true
    },
    cantidad_baños:{
        type: Number,
        required: true
    },
    antiguedad:{
        type: String,
        required: true
    }
})

const casa = Tipo_Propiedad.discriminator('Casa', tipoCasaSchema)

const tipoDepartamentoSchema = new mongoose.Schema({
    cantidad_habitaciones:{
        type: Number,
        required: true
    },
    piso:{
        type: String,
        required: true
    },
    acceso:{
        type: String,
        required: true
    },
    cochera:{
        type: Boolean,
        required: true
    },
    cantidad_baños:{
        type: Number,
        required: true
    },
    restricciones:{
        type: String,
        required: true
    }
})

const departamento = Tipo_Propiedad.discriminator('Departamento', tipoDepartamentoSchema)

module.exports = {
    Tipo_Propiedad,
    casa,
    departamento
}