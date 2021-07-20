import React, { useEffect } from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroCompras from '../Filtros/FiltroCompras'
import './MiPerfil.css'
import { getVentas } from '../../redux/ducks/ventasReducer'
import { useSelector, useDispatch } from 'react-redux'
const Compras = () => {
    const dispatch = useDispatch()
    const ventasInfo = useSelector(state => state.ventas)
    useEffect(() => {
        dispatch(getVentas())
    }, [dispatch])
    return(
        <div className="perfilScreen">
            <div className="compras-container">
                <HeaderPage titulo="Mis compras"/>
                <FiltroCompras />
                <div className="table-container">
                    <h4>Compras</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Agente</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Compras