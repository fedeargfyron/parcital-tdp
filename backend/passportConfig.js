const Usuario = require('./modelos/Usuario')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local').Strategy

module.exports = function(passport) {
  passport.use(new localStrategy((username, password, done) => {
    console.log('asdas')
    Usuario.findOne({usuario: username}, (err, user) => {
            if(err) throw err
            if(!user) return done(null, false)
            bcrypt.compare(password, user.contraseña, (err, result) => {
              if(err) throw err
              if(result === true) {
                  return done(null, user)
              }
              else {
                  return done(null, false)
              }
          })
        })
      })
  )
  passport.serializeUser((user, cb) => {
    cb(null, user.id, user.email)
  })
  passport.deserializeUser((id, cb) => {
    Usuario.findOne({_id: id}, (err, user) => {
        cb(err, user)
    })
  })
}