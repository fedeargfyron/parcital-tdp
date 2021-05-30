const Venta = require('../modelos/Venta')

const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.find({
            
        })
        res.json(ventas)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "server error"})
    }
}

const setVenta = async (req, res) => {
    try {
        const venta = new Venta({
            //Datos venta
        })
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