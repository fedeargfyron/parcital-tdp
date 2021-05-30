const { propiedad, casa, departamento, propiedad } = require('../modelos/Propiedad')

const getPropiedades = async (req, res) => {
    try {
        const propiedades = await propiedad.find({})
        res.json(propiedades)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getPropiedad = async (req, res) => {
    try {
        const getPropiedad = await propiedad.findById(req.params.id)
        res.json(getPropiedad)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setPropiedad = async (req, res) => {
    try {
        const newPropiedad = new propiedad({

        })
        await newPropiedad.save()
        res.send('Propiedad creada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updatePropiedad = async (req, res) => {
    try {
        const editPropiedad = await propiedad.findById(req.params.id)
        await editPropiedad.save()
        res.send('Propiedad actualizada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removePropiedad = async (req, res) => {
    const deletePropiedad = await propiedad.findById(req.params.id)
    await deletePropiedad.remove()

}

module.exports = {
    getPropiedades,
    getPropiedad,
    setPropiedad,
    updatePropiedad,
    removePropiedad
}