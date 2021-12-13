import React from 'react'
import { updateFiltrosReportes } from '../../../redux/ducks/reportesFiltersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getReporte } from '../../../redux/ducks/reporteReducer'
const FiltroIngresoPropiedades = () => {
    const dispatch = useDispatch()
    const filtros = useSelector(state => state.filtrosReportes)
    const handle = (e) => {
        let filtrosDto = {...filtros}
        filtrosDto[e.target.id] = e.target.value
        dispatch(updateFiltrosReportes(filtrosDto))
        dispatch(getReporte(filtrosDto, "IngresoPropiedades"))
    }

    return(
        <div className="reportes-filter-container">
            <div className="item-container reporte-item-container">
                <p>Desde</p>
                <input id="fechaInicio" type="date" value={filtros["fechaInicio"]} onChange={(e) => handle(e)}/>
            </div>
            <div className="item-container reporte-item-container">
                <p>Hasta</p>
                <input id="fechaFin" type="date" value={filtros["fechaFin"]} onChange={(e) => handle(e)}/>
            </div>
            <div className="item-container reporte-item-container">
                <p>Usuario</p>
                <input id="usuario" value={filtros["usuario"]} placeholder="Fede" onChange={(e) => handle(e)}/>
            </div>
        </div>
    )
}



export default FiltroIngresoPropiedades