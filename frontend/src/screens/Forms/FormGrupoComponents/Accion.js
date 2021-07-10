import React, { useState, useEffect } from 'react'

const Accion = ({accion, formularioChecked}) => {
    const [accionChecked, setAccionChecked] = useState(false)
    useEffect(() => {
        formularioChecked ? setAccionChecked(true) : setAccionChecked(false)
    }, [formularioChecked])
    return(
        <div className="accion-acciones-container">
            <div className="border-line-accion"></div>
            <div className="display">
                <div className="borde-inicio"></div>
                <i
                className={accionChecked ? "accion-checkbox fas fa-check accionChecked" : "accion-checkbox"}
                onClick={() => (setAccionChecked(!accionChecked))}
                id={accion._id}>
                </i>
                <p>{accion.nombre}</p>
            </div>
        </div>
    )
}

export default Accion