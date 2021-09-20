import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroPersonas from '../Filtros/FiltroPersonas'
import { useDispatch, useSelector } from 'react-redux'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPersonas } from '../../redux/ducks/personasReducer'
import { CircularProgress } from '@material-ui/core'
import messageAdder from '../../MessageAdder'

const GestionPersonasScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const personasInfo = useSelector(state => state.personas)
    const { personas, errorPersonas, loadingPersonas } = personasInfo

    const userInfo = useSelector(state => state.user)
    const { user } = userInfo

    useEffect(() => {
        dispatch(getPersonas())
    }, [dispatch])

    const deletePersona = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:4000/api/personas/${id}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return(
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de personas"/>
                <FiltroPersonas getPersonas={getPersonas} dispatch={dispatch} />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre y Apellido</th>
                                <th>Usuario</th>
                                <th>E-mail</th>
                                <th>Teléfono</th>
                                <th>Domicilio</th>
                                <th>Tipo de persona</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        { user && 
                        <tbody>
                            { user.acciones.includes("Agregar persona") && 
                            <tr>
                                <td colSpan="7">
                                    <div className="new-item-row">
                                        <button className="btn-green" onClick={() => history.push('/formPersona')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            }
                            { loadingPersonas ? <tr><td colSpan="7" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorPersonas ? <tr><td colSpan="7">Error cargando personas!</td></tr> 
                            : personas && personas.map(persona => (
                            <tr key={persona._id}>
                                <td>{persona.nombre} {persona.apellido}</td>
                                <td>{persona.usuarioDatos ? persona.usuarioDatos.usuario : 'N/A'}</td>
                                <td>{persona.email}</td>
                                <td>{persona.telefono}</td>
                                <td>{persona.domicilio}</td>
                                <td>{persona.tipo}</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        { user.acciones.includes("Modificar persona") && 
                                        <button className="btn-blue" onClick={() => history.push(`/formPersona/${persona._id}`)}><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        }
                                        { user.acciones.includes("Eliminar persona") && 
                                        <button className="btn-red" onClick={() => deletePersona(persona._id)}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
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

export default GestionPersonasScreen