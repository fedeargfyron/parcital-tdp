function IngresosStrategy() { 
    this.collection = "propiedads" //Colección a la que apunta la strategy
    this.pipeline = [{}] //Pipeline base a ejecutar
    this.pipelineCreator = (filtros) => { 
        if(!filtros) //En caso de no haber filtros devuelve pipeline base
            return this.pipeline
        //Aplicar logica
        //Agregar al pipeline filtros
    }
}

module.exports = IngresosStrategy