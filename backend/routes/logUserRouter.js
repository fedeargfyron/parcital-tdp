module.exports = function(express, passport) {
    const Router = express.Router()
    const {
        getUser,
        loginUser,
        logOut,
        userData
    } = require('../controladora/logUserControladora')(passport)
    Router.post('/', loginUser)

    Router.get('/', getUser)
    
    Router.get('/userdata', userData)
    
    Router.post('/logOut', logOut)

    return Router
}