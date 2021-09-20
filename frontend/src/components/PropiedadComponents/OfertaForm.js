import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './OfertaForm.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import messageAdder from '../../MessageAdder'
const OfertaForm = ({setOfertaForm, propiedad, servicio}) => {
    const dispatch = useDispatch()
    const [oferta, setOferta] = useState("")
    const enviarOferta = async (e) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'POST',
            data: {
                oferta: oferta,
                propiedad: propiedad,
                servicio: servicio
            },
            url: 'http://localhost:4000/api/ofertas',
            withCredentials: true
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return(
        <div className="blackscreen-Oferta blackscreen">
            <form className="oferta-form" onSubmit={(e) => enviarOferta(e)}>
                <FontAwesomeIcon icon={'times'} className="fa-times cerrarBtn" onClick={() => setOfertaForm(false)}/>
                <h4 className="oferta-form-title">Oferta por esta propiedad</h4>
                <input onChange={(e) => setOferta(e.target.value)} className="" placeholder="4000.00"type="text"/>
                <button className="btn">Enviar</button>
            </form>
        </div>
    )
}

export default OfertaForm