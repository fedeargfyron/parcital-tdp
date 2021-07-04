import React from 'react'
import '../../Styles/FormStyle.css'
import './RegisterModal.css'
const RegisterModal = ({setRegister}) => {
    return(
        <div className="blackscreen">
            <div className="form-container register-form">
                <h4 className="titleRegister">Registrarse</h4>
                <i className="fas fa-times fa-times-register" onClick={() => setRegister(false)}></i>
                <form className="form">
                    <div className="input-container">
                        <input className="input" type="text" placeholder="Nombre" required/>
                        <input className="input" type="text" placeholder="Apellido" required/>
                    </div>
                    <input type="text" placeholder="Telefono" required/>
                    <input type="text" placeholder="E-mail" required/>
                    <input type="text" placeholder="Usuario" required/>
                    <input type="text" placeholder="Contraseña" required/>
                    <button className="btn register-btn">Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterModal