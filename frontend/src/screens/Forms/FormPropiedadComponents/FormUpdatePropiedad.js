import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPropiedad } from '../../../redux/ducks/propiedadReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router'
import { CircularProgress } from '@material-ui/core'
const FormUpdatePropiedad = ({id, sendPropiedad}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const setPropiedad = useSelector((state) => state.propiedad)
    const { propiedad, loadingPropiedad, errorPropiedad } = setPropiedad
    const [cochera, setCochera] = useState(false)
    const [render, setRender] = useState(true)
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
        acceso: "",
        imagenes: []
    })
    const handle = (e) => {
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
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

    useEffect(() => {
        const handleUpdate = () => {
            let newData = actualizarData(propiedad)
            setCochera(newData.cochera)
            setData(newData)
        }
        if(render){
            dispatch(getPropiedad(id))
            setRender(false)
        }
        if(propiedad)
            handleUpdate()

    }, [dispatch, id, propiedad, render])
    return(
        <form className="form-container" onSubmit={(e) => sendPropiedad(e, data)}>
            <label className="form-title">Modificar propiedad</label>
            {loadingPropiedad ? <CircularProgress /> 
            : errorPropiedad ? <h2>Error!</h2>
            : propiedad && 
            <>
            <div className="inputs-container">
                <input onChange={e => handle(e)} value={data.ubicacion} id="ubicacion" type="text" placeholder="Ubicacion" required/>
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} value={data.estado_propiedad} id="estado_propiedad" type="text" placeholder="Estado de propiedad" />
            </div>
            <div className="inputs-container">
                <p>Dueño</p> 
                <select><option>{data.dueño}</option></select>
            </div>
            <div className="inputs-container">
                <p>Tipo de propiedad</p>
                <select><option>{data.tipo_propiedad}</option></select>
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} value={data.precio} type="number" id="precio" placeholder="Precio" />
                <input onChange={e => handle(e)} value={data.superficie} type="number" id="superficie" placeholder="Superficie m²" />
            </div>
            {(data.tipo_propiedad === "Casa" || data.tipo_propiedad === "Departamento") && 
                <div className="inputs-container">
                    <input onChange={e => handle(e)} value={data.cant_habitaciones} id="cant_habitaciones" type="number" placeholder="Cant. habitaciones" />
                    <input onChange={e => handle(e)} value={data.cant_baños} id="cant_baños" type="number" placeholder="Cant. baños" />
                </div>
            }
            {data.tipo_propiedad === "Casa" && 
                <div className="inputs-container">
                    <input onChange={e => handle(e)} value={data.cant_pisos}id="cant_pisos" type="number" placeholder="Cant. pisos" />
                    <input onChange={e => handle(e)} value={data.antiguedad} id="antiguedad" type="text" placeholder="Antiguedad" />
                </div>
            }
            {data.tipo_propiedad === "Departamento" && 
                <div className="inputs-container">
                    <input onChange={e => handle(e)} value={data.piso} id="piso" type="text" placeholder="Piso" />
                    <input onChange={e => handle(e)} value={data.acceso} id="acceso" type="text" placeholder="Acceso" />
                </div>
            }
            { (data.tipo_propiedad === "Casa" || data.tipo_propiedad === "Departamento") &&
                <div className="cochera-check">
                    <div className={cochera ? "btn-green cochera-checkbox" : "btn-red cochera-checkbox"} onClick={() => {
                        handleCochera()
                    }}>
                        <FontAwesomeIcon icon={cochera ? 'check' : 'times'} className={cochera ? "fas fa-check" : "fas fa-times"}/>
                    </div>
                    <p>Cochera</p>
                </div>
            }
            <div className="inputs-container">
                <textarea id="descripcion" onChange={e => handle(e)} value={data.descripcion} placeholder="Descripcion" />
            </div>
            <div className="inputs-container">
                <textarea id="entorno" onChange={e => handle(e)} value={data.entorno} placeholder="Entorno" />
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
            </>
        }
        </form>
    )
}

const actualizarData = (propiedad) => {
    let newData
    if(!propiedad) return newData 
    newData = {
    ubicacion: propiedad.ubicacion,
    estado_propiedad: propiedad.estado_propiedad,
    dueño: `${propiedad.dueñoDatos.nombre} ${propiedad.dueñoDatos.apellido}`,
    tipo_propiedad: propiedad.tipoDatos.tipo,
    precio: propiedad.precio,
    superficie: propiedad.superficie,
    descripcion: propiedad.descripcion,
    entorno: propiedad.entorno,
    antiguedad: propiedad.tipoDatos.antiguedad,
    cochera: propiedad.tipoDatos.cochera,
    piso: propiedad.tipoDatos.piso,
    acceso: propiedad.tipoDatos.acceso,
    cant_baños: propiedad.tipoDatos.cantidad_baños,
    cant_habitaciones: propiedad.tipoDatos.cantidad_habitaciones,
    cant_pisos: propiedad.tipoDatos.cantidad_pisos,
    imagenes: propiedad.imagenes
    }
    if(newData.cochera === undefined)
        newData.cochera = false
    return newData
}

export default FormUpdatePropiedad