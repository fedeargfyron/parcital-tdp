import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import './MiPerfil.css'
import { getOfertas } from '../../redux/ducks/ofertasReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
const Ofertas = () => {
    const dispatch = useDispatch()
    const ofertasInfo = useSelector(state => state.ofertas)
    const { ofertas, loadingOfertas, errorOfertas} = ofertasInfo
    useEffect(() => {
        dispatch(getOfertas())
    }, [dispatch])
    return(
        <div className="perfilScreen">
            <div className="ofertas-container">
                <HeaderPage titulo="Mis ofertas"/>
                <FiltroOfertas persona={"interesado"}/>
                <div className="table-container">
                    <h4>Ofertas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingOfertas ? <tr><td colSpan="6" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorOfertas ? <tr><td colSpan="6">Error!</td></tr>
                            : ofertas && Array.isArray(ofertas) && ofertas.map(oferta => (
                                <tr key={oferta._id}>
                                    <td>{oferta.servicioDatos.propiedad}</td>
                                    <td>{new Date(oferta.fecha).toLocaleString()}</td>
                                    <td>${oferta.monto}</td>
                                    <td>{oferta.agenteDatos.nombre} {oferta.agenteDatos.apellido}</td>
                                    <td>{oferta.agenteDatos.telefono}</td>
                                    <td>{oferta.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Ofertas