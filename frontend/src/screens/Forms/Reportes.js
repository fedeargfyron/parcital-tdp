import React, { useState } from 'react'
import './Reportes.css'
import Header from './ReportesComponents/Header'
import ActividadServiciosChart from './ReportesCharts/ActividadServiciosChart'
import DuracionServiciosChart from './ReportesCharts/DuracionServiciosChart'
import IngresoPropiedadesChart from './ReportesCharts/IngresoPropiedadesChart'
import IngresosChart from './ReportesCharts/IngresosChart'
import { useSelector } from 'react-redux'
const Reportes = () => {
    const filtros = useSelector(state => state.filtrosReportes)
    const [currentReporte, setCurrentReporte] = useState(filtros.reporte)

    return(
    <div className="reportesScreen">
        <Header 
        currentReporte = {currentReporte} 
        setCurrentReporte = {setCurrentReporte}
        />
        <div className="reporteContainer">
            {
                currentReporte === "Actividad servicios" ? <ActividadServiciosChart />
                : currentReporte === "Ingresos" ? <IngresosChart />
                : currentReporte === "Duracion servicios" ? <DuracionServiciosChart />
                : currentReporte === "Ingreso propiedades" ? <IngresoPropiedadesChart />
                : <div></div>

            }
        </div>
    </div>
    )
}

export default Reportes