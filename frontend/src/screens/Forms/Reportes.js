import React from 'react'
import './Reportes.css'
import Header from './ReportesComponents/Header'
import ActividadServiciosChart from './ReportesCharts/ActividadServiciosChart'
const Reportes = () => {
    return(
    <div className="reportesScreen">
        <Header />
        <div className="reporteContainer">
            <ActividadServiciosChart />
        </div>
    </div>
    )
}

export default Reportes