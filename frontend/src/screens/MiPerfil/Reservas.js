import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import './MiPerfil.css'
import { getReservas } from '../../redux/ducks/reservasReducer'
import { useSelector, useDispatch } from 'react-redux'
const Reservas = () => {
    const dispatch = useDispatch()
    const reservasInfo = useSelector(state => state.reservas)
    useEffect(() => {
        dispatch(getReservas())
    }, [dispatch])
    return(
        <div className="perfilScreen">
            <div className="reservas-container">
                <HeaderPage titulo="Mis reservas"/>
                <FiltroOfertas />
                <div className="table-container">
                    <h4>Reservas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Inicio de reserva</th>
                                <th>Fin de reserva</th>
                                <th>Monto</th>
                                <th>Cliente</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Reservas