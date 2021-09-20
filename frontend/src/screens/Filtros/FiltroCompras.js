import React, { useState } from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { getCompras } from '../../redux/ducks/comprasReducer'
const FiltroCompras = () => {
    const dispatch = useDispatch()
    const [filtros, setFiltros] = useState({
        fecha_inicio: "",
        fecha_fin: ""
    })

    const handle = (e) => {
        const newFiltros ={...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }
    
    const filtrarClick = () => {
        dispatch(getCompras(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Desde</p>
                        <input onChange={(e) => handle(e)} id="fecha_inicio" type="date"/>
                    </div>
                    <div className="item-container">
                        <p>Hasta</p>
                        <input onChange={(e) => handle(e)} id="fecha_fin" type="date"/>
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

export default FiltroCompras