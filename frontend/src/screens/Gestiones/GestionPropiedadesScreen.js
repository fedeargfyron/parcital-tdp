import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroPropiedades from '../Filtros/FiltroPropiedades'
import './Gestiones.css'

const GestionPropiedadesScreen = () => {
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de propiedades"/>
                <FiltroPropiedades />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Ubicacion</th>
                                <th>Dueño</th>
                                <th>Tipo de propiedad</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="7">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar propiedad"><i className="fas fa-plus"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3123</td>
                                <td>Mendoza y Pueyrredon</td>
                                <td>Federico Arrón</td>
                                <td>Casa</td>
                                <td>N/A</td>
                                <td>No disponible</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar propiedad"><i className="fas fa-edit"></i></button>
                                        <button className="btn-red" id="Eliminar propiedad"><i className="fas fa-trash"></i></button>
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

export default GestionPropiedadesScreen