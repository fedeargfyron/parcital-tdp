import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import CambiarContraScreen from './screens/CambiarContraScreen';
import PropiedadesScreen from './screens/PropiedadesScreen';
import PropiedadScreen from './screens/PropiedadScreen';
import GestionPersonasScreen from './screens/Gestiones/GestionPersonasScreen';
import GestionGruposScreen from './screens/Gestiones/GestionGruposScreen';
import GestionHorariosScreen from './screens/Gestiones/GestionHorariosScreen';
import GestionOfertasScreen from './screens/Gestiones/GestionOfertasScreen';
import GestionPropiedadesScreen from './screens/Gestiones/GestionPropiedadesScreen';
import GestionServiciosVentaScreen from './screens/Gestiones/GestionServiciosVentaScreen';
import GestionUsuariosScreen from './screens/Gestiones/GestionUsuariosScreen';
import GestionVentasScreen from './screens/Gestiones/GestionVentasScreen';
import ServicioVentaScreen from './screens/Forms/ServicioVentaScreen';
import FormGrupo from './screens/Forms/FormGrupo';
import FormPersona from './screens/Forms/FormPersona';
import FormPropiedad from './screens/Forms/FormPropiedad';
import FormUsuario from './screens/Forms/FormUsuario';
import Perfil from './screens/MiPerfil/Perfil';
import Visitas from './screens/MiPerfil/Visitas';
import Ofertas from './screens/MiPerfil/Ofertas';
import Reservas from './screens/MiPerfil/Reservas';
import Compras from './screens/MiPerfil/Compras';
import Reportes from './screens/Forms/Reportes';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faUserCog, faTimes, faCheck, faCaretRight, faBars, faCaretDown, faSearch, faPlus, faEdit, faQuestion, faTrash, faRedo, faMinus, faUpload, faDoorOpen, faMapMarkerAlt, faBath, faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'
import PrivateRoute from './PrivateRoute';
import PermissionRoute from './PermissionRoute';
import ReactNotification from 'react-notifications-component'
import { CircularProgress } from '@material-ui/core';
import 'animate.css/animate.min.css';
import 'react-notifications-component/dist/theme.css'

function App() {
  const [render, setRender] = useState(false)
  const loadingScreen = useSelector(state => state.generalLoading)
  const userReload = useRef("")
  useEffect(() => {
      const buscarUser = async () => {
        await axios({
          method: 'GET',
          withCredentials: true,
          url: "http://localhost:4000/api/logUser"
        }).then(res => {
        userReload.current = res.data
        setRender(true)})
    }
    buscarUser()
}, [])
  library.add(fab, faCheckSquare, faCoffee, faUserCog, faTimes, faCheck, faCaretRight, faBars, faCaretDown, faSearch, faPlus, faEdit, faQuestion, faTrash, faRedo, faMinus, faUpload, faDoorOpen, faMapMarkerAlt, faBath, faExpandArrowsAlt)
  return !render ? <></> : (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <ReactNotification />
        {loadingScreen && <div className="loading-container"><CircularProgress /></div>}
        <main>
        <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/login" component={LoginScreen}>
            </Route>
            <Route exact path="/propiedades/:tipo" component={PropiedadesScreen}/>
            <Route exact path="/propiedad/:id/:servicio" component={PropiedadScreen} />

            <Route exact path="/gestion/personas">
              <PermissionRoute component={<GestionPersonasScreen />} userReload={userReload.current} formulario={"Gestionar personas"}/>
            </Route>
            <Route exact path="/gestion/grupos">
              <PermissionRoute component={<GestionGruposScreen />} userReload={userReload.current} formulario={"Gestionar grupos"}/>
            </Route>
            <Route exact path="/gestion/horarios">
              <PermissionRoute component={<GestionHorariosScreen />} userReload={userReload.current} formulario={"Gestionar horarios"}/>
            </Route>
            <Route exact path="/gestion/ofertas">
              <PermissionRoute component={<GestionOfertasScreen />} userReload={userReload.current} formulario={"Gestionar ofertas"}/>
            </Route>
            <Route exact path="/gestion/propiedades">
              <PermissionRoute component={<GestionPropiedadesScreen />} userReload={userReload.current} formulario={"Gestionar propiedades"}/>
            </Route>
            <Route exact path="/gestion/servicioVenta">
              <PermissionRoute component={<GestionServiciosVentaScreen />} userReload={userReload.current} formulario={"Gestionar servicio venta"}/>
            </Route>
            <Route exact path="/gestion/usuarios">
              <PermissionRoute component={<GestionUsuariosScreen />} userReload={userReload.current} formulario={"Gestionar usuarios"}/>
            </Route>
            <Route exact path="/gestion/ventas">
              <PermissionRoute component={<GestionVentasScreen />} userReload={userReload.current} formulario={"Gestionar ventas"}/>
            </Route>
            <Route exact path="/formPropiedad/:id?">
              <PermissionRoute component={<FormPropiedad />} userReload={userReload.current} formulario={"Gestionar propiedades"}/>
            </Route>
            <Route exact path="/formGrupo/:id?">
              <PermissionRoute component={<FormGrupo />} userReload={userReload.current} formulario={"Gestionar grupos"}/>
            </Route>
            <Route exact path="/formUsuario/:id?">
              <PermissionRoute component={<FormUsuario />} userReload={userReload.current} formulario={"Gestionar usuarios"}/>
            </Route>
            <Route exact path="/formPersona/:id?">
              <PermissionRoute component={<FormPersona />} userReload={userReload.current} formulario={"Gestionar personas"}/>
            </Route>
            <Route exact path="/servicioVenta/:id">
              <PermissionRoute component={<ServicioVentaScreen />} userReload={userReload.current} formulario={"Gestionar servicio venta"}/>
            </Route>
            <Route exact path="/reportes">
              <PermissionRoute component={<Reportes />} userReload={userReload.current} formulario={"Estadisticas"}/>
            </Route>
            <Route exact path="/perfil">
              <PrivateRoute component={<Perfil />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/cambiarContraseña">
              <PrivateRoute component={<CambiarContraScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/visitas">
              <PrivateRoute component={<Visitas />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/ofertas">
              <PrivateRoute component={<Ofertas />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/reservas">
              <PrivateRoute component={<Reservas />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/compras">
              <PrivateRoute component={<Compras />} userReload={userReload.current}/>
            </Route>
          </Switch> 
        </main>
      </div>
    </Router>
  );
}

export default App