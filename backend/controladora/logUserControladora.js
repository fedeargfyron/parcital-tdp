const getUser = async (req, res) => {
    res.send(req.user)
}

const loginUser = async (req, res, passport, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err
        if(!user) res.send("No user exists")
        else {
            req.logIn(user, err => {
                if(err) throw err
                res.send("Succesfully authenticated")
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

module.exports = {
    getUser,
    loginUser,
    logOut
}