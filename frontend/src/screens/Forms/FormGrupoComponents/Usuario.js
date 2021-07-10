import React, { useState } from 'react'
const Usuario = ({usuario}) => {
    const [usuarioChecked, setUsuarioChecked] = useState(false)
    return(
        <div className="user-container" name="checkbox">
            <i 
            className={usuarioChecked ? "usuario-checkbox fas fa-check usuarioChecked" : "usuario-checkbox"} 
            onClick={() => setUsuarioChecked(!usuarioChecked)}
            id={usuario.id}>
            </i>
            <p>{usuario.username}</p>
        </div>
    )
}

export default Usuario