import React, {useState} from 'react'
import './Filtros.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../redux/ducks/usersReducer'
const FiltroUsuarios = () => {
    const dispatch = useDispatch()
    const [filtros, setFiltros] = useState({
        nombre: "",
        estado: ""
    })
    const handle = (e) => {
        const newFiltros ={...filtros}
        newFiltros[e.target.id] = e.target.value
        setFiltros(newFiltros)
    }
    const filtrarClick = () => {
        dispatch(getUsers(filtros))
    }
    return(
        <>
            <div className= "filtro-container">
                <h4>Filtrar</h4>
                <div className="options-container">
                    <div className="item-container">
                        <p>Estado</p>
                        <select id="estado" onChange={(e) => handle(e)}>
                            <option value="">Todos</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="item-container">
                        <p>Nombre de usuario</p>
                        <input onChange={(e) => handle(e)} id="nombre" placeholder="Juan123"/>
                    </div>
                    <button className="filtro-btn" onClick={() => filtrarClick()}>
                        <FontAwesomeIcon icon='search' className="fas fa-search"/>
                    </button>
                </div>
            </div>
            <div className="line"></div>
        </>
    )
}

export default FiltroUsuarios