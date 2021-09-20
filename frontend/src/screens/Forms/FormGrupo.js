import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './Forms.css'
import { useParams } from 'react-router-dom'
import HeaderPage from '../../components/HeaderPage'
import { getUsers } from '../../redux/ducks/usersReducer'
import { getModulos } from '../../redux/ducks/modulosReducer'
import FormNewGrupo from './FormGrupoComponents/FormNewGrupo'
import FormUpdateGrupo from './FormGrupoComponents/FormUpdateGrupo'
import messageAdder from '../../MessageAdder'
const FormGrupo = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [modoUpdate, setModoUpdate] = useState(false)

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getModulos())
        if(id)
            setModoUpdate(true)
    }, [dispatch, id])
    const getChecked = (data) => {
        let usuariosId = []
        let accionesId = []
        const newdata ={...data}
        const usuarios = document.querySelectorAll('.usuarioChecked')
        const acciones = document.querySelectorAll('.accionChecked')
        acciones.forEach(accion => accionesId.push(accion.id))
        usuarios.forEach(usuario => usuariosId.push(usuario.id))
        newdata['acciones'] = accionesId
        newdata['usuarios'] = usuariosId
        return newdata
    }

    const sendGrupo = async (e, data, grupoViejo) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        let sendData = getChecked(data)
        sendData.grupoViejo = grupoViejo
        let method
        let url
        if(modoUpdate){
            method = 'PUT'
            url = `http://localhost:4000/api/grupos/${id}`
        }
        else{
            method = 'POST'
            url = 'http://localhost:4000/api/grupos'
        }
        await axios({
            method: method,
            withCredentials: true,
            data: sendData,
            url: url
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Grupo"/>
                {modoUpdate ? <FormUpdateGrupo id={id} sendGrupo={sendGrupo} /> 
                : <FormNewGrupo sendGrupo={sendGrupo}/> }
            </div>
        </div>
    )
}

export default FormGrupo