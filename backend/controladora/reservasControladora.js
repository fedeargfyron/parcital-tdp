const Reserva = require('../modelos/Reserva')
const { servicioVenta, servicio } = require('../modelos/Servicio')
const MongoClientCreator = require('./Common/client')
const { propiedad } = require('../modelos/Propiedad')
const Venta = require('../modelos/Venta')
const { persona } = require('../modelos/Persona')
const mongoose = require('mongoose')

const getReservas = async (req, res) => {
    try {
      
      if(!req.user)
        return res.send({
          type: 'danger',
          title: 'Gestion de reservas',
          message: 'Inicie sesión'
        })
      const interesado = await persona.findOne({
        usuario: req.user._id
      })
      let limit = 10
      let reservas = []
      let pipeline = pipelineGenerator(mongoose.Types.ObjectId(interesado._id))
      if (req.query.filtros)
          pipeline = filtrosAdd(req.query.filtros, pipeline)
      
      if(req.query.profile)
        limit = 3
      const aggCursor = await (await MongoClientCreator('reservas', pipeline)).limit(limit)
      await aggCursor.forEach(reserva => {
        reservas.push(reserva)
      })
      res.json(reservas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de reservas',
          message: 'Server error'
      })
    }
}

const getReservasAgente = async (req, res) => {
    try {
      if(!req.user)
        return res.send({
          type: 'danger',
          title: 'Gestion de reservas',
          message: 'Inicie sesión'
        })
      const agente = await persona.find({
        usuario: req.user._id
      })
      const servicios = await servicioVenta.find({
          agente: agente._id,
          estado: "Activa"
      })
      const reservas = servicios.map(servicio => {
          servicio.reservas.map(async (reserva) => {
              return await Reserva.findById(reserva._id)
          })
      })
      res.json(reservas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de reservas',
          message: 'Server error'
      })
    }
}

const getReservasGestion = async (req, res) => {
    try {
        if(!req.user)
          return res.send({
            type: 'danger',
            title: 'Gestion de reservas',
            message: 'Inicie sesión'
          })
        let reservas = []
        let pipeline = pipelineGeneratorGestion()
        if (req.query.filtros)
            pipeline = filtrosAdd(req.query.filtros, pipeline)
        
        const aggCursor = await MongoClientCreator('reservas', pipeline)
        await aggCursor.forEach(reserva => {
            reservas.push(reserva)
        })
        res.json(reservas)
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de reservas',
          message: 'Server error'
      })
    }
}

const anularReserva = async (req, res) => {
  try {
      const reserva = await Reserva.findById(req.params.id)
      const prop = await propiedad.findById(req.body.propId)
      reserva.estado = "Anulada"
      await reserva.save()
      prop.estadoPropiedad()
      await prop.save()
      res.send({
        type: 'success',
        title: 'Gestion de reservas',
        message: 'Reserva anulada'
      })
  } catch (err) {
      console.error(err)
      res.status(500).send({
        type: 'danger',
        title: 'Gestion de reservas',
        message: 'Server error'
      })
  }
}

const aceptarVenta = async (req, res) => {
  try {
      const reserva = await Reserva.findById(req.params.id)
      const prop = await propiedad.findById(req.body.propId)
      const servicioReserva = await servicio.findById(reserva.servicio)
      reserva.estado = "Compra confirmada"
      prop.estado = "Vendida"
      servicioReserva.estado = "Finalizado"
      const venta = new Venta({
          propiedad: prop._id,
          cliente: reserva.cliente,
          agente: servicioReserva.agente,
          total: prop.precio
      })
      await venta.save()
      await reserva.save()
      await prop.save()
      await servicioReserva.save()
      res.send({
        type: 'success',
        title: 'Gestion de reservas',
        message: 'Venta confirmada'
      })
  } catch(err) {
      console.error(err)
      res.status(500).send({
          type: 'danger',
          title: 'Gestion de reservas',
          message: 'Server error'
      })
  }
}

const pipelineGenerator = (id) => {
  let pipelineBase = [
    {
      '$match': {
          'cliente': id
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
  return pipelineBase
}

const pipelineGeneratorGestion = () => {

  let pipelineBase = [
      {
        '$match': { }
      }, {
          '$lookup': {
            'from': 'servicios', 
            'let': {
              'servicioId': '$servicio'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$servicioId', '$_id'
                    ]
                  }
                }
              }, {
                '$project': {
                  '_id': 1, 
                  'tipo': 1, 
                  'agente': 1, 
                  'propiedad': 1
                }
              }
            ], 
            'as': 'servicioDatos'
          }
        }, {
          '$unwind': {
            'path': '$servicioDatos'
          }
        }, {
          '$lookup': {
            'from': 'personas', 
            'let': {
              'agenteId': '$servicioDatos.agente'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$agenteId', '$_id'
                    ]
                  }
                }
              }, {
                '$project': {
                  '_id': 1, 
                  'nombre': 1, 
                  'apellido': 1
                }
              }
            ], 
            'as': 'agenteDatos'
          }
        }, {
          '$unwind': {
            'path': '$agenteDatos'
          }
        }, {
          '$lookup': {
            'from': 'personas', 
            'let': {
              'clienteId': '$cliente'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$clienteId', '$_id'
                    ]
                  }
                }
              }, {
                '$project': {
                  '_id': 1, 
                  'nombre': 1, 
                  'apellido': 1
                }
              }
            ], 
            'as': 'clienteDatos'
          }
        }, {
          '$unwind': {
            'path': '$clienteDatos'
          }
        }, {
          '$lookup': {
            'from': 'propiedads', 
            'let': {
              'propiedadId': '$servicioDatos.propiedad'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$propiedadId', '$_id'
                    ]
                  }
                }
              }, {
                '$project': {
                  '_id': 1, 
                  'precio': 1
                }
              }
            ], 
            'as': 'propiedadDatos'
          }
        }, {
          '$unwind': {
            'path': '$propiedadDatos'
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
      pipeline[0].$match.fecha_inicio = { '$gte': new Date(filtrosJson.fecha_inicio), '$lt': new Date(filtrosJson.fecha_fin)}
  else if(filtrosJson.fecha_inicio !== "")
      pipeline[0].$match.fecha_inicio = { '$gte': new Date(filtrosJson.fecha_inicio)}
  else if(filtrosJson.fecha_fin !== "")
      pipeline[0].$match.fecha_inicio = { '$lt': new Date(filtrosJson.fecha_fin)}
  return pipeline
}

module.exports = {
    getReservas,
    getReservasAgente,
    anularReserva,
    aceptarVenta,
    getReservasGestion
}