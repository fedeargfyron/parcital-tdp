import React from 'react'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroPersonas from '../Filtros/FiltroPersonas'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GestionPersonasScreen = () => {
    const history = useHistory()
    return(
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de personas"/>
                <FiltroPersonas />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre y Apellido</th>
                                <th>Usuario</th>
                                <th>E-mail</th>
                                <th>Teléfono</th>
                                <th>Domicilio</th>
                                <th>Tipo de persona</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="7">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar persona" onClick={() => history.push('/formPersona')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Federico Arrón</td>
                                <td>fede5arron</td>
                                <td>fedemgs15@gmail.com</td>
                                <td>3416166753</td>
                                <td>Mendoza 3413</td>
                                <td>Agente</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar persona"><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        <button className="btn-red" id="Eliminar persona"><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
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

export default GestionPersonasScreen