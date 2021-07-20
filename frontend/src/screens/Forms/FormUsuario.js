import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import Grupo from './FormUsuarioComponents/Grupo'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getGrupos } from '../../redux/ducks/gruposReducer'
import { CircularProgress } from '@material-ui/core'
const FormUsuario = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [usuarioEstado, setUsuarioEstado] = useState(true)
    const [tabs, setTabs] = useState('Usuario')
    const gruposData = useSelector(state => state.grupos)
    const { loadingGrupos, errorGrupos, grupos } = gruposData
    const [data, setData] = useState({
        usuario: '',
        estado: true,
        grupos: []
    })
    useEffect(() => {
        dispatch(getGrupos())
    }, [dispatch])
    const handle = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    
    const handleEstado = () => {
        setUsuarioEstado(!usuarioEstado)
        const newdata = {...data}
        newdata["estado"] = !usuarioEstado
        setData(newdata)
    }
    
    const getCheckedData = () => {
        let gruposId = []
        const newdata ={...data}
        const grupos = document.querySelectorAll('.grupoChecked')
        grupos.forEach(grupo => gruposId.push(grupo.id))
        newdata['grupos'] = gruposId
        setData(newdata)
        return newdata
    }

    const sendUsuario = async (e) => {
        e.preventDefault()
        let sendData = getCheckedData()
        await axios({
            method: 'POST',
            withCredentials: true,
            data: sendData,
            url: 'http://localhost:4000/api/usuarios'
        }).then(res => console.log(res))
    }
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Usuario"/>
                <form className="form-container" onSubmit={(e) => sendUsuario(e)}>
                    <label className="form-title">Agregar usuario</label>
                    <div className="encabezados">
                        <button type="button" className={tabs === "Usuario" ? "active-btn" : ""} value="Usuario" onClick={() => setTabs("Usuario")}>Usuario</button>
                        <button type="button" className={tabs === "Grupos" ? "active-btn" : ""} value="Grupos" onClick={() => setTabs("Grupos")}>Grupos</button>
                    </div>
                    <div className={tabs === "Usuario" ? "tab tab-usuario focused" : "tab tab-usuario" }>
                        <p>Crear</p>
                        <div className="inputs-container">
                            <input onChange={(e) => handle(e)} id='usuario' type="text" placeholder="Usuario" required/>
                        </div>
                        <div className="estado-check">
                            <div className={usuarioEstado ? "btn-green estado-checkbox" : "btn-red estado-checkbox"} onClick={() => handleEstado()}>
                                <FontAwesomeIcon icon={usuarioEstado ? 'check': 'times'} className={usuarioEstado ? "fas fa-check" : "fas fa-times"}/>
                            </div>
                            <p>Estado</p>
                        </div>
                    </div>
                    <div className={tabs === "Grupos" ? "tab tab-usuario focused" : "tab tab-grupo" }>
                        <p>Asignar</p>
                        {loadingGrupos ? <CircularProgress /> 
                        : errorGrupos ? <p>Error!</p> 
                        : grupos && grupos.map(grupo => 
                        <Grupo grupo={grupo} key={grupo._id}/> 
                        )}
                    </div>
                    <div className="form-buttons-container">
                        <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                        <button type="button" className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormUsuario