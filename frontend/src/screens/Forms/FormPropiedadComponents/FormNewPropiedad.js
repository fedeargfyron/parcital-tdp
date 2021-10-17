import React, {useState} from 'react'
import SelectDueños from './Dueños'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router'
const FormNewPropiedad = ({sendPropiedad}) => {
    const history = useHistory()
    const [cochera, setCochera] = useState(false)
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

    return(
        <form className="form-container" onSubmit={(e) => sendPropiedad(e, data)}>
            <label className="form-title">Agregar propiedad</label>
            <div className="inputs-container">
                <input onChange={e => handle(e)} id="ubicacion" type="text" placeholder="Ubicacion" required/>
            </div>
            <div className="inputs-container">
                <input onChange={e => handle(e)} id="estado_propiedad" type="text" placeholder="Estado de propiedad" />
            </div>
            <div className="inputs-container">
                <p>Dueño</p> 
                <SelectDueños handle={handle} />
            </div>
            <div className="inputs-container">
                <p>Tipo de propiedad</p> 
                <select id="tipo_propiedad" onChange={(e) => handle(e)}>
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

export default FormNewPropiedad