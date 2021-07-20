import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUsersDisponibles } from '../../redux/ducks/usersDisponiblesReducer'
import SelectUsuario from './FormPersonaComponents/SelectUsuario'
import axios from 'axios'

const FormPersona = () => {
    const dispatch = useDispatch()
    const getUsers = useSelector(state => state.usersDisponibles)
    const { loading, usersDisponibles, error} = getUsers
    useEffect(() => {
        dispatch(getUsersDisponibles())
    }, [dispatch])
    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        domicilio: '',
        usuario: '',
        tipoPersona: '',
        escritura: '',
        titulo: '',
        cuil: ''
    })

    const sendPersona = async (e) => {
        e.preventDefault()
        await axios({
            method:'POST',
            withCredentials: true,
            data: data,
            url: 'http://localhost:4000/api/personas'
        }).then(res => console.log(res))
    }
    
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const handleUsuario = (e) => {
        const newdata ={...data}
        newdata['usuario'] = e.target.id
        setData(newdata)
    }

    const handleTipoPersona = (e) => {
        const newdata ={...data}
        newdata['tipoPersona'] = e.target.value
        setData(newdata)
    }

    const history = useHistory()
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Persona"/>
                <form className="form-container" onSubmit={(e) => sendPersona(e)}>
                    <label className="form-title">Agregar persona</label>
                    <div className="inputs-container">
                        <input onChange={(e) => handle(e)} id="nombre" type="text" placeholder="Nombre" required/>
                        <input onChange={(e) => handle(e)} type="text" id="apellido" placeholder="Apellido" required/>
                    </div>
                    <div className="inputs-container">
                        <input onChange={(e) => handle(e)} type="text" id="telefono" placeholder="Telefono" required/>
                    </div>
                    <div className="inputs-container">
                        <input onChange={(e) => handle(e)} type="text" id="email" placeholder="E-mail" required/>
                    </div>
                    <div className="inputs-container">
                        <input onChange={(e) => handle(e)} type="text" id="domicilio" placeholder="Domicilio" required/>
                    </div>
                    <div className="inputs-container">
                        <p>Usuario</p> 
                        <select onChange={(e) => handleUsuario(e)}>
                            <option>Seleccionar...</option>
                            {loading ? <option>Cargando usuarios...</option> 
                            : error ? <option>Error obteniendo usuarios</option> 
                            : usersDisponibles && usersDisponibles.map(user => 
                                <SelectUsuario {...user} />
                            )}
                        </select>
                    </div>
                    <div className="inputs-container">
                        <p>Tipo de persona</p> 
                        <select onChange={(e) => handleTipoPersona(e)}>
                            <option value="Interesado">Interesado</option>
                            <option value="Agente">Agente</option>
                            <option value="Dueño">Dueño</option>
                        </select>
                    </div>
                    <div className="inputs-container">
                        {data.tipoPersona === "Agente" && <input onChange={(e) => handle(e)} type="text" id='titulo' placeholder="Titulo"/>}
                        {data.tipoPersona === "Dueño" && <input onChange={(e) => handle(e)} type="text" id='escritura' placeholder="Escritura"/>}
                    </div>
                    <div className="inputs-container">
                        {data.tipoPersona === "Agente" && <input onChange={(e) => handle(e)} type="text" id='cuil' placeholder="CUIL"/>}
                    </div>
                    {/* Falta table con horarios */}
                    <div className="form-buttons-container">
                        <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                        <button className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times'className="fas fa-times"/></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormPersona