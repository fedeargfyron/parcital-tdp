const Venta = require('../modelos/Venta')
const { propiedad } = require('../modelos/Propiedad')
const getVentas = async (req, res) => {
    try {
        const ventas
        const compras
        if(req.user.tipo === "agente"){  
            ventas = await Venta.find({
                agente: req.user._id
            })
        }
        compras = await Venta.find({
            cliente: req.user._id
        })
        res.json(ventas, compras)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setVenta = async (req, res) => {
    try {
        const prop = await propiedad.findById(req.body.propId)
        const venta = new Venta({
            propiedad: req.body.propiedad,
            agente: req.body.agente,
            cliente: req.body.cliente,
            total: req.body.total
        })
        prop.estado = "Vendida"
        await prop.save()
        await venta.save()
        res.send('Venta creada')
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

module.exports = {
    getVentas,
    setVenta
}