import React, { useState } from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getOfertasAgente } from '../../redux/ducks/ofertasAgenteReducer'
import { getOfertas } from '../../redux/ducks/ofertasReducer'
import { useDispatch } from 'react-redux'
const FiltroOfertas = ({persona}) => {
    const dispatch = useDispatch()
    const [filtros, setFiltros] = useState({
        estado: "",
        fecha_inicio: "",
        fecha_fin: ""
    })

    const handle = (e) => {
        const newFiltros ={...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }
    
    const filtrarClick = () => {
        if(persona === "interesado")
            dispatch(getOfertas(filtros))
        else
            dispatch(getOfertasAgente(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Estado</p>
                        <select id="estado" onChange={(e) => handle(e)}>
                            <option value="">Todos</option>
                            <option value="Aceptada">Aceptada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Rechazada">Rechazada</option>
                        </select>
                    </div>
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

export default FiltroOfertas