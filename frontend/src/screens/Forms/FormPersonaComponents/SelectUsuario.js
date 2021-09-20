import React from 'react'

const SelectUsuario = ({id, usuario}) => {
    return(
    <option value={id} id={id} key={id}>{usuario}</option>
    )
}

export default SelectUsuario