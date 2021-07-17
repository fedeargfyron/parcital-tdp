import React from 'react'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroUsuarios from '../Filtros/FiltroUsuarios'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GestionUsuariosScreen = () => {
    const history = useHistory()
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de usuarios"/>
                <FiltroUsuarios />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre y apellido</th>
                                <th>usuario</th>
                                <th>E-mail</th>
                                <th>Telefono</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="6">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar usuario" onClick={() => history.push('/formUsuario')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Federico Arrón</td>
                                <td>fede5arron</td>
                                <td>fedemgs15@gmail.com</td>
                                <td>3416161234</td>
                                <td>Activo</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar usuario"><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        <button className="btn-red" id="Eliminar usuario"><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
                                        <button className="btn-orange" id="Resetear contraseña"><FontAwesomeIcon icon='redo' className="fas fa-redo"/></button>
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

export default GestionUsuariosScreen