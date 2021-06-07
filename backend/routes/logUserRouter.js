module.exports = function(express, passport) {
    const Router = express.Router()
    const {
        getUser,
        loginUser,
        logOut
    } = require('../controladora/logUserControladora')(passport)
    Router.post('/', loginUser)

    Router.get('/user', getUser)
    
    Router.get('/logout', logOut)
}