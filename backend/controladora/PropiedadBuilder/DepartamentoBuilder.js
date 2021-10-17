const { departamento } = require('../../modelos/Tipo_Propiedad')

function DepartamentoBuilder(){
    this.depto = null

    this.step1 = function(){
        this.depto = new departamento()
    }

    this.step2 = function(body){
        this.depto.rellenarCampos(body)
    }

    this.get = function(){
        return this.depto
    }
}

module.exports = DepartamentoBuilder