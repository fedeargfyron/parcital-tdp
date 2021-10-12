const bcrypt = require('bcryptjs')
const { persona, dueño, agente } = require('../modelos/Persona')
const { servicio } = require('../modelos/Servicio')
const { propiedad } = require('../modelos/Propiedad')
const Usuario = require("../modelos/Usuario")
const MongoClientCreator = require('./Common/client')
const mongoose = require('mongoose')

const getPersonas = async (req, res) => {
    try {
        let personas = []
        let pipeline = pipelineGenerator()
        if(req.query.filtros)
            pipeline = filtrosAdd(req.query.filtros, pipeline)
        const aggCursor = await MongoClientCreator('personas', pipeline)
        await aggCursor.forEach(persona => {
            personas.push(persona)
        })
        res.json(personas)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}
const pipelineGenerator = () => {
    let pipelineBase = [
        {
          '$match': {}
        }, {
            '$lookup': {
              'from': 'usuarios', 
              'let': {
                'usuarioId': '$usuario'
              }, 
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$eq': [
                        '$$usuarioId', '$_id'
                      ]
                    }
                  }
                }, {
                  '$project': {
                    '_id': 1, 
                    'usuario': 1
                  }
                }
              ], 
              'as': 'usuarioDatos'
            }
          }, {
            '$unwind': {
              'path': '$usuarioDatos',
              'preserveNullAndEmptyArrays': true
            }
          }
      ]
    return pipelineBase
}

const filtrosAdd = (filtros, pipeline) => {
    let filtrosJson = JSON.parse(filtros)
    let nombreApellido = filtrosJson.nombreApellido.split(" ")
    if(nombreApellido[0] && nombreApellido[0] != "")
        pipeline[0].$match.nombre = new RegExp(nombreApellido[0], "i")
    if(nombreApellido[1] && nombreApellido[1] != "")
        pipeline[0].$match.apellido = new RegExp(nombreApellido[1], "i")
    if(filtrosJson.email !== "")
    pipeline[0].$match.email = new RegExp(filtrosJson.email, "i")
    return pipeline
}

const getDuenos = async (req, res) => {
    try {
        const dueños = await dueño.find({})
        res.json(dueños)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de personas',
            message: 'Server error'
        })
    }
}

const getPersona = async (req, res) => {
    try {
        let persona
        let pipeline = pipelineGenerator()
        pipeline[0].$match._id = mongoose.Types.ObjectId(req.params.id)
        const aggCursor = await MongoClientCreator('personas', pipeline)
        await aggCursor.forEach(personaObtenida => {
            persona = personaObtenida
        })
        res.json(persona)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de personas',
            message: 'Server error'
        })
    }
}

const setPersona = async (req, res) => {
    try {
        let personaExistente = await persona.findOne({
            telefono: req.body.telefono
        })
        if(personaExistente)
            return res.send({
                type: 'danger',
                title: 'Gestion de personas',
                message: 'Telefono existente'
            })

        let setPersona
        if(req.body.tipoPersona === 'Dueño'){
            personaExistente = await persona.findOne({
                cuil: req.body.cuil
            })
            if(personaExistente)
                return res.send({
                    type: 'danger',
                    title: 'Gestion de personas',
                    message: 'CUIL existente'
                })

            setPersona = new dueño({
                escritura: req.body.escritura
            })
        }
        else if (req.body.tipoPersona === "Agente"){
            setPersona = new agente({
                titulo: req.body.titulo,
                horarios: req.body.horarios,
                cuil: req.body.cuil
            })
        }
        else{
            setPersona = new persona({
                tipo: req.body.tipoPersona
            })
        }
        setPersona.nombre = req.body.nombre
        setPersona.apellido = req.body.apellido
        setPersona.telefono = req.body.telefono
        setPersona.domicilio = req.body.domicilio
        setPersona.email = req.body.email
        if(req.body.usuario !== '') setPersona.usuario = req.body.usuario
        await setPersona.save()
        res.send({
            type: 'success',
            title: 'Gestion de personas',
            message: 'Persona creada!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de personas',
            message: 'Server error'
        })
    }
}

const updatePersona = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id)
        let personaExistente = await persona.find({
            $and: [
                {telefono: req.body.telefono},
                {_id: { $ne: id } }
            ]
        })
        if(personaExistente.length > 0)
            return res.send({
                type: 'danger',
                title: 'Gestion de personas',
                message: 'Telefono existente'
            })

        const updatePersona = await persona.findById(req.params.id)
        if (updatePersona.tipo === 'Agente'){
            personaExistente = await persona.find({
                $and: [
                    {cuil: req.body.cuil},
                    {_id: { $ne: id } }
                ]
            })
            if(personaExistente.length > 0)
                return res.send({
                    type: 'danger',
                    title: 'Gestion de personas',
                    message: 'CUIL existente'
                })
            updatePersona.titulo = req.body.titulo
            updatePersona.horarios = req.body.horarios
            updatePersona.cuil = req.body.cuil
        }
        if(updatePersona.tipo === 'Dueño'){
            updatePersona.escritura = req.body.escritura
        }
        
        updatePersona.nombre = req.body.nombre
        updatePersona.apellido = req.body.apellido
        updatePersona.telefono = req.body.telefono
        updatePersona.domicilio = req.body.domicilio
        updatePersona.email = req.body.email
        if(updatePersona.usuario != "")
            updatePersona.usuario = req.body.usuario
        await updatePersona.save()
        res.send({
            type: 'success',
            title: 'Gestion de personas',
            message: 'Persona actualizada!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de personas',
            message: 'Server error'
        })
    }
}

const removePersona = async (req, res) => {
    try {
        const removePersona = await persona.findById(req.params.id)
        if(removePersona.usuario)
            return res.send({
                type: 'danger',
                title: 'Gestion de personas',
                message: 'No se puede eliminar una persona con usuario activo'
            })
        if(removePersona.tipo === "Agente"){
            const servicios = await servicio.find({
                agente: removePersona._id,
                estado: "activo"
            })
            if(servicios !== null) 
                return res.send({
                    type: 'danger',
                    title: 'Gestion de personas',
                    message: 'No se puede eliminar esta persona porque está con servicios activos'
                })
        }
        if(removePersona.tipo === "Dueño"){
            const propiedades = await propiedad.find({
                propietario: removePersona._id
            })
            propiedades.map(propiedad => {
                if(propiedad.servicios.length > 0) 
                return res.send({
                    type: 'danger',
                    title: 'Gestion de personas',
                    message: 'No se puede eliminar esta persona porque tiene una propiedad con servicios activos'
                })
            })
        }
        await removePersona.remove()
        res.send({
            type: 'success',
            title: 'Gestion de personas',
            message: 'Persona eliminada'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de personas',
            message: 'Server error'
        })
    }
}

const registrarPersona = async (req, res) => {
    try{
        
        let validacion = await validarNuevo(req.body.usuario, req.body.email, req.body.telefono, req.body.contraseña)
        if(validacion !== null){
            return res.send({
                type: 'danger',
                title: 'Registro de usuario',
                message: validacion
            })
        } 
        
        const passwordEncriptada = await encriptarPassword(req.body.contraseña)
        const newUsuario = new Usuario({
            usuario: req.body.usuario,
            contraseña: passwordEncriptada,
            estado: true
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
        res.send({
            type: 'success',
            title: 'Registro de usuario',
            message: 'Usuario creado'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Registro de usuario',
            message: 'Server error'
        })
    }
}

const encriptarPassword = async (contraseña) => {
    return await bcrypt.hash(contraseña, 10)
}

const validarNuevo = async (usuario, email, telefono, contraseña) => {
    const buscarUsuario = await Usuario.findOne({
        usuario: usuario
    })
    const buscarEmail = await persona.findOne({
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