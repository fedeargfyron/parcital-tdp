import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import './MiPerfil.css'
import { getVisitas } from '../../redux/ducks/visitasReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
const Visitas = () => {
    const dispatch = useDispatch()
    const visitasInfo = useSelector(state => state.visitas)
    const { loadingVisitas, errorVisitas, visitas } = visitasInfo
    useEffect(() => {
        dispatch(getVisitas())
    }, [dispatch])
    return(
        <div className="perfilScreen">
            <div className="visitas-container">
                <HeaderPage titulo="Mis visitas"/>
                <FiltroOfertas />
                <div className="table-container">
                    <h4>Visitas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Interesado</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingVisitas ? <CircularProgress /> 
                            : errorVisitas ? <p>Error!</p> 
                            : visitas && visitas.map(visita => {
                                <tr key={visita._id}>
                                <th>Propiedad</th>
                                <th>{visita.fecha_inicio}</th>
                                <th>{visita.horario}</th>
                                <th>{visita.interesado}</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>{visita.estado}</th>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default Visitas