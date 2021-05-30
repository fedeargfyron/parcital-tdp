const Reserva = require('../modelos/Reserva')
const { servicioVenta } = require('../modelos/Servicio')
const getReservas = async (req, res) => {
    try{
        const reservas = await Reserva.find({})
        res.json(reservas)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getReservasAgente = async (req, res) => {
    try {
        const servicios = await servicioVenta.find({
            agente: req.user._id
        })
        const reservas = servicios.map(servicio => {
            return servicio.reservas
        })
        res.json(reservas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setReserva = async (req, res) => {
    try {
        const reserva = new Reserva({
            
        })
        await reserva.save()
        res.json("Reserva creada")
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)
        //Actualizar datos
        reserva.save()
        res.json("Reserva actualizada")
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getReservas,
    getReservasAgente,
    setReserva,
    updateReserva
}