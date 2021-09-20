import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import messageAdder from '../../../MessageAdder'
const Horario = ({setAgregarHorario, horario, setModoUpdate}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        hora: "",
        id: ""
    })
    const handle = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    console.log(data)
    useEffect(() => {
        if(horario)
            setData(horario)
    }, [horario])
    const sendHorario = async (e) => {
        e.preventDefault()
        dispatch({
            type: 'LOADING_TRUE'
        })
        let method
        let url
        
        if(horario){
            method = 'PUT'
            url = `http://localhost:4000/api/horarios/${horario.id}`
        }
        else{
            method = 'POST'
            url = 'http://localhost:4000/api/horarios'
        }
        await axios({
            method: method,
            withCredentials: true,
            data: data,
            url: url
        }).then((res) => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
        })
    }
    return(
        <form className="new-item-row" onSubmit={(e) => sendHorario(e)}>
            <input onChange={(e) => handle(e)} value={horario && data.hora} id="hora" type="text" required placeholder="14:00"/>
            <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
            <button type="button" className="btn-red" onClick={() => {
                setAgregarHorario(false)
                setModoUpdate(false)
                }}><FontAwesomeIcon icon='times' className="fas fa-times"/></button>
        </form>
    )
}

export default Horario