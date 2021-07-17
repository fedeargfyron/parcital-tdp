const Usuario = require('../modelos/Usuario')

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({})
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
            contraseña: req.body.contraseña,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            grupos: req.body.grupos,
            estado: req.body.estado
        })
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
        usuario.nombre = req.body.nombre
        usuario.apellido = req.body.apellido
        usuario.email = req.body.email
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

module.exports = {
    getUsuario,
    getUsuarios,
    setUsuario,
    updateUsuario,
    removeUsuario,
}