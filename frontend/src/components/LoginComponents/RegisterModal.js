import React, { useState } from 'react'
import '../../Styles/FormStyle.css'
import './RegisterModal.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const RegisterModal = ({setRegister}) => {
    const [data, setData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        domicilio: "",
        usuario: "",
        contraseña: ""
    })
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const sendRegister = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            data: data,
            withCredentials: true,
            url: 'http://localhost:4000/api/personas/registrar'
        }).then({

        })
    }

    return(
        <div className="blackscreen">
            <div className="form-container register-form">
                <h4 className="titleRegister">Registrarse</h4>
                <FontAwesomeIcon icon={"times"} className="fas fa-times fa-times-register" onClick={() => setRegister(false)}/>
                <form className="form" onSubmit={e => sendRegister(e)}>
                    <div className="input-container">
                        <input onChange={e => handle(e)} className="input" type="text" placeholder="Nombre" required value={data.nombre} id="nombre"/>
                        <input onChange={e => handle(e)} className="input" type="text" placeholder="Apellido" required value={data.apellido} id="apellido"/>
                    </div>
                    <input onChange={e => handle(e)} type="text" placeholder="Telefono" required value={data.telefono} id="telefono"/>
                    <input onChange={e => handle(e)} type="text" placeholder="E-mail" required value={data.email} id="email"/>
                    <input onChange={e => handle(e)} type="text" placeholder="Domicilio" required value={data.domicilio} id="domicilio"/>
                    <input onChange={e => handle(e)} type="text" placeholder="Usuario" required value={data.usuario} id="usuario"/>
                    <input onChange={e => handle(e)} type="password" placeholder="Contraseña" required value={data.contraseña} id="contraseña"/>
                    <button className="btn register-btn">Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterModal