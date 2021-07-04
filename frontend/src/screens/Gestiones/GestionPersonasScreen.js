import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroPersonas from '../Filtros/FiltroPersonas'
import './Gestiones.css'

const GestionPersonasScreen = () => {
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
                                        <button className="btn-green" id="Agregar persona"><i className="fas fa-plus"></i></button>
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
                                        <button className="btn-blue" id="Modificar persona"><i className="fas fa-edit"></i></button>
                                        <button className="btn-red" id="Eliminar persona"><i className="fas fa-trash"></i></button>
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