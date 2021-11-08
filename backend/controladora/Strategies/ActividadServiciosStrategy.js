function ActividadServiciosStrategy() { 
    this.collection = "servicios" //Colección a la que apunta la strategy
    this.pipeline = [
        {
          '$lookup': {
            'from': 'ofertas', 
            'let': {
              'servicioId': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$servicioId', '$servicio'
                    ]
                  }
                }
              }
            ], 
            'as': 'ofertasDatos'
          }
        }, {
          '$lookup': {
            'from': 'visitas', 
            'let': {
              'servicioId': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$servicioId', '$servicio'
                    ]
                  }
                }
              }
            ], 
            'as': 'visitasDatos'
          }
        }, {
          '$lookup': {
            'from': 'reservas', 
            'let': {
              'servicioId': '$_id'
            }, 
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$servicioId', '$servicio'
                    ]
                  }
                }
              }
            ], 
            'as': 'reservasDatos'
          }
        }, {
          '$unionWith': {
            'coll': 'ventas', 
            'pipeline': [
              {
                '$match': {}
              }, {
                '$count': 'totalVentas'
              }
            ]
          }
        }, {
          '$project': {
            'totalVentas': 1, 
            'totalVisitas': {
              '$size': {
                '$ifNull': [
                  '$visitasDatos', []
                ]
              }
            }, 
            'totalOfertas': {
              '$size': {
                '$ifNull': [
                  '$ofertasDatos', []
                ]
              }
            }, 
            'totalReservas': {
              '$size': {
                '$ifNull': [
                  '$reservasDatos', []
                ]
              }
            }
          }
        }, {
          '$group': {
            '_id': null, 
            'documents': {
              '$push': '$$ROOT'
            }, 
            'totalOfertas': {
              '$sum': '$totalOfertas'
            }, 
            'totalVisitas': {
              '$sum': '$totalVisitas'
            }, 
            'totalReservas': {
              '$sum': '$totalReservas'
            }, 
            'totalVentas': {
              '$sum': '$totalVentas'
            }
          }
        }, {
          '$project': {
            'totalVentas': 1, 
            'totalVisitas': 1, 
            'totalOfertas': 1, 
            'totalReservas': 1
          }
        }
      ]
    this.pipelineCreator = (filtros) => { 
        //Aplicar logica
        let matchByFecha
        console.log(filtros)
        
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
            this.pipeline[0].$lookup.pipeline[0].$match.fecha_inicio = matchByFecha
            this.pipeline[1].$lookup.pipeline[0].$match.fecha_inicio = matchByFecha
            this.pipeline[2].$lookup.pipeline[0].$match.fecha_inicio = matchByFecha
            this.pipeline[3].$unionWith.pipeline[0].$match.fecha = matchByFecha
        }
        
        //Agregar al pipeline filtros
        return this.pipeline
    }
}

module.exports = ActividadServiciosStrategy