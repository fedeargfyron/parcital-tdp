import React, { useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderPage from '../../components/HeaderPage'
import { getCompras } from '../../redux/ducks/comprasReducer'
import { getOfertas } from '../../redux/ducks/ofertasReducer'
import { getReservas } from '../../redux/ducks/reservasReducer'
import { getVisitas } from '../../redux/ducks/visitasReducer'
import { getUserData } from '../../redux/ducks/userDataReducer'
import { CircularProgress } from '@material-ui/core'
import './MiPerfil.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
const Perfil = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const usuario = {
        id: 1,
        nombre: 'Federico'
    }
    const reservasInfo = useSelector(state => state.reservas)
    const { reservas, loadingReservas, errorReservas } = reservasInfo

    const ofertasInfo = useSelector(state => state.ofertas)
    const { ofertas, loadingOfertas, errorOfertas} = ofertasInfo

    const comprasInfo = useSelector(state => state.compras)
    const { compras, loadingCompras, errorCompras } = comprasInfo

    const visitasInfo = useSelector(state => state.visitas)
    const { loadingVisitas, errorVisitas, visitas } = visitasInfo

    const userInfo = useSelector(state => state.userData)
    const { loadingUserdata, errorUserdata, userdata } = userInfo   

    useEffect(() => {
        dispatch(getOfertas(null, true))
        dispatch(getReservas(null, true))
        dispatch(getCompras(null, true))
        dispatch(getVisitas(null, true))
        dispatch(getUserData())
    }, [dispatch])
    return(
        <div className="perfilScreen">
             <div className="perfil-container">
                 <HeaderPage titulo={`Perfil de ${usuario.nombre}`}/>
                <div className="detalles-usuario">
                    <h4>Detalles de usuario</h4>
                    { loadingUserdata ? <div className="centerCircularProgress"><CircularProgress /></div>
                    : errorUserdata ? <div>Error!</div>
                    : userdata && userdata.persona &&
                    <div className="detalles-info">
                        <p>Nombre y apellido: <span>{userdata.persona.nombre} {userdata.persona.apellido}</span></p>
                        <p>E-mail: <span>{userdata.persona.email}</span></p>
                        <p>Teléfono: <span>{userdata.persona.telefono}</span></p>
                        <p>Dirección: <span>{userdata.persona.domicilio}</span></p>
                        <p>Usuario: <span>{userdata.usuario}</span></p>
                        <p className="password-p">Contraseña<span className="editPassword-btn" onClick={() => history.push('/cambiarContraseña')}><FontAwesomeIcon icon='edit' className="fas fa-edit"/></span></p>
                    </div> }
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-visitas">
                    <h4>Ultimas visitas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingVisitas ? <tr><td colSpan="7" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorVisitas ? <tr><td colSpan="7">Error!</td></tr>
                            : visitas && Array.isArray(visitas) && visitas.map(visita => (
                                <tr key={visita._id}>
                                    <td>{visita.servicioDatos.propiedad}</td>
                                    <td>{new Date(visita.fecha).toLocaleString()}</td>
                                    <td>{visita.horario}</td>
                                    <td>{visita.agenteDatos.nombre} {visita.agenteDatos.apellido}</td>
                                    <td>{visita.agenteDatos.telefono}</td>
                                    <td>{new Date(visita.fecha).valueOf() <= Date.now().valueOf() ? "Realizada" : "Pendiente"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-ofertas">
                    <h4>Ultimas ofertas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingOfertas ? <tr><td colSpan="6" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorOfertas ? <tr><td colSpan="6">Error!</td></tr>
                            : ofertas && Array.isArray(ofertas) && ofertas.map(oferta => (
                                <tr key={oferta._id}>
                                    <td>{oferta.servicioDatos.propiedad}</td>
                                    <td>{new Date(oferta.fecha).toLocaleString()}</td>
                                    <td>${oferta.monto}</td>
                                    <td>{oferta.agenteDatos.nombre} {oferta.agenteDatos.apellido}</td>
                                    <td>{oferta.agenteDatos.telefono}</td>
                                    <td>{oferta.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-reservas">
                    <h4>Ultimas reservas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Inicio de reserva</th>
                                <th>Fin de reserva</th>
                                <th>Monto</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingReservas ? <tr><td colSpan="7" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorReservas ? <tr><td colSpan="7">Error!</td></tr>
                            : reservas && Array.isArray(reservas) && reservas.map(reserva => (
                                <tr key={reserva._id}>
                                    <td>{reserva.servicioDatos.propiedad}</td>
                                    <td>{new Date(reserva.fecha_inicio).toLocaleString()}</td>
                                    <td>{reserva.fecha_fin ? new Date(reserva.fecha_fin).toLocaleString() : "N/A"}</td>
                                    <td>${reserva.monto}</td>
                                    <td>{reserva.agenteDatos.nombre} {reserva.agenteDatos.apellido}</td>
                                    <td>{reserva.agenteDatos.telefono}</td>
                                    <td>{reserva.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-compras">
                    <h4>Ultimas compras</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Agente</th>
                                <th>Telefono</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingCompras ? <tr><td colSpan="5" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorCompras ? <tr><td colSpan="5">Error!</td></tr>
                            : compras && Array.isArray(compras) && compras.map(compra => (
                                <tr key={compra._id}>
                                    <td>{compra.propiedad}</td>
                                    <td>{new Date(compra.fecha).toLocaleString()}</td>
                                    <td>{compra.agenteDatos.nombre} {compra.agenteDatos.apellido}</td>
                                    <td>{compra.agenteDatos.telefono}</td>
                                    <td>${compra.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Perfil