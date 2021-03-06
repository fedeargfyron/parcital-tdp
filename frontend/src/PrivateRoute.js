import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = ({component, userReload}) => {

    const getUser = useSelector(state => state.user)
    const { user } = getUser
    if((user && user !== "") || (userReload && userReload !== ""))
        return component
    else
        return <Redirect to="/"/>
    
}

export default PrivateRoute