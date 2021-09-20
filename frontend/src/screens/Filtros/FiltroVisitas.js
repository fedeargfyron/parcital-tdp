import React, { useState } from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { getVisitas } from '../../redux/ducks/visitasReducer'
const FiltroVisitas = () => {
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
        dispatch(getVisitas(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Desde</p>
                        <input id="fecha_inicio" onChange={(e) => handle(e)} type="date"/>
                    </div>
                    <div className="item-container">
                        <p>Hasta</p>
                        <input id="fecha_fin" onChange={(e) => handle(e)} type="date"/>
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

export default FiltroVisitas