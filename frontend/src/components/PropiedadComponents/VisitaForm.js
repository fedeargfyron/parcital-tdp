import React from 'react'
import './VisitaForm.css'
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
            <button className="btn-solicitar-visita"><i className="fas fa-check"></i></button>
        </form>
    )
}

export default VisitaForm