import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Accion = ({accion, formularioChecked, formularioClicked, setFormularioClicked, grupo}) => {
    const [render, setRender] = useState(true)
    const [accionChecked, setAccionChecked] = useState(false)
    useEffect(() => {
        if(formularioClicked){
            console.log("asdasd")
            formularioChecked ? setAccionChecked(true) : setAccionChecked(false)
            setFormularioClicked(false)
        }

        const verificarAcciones = () => {
            setRender(false)
            if(grupo.acciones.includes(accion._id))
                setAccionChecked(true)
            else
                setAccionChecked(false)
        }
        grupo && render && verificarAcciones()
    }, [formularioChecked, grupo, accion._id, formularioClicked, setFormularioClicked, render])
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