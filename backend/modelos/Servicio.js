const mongoose = require('mongoose')
var herencia = { discriminatorKey: 'tipo'}
const servicioSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: true,
        default: "Activo"
    },
    coste: {
        type: Number,
        required: true
    },
    propiedad: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Propiedad"
    },
    fecha_inicio:{
        type: Date,
        required: true,
        default: Date.now()
    },
    fecha_fin:{
        type: Date
    },
}, herencia)

servicioSchema.methods.calcularCoste = function calcularCoste(coste, precioProp) {
    if(coste > 3){
        coste = 3
    }
    return precioProp * coste / 100;
}
const servicio = mongoose.model('Servicio', servicioSchema)

const servicioVentaSchema = new mongoose.Schema({
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    }
})



const servicioVenta = servicio.discriminator('venta', servicioVentaSchema)

module.exports = {
    servicio,
    servicioVenta
}