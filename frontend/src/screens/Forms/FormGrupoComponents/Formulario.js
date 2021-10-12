import React, { useState, useEffect} from 'react'
import Accion from './Accion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Formulario = ({formulario, subModuloChecked, grupo, setOnClickChangedSubModulo, onClickChangedSubModulo}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [formularioClicked, setFormularioClicked] = useState(false)
    const [formularioChecked, setFormularioChecked] = useState(false)
    const [render, setRender] = useState(true)
    useEffect(() => {
        if(onClickChangedSubModulo){
            subModuloChecked ? setFormularioChecked(true) : setFormularioChecked(false)
            setFormularioClicked(true)
            setOnClickChangedSubModulo(false)
        }
        const verificarFormulario = () => {
            setRender(false)
            subModuloChecked ? setFormularioChecked(true) : setFormularioChecked(false)
            let difference = formulario.children.filter(accionInForm => grupo.acciones.includes(accionInForm._id))
            if(difference.length === formulario.children.length)
                setFormularioChecked(true)
        }
        grupo && render && verificarFormulario()
    }, [subModuloChecked, formulario.children, grupo, render, onClickChangedSubModulo, setOnClickChangedSubModulo])
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
                <div onClick={() => {
                    setFormularioChecked(!formularioChecked)
                    setFormularioClicked(true)
                    }} 
                    className={formularioChecked ? "accion-checkbox btn-green" : "accion-checkbox"}>
                    {formularioChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="fas fa-check checked"
                    />}
                </div>
                <p>{formulario.nombre}</p>
            </div>
            <div className={notDisplay ? "not-display" : ""}>
            {formulario.children && formulario.children.map(accion => 
                <Accion accion={accion} grupo={grupo} formularioClicked={formularioClicked} setFormularioClicked={setFormularioClicked} formularioChecked={ formularioChecked } key={accion._id}/>
            )}
            </div>
        </div>
    )
}

export default Formulario