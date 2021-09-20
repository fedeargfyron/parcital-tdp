import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroVisitas from '../Filtros/FiltroVisitas'
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
                <FiltroVisitas />
                <div className="table-container">
                    <h4>Visitas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingVisitas ? <tr><td colSpan="7" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorVisitas ? <tr><td colSpan="7">Error!</td></tr>
                            : visitas && Array.isArray(visitas) && visitas.map(visita => (
                                <tr key={visita._id}>
                                    <td>{visita.servicioDatos.propiedad}</td>
                                    <td>{new Date(visita.fecha).toLocaleString()}</td>
                                    <td>{visita.horario}</td>
                                    <td>{visita.agenteDatos.nombre} {visita.agenteDatos.apellido}</td>
                                    <td>{visita.agenteDatos.telefono}</td>
                                    <td>{new Date(visita.fecha).valueOf() <= Date.now().valueOf() ? "Realizada" : "Pendiente"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default Visitas