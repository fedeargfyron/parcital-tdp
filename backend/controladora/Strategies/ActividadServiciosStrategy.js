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
            'ventas': 1,
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
            },
            'totalVentas2': {
              '$sum': '$ventas.totalVentas'
            }
          }
        }, {
          '$project': {
            'totalVentas': 1, 
            'totalVisitas': 1, 
            'totalOfertas': 1, 
            'totalReservas': 1,
            'totalVentas2': 1
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
            this.pipeline[0].$lookup.pipeline[0].$match.fecha = matchByFecha
            this.pipeline[1].$lookup.pipeline[0].$match.fecha = matchByFecha
            this.pipeline[2].$lookup.pipeline[0].$match.fecha_inicio = matchByFecha
            this.pipeline[3].$unionWith.pipeline[0].$match.fecha = matchByFecha
        }
        if(filtros.agente !== ""){
          let agente = new RegExp(filtros.agente, "i")

          this.pipeline[3] = {
            '$unionWith': {
              'coll': 'personas', 
              'pipeline': [
                {
                  '$match': {
                    'nombre': agente
                  }
                }, {
                  '$lookup': {
                    'from': 'ventas', 
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
                        '$count': 'totalVentas'
                      }
                    ], 
                    'as': 'ventas'
                  }
                }, {
                  '$unwind': {
                    'path': '$ventas', 
                    'preserveNullAndEmptyArrays': true
                  }
                }
              ]
            }
          }

          if(matchByFecha){
            this.pipeline[3].$unionWith.pipeline[1].$lookup.pipeline[0].$match.fecha = matchByFecha
          }
          this.pipeline.unshift({
            '$lookup': {
              'from': 'personas', 
              'let': {
                'agenteId': '$agente'
              }, 
              'pipeline': [
                {
                  '$match': {
                    '$expr': {
                      '$eq': [
                        '$$agenteId', '$_id'
                      ]
                    }, 
                    'nombre': agente
                  }
                }
              ], 
              'as': 'agenteDatos'
            }
          }, {
            '$unwind': {
              'path': '$agenteDatos'
            }
          })
        }
        return this.pipeline
    }
}

module.exports = ActividadServiciosStrategy