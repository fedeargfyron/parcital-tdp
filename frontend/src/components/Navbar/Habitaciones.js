import "./Habitaciones.css"
import { Link } from 'react-router-dom'
import React from 'react'
const Habitaciones = ({tipo}) => {
    return (
        <>
            <ul className='dropdown-habitaciones'>
                <li>
                    <Link className="dropdown-link" to ={`/propiedades/venta_${tipo}_mono`}>
                        Monoambiente
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ={`/propiedades/venta_${tipo}_1_dormitorio`}>
                        1 Dormitorio
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ={`/propiedades/venta_${tipo}_2_dormitorios`}>
                        2 Dormitorios
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ={`/propiedades/venta_${tipo}_3_dormitorios`}>
                        3 Dormitorios
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-link" to ={`/propiedades/venta_${tipo}_4_dormitorios`}>
                        +4 Dormitorios
                    </Link>
                </li>
            </ul>
        </>
    )
    
}

export default Habitaciones