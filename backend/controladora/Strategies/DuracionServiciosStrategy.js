function DuracionServiciosStrategy() { 
    this.collection = "personas" //Colección a la que apunta la strategy
    this.pipeline = [
        {
          '$match': {
            'tipo': 'Agente'
          }
        }, {
          '$lookup': {
            'from': 'servicios', 
            'let': {
              'agenteId': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$agenteId', '$agente'
                    ]
                  }
                }
              }, {
                '$project': {
                  'timeDifference': {
                    '$divide': [
                      {
                        '$divide': [
                          {
                            '$subtract': [
                              {
                                '$ifNull': [
                                  '$fecha_fin', new Date()
                                ]
                              }, '$fecha_inicio'
                            ]
                          }, 3600000
                        ]
                      }, 24
                    ]
                  }
                }
              }, {
                '$group': {
                  '_id': null, 
                  'average': {
                    '$avg': '$timeDifference'
                  }
                }
              }
            ], 
            'as': 'serviciosPromedio'
          }
        }, {
          '$unwind': {
            'path': '$serviciosPromedio', 
            'preserveNullAndEmptyArrays': false
          }
        }, {
          '$group': {
            '_id': null, 
            'agentes': {
              '$push': {
                'nombre': '$nombre', 
                'promedio': '$serviciosPromedio.average'
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
            this.pipeline[1].$lookup.pipeline[0].$match.fecha_inicio = matchByFecha
        }

        if(filtros.agente !== ""){
            let agente = new RegExp(filtros.agente, "i")
            this.pipeline[0].$match.nombre = agente
        }
        return this.pipeline
    }
}

module.exports = DuracionServiciosStrategy