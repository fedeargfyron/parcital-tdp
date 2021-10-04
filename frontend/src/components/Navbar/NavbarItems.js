import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Dropdown from './Dropdown'
import GestionDropdown from "./GestionDropdown"
import PerfilDropdown from "./PerfilDropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getUser } from "../../redux/ducks/userReducer"
import messageAdder from "../../MessageAdder"
import axios from 'axios'
const NavbarItems = ({user, click, setClick}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [perfilDropdown, setPerfilDropdown] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [gestionDropdown, setGestionDropdown] = useState(false)
    const reportes = useRef(false)
    let formsDto = []
    if(user && user.formularios.length > 0){
        formsDto = user.formularios.filter((e) => e.nombre.includes("Gestionar"))
        if(user.formularios.some(form => form.nombre === "Estadisticas"))
            reportes.current = true
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
    const closeMenu = () => {
        setClick(false)
        gestionDropdown && setGestionDropdown(false)
        dropdown && setDropdown(false)
    }

    const logOut = async () => {
        axios({
            method: 'POST',
            withCredentials: true,
            url: 'http://localhost:4000/api/logUser/logOut'
        }).then( async (res) => {
            if(res.data.type === "danger")
                return messageAdder(res.data)
                
            dispatch(getUser())
            history.push('/')
        })
    }
    return(
        <ul onClick={closeMenu} className={click ? 'nav-menu active' : 'nav-menu'}>
            {reportes.current && 
            <li className="nav-item venta">
                <Link to="/reportes" className="nav-links" >
                    Reportes
                </Link>
            </li>
            }
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
                    { formsDto.length > 0 &&
                    <li className="nav-item">
                        <button className="nav-links button" onClick={onClickGestion}>
                            <FontAwesomeIcon icon="user-cog" />
                        </button>
                        {gestionDropdown && <GestionDropdown formularios={formsDto} onClickGestion={onClickGestion}/>}
                    </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-links" to="/" onClick={logOut}>
                            <FontAwesomeIcon icon="door-open"/>
                        </Link>
                    </li>
                </> 
            }
        </ul>
    )
}

export default NavbarItems