import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import GestionDropdown from "./GestionDropdown"
import PerfilDropdown from "./PerfilDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const NavbarItems = ({user, click, setClick}) => {
    const [perfilDropdown, setPerfilDropdown] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [gestionDropdown, setGestionDropdown] = useState(false)
    const [formularios, setFormularios] = useState(["2"])

    const onClickGestion = () => {
        window.innerWidth < 960 ? setGestionDropdown(false) : setGestionDropdown(!gestionDropdown)
    }
    const onMouseEnterVenta = () => {
        window.innerWidth < 960 ? setDropdown(false) : setDropdown(true)
    }
    const onMouseLeaveVenta = () => {
        setDropdown(false)
    }
    const onMouseEnterPerfil = () => {
        window.innerWidth < 960 ? setPerfilDropdown(false) : setPerfilDropdown(true)
    }
    const onMouseLeavePerfil = () => {
        setPerfilDropdown(false)
    }
    const closeMenu = () => {
        setClick(false)
        gestionDropdown && setGestionDropdown(false)
        dropdown && setDropdown(false)
    }
    return(
        <ul onClick={closeMenu} className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item venta" onMouseEnter={onMouseEnterVenta} onMouseLeave={onMouseLeaveVenta}>
                <Link to="/propiedades/venta" className="nav-links" >
                    Venta <FontAwesomeIcon icon="caret-down"/>
                </Link>
                {dropdown && <Dropdown/>}
            </li>
            <li className="nav-item">
                <Link to="/" className="nav-links">
                    Inicio
                </Link>
            </li>
            {!user &&
                <li className="nav-item">
                    <Link to="/login" className="nav-links">
                        Iniciar sesión
                    </Link>
                </li>
            }
            
            {user &&
                <>
                    <li className="nav-item perfil" onMouseEnter={onMouseEnterPerfil} onMouseLeave={onMouseLeavePerfil} onClick={() => setPerfilDropdown(false)}>
                        <Link to="/perfil" className="nav-links">
                            Perfil
                        </Link>
                        {perfilDropdown && <PerfilDropdown />}
                    </li>
                    {formularios.length > 0 &&
                    <li className="nav-item">
                        <button className="nav-links button" onClick={onClickGestion}>
                            <FontAwesomeIcon icon="user-cog" />
                        </button>
                        {gestionDropdown && <GestionDropdown onClickGestion={onClickGestion}/>}
                    </li>
                    }
                </> 
            }
        </ul>
    )
}

export default NavbarItems