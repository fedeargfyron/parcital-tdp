import React, { useState } from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getGrupos } from '../../redux/ducks/gruposReducer'
import { useDispatch } from 'react-redux'
const FiltroGrupos = () => {
    const dispatch = useDispatch()

    const [filtros, setFiltros] = useState({
        nombre: "",
        estado: ""
    })
    const handle = (e) => {
        const newFiltros ={...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }
    const filtrarClick = () => {
        dispatch(getGrupos(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Estado</p>
                        <select onChange={(e) => handle(e)} id="estado">
                            <option value="">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Nombre</p>
                        <input id="nombre" onChange={(e) => handle(e)} placeholder="Seguridad"/>
                    </div>
                    <button className="filtro-btn" onClick={() => filtrarClick()}>
                        <FontAwesomeIcon icon='search' className="fas fa-search"/>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroGrupos