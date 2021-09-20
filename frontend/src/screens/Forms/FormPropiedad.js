import React, { useState, useEffect } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import FormNewPropiedad from './FormPropiedadComponents/FormNewPropiedad'
import axios from 'axios'
import FormUpdatePropiedad from './FormPropiedadComponents/FormUpdatePropiedad'
import messageAdder from '../../MessageAdder'


const FormPropiedad = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [modoUpdate, setModoUpdate] = useState(false)

    useEffect(() => {
        if(id)
            setModoUpdate(true)
    }, [id])

    const sendPropiedad = async (e, data) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })

        let method
        let url
        if(modoUpdate){
            method = 'PUT'
            url = `http://localhost:4000/api/propiedades/${id}`
        }
        else{
            method = 'POST'
            url = 'http://localhost:4000/api/propiedades'
        }
            
        await axios({
            method:method,
            withCredentials: true,
            data: data,
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
                <HeaderPage titulo="Propiedad"/>
                {modoUpdate 
                ? <FormUpdatePropiedad id={id} sendPropiedad={sendPropiedad}/>
                : <FormNewPropiedad sendPropiedad={sendPropiedad}/>
                }
            </div>
        </div>
    )
}

export default FormPropiedad