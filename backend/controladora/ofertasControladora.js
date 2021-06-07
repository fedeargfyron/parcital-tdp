const Oferta = require('../modelos/Oferta')
const { servicioVenta } = require('../modelos/Servicio')
const { propiedad } = require('../modelos/Propiedad')
const Reserva = require('../modelos/Reserva')
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
            agente: req.user._id,
            estado: "Activo"
        })
        const ofertas = servicios.map(servicio => {
            servicio.ofertas.map(async (oferta) => {
                return await Oferta.findById(oferta._id)
            })
        })
        res.json(ofertas)
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setOferta = async (req, res) => {
    try {
        const prop = await propiedad.findById(req.body.propId)
        const servicio = await servicioVenta.findById(prop.servicio._id)
        const oferta = new Oferta({
            monto: req.body.monto,
            interesado: req.user._id,
            //Settear default pendiente
        })
        servicio.ofertas.push(oferta._id)
        await servicio.save()
        await oferta.save()
        
        res.json('Oferta creada')
    } catch {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const updateOferta = async (req, res) => {
    try {
        const oferta = await Oferta.findById(req.params.id)
        oferta.estado = req.body.estado
        if(req.body.estado === "Aceptada"){
            const prop = await propiedad.findyById(req.body.propId)
            const servicio = await servicioVenta.findById(prop.servicio._id)
            const reserva = new Reserva({
                cliente: oferta.interesado,
                monto: oferta.monto,
                estado: pendiente,
            })
            servicio.reservas.push(reserva._id)
            await servicio.save()
            await reserva.save()
            prop.estadoPropiedad()
            await prop.save()
            await oferta.save()
            res.json('Reserva creada')
        }
        else {
            await oferta.save()
            res.json('Oferta rechazada')
        }
        
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