const bcrypt = require('bcryptjs')
const { persona, dueño, agente } = require('../modelos/Persona')
const { servicio } = require('../modelos/Servicio')
const { propiedad } = require('../modelos/Propiedad')
const Usuario = require("../modelos/Usuario")

const getPersonas = async (req, res) => {
    try {
        const personas = await persona.find({})
        res.json(personas)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getDuenos = async (req, res) => {
    try {
        const dueños = await dueño.find({})
        console.log(dueños)
        res.json(dueños)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getPersona = async (req, res) => {
    try {
        const getPersona = await persona.findById(req.params.id)
        res.json(getPersona)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setPersona = async (req, res) => {
    try {
        let setPersona
        if(req.body.tipo === 'Dueño'){
            setPersona = new dueño({
                escritura: req.body.escritura
            })
        }
        else if (req.body.tipo === "Agente"){
            setPersona = new agente({
                titulo: req.body.titulo,
                horarios: req.body.horarios,
                cuil: req.body.cuil
            })
        }
        if(!setPersona){
            setPersona = new persona({
                tipo: req.body.tipo
            })
        }
        setPersona.nombre = req.body.nombre
        setPersona.apellido = req.body.apellido
        setPersona.telefono = req.body.telefono
        setPersona.domicilio = req.body.domicilio
        setPersona.email = req.body.email
        setPersona.usuario = req.body.usuario
        await setPersona.save()
        res.send('Persona creada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updatePersona = async (req, res) => {
    try {
        const updatePersona = await persona.findById(req.params.id)
        if(updatePersona.tipo === 'Dueño'){
            updatePersona.escritura = req.body.escritura
        }
        else if (updatePersona.tipo === 'Agente'){
            updatePersona.titulo = req.body.titulo
            updatePersona.horarios = req.body.horarios
            updatePersona.cuil = req.body.cuil
        }
        updatePersona.nombre = req.body.nombre
        updatePersona.apellido = req.body.apellido
        updatePersona.telefono = req.body.telefono
        updatePersona.domicilio = req.body.domicilio
        updatePersona.email = req.body.email
        updatePersona.usuario = req.body.usuario
        await updatePersona.save()
        res.send('Persona actualizada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removePersona = async (req, res) => {
    try {
        const removePersona = await persona.findById(req.params.id)
        if(removePersona.usuario.estado) return res.send('No se puede eliminar una persona con usuario activo')
        if(removePersona.tipo === "Agente"){
            const servicios = await servicio.find({
                agente: removePersona._id,
                estado: "activo"
            })
            if(servicios !== null) return res.send('No se puede eliminar esta persona porque está con servicios activos')
        }
        if(removePersona.tipo === "Dueño"){
            const propiedades = await propiedad.find({
                propietario: removePersona._id
            })
            propiedades.map(propiedad => {
                if(propiedad.servicio !== null) return res.send('No se puede eliminar esta persona porque tiene una propiedad con servicios activos')
            })
        }
        await removePersona.remove()
        res.send('Persona eliminada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const registrarPersona = async (req, res) => {
    try{
        
        let validacion = await validarNuevo(req.body.usuario, req.body.email, req.body.telefono, req.body.contraseña)
        if(validacion !== null){
            return res.json(validacion)
        } 
        
        const passwordEncriptada = await encriptarPassword(req.body.contraseña)
        const newUsuario = new Usuario({
            usuario: req.body.usuario,
            contraseña: passwordEncriptada,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email
        })
        await newUsuario.save()
        const newPersona = new persona({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            domicilio: req.body.domicilio,
            email: req.body.email,
            usuario: newUsuario._id
        })
        await newPersona.save()
        res.json('Usuario creado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const encriptarPassword = async (contraseña) => {
    return await bcrypt.hash(contraseña, 10)
}

const validarNuevo = async (usuario, email, telefono, contraseña) => {
    const buscarUsuario = await Usuario.findOne({
        usuario: usuario
    })
    const buscarEmail = await Usuario.findOne({
        email: email
    })
    if(buscarUsuario !== null) return 'usuario existente'
    if(buscarEmail !== null) return 'email existente'
    if(telefono < 1000000000) return ('Telefono no valido')
    if(contraseña.length < 8) return ('Contraseña demasiado corta')
    //Validar email
    return null
}

module.exports = {
    getPersonas,
    getDuenos,
    getPersona,
    setPersona,
    updatePersona,
    removePersona,
    registrarPersona
}