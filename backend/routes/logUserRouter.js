module.exports = function(express, passport) {
    const Router = express.Router()
    const {
        getUser,
        loginUser,
        logOut
    } = require('../controladora/logUserControladora')(passport)
    Router.post('/', loginUser)

    Router.get('/', getUser)
    
    Router.get('/logout', logOut)

    return Router
}