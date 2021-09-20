import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Formulario from './Formulario'
const SubModulo = ({subModulo, moduloChecked, grupo, onClickChangedModulo, setOnClickChangedModulo}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [subModuloChecked, setSubModuloChecked] = useState(false)
    const [onClickChangedSubModulo, setOnClickChangedSubModulo] = useState(false)
    const [render, setRender] = useState(true)
    useEffect(() => {
        if(onClickChangedModulo){
            moduloChecked ? setSubModuloChecked(true) : setSubModuloChecked(false)
            setOnClickChangedModulo(false)
            setOnClickChangedSubModulo(true)
        }
        const verificarSubmodulo = () => {
            setRender(false)
            moduloChecked ? setSubModuloChecked(true) : setSubModuloChecked(false)
            let difference = []
            subModulo.formularios.forEach(formulario => {
                let differenceForm = formulario.acciones.filter(accionInForm => grupo.acciones.includes(accionInForm._id))
                if(differenceForm.length === formulario.acciones.length){
                    difference.push(formulario)
                }
            })
            if(difference.length === subModulo.formularios.length){
                setSubModuloChecked(true)
            }
        }
        
        grupo && render && verificarSubmodulo()
    }, [moduloChecked, grupo, render, subModulo.formularios, onClickChangedModulo, setOnClickChangedModulo])
    return(
        <div className="submodulo-acciones-container">
            <div className="border-line"></div>
            <div className="display">
                <div className="borde-inicio"></div>
                <FontAwesomeIcon 
                    icon={notDisplay ? 'plus' : 'minus'}
                    className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"}
                    onClick={() => setNotDisplay(!notDisplay)}
                />
                <div onClick={() => {
                    setSubModuloChecked(!subModuloChecked)
                    setOnClickChangedSubModulo(!onClickChangedSubModulo)
                }} className={subModuloChecked ? "accion-checkbox btn-green" : "accion-checkbox"}>
                    {subModuloChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="fas fa-check checked"
                    />}
                </div>
                <p>{subModulo.nombre}</p>
            </div>
            <div className={notDisplay ? "not-display" : ""}>
            {subModulo.formularios && subModulo.formularios.map(formulario => 
                <Formulario 
                formulario={formulario} 
                setOnClickChangedSubModulo={setOnClickChangedSubModulo} 
                onClickChangedSubModulo={onClickChangedSubModulo}
                grupo={grupo} 
                subModuloChecked={subModuloChecked} 
                key={formulario.id}
                />
            )}
            </div>
        </div>
    )
}

export default SubModulo