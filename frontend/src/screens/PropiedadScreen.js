import './PropiedadesScreen.css'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getPropiedad } from '../redux/ducks/propiedadReducer'
import HeaderPage from '../components/HeaderPage'
import './PropiedadScreen.css'
import OfertaForm from '../components/PropiedadComponents/OfertaForm'
import VisitaForm from '../components/PropiedadComponents/VisitaForm'
import { CircularProgress } from '@material-ui/core'
const PropiedadScreen = () => {
    const { id, servicio } = useParams()
    const dispatch = useDispatch()
    const propiedadInfo = useSelector((state) => state.propiedad)
    const { propiedad, loadingPropiedad, errorPropiedad } = propiedadInfo
    useEffect(() => {
        dispatch(getPropiedad(id, true))
    }, [dispatch, id])
    const [ofertaForm, setOfertaForm] = useState(false)
    return(
        <div className="PropiedadScreen">
            <HeaderPage titulo={"Dirección de la propiedad"}/>
            { loadingPropiedad ? <div className="circular centerCircularProgress"><CircularProgress /></div> 
            : errorPropiedad ? <h4>Error!</h4> 
            : propiedad && <>
        <div className="precioOferta">
            <p>Precio: <span>${propiedad.precio}</span></p>
            <button onClick={() => setOfertaForm(true)} id="Ofertar propiedad">Ofertar por esta propiedad</button>
        </div>
        <div className="line"></div>
        <div className="caracteristicas-generales">
            <h4 className="caracteristicas-title">Caracteristicas generales</h4>
            <ul className="caracteristicas">
                <li><span>{propiedad.tipoDatos.tipo} de {propiedad.tipoDatos.cantidad_habitaciones} dormitorios</span> en Rosario</li>
                <li>Baños: <span>{propiedad.tipoDatos.cantidad_baños}</span></li>
                <li>Cochera: <span>{propiedad.tipoDatos.cochera ? "Si" : "No"}</span></li>
                <li>Antiguedad: <span>{propiedad.tipoDatos.antiguedad}</span></li>
                <li>Superficie: <span>{propiedad.superficie}m²</span></li>
                <li>Estado: <span>{propiedad.estado_propiedad}</span></li>
                <li>Cantidad de pisos: <span>{propiedad.tipoDatos.cantidad_pisos}</span></li>
            </ul>
        </div>
        <div className="line"></div>
        <div className="descripcion">
            <h4 className="descripcion-title">Descripción</h4>
            <p>
                {propiedad.descripcion}
                Acá va a haber una descripción del edificio completa. Para rellenar espacio voy a usar un lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
                {propiedad.entorno}
                Acá va a haber una descripción del entorno del edificio. Para rellenar espacio voy a usar un lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <div className="line"></div>
        <div className="galeria-imagenes">
            <h4 className="galeria-title">Galería de imagenes</h4>
            <div className="imagenes-container">
                {propiedad.imagenes.map((imagen, index )=> 
                <div className="imagen-container" key={index}>
                    <img alt={index} src={imagen}/>
                </div>)}
            </div>
        </div>
        {ofertaForm && propiedad && <OfertaForm setOfertaForm={setOfertaForm} propiedad={propiedad._id} servicio={servicio}/>}
        <VisitaForm servicio={propiedad.servicioDatos._id} visitas={propiedad.visitasHorarios} agenteHorarios={propiedad.agenteDatos.horarios} />
        </>}
        </div>
    )
}

export default PropiedadScreen