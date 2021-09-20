import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modulo from './Modulo'
import Usuario from './Usuario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router'
import { getGrupo } from '../../../redux/ducks/grupoReducer'

const FormUpdateGrupo = ({id, sendGrupo}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const usersInfo = useSelector(state => state.users)
    const ModulosInfo = useSelector(state => state.modulos)
    const grupoInfo = useSelector(state => state.grupo)
    const { users, loadingUsers, errorUsers } = usersInfo
    const { modulos, loadingModulos, errorModulos } = ModulosInfo
    const { grupo, loadingGrupo, errorGrupo } = grupoInfo
    const [render, setRender] = useState(true)
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

    useEffect(() => {
        const handleUpdate = () => {
            let newData = actualizarData(grupo)
            setGrupoEstado(newData.estado)
            setData(newData)
        }
        if(render){
            dispatch(getGrupo(id))
            setRender(false)
        }
        if(grupo)
            handleUpdate()
    }, [dispatch, id, grupo, render])
    return(
        <form className="form-container tabs-container" onSubmit={(e) => sendGrupo(e, data, grupo)}>
            <label className="form-title">Modificar grupo</label>
            <div className="encabezados">
                <button type='button' className={tabs === "Grupo" ? "active-btn" : ""} value="Grupo" onClick={() => setTabs("Grupo")}>Grupo</button>
                <button type='button' className={tabs === "Usuarios" ? "active-btn" : ""} value="Usuarios" onClick={() => setTabs("Usuarios")}>Usuarios</button>
                <button type='button' className={tabs === "Acciones" ? "active-btn" : ""} value="Acciones" onClick={() => setTabs("Acciones")}>Acciones</button>
            </div>
            <div className={tabs === "Grupo" ? "tab tab-grupo focused" : "tab tab-grupo" }>
                <p>Modificar</p>
                { loadingGrupo ? <CircularProgress /> 
                : errorGrupo ? <h2>Error!</h2> 
                : grupo && <>
                    <div className="inputs-container">
                        <input onChange={(e) => handle(e)} value={data.nombre} id="nombre" type="text" placeholder="Nombre" required/>
                    </div>
                    <div className="inputs-container">
                        <textarea onChange={(e) => handle(e)} value={data.descripcion} id="descripcion" placeholder="Descripcion" required/>
                    </div>
                    <div className="estado-check">
                        <div className={grupoEstado ? "btn-green estado-checkbox" : "btn-red estado-checkbox"} onClick={() => handleEstado()}>
                        <FontAwesomeIcon icon={grupoEstado ? 'check' : 'times'} className={grupoEstado ? "fas fa-check" : "fas fa-times"}/>
                        </div>
                        <p>Estado</p>
                    </div>
                </>}
                
            </div>
            {/* ///////////////////////////////////////////////////////////////////// */}
            <div className={tabs === "Usuarios" ? "tab tab-usuarios focused" : "tab tab-usuarios"}>
                <p>Asignar</p>
                <div className="usuarios-container" id="usuarios-container">
                    {loadingUsers ? <CircularProgress/> 
                    : errorUsers ? <p>Ocurrió un error cargando los usuarios</p> 
                    : users && users.map(usuario => 
                        <Usuario usuarios={grupo && grupo.usuarios} usuario={usuario} key={usuario._id}/>
                    )}
                </div>
            </div>
            {/* ///////////////////////////////////////////////////////////////////// */}
            <div className={tabs === "Acciones" ? "tab tab-acciones focused" : "tab tab-acciones"}>
                <p>Acciones</p>
                {loadingModulos ? <CircularProgress/> 
                : errorModulos ? <p>Ocurrió un error cargando los modulos</p> 
                : modulos && modulos.map(modulo => 
                    <Modulo modulo={modulo} grupo={grupo} key={modulo.id}/>
                )}
            </div>
            <div className="form-buttons-container">
                <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                <button type='button' className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
            </div>
        </form>
    )
} 

const actualizarData = (grupo) => {
    let newData
    if(!grupo) return newData 
    newData = {
        nombre: grupo.nombre,
        descripcion: grupo.descripcion,
        estado: grupo.estado,
        acciones: grupo.acciones,
        usuarios: grupo.usuarios
    }
    return newData
}

export default FormUpdateGrupo