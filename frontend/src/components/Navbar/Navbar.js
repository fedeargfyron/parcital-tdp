import "./Navbar.css"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Dropdown from './Dropdown'
import GestionDropdown from "./GestionDropdown"
import PerfilDropdown from "./PerfilDropdown"
import Logo from '../../imagenes/Logo.png'
const Navbar = () => {
    //States de react para gestionar los clicks(mobile) y los dropdowns
    const [click, setClick] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [gestionDropdown, setGestionDropdown] = useState(false)
    //Para los formularios mismo redux que con el display
    const [formularios, setFormularios] = useState(["2"])
    const [perfilDropdown, setPerfilDropdown] = useState(false)
    const [user, setUser] = useState("as")
    //En caso de clickear algo en un dropdown o mobile, se cierra el dropdown 
    const handleClick = () => setClick(!click)
    const closeMenu = () => {
        setClick(false)
        gestionDropdown && setGestionDropdown(false)
        dropdown && setDropdown(false)
    }
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
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <p>Arrón</p>
                <p>Inmobiliarias</p>
                <img src={Logo} alt="Logo" className="logo"></img>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times fa-times-navbar' : 'fas fa-bars'} />
            </div>
            <ul onClick={closeMenu} className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item venta" onMouseEnter={onMouseEnterVenta} onMouseLeave={onMouseLeaveVenta}>
                    <Link to="/propiedades/venta" className="nav-links" >
                        Venta <i className="fas fa-caret-down"></i>
                    </Link>
                    {dropdown && <Dropdown/>}
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-links">
                        Inicio
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-links">
                        Contacto
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
                                <i className="fas fa-user-cog"></i> <i className="fas fa-caret-down"></i>
                            </button>
                            {gestionDropdown && <GestionDropdown onClickGestion={onClickGestion}/>}
                        </li>
                        }
                    </> 
                }
            </ul>
        </nav>
        
        /*<div className="Navbar">
            <div className="navbar-container">
                <Link className="logo nav-item">
                        <p>Arrón</p>
                        <p>Inmobiliarias</p>
                </Link>
                <ul className="navbar-items">
                    <li>
                        <Link className="nav-item"> 
                            Venta
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item">
                            Contacto
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item">
                            Mi cuenta
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item">
                            Iniciar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </div>*/
    )
}

export default Navbar