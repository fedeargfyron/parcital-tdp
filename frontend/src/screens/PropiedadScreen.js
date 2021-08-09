import './PropiedadesScreen.css'
import React, {useState} from 'react'
import HeaderPage from '../components/HeaderPage'
import './PropiedadScreen.css'
import OfertaForm from '../components/PropiedadComponents/OfertaForm'
import VisitaForm from '../components/PropiedadComponents/VisitaForm'
const PropiedadScreen = () => {
    const [ofertaForm, setOfertaForm] = useState(false)
    return(
        <div className="PropiedadScreen">
            <HeaderPage titulo={"Dirección de la propiedad"}/>
            <div className="precioOferta">
                <p>Precio: <span>$Precio</span></p>
                <button onClick={() => setOfertaForm(true)} id="Ofertar propiedad">Ofertar por esta propiedad</button>
            </div>
            <div className="line"></div>
            <div className="caracteristicas-generales">
                <h4 className="caracteristicas-title">Caracteristicas generales</h4>
                <ul className="caracteristicas">
                    <li><span>Casa de 2 dormitorios</span> en Rosario</li>
                    <li>Baños: <span>1</span></li>
                    <li>Cochera: <span>Si</span></li>
                    <li>Antiguedad: <span>11 años</span></li>
                    <li>Superficie: <span>73m²</span></li>
                    <li>Estado: <span>A estrenar</span></li>
                    <li>Cantidad de pisos: 1</li>
                </ul>
            </div>
            <div className="line"></div>
            <div className="descripcion">
                <h4 className="descripcion-title">Descripción</h4>
                <p>
                    Acá va a haber una descripción del edificio completa. Para rellenar espacio voy a usar un lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                    Acá va a haber una descripción del entorno del edificio. Para rellenar espacio voy a usar un lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="line"></div>
            <div className="galeria-imagenes">
                <h4 className="galeria-title">Galería de imagenes</h4>
                
                <div className="imagenes-container">
                    <div className="imagen-container">
                        <img alt="s" src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg"/>
                    </div>
                    <div className="imagen-container">
                        <img alt="s" src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg"/>
                    </div>
                    <div className="imagen-container">
                        <img alt="s" src="https://assets-global.website-files.com/5f4f67c5950db17954dd4f52/5f5b7ee442f1e5b9fee1c117_hacerse-una-casa.jpeg"/>
                    </div>
                    <div className="imagen-container">
                        <img alt="s" src="https://i1.wp.com/moovemag.com/wp-content/uploads/2021/03/casa-contenedores-maritimos-boxhouse.jpeg?fit=700%2C836&ssl=1"/>
                    </div>
                </div>
            </div>
            {ofertaForm && <OfertaForm setOfertaForm={setOfertaForm}/>}
            <VisitaForm />
        </div>
    )
}

export default PropiedadScreen