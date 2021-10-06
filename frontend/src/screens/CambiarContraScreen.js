import React, { useState } from 'react'
import '../Styles/FormStyle.css'
import './CambiarContraScreen.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import messageAdder from '../MessageAdder'
const CambiarContraScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        actual: "",
        nueva: "",
        nuevaRepetida: ""
    })
    console.log(data)
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }


    const cambiarContraseña = async (e) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'POST',
            withCredentials: true,
            data: data,
            url: `http://localhost:4000/api/usuarios/updatePassword`
        }).then((res) => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
            if(res.data.type !== "danger")
                history.push('/perfil')
        })
    }
    
    return(
        <div className="CambiarContraScreen">
            <div className="form-container">
                <h4 className="titlePasswordChange">Cambiar contraseña</h4>
                <form className="form" onSubmit={(e) => cambiarContraseña(e)}>
                    <input id="actual" onChange={(e) => handle(e)} type="password" placeholder="Contraseña actual" required/>
                    <input id="nueva" onChange={(e) => handle(e)} type="password" placeholder="Contraseña nueva" required/>
                    <input id="nuevaRepetida" onChange={(e) => handle(e)} type="password" placeholder="Repetir contraseña nueva" required/>
                    <button className="btn cambiarContra-btn">Guardar</button>
                </form>
            </div>
        </div>
        
    )
}

export default CambiarContraScreen