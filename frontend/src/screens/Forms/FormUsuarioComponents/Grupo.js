import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Grupo = ({grupo, grupos}) => {
    const [grupoChecked, setGrupoChecked] = useState(false)
    useEffect(() => {
        const verificarGrupos = () => {
            grupos.forEach(grupoInUser => {
                if(grupoInUser === grupo._id)
                    setGrupoChecked(true)
            })
        }
        grupos && verificarGrupos()
    }, [grupos, grupo._id])
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