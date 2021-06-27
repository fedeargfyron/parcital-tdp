import "./Dropdown.css"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Habitaciones from "./Habitaciones"

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
                    Casas <i className="fas fa-caret-right"></i>
                </Link>
                {habitacionesCasas && <Habitaciones tipo={"casas"} />}
            </li>
            <li onMouseEnter={onMouseEnterDepartamentos} onMouseLeave={onMouseLeaveDepartamentos}>
                <Link className="dropdown-link" to ="/propiedades/venta_departamentos">
                    Departamentos <i className="fas fa-caret-right"></i>
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