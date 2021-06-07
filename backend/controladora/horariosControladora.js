const Horario = require('../modelos/Horario')

const getHorarios = async (req, res) => {
    try {
        const horarios = await Horario.find({})
        res.json(horarios)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getHorario = async (req, res) => {
    try {
        const horario = await Horario.findById(req.params.id)
        res.json(horario)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setHorario = async (req, res) => {
    try {
        const horario = new Horario({
            hora: req.body.hora
        })
        await horario.save()
        res.send('Horario creado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateHorario = async (req, res) => {
    try {
        const horario = await Horario.findById(req.params.id)
        horario.hora = req.body.hora
        await horario.save()
        res.send('Horario actualizado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removeHorario = async (req, res) => {
    try {
        const horario = await Horario.findById(req.params.id)
        await horario.remove()
        res.send('Horario eliminado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getHorarios,
    getHorario,
    setHorario,
    updateHorario,
    removeHorario
}