import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router'
import Modulo from './FormGrupoComponents/Modulo'
import Usuario from './FormGrupoComponents/Usuario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUsers } from '../../redux/ducks/usersReducer'
import { getModulos } from '../../redux/ducks/modulosReducer'
import { CircularProgress } from '@material-ui/core'

const FormGrupo = () => {
    const dispatch = useDispatch()
    const usersInfo = useSelector(state => state.users)
    const ModulosInfo = useSelector(state => state.modulos)
    const { users, loadingUsers, errorUsers } = usersInfo
    const { modulos, loadingModulos, errorModulos } = ModulosInfo
    const [tabs, setTabs] = useState("Grupo")
    const [grupoEstado, setGrupoEstado] = useState(true)
    const history = useHistory()
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getModulos())
    }, [dispatch])

    const [data, setData] = useState({
        nombre: '',
        descripcion: '',
        estado: true,
        acciones: [],
        usuarios: []
    })
    const getChecked = () => {
        let usuariosId = []
        let accionesId = []
        const newdata ={...data}
        const usuarios = document.querySelectorAll('.usuarioChecked')
        const acciones = document.querySelectorAll('.accionChecked')
        acciones.forEach(accion => accionesId.push(accion.id))
        usuarios.forEach(usuario => usuariosId.push(usuario.id))
        newdata['acciones'] = accionesId
        newdata['usuarios'] = usuariosId
        setData(newdata)
        return newdata
    }

    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const handleEstado = () => {
        setGrupoEstado(!grupoEstado)
        const newdata = {...data}
        newdata["estado"] = !grupoEstado
        setData(newdata)
    }

    const sendGrupo = async (e) => {
        e.preventDefault()
        let sendData = getChecked()
        await axios({
            method: 'POST',
            withCredentials: true,
            data: sendData,
            url: 'http://localhost:4000/api/grupos'
        }).then(res => console.log(res))
    }
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Grupo"/>
                <form className="form-container tabs-container" onSubmit={(e) => sendGrupo(e)}>
                    <label className="form-title">Agregar grupo</label>
                    <div className="encabezados">
                        <button type='button' className={tabs === "Grupo" ? "active-btn" : ""} value="Grupo" onClick={() => setTabs("Grupo")}>Grupo</button>
                        <button type='button' className={tabs === "Usuarios" ? "active-btn" : ""} value="Usuarios" onClick={() => setTabs("Usuarios")}>Usuarios</button>
                        <button type='button' className={tabs === "Acciones" ? "active-btn" : ""} value="Acciones" onClick={() => setTabs("Acciones")}>Acciones</button>
                    </div>
                    <div className={tabs === "Grupo" ? "tab tab-grupo focused" : "tab tab-grupo" }>
                        <p>Crear</p>
                        <div className="inputs-container">
                            <input onChange={(e) => handle(e)} id="nombre" type="text" placeholder="Nombre" required/>
                        </div>
                        <div className="inputs-container">
                            <textarea onChange={(e) => handle(e)} id="descripcion" placeholder="Descripcion" required/>
                        </div>
                        <div className="estado-check">
                            <div className={grupoEstado ? "btn-green estado-checkbox" : "btn-red estado-checkbox"} onClick={() => handleEstado()}>
                            <FontAwesomeIcon icon={grupoEstado ? 'check' : 'times'} className={grupoEstado ? "fas fa-check" : "fas fa-times"}/>
                            </div>
                            <p>Estado</p>
                        </div>
                    </div>
                    {/* ///////////////////////////////////////////////////////////////////// */}
                    <div className={tabs === "Usuarios" ? "tab tab-usuarios focused" : "tab tab-usuarios"}>
                        <p>Asignar</p>
                        <div className="usuarios-container" id="usuarios-container">
                            {loadingUsers ? <CircularProgress/> 
                            : errorUsers ? <p>Ocurrió un error cargando los usuarios</p> 
                            : users && users.map(usuario => 
                                <Usuario usuario={usuario} key={usuario._id}/>
                            )}
                        </div>
                    </div>
                    {/* ///////////////////////////////////////////////////////////////////// */}
                    <div className={tabs === "Acciones" ? "tab tab-acciones focused" : "tab tab-acciones"}>
                        <p>Acciones</p>
                        {loadingModulos ? <CircularProgress/> 
                        : errorModulos ? <p>Ocurrió un error cargando los modulos</p> 
                        : modulos && modulos.map(modulo => 
                            <Modulo modulo={modulo} key={modulo.id}/>
                        )}
                    </div>
                    <div className="form-buttons-container">
                        <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                        <button type='button' className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormGrupo