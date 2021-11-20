function IngresoPropiedadesStrategy() { 
    this.collection = "audpropiedads"
    this.pipeline = [
        {
          '$match': {
            'accion': 'Agregar'
          }
        }, {
          '$project': {
            'fecha': {
              '$dateToString': {
                'format': '%Y-%m', 
                'date': '$fecha'
              }
            }
          }
        }, {
          '$group': {
            '_id': '$fecha', 
            'cantidad': {
              '$sum': 1
            }
          }
        }, {
          '$group': {
            '_id': null, 
            'datos': {
              '$push': {
                'cantidad': '$cantidad', 
                'fecha': '$_id'
              }
            }
          }
        }, {
          '$project': {
            '_id': 0
          }
        }, {
          '$sort': {
            'datos.fecha': -1
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

        if(filtros.usuario !== ""){
            let usuario = new RegExp(filtros.agente, "i")
            this.pipeline.unshift({
                '$lookup': {
                  'from': 'usuarios', 
                  'let': {
                    'usuarioId': '$usuario'
                  }, 
                  'pipeline': [
                    {
                      '$match': {
                        '$expr': {
                          '$eq': [
                            '$$usuarioId', '$_id'
                          ]
                        }, 
                        'nombre': usuario
                      }
                    }
                  ], 
                  'as': 'usuarioDatos'
                }
              }, {
                '$unwind': {
                  'path': '$usuarioDatos', 
                  'preserveNullAndEmptyArrays': false
                }
            })
            
        }
        return this.pipeline
    }
}

module.exports = IngresoPropiedadesStrategy