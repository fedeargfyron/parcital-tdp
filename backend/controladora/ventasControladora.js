const Venta = require('../modelos/Venta')
const { propiedad } = require('../modelos/Propiedad')
const { persona } = require('../modelos/Persona')
const { servicio } = require('../modelos/Servicio')
const mongoose = require('mongoose')
const MongoClientCreator = require('./Common/client')
const getVentas = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de ventas',
                message: 'Inicie sesión'
            })
        let ventas = []
        let limit = 10
        const cliente = await persona.findOne({
            usuario: req.user._id
        })
        let pipeline = pipelineGenerator(mongoose.Types.ObjectId(cliente._id))
        if (req.query.filtros)
            pipeline = filtrosAdd(req.query.filtros, pipeline)

        if(req.query.profile)
            limit = 3
        const aggCursor = await (await MongoClientCreator('ventas', pipeline)).limit(limit)
        await aggCursor.forEach(venta => {
            ventas.push(venta)
        })
        res.json(ventas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ventas',
            message: 'Server error'
        })
    }
}

const getVentasAgente = async (req, res) => {

}

const setVenta = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de ventas',
                message: 'Inicie sesión'
            })

        const servicioFinalizado = servicio.find({
            propiedad: req.body.propiedad,
            tipo: "venta"
        })

        servicioFinalizado.estado = "Finalizado"
        servicioFinalizado.fecha_fin = Date.now()
        const venta = new Venta({
            propiedad: req.body.propiedad,
            agente: req.body.agente,
            cliente: req.body.cliente,
            total: req.body.total,
            ingreso: servicioFinalizado.coste * 2
        })

        const prop = await propiedad.findById(req.body.propId)
        prop.estado = "Vendida"
        const index = prop.servicios.indexOf("venta");
        if (index > -1) {
            prop.servicios.splice(index, 1);
        }
        await servicioFinalizado.save()
        await prop.save()
        await venta.save()
        res.send({
            type: 'success',
            title: 'Gestion de ventas',
            message: 'Venta creada'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de ventas',
            message: 'Server error'
        })
    }
}

const pipelineGenerator = (id) => {
    return pipelineBase = [{
        '$match': {
            'cliente': id
        }
        }, {
            '$lookup': {
            'from': 'personas',
            'let': { 'agenteId': '$agente'},
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
          },
        {
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
    getVentas,
    getVentasAgente,
    setVenta
}