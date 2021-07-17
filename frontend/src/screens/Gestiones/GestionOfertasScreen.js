import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GestionOfertasScreen = () => {
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de ofertas"/>
                <FiltroOfertas />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo propiedad</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Interesado</th>
                                <th>Numero</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123</td>
                                <td>23/05/2021</td>
                                <td>$4.000</td>
                                <td>Federico Arrón</td>
                                <td>3416213123</td>
                                <td>Pendiente</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-green" id="Aceptar oferta"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                                        <button className="btn-red" id="Rechazar oferta"><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
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

export default GestionOfertasScreen