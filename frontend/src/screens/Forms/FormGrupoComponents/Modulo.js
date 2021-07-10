import React, {useState} from 'react'
import SubModulo from './SubModulo'
const Modulo = ({modulo}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [moduloChecked, setModuloChecked] = useState(false)
    return (
        <div className="modulo-acciones-container">
            <div className="display">
                <i 
                className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"} 
                onClick={() => setNotDisplay(!notDisplay)}>
                </i>
                <i 
                className={moduloChecked ? "accion-checkbox fas fa-check checked" : "accion-checkbox"} 
                onClick={() => setModuloChecked(!moduloChecked)
                }>
                </i>
                <p>{modulo.nombre}</p>
            </div>
            <div className={notDisplay ? "not-display" : ""}>
                {modulo.subModulos && modulo.subModulos.map(subModulo => 
                    <SubModulo subModulo={subModulo} moduloChecked={moduloChecked} key={subModulo.id}/>
                )}
            </div>
        </div>
)}

export default Modulo