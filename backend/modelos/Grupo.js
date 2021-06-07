 const mongoose = require('mongoose')

 const grupoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean, 
        required: true
    },
    acciones:[
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
 })

 const grupo = mongoose.model('Grupo', grupoSchema)

 module.exports = grupo