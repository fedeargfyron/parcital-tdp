import React, { useState } from 'react'
import './Forms.css'
import HeaderPage from '../../components/HeaderPage'
import { useHistory } from 'react-router'

const FormPropiedad = () => {
    const history = useHistory()
    const [tipoPropiedad, setTipoPropiedad] = useState("Casa")
    const [cochera, setCochera] = useState(false)
    return(
        <div className="formScreen">
            <div className="page-container">
                <HeaderPage titulo="Propiedad"/>
                <form className="form-container">
                    <label className="form-title">Agregar propiedad</label>
                    <div className="inputs-container">
                        <input type="text" placeholder="Ubicacion" required/>
                    </div>
                    <div className="inputs-container">
                        <input type="text" placeholder="Estado de propiedad" required/>
                    </div>
                    <div className="inputs-container">
                        <p>Dueño</p> 
                        <select>
                            <option>Seleccionar...</option>
                            {/* getDueños */}
                        </select>
                    </div>
                    <div className="inputs-container">
                        <p>Tipo de propiedad</p> 
                        <select onChange={(e) => setTipoPropiedad(e.target.value)}>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Cochera">Cochera</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Galpon">Galpon</option>
                        </select>
                    </div>
                    <div className="inputs-container">
                        <input type="text" placeholder="Precio" required/>
                        <input type="text" placeholder="Superficie (m²)" required/>
                    </div>
                    {(tipoPropiedad === "Casa" || tipoPropiedad === "Departamento") && 
                        <div className="inputs-container">
                            <input type="text" placeholder="Cant. habitaciones" required/>
                            <input type="text" placeholder="Cant. baños" required/>
                        </div>
                    }
                    {tipoPropiedad === "Casa" && 
                        <div className="inputs-container">
                            <input type="text" placeholder="Cant. pisos" required/>
                            <input type="text" placeholder="Antiguedad" required/>
                        </div>
                    }
                    {tipoPropiedad === "Departamento" && 
                        <div className="inputs-container">
                            <input type="text" placeholder="Piso" required/>
                            <input type="text" placeholder="Acceso" required/>
                        </div>
                    }
                    { (tipoPropiedad === "Casa" || tipoPropiedad === "Departamento") &&
                        <div className="cochera-check">
                            <div className={cochera ? "btn-green cochera-checkbox" : "btn-red cochera-checkbox"} onClick={() => setCochera(!cochera)}>
                                {cochera ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}<i></i>
                            </div>
                            <p>Cochera</p>
                        </div>
                    }
                    <div className="inputs-container">
                        <textarea placeholder="Descripcion" required/>
                    </div>
                    <div className="inputs-container">
                        <textarea placeholder="Entorno" required/>
                    </div>
                    {/* Falta seleccionador de imagenes */}
                    <div className="form-buttons-container">
                        <button className="btn-green"><i className="fas fa-check"></i></button>
                        <button className="btn-red" onClick={() => history.goBack()}><i className="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormPropiedad