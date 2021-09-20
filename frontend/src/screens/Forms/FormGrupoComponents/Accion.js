import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Accion = ({accion, formularioChecked, grupo}) => {
    const [accionChecked, setAccionChecked] = useState(false)
    const [render, setRender] = useState(true)
    useEffect(() => {
        formularioChecked ? setAccionChecked(true) : setAccionChecked(false)
        const verificarAcciones = () => {
            setRender(false)
            grupo.acciones.forEach(accionInGrupo => {
                if(accionInGrupo === accion._id)
                    setAccionChecked(true)
            })
            
        }
        grupo && render && verificarAcciones()
    }, [formularioChecked, grupo, accion._id, render])
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