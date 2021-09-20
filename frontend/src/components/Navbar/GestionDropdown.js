import './GestionDropdown.css'
import React from 'react'
import { Link } from 'react-router-dom'

const GestionDropdown = ({onClickGestion, formularios}) => {
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