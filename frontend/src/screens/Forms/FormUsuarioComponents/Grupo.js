import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Grupo = ({grupo}) => {
    const [grupoChecked, setGrupoChecked] = useState(false)
    return(
        <div className="grupo-container" name="checkbox">
            <div onClick={() => setGrupoChecked(!grupoChecked)} className={grupoChecked ? "grupo-checkbox btn-green" : "grupo-checkbox"}>
                {grupoChecked && 
                <FontAwesomeIcon 
                    icon='check'
                    className="grupoChecked"
                    id={grupo._id}
                />}
            </div>
            <p>{grupo.nombre}</p>
        </div>
    )
}

export default Grupo