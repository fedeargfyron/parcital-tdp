import React from 'react'
import '../../Styles/FormStyle.css'
import './PasswordModal.css'
const PasswordModal = ({setRecuperarPassword}) => {
    return (
        <div className="blackscreen">
            <div className="form-container contraseña-form">
                <h4 className="titlePasswordModal">¿Olvidaste tu contraseña?</h4>
                <i className="fas fa-times fa-times-password" onClick={() => setRecuperarPassword(false)}></i>
                <form className="form">
                    <input type="text" placeholder="E-mail" required></input>
                    <button className="btn enviar-btn" >Enviar</button>
                </form>
            </div>
        </div>
        
    )
}

export default PasswordModal