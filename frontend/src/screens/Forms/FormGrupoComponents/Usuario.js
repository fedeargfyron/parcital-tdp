import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Usuario = ({usuario, usuarios}) => {
    const [usuarioChecked, setUsuarioChecked] = useState(false)

    useEffect(() => {
        const verificarUsuarios = () => {
            usuarios.forEach(usuarioInGrupo => {
                if(usuarioInGrupo._id === usuario._id)
                    setUsuarioChecked(true)
            })
        }
        usuarios && verificarUsuarios()
    }, [usuarios, usuario._id])
    
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