require('dotenv').config()
const { propiedad } = require('../modelos/Propiedad')
const Horario = require('../modelos/Horario')
const MongoClientCreator = require('./Common/client')
const mongoose = require('mongoose')
const { Tipo_Propiedad, casa, departamento } = require('../modelos/Tipo_Propiedad')
const NodeGeocoder = require('node-geocoder')

const getPropiedades = async (req, res) => {
    try {
      let propiedades = []
      let pipeline = pipelineGenerator()
      if(req.query.tipo)
          pipeline = tipoFiltersAdd(req.query.tipo, pipeline)
      else if (req.query.filtros)
          pipeline = filtrosFiltersAdd(req.query.filtros, pipeline)
      const aggCursor = await MongoClientCreator('propiedads', pipeline)
      await aggCursor.forEach(propiedad => {
          propiedades.push(propiedad)
      })
      res.json(propiedades)
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de propiedades',
          message: 'Server error'
        })
    }
}

const getPropiedadesDisponibles = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
              type: 'danger',
              title: 'Gestion de propiedades',
              message: 'Inicie sesión'
            })
        const propiedadesDisponibles = await propiedad.find({
            estado: 'Preparada',
            servicios: { '$ne': "venta"}
        }, "_id ubicacion")

        res.json(propiedadesDisponibles)
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de propiedades',
          message: 'Server error'
        })
    }
}


const getPropiedad = async (req, res) => {
    try {
        let propiedadDto
        let pipeline = pipelineGenerator()
        pipeline[0].$match._id = mongoose.Types.ObjectId(req.params.id)
        if(req.query.gestion)
          pipeline = pipelineForVisits(pipeline)
        const aggCursor = await MongoClientCreator('propiedads', pipeline)
        await aggCursor.forEach(propiedad => {
            propiedadDto = propiedad
        })
        if(req.query.gestion){
          if(propiedadDto.agenteDatos.horarios)
          propiedadDto.agenteDatos.horarios = await Promise.all(propiedadDto.agenteDatos.horarios.map(async horario => {
              return await Horario.findById(horario)
          }))
        }
        res.json(propiedadDto)
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de propiedades',
          message: 'Server error'
        })
    }
}

const options = {
  provider: 'google',
  apiKey: 'AIzaSyAgn3CVY9Th3srJUj3JfuUwqcvgzp0a6fQ'
}

const setPropiedad = async (req, res) => {
    try {
        const geocoder = NodeGeocoder(options)
        const resultado = await geocoder.geocode({
          address: req.body.ubicacion + 'Rosario, Santa Fe',
          country: 'Argentina',
          zipCode: 'S2000',
          countryCode: 'AR',
          minConfidence: 0.6
        })
        if(resultado.length == 0){
            return res.send({
              type: 'danger',
              title: 'Gestion de propiedades',
              message: 'No existe la propiedad en Rosario'
            })
        }
        if(!resultado[0].streetNumber){
          return res.send({
              type: 'danger',
              title: 'Gestion de propiedades',
              message: 'No existe o especifique el número de calle'
            })
        }
        let tipo_propiedad
        if(req.body.tipo_propiedad === "Departamento"){
            tipo_propiedad = new departamento({
                piso: req.body.piso,
                acceso: req.body.acceso,
                cochera: req.body.cochera,
                cantidad_baños: req.body.cant_baños,
                cantidad_habitaciones: req.body.cant_habitaciones,
                restricciones: req.body.restricciones
            })
        }
        else if(req.body.tipo_propiedad === "Casa"){
            
            tipo_propiedad = new casa({
                cantidad_habitaciones: req.body.cant_habitaciones,
                cantidad_pisos: req.body.cant_pisos,
                cochera: req.body.cochera,
                cantidad_baños: req.body.cant_baños,
                antiguedad: req.body.antiguedad
            })
            
        }
        else{
            tipo_propiedad = new Tipo_Propiedad({
                tipo: req.body.tipo_propiedad
            })
        }
        const newPropiedad = new propiedad({
            ubicacion: req.body.ubicacion,
            tipo: tipo_propiedad._id,
            estado_propiedad: req.body.estado_propiedad,
            descripcion: req.body.descripcion,
            entorno: req.body.entorno,
            imagenes: req.body.imagenes,
            precio: req.body.precio,
            superficie: req.body.superficie,
            latitud: resultado[0].latitude,
            longitud: resultado[0].longitude
        })
        if(req.body.dueño !== ""){
            newPropiedad.dueño = req.body.dueño
        }
        newPropiedad.estadoPropiedad()
        await tipo_propiedad.save()
        await newPropiedad.save()
        res.send({
          type: 'success',
          title: 'Gestion de propiedades',
          message: 'Propiedad creada'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de propiedades',
          message: 'Server error'
        })
    }
}

const updatePropiedad = async (req, res) => {
    try {
        const editPropiedad = await propiedad.findById(req.params.id)
        const tipo_propiedad = await Tipo_Propiedad.findById(editPropiedad.tipo)
        const geocoder = NodeGeocoder(options)
        const resultado = await geocoder.geocode({
          address: req.body.ubicacion + 'Rosario, Santa Fe',
          country: 'Argentina',
          zipCode: 'S2000',
          countryCode: 'AR',
          minConfidence: 0.6
        })
        if(resultado.length == 0){
            return res.send({
              type: 'danger',
              title: 'Gestion de propiedades',
              message: 'No existe la propiedad en Rosario'
            })
        }
        if(!resultado[0].streetNumber){
          return res.send({
              type: 'danger',
              title: 'Gestion de propiedades',
              message: 'No existe o especifique el número de calle'
            })
        }
        if(tipo_propiedad.tipo === "Departamento"){
            tipo_propiedad.cantidad_habitaciones = req.body.cant_habitaciones
            tipo_propiedad.piso = req.body.piso
            tipo_propiedad.acceso = req.body.acceso
            tipo_propiedad.cochera = req.body.cochera
            tipo_propiedad.cantidad_baños = req.body.cant_baños
            tipo_propiedad.restricciones = req.body.restricciones
        }
        else if(tipo_propiedad.tipo === "Casa"){
            tipo_propiedad.cantidad_habitaciones = req.body.cant_habitaciones
            tipo_propiedad.cantidad_pisos = req.body.cant_pisos
            tipo_propiedad.cochera = req.body.cochera
            tipo_propiedad.cantidad_baños = req.body.cant_baños
            tipo_propiedad.antiguedad = req.body.antiguedad
        }
        editPropiedad.estado_propiedad = req.body.estado_propiedad
        editPropiedad.descripcion = req.body.descripcion
        editPropiedad.entorno = req.body.entorno
        editPropiedad.imagenes = req.body.imagenes
        editPropiedad.precio = req.body.precio
        editPropiedad.superficie = req.body.superficie
        editPropiedad.ubicacion = req.body.ubicacion,
        editPropiedad.latitud = resultado[0].latitude,
        editPropiedad.longitud = resultado[0].longitude
        editPropiedad.estadoPropiedad()
        await tipo_propiedad.save()
        await editPropiedad.save()
        res.send({
          type: 'success',
          title: 'Gestion de propiedades',
          message: 'Propiedad actualizada'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
          type: 'danger',
          title: 'Gestion de propiedades',
          message: 'Server error'
        })
    }
}

const removePropiedad = async (req, res) => {
  try {
    const deletePropiedad = await propiedad.findById(req.params.id)
    if(deletePropiedad.servicios.length > 0) 
        return res.send({
          type: 'danger',
          title: 'Gestion de propiedades',
          message: 'No se puede eliminar la propiedad porque tiene un servicio activo'
        })

    await deletePropiedad.remove()
    res.send({
      type: 'success',
      title: 'Gestion de propiedades',
      message: 'Propiedad eliminada'
    })
  } catch (err) {
      console.error(err)
      res.status(500).send({
        type: 'danger',
        title: 'Gestion de propiedades',
        message: 'Server error'
      })
  }
}

const pipelineGenerator = () => {
    let pipelineBase = [
        {
          '$match': {}
        }, {
          '$lookup': {
            'from': 'tipo propiedads', 
            'localField': 'tipo', 
            'foreignField': '_id', 
            'as': 'tipoDatos'
          }
        }, {
           '$lookup': {
            'from': 'personas',
            'let': { 'dueñoId': '$dueño'},
            'pipeline': [{
              '$match': { 
                '$expr': { '$eq': ["$$dueñoId", "$_id"] }
              } 
            }, {
            '$project': { '_id': 1, 'nombre': 1, 'apellido': 1 }
            }
            ],
            'as': 'dueñoDatos'
            
          }
          },{
          '$unwind': {
            'path': '$tipoDatos'
            }
        },
        {
        '$unwind': {
            'path': '$dueñoDatos'
            }
        }
      ]
    return pipelineBase
}

const tipoFiltersAdd = (tipo, pipeline) => {
    
    let arrayFiltros = tipo.split("_")
    pipeline.push({
        '$unwind': {
          'path': '$servicios'
        }
      }, {
        '$match': {
          'estado': "Disponible",
          'servicios': arrayFiltros[0]
        }
      })
    if(arrayFiltros[1])
        pipeline.push({ '$match': { 'tipoDatos.tipo': arrayFiltros[1]}})
    
    if(arrayFiltros[2]){
        let numero = parseInt(arrayFiltros[2])
        if(numero > 3)
            pipeline.push({'$match': { 'tipoDatos.cantidad_habitaciones': { '$gte': numero}}})
        else
            pipeline.push({ '$match': { 'tipoDatos.cantidad_habitaciones': numero}})
    }
    return pipeline
}

const filtrosFiltersAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    if(filtrosJson.estado !== "")
        pipeline[0].$match.estado = filtrosJson.estado

    if(filtrosJson.ubicacion !== "")
        pipeline[0].$match.ubicacion = new RegExp(filtrosJson.ubicacion, "i")
    
    if(filtrosJson.tipo_propiedad !== "")
        pipeline.push({ '$match': { 'tipoDatos.tipo': filtrosJson.tipo_propiedad}})

    return pipeline
}

const pipelineForVisits = (pipeline) => {
    pipeline.push({
        '$lookup': {
          'from': 'servicios', 
          'let': {
            'propiedadId': '$_id'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$$propiedadId', '$propiedad'
                  ]
                }, 
                'tipo': 'venta', 
                'estado': 'Activo'
              }
            }, {
              '$project': {
                '_id': 1, 
                'agente': 1, 
                'tipo': 1, 
                'estado': 1
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
                'horarios': 1
              }
            }
          ], 
          'as': 'agenteDatos'
        }
      }, {
        '$unwind': {
          'path': '$agenteDatos'
        }
      }, {'$lookup': {
        'from': 'visitas',
        'let': { 'servicioId': '$servicioDatos._id'},
        'pipeline': [{
          '$match': { 
            '$expr': { '$eq': ["$$servicioId", "$servicio"] },
            'fecha': { '$gte': new Date(Date.now())}
          } 
        }, {
        '$project': { '_id': 1, 'horario': 1, 'fecha': 1}
        }
        ],
        'as': 'visitasHorarios'
    }})
    return pipeline
}



module.exports = {
    getPropiedades,
    getPropiedad,
    setPropiedad,
    updatePropiedad,
    removePropiedad,
    getPropiedadesDisponibles
}