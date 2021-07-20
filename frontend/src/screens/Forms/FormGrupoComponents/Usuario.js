import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Usuario = ({usuario}) => {
    const [usuarioChecked, setUsuarioChecked] = useState(false)
    return(
        <div className="user-container" name="checkbox">

            
            <div onClick={() => setUsuarioChecked(!usuarioChecked)} className={usuarioChecked ? "usuario-checkbox btn-green" : "usuario-checkbox"}>
                {usuarioChecked && 
                <FontAwesomeIcon 
                    icon='check'
                    className="usuarioChecked"
                    id={usuario._id}
                />}
            </div>
            <p>{usuario.usuario}</p>
        </div>
    )
}

export default Usuario