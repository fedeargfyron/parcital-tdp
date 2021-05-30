const { servicioVenta } = require('../modelos/Servicio')

const getServicios = async (req, res) => {
    try {
        const servicios = await servicioVenta.find({})
        res.json(servicios)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getServicio = async (req, res) => {
    try {
        const servicio = await servicioVenta.findById(req.params.id)
        res.json(servicios)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setServicio = async (req, res) => {
    try {
        const servicio = new servicioVenta({
            //Datos
        })
        servicio.save()
        res.send('Servicio creado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removeServicio = async (req, res) => {
    try {
        const servicio = await servicioVenta.findById(req.params.id)
        servicio.remove()
        res.send('Servicio eliminado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getServicio,
    getServicios,
    setServicio,
    removeServicio
}