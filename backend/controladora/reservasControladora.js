const Reserva = require('../modelos/Reserva')
const { servicioVenta } = require('../modelos/Servicio')
const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find({
            cliente: req.user._id
        })
        res.json(reservas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getReservasAgente = async (req, res) => {
    try {
        const servicios = await servicioVenta.find({
            agente: req.user._id,
            estado: "Activa"
        })
        const reservas = servicios.map(servicio => {
            servicio.reservas.map(async (reserva) => {
                return await Reserva.findById(reserva._id)
            })
        })
        res.json(reservas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const anularReserva = async (req, res) => {
    const reserva = await Reserva.findById(req.params.id)
    const prop = await propiedad.findyById(req.body.propId)
    reserva.estado = req.body.estado
    await reserva.save()
    prop.estadoPropiedad()
    await prop.save()
    res.json('Reserva anulada')
}

module.exports = {
    getReservas,
    getReservasAgente,
    anularReserva
}