import React, { useState } from 'react'
import '../../../components/HeaderPage.css'
import { useSelector, useDispatch } from 'react-redux'
import  FiltrosBaseReportes from './FIltrosBaseReportes'
import { updateFiltrosReportes } from '../../../redux/ducks/reportesFiltersReducer'
import { getReporte } from '../../../redux/ducks/reporteReducer'

const Header = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const filtros = useSelector(state => state.filtrosReportes)
    const [currentReporte, setCurrentReporte] = useState(filtros.reporte)
    const { user } = userInfo
    const handle = (e) => {
        let filtrosDto = filtros
        filtrosDto["reporte"] = e.target.value
        setCurrentReporte(e.target.value)
        dispatch(updateFiltrosReportes(filtrosDto))
        dispatch(getReporte(filtros, e.target.value.replace(" ", "")))
    }
    const factory = FiltrosBaseReportes()
    return (
        <div className="header">
            <div className="accionesContainer">
                <select className="filter-select reportes-select" value={filtros.reporte} onChange={(e) => handle(e)}>
                    <option value="">Seleccionar...</option>
                    {user && user.reportes && user.reportes.map(reporte => 
                        <option key={reporte} value={reporte}>{reporte}</option>
                    )}
                </select>
            </div>

            <div className="line"></div>

            <div className="filtrosContainer">
                {factory.create(currentReporte)}
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Header