import "./Navbar.css"
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Logo from '../../imagenes/Logo.png'
import { useSelector } from "react-redux"
import { getUser } from "../../redux/ducks/userReducer"
import { useDispatch } from "react-redux"
import NavbarItems from "./NavbarItems"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Navbar = () => {
    const dispatch = useDispatch()
    //States de react para gestionar los clicks(mobile) y los dropdowns
    const [click, setClick] = useState(false)
    //Para los formularios mismo redux que con el display
    
    //En caso de clickear algo en un dropdown o mobile, se cierra el dropdown 
    const handleClick = () => setClick(!click)
    const userInfo = useSelector(state => state.user)
    const { loadingUser, user } = userInfo
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <nav className="navbar">
            {!loadingUser && 
            <>
            <Link to="/" className="navbar-logo">
                <p>Arrón</p>
                <p>Inmobiliarias</p>
                <img src={Logo} alt="Logo" className="logo"></img>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <FontAwesomeIcon icon={click ? 'times' : 'bars'} className={click ? 'fa-times-navbar' : 'fa-bars'}/>
            </div>
            <NavbarItems user={user} click={click} setClick={setClick}/>
            </>}
        </nav>
    )
}

export default Navbar