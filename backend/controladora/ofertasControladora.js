const Oferta = require('../modelos/Oferta')
const { servicioVenta } = require('../modelos/Servicio')
//Checkear bien esto
const getOfertas = async (req, res) => {
    try {
        const ofertas = await Oferta.find({
            interesado: req.user._id
        })
        res.json(ofertas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const getOfertasAgente = async (req, res) => {
    try {
        const servicios = await servicioVenta.find({
            agente: req.user._id
        })
        const ofertas = servicios.map(servicio => {
            return servicio.ofertas
        })
        res.json(ofertas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setOferta = async (req, res) => {
    try {
        const oferta = new Oferta({

        })
        await oferta.save()
        res.json('Oferta creada')
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateOferta = async (req, res) => {
    try {
        const oferta = Oferta.findById(req.params.id)
        await oferta.save()
        res.json('Oferta actualizada')
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getOfertas,
    getOfertasAgente,
    setOferta,
    updateOferta
}