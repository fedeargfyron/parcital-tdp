const Visita = require('../modelos/Visita')
const { propiedad } = require('../modelos/Propiedad')
const { servicioVenta } = require('../modelos/Servicio')
//Checkear bien esto
const getVisitas = async (req, res) => {
    try {
        const visitas = await Oferta.find({
            interesado: req.user._id
        })
        res.json(visitas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getVisitasAgente = async (req, res) => {
    try {
        const servicios = await servicioVenta.find({
            agente: req.user._id
        })
        const visitas = servicios.map(servicio => {
            return servicio.visitas
        })
        res.json(visitas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setVisita = async (req, res) => {
    try {
        const visita = new Visita({

        })
        await visita.save()
        res.json('Visita creada')
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateVisita = async (req, res) => {
    try {
        const visita = await Visita.findById(req.params.id)
        await visita.save()
        res.json('Visita actualizada')
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getVisitas,
    getVisitasAgente,
    setVisita,
    updateVisita
}