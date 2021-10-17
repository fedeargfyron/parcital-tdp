const mongoose = require('mongoose')


const propiedadSchema = new mongoose.Schema({
    ubicacion:{
        type: String,
        required: true
    },
    dueño:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona",
        required: true
    },
    tipo:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Tipo propiedad"
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
    }
})
propiedadSchema.methods.estadoPropiedad = function estadoPropiedad(){
    if(this.estado_propiedad && this.descripcion && this.imagenes && this.precio && this.superficie){
        if(this.servicios && this.servicios.length > 0)
            return this.estado = "Disponible"
        return this.estado = "Preparada"
    }    
    return this.estado = "No disponible"
}
propiedadSchema.methods.rellenarCampos = function({ubicacion, estado_propiedad, descripcion, entorno, imagenes, precio, superficie}){
    this.ubicacion = ubicacion
    this.estado_propiedad = estado_propiedad
    this.descripcion = descripcion
    this.entorno = entorno
    this.imagenes = imagenes
    this.precio = precio
    this.superficie = superficie
}

const propiedad = mongoose.model('Propiedad', propiedadSchema)

module.exports = {
    propiedad
}