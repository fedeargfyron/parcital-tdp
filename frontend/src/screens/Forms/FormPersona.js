import React, { useState } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router'

const FormPersona = () => {
    const [tipoPersona, setTipoPersona] = useState('Interesado')
    const history = useHistory()
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Persona"/>
                <form className="form-container">
                    <label className="form-title">Agregar persona</label>
                    <div className="inputs-container">
                        <input type="text" placeholder="Nombre" required/>
                        <input type="text" placeholder="Apellido" required/>
                    </div>
                    <div className="inputs-container">
                        <input type="text" placeholder="Telefono" required/>
                    </div>
                    <div className="inputs-container">
                        <input type="text" placeholder="E-mail" required/>
                    </div>
                    <div className="inputs-container">
                        <input type="text" placeholder="Domicilio" required/>
                    </div>
                    <div className="inputs-container">
                        <p>Usuario</p> 
                        <select>
                            <option>Seleccionar...</option>
                        </select>
                    </div>
                    <div className="inputs-container">
                        <p>Tipo de persona</p> 
                        <select onChange={(e) => setTipoPersona(e.target.value)}>
                            <option value="Interesado">Interesado</option>
                            <option value="Agente">Agente</option>
                            <option value="Dueño">Dueño</option>
                        </select>
                    </div>
                    <div className="inputs-container">
                        {tipoPersona === "Agente" && <input type="text" placeholder="Titulo" required/>}
                        {tipoPersona === "Dueño" && <input type="text" placeholder="Escritura" required/>}
                    </div>
                    <div className="inputs-container">
                        {tipoPersona === "Agente" && <input type="text" placeholder="CUIL" required/>}
                    </div>
                    {/* Falta table con horarios */}
                    <div className="form-buttons-container">
                        <button className="btn-green"><i className="fas fa-check"></i></button>
                        <button className="btn-red" onClick={() => history.goBack()}><i className="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormPersona