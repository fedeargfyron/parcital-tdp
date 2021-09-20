import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import HeaderPage from '../../components/HeaderPage'
import FiltroGrupos from '../Filtros/FiltroGrupos'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getGrupos } from '../../redux/ducks/gruposReducer'
import { CircularProgress } from '@material-ui/core'
import messageAdder from '../../MessageAdder'


import axios from 'axios'

const GestionGruposScreen = () => {
    const dispatch = useDispatch()
    const setGrupos = useSelector(state => state.grupos)
    const { grupos, loadingGrupos, errorGrupos } = setGrupos
    const userInfo = useSelector(state => state.user)
    const { user } = userInfo
    const history = useHistory()
    useEffect(() => {
        dispatch(getGrupos())
    }, [dispatch])
    const deleteGrupo = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:4000/api/grupos/${id}`
        }).then((res) => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de grupos"/>
                <FiltroGrupos />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        { user && 
                            <tbody>
                                { user.acciones.includes("Agregar grupo") && 
                                <tr>
                                    <td colSpan="4">
                                        <div className="new-item-row">
                                            <button className="btn-green" onClick={() => history.push('/formGrupo')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                        </div>
                                    </td>
                                </tr>
                                }
                                { loadingGrupos ? <tr><td colSpan="4" className="centerCircularProgress"><CircularProgress /></td></tr>
                                : errorGrupos ? <tr><td colSpan="4"><h2>Error!</h2></td></tr>
                                : grupos && grupos.map(grupo => (
                                    <tr key={grupo._id}>
                                        <td>{grupo._id}</td>
                                        <td>{grupo.nombre}</td>
                                        <td>{grupo.estado ? "Activo" : "Inactivo"}</td>
                                        <td>
                                            <div className="gestion-buttons-container">
                                                { user.acciones.includes("Modificar grupo") && 
                                                <button className="btn-blue" onClick={() => history.push(`/formGrupo/${grupo._id}`)}><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                                }
                                                { user.acciones.includes("Eliminar grupo") && 
                                                <button className="btn-red" onClick={() => deleteGrupo(grupo._id)}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
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

export default GestionGruposScreen