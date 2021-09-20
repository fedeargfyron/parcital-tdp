import React, { useState } from 'react'
import axios from 'axios'
import '../../Styles/FormStyle.css'
import './PasswordModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import messageAdder from '../../MessageAdder'
const PasswordModal = ({setRecuperarPassword}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: ""
    })
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const sendEmail = async (e) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'POST',
            params: {
                email: data.email
            },
            withCredentials: true,
            url: 'http://localhost:4000/api/usuarios/resetPassword'
        }).then((res) => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    
    }
    return (
        <div className="blackscreen">
            <div className="form-container contraseña-form">
                <h4 className="titlePasswordModal">¿Olvidaste tu contraseña?</h4>
                <FontAwesomeIcon icon={"times"} className="fas fa-times fa-times-password" onClick={() => setRecuperarPassword(false)}/>
                <form className="form" onSubmit={sendEmail}>
                    <input onChange={e => handle(e)} id="email" type="text" placeholder="E-mail" value={data.email} required></input>
                    <button className="btn enviar-btn" >Enviar</button>
                </form>
            </div>
        </div>
        
    )
}

export default PasswordModal