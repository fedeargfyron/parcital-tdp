const { servicio, servicioVenta } = require('../modelos/Servicio')
const { propiedad } = require('../modelos/Propiedad')
const { persona } = require('../modelos/Persona')
const mongoose = require('mongoose')
const MongoClientCreator = require('./Common/client')

const getServicios = async (req, res) => {
    try {
        const agente = await persona.findOne({
            usuario: req.user._id
        })
        const servicios = await servicio.find({
            $or: [ { agente: agente._id }, { price: 10 } ]
            
        })
        res.json(servicios)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}



const getServiciosVenta = async (req, res) => {
    try {
        let serviciosVenta = []
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de servicios',
                message: 'Inicie sesión'
            })
        const agente = await persona.findOne({
            usuario: req.user._id
        })
        let pipeline = pipelineGenerator(mongoose.Types.ObjectId(agente._id))
        if (req.query.filtros)
            pipeline = filtersAdd(req.query.filtros, pipeline)

        const aggCursor = await MongoClientCreator('servicios', pipeline)
        await aggCursor.forEach(servicio => {
            serviciosVenta.push(servicio)
        })
        res.json(serviciosVenta)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}


const getServicioVenta = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de servicios',
                message: 'Inicie sesión'
            })
        let servicioVenta
        let pipeline = [{
            '$match': {
                '_id': mongoose.Types.ObjectId(req.params.id)
            }
            }, {
            '$lookup': {
                'from': 'visitas', 
                'localField': '_id',
                'foreignField': 'servicio', 
                'as': 'visitasDatos'
            }
            }, {
                '$lookup': {
                'from': 'ofertas', 
                'localField': '_id',
                'foreignField': 'servicio', 
                'as': 'ofertasDatos'
                }
            }, {
                '$lookup': {
                'from': 'reservas', 
                'localField': '_id',
                'foreignField': 'servicio', 
                'as': 'reservasDatos'
                }
            }]
        const aggCursor = await MongoClientCreator('servicios', pipeline)
        await aggCursor.forEach(servicio => {
            servicioVenta = servicio
        })
        res.json(servicioVenta)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}

const getServicio = async (req, res) => {
    try {
        const servicio = await servicio.findById(req.params.id)
        res.json(servicio)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}

const setServicioVenta = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de servicios',
                message: 'Inicie sesión'
            })
        
        const prop = await propiedad.findById(req.params.id)
        if(prop.servicios && prop.servicios.includes("venta"))
            return res.send({
                type: 'danger',
                title: 'Gestion de servicios',
                message: 'La propiedad ya tiene un servicio de venta'
            })
        prop.servicios.push("venta")
        prop.estadoPropiedad()
        
        const agente = await persona.findOne({
            usuario: req.user._id
        })
        
        const servicio = new servicioVenta({
            agente: agente._id,
            propiedad: prop._id
        })
        servicio.coste = servicio.calcularCoste(req.body.coste, prop.precio)
        await servicio.save()
        await prop.save()
        res.send({
            type: 'success',
            title: 'Gestion de servicios',
            message: 'Servicio creado'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}

const removeServicio = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de servicios',
                message: 'Inicie sesión'
            })
        const servicio = await servicioVenta.findById(req.params.id)
        if(servicio.reserva)
            return res.send({
                type: 'danger',
                title: 'Gestion de servicios',
                message: 'No se puede anular porque existe una reserva'
            })
        const prop = await propiedad.findById(servicio.propiedad)
        servicio.estado = "Anulado"
        servicio.fecha_fin = Date.now()
        await servicio.save()
        const index = prop.servicios.indexOf("venta");
        if (index > -1) {
            prop.servicios.splice(index, 1);
          }
        prop.estadoPropiedad()
        await prop.save()
        res.send({
            type: 'success',
            title: 'Gestion de servicios',
            message: 'Servicio anulado!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}

const pipelineGenerator = (id) => {
    let pipelineBase = [
        {
          '$match': {
            'agente': id,
            'tipo': 'venta'
          }
        }, {
          '$lookup': {
            'from': 'ofertas', 
            'localField': '_id',
            'foreignField': 'servicio', 
            'as': 'ofertasDatos'
            }
        },  {
          '$lookup': {
            'from': 'visitas', 
            'localField': '_id',
            'foreignField': 'servicio', 
            'as': 'visitasDatos'
          }
        },  {
            '$lookup': {
              'from': 'reservas', 
              'localField': '_id',
              'foreignField': 'servicio', 
              'as': 'reservasDatos'
            }
        },
        {
            '$project': {
                propiedad: 1,
                fecha_inicio: 1,
                estado: 1,
                totalVisitas: {
                    $size: { $ifNull: [ '$visitasDatos', [] ] }
                },
                totalOfertas: {
                    $size: { $ifNull: [ '$ofertasDatos', [] ] }
                },
                totalReservas: {
                    $size: { $ifNull: [ '$reservasDatos', [] ] }
                },
            }
        }
      ]
    return pipelineBase
}

const filtersAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    if(filtrosJson.estado !== "")
        pipeline[0].$match.estado = filtrosJson.estado
    if(filtrosJson.fecha_inicio !== "" && filtrosJson.fecha_fin !== "")
        pipeline[0].$match.fecha_inicio = { '$gte': new Date(filtrosJson.fecha_inicio), '$lt': new Date(filtrosJson.fecha_fin)}
    else if(filtrosJson.fecha_inicio !== "")
        pipeline[0].$match.fecha_inicio = { '$gte': new Date(filtrosJson.fecha_inicio)}
    else if(filtrosJson.fecha_fin !== "")
        pipeline[0].$match.fecha_inicio = { '$lt': new Date(filtrosJson.fecha_fin)}
    return pipeline
}

module.exports = {
    getServicio,
    getServicios,
    setServicioVenta,
    removeServicio,
    getServiciosVenta,
    getServicioVenta
}