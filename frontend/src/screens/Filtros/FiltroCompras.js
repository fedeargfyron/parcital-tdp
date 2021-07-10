import React from 'react'
import './Filtros.css'

const FiltroCompras = () => {
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Id propiedad</p>
                        <input placeholder="42323443212" type="text"/>
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
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroCompras