import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getUserReducer } from './ducks/userReducer'
import { getPropiedadesReducer } from './ducks/propiedadesReducer'
import { getDueñosReducer } from './ducks/dueñosReducer'
const reducer = combineReducers({
    user: getUserReducer,
    propiedades: getPropiedadesReducer,
    dueños: getDueñosReducer
})

const middleware = [thunk]

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store