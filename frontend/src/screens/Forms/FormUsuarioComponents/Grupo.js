import React, { useState } from 'react'
const Grupo = ({grupo}) => {
    const [grupoChecked, setGrupoChecked] = useState(false)
    return(
        <div className="grupo-container" name="checkbox">
            <i 
            className={grupoChecked ? "grupo-checkbox fas fa-check grupoChecked" : "grupo-checkbox"}
            onClick={() => setGrupoChecked(!grupoChecked)}
            id={grupo.id}>
            </i>
            <p>{grupo.nombre}</p>
        </div>
    )
}

export default Grupo