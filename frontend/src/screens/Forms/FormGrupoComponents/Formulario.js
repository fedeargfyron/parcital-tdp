import React, { useState, useEffect} from 'react'
import Accion from './Accion'
const Formulario = ({formulario, subModuloChecked}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [formularioChecked, setFormularioChecked] = useState(false)
    useEffect(() => {
        subModuloChecked ? setFormularioChecked(true) : setFormularioChecked(false)
    }, [subModuloChecked])
    return(
        <div className="formulario-acciones-container">
            <div className="border-line"></div>
            <div className="display">
                <div className="borde-inicio"></div>
                <i 
                className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"} 
                onClick={() => setNotDisplay(!notDisplay)}>
                </i>
                <i 
                className={formularioChecked ? "accion-checkbox fas fa-check checked" : "accion-checkbox"}
                onClick={() => (setFormularioChecked(!formularioChecked))}>
                </i>
                <p>{formulario.nombre}</p>
            </div>
            <div className={notDisplay ? "not-display" : ""}>
            {formulario.acciones && formulario.acciones.map(accion => 
                <Accion accion={accion} formularioChecked={formularioChecked}key={accion._id}/>
            )}
            </div>
        </div>
    )
}

export default Formulario