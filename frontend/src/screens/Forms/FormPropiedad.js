import React, { useState, useEffect } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router'
import { getDueños } from '../../redux/ducks/dueñosReducer'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

const FormPropiedad = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const setDueños = useSelector((state) => state.dueños)
    const { dueños, loading, error } = setDueños
    useEffect(() => {
        dispatch(getDueños())
    }, [dispatch])

    const [data, setData] = useState({
        ubicacion: "",
        estado_propiedad: "",
        dueño: "",
        tipo_propiedad: "Casa",
        precio: "",
        superficie: "",
        descripcion: "",
        entorno: "",
        cant_habitaciones: 0,
        cant_baños: 0,
        cant_pisos: 0,
        antiguedad: "",
        cochera: false,
        piso: "",
        acceso: ""
    })
    const [cochera, setCochera] = useState(false)
    const sendPropiedad = async (e) => {
        e.preventDefault()
        await axios({
            method:'POST',
            withCredentials: true,
            data: data,
            url: 'http://localhost:4000/api/propiedades'
        }).then(res => console.log(res))
    }

    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const handleDueño = (e) => {
        const newdata = {...data}
        newdata["dueño"] = e.target.id
        setData(newdata)
    }

    const handlePropiedad = (e) => {
        console.log(e.target.value)
        const newdata = {...data}
        newdata["tipo_propiedad"] = e.target.value
        setData(newdata)
    }
    const handleCochera = () => {
        setCochera(!cochera)
        const newdata = {...data}
        newdata["cochera"] = !cochera
        setData(newdata)
    }
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Propiedad"/>
                <form className="form-container" onSubmit={(e) => sendPropiedad(e)}>
                    <label className="form-title">Agregar propiedad</label>
                    <div className="inputs-container">
                        <input onChange={e => handle(e)} id="ubicacion" type="text" placeholder="Ubicacion" required/>
                    </div>
                    <div className="inputs-container">
                        <input onChange={e => handle(e)} id="estado_propiedad" type="text" placeholder="Estado de propiedad" />
                    </div>
                    <div className="inputs-container">
                        <p>Dueño</p> 
                        {/* Hacer componente de select dueño */}
                        {/* Hacer componente de select dueño */}
                        {/* Hacer componente de select dueño */}
                        <select onChange={e => handleDueño(e)}>
                            {loading ? 
                            <option>"Cargando..."</option> 
                            : error ? 
                            <option>No hay dueños</option> 
                            : dueños ? 
                            dueños.map(dueño => {
                                return(<option id={dueño._id}>{dueño.nombre} {dueño.apellido}</option>)
                            })
                            : <option>No hay dueños</option>
                            }
                        </select>
                    </div>
                    <div className="inputs-container">
                        <p>Tipo de propiedad</p> 
                        <select onChange={(e) => handlePropiedad(e)}>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Cochera">Cochera</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Galpon">Galpon</option>
                        </select>
                    </div>
                    <div className="inputs-container">
                        <input onChange={e => handle(e)} type="number" id="precio" placeholder="Precio" />
                        <input onChange={e => handle(e)} type="number" id="superficie" placeholder="Superficie m²" />
                    </div>
                    {(data.tipo_propiedad === "Casa" || data.tipo_propiedad === "Departamento") && 
                        <div className="inputs-container">
                            <input onChange={e => handle(e)} id="cant_habitaciones" type="number" placeholder="Cant. habitaciones" />
                            <input onChange={e => handle(e)} id="cant_baños" type="number" placeholder="Cant. baños" />
                        </div>
                    }
                    {data.tipo_propiedad === "Casa" && 
                        <div className="inputs-container">
                            <input onChange={e => handle(e)} id="cant_pisos" type="number" placeholder="Cant. pisos" />
                            <input onChange={e => handle(e)} id="antiguedad" type="text" placeholder="Antiguedad" />
                        </div>
                    }
                    {data.tipo_propiedad === "Departamento" && 
                        <div className="inputs-container">
                            <input onChange={e => handle(e)} id="piso" type="text" placeholder="Piso" />
                            <input onChange={e => handle(e)} id="acceso" type="text" placeholder="Acceso" />
                        </div>
                    }
                    { (data.tipo_propiedad === "Casa" || data.tipo_propiedad === "Departamento") &&
                        <div className="cochera-check">
                            <div className={cochera ? "btn-green cochera-checkbox" : "btn-red cochera-checkbox"} onClick={() => {
                                handleCochera()
                            }}>
                                <FontAwesomeIcon icon={cochera ? 'check' : 'times'} className={cochera ? "fas fa-check" : "fas fa-times"}/><i></i>
                            </div>
                            <p>Cochera</p>
                        </div>
                    }
                    <div className="inputs-container">
                        <textarea placeholder="Descripcion" />
                    </div>
                    <div className="inputs-container">
                        <textarea placeholder="Entorno" />
                    </div>
                    {/* Falta seleccionador de imagenes */}
                    <div className="form-buttons-container">
                        <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                        <button className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times" /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormPropiedad