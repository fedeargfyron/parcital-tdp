import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroPropiedades from '../Filtros/FiltroPropiedades'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { getPropiedades } from '../../redux/ducks/propiedadesReducer'
import { CircularProgress } from '@material-ui/core'
import messageAdder from '../../MessageAdder'

const GestionPropiedadesScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.user)
    const { user } = userInfo

    const propiedadesInfo = useSelector(state => state.propiedades)
    const { propiedades, errorPropiedades, loadingPropiedades } = propiedadesInfo
    useEffect(() => {
        dispatch(getPropiedades())
    }, [dispatch])

    const deletePropiedad = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:4000/api/propiedades/${id}`
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
                <HeaderPage titulo="Gestion de propiedades"/>
                <FiltroPropiedades dispatch={dispatch} getPropiedades={getPropiedades} />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Ubicacion</th>
                                <th>Dueño</th>
                                <th>Tipo de propiedad</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        {user && 
                        <tbody>
                            { user.acciones.includes("Agregar propiedad") && 
                            <tr>
                                <td colSpan="7">
                                    <div className="new-item-row">
                                        <button className="btn-green" onClick={() => history.push('/formPropiedad')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            }
                            { loadingPropiedades ? <tr><td colSpan="7" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorPropiedades ? <tr><td colSpan="7">Error cargando propiedades!</td></tr> 
                            : propiedades && propiedades.map(propiedad => (
                            <tr key={propiedad._id}>
                                <td>{propiedad._id}</td>
                                <td>{propiedad.ubicacion}</td>
                                <td>{propiedad.dueñoDatos.nombre} {propiedad.dueñoDatos.apellido}</td>
                                <td>{propiedad.tipoDatos.tipo}</td>
                                <td>{propiedad.servicios.length > 0 ? propiedad.servicios.toString() : "N/A"}</td>
                                <td>{propiedad.estado}</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        { user.acciones.includes("Modificar propiedad") && 
                                        <button className="btn-blue" onClick={() => history.push(`/formPropiedad/${propiedad._id}`)}><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        }
                                        { user.acciones.includes("Eliminar propiedad") && 
                                        <button className="btn-red" onClick={() => deletePropiedad(propiedad._id)}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
                                        }
                                    </div>
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

export default GestionPropiedadesScreen