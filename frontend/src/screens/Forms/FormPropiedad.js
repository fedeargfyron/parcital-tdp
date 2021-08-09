import React, { useState, useEffect } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useParams } from 'react-router-dom'
import FormNewPropiedad from './FormPropiedadComponents/FormNewPropiedad'
import axios from 'axios'
import FormUpdatePropiedad from './FormPropiedadComponents/FormUpdatePropiedad'


const FormPropiedad = () => {
    const { id } = useParams()
    const [modoUpdate, setModoUpdate] = useState(false)

    useEffect(() => {
        if(id !== undefined)
            setModoUpdate(true)
    }, [id])

    const sendPropiedad = async (e, data) => {
        e.preventDefault()
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
        }).then(res => console.log(res))
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