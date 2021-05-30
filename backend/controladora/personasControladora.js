const { persona, dueño, agente } = require('../modelos/Persona')

const getPersonas = async (req, res) => {
    try {
        const personas = await persona.find({})
        res.json(personas)
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
        const setPersona = new persona({

        })
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
        await updatePersona.save()
        res.send('Persona creada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removePersona = async (req, res) => {
    try {
        const removePersona = await persona.findById(req.params.id)
        await removePersona.remove()
        res.send('Persona eliminada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getPersonas,
    getPersona,
    setPersona,
    updatePersona,
    removePersona
}