import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FiltroServiciosVenta from '../Filtros/FiltroServiciosVenta'
import { getServiciosVenta } from '../../redux/ducks/serviciosVentaReducer'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { getPropiedadesDisponibles } from '../../redux/ducks/propiedadesDisponiblesReducer'
import messageAdder from '../../MessageAdder'

const GestionServiciosVentaScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const serviciosInfo = useSelector(state => state.serviciosVenta)
    const {errorServiciosVenta, loadingServiciosVenta, serviciosVenta } = serviciosInfo

    const propiedadesDisponiblesInfo = useSelector(state => state.propiedadesDisponibles)
    const {errorPropiedadesDisponibles, loadingPropiedadesDisponibles, propiedadesDisponibles } = propiedadesDisponiblesInfo

    const userInfo = useSelector(state => state.user)
    const { user } = userInfo

    useEffect(() => {
        dispatch(getServiciosVenta())
        dispatch(getPropiedadesDisponibles())
    }, [dispatch])
    const deleteServicioVenta = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'PUT',
            withCredentials: true,
            url: `http://localhost:4000/api/servicios/${id}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    const setServicioVenta = async (e, id) => {
        e.preventDefault()
        let coste = e.target.elements["costeServicio"].value;
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'POST',
            withCredentials: true,
            data:{
                coste: coste
            },
            url: `http://localhost:4000/api/servicios/${id}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de servicios de venta"/>
                <FiltroServiciosVenta />
                <div className="table-container">
                    <h4>Propiedades con servicio</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Estado</th>
                                <th>Fecha inicio</th>
                                <th>Fecha Fin</th>
                                <th>Visitas</th>
                                <th>Ofertas</th>
                                <th>Reservas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        { user &&
                        <tbody>
                            { loadingServiciosVenta ? <tr><td colSpan="8" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorServiciosVenta ? <tr><td colSpan="8">Error!</td></tr>
                            : serviciosVenta && Array.isArray(serviciosVenta) && serviciosVenta.map(servicio => (
                                <tr key={servicio._id}>
                                    <td>{servicio.propiedad}</td>
                                    <td>{servicio.estado}</td>
                                    <td>{new Date(servicio.fecha_inicio).toLocaleString()}</td>
                                    <td>{servicio.fecha_fin ? new Date(servicio.fecha_fin).toLocaleString() : 'N/A'}</td>
                                    <td>{servicio.totalVisitas}</td>
                                    <td>{servicio.totalOfertas}</td>
                                    <td>{servicio.totalReservas}</td>
                                    <td>
                                        <div className="gestion-buttons-container">
                                            { user.acciones.includes("Consultar servicio venta") && 
                                            <button className="btn-yellow" onClick={() => history.push(`/servicioVenta/${servicio._id}`)}><FontAwesomeIcon icon='question' className="fas fa-question"/></button>
                                            }
                                            { user.acciones.includes("Eliminar servicio venta") && 
                                            <button className="btn-red" onClick={() => {deleteServicioVenta(servicio._id)}}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </table>
                </div><div className="table-container">
                    <h4>Propiedades sin servicio</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Ubicacion</th>
                                <th>Agregar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { loadingPropiedadesDisponibles ? <tr><td colSpan="3" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorPropiedadesDisponibles ? <tr><td colSpan="3">Error!</td></tr>
                            : propiedadesDisponibles &&  Array.isArray(propiedadesDisponibles) && propiedadesDisponibles.map(propiedad => (
                                <tr key={propiedad._id}>
                                    <td>{propiedad._id}</td>
                                    <td>{propiedad.ubicacion}</td>
                                    <td>
                                        <form onSubmit={(e) => setServicioVenta(e, propiedad._id)} className="gestion-buttons-container">
                                            <input name="costeServicio" type="number" step="0.01" max="3" className="inputCosteServicio" placeholder="3" required/>
                                            <button className="btn-green" id="Agregar servicio venta"><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GestionServiciosVentaScreen