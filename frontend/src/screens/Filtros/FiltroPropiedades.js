import React, { useState } from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FiltroPropiedades = ({dispatch, getPropiedades}) => {
    const [filtros, setFiltros] = useState({
        tipo_propiedad: "",
        estado: "",
        ubicacion: ""
    })

    const handle = (e) => {
        const newFiltros ={...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }

    const filtrarClick = () => {
        dispatch(getPropiedades(null, filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Tipo de propiedad</p>
                        <select id="tipo_propiedad" onChange={(e) => handle(e)}>
                            <option value="">Todos</option>
                            <option value="Casa">Casas</option>
                            <option value="Departamento">Departamentos</option>
                            <option value="Galpon">Galpones</option>
                            <option value="Terreno">Terrenos</option>
                            <option value="Cochera">Cocheras</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Estado</p>
                        <select id="estado" onChange={(e) => handle(e)}>
                            <option value="">Todos</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No disponible">No disponible</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Ubicacion</p>
                        <input onChange={(e) => handle(e)} id="ubicacion" placeholder="Ej: Mendoza e iriondo"/>
                    </div>
                    <button className="filtro-btn" onClick={filtrarClick}>
                        <FontAwesomeIcon icon='search' className="fas fa-search"/>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroPropiedades