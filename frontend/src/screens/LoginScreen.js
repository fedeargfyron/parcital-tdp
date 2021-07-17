import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUser } from '../redux/ducks/userReducer'
import '../Styles/FormStyle.css'
import './LoginScreen.css'
import RegisterModal from '../components/LoginComponents/RegisterModal'
import PasswordModal from '../components/LoginComponents/PasswordModal'
import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
const LoginScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const [recuperarPassword, setRecuperarPassword] = useState(false)
    const [register, setRegister] = useState(false)
    const sendLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        axios({
            method: 'POST',
            data: data,
            withCredentials: true,
            url: 'http://localhost:4000/api/logUser'
        }).then( async () => {
            await dispatch(getUser())
            history.push('/')
        })
    }
    return(
        <div className="LoginScreen">
            <div className="form-container">
                <h4 className="titleLogin">Inicio de sesión</h4>
                {loading && <CircularProgress />}
                <form className="form" onSubmit={(e) => sendLogin(e)}>
                    <input onChange={e => handle(e)} type="text" placeholder="Usuario" id="username" value={data.usuario} required/>
                    <input onChange={e => handle(e)} type="text" placeholder="Contraseña" id="password" value={data.contraseña} required/>
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