import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Modulo from './Modulo'
import Usuario from './Usuario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router'
const FormNewGrupo = ({sendGrupo}) => {
    const history = useHistory()
    const usersInfo = useSelector(state => state.users)
    const ModulosInfo = useSelector(state => state.modulos)
    const { users, loadingUsers, errorUsers } = usersInfo
    const { modulos, loadingModulos, errorModulos } = ModulosInfo
    const [tabs, setTabs] = useState("Grupo")
    const [grupoEstado, setGrupoEstado] = useState(true)

    const [data, setData] = useState({
        nombre: '',
        descripcion: '',
        estado: true,
        acciones: [],
        usuarios: []
    })

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
    return (
        <form className="form-container tabs-container" onSubmit={(e) => sendGrupo(e, data)}>
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
                    : errorUsers ? <p>Ocurri?? un error cargando los usuarios</p> 
                    : users && users.map(usuario => 
                        <Usuario usuario={usuario} key={usuario._id}/>
                    )}
                </div>
            </div>
            {/* ///////////////////////////////////////////////////////////////////// */}
            <div className={tabs === "Acciones" ? "tab tab-acciones focused" : "tab tab-acciones"}>
                <p>Acciones</p>
                {loadingModulos ? <CircularProgress/> 
                : errorModulos ? <p>Ocurri?? un error cargando los modulos</p> 
                : modulos && modulos.map(modulo => 
                    <Modulo modulo={modulo} key={modulo._id}/>
                )}
            </div>
            <div className="form-buttons-container">
                <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                <button type='button' className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
            </div>
        </form>
    )
}

export default FormNewGrupo