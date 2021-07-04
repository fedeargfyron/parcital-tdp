import React, {useState} from 'react'
import './PropiedadesScreen.css'
import { Link } from 'react-router-dom'
const PropiedadesScreen = () => {
    const [propiedades, setPropiedades] = useState([])
    const casa1 = "../imagenes/Casa1.jpg"
    return(
        <div className="propiedadesScreen">
            <div className="leftside">
                <img src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg" alt="Propiedad"/>
            </div>
            <div className="rightside">
                <div className="rightside-container">
                    <div className="rightside-header">
                        <h4 className="propiedades-title">Venta de casas de 2 dormitorios</h4>
                        <div className="line"></div>
                        <div className="filter-container">
                            <p className="filter-label">Ordenar por:</p>
                            <select className="filter-select">
                                <option>Alfabeticamente</option>
                                <option>$ Mayor a menor</option>
                                <option>$ Menor a mayor</option>
                            </select>
                        </div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="propiedades-container">
                    <Link to ="/propiedad/2"className="propiedad-container">
                        <div className="img-container">
                            <img src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg" alt="asd"></img>
                        </div>
                        <div className="propiedad-info">
                            <div>
                                <p className="tipo">Venta casa 2 dormitorios</p>
                                <p className="direccion">Mendoza y Crespo</p>
                                <p className="precio">$250.000</p>
                                <p className="descripcion">Piso exclusivo orientado al norte con ventilación cruzada, ubicado en planta baja.</p>
                            </div>
                            <div className="sub-info">
                                <p><i className="fas fa-expand-arrows-alt"></i><span>73m²</span></p>
                                <p><i className="fas fa-car-alt"></i><span>Cochera</span></p>
                                <p><i className="fas fa-bath"></i><span>5 baños</span></p>
                            </div>
                        </div>
                    </Link>
                    <div className="propiedad-line"></div>
                    <Link to ="/propiedad/2"className="propiedad-container">
                        <div className="img-container">
                            <img src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg" alt="asd"></img>
                        </div>
                        <div className="propiedad-info">
                            <div>
                                <p className="tipo">Venta casa 2 dormitorios</p>
                                <p className="direccion">Mendoza y Crespo</p>
                                <p className="precio">$250.000</p>
                                <p className="descripcion">Piso exclusivo orientado al norte con ventilación cruzada, ubicado en planta baja.</p>
                            </div>
                            <div className="sub-info">
                                <p><i className="fas fa-expand-arrows-alt"></i><span>73m²</span></p>
                                <p><i className="fas fa-car-alt"></i><span>Cochera</span></p>
                                <p><i className="fas fa-bath"></i><span>5 baños</span></p>
                            </div>
                        </div>
                    </Link>
                    <div className="propiedad-line"></div>
                    <Link to ="/propiedad/2"className="propiedad-container">
                        <div className="img-container">
                            <img src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg" alt="asd"></img>
                        </div>
                        <div className="propiedad-info">
                            <div>
                                <p className="tipo">Venta casa 2 dormitorios</p>
                                <p className="direccion">Mendoza y Crespo</p>
                                <p className="precio">$250.000</p>
                                <p className="descripcion">Piso exclusivo orientado al norte con ventilación cruzada, ubicado en planta baja.</p>
                            </div>
                            <div className="sub-info">
                                <p><i className="fas fa-expand-arrows-alt"></i><span>73m²</span></p>
                                <p><i className="fas fa-car-alt"></i><span>Cochera</span></p>
                                <p><i className="fas fa-bath"></i><span>5 baños</span></p>
                            </div>
                        </div>
                    </Link>
                    <div className="propiedad-line"></div>
                    <Link to ="/propiedad/2"className="propiedad-container">
                        <div className="img-container">
                            <img src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg" alt="asd"></img>
                        </div>
                        <div className="propiedad-info">
                            <div>
                                <p className="tipo">Venta casa 2 dormitorios</p>
                                <p className="direccion">Mendoza y Crespo</p>
                                <p className="precio">$250.000</p>
                                <p className="descripcion">Piso exclusivo orientado al norte con ventilación cruzada, ubicado en planta baja.</p>
                            </div>
                            <div className="sub-info">
                                <p><i className="fas fa-expand-arrows-alt"></i><span>73m²</span></p>
                                <p><i className="fas fa-car-alt"></i><span>Cochera</span></p>
                                <p><i className="fas fa-bath"></i><span>5 baños</span></p>
                            </div>
                        </div>
                    </Link>
                    <div className="propiedad-line"></div>
                </div>
            </div>
        </div>
    )
}

export default PropiedadesScreen