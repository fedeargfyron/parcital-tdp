const mongoose = require('mongoose')

var herencia = { discriminatorKey: 'tipo'}
const tipoPropiedadSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
}, herencia)


tipoPropiedadSchema.methods.rellenarCampos = function({tipo_propiedad, tipo_descripcion}){
    this.tipo = tipo_propiedad
    this.descripcion = tipo_descripcion
}

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
    }
})


tipoCasaSchema.methods.rellenarCampos = function({cochera, cant_baños, cant_habitaciones, cant_pisos, tipo_descripcion}){
    this.cochera = cochera
    this.cantidad_baños = cant_baños
    this.cantidad_habitaciones = cant_habitaciones
    this.cantidad_pisos = cant_pisos
    this.descripcion = tipo_descripcion
    return this
}

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

tipoDepartamentoSchema.methods.rellenarCampos = function({piso, acceso, cochera, cant_baños, cant_habitaciones, restricciones, tipo_descripcion}){
    this.piso = piso
    this.acceso = acceso
    this.cochera = cochera
    this.cantidad_baños = cant_baños
    this.cantidad_habitaciones = cant_habitaciones
    this.restricciones = restricciones
    this.descripcion = tipo_descripcion
    return this
}

const departamento = Tipo_Propiedad.discriminator('Departamento', tipoDepartamentoSchema)

module.exports = {
    Tipo_Propiedad,
    casa,
    departamento
}