const Horario = require('../modelos/Horario')
const mongoose = require('mongoose')
const getHorarios = async (req, res) => {
    try {
        const horarios = await Horario.find({})
        res.json(horarios)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de horarios',
            message: 'Server error'
        })
    }
}

const getHorario = async (req, res) => {
    try {
        const horario = await Horario.findById(req.params.id)
        res.json(horario)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de horarios',
            message: 'Server error'
        })
    }
}

const setHorario = async (req, res) => {
    try {
        const horarioExistente = await Horario.findOne({
            hora: req.body.hora
        })
        if(horarioExistente)
            return res.send({
                type: 'danger',
                title: 'Gestion de horarios',
                message: 'No se puede crear el horario porque ya existe uno con esta hora'
            })
        const horario = new Horario({
            hora: req.body.hora
        })
        await horario.save()
        res.send({
            type: 'success',
            title: 'Gestion de horarios',
            message: 'Horario creado!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de horarios',
            message: 'Server error'
        })
    }
}

const updateHorario = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id)
        const horarioExistente = await Horario.findOne({
            $and: [
                {hora: req.body.hora},
                {_id: { $ne: id } }
            ]
        })
        if(horarioExistente)
            return res.send({
                type: 'danger',
                title: 'Gestion de horarios',
                message: 'No se puede actualizar el horario porque ya existe uno con esta hora'
            })
        
        const horario = await Horario.findById(req.params.id)
        horario.hora = req.body.hora
        await horario.save()
        res.send({
            type: 'success',
            title: 'Gestion de horarios',
            message: 'Horario actualizado!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de horarios',
            message: 'Server error'
        })
    }
}

const removeHorario = async (req, res) => {
    try {
        const horario = await Horario.findById(req.params.id)
        await horario.remove()
        res.send({
            type: 'success',
            title: 'Gestion de horarios',
            message: 'Horario eliminado'
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de horarios',
            message: 'Server error'
        })
    }
}

module.exports = {
    getHorarios,
    getHorario,
    setHorario,
    updateHorario,
    removeHorario
}