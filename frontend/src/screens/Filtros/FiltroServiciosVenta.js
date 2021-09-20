import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServiciosVenta } from '../../redux/ducks/serviciosVentaReducer'

const FiltroServiciosVenta = () => {
    const [filtros, setFiltros] = useState({
        estado: "",
        fecha_inicio: "",
        fecha_fin: ""
    })
    const handle = (e) => {
        const newFiltros = {...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }
    const dispatch = useDispatch()
    const filtrarClick = () => {
        dispatch(getServiciosVenta(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Servicio</p>
                        <select id="estado" onChange={(e) => handle(e)}>
                            <option value="">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Anulado">Anulado</option>
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
                    <button onClick={() => filtrarClick()} className="filtro-btn">
                        <FontAwesomeIcon icon='search' className="fas fa-search"/>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroServiciosVenta