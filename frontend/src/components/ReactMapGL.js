import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ReactMapGL.css'
import { useHistory } from 'react-router'

const Map = ({propiedades, tipo}) => {
    const history = useHistory()
    const [propiedad, setPropiedad] = useState(null)
    let [viewport, setViewport] = useState({
        latitude: -32.95000,
        longitude: -60.67000,
        zoom: 14,
        width: window.innerWidth,
        height: window.innerHeight
    })
    const mostrarPropiedad = (propiedad) => {
        setPropiedad(propiedad)
    }
    console.log(propiedad)
    return(
        <ReactMapGL 
        mapboxApiAccessToken = {"pk.eyJ1IjoiZnlyb24yMCIsImEiOiJja3RyamkzZHkwbDlyMnVxaXBqeGd3eWFiIn0.-TdxEuTZ74I-BMDmIFqoSg"}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(newView) => setViewport(newView)}
        className="map"
        >
            {propiedad && 
            <div className="propiedad-info-map">
                <div className="propiedad-container">
                    <div className="img-container img-container-map-propiedad">
                        <img src={propiedad.imagenes[0]} alt="asd"></img>
                    </div>
                    <div className="propiedad-info">
                        <div>
                            <p className="tipo">{tipo}</p>
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
                </div>
            </div>
            }
        {propiedades && propiedades.map(propiedad =>
        <div 
        key={propiedad._id}
        onMouseEnter={() => mostrarPropiedad(propiedad)}
        onMouseLeave={() => setPropiedad(null)}>
            <Marker
            longitude={propiedad.longitud}
            latitude={propiedad.latitud}
            onClick={() => history.push(`/propiedad/${propiedad._id}/${tipo}`)}
            >
                <FontAwesomeIcon icon="map-marker-alt" className="marker-icon"/>
            </Marker>
        </div>
        )}
        </ReactMapGL>
    )
}

export default Map