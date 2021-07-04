import React from 'react'
import './Filtros.css'

const FiltroPersonas = () => {
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Estado:</p>
                        <select>
                            <option>Todos</option>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Nombre y Apellido:</p>
                        <input placeholder="Juan gomez"/>
                    </div>
                    <button className="filtro-btn">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroPersonas