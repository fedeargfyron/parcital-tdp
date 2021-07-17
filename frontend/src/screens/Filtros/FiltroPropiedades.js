import React from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FiltroPropiedades = () => {
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Tipo de propiedad</p>
                        <select>
                            <option>Todos</option>
                            <option>Casas</option>
                            <option>Departamentos</option>
                            <option>Galpones</option>
                            <option>Terrenos</option>
                            <option>Cocheras</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Estado</p>
                        <select>
                            <option>Todos</option>
                            <option>Disponible</option>
                            <option>No disponible</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Ubicacion</p>
                        <input placeholder="Ej: Mendoza e iriondo"/>
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

export default FiltroPropiedades