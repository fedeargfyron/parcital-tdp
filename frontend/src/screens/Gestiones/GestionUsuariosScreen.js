import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroUsuarios from '../Filtros/FiltroUsuarios'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUsers } from '../../redux/ducks/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import messageAdder from '../../MessageAdder'
const GestionUsuariosScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const setUsers = useSelector(state => state.users)
    const { users, loadingUsers, errorUsers } = setUsers

    const userInfo = useSelector(state => state.user)
    const { user: userData } = userInfo
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const deleteUsuario = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:4000/api/usuarios/${id}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }

    const resetearContraseña = async (email) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'POST',
            params: {
                email: email
            },
            withCredentials: true,
            url: 'http://localhost:4000/api/usuarios/resetPassword'
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
                <HeaderPage titulo="Gestion de usuarios"/>
                <FiltroUsuarios />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Estado</th>
                                <th>Nombre y apellido</th>
                                <th>E-mail</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        {userData &&
                        <tbody>
                            { userData.acciones.includes("Agregar usuario") && 
                            <tr>
                                <td colSpan="5">
                                    <div className="new-item-row">
                                        <button className="btn-green" onClick={() => history.push('/formUsuario')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            }
                            {loadingUsers ? <tr><td colSpan="5" className="centerCircularProgress"><CircularProgress /></td></tr> 
                            : errorUsers ? <tr><td colSpan="5">Error cargando usuarios!</td></tr>  
                            : users && users.map(user => (
                                <tr key={user._id}>
                                <td>{user.usuario}</td>
                                <td>{user.estado ? "activo" : "inactivo"}</td>
                                <td>{user.personaDatos ? `${user.personaDatos.nombre} ${user.personaDatos.apellido}` : "N/A" }</td>
                                <td>{user.personaDatos ? user.personaDatos.email : "N/A" }</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        { userData.acciones.includes("Modificar usuario") && 
                                        <button className="btn-blue" onClick={() => history.push(`/formUsuario/${user._id}`)}><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        }
                                        { userData.acciones.includes("Eliminar usuario") && 
                                        <button className="btn-red" onClick={() => deleteUsuario(user._id)}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
                                        }
                                        { userData.acciones.includes("Resetear contraseña") && user.personaDatos &&
                                        <button className="btn-orange" onClick={() => resetearContraseña(user.personaDatos.email)}><FontAwesomeIcon icon='redo' className="fas fa-redo"/></button>
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

export default GestionUsuariosScreen