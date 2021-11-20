import React, {useState, useEffect} from 'react'
import SelectDueños from './Dueños'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getTiposPropiedad } from '../../../redux/ducks/tiposPropiedadReducer'
import messageAdder from '../../../MessageAdder'
import axios from 'axios'
const FormNewPropiedadRefactor = ({sendPropiedad}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [cochera, setCochera] = useState(false)
    const tiposPropiedadInfo = useSelector(state => state.tipos_propiedad)
    const {tiposPropiedad, loadingTiposPropiedad, errorTiposPropiedad} = tiposPropiedadInfo
    const [data, setData] = useState({
        ubicacion: "",
        estado_propiedad: "",
        dueño: "",
        precio: "",
        superficie: "",
        descripcion: "",
        entorno: "",
        antiguedad: "",
        tipo: "Nuevo",
        tipo_propiedad: "Casa",
        tipo_descripcion: "",
        cant_habitaciones: "",
        cant_baños: "",
        cant_pisos: "",
        cochera: false,
        piso: "",
        acceso: "",
        imagenes: []
    })

    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    useEffect(() => {
        dispatch(getTiposPropiedad())
    }, [dispatch])

    const handleTipo = (e) => {
        const newdata = {...data}
        newdata.tipo = e.target.value
        if(e.target.value === "Nuevo"){
            setData(newdata)
            return
        }
        let tipoDto = tiposPropiedad.find(x => x._id === e.target.value)
        newdata.tipo_descripcion = tipoDto.descripcion ? tipoDto.descripcion : ""
        newdata.cant_habitaciones = tipoDto.cantidad_habitaciones ? tipoDto.cantidad_habitaciones : ""
        newdata.tipo_propiedad = tipoDto.tipo ? tipoDto.tipo : ""
        newdata.cant_baños = tipoDto.cantidad_baños ? tipoDto.cantidad_baños : ""
        newdata.cant_pisos = tipoDto.cantidad_pisos ? tipoDto.cantidad_pisos : ""
        newdata.cochera = tipoDto.cochera ? tipoDto.cochera : false
        newdata.piso = tipoDto.piso ? tipoDto.piso : ""
        newdata.acceso = tipoDto.acceso ? tipoDto.acceso : ""
        setData(newdata)
    }

    const handleCochera = () => {
        setCochera(!cochera)
        const newdata = {...data}
        newdata["cochera"] = !cochera
        setData(newdata)
    }

    const preview = async (e) => {
        const newdata ={...data}
        newdata["imagenes"] = await previewData([...e.target.files])
        setData(newdata)
    }

    const previewData = async (files) => {
        
        return await Promise.all(files.map(async (file) => {
            return await readUploadedFile(file)
        }))
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

    const deleteTipo = async () => {
        dispatch({
            type: 'LOADING_TRUE'
        })
        await axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:4000/api/tiposPropiedad/${data.tipo}`
        }).then(res => {
            dispatch({
                type: 'LOADING_FALSE'
            })
            messageAdder(res.data)
            if(res.data.type === "success"){
                dispatch(getTiposPropiedad())
                let newData = {...data}
                newData.tipo = "Nuevo"
                setData(newData)
            }
        })
    }

    return(
        <form className="form-container" onSubmit={(e) => sendPropiedad(e, data)}>
            <label className="form-title">Agregar propiedad refactor</label>
            <div className="inputs-container">
                <input onChange={e => handle(e)} id="ubicacion" type="text" placeholder="Ubicacion" required/>
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} id="estado_propiedad" type="text" placeholder="Estado de propiedad" />
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} type="number" id="precio" placeholder="Precio" />
                <input onChange={e => handle(e)} type="number" id="superficie" placeholder="Superficie m²" />
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} value={data.antiguedad} id="antiguedad" type="text" placeholder="Antiguedad"/>
            </div>
            <div className="inputs-container">
                <p>Dueño</p> 
                <SelectDueños handle={handle} />
            </div>

            
            <div className="inputs-container offsetInputContainer">
                <p>Tipo</p> 
                <select id="tipo" onChange={(e) => handleTipo(e)}>
                    <option value="Nuevo">Nuevo</option>
                    { loadingTiposPropiedad ? <option>Cargando...</option>
                    : errorTiposPropiedad ? <option>Error</option>
                    : tiposPropiedad && tiposPropiedad.map(tipoPropiedad => <option key={tipoPropiedad._id} value={tipoPropiedad._id}>{tipoPropiedad.descripcion}</option>)}
                </select>
                {data.tipo !== "Nuevo" && <button className="btn-red offsetButton" onClick={() => {deleteTipo()}}><FontAwesomeIcon icon='trash' className="fas fa-trash"/></button>}
                
            </div>
            <div className="inputs-container">
                <p>Tipo de propiedad</p> 
                <select id="tipo_propiedad" onChange={(e) => handle(e)} value={data.tipo_propiedad}>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Cochera">Cochera</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Galpon">Galpon</option>
                </select>
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} value={data.tipo_descripcion} id="tipo_descripcion" type="text" placeholder="Descripcion tipo de propiedad" />
            </div>
            
            {(data.tipo_propiedad === "Casa" || data.tipo_propiedad === "Departamento") && 
                <div className="inputs-container">
                    <input onChange={e => handle(e)} value={data.cant_habitaciones} id="cant_habitaciones" type="number" placeholder="Cant. habitaciones" disabled={data.tipo !== "Nuevo"} />
                    <input onChange={e => handle(e)} value={data.cant_baños} id="cant_baños" type="number" placeholder="Cant. baños" disabled={data.tipo !== "Nuevo"} />
                </div>
            }
            {data.tipo_propiedad === "Casa" && 
                <div className="inputs-container">
                    <input onChange={e => handle(e)} value={data.cant_pisos} id="cant_pisos" type="number" placeholder="Cant. pisos" disabled={data.tipo !== "Nuevo"} />
                </div>
            }
            {data.tipo_propiedad === "Departamento" && 
                <div className="inputs-container">
                    <input onChange={e => handle(e)} value={data.piso} id="piso" type="text" placeholder="Piso" disabled={data.tipo !== "Nuevo"} />
                    <input onChange={e => handle(e)} value={data.acceso} id="acceso" type="text" placeholder="Acceso" disabled={data.tipo !== "Nuevo"} />
                </div>
            }
            { (data.tipo_propiedad === "Casa" || data.tipo_propiedad === "Departamento") &&
                <div className="cochera-check">
                    <div className={cochera ? "btn-green cochera-checkbox" : "btn-red cochera-checkbox"} onClick={() => {
                        if(data.tipo === "Nuevo"){
                            handleCochera()
                        }
                    }}>
                        <FontAwesomeIcon icon={cochera ? 'check' : 'times'} className={cochera ? "fas fa-check" : "fas fa-times"}/><i></i>
                    </div>
                    <p>Cochera</p>
                </div>
            }
            
            <div className="inputs-container">
                <textarea id="descripcion" onChange={e => handle(e)} placeholder="Descripcion" />
            </div>
            <div className="inputs-container">
                <textarea id="entorno" onChange={e => handle(e)} placeholder="Entorno" />
            </div>
            <div className="inputs-container  upload-image-container">
                <p className="imagenes-title">Imagenes:  <span>{data.imagenes.length}</span></p>
                <div id="imagenes">
                    {data.imagenes.length > 0 && data.imagenes.map((imagen, index) => 
                    <div className="imagen" key={index} style={{backgroundImage: "url('" + imagen + "')"}}>
                    </div>)}
                </div>
                <div className="inputs-container imagenes-input">
                    <input type="file" accept="image/png, image/jpeg" multiple id="file-input" onChange={(e) => preview(e)}></input>
                    <label htmlFor="file-input">Imagenes <FontAwesomeIcon icon="upload" /></label>
                </div>
                
            </div>
            <div className="form-buttons-container">
                <button className="btn-green"><FontAwesomeIcon icon='check' className="fas fa-check"/></button>
                <button type="button" className="btn-red" onClick={() => history.goBack()}><FontAwesomeIcon icon='times' className="fas fa-times" /></button>
                
            </div>
        </form>
    )
}

export default FormNewPropiedadRefactor