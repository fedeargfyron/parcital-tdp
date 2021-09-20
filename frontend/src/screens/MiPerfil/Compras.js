import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroCompras from '../Filtros/FiltroCompras'
import './MiPerfil.css'
import { getCompras } from '../../redux/ducks/comprasReducer'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
const Compras = () => {
    const dispatch = useDispatch()
    const comprasInfo = useSelector(state => state.compras)
    const { compras, loadingCompras, errorCompras } = comprasInfo
    useEffect(() => {
        dispatch(getCompras())
    }, [dispatch])
    return(
        <div className="perfilScreen">
            <div className="compras-container">
                <HeaderPage titulo="Mis compras"/>
                <FiltroCompras />
                <div className="table-container">
                    <h4>Compras</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Agente</th>
                                <th>Telefono</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingCompras ? <tr><td colSpan="5" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorCompras ? <tr><td colSpan="5">Error!</td></tr>
                            : compras && Array.isArray(compras) && compras.map(compra => (
                                <tr key={compra._id}>
                                    <td>{compra.propiedad}</td>
                                    <td>{new Date(compra.fecha).toLocaleString()}</td>
                                    <td>{compra.agenteDatos.nombre} {compra.agenteDatos.apellido}</td>
                                    <td>{compra.agenteDatos.telefono}</td>
                                    <td>${compra.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Compras