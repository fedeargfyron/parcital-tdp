import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                <div onClick={() => (setAccionChecked(!accionChecked))} className={accionChecked ? "accion-checkbox btn-green" : "accion-checkbox"}>
                    {accionChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="accionChecked"
                        id={accion._id}
                    />}
                </div>
                <p>{accion.nombre}</p>
                
            </div>
        </div>
    )
}

export default Accion