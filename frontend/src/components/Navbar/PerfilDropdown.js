import { Link } from "react-router-dom"
import React, {useState} from 'react'
import './PerfilDropdown.css'

const PerfilDropdown = () => {
    const [user, setUser] = useState("as")
    return(
        <>
            <ul className="perfil-dropdown-menu">
                <li>
                    <Link className="dropdown-link" to ="/perfil">
                        Perfil
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ="/visitas">
                        Visitas
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ="/ofertas">
                        Ofertas
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ="/reservas">
                        Reservas
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ="/compras">
                        Compras
                    </Link>
                </li>
                {user.tipo === "Dueño" &&
                <li>
                    <Link className="dropdown-link" to ="/misPropiedades">
                        Mis propiedades
                    </Link>
                </li>
                }
            </ul>
        </>
    )
}

export default PerfilDropdown