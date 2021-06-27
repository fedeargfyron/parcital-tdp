import React, { useState } from 'react'
import '../Styles/FormStyle.css'
import './LoginScreen.css'
import RegisterModal from '../components/LoginComponents/RegisterModal'
import PasswordModal from '../components/LoginComponents/PasswordModal'
const LoginScreen = () => {
    const [recuperarPassword, setRecuperarPassword] = useState(false)
    const [register, setRegister] = useState(false)
    return(
        <div className="LoginScreen">
            <div className="form-container">
                <h4 className="titleLogin">Inicio de sesión</h4>
                <form className="form">
                    <input type="text" placeholder="Usuario" required></input>
                    <input type="text" placeholder="Contraseña" required></input>
                    <button className="btn">Iniciar sesión</button>
                </form>
                <p className="forgotPassword" onClick={() => setRecuperarPassword(true)}>¿Olvidaste tu contraseña?</p>
                <div className="line"></div>
                <button className="btn register" onClick={() => setRegister(true)}>Registrarse</button>
            </div>
            {recuperarPassword && <PasswordModal setRecuperarPassword={setRecuperarPassword}/>}
            {register && <RegisterModal setRegister={setRegister}/>}
        </div>
    )
}

export default LoginScreen