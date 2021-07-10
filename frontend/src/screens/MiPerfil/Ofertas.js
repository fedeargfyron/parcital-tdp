import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import './MiPerfil.css'

const Ofertas = () => {
    return(
        <div className="perfilScreen">
            <div className="ofertas-container">
                <HeaderPage titulo="Mis ofertas"/>
                <FiltroOfertas />
                <div className="table-container">
                    <h4>Ofertas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Interesado</th>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Ofertas