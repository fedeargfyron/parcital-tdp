const { casa } = require('../../modelos/Tipo_Propiedad')

function CasaBuilder(){
    this.house = null

    this.step1 = function(){
        this.house = new casa()
    }

    this.step2 = function(body){
        this.house.rellenarCampos(body)
    }

    this.get = function(){
        return this.house
    }
}

module.exports = CasaBuilder