import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import './MiPerfil.css'
const Perfil = () => {
    const usuario = {
        id: 1,
        nombre: 'Federico'
    }
    return(
        <div className="perfilScreen">
             <div className="perfil-container">
                 <HeaderPage titulo={`Perfil de ${usuario.nombre}`}/>
                <div className="detalles-usuario">
                    <h4>Detalles de usuario</h4>
                    <div className="detalles-info">
                        <p>Nombre y apellido: <span></span></p>
                        <p>E-mail: <span></span></p>
                        <p>Teléfono: <span></span></p>
                        <p>Dirección: <span></span></p>
                        <p>Usuario: <span></span></p>
                    </div>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-visitas">
                    <h4>Ultimas visitas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Horario</th>
                                <th>Interesado</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-ofertas">
                    <h4>Ultimas ofertas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Interesado</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-reservas">
                    <h4>Ultimas reservas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Inicio de reserva</th>
                                <th>Fin de reserva</th>
                                <th>Monto</th>
                                <th>Cliente</th>
                                <th>Agente</th>
                                <th>Numero de agente</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="line"></div>
                <div className="table-container ultimas-compras">
                    <h4>Ultimas compras</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Propiedad</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Agente</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Perfil