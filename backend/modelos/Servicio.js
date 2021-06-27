const mongoose = require('mongoose')
var herencia = { discriminatorKey: 'tipo'}
const servicioSchema = new mongoose.Schema({
    estado: {
        type: Boolean,
        required: true
    },
    coste: {
        type: Number,
        required: true
    },
    propiedad: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Propiedad"
    }
}, herencia)

servicioSchema.methods.calcularCoste = function calcularCoste(precioProp) {

}

const servicio = mongoose.model('Servicio', servicioSchema)

const servicioVentaSchema = new mongoose.Schema({
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Persona"
    },
    coste_servicio: {
        type: Number,
        required: true,
    },
    fecha_inicio:{
        type: Date,
        required: true,
        default: Date.now()
    },
    reserva: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reserva"
    },
})



const servicioVenta = servicio.discriminator('En venta', servicioVentaSchema)

module.exports = {
    servicio,
    servicioVenta
}