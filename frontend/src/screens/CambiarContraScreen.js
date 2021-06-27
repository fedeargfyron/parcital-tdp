import React from 'react'
import '../Styles/FormStyle.css'
import './CambiarContraScreen.css'
const CambiarContraScreen = () => {

    return(
        <div className="CambiarContraScreen">
            <div className="form-container">
                <h4 className="titlePasswordChange">Cambiar contraseña</h4>
                <form className="form">
                    <input type="text" placeholder="Contraseña actual" required/>
                    <input type="text" placeholder="Contraseña nueva" required/>
                    <input type="text" placeholder="Repetir contraseña nueva" required/>
                    <button className="btn cambiarContra-btn">Guardar</button>
                </form>
            </div>
        </div>
        
    )
}

export default CambiarContraScreen