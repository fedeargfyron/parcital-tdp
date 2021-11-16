import React, { useState } from 'react'
import './Reportes.css'
import Header from './ReportesComponents/Header'
import ActividadServiciosChart from './ReportesCharts/ActividadServiciosChart'
import DuracionServiciosChart from './ReportesCharts/DuracionServiciosChart'
import IngresosChart from './ReportesCharts/IngresosChart'
import { useSelector } from 'react-redux'
const Reportes = () => {
    const filtros = useSelector(state => state.filtrosReportes)
    const [currentReporte, setCurrentReporte] = useState(filtros.reporte)

    return(
    <div className="reportesScreen">
        <Header />
        <div className="reporteContainer">
            <ActividadServiciosChart />
            {
                /*
                currentReporte === "ActividadServicios" ? <ActividadServiciosChart />
                : currentReporte === "Ingresos" ? <IngresosChart />
                : currentReporte === "DuracionServicios" ? <DuracionServiciosChart />
                : <h4>Sin reporte</h4>
                */
            }
        </div>
    </div>
    )
}

export default Reportes