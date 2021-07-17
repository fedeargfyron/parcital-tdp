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
                    id={usuario.id}
                />}
            </div>
            <p>{usuario.username}</p>
        </div>
    )
}

export default Usuario