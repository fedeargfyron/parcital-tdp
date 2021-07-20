const mongoose = require('mongoose')

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
        type: Number
    },
    cantidad_pisos:{
        type: Number
    },
    cochera:{
        type: Boolean
    },
    cantidad_baños:{
        type: Number
    },
    antiguedad:{
        type: String
    }
})

const casa = Tipo_Propiedad.discriminator('Casa', tipoCasaSchema)

const tipoDepartamentoSchema = new mongoose.Schema({
    cantidad_habitaciones:{
        type: Number,
    },
    piso:{
        type: String
    },
    acceso:{
        type: String
    },
    cochera:{
        type: Boolean
    },
    cantidad_baños:{
        type: Number,
    },
    restricciones:{
        type: String
    }
})

const departamento = Tipo_Propiedad.discriminator('Departamento', tipoDepartamentoSchema)

module.exports = {
    Tipo_Propiedad,
    casa,
    departamento
}