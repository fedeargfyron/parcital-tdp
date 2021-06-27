import React from 'react'
import './HeaderPage.css'
const HeaderPage = ({titulo}) => {
    return(
        <div className="header">
            <div className="line"></div>
            <h4 className="header-title">{titulo}</h4>
            <div className="line"></div>
        </div>
    )
    
}

export default HeaderPage