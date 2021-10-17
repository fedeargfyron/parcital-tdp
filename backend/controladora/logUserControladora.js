const { persona } = require('../modelos/Persona')
const MongoClientCreator = require('./Common/client')
const LogsUsuario = require('./Auditoria/LogsUsuario')
const mongoose = require('mongoose')

module.exports = function(passport){
  const getUser = async (req, res) => {
      let dtoUser = null
      if(!req.user)
          return res.send(dtoUser)
      let pipeline = pipelineForUser(req.user._id)
      const aggCursor = await MongoClientCreator('usuarios', pipeline)
      await aggCursor.forEach(userData => {
          dtoUser = userData
      })
      res.send(dtoUser)
  }

  const loginUser = async (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
          if(err) throw err
          if(!user) 
            return res.send({
                type: 'danger',
                title: 'Login',
                message: 'No existe el usuario'
            })
          if(!user.estado) 
            return res.send({
                type: 'danger',
                title: 'Login',
                message: 'Usuario no disponible'
            })
            
          req.logIn(user, err => {
              if(err) throw err
              LogsUsuario(user._id, "LogIn")
              res.send({
                type: 'success',
                title: 'Gestion de usuarios',
                message: 'Autentificado satisfactoriamente'
              })
          })
      }) (req, res, next)
  }

  const userData = async (req, res) => {
      try {
          if(!req.user)
              return res.send({
                  type: 'danger',
                  title: 'Gestion de usuarios',
                  message: 'Inicie sesión'
              })
          let userData = {
              usuario: req.user.usuario
          }
          userData.persona = await persona.findOne({
              usuario: req.user._id
          }, "telefono nombre apellido email domicilio")
          
          
          res.send(userData)
      } catch (err) {
          console.error(err)
          res.status(500).send({
            type: 'danger',
            title: 'Gestion de usuarios',
            message: 'Server error'
          })
      }
  }
  const logOut = async (req, res) => {
      LogsUsuario(req.user._id, "LogOut")
      req.session.destroy(err => {
              if(err){
                  console.log(err)
              }
              
              res.send({
                type: 'success',
                title: 'Gestion de usuarios',
                message: 'Deslogueado satisfactoriamente'
              })
          }
      )
  }

  const pipelineForUser = (id) => {
      return [
            {
              '$search': {
                  'index': 'userIndex', 
                  'equals': {
                      'path': '_id', 
                      'value': id
                  }
              }
          }, {
            '$lookup': {
              'from': 'grupos', 
              'localField': 'grupos', 
              'foreignField': '_id', 
              'as': 'gruposDatos'
            }
          }, {
            '$unwind': {
              'path': '$gruposDatos',
              'preserveNullAndEmptyArrays': true
            }
          }, {
            '$lookup': {
              'from': 'accions', 
              'localField': 'gruposDatos.acciones', 
              'foreignField': '_id', 
              'as': 'accionesDatos'
            }
          }, {
            '$project': {
              'accionesDatos': 1, 
              'usuario': 1
            }
          }, {
            '$unwind': {
              'path': '$accionesDatos',
              'preserveNullAndEmptyArrays': true
            }
          }, {
            '$lookup': {
              'from': 'formularios', 
              'localField': 'accionesDatos.formulario', 
              'foreignField': '_id', 
              'as': 'formularioDatos'
            }
          }, {
            '$unwind': {
              'path': '$formularioDatos',
              'preserveNullAndEmptyArrays': true
            }
          }, {
            '$group': {
              '_id': '$_id', 
              'usuario': {
                '$first': '$usuario'
              },
              'reportes': {
                '$addToSet': {
                  '$cond': {
                    'if': {
                      '$eq': ["Estadisticas", '$formularioDatos.nombre']
                    },
                    'then': '$accionesDatos.nombre',
                    'else': '$$REMOVE'
                  }
                }
              },
              'acciones': {
                '$addToSet': '$accionesDatos.nombre'
              }, 
              'formularios': {
                '$addToSet': {
                  'nombre': '$formularioDatos.nombre',
                  'url': '$formularioDatos.url'
                }
              }
            }
          }
      ]
  }

  return {
      getUser,
      loginUser,
      userData,
      logOut
  }
}