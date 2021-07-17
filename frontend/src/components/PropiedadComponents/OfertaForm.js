import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './OfertaForm.css'

const OfertaForm = ({setOfertaForm}) => {
    return(
        <div className="blackscreen-Oferta blackscreen">
            <form className="oferta-form">
                <FontAwesomeIcon icon={'times'} className="fa-times cerrarBtn" onClick={() => setOfertaForm(false)}/>
                <h4 className="oferta-form-title">Oferta por esta propiedad</h4>
                <input className="" placeholder="4000.00"type="text"/>
                <button className="btn">Enviar</button>
            </form>
        </div>
    )
}

export default OfertaForm