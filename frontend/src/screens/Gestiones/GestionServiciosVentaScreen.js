import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroServiciosVenta from '../Filtros/FiltroServiciosVenta'
import './Gestiones.css'

const GestionServiciosVentaScreen = () => {
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de servicios de venta"/>
                <FiltroServiciosVenta />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Servicio</th>
                                <th>Fecha inicio</th>
                                <th>Visitas</th>
                                <th>Ofertas</th>
                                <th>Reservas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="7">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar servicio venta"><i className="fas fa-plus"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>2312</td>
                                <td>En venta</td>
                                <td>21/10/21</td>
                                <td>23</td>
                                <td>34</td>
                                <td>10</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                    <button className="btn-yellow" id="Consultar servicio venta"><i className="fas fa-question"></i></button>
                                    <button className="btn-red" id="Eliminar servicio venta"><i className="fas fa-trash"></i></button>
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

export default GestionServiciosVentaScreen