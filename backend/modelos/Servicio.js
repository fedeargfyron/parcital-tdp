const mongoose = require('mongoose')
var herencia = { discriminatorKey: 'tipo'}
const servicioSchema = new mongoose.Schema({

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
    visitas: [{
        visita:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Visita"
        }
    }],
    ofertas: [{
        oferta:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Oferta"
        }
    }],
    reservas: [{
        reserva:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Reserva"
        }
    }],
})

const servicioVenta = servicio.discriminator('En venta', servicioVentaSchema)

module.exports = {
    servicio,
    servicioVenta
}