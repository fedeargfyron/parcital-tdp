import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const Map = () => {
    let [viewport, setViewport] = useState({
        latitude: -32.95000,
        longitude: -60.67000,
        zoom: 14,
        width: window.innerWidth,
        height: window.innerHeight
        
    })
    return(
        <ReactMapGL 
        mapboxApiAccessToken = {"pk.eyJ1IjoiZnlyb24yMCIsImEiOiJja3RyamkzZHkwbDlyMnVxaXBqeGd3eWFiIn0.-TdxEuTZ74I-BMDmIFqoSg"}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(newView) => setViewport(newView)}
        className="map"
        />
    )
}

export default Map