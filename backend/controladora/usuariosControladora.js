require('dotenv').config()
const Usuario = require('../modelos/Usuario')
const bcrypt = require('bcryptjs')
const { MongoClient } = require('mongodb')
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '_id usuario')
        res.json(usuarios)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
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
            "persona":  { "$size": 1 } 
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
        const usuario = await Usuario.findById(req.params.id)
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
        usuario.contraseña = req.body.contraseña
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
        const usuario = await Usuario.findById(req.params.id)
        await usuario.remove()
        res.json('Usuario eliminado')
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