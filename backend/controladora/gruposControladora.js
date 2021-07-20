const Grupo = require('../modelos/Grupo')
const Usuario = require('../modelos/Usuario')

const getGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.find({})
        res.json(grupos)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getGrupo = async (req, res) => {
    try{
        const grupo = await Grupo.findById(req.params.id)
        res.json(grupo)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setGrupo = async (req, res) => {
    try{
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
        res.send('Grupo creado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateGrupo = async (req, res) => {
    try{
        const grupo = await Grupo.findById(req.params.id)
        //Guardar datos nuevos y checkeos
        await grupo.save()
        res.send('Grupo actualizado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const deleteGrupo = async (req, res) => {
    try {
        const grupo = await Grupo.findById(req.params.id)
        await grupo.remove()
        res.send('Grupo eliminado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getGrupos,
    getGrupo,
    setGrupo,
    updateGrupo,
    deleteGrupo
}