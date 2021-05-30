module.exports = function(app, express, passport) {
    const Router = express.Router()
    const {
        getUser,
        loginUser,
        logOut
    } = require('../controladora/logUserControladora')
    Router.post('/', loginUser(req, res, passport))

    Router.get('/user', getUser)
    
    Router.get('/logout', logOut)
}