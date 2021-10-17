const mongoose = require('mongoose')

const audPropiedadSchema = mongoose.Schema({
    propiedad:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Propiedad"
    },
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
    },
    ubicacion:{
        type: String,
        required: true
    },
    dueño:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona",
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    estado:{
        type: String,
        default: "No disponible"
    },
    estado_propiedad:{
        type: String
    },
    servicios:[String]
    ,
    descripcion:{
        type: String
    },
    entorno:{
        type: String
    },
    imagenes:[String],
    precio:{
        type: Number
    },
    superficie:{
        type: Number
    },
    latitud:{
        type: Number
    },
    longitud: {
        type: Number
    },
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
    },
    cantidad_pisos:{
        type: Number
    },
    antiguedad:{
        type: String
    }
})

const AudPropiedad = mongoose.model('AudPropiedad', audPropiedadSchema)

module.exports = AudPropiedad