import React, { useState } from 'react'
import axios from 'axios'
import '../../Styles/FormStyle.css'
import './PasswordModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const PasswordModal = ({setRecuperarPassword}) => {
    const [data, setData] = useState({
        email: ""
    })
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const sendEmail = (e) => {
        e.preventDefault()
        axios({
            //recuperar email
        }).then({

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