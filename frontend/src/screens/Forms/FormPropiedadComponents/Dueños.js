import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDueños } from '../../../redux/ducks/dueñosReducer'
const SelectDueños = ({handle}) => {
    const dispatch = useDispatch()
    const setDueños = useSelector((state) => state.dueños)
    const { dueños, loading, error } = setDueños
    useEffect(() => {
        dispatch(getDueños())
    }, [dispatch])

    return (
        <select id="dueño" onChange={e => handle(e)}>
            <option>Seleccionar...</option>
            {loading ? 
            <option>"Cargando..."</option> 
            : error ? 
            <option>No hay dueños</option> 
            : dueños ? 
            dueños.map(dueño => {
                return(<option key={dueño._id} value={dueño._id}>{dueño.nombre} {dueño.apellido}</option>)
            })
            : <option>No hay dueños</option>
            }
        </select>
    )
}

export default SelectDueños