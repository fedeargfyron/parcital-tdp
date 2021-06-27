const mongoose = require('mongoose')
const {servicio} = require('./Servicio')


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
    servicios:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servicio"
        }
    ]
    ,
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
            type: String
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
propiedadSchema.methods.estadoPropiedad = function estadoPropiedad(){
    if(servicios.length > 0) {
        const serviciosActivos = servicios.map(async (servicioActivo) => {
            return await servicio.findById(servicioActivo)
        })
        const reservaActiva = serviciosActivos.filter(item => { item.reserva !== null })                                        //Si esto no anda sacarlo y
        reservaActiva ? this.estado = "Reservada" //asignar individualmente
        : this.estado = "Disponible"
    }
    else this.estado = "No disponible"
    
}
const propiedad = mongoose.model('Propiedad', propiedadSchema)

module.exports = {
    propiedad
}