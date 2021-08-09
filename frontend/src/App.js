import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
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
import FormGrupo from './screens/Forms/FormGrupo';
import FormPersona from './screens/Forms/FormPersona';
import FormPropiedad from './screens/Forms/FormPropiedad';
import FormUsuario from './screens/Forms/FormUsuario';
import Perfil from './screens/MiPerfil/Perfil';
import Visitas from './screens/MiPerfil/Visitas';
import Ofertas from './screens/MiPerfil/Ofertas';
import Reservas from './screens/MiPerfil/Reservas';
import Compras from './screens/MiPerfil/Compras';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faUserCog, faTimes, faCheck, faCaretRight, faBars, faCaretDown, faSearch, faPlus, faEdit, faQuestion, faTrash, faRedo, faMinus } from '@fortawesome/free-solid-svg-icons'
import PrivateRoute from './PrivateRoute';

function App() {
  const [render, setRender] = useState(false)
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
  console.log(userReload.current)
  library.add(fab, faCheckSquare, faCoffee, faUserCog, faTimes, faCheck, faCaretRight, faBars, faCaretDown, faSearch, faPlus, faEdit, faQuestion, faTrash, faRedo, faMinus)
  return !render ? <></> : (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <main>
        <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/login" component={LoginScreen}>
            </Route>
            <Route exact path="/propiedades/:tipo" component={PropiedadesScreen}/>
            <Route exact path="/propiedad/:id" component={PropiedadScreen} />

            {/* Permisos de PrivateRoute con validación de acciones */}
            <Route exact path="/gestion/personas">
              <PrivateRoute component={<GestionPersonasScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/grupos">
              <PrivateRoute component={<GestionGruposScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/horarios">
              <PrivateRoute component={<GestionHorariosScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/ofertas">
              <PrivateRoute component={<GestionOfertasScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/propiedades">
              <PrivateRoute component={<GestionPropiedadesScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/serviciosVenta">
              <PrivateRoute component={<GestionServiciosVentaScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/usuarios">
              <PrivateRoute component={<GestionUsuariosScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/gestion/ventas">
              <PrivateRoute component={<GestionVentasScreen />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/formPropiedad/:id?">
              <PrivateRoute component={<FormPropiedad />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/formGrupo/:id?">
              <PrivateRoute component={<FormGrupo />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/formUsuario/:id?">
              <PrivateRoute component={<FormUsuario />} userReload={userReload.current}/>
            </Route>
            <Route exact path="/formPersona/:id?">
              <PrivateRoute component={<FormPersona />} userReload={userReload.current}/>
            </Route>
            {/* Fin permisos de PrivateRoute con validación de acciones */}
            {/* Permisos de PrivateRoute normal */}
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
            {/* Fin permisos de PrivateRoute normal */}
          </Switch> 
        </main>
      </div>
    </Router>
  );
}

export default App