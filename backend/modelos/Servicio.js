const mongoose = require('mongoose')
var herencia = { discriminatorKey: 'tipo'}
const servicioSchema = new mongoose.Schema({
    estado: {
        type: Boolean,
        required: true
    }
}, herencia)

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
    visitas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Visita"
        }
    ],
    ofertas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Oferta"
        }
    ],
    reservas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Reserva"
        }
    ],
})

const servicioVenta = servicio.discriminator('En venta', servicioVentaSchema)

module.exports = {
    servicio,
    servicioVenta
}