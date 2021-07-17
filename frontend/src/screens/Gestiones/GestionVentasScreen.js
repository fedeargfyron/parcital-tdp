import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroVentas from '../Filtros/FiltroVentas'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GestionVentasScreen = () => {
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
                                <th>Cliente</th>
                                <th>Agente</th>
                                <th>Fecha de reserva</th>
                                <th>Fecha de fin</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>3122</td>
                                <td>$450.000</td>
                                <td>Federico Arrón</td>
                                <td>Juan Gomez</td>
                                <td>25/10/20</td>
                                <td>25/11/20</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                    <button className="btn-green" id="Confirmar venta"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                                    <button className="btn-red" id="Anular reserva"><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GestionVentasScreen