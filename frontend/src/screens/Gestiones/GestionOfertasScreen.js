import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroOfertas from '../Filtros/FiltroOfertas'
import { useDispatch, useSelector } from 'react-redux'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getOfertasAgente } from '../../redux/ducks/ofertasAgenteReducer'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import messageAdder from '../../MessageAdder'
const GestionOfertasScreen = () => {
    const dispatch = useDispatch()
    const ofertasInfo = useSelector(state => state.ofertasAgente)

    const userInfo = useSelector(state => state.user)
    const { user } = userInfo

    const { loadingOfertasAgente, errorOfertasAgente, ofertasAgente} = ofertasInfo
    useEffect(() => {
        dispatch(getOfertasAgente())
    }, [dispatch])

    const rechazarOferta = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            url: `http://localhost:4000/api/ofertas/${id}`,
            withCredentials: true
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }

    const aceptarOferta = async (id, propId) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'PUT',
            url: `http://localhost:4000/api/ofertas/${id}`,
            params: {
                propId: propId
            },
            withCredentials: true
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
                <HeaderPage titulo="Gestion de ofertas"/>
                <FiltroOfertas persona={"agente"} />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo propiedad</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Interesado</th>
                                <th>Numero</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        { user &&
                        <tbody>
                            { loadingOfertasAgente ? <tr><td colSpan="7" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorOfertasAgente ? <tr><td colSpan="7">Error!</td></tr>
                            : ofertasAgente && Array.isArray(ofertasAgente) && ofertasAgente.map(oferta => (
                                <tr key={oferta.ofertaDatos._id}>
                                    <td>{oferta.propiedad}</td>
                                    <td>{new Date(oferta.ofertaDatos.fecha).toLocaleString()}</td>
                                    <td>${oferta.ofertaDatos.monto}</td>
                                    <td>{oferta.interesadoDatos.nombre} {oferta.interesadoDatos.apellido}</td>
                                    <td>{oferta.interesadoDatos.telefono}</td>
                                    <td>{oferta.ofertaDatos.estado}</td>
                                    <td>
                                        {oferta.ofertaDatos.estado === "Pendiente" && 
                                        <div className="gestion-buttons-container">
                                            { user.acciones.includes("Aceptar oferta") && 
                                            <button className="btn-green" onClick={() => aceptarOferta(oferta.ofertaDatos._id, oferta.propiedad)}><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                                            }
                                            { user.acciones.includes("Rechazar oferta") && 
                                            <button className="btn-red" onClick={() => rechazarOferta(oferta.ofertaDatos._id)}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                                            }
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GestionOfertasScreen