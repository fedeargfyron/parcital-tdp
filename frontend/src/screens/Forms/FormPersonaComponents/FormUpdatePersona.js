import React, {useState, useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPersona } from '../../../redux/ducks/personaReducer'
import { CircularProgress } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router'
import { getUsersDisponibles } from '../../../redux/ducks/usersDisponiblesReducer'
import { getHorarios } from '../../../redux/ducks/horariosReducer'
import SelectUsuario from './SelectUsuario'
import Horario from './Horario'

const FormUpdatePersona = ({id, sendPersona}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [render, setRender] = useState(true)
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
    console.log(data)
    const personaInfo = useSelector(state => state.persona)
    const { loadingPersona, errorPersona, persona} = personaInfo

    const getUsers = useSelector(state => state.usersDisponibles)
    const { loading, usersDisponibles, error} = getUsers

    const horariosInfo = useSelector(state => state.horarios)
    const { loadingHorarios, errorHorarios, horarios } = horariosInfo

    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    useEffect(() => {
        const handleUpdate = () => {
            let newData = actualizarData(persona)
            setData(newData)
        }
        if(render){
            dispatch(getPersona(id))
            setRender(false)
        }
        if(persona && !persona.usuarioDatos)
            dispatch(getUsersDisponibles())
        
        if(persona && persona.tipoPersona === "Agente")
            dispatch(getHorarios())
        if(persona)
            handleUpdate()
    }, [dispatch, id, persona, render])
    
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
        <label className="form-title">Modificar persona</label>
        { loadingPersona ? <CircularProgress /> 
        : errorPersona ? <h2>Error!</h2>
        : persona && 
        <>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} value={data.nombre} id="nombre" type="text" placeholder="Nombre" required/>
                <input onChange={(e) => handle(e)} value={data.apellido}type="text" id="apellido" placeholder="Apellido" required/>
            </div>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} value={data.telefono} type="text" id="telefono" placeholder="Telefono" required/>
            </div>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} value={data.email} type="text" id="email" placeholder="E-mail" required/>
            </div>
            <div className="inputs-container">
                <input onChange={(e) => handle(e)} value={data.domicilio} type="text" id="domicilio" placeholder="Domicilio" required/>
            </div>
            <div className="inputs-container">
                <p>Usuario</p> 
                <select id="usuario" onChange={(e) => handle(e)}>
                    { persona.usuarioDatos ? 
                    <option value={persona.usuarioDatos._id}>{persona.usuarioDatos.usuario}</option>
                    : loading ? <option value="">Cargando usuarios...</option> 
                    : error ? <option value="">Error cargando usuarios!</option> 
                    : usersDisponibles && 
                        <>
                        <option value="">Seleccionar...</option>
                        {usersDisponibles.map(user => 
                        (<SelectUsuario {...user} key={user._id}/>))}
                        </>
                    }
                </select>
            </div>
            <div className="inputs-container">
                <p>Tipo de persona</p> 
                <select>
                    <option>{data.tipoPersona}</option>
                </select>
            </div>
            <div className="inputs-container">
                {data.tipoPersona === "Dueño" && <input onChange={(e) => handle(e)} value={data.escritura} type="text" id='escritura' placeholder="Escritura"/>}
            </div>
            <div className="inputs-container">
                {data.tipoPersona === "Agente" && <input onChange={(e) => handle(e)} value={data.cuil} type="text" id='cuil' placeholder="CUIL"/>}
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
                        : horarios && !render && horarios.map(horario => (
                            <Horario horario={horario} horarios={persona.horarios} key={horario._id}/>
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
        </> }
        </form>
        
    )
}

const actualizarData = (persona) => {
    let newData
    if(!persona) return newData 
    newData = {
    nombre: persona.nombre,
    apellido: persona.apellido,
    telefono: persona.telefono,
    email: persona.email,
    domicilio: persona.domicilio,
    usuario: persona.usuario,
    tipoPersona: persona.tipo,
    escritura: persona.escritura,
    titulo: persona.titulo,
    cuil: persona.cuil,
    horarios: persona.horarios
    }
    return newData
}

export default FormUpdatePersona