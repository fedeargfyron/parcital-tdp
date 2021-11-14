function IngresosStrategy() { 
    this.collection = "ventas" //Colección a la que apunta la strategy
    this.pipeline = [
        {
          '$match': {}
        },
        {
          '$group': {
            '_id': null, 
            'ventas': {
              '$push': {
                'fecha': {
                    '$dateToString': {
                      'format': '%Y-%m', 
                      'date': '$fecha'
                    }
                },
                'ingreso': '$ingreso'
              }
            }
          }
        }, {
          '$sort': {
            'ventas': 1
          }
        }, {
          '$unionWith': {
            'coll': 'personas', 
            'pipeline': [
              {
                '$group': {
                  '_id': null, 
                  'sueldo': {
                    '$sum': '$sueldo'
                  }
                }
              }
            ]
          }
        }, {
          '$group': {
            '_id': null, 
            'datos': {
              '$push': {
                'ventas': '$ventas', 
                'sueldo': '$sueldo'
              }
            }
          }
        }
      ]
    this.pipelineCreator = (filtros) => { 
        let matchByFecha
        
        if(filtros.fechaInicio !== "" && filtros.fechaFin !== ""){
            matchByFecha = { '$gte': new Date(filtros.fechaInicio), '$lt': new Date(filtros.fechaFin)}
        }
        else if(filtros.fechaInicio !== ""){
            matchByFecha = { '$gte': new Date(filtros.fechaInicio)}
        } 
        else if(filtros.fechaFin !== ""){
            matchByFecha = { '$lt': new Date(filtros.fechaFin)}
        }

        if(matchByFecha){
            this.pipeline[0].$match.fecha = matchByFecha
        }
        return this.pipeline
    }
}

module.exports = IngresosStrategy