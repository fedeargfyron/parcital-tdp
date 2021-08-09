import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'
import Grupo from '../FormUsuarioComponents/Grupo'
import { useHistory } from 'react-router'
import { getUpdateUser } from '../../../redux/ducks/updateUserReducer'

const FormUpdateUsuario = ({id, sendUsuario}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [usuarioEstado, setUsuarioEstado] = useState(true)
    const [tabs, setTabs] = useState('Usuario')
    const gruposData = useSelector(state => state.grupos)
    const { loadingGrupos, errorGrupos, grupos } = gruposData
    const setUpdateUser = useSelector(state => state.updateUser)
    const { updateUser, loadingUpdateUser, errorUpdateUser } = setUpdateUser
    const [data, setData] = useState({
        usuario: '',
        estado: true,
        grupos: []
    })
    useEffect(() => {
        const handleUpdate = () => {
            let newData = actualizarData(updateUser)
            setUsuarioEstado(newData.estado)
            setData(newData)
        }
        if((updateUser === null && !loadingUpdateUser) || (updateUser && updateUser._id !== id))
            dispatch(getUpdateUser(id))
        if(updateUser)
            handleUpdate()
    }, [dispatch, id, updateUser, loadingUpdateUser])
    const handle = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    console.log(updateUser)
    const handleEstado = () => {
        setUsuarioEstado(!usuarioEstado)
        const newdata = {...data}
        newdata["estado"] = !usuarioEstado
        setData(newdata)
    }
    return(
        <form className="form-container" onSubmit={(e) => sendUsuario(e, data)}>
            <label className="form-title">Modificar usuario</label>
            <div className="encabezados">
                <button type="button" className={tabs === "Usuario" ? "active-btn" : ""} value="Usuario" onClick={() => setTabs("Usuario")}>Usuario</button>
                <button type="button" className={tabs === "Grupos" ? "active-btn" : ""} value="Grupos" onClick={() => setTabs("Grupos")}>Grupos</button>
            </div>
            <div className={tabs === "Usuario" ? "tab tab-usuario focused" : "tab tab-usuario" }>
                <p>Crear</p>
                { loadingUpdateUser ? <CircularProgress /> 
                : errorUpdateUser ? <h2>Error!</h2> 
                : updateUser && <>
                    <div className="inputs-container">
                    <input onChange={(e) => handle(e)} id='usuario' value={data.usuario} type="text" placeholder="Usuario" required/>
                    </div>
                    <div className="estado-check">
                        <div className={usuarioEstado ? "btn-green estado-checkbox" : "btn-red estado-checkbox"} onClick={() => handleEstado()}>
                            <FontAwesomeIcon icon={usuarioEstado ? 'check': 'times'} className={usuarioEstado ? "fas fa-check" : "fas fa-times"}/>
                        </div>
                        <p>Estado</p>
                    </div>
                </>}
            </div>
            <div className={tabs === "Grupos" ? "tab tab-usuario focused" : "tab tab-grupo" }>
                <p>Asignar</p>
                {loadingGrupos ? <CircularProgress /> 
                : errorGrupos ? <p>Error!</p> 
                : grupos && grupos.map(grupo => 
                <Grupo grupos={updateUser && updateUser.grupos} grupo={grupo} key={grupo._id}/> 
                )}
            </div>
            <div className="form-buttons-container">
                <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                <button type="button" className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
            </div>
        </form>
    )
}

const actualizarData = (updateUser) => {
    let newData
    if(!updateUser) return newData 
    newData = {
    usuario: updateUser.usuario,
    estado: updateUser.estado,
    grupos: updateUser.grupos
    }
    if(newData.grupos === undefined)
        newData.grupos = []
    return newData
}

export default FormUpdateUsuario