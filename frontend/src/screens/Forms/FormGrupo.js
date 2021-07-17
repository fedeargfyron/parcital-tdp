import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router'
import Modulo from './FormGrupoComponents/Modulo'
import Usuario from './FormGrupoComponents/Usuario'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FormGrupo = () => {
    const [modulos, setModulos] = useState()
    const [tabs, setTabs] = useState("Grupo")
    const [grupoEstado, setGrupoEstado] = useState(true)
    const history = useHistory()
    useEffect(() => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/acciones/modulos'
        }).then((res) => setModulos(res.data))
    }, [])
    const usuarios = [
        {
            id: 1,
            username: "Federico"
        },
        {
            id: 2,
            username: "Federico"
        },
        {
            id: 3,
            username: "Federico"
        }
    ]
    const getChecked = () => {
        let usuariosId = []
        let accionesId = []
        const usuarios = document.querySelectorAll('.usuarioChecked')
        const acciones = document.querySelectorAll('.accionChecked')
        acciones.forEach(accion => accionesId.push(accion.id))
        usuarios.forEach(usuario => usuariosId.push(usuario.id))
        console.log("Usuarios:", usuariosId, "Acciones:", accionesId)
    }
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Grupo"/>
                <div className="form-container tabs-container">
                    <label className="form-title">Agregar grupo</label>
                    <div className="encabezados">
                        <button className={tabs === "Grupo" ? "active-btn" : ""} value="Grupo" onClick={() => setTabs("Grupo")}>Grupo</button>
                        <button className={tabs === "Usuarios" ? "active-btn" : ""} value="Usuarios" onClick={() => setTabs("Usuarios")}>Usuarios</button>
                        <button className={tabs === "Acciones" ? "active-btn" : ""} value="Acciones" onClick={() => setTabs("Acciones")}>Acciones</button>
                    </div>
                    <div className={tabs === "Grupo" ? "tab tab-grupo focused" : "tab tab-grupo" }>
                        <p>Crear</p>
                        <div className="inputs-container">
                            <input type="text" placeholder="Nombre" required/>
                        </div>
                        <div className="inputs-container">
                            <textarea placeholder="Descripcion" required/>
                        </div>
                        <div className="estado-check">
                            <div className={grupoEstado ? "btn-green estado-checkbox" : "btn-red estado-checkbox"} onClick={() => setGrupoEstado(!grupoEstado)}>
                            <FontAwesomeIcon icon={grupoEstado ? 'check' : 'times'} className={grupoEstado ? "fas fa-check" : "fas fa-times"}/>
                            </div>
                            <p>Estado</p>
                        </div>
                    </div>
                    {/* ///////////////////////////////////////////////////////////////////// */}
                    <div className={tabs === "Usuarios" ? "tab tab-usuarios focused" : "tab tab-usuarios"}>
                        <p>Asignar</p>
                        <div className="usuarios-container" id="usuarios-container">
                            {usuarios.map(usuario => 
                                <Usuario usuario={usuario} key={usuario.id}/>
                            )}
                        </div>
                    </div>
                    {/* ///////////////////////////////////////////////////////////////////// */}
                    <div className={tabs === "Acciones" ? "tab tab-acciones focused" : "tab tab-acciones"}>
                        <p>Acciones</p>
                        {modulos && modulos.map(modulo => 
                            <Modulo modulo={modulo} key={modulo.id}/>
                        )}
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

export default FormGrupo