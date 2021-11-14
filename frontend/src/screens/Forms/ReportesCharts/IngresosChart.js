import React from 'react'
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
const IngresosChart = () => {
    const reporteInfo = useSelector(state => state.reportes)
    const { reporte, loadingReporte, errorReporte} = reporteInfo
    return(
        <div>
            {
            loadingReporte ? <CircularProgress /> : 
            errorReporte ? <h2>Error!</h2> :
            reporte && reporte.length > 0 &&
            <Line 
                data={{
                    labels: reporte.map(x => x.fecha),
                    datasets: [{
                        label: 'Ingresos por mes',
                        data: reporte.map(x => x.ingreso),
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
                        
                        borderWidth: 3,
                        pointHoverRadius: 10,
                        pointRadius: 6,
                        pointBorderWidth: 4
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

export default IngresosChart