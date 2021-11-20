const { Tipo_Propiedad } = require('../modelos/Tipo_Propiedad')
const { propiedad } = require('../modelos/Propiedad')

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

const removeTipoPropiedad = async (req, res) => {
    try {
        let tipoPropiedadUsed = await propiedad.findOne({
            tipo: req.params.id
        })

        if(tipoPropiedadUsed){
            return res.send({
                type: 'danger',
                title: 'Eliminar tipo de propiedad',
                message: 'No se puede eliminar el tipo porque pertenece a alguna propiedad'
              })
        }
        
        let tipoPropiedadRemove = await Tipo_Propiedad.findById(req.params.id)
        await tipoPropiedadRemove.remove()
        
        res.send({
            type: 'success',
            title: 'Eliminar tipo de propiedad',
            message: 'Tipo de propiedad eliminado'
          })
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
    getTiposPropiedad,
    removeTipoPropiedad
}