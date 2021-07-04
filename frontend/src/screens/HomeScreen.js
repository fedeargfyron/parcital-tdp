import React from 'react'
import './HomeScreen.css'
import { Link } from 'react-router-dom'
const HomeScreen = () => {
    return(
        <Link to="/propiedades/venta" className="homescreen">
            <div className="blackscreen"></div>
            <h1 className="title">Comprar</h1>
        </Link>
    )
}

export default HomeScreen