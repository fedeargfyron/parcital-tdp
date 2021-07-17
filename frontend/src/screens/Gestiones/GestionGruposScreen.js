import React from 'react'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroGrupos from '../Filtros/FiltroGrupos'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GestionGruposScreen = () => {
    const history = useHistory()
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de grupos"/>
                <FiltroGrupos />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar grupo" onClick={() => history.push('/formGrupo')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Fede</td>
                                <td>Activo</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar grupo"><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        <button className="btn-red" id="Eliminar grupo"><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
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

export default GestionGruposScreen