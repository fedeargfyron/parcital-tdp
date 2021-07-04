import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroGrupos from '../Filtros/FiltroGrupos'
import './Gestiones.css'
const GestionGruposScreen = () => {
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
                                        <button className="btn-green" id="Agregar grupo"><i className="fas fa-plus"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Fede</td>
                                <td>Activo</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar grupo"><i className="fas fa-edit"></i></button>
                                        <button className="btn-red" id="Eliminar grupo"><i className="fas fa-trash"></i></button>
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