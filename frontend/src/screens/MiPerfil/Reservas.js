import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroReservas from '../Filtros/FiltroReservas'
import './MiPerfil.css'
import { getReservas } from '../../redux/ducks/reservasReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
const Reservas = () => {
    const dispatch = useDispatch()
    const reservasInfo = useSelector(state => state.reservas)
    const { reservas, loadingReservas, errorReservas } = reservasInfo
    useEffect(() => {
        dispatch(getReservas())
    }, [dispatch])
    return(
        <div className="perfilScreen">
            <div className="reservas-container">
                <HeaderPage titulo="Mis reservas"/>
                <FiltroReservas />
                <div className="table-container">
                    <h4>Reservas</h4>
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
            </div>
        </div>
    )
}

export default Reservas