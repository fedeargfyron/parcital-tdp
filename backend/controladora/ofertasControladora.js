const Oferta = require('../modelos/Oferta')
const { servicioVenta } = require('../modelos/Servicio')
const { persona } = require('../modelos/Persona')
const MongoClientCreator = require('./Common/client')
const { propiedad } = require('../modelos/Propiedad')
const Reserva = require('../modelos/Reserva')
const mongoose = require('mongoose')

const getOfertas = async (req, res) => {
    try {
        
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de ofertas',
                message: 'Inicie sesión'
            })
        let ofertas = []
        let limit = 10
        const interesado = await persona.findOne({
            usuario: req.user._id
        })
        let pipeline = pipelineGenerator(mongoose.Types.ObjectId(interesado._id))
        if (req.query.filtros)
            pipeline = filtrosAdd(req.query.filtros, pipeline)

        if(req.query.profile)
            limit = 3
        const aggCursor = await (await MongoClientCreator('ofertas', pipeline)).limit(limit)
        await aggCursor.forEach(oferta => {
            ofertas.push(oferta)
        })
        res.json(ofertas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ofertas',
            message: 'Server error'
        })
    }
}

const getOfertasAgente = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de ofertas',
                message: 'Inicie sesión'
            })
        let ofertas = []
        let agente = await persona.findOne({
            usuario: req.user._id
        })
        let pipeline = pipelineGeneratorAgente(mongoose.Types.ObjectId(agente._id))
        if (req.query.filtros)
            pipeline = filtrosAddAgente(req.query.filtros, pipeline)
        
        const aggCursor = await MongoClientCreator('servicios', pipeline)
        await aggCursor.forEach(oferta => {
            ofertas.push(oferta)
        })
        res.json(ofertas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ofertas',
            message: 'Server error'
        })
    }
}



const setOferta = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de ofertas',
                message: 'Inicie sesión'
            })
        const interesado = await persona.findOne({
            usuario: req.user._id
        })

        const servicio = await servicioVenta.findOne({
            propiedad: mongoose.Types.ObjectId(req.body.propiedad),
            estado: "Activo",
            tipo: req.body.servicio
        })

        const ofertaPendiente = await Oferta.findOne({
            interesado: interesado._id,
            estado: "Pendiente",
            servicio: servicio._id
        })
        if(ofertaPendiente)
            return res.send({
                type: 'danger',
                title: 'Gestion de ofertas',
                message: 'Ya tiene una oferta pendiente en esta propiedad'
            })

        const oferta = new Oferta({
            monto: req.body.oferta,
            interesado: interesado._id,
            servicio: servicio._id
        })
        await oferta.save()
        res.send({
            type: 'success',
            title: 'Gestion de ofertas',
            message: 'Oferta creada'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ofertas',
            message: 'Server error'
        })
    }
}

const aceptarOferta = async (req, res) => {
    try {
        const prop = await propiedad.findById(req.query.propId)
        if(prop.estado == "Reservada")
            return res.send({
                type: 'danger',
                title: 'Gestion de ofertas',
                message: 'No se puede generar la reserva porque ya existe una pendiente en esta propiedad'
            })
        const oferta = await Oferta.findById(req.params.id)
        const reserva = new Reserva({
            cliente: oferta.interesado,
            monto: oferta.monto,
            estado: "Pendiente",
            servicio: oferta.servicio
        })
        oferta.estado = "Aceptada"
        prop.estado = "Reservada"
        await reserva.save()
        await prop.save()
        await oferta.save()
        res.send({
            type: 'success',
            title: 'Gestion de ofertas',
            message: 'Reserva creada!'
        })
        
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ofertas',
            message: 'Server error'
        })
    }
}

const rechazarOferta = async (req, res) => {
    try{
        const oferta = await Oferta.findById(req.params.id)
        oferta.estado = "Rechazada"
        await oferta.save()
        res.send({
            type: 'success',
            title: 'Gestion de ofertas',
            message: 'Oferta rechazada!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ofertas',
            message: 'Server error'
        })
    }
}

const pipelineGenerator = (id) => {

    let pipelineBase = [
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
          }}, {
            '$unwind': {
              'path': '$agenteDatos'
            }
          }
      ]
    return pipelineBase
}

const pipelineGeneratorAgente = (id) => {

    let pipelineBase = [
        {
          '$match': {
              'agente': id
          }
        }, {
            '$lookup': {
              'from': 'ofertas', 
              'localField': '_id', 
              'foreignField': 'servicio', 
              'as': 'ofertaDatos'
            }
          }, {
            '$unwind': {
              'path': '$ofertaDatos'
            }
          }, {
            '$lookup': {
            'from': 'personas',
            'let': { 'interesadoId': '$ofertaDatos.interesado'},
            'pipeline': [{
              '$match': { 
                '$expr': { '$eq': ["$$interesadoId", "$_id"] }
              } 
            }, {
            '$project': { '_id': 1, 'nombre': 1, 'apellido': 1, 'telefono': 1 }
            }
            ],
            'as': 'interesadoDatos'
          }}, {
            '$unwind': {
              'path': '$interesadoDatos'
            }
          }
      ]
    return pipelineBase
}

const filtrosAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    if(filtrosJson.estado !== "")
        pipeline[0].$match.estado = filtrosJson.estado
    if(filtrosJson.fecha_inicio !== "" && filtrosJson.fecha_fin !== "")
        pipeline[0].$match.fecha = { '$gte': new Date(filtrosJson.fecha_inicio), '$lt': new Date(filtrosJson.fecha_fin)}
    else if(filtrosJson.fecha_inicio !== "")
        pipeline[0].$match.fecha = { '$gte': new Date(filtrosJson.fecha_inicio)}
    else if(filtrosJson.fecha_fin !== "")
        pipeline[0].$match.fecha = { '$lt': new Date(filtrosJson.fecha_fin)}
    return pipeline
}

const filtrosAddAgente = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    if(filtrosJson.estado !== "")
        pipeline.push( {'$match': {'ofertaDatos.estado': filtrosJson.estado}})

    if(filtrosJson.fecha_inicio !== "" && filtrosJson.fecha_fin !== "")
        pipeline.push( {'$match': {'ofertaDatos.fecha': { '$gte': new Date(filtrosJson.fecha_inicio), '$lt': new Date(filtrosJson.fecha_fin)}}})
    else if(filtrosJson.fecha_inicio !== "")
        pipeline.push( {'$match': {'ofertaDatos.fecha': { '$gte': new Date(filtrosJson.fecha_inicio)}}})
    else if(filtrosJson.fecha_fin !== "")
        pipeline.push( {'$match': {'ofertaDatos.fecha': { '$lt': new Date(filtrosJson.fecha_fin)}}})
    return pipeline
}


module.exports = {
    getOfertas,
    getOfertasAgente,
    setOferta,
    aceptarOferta,
    rechazarOferta
}