module.exports = function(passport){
    const getUser = async (req, res) => {
        let dtoUser = null
        if(req.user){
            dtoUser = {
                id: req.user._id,
                nombre: req.user.nombre,
                apellido: req.user.apellido,
                usuario: req.user.usuario,
                grupos: req.user.grupos,
                email: req.user.email,
                telefono: req.user.telefono,
            }
        }
        res.send(dtoUser)
    }

    const loginUser = async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) throw err
            if(!user) res.send("No existe usuario")
            if(!user.estado) res.send("Usuario no disponible")
            else {
                req.logIn(user, err => {
                    if(err) throw err
                    res.send("Autentificado satisfactoriamente")
                })
            }
        }) (req, res, next)
    }

    const logOut = async (req, res) => {
        req.session.destroy(err => {
                if(err){
                    console.log(err)
                }
                res.send('Logout successful')
            }
        )
    }

    return {
        getUser,
        loginUser,
        logOut
    }
}