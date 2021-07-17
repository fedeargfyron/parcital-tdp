import "./Dropdown.css"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Habitaciones from "./Habitaciones"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Dropdown = (setGestionDropdown) => {
    const [click, setClick] = useState(false)
    const [habitacionesCasas, setHabitacionesCasas] = useState(false)
    const [habitacionesDepartamentos, setHabitacionesDepartamentos] = useState(false)
    const handleClick = () => setClick(!click)
    const onMouseEnterCasas = () => {
        window.innerWidth < 720 ? setHabitacionesCasas(false) : setHabitacionesCasas(true)
    }
    const onMouseLeaveCasas = () => {
        setHabitacionesCasas(false)
    }
    const onMouseEnterDepartamentos = () => {
        window.innerWidth < 720 ? setHabitacionesDepartamentos(false) : setHabitacionesDepartamentos(true)
    }
    const onMouseLeaveDepartamentos = () => {
        setHabitacionesDepartamentos(false)
    }
    return (
    <>
        <ul onClick={handleClick} className='dropdown-menu-component'>
            <li onMouseEnter={onMouseEnterCasas} onMouseLeave={onMouseLeaveCasas}>
                <Link className="dropdown-link" to ="/propiedades/venta_casas">
                    Casas <FontAwesomeIcon icon="caret-right" className="fa-caret-right"/>
                </Link>
                {habitacionesCasas && <Habitaciones tipo={"casas"} />}
            </li>
            <li onMouseEnter={onMouseEnterDepartamentos} onMouseLeave={onMouseLeaveDepartamentos}>
                <Link className="dropdown-link" to ="/propiedades/venta_departamentos">
                    Departamentos <FontAwesomeIcon icon="caret-right" className="fa-caret-right"/>
                </Link>
                {habitacionesDepartamentos && <Habitaciones tipo={"departamentos"}/>}
            </li>
            <li>
                <Link className="dropdown-link" to ="/propiedades/venta_galpones">
                    Galpones
                </Link>
            </li>
            <li>
                <Link className="dropdown-link" to ="/propiedades/venta_terrenos">
                    Terrenos
                </Link>
            </li>
            <li>
                <Link className="dropdown-link" to ="/propiedades/venta_cocheras">
                    Cocheras
                </Link>
            </li>
        </ul>
    </>
    )
}

export default Dropdown