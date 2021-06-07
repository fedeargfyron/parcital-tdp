const mongoose = require('mongoose')

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
        required: true,
        default: "No disponible"
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
    },
    
})
propiedadSchema.methods.estadoPropiedad = function(){

}
const propiedad = mongoose.model('Propiedad', propiedadSchema)

module.exports = {
    propiedad
}