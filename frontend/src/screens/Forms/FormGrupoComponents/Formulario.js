import React, { useState, useEffect} from 'react'
import Accion from './Accion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Formulario = ({formulario, subModuloChecked}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [formularioChecked, setFormularioChecked] = useState(false)
    useEffect(() => {
        subModuloChecked ? setFormularioChecked(true) : setFormularioChecked(false)
    }, [subModuloChecked])
    return(
        <div className="formulario-acciones-container">
            <div className="border-line-formulario"></div>
            <div className="display">
                <div className="borde-inicio"></div>
                <FontAwesomeIcon 
                    icon={notDisplay ? 'plus' : 'minus'}
                    className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"}
                    onClick={() => setNotDisplay(!notDisplay)}
                />
                <div onClick={() => setFormularioChecked(!formularioChecked)} className={formularioChecked ? "accion-checkbox btn-green" : "accion-checkbox"}>
                    {formularioChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="fas fa-check checked"
                    />}
                </div>
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