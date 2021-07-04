import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import './Gestiones.css'

const GestionHorariosScreen = () => {
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de horarios"/>
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Horario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar horario"><i className="fas fa-plus"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>9:00</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar horario"><i className="fas fa-edit"></i></button>
                                        <button className="btn-red" id="Eliminar horario"><i className="fas fa-trash"></i></button>
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

export default GestionHorariosScreen