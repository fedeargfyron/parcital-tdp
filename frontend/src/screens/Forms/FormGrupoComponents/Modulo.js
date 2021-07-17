import React, {useState} from 'react'
import SubModulo from './SubModulo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Modulo = ({modulo}) => {
    const [notDisplay, setNotDisplay] = useState(false)
    const [moduloChecked, setModuloChecked] = useState(false)
    return (
        <div className="modulo-acciones-container">
            <div className="display">
                <FontAwesomeIcon 
                    icon={notDisplay ? 'plus' : 'minus'}
                    className={notDisplay ? "fas fa-plus display-button" : "fas fa-minus display-button"}
                    onClick={() => setNotDisplay(!notDisplay)}
                />
                <div onClick={() => setModuloChecked(!moduloChecked)} className={moduloChecked ? "accion-checkbox btn-green" : "accion-checkbox"}>
                    {moduloChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="fas fa-check checked"
                    />}
                </div>
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