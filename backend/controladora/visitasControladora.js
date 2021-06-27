const Visita = require('../modelos/Visita')
const { propiedad } = require('../modelos/Propiedad')
const { servicioVenta } = require('../modelos/Servicio')
//Checkear bien esto
const getVisitas = async (req, res) => {
    try {
        const visitas = await Visita.find({
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
            agente: req.user._id,
            estado: "Activo"
        })
        const visitas = servicios.map(servicio => {
            servicio.visitas.map(async (visita) => {
                return await Visita.findById(visita._id)
            })
        })
        res.json(visitas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setVisita = async (req, res) => {
    try {
        const prop = await propiedad.findById(req.body.propId)
        const servicio = await servicioVenta.find({
            _id: prop.servicio,
            estado: "Activo"
        })
        const visitaActiva = servicio.visitas.filter((visita) => {
            visita.interesado === req.user._id && visita.fecha === req.body.fecha 
        })
        if(visitaActiva !== null){
            res.json("Ya tiene una visita en ese mismo dia para esta propiedad")
        }
        const visita = new Visita({
            fecha: req.body.fecha,
            horario: req.body.horario,
            interesado: req.user._id,
            //Settear default pendiente
        })
        servicio.visitas.push(visita._id)
        await servicio.save()
        await visita.save()
        
        res.json('Visita creada')
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getVisitas,
    getVisitasAgente,
    setVisita
}