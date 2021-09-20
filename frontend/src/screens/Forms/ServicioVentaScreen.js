import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { getServicioVenta } from '../../redux/ducks/servicioVentaReducer'
import { CircularProgress } from '@material-ui/core'
const ServicioVentaScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const servicioInfo = useSelector(state => state.servicioVenta)
    const { loadingServicioVenta, errorServicioVenta, servicioVenta } = servicioInfo
    useEffect(() => {
        dispatch(getServicioVenta(id))
    }, [dispatch, id])
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Servicio de venta"/>
                { loadingServicioVenta ? <div className="centerCircularProgress circular"><CircularProgress /></div>
                : errorServicioVenta ? <h2>Error cargando el servicio!</h2>
                : servicioVenta && 
                <div>
                    <div className="servicioInfo">
                        <h4 className="caracteristicas-title">Información del servicio</h4>
                        <ul className="caracteristicas">
                            <li>Id: <span>{servicioVenta._id}</span></li>
                            <li>Estado: <span>{servicioVenta.estado}</span></li>
                            <li>Fecha de inicio: <span>{new Date(servicioVenta.fecha_inicio).toLocaleString()}</span></li>
                            <li>Fecha de fin: <span>{servicioVenta.fecha_fin ? new Date(servicioVenta.fecha_fin).toLocaleString() : 'N/A'}</span></li>
                            <li>Agente: <span>{servicioVenta.agente}</span></li>
                            <li>Propiedad: <span>{servicioVenta.propiedad}</span></li>
                            <li>Coste: <span>{servicioVenta.coste}</span></li>
                        </ul>
                    </div>
                    <div className="line"></div>
                    <div className="table-container">
                        <h4>Visitas</h4>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Fecha</th>
                                    <th>Horario</th>
                                    <th>Interesado</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                { servicioVenta.visitasDatos && servicioVenta.visitasDatos.map(visita => (
                                <tr key={visita._id}>
                                    <td>{visita._id}</td>
                                    <td>{new Date(visita.fecha).toLocaleString()}</td>
                                    <td>{visita.horario}</td>
                                    <td>{visita.interesado}</td>
                                    <td>{new Date(visita.fecha).valueOf() <= Date.now().valueOf() ? "Realizada" : "Pendiente"}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4>Ofertas</h4>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Interesado</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                { servicioVenta.ofertaDatos && servicioVenta.ofertaDatos.map(oferta => (
                                <tr key={oferta._id}>
                                    <td>{oferta._id}</td>
                                    <td>{new Date(oferta.fecha_inicio).toLocaleString()}</td>
                                    <td>${oferta.monto}</td>
                                    <td>{oferta.interesado}</td>
                                    <td>{oferta.estado}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4>Reservas</h4>
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha de inicio</th>
                                <th>Monto</th>
                                <th>Cliente</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            { servicioVenta.reservasDatos && servicioVenta.reservasDatos.map(reserva => (
                                <tr key={reserva._id}>
                                    <td>{reserva._id}</td>
                                    <td>{new Date(reserva.fecha_inicio).toLocaleString()}</td>
                                    <td>${reserva.monto}</td>
                                    <td>{reserva.cliente}</td>
                                    <td>{reserva.estado}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default ServicioVentaScreen