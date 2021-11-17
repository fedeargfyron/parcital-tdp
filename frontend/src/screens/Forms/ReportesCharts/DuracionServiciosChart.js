import React from 'react'
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
const DuracionServiciosChart = () => {
    const reporteInfo = useSelector(state => state.reportes)
    const { reporte, loadingReporte, errorReporte} = reporteInfo
    return(
        <div>
            {
            loadingReporte ? <div className="centerCircularProgress"><CircularProgress /></div> : 
            errorReporte ? <h2>Error!</h2> :
            reporte && 
            <Bar 
                data={{
                    labels: reporte.agentes.map(agente => agente.nombre),
                    datasets: [{
                        label: 'Duracion en días de los servicios por agente',
                        data: reporte.agentes.map(agente => agente.promedio),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    },

                ]
                }}
                height={400}
                width={600}
            />
            }
        </div>
    )
}

export default DuracionServiciosChart