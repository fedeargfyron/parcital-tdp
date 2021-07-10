import React, { useState, useEffect } from 'react'
import Formulario from './Formulario'
const SubModulo = ({subModulo, moduloChecked}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [subModuloChecked, setSubModuloChecked] = useState(false)
    useEffect(() => {
        moduloChecked ? setSubModuloChecked(true) : setSubModuloChecked(false)
    }, [moduloChecked])
    return(
        <div className="submodulo-acciones-container">
            <div className="border-line"></div>
            <div className="display">
                <div className="borde-inicio"></div>
                <i 
                className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"} 
                onClick={() => setNotDisplay(!notDisplay)}>
                </i>
                <i 
                className={subModuloChecked ? "accion-checkbox fas fa-check checked" : "accion-checkbox"}
                onClick={() => (setSubModuloChecked(!subModuloChecked))}>
                </i>
                <p>{subModulo.nombre}</p>
            </div>
            <div className={notDisplay ? "not-display" : ""}>
            {subModulo.formularios && subModulo.formularios.map(formulario => 
                <Formulario formulario={formulario} subModuloChecked={subModuloChecked} key={formulario.id}/>
            )}
            </div>
        </div>
    )
}

export default SubModulo