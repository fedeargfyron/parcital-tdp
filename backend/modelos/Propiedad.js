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
        required: true,
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
propiedadSchema.methods.estadoPropiedad = function estadoPropiedad(){
    const serviciosActivos = servicios.map(id => {
        servicio.find({
            _id: id,
            estado: "Activo"
        }
    )})
    if(serviciosActivos.length > 0) {
        const reservaActiva = serviciosActivos.map(item => {
            if(item.reserva !== null) return item //Quizás usar filter acá
        })                                        //Si esto no anda sacarlo y
        if (reservaActiva) this.estado = "Reservada" //asignar individualmente
        else this.estado = "Disponible"
    }
    else this.estado = "No disponible"
    
}
const propiedad = mongoose.model('Propiedad', propiedadSchema)

module.exports = {
    propiedad
}