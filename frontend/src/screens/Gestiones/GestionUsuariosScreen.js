import React from 'react'
import HeaderPage from '../../components/HeaderPage'
import FiltroUsuarios from '../Filtros/FiltroUsuarios'

const GestionUsuariosScreen = () => {
    return (
        <div>
            <HeaderPage titulo="Gestion de usuarios"/>
            <FiltroUsuarios />
            <table className="table table-striped table-bordered">

            </table>
        </div>
    )
}

export default GestionUsuariosScreen