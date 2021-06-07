const mongoose = require('mongoose')

const horarioSchema = new mongoose.Schema({
    hora:{
        type: String,
        required: true
    }
})

const horario = mongoose.model('Horario', horarioSchema)

module.exports = horario