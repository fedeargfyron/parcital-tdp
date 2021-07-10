const Accion = require("../modelos/Acciones")
const Formulario = require("../modelos/Formulario")
const { Modulo, SubModulo } = require("../modelos/Modulo")
const getAcciones = (req, res) => {
    res.json("acciones")
}

const getAccionesModulo = async (req, res) => {
    try{
        const modulos = await Modulo.find({
            tipo: null
        }, "_id nombre")
        const modulosOrganizados = await Promise.all(modulos.map(async (modulo) => { return organizadorModulos(modulo)}))
        res.json(modulosOrganizados)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const organizadorModulos = async (modulo) => {
    let dtoModulo = {
        id: modulo._id,
        nombre: modulo.nombre,
        subModulos: []
    }
    let dtoSubModulos = await SubModulo.find({
        modulo: modulo._id
    }, "_id nombre")
    dtoModulo.subModulos = await Promise.all(dtoSubModulos.map(async (submodulo) => {return organizadorSubModulos(submodulo)}))
    return dtoModulo
}

const organizadorSubModulos = async (submodulo) => {
    let dtoSubModulo = { 
        id: submodulo._id,
        nombre: submodulo.nombre,
        formularios: []
    }
    let dtoFormularios = await Formulario.find({
        modulo: submodulo.id
    }, " _id nombre")
    dtoSubModulo.formularios = await Promise.all(dtoFormularios.map(async (formulario) => { return organizadorFormularios(formulario)}))
    return dtoSubModulo
}

const organizadorFormularios = async (formulario) => {
    let dtoFormulario = {
        id: formulario._id,
        nombre: formulario.nombre,
        acciones: []
    }
    dtoFormulario.acciones = await Accion.find({
        formulario: formulario._id
    }, "_id nombre")
    return dtoFormulario
}

module.exports = {
    getAcciones,
    getAccionesModulo
}