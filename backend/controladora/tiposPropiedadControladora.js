const { Tipo_Propiedad } = require('../modelos/Tipo_Propiedad')

const getTiposPropiedad = async (req, res) => {
    try {
        let tiposPropiedad = await Tipo_Propiedad.find({})
        res.json(tiposPropiedad)
    } catch (err) {
        console.error(err)
        res.status(500).send({
            type: 'danger',
            title: 'Gestion de servicios',
            message: 'Server error'
        })
    }
}

module.exports = {
    getTiposPropiedad
}