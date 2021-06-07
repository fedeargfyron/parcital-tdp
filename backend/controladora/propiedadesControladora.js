const { propiedad } = require('../modelos/Propiedad')
const { servicio } = require('../modelos/Servicio')
const { Tipo_Propiedad, casa, departamento } = require('../modelos/Tipo_Propiedad')
const getPropiedades = async (req, res) => {
    try {
        const propiedades = await propiedad.find({})
        res.json(propiedades)
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
        if(req.body.tipo === "Departamento"){
            tipo_propiedad = new departamento({
                cant_habitaciones: req.body.cant_habitaciones,
                piso: req.body.piso,
                acceso: req.body.acceso,
                cochera: req.body.cochera,
                cant_baños: req.body.cant_baños,
                restricciones: req.body.restricciones
            })
        }
        else if(req.body.tipo === "Casa"){
            tipo_propiedad = new casa({
                cant_habitaciones: req.body.cant_habitaciones,
                cant_pisos: req.body.cant_pisos,
                cochera: req.body.cochera,
                cant_baños: req.body.cant_baños,
                antiguedad: req.body.antiguedad
            })
        }
        else{
            tipo_propiedad = new Tipo_Propiedad({
                tipo: req.body.tipo
            })
        }
        const newPropiedad = new propiedad({
            ubicacion: req.body.ubicacion,
            dueño: req.body.dueño,
            tipo: tipo_propiedad._id,
            estado_propiedad: req.body.estado_propiedad,
            descripcion: req.body.descripcion,
            entorno: req.body.entorno,
            imagenes: req.body.imagenes,
            precio: req.body.precio,
            superficie: req.body.superficie
        })

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