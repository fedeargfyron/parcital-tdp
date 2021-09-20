const Visita = require('../modelos/Visita')
const { servicio } = require('../modelos/Servicio')
const { persona } = require('../modelos/Persona')
const mongoose = require('mongoose')
const MongoClientCreator = require('./client')

const getVisitas = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de visitas',
                message: 'Inicie sesión'
            })
        let visitas = []
        let limit = 10
        const interesado = await persona.findOne({
            usuario: req.user._id
        })
        let pipeline = pipelineGenerator(mongoose.Types.ObjectId(interesado._id))

        if (req.query.filtros)
            pipeline = filtrosAdd(req.query.filtros, pipeline)

        if(req.query.profile)
            limit = 3
            
        const aggCursor = await (await MongoClientCreator('visitas', pipeline)).limit(limit)
        await aggCursor.forEach(visita => {
            visitas.push(visita)
        })
        res.json(visitas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de visitas',
            message: 'Server error'
        })
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
    } catch (error) {
        console.error(error)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de visitas',
            message: 'Server error'
        })
    }
}

const setVisita = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de visitas',
                message: 'Inicie sesión'
            })
        const interesado = await persona.findOne({
            usuario: req.user._id
        })
        const visitaExistente = await Visita.findOne({
            servicio: req.body.servicio,
            estado: "Pendiente",
            interesado: interesado._id,
        })
        if(visitaExistente){
            return res.send({
                type: 'danger',
                title: 'Gestion de visitas',
                message: 'Ya tiene una visita agendada para esta propiedad'
            })
        }
        const visita = new Visita({
            fecha: req.body.fecha,
            horario: req.body.hora,
            interesado: interesado._id,
            servicio: req.body.servicio
        })
        await visita.save()
        res.send({
            type: 'success',
            title: 'Gestion de visitas',
            message: 'Visita creada'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de visitas',
            message: 'Server error'
        })
    }
}

const pipelineGenerator = (id) => {
    return pipelineBase = [
            {
            '$match': {
                'interesado': id
            }
          }, {
              '$lookup': {
                'from': 'servicios', 
                'localField': 'servicio', 
                'foreignField': '_id', 
                'as': 'servicioDatos'
              }
            }, {
              '$unwind': {
                'path': '$servicioDatos'
              }
            }, {
              '$lookup': {
              'from': 'personas',
              'let': { 'agenteId': '$servicioDatos.agente'},
              'pipeline': [{
                '$match': { 
                  '$expr': { '$eq': ["$$agenteId", "$_id"] }
                } 
              }, {
              '$project': { '_id': 1, 'nombre': 1, 'apellido': 1, 'telefono': 1 }
              }
              ],
              'as': 'agenteDatos'
              }
            }, {
              '$unwind': {
                'path': '$agenteDatos'
              }
            }
    ]
}

const filtrosAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
  
    if(filtrosJson.fecha_inicio !== "" && filtrosJson.fecha_fin !== "")
        pipeline[0].$match.fecha = { '$gte': new Date(filtrosJson.fecha_inicio), '$lt': new Date(filtrosJson.fecha_fin)}
    else if(filtrosJson.fecha_inicio !== "")
        pipeline[0].$match.fecha = { '$gte': new Date(filtrosJson.fecha_inicio)}
    else if(filtrosJson.fecha_fin !== "")
        pipeline[0].$match.fecha = { '$lt': new Date(filtrosJson.fecha_fin)}
    return pipeline
  }

module.exports = {
    getVisitas,
    getVisitasAgente,
    setVisita
}