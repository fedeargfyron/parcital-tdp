import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getUserReducer } from './ducks/userReducer'
import { getPropiedadesReducer } from './ducks/propiedadesReducer'
import { getDueñosReducer } from './ducks/dueñosReducer'
import { getUsersDisponiblesReducer } from './ducks/usersDisponiblesReducer'
import { getUsersReducer } from './ducks/usersReducer'
import { getModulosReducer } from './ducks/modulosReducer'
import { getGruposReducer } from './ducks/gruposReducer'
import { getVentasReducer } from './ducks/ventasReducer'
import { getVisitasReducer } from './ducks/visitasReducer'
import { getReservasReducer } from './ducks/reservasReducer'
import { getOfertasReducer } from './ducks/ofertasReducer'
import { getPropiedadReducer } from './ducks/propiedadReducer'
import { getUpdateUserReducer } from './ducks/updateUserReducer'
const reducer = combineReducers({
    user: getUserReducer,
    propiedades: getPropiedadesReducer,
    dueños: getDueñosReducer,
    usersDisponibles: getUsersDisponiblesReducer,
    users: getUsersReducer,
    modulos: getModulosReducer,
    grupos: getGruposReducer,
    visitas: getVisitasReducer,
    ventas: getVentasReducer,
    reservas: getReservasReducer,
    ofertas: getOfertasReducer,
    propiedad: getPropiedadReducer,
    updateUser: getUpdateUserReducer
})

const middleware = [thunk]

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store