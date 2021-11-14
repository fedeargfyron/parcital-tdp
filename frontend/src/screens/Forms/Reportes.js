import React from 'react'
import './Reportes.css'
import Header from './ReportesComponents/Header'
import ActividadServiciosChart from './ReportesCharts/ActividadServiciosChart'
import DuracionServiciosChart from './ReportesCharts/DuracionServiciosChart'
import IngresosChart from './ReportesCharts/IngresosChart'
const Reportes = () => {
    return(
    <div className="reportesScreen">
        <Header />
        <div className="reporteContainer">
            <IngresosChart />
        </div>
    </div>
    )
}

export default Reportes