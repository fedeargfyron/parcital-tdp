import React, { useState, useEffect } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import FormNewPersona from './FormPersonaComponents/FormNewPersona'
import FormUpdatePersona from './FormPersonaComponents/FormUpdatePersona'
import messageAdder from '../../MessageAdder'

const FormPersona = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [modoUpdate, setModoUpdate] = useState(false)
    const [render, setRender] = useState(false)
    useEffect(() => {
        if(id)
            setModoUpdate(true)
        setRender(true)
    }, [id, setRender])
    const getChecked = (data) => {
        let horariosId = []
        const newdata ={...data}
        const horarios = document.querySelectorAll('.checked')
        horarios.forEach(horario => horariosId.push(horario.id))
        newdata['horarios'] = horariosId
        return newdata
    }

    const sendPersona = async (e, data) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        let sendData = getChecked(data)
        let method
        let url
        if(modoUpdate){
            method = 'PUT'
            url = `http://localhost:4000/api/personas/${id}`
        }
        else{
            method = 'POST'
            url = 'http://localhost:4000/api/personas'
        }

        await axios({
            method:method,
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
                <HeaderPage titulo="Persona"/>
                {render ? modoUpdate 
                    ? <FormUpdatePersona id={id} sendPersona={sendPersona}/>
                    : <FormNewPersona sendPersona={sendPersona}/>
                : <></>
                }
            </div>
        </div>
    )
}

export default FormPersona