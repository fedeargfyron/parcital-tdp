const { servicio, servicioVenta } = require('../modelos/Servicio')
const { propiedad } = require('../modelos/Propiedad')
const getServicios = async (req, res) => {
    try {
        const servicios = await servicio.find({
            agente: req.user._id
        })
        res.json(servicios)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getServicio = async (req, res) => {
    try {
        const servicio = await servicio.findById(req.params.id)
        res.json(servicio)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setServicioVenta = async (req, res) => {
    try {
        const prop = propiedad.findById(req.body.propId)
        
        const servicio = new servicioVenta({
            agente: req.user._id,
            visitas: [],
            ofertas: [],
            reservas: [],
        })
        servicio.calcularCoste(prop.precio)
        servicio.save()
        res.send('Servicio creado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const removeServicio = async (req, res) => {
    try {
        const prop = await propiedad.findById(req.body.propId)
        const servicio = await servicioVenta.findById(req.params.id)
        servicio.estado = "Anulado"
        await servicio.save()
        prop.estadoPropiedad()
        await prop.save()
        res.send('Servicio anulado')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getServicio,
    getServicios,
    setServicioVenta,
    removeServicio
}