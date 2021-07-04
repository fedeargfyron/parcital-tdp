import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import { useState } from 'react'
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
function App() {
  const [user, setUser] = useState("")
  
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <main>
          
          <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/login" component={LoginScreen}>
              {user && <Redirect to="/"/>}
            </Route>
            <Route exact path="/cambiarContraseña" component={CambiarContraScreen}>
              {user && <Redirect to="/login" />}
            </Route>
            <Route exact path="/propiedades/:tipo" component={PropiedadesScreen}/>
            <Route exact path="/propiedad/:id" component={PropiedadScreen} />
            <Route exact path="/gestion/personas" component={GestionPersonasScreen} />
            <Route exact path="/gestion/grupos" component={GestionGruposScreen} />
            <Route exact path="/gestion/horarios" component={GestionHorariosScreen} />
            <Route exact path="/gestion/ofertas" component={GestionOfertasScreen} />
            <Route exact path="/gestion/propiedades" component={GestionPropiedadesScreen} />
            <Route exact path="/gestion/serviciosVenta" component={GestionServiciosVentaScreen} />
            <Route exact path="/gestion/usuarios" component={GestionUsuariosScreen} />
            <Route exact path="/gestion/ventas" component={GestionVentasScreen} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App