import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroVentas from '../Filtros/FiltroVentas'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { getReservasGestion } from '../../redux/ducks/reservasGestionReducer'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import messageAdder from '../../MessageAdder'
const GestionVentasScreen = () => {
    const dispatch = useDispatch()
    const reservasInfo = useSelector(state => state.reservasGestion)
    const { loadingReservasGestion, errorReservasGestion, reservasGestion} = reservasInfo

    const userInfo = useSelector(state => state.user)
    const { user } = userInfo

    const confirmarVenta = async (id, propId) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'PUT',
            data: {
                propId: propId
            },
            withCredentials: true,
            url: `http://localhost:4000/api/reservas/aceptar/${id}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }


    const anularReserva = async (id, propId) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'PUT',
            data: {
                propId: propId
            },
            withCredentials: true,
            url: `http://localhost:4000/api/reservas/anular/${id}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    useEffect(() => {
        dispatch(getReservasGestion())
    }, [dispatch])
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de ventas de propiedad"/>
                <FiltroVentas />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Precio</th>
                                <th>Monto reserva</th>
                                <th>Estado reserva</th>
                                <th>Cliente</th>
                                <th>Agente</th>
                                <th>Fecha de reserva</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        { user &&
                        <tbody>
                            { loadingReservasGestion ? <tr><td className="centerCircularProgress" colSpan="8"><CircularProgress /></td></tr> 
                            : errorReservasGestion ? <tr><td colSpan="8">Error!</td></tr> 
                            : reservasGestion && Array.isArray(reservasGestion) && reservasGestion.map(reserva => (
                                <tr key={reserva._id}>
                                    <td>{reserva.propiedadDatos._id}</td>
                                    <td>${reserva.propiedadDatos.precio}</td>
                                    <td>${reserva.monto}</td>
                                    <td>{reserva.estado}</td>
                                    <td>{reserva.clienteDatos.nombre} {reserva.clienteDatos.apellido}</td>
                                    <td>{reserva.agenteDatos.nombre} {reserva.agenteDatos.apellido}</td>
                                    <td>{new Date(reserva.fecha_inicio).toLocaleString()}</td>
                                    <td>
                                        {reserva.estado === "Pendiente" && 
                                        <div className="gestion-buttons-container">
                                            { user.acciones.includes("Confirmar venta") && 
                                            <button className="btn-green" id="Confirmar venta" onClick={() => confirmarVenta(reserva._id, reserva.propiedadDatos._id)}><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                                            }
                                            { user.acciones.includes("Anular reserva") && 
                                            <button className="btn-red" id="Anular reserva" onClick={() => anularReserva(reserva._id, reserva.propiedadDatos._id)}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                                            }
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GestionVentasScreen