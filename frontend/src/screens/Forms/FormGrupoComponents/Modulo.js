import React, {useState, useEffect} from 'react'
import SubModulo from './SubModulo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Modulo = ({modulo, grupo}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [moduloChecked, setModuloChecked] = useState(false)
    const [onClickChangedModulo, setOnClickChangedModulo] = useState(false)
    const [render, setRender] = useState(true)
    useEffect(() => {
        const verificarModulo = () => {
            setRender(false)
            let difference = []
            modulo.children.forEach(subModulo => {
                let differenceSub = []
                subModulo.children.forEach(formulario => {
                    let differenceForm = formulario.children.filter(accionInForm => grupo.acciones.includes(accionInForm._id))
                    if(differenceForm.length === formulario.children.length){
                        differenceSub.push(formulario)
                    }
                })
                if(differenceSub.length === subModulo.children.length){
                    difference.push(subModulo)
                }
            })
            if(difference.length === modulo.children.length)
                setModuloChecked(true)
        }
        
        grupo && render && verificarModulo()
    }, [grupo, render, modulo])
    return (
        <div className="modulo-acciones-container">
            <div className="display">
                <FontAwesomeIcon 
                    icon={notDisplay ? 'plus' : 'minus'}
                    className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"}
                    onClick={() => setNotDisplay(!notDisplay)}
                />
                <div onClick={() => {
                    setModuloChecked(!moduloChecked)
                    setOnClickChangedModulo(!onClickChangedModulo)
                    }} className={moduloChecked ? "accion-checkbox btn-green" : "accion-checkbox"}>
                    {moduloChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="fas fa-check checked"
                    />}
                </div>
                <p>{modulo.nombre}</p>
            </div>
            <div className={notDisplay ? "not-display" : ""}>
                {modulo.children && modulo.children.map(subModulo => 
                    <SubModulo 
                    onClickChangedModulo={onClickChangedModulo} 
                    setOnClickChangedModulo={setOnClickChangedModulo} 
                    subModulo={subModulo} grupo={grupo} 
                    moduloChecked={moduloChecked} 
                    key={subModulo._id}
                    />
                )}
            </div>
        </div>
)}

export default Modulo