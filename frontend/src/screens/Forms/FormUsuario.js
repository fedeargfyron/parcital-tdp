import React, { useState } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import Grupo from './FormUsuarioComponents/Grupo'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const FormUsuario = () => {
    const history = useHistory()
    const [usuarioEstado, setUsuarioEstado] = useState(true)
    const [tabs, setTabs] = useState('Usuario')
    const grupos = [
        {
            id: 1,
            nombre: "Admins"
        },
        {
            id: 2,
            nombre: "ASDASD"
        },
        {
            id: 3,
            nombre: "xd"
        }
    ]
    const getChecked = () => {
        let gruposId = []
        const grupos = document.querySelectorAll('.grupoChecked')
        grupos.forEach(grupo => gruposId.push(grupo.id))
        console.log("Grupos:", gruposId)
    }
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Usuario"/>
                <div className="form-container">
                    <label className="form-title">Agregar usuario</label>
                    <div className="encabezados">
                        <button className={tabs === "Usuario" ? "active-btn" : ""} value="Usuario" onClick={() => setTabs("Usuario")}>Usuario</button>
                        <button className={tabs === "Grupos" ? "active-btn" : ""} value="Grupos" onClick={() => setTabs("Grupos")}>Grupos</button>
                    </div>
                    <div className={tabs === "Usuario" ? "tab tab-usuario focused" : "tab tab-usuario" }>
                        <p>Crear</p>
                        <div className="inputs-container">
                            <input type="text" placeholder="Usuario" required/>
                        </div>
                        <div className="inputs-container">
                            <input type="text" placeholder="Nombre" required/>
                            <input type="text" placeholder="Apellido" required/>
                        </div>
                        <div className="inputs-container">
                            <input type="text" placeholder="E-mail" required/>
                        </div>
                        <div className="estado-check">
                            <div className={usuarioEstado ? "btn-green estado-checkbox" : "btn-red estado-checkbox"} onClick={() => setUsuarioEstado(!usuarioEstado)}>
                                <FontAwesomeIcon icon={usuarioEstado ? 'check': 'times'} className={usuarioEstado ? "fas fa-check" : "fas fa-times"}/>
                            </div>
                            <p>Estado</p>
                        </div>
                    </div>
                    <div className={tabs === "Grupos" ? "tab tab-usuario focused" : "tab tab-grupo" }>
                        <p>Asignar</p>
                        {grupos && grupos.map(grupo => <Grupo grupo={grupo} key={grupo.id}/> )}
                    </div>
                    <div className="form-buttons-container">
                        <button className="btn-green" onClick={() => getChecked()}><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                        <button className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormUsuario