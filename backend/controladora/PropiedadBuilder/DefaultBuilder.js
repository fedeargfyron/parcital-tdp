const { Tipo_Propiedad } = require('../../modelos/Tipo_Propiedad')
const mongoose = require('mongoose')

function DefaultBuilder(){
    this.default = null

    this.step1 = function(){
        this.default = new Tipo_Propiedad()
    }

    this.step2 = function(body){
        this.default.rellenarCampos(body)
    }

    this.get = function(){
        return this.default
    }
}

module.exports = DefaultBuilder