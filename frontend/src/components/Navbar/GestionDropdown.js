import './GestionDropdown.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const GestionDropdown = ({onClickGestion}) => {
    //axios.get(formularios de usuario sin propiedad)
    //obtene acciones del usuario, --> busque los formularios a los que pertenece
    //acciones ----- formularios 
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
        },
        {
            nombre: "Gestionar grupos",
            url: '/gestion/grupos'
        },
        {
            nombre: "Gestionar ventas",
            url: '/gestion/ventas'
        },
        {
            nombre: "Gestionar ofertas",
            url: '/gestion/ofertas'
        },
        {
            nombre: "Gestionar servicios de venta",
            url: '/gestion/serviciosVenta'
        },
    ])
    return(
        <>
            <ul onClick={onClickGestion}  className={'gestion-dropdown-menu'}>
                {formularios.map(formulario => {
                    return (
                    <li key={formulario.nombre}>
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