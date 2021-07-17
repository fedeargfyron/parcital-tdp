import React, { useState } from 'react'
import HeaderPage from '../../components/HeaderPage'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GestionHorariosScreen = () => {
    const [agregarHorario, setAgregarHorario] = useState();
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
                                    {agregarHorario ? 
                                    <form className="new-item-row">
                                        <input type="text" required="false" placeholder="14:00"/>
                                        <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                                        <button className="btn-red" onClick={() => setAgregarHorario(false)}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                                    </form>
                                    :
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar horario" onClick={() => setAgregarHorario(true)}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>9:00</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar horario"><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        <button className="btn-red" id="Eliminar horario"><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
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