const Accion = require("../modelos/Acciones")
const Formulario = require("../modelos/Formulario")
const { Modulo, SubModulo } = require("../modelos/Modulo")
const Node = require("./Common/Node")

const getAccionesModulo = async (req, res) => {
    try{
        const modulos = await Modulo.find({
            tipo: null
        }, "_id nombre")
        let modulosNodes = modulos.map(modulo => new Node(modulo.nombre, modulo._id, "Modulo"))
        await Promise.all(modulosNodes.map(async (modulo) => { return organizadorModulos(modulo)}))
        res.json(modulosNodes)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de acciones',
            message: 'Server error'
          })
    }
}
const organizadorModulos = async (modulo) => {
    let subModulos = await SubModulo.find({
        modulo: modulo._id
    }, "_id nombre")
    modulo.add(subModulos.map(subModulo => new Node(subModulo.nombre, subModulo._id, "SubModulo")))
    await Promise.all(modulo.children.map(async (submodulo) => organizadorSubModulos(submodulo)))
}
const organizadorSubModulos = async (submodulo) => {
    let formularios = await Formulario.find({
        modulo: submodulo._id
    }, " _id nombre")
    submodulo.add(formularios.map(formulario => new Node(formulario.nombre, formulario._id, "Formulario")))
    await Promise.all(submodulo.children.map(async (formulario) => organizadorFormularios(formulario)))
}
const organizadorFormularios = async (formulario) => {
    let acciones = await Accion.find({
        formulario: formulario._id
    }, "_id nombre")
    formulario.add(acciones.map(accion => new Node(accion.nombre, accion._id, "Accion")))
}
module.exports = {
    getAccionesModulo
}