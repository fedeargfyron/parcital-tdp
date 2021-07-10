import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import './MiPerfil.css'

const Visitas = () => {
    return(
        <div className="perfilScreen">
            <div className="visitas-container">
                <HeaderPage titulo="Mis visitas"/>
                <FiltroOfertas />
                <div className="table-container">
                    <h4>Visitas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Horario</th>
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

export default Visitas