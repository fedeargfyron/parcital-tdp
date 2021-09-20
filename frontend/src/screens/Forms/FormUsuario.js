import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useParams } from 'react-router-dom'
import { getGrupos } from '../../redux/ducks/gruposReducer'
import FormNewUsuario from './FormUsuarioComponents/FormNewUsuario'
import FormUpdateUsuario from './FormUsuarioComponents/FormUpdateUsuario'
import messageAdder from '../../MessageAdder'

const FormUsuario = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [modoUpdate, setModoUpdate] = useState(false)
    useEffect(() => {
        if(id !== undefined)
            setModoUpdate(true)
        dispatch(getGrupos())
    }, [dispatch, id])
    const getCheckedData = (data) => {
        let gruposId = []
        const newdata ={...data}
        const grupos = document.querySelectorAll('.grupoChecked')
        grupos.forEach(grupo => gruposId.push(grupo.id))
        newdata['grupos'] = gruposId
        return newdata
    }

    const sendUsuario = async (e, data) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        let sendData = getCheckedData(data)
        let method
        let url
        if(modoUpdate){
            method = 'PUT'
            url = `http://localhost:4000/api/usuarios/${id}`
        }
        else{
            method = 'POST'
            url = 'http://localhost:4000/api/usuarios'
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
                <HeaderPage titulo="Usuario"/>
                {modoUpdate ? <FormUpdateUsuario id={id} sendUsuario={sendUsuario}/>
                : <FormNewUsuario sendUsuario={sendUsuario}/>}
            </div>
        </div>
    )
}

export default FormUsuario