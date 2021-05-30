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
            //Data usuario
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
        //actualizar usuario
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
    removeUsuario
}