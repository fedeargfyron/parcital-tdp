import React, { useEffect } from 'react'
import './PropiedadesScreen.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPropiedades } from '../redux/ducks/propiedadesReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@material-ui/core'
import Map from '../components/ReactMapGL'

const PropiedadesScreen = ({match}) => {
    const dispatch = useDispatch()
    const propiedadesInfo = useSelector(state => state.propiedades)
    const { propiedades, errorPropiedades, loadingPropiedades} = propiedadesInfo
    const filtro = match.params.tipo
    const filtroSplit = filtro.split("_")
    const stringTitulo = `${filtroSplit[0]} ${filtroSplit[1] ? `de ${filtroSplit[1]}` : ""} ${filtroSplit[2] ? ` ${filtroSplit[2]} dormitorios` : ""}`
    useEffect(() => {
        dispatch(getPropiedades(filtro))
    }, [dispatch, filtro])
    return(
        <div className="propiedadesScreen">
            <div id="mapContainer" className="leftside">
            <Map propiedades={propiedades} tipo={filtroSplit[0]} />
            </div>
            <div className="rightside">
                <div className="rightside-container">
                    <div className="rightside-header">
                        <h4 className="propiedades-title">{stringTitulo}</h4>
                        <div className="line"></div>
                        <div className="filter-container">
                            <p className="filter-label">Ordenar por:</p>
                            <select className="filter-select">
                                <option>Alfabeticamente</option>
                                <option>$ Mayor a menor</option>
                                <option>$ Menor a mayor</option>
                            </select>
                        </div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="propiedades-container">
                    { loadingPropiedades ? <div className="circular centerCircularProgress"><CircularProgress /> </div>
                    : errorPropiedades ? <h4>Error!</h4> 
                    : propiedades && propiedades.map(propiedad => (
                        <div key={propiedad._id}>
                            <Link to ={`/propiedad/${propiedad._id}/${filtroSplit[0]}`}className="propiedad-container">
                                <div className="img-container">
                                    <img src={propiedad.imagenes[0]} alt="asd"></img>
                                </div>
                                <div className="propiedad-info">
                                    <div>
                                        <p className="tipo">{stringTitulo}</p>
                                        <p className="direccion">{propiedad.ubicacion}</p>
                                        <p className="precio">${propiedad.precio}</p>
                                        <p className="descripcion">{propiedad.descripcion}</p>
                                    </div>
                                    <div className="sub-info">
                                        <p><FontAwesomeIcon icon="expand-arrows-alt" className="fas fa-expand-arrows-alt"/><span>{propiedad.superficie}m²</span></p>
                                        {propiedad.tipoDatos.cochera && <p><FontAwesomeIcon icon="car-alt" className="fas fa-car-alt" /><span>Cochera</span></p> }
                                        {propiedad.tipoDatos.cantidad_baños && <p><FontAwesomeIcon icon="bath" className="fas fa-bath" /><span>{propiedad.tipoDatos.cantidad_baños}</span></p> }
                                    </div>
                                </div>
                            </Link>
                            <div className="propiedad-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PropiedadesScreen