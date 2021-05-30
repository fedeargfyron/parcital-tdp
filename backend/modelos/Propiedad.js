const mongoose = require('mongoose')

var herencia = { discriminatorKey: 'tipo'}

const propiedadSchema = new mongoose.Schema({
    ubicacion:{
        type: String,
        required: true
    },
    dueño:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    },
    tipo:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    estado_propiedad:{
        type: String,
        required: true
    },
    servicio:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Servicio"
    },
    descripcion:{
        type: String,
        required: true
    },
    entorno:{
        type: String,
        required: true
    },
    imagenes:[
        {
            imagen:{
            type: String,
            required: true
            }
        }
    ],
    precio:{
        type: Number,
        required: true
    },
    superficie:{
        type: Number,
        required: true
    }
}, herencia)

const propiedad = mongoose.model('Propiedad', propiedadSchema)

const casaSchema = new mongoose.Schema({
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

const casa = propiedad.discriminator('Casa', casaSchema)

const departamentoSchema = new mongoose.Schema({
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

const departamento = propiedad.discriminator('Departamento', departamentoSchema)


module.exports = {
    propiedad,
    casa,
    departamento
}