const Visita = require('../modelos/Visita')
const { propiedad } = require('../modelos/Propiedad')
const { servicio } = require('../modelos/Servicio')
const { persona, agente } = require('../modelos/Persona')
const visita = require('../modelos/Visita')
//Checkear bien esto
const getVisitas = async (req, res) => {
    try {
        const personaInfo = await persona.find({
            usuario: req.user._id
        }, '_id nombre tipo')
        const visitas = await obtenerVisitas(personaInfo)
        res.json(visitas)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const obtenerVisitas = async (personaInfo) => {
    let visitas = []
    /*
    visitas = await Visita.find({
        interesado: personaInfo._id
    })
    visitas.map(visita => {
        const servicioInfo = await servicio.find({
            _id: visita.servicio
        }, '_id propiedad agente')
        const agenteInfo = await agente.findOne({_id: agente}, 'telefono')
        visita = { ...visita, ...servicioInfo, ...agenteInfo}
    })
    if(personaInfo.tipo === 'agente'){
        const servicios = await servicio.find({
            agente: personaInfo._id
        }, '_id propiedad')
        servicios.map(servicio => {
            let visitasServicio = await visita.find({
                servicio: servicio._id
            })

            visitas.push(visitasServicio)
        })
    }*/
    res.json(visitas)
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
    } catch (error) {
        console.error(error)
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