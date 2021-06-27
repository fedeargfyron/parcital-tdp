import './GestionDropdown.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const GestionDropdown = ({onClickGestion}) => {
    //axios.get(formularios de usuario sin propiedad)
    const [formularios, setFormularios] = useState([
        {
            nombre: "Gestionar propiedades",
            url: '/gestion/propiedades'
        },
        {
            nombre: "Gestionar usuarios",
            url: '/gestion/usuarios'
        },
        {
            nombre: "Gestionar horarios",
            url: '/gestion/horarios'
        },
        {
            nombre: "Gestionar personas",
            url: '/gestion/personas'
        }
    ])
    return(
        <>
            <ul onClick={onClickGestion}  className={'gestion-dropdown-menu'}>
                {formularios.map(formulario => {
                    return (
                    <li>
                        <Link className="dropdown-link" to ={formulario.url}>
                            {formulario.nombre}
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </>
    )
}

export default GestionDropdown