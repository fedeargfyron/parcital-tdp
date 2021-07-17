import React from 'react'
import './VisitaForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const VisitaForm = () => {
    return(
        <form className="visita-form">
            <h4 className="visita-form-title">¿Quieres solicitar una visita?</h4>
            <div className="line"></div>
            <input type="date"></input>
            <h4 className="horario-title">Seleccione un horario:</h4>
            <div className="horarios-grid">
                <p className="horario">8:00</p>
                <p className="horario">9:00</p>
                <p className="horario">10:00</p>
                <p className="horario">11:00</p>
                <p className="horario">12:00</p>
                <p className="horario">13:00</p>
                <p className="horario">14:00</p>
                <p className="horario">15:00</p>
            </div>
            <button className="btn-solicitar-visita" id="Solicitar visita"><FontAwesomeIcon icon='check' className="fa-check"/></button>
        </form>
    )
}

export default VisitaForm