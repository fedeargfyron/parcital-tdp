import React from 'react'
import FiltroIngresos from './FiltroIngresos'
import FiltroIngresoPropiedades from './FiltroIngresoPropiedades'
import FiltroDuracionServicios from './FiltroDuracionServicios'
import FiltroActividadServicios from './FiltroActividadServicios'

const FiltrosBaseReportes = () => {
    const filtrosFactory = new FiltrosFactory()
    return filtrosFactory
}

function FiltrosFactory(){
    this.create = (reporte) => {
        switch(reporte){
            case "Ingresos": return <FiltroIngresos />
            case "Actividad servicios": return <FiltroActividadServicios />
            case "Duracion servicios": return <FiltroDuracionServicios />
            case "Ingreso propiedades": return <FiltroIngresoPropiedades />
            default: return <h4>No seleccionó ningún reporte</h4>
        }        
    }
    
}

export default FiltrosBaseReportes
