const Grupo = require('../modelos/Grupo')
const Usuario = require('../modelos/Usuario')
const MongoClientCreator = require('./Common/client')
const mongoose = require('mongoose')

const getGrupos = async (req, res) => {
    try {
        let grupos = []
        let pipeline = pipelineGenerator()
        if (req.query.filtros)
            pipeline = filtersAdd(req.query.filtros, pipeline)
        const aggCursor = await MongoClientCreator('grupos', pipeline)
        await aggCursor.forEach(grupo => {
            grupos.push(grupo)
        })
        res.json(grupos)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de grupos',
            message: 'Server error'
        })
    }
}

const pipelineGenerator = () => {
    let pipelineBase = [
        {
          '$match': {}
        },
        {
          '$project': { '_id': 1, 'nombre': 1, 'estado': 1 }
        }
      ]
    return pipelineBase
}

const filtersAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    if(filtrosJson.estado !== ""){
        if(filtrosJson.estado === "activo")
            pipeline[0].$match.estado = true
        else 
            pipeline[0].$match.estado = false
    }
        
    if(filtrosJson.nombre !== "")
        pipeline[0].$match.nombre = new RegExp(filtrosJson.nombre, "i")
    return pipeline
}

const getGrupo = async (req, res) => {
    try{
        const id = mongoose.Types.ObjectId(req.params.id);
        let pipeline = [
            {
            '$match': {
                '_id': id
            }
          },
            {
            '$lookup': {
              'from': 'usuarios', 
              'localField': '_id', 
              'foreignField': 'grupos', 
              'as': 'usuarios'
            }
          }, {
            '$project': {
              'nombre': 1, 
              'usuarios': { '_id': 1 }, 
              'estado': 1,
              'descripcion': 1,
              'acciones': 1
            }
          }]
          const aggCursor = await MongoClientCreator('grupos', pipeline)
          await aggCursor.forEach(grupo => {
                res.json(grupo)
          })
        
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de grupos',
            message: 'Server error'
        })
    }
}

const setGrupo = async (req, res) => {
    try{
        const grupoExistente = await Grupo.findOne({
            nombre: req.body.nombre
        })
        if(grupoExistente)
            return res.send({
                type: 'danger',
                title: 'Gestion de grupos',
                message: 'No se puede crear el grupo porque ya existe uno con este nombre'
            })

        const grupo = new Grupo({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
            acciones: req.body.acciones
        })
        const usuariosId = req.body.usuarios
        if(usuariosId.length > 0){
            usuariosId.forEach(async (usuario) => {
                usuarioActualizado = await Usuario.findById(usuario)
                usuarioActualizado.grupos.push(grupo._id)
                usuarioActualizado.save()
            })
        }
        await grupo.save()
        res.send({
            type: 'success',
            title: 'Gestion de grupos',
            message: 'Grupo creado!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de grupos',
            message: 'Server error'
        })
    }
}

const updateGrupo = async (req, res) => {
    try{
        const id = mongoose.Types.ObjectId(req.params.id)
        const grupoExistente = await Grupo.find({
            $and: [
                {nombre: req.body.nombre},
                {_id: { $ne: id } }
            ]
        })
        if(grupoExistente.length > 0)
            return res.send({
                type: 'danger',
                title: 'Gestion de grupos',
                message: 'No se puede crear el grupo porque ya existe uno con este nombre'
            })
        const grupo = await Grupo.findById(req.params.id)
        grupo.nombre = req.body.nombre
        grupo.descripcion = req.body.descripcion
        grupo.acciones = req.body.acciones
        const usuariosViejos = req.body.grupoViejo.usuarios.map(usuario => {return usuario['_id']})
        let differenceAdd = req.body.usuarios.filter(x => !usuariosViejos.includes(x))
        let differenceRemove = usuariosViejos.filter(x => !req.body.usuarios.includes(x))
        differenceAdd.forEach(async usuario => {
            const usuarioToUpdate = await Usuario.findById(usuario)
            usuarioToUpdate.grupos.push(req.params.id)
            await usuarioToUpdate.save()
        })
        differenceRemove.forEach(async usuario => {
            const usuarioToUpdate = await Usuario.findById(usuario)
            const index = usuarioToUpdate.grupos.indexOf(req.params.id)
            usuarioToUpdate.grupos.splice(index, 1)
            await usuarioToUpdate.save()
        })
        await grupo.save()
        res.send({
            type: 'success',
            title: 'Gestion de grupos',
            message: 'Grupo actualizado!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de grupos',
            message: 'Server error'
        })
    }
}

const deleteGrupo = async (req, res) => {
    try {
        if(!req.user)
            return res.send({
                type: 'danger',
                title: 'Gestion de grupos',
                message: 'Inicie sesión'
            })
        const id = mongoose.Types.ObjectId(req.params.id);
        const usuario = await Usuario.findOne({
            grupos: id
        })
        if(usuario)
            return res.send({
                type: 'danger',
                title: 'Gestion de grupos',
                message: 'No se puede eliminar el grupo porque tiene usuarios existentes'
            })
            

        const grupo = await Grupo.findById(req.params.id)
        await grupo.remove()
        res.send({
            type: 'success',
            title: 'Gestion de grupos',
            message: 'Se eliminó el grupo con exito!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de grupos',
            message: 'Server error'
        })
    }
}

module.exports = {
    getGrupos,
    getGrupo,
    setGrupo,
    updateGrupo,
    deleteGrupo
}