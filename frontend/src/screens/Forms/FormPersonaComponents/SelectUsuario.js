import React from 'react'

const SelectUsuario = ({id, usuario}) => {
    return(
    <option id={id} key={id}>{usuario}</option>
    )
}

export default SelectUsuario