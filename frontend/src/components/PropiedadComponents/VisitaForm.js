import React, { useState, useEffect } from 'react'
import './VisitaForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import messageAdder from '../../MessageAdder'
const VisitaForm = ({servicio, visitas, agenteHorarios}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        fecha: '',
        hora: '',
        servicio: servicio,
    })
    const [visitasDate, setVisitasDate] = useState([])
    useEffect(() => {
        let visitasDate = visitas.map(visita => {
            visita.fecha = new Date(visita.fecha).setHours(0,0,0,0)
            return visita
        })
        setVisitasDate(visitasDate)
    }, [visitas, setVisitasDate])
    const [horarios, setHorarios] = useState([])
    
    const obtenerHorariosFiltrados = (fecha) => {
        let date = new Date(fecha).setHours(0,0,0,0)
        let visitasInFecha = visitasDate.filter(visita => visita.fecha.valueOf() === date.valueOf())
        let horariosVisitas = visitasInFecha.map(visita => visita.horario)
        let horariosFiltrados = agenteHorarios.filter(horario => !horariosVisitas.includes(horario.hora))
        setHorarios(horariosFiltrados)
    }

    const handle = (e) => {
        const newData ={...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const setVisita = (e) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        axios({
            method: 'POST',
            data: data,
            withCredentials: true,
            url: 'http://localhost:4000/api/visitas'
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return(
        <form className="visita-form">
            <h4 className="visita-form-title">¿Quieres solicitar una visita?</h4>
            <div className="line"></div>
            <input id="fecha" onChange={(e) => {
                handle(e)
                obtenerHorariosFiltrados(e.target.value)
            }} type="date"></input>
            <h4 className="horario-title">Seleccione un horario:</h4>
            {horarios && horarios.length > 0 ? 
            <select id="hora" className="horarios-container" onChange={(e) => handle(e)}>
                <option value="">Horarios...</option>
                {horarios.map(horario => <option key={horario._id} value={horario.hora}>{horario.hora}</option>)}
            </select>
            : <p className="sinHorarios">No hay horarios disponibles para esta fecha</p>}
            
            <button className="btn-solicitar-visita" id="Solicitar visita" onClick={(e)=> setVisita(e)}><FontAwesomeIcon icon='check' className="fa-check"/></button>
        </form>
    )
}

export default VisitaForm