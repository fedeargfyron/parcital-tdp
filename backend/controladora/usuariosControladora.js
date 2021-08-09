require('dotenv').config()
const Usuario = require('../modelos/Usuario')
const bcrypt = require('bcryptjs')
const { MongoClient } = require('mongodb')
const MongoClientCreator = require('./client')
const { persona, dueño, agente } = require('../modelos/Persona')

const getUsuarios = async (req, res) => {
    try {
        let usuarios = []
        let pipeline = pipelineGenerator()
        if(req.query.filtros)
            pipeline = filtersAdd(req.query.filtros, pipeline)
        const aggCursor = await MongoClientCreator('usuarios', pipeline)
        await aggCursor.forEach(usuario => {
            usuarios.push(usuario)
        })
        res.json(usuarios)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const pipelineGenerator = () => {
    const pipeline = [
        {
            '$match': { }
        }, { "$lookup": {
            'from': 'personas',
            'let': { 'usuarioId': '$_id'},
            'pipeline': [{
              '$match': { 
                '$expr': { '$eq': ["$$usuarioId", "$usuario"] }
              } 
            }, {
            '$project': { '_id': 1, 'nombre': 1, 'apellido': 1, 'email': 1 }
            }
            ],
            'as': 'personaDatos'
          }
    }, {
        '$unwind': {
          'path': '$personaDatos',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$project': {
          'usuario': 1, 
          'estado': 1, 
          'personaDatos': 1
        }
      }
    ]
    return pipeline
}

const filtersAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    if(filtrosJson.estado !== ""){
        if(filtrosJson.estado === "activo"){
            pipeline[0].$match.estado = true
        }
        else {
            pipeline[0].$match.estado = false
        }
    }
        
    if(filtrosJson.nombre !== "")
        pipeline[0].$match.nombre = new RegExp(filtrosJson.nombre, "i")
    return pipeline
}

const getUsuariosDisponibles = async (req, res) => {
    try {
        const uri = process.env.MONGO_URL
        const client = new MongoClient(uri, { useUnifiedTopology: true })
        await client.connect()
        const pipeline = [
            { "$lookup": {
            "from": 'personas',
            "localField": '_id',
            "foreignField": 'usuario',
            "as": 'persona'
            }
        }, { "$match": {
            "persona":  { "$size": 0 } 
        }
    }
    ]
        const aggCursor = client.db('Inmobiliaria').collection('usuarios').aggregate(pipeline)
        let usuarios = []
        await aggCursor.forEach(usuario => {
            usuarios.push({
                id: usuario._id, 
                usuario: usuario.usuario
            })
        })
        res.json(usuarios)
    } catch (err) {
        
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id, "_id grupos estado usuario")
        res.json(usuario)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setUsuario = async (req, res) => {
    try {
        const usuario = new Usuario({
            usuario: req.body.usuario,
            grupos: req.body.grupos,
            estado: req.body.estado
        })
        let contraseñaEnviar = generarContraseña()
        usuario.contraseña = await encriptarPassword (contraseñaEnviar)
        //enviarMail
        await usuario.save()
        res.json('Usuario creado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        usuario.usuario = req.body.usuario
        usuario.grupos = req.body.grupos
        usuario.estado = req.body.estado
        await usuario.save()
        res.json('Usuario actualizado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removeUsuario = async (req, res) => {
    try {
        const personaExistente = await persona.findOne({
            usuario: req.params.id
        })
        if(personaExistente)
            res.send('No se puede eliminar el usuario porque pertenece a una persona')
        else{
            let usuario = await Usuario.findById(req.params.id)
            await usuario.remove()
            res.send('Usuario eliminado')
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const generarContraseña = () => {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const encriptarPassword = async (contraseña) => {
    return await bcrypt.hash(contraseña, 10)
}

module.exports = {
    getUsuario,
    getUsuarios,
    setUsuario,
    updateUsuario,
    removeUsuario,
    getUsuariosDisponibles
}