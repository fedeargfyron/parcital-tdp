import React, { useEffect, useState } from 'react'
import { getUsersDisponibles } from '../../../redux/ducks/usersDisponiblesReducer'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SelectUsuario from './SelectUsuario'
import { useHistory } from 'react-router'
import { getHorarios } from '../../../redux/ducks/horariosReducer'
import { CircularProgress } from '@material-ui/core'
import  Horario  from './Horario'

const FormNewPersona = ({sendPersona}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        domicilio: '',
        usuario: '',
        tipoPersona: '',
        escritura: '',
        titulo: '',
        cuil: '',
        horarios: []
    })
    const getUsers = useSelector(state => state.usersDisponibles)
    const { loading, usersDisponibles, error} = getUsers
    const horariosInfo = useSelector(state => state.horarios)
    const { loadingHorarios, errorHorarios, horarios } = horariosInfo
    useEffect(() => {
        dispatch(getHorarios())
        dispatch(getUsersDisponibles())
    }, [dispatch])
    console.log(data)
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const preview = async (e) => {
        const newdata ={...data}
        newdata["titulo"] = await previewData([...e.target.files])
        setData(newdata)
    }

    const previewData = async (files) => {
        console.log(files)
        return await readUploadedFile(files[0])
    }

    const readUploadedFile = (file) => {
        let reader = new FileReader()

        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
        
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        })
    }
    
    return(
        <form className="form-container" onSubmit={(e) => sendPersona(e, data)}>
            <label className="form-title">Agregar persona</label>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} id="nombre" type="text" placeholder="Nombre" required/>
                <input onChange={(e) => handle(e)} type="text" id="apellido" placeholder="Apellido" required/>
            </div>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} type="text" id="telefono" placeholder="Telefono" required/>
            </div>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} type="text" id="email" placeholder="E-mail" required/>
            </div>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} type="text" id="domicilio" placeholder="Domicilio" required/>
            </div>
            <div className="inputs-container">
                <p>Usuario</p> 
                <select id="usuario" onChange={(e) => handle(e)}>
                    <option value="">Seleccionar...</option>
                    {loading ? <option value="">Cargando usuarios...</option> 
                    : error ? <option value="">Error obteniendo usuarios</option> 
                    : usersDisponibles && usersDisponibles.map(user => 
                        <SelectUsuario {...user} key={user._id}/>
                    )}
                </select>
            </div>
            <div className="inputs-container">
                <p>Tipo de persona</p> 
                <select id="tipoPersona" onChange={(e) => handle(e)}>
                    <option value="Interesado">Interesado</option>
                    <option value="Agente">Agente</option>
                    <option value="Dueño">Dueño</option>
                </select>
            </div>
            <div className="inputs-container">
                {data.tipoPersona === "Agente" && <input onChange={(e) => handle(e)} type="text" id='titulo' placeholder="Titulo"/>}
                {data.tipoPersona === "Dueño" && <input onChange={(e) => handle(e)} type="text" id='escritura' placeholder="Escritura"/>}
            </div>
            <div className="inputs-container">
                {data.tipoPersona === "Agente" && <input onChange={(e) => handle(e)} type="text" id='cuil' placeholder="CUIL"/>}
            </div>
            {data.tipoPersona === "Agente" &&
            <div className="inputs-container">
                <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                        { loadingHorarios ? <tr><td colSpan="2" className="centerCircularProgress"><CircularProgress /></td></tr>
                        : errorHorarios ? <tr><td colSpan="2">Error cargando horarios!</td></tr> 
                        : horarios && horarios.map(horario => (
                            <Horario horario={horario} key={horario._id}/>
                        ))}
                        </tbody>
                    </table>
            </div>
            }
            {data.tipoPersona === "Agente" && 
            <>
            {data.titulo !== "" && <p className="imagenes-title">Titulo cargado</p>}
            <div className="inputs-container imagenes-input">
                <input type="file" accept=".pdf" multiple="false" id="file-input" onChange={(e) => preview(e)}></input>
                <label htmlFor="file-input">Titulo <FontAwesomeIcon icon="upload" /></label>
            </div>
            </> 
            }
            <div className="form-buttons-container">
                <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                <button type="button" className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times'className="fas fa-times"/></button>
            </div>
        </form>
    )
}

export default FormNewPersona