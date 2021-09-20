import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PermissionRoute = ({component, userReload, formulario}) => {

    const getUser = useSelector(state => state.user)
    const { user } = getUser
    let form
    if(user && user.formularios)
        form = user.formularios.some(x => x.nombre === formulario)
    if(userReload && userReload.formularios)
        form = userReload.formularios.some(x => x.nombre === formulario)
    if(form)
        return component
    return <Redirect to="/"/>
}

export default PermissionRoute