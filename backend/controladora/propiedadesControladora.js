require('dotenv').config()
const { propiedad } = require('../modelos/Propiedad')
const { servicio } = require('../modelos/Servicio')
const { MongoClient } = require('mongodb')
const { Tipo_Propiedad, casa, departamento } = require('../modelos/Tipo_Propiedad')
const getPropiedades = async (req, res) => {
    try {
        let pipeline = pipelineGenerator()
        if(req.query.tipo)
            pipeline = tipoFiltersAdd(req.query.tipo, pipeline)
        else if (req.query.filtros)
            pipeline = tipoFiltersAdd(req.query.filtros, pipeline)
        
        const uri = process.env.MONGO_URL
        const client = new MongoClient(uri, { useUnifiedTopology: true })
        await client.connect()

        const aggCursor = client.db('Inmobiliaria').collection('propiedads').aggregate(pipeline)
        await aggCursor.forEach(propiedad => {
            console.log(propiedad)
        })
        res.json("propiedades obtenidas con aggCursor")
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const tipoFiltersAdd = (tipo, pipeline) => {
    
    let arrayFiltros = tipo.split("_")
    pipeline.push({
        '$unwind': {
          'path': '$servicios'
        }
      }, {
        '$match': {
          'servicios': arrayFiltros[0]
        }
      })
    if(arrayFiltros[1])
        pipeline.push({ '$match': { 'tipoDatos.tipo': arrayFiltros[1]}})

    if(arrayFiltros[2])
        pipeline.push({ '$match': { 'tipoDatos.cantidad_habitaciones': arrayFiltros[2]}})
    
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
          '$unwind': {
            'path': '$tipoDatos'
          }
        }
      ]
    return pipelineBase
}

const getPropiedad = async (req, res) => {
    try {
        const getPropiedad = await propiedad.findById(req.params.id)
        res.json(getPropiedad)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setPropiedad = async (req, res) => {
    try {
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
            superficie: req.body.superficie
        })
        if(req.body.dueño !== ""){
            newPropiedad.dueño = req.body.dueño
        }
        await tipo_propiedad.save()
        await newPropiedad.save()
        res.send('Propiedad creada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updatePropiedad = async (req, res) => {
    try {
        const editPropiedad = await propiedad.findById(req.params.id)
        const tipo_propiedad = await Tipo_Propiedad.findById(edit.Propiedad.tipo_propiedad)
        if(tipo_propiedad.tipo === "Departamento"){
            tipo_propiedad.cant_habitaciones = req.body.cant_habitaciones
            tipo_propiedad.piso = req.body.piso
            tipo_propiedad.acceso = req.body.acceso
            tipo_propiedad.cochera = req.body.cochera
            tipo_propiedad.cant_baños = req.body.cant_baños
            tipo_propiedad.restricciones = req.body.restricciones
        }
        else if(tipo_propiedad.tipo === "Casa"){
            tipo_propiedad.cant_habitaciones = req.body.cant_habitaciones
            tipo_propiedad.cant_pisos = req.body.cant_pisos
            tipo_propiedad.cochera = req.body.cochera
            tipo_propiedad.cant_baños = req.body.cant_baños
            tipo_propiedad.antiguedad = req.body.antiguedad
        }
        editPropiedad.estado_propiedad = req.body.estado_propiedad
        editPropiedad.descripcion = req.body.descripcion
        editPropiedad.entorno = req.body.entorno
        editPropiedad.imagenes = req.body.imagenes
        editPropiedad.precio = req.body.precio
        editPropiedad.superficie = req.body.superficie
        await editPropiedad.save()
        res.send('Propiedad actualizada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removePropiedad = async (req, res) => {
    const deletePropiedad = await propiedad.findById(req.params.id)
    const serviciosActivos = deletePropiedad.servicios.map(async (item) => {
        await servicio.find({
            _id: item,
            estado: "Activo"
        })
    })
    if(serviciosActivos !== null) res.send('No se puede eliminar la propiedad porque tiene un servicio activo')
    else {  
        await deletePropiedad.remove()
        res.send('Propiedad eliminada')
    }
}

module.exports = {
    getPropiedades,
    getPropiedad,
    setPropiedad,
    updatePropiedad,
    removePropiedad
}