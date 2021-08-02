import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import HeaderPage from '../../components/HeaderPage'
import FiltroPropiedades from '../Filtros/FiltroPropiedades'
import './Gestiones.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { getPropiedades } from '../../redux/ducks/propiedadesReducer'
import { CircularProgress } from '@material-ui/core'
const GestionPropiedadesScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const propiedadesInfo = useSelector(state => state.propiedades)
    const { propiedades, errorPropiedades, loadingPropiedades } = propiedadesInfo

    useEffect(() => {
        dispatch(getPropiedades())
    }, [dispatch])

    return (
        <div className="gestionScreen">
            <div className="gestion-container">
                <HeaderPage titulo="Gestion de propiedades"/>
                <FiltroPropiedades dispatch={dispatch} getPropiedades={getPropiedades} />
                <div className="table-container">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Ubicacion</th>
                                <th>Dueño</th>
                                <th>Tipo de propiedad</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="7">
                                    <div className="new-item-row">
                                        <button className="btn-green" id="Agregar propiedad" onClick={() => history.push('/formPropiedad')}><FontAwesomeIcon icon='plus' className="fas fa-plus"/></button>
                                    </div>
                                </td>
                            </tr>
                            { loadingPropiedades ? <tr><td colSpan="7"><CircularProgress /></td></tr>
                            : errorPropiedades ? <tr><td colSpan="7">Error cargando propiedades!</td></tr> 
                            : propiedades && console.log("")/*propiedades.map(propiedad => )*/}
                            <tr>
                                <td>3123</td>
                                <td>Mendoza y Pueyrredon</td>
                                <td>Federico Arrón</td>
                                <td>Casa</td>
                                <td>N/A</td>
                                <td>No disponible</td>
                                <td>
                                    <div className="gestion-buttons-container">
                                        <button className="btn-blue" id="Modificar propiedad"><FontAwesomeIcon icon='edit' className="fas fa-edit"/></button>
                                        <button className="btn-red" id="Eliminar propiedad"><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GestionPropiedadesScreen