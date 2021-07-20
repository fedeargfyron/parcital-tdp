require('dotenv').config()
const { propiedad } = require('../modelos/Propiedad')
const { servicio } = require('../modelos/Servicio')
const { MongoClient } = require('mongodb')
const { Tipo_Propiedad, casa, departamento } = require('../modelos/Tipo_Propiedad')
const getPropiedades = async (req, res) => {
    try {
        const filtros = req.query.tipo
        buscar = {
            estado: filtros[0],
            
        }
        /* $Search
        index: 'custom',Index que creo yo
        text: { 
        query: 'Agregar', query es texto a buscar 
        path: 'nombre' Path es donde lo voy a encontrar 
        }
        { $Lookup
        from: 'Tipo_propiedads',
        localField: 'nombre', Objeto_id 
        foreignField: '_id', Id de objeto
        as: 'Objeto_id'
        }*/
        const uri = process.env.MONGO_URL
        const client = new MongoClient(uri, { useUnifiedTopology: true })
        await client.connect()
        const pipeline = [{
            "$search": {"index": 'custom',
            "text": { 
              "query": 'Agregar',
              "path": 'nombre'
            }
          }
        }]
        const aggCursor = client.db('Inmobiliaria').collection('accions').aggregate(pipeline)
        await aggCursor.forEach(accion => {
            //console.log(accion._id)
        })
        res.json("propiedades obtenidas con aggCursor")
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
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