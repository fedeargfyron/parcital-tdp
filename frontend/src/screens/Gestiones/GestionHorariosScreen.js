import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import HeaderPage from '../../components/HeaderPage'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Horario from './HorariosComponents/Horario'
import { getHorarios } from '../../redux/ducks/horariosReducer'
import { CircularProgress } from '@material-ui/core'
import messageAdder from '../../MessageAdder'

const GestionHorariosScreen = () => {
    const dispatch = useDispatch()
    const [agregarHorario, setAgregarHorario] = useState(false)
    const [modoUpdate, setModoUpdate] = useState(false)
    const [horarioDatos, setHorariosDatos] = useState({})

    const horariosInfo = useSelector(state => state.horarios)
    const { loadingHorarios, errorHorarios, horarios} = horariosInfo

    const userInfo = useSelector(state => state.user)
    const { user } = userInfo
    useEffect(() => {
        dispatch(getHorarios())
    }, [dispatch])
    const deleteHorario = async (id) => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:4000/api/horarios/${id}`
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
                <HeaderPage titulo="Gestion de horarios"/>
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Horario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        { user && 
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    {agregarHorario ? 
                                    <Horario 
                                    setAgregarHorario={setAgregarHorario} 
                                    setModoUpdate={setModoUpdate} />
                                    : modoUpdate ? 
                                    <Horario 
                                    horario={horarioDatos} 
                                    setAgregarHorario={setAgregarHorario} 
                                    setModoUpdate={setModoUpdate} />
                                    : user.acciones.includes("Agregar horario") && 
                                    <div className="new-item-row">
                                        <button className="btn-green" 
                                        onClick={() => {
                                            setAgregarHorario(true)
                                            setModoUpdate(false)
                                            }}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                }
                                </td>
                            </tr>
                            { loadingHorarios ? <tr><td colSpan="2" className="centerCircularProgress"><CircularProgress /></td></tr>
                            : errorHorarios ? <tr><td colSpan="2">Error cargando horarios!</td></tr> 
                            : horarios && horarios.map(horario => (
                                <tr key={horario._id}>
                                    <td>{horario.hora}</td>
                                    <td>
                                        <div className="gestion-buttons-container">
                                            { user.acciones.includes("Modificar horario") && 
                                            <button className="btn-blue" onClick={() => {
                                                setHorariosDatos({
                                                    id: horario._id,
                                                    hora: horario.hora
                                                })
                                                setModoUpdate(true)
                                                setAgregarHorario(false)
                                            }}><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                            }
                                            { user.acciones.includes("Eliminar horario") && 
                                            <button className="btn-red" onClick={() => deleteHorario(horario._id)}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
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

export default GestionHorariosScreen