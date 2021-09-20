import React, { useState } from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FiltroPersonas = ({dispatch, getPersonas}) => {
    const [filtros, setFiltros] = useState({
        nombreApellido: "",
        email: ""
    })

    const handle = (e) => {
        const newFiltros ={...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }
    const filtrarClick = () => {
        dispatch(getPersonas(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Nombre y Apellido:</p>
                        <input id="nombreApellido" onChange={(e) => handle(e)} placeholder="Juan gomez"/>
                    </div>
                    <div className="item-container">
                        <p>Email:</p>
                        <input id="email" onChange={(e) => handle(e)} placeholder="fedemgs15@gmail.com"/>
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

export default FiltroPersonas