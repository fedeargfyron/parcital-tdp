import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Horario = ({horario, horarios}) => {
    const [render, setRender] = useState(true)
    const [horarioChecked, setHorarioChecked] = useState(false)
    useEffect(() => {
        const verificarHorario = () => {
            setRender(false)
            horarios.forEach(horarioInAgente => {
                if(horarioInAgente === horario._id)
                    setHorarioChecked(true)
            })
        }
        horarios && render && verificarHorario()
    }, [horarios, render, horario._id])
    return(
        <tr>
            <td>
                <div onClick={() => (setHorarioChecked(!horarioChecked))} className={horarioChecked ? "horario-checkbox btn-green" : "horario-checkbox"}>
                    {horarioChecked && 
                    <FontAwesomeIcon 
                        icon='check'
                        className="checked"
                        id={horario._id}
                    />}
                </div>
            </td>
            <td>{horario.hora}</td>
        </tr>
        
    )
}

export default Horario