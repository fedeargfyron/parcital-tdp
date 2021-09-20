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
import { getGrupoReducer } from './ducks/grupoReducer'
import { getPersonasReducer } from './ducks/personasReducer'
import { getPersonaReducer } from './ducks/personaReducer'
import { getHorariosReducer } from './ducks/horariosReducer'
import { getServiciosVentaReducer } from './ducks/serviciosVentaReducer'
import { getPropiedadesDisponiblesReducer } from './ducks/propiedadesDisponiblesReducer'
import { getServicioVentaReducer } from './ducks/servicioVentaReducer'
import { getOfertasAgenteReducer } from './ducks/ofertasAgenteReducer'
import { getReservasGestionReducer } from './ducks/reservasGestionReducer'
import { getComprasReducer } from './ducks/comprasReducer'
import { getUserDataReducer } from './ducks/userDataReducer'
import { setLoadingReducer } from './ducks/loadingReducer'
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
    ofertasAgente: getOfertasAgenteReducer,
    propiedad: getPropiedadReducer,
    updateUser: getUpdateUserReducer,
    grupo: getGrupoReducer,
    personas: getPersonasReducer,
    persona: getPersonaReducer,
    horarios: getHorariosReducer,
    serviciosVenta: getServiciosVentaReducer,
    servicioVenta: getServicioVentaReducer,
    propiedadesDisponibles: getPropiedadesDisponiblesReducer,
    reservasGestion: getReservasGestionReducer,
    compras: getComprasReducer,
    userData: getUserDataReducer,
    generalLoading: setLoadingReducer
})

const middleware = [thunk]

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store