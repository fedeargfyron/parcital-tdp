import React from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FiltroOfertas = () => {
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Estado</p>
                        <select>
                            <option>Todos</option>
                            <option>Aceptada</option>
                            <option>Pendiente</option>
                            <option>Rechazada</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Desde</p>
                        <input type="date"/>
                    </div>
                    <div className="item-container">
                        <p>Hasta</p>
                        <input type="date"/>
                    </div>
                    <button className="filtro-btn">
                        <FontAwesomeIcon icon='search' className="fas fa-search"/>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroOfertas