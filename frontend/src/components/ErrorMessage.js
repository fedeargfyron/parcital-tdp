import React from 'react'
import './ErrorMessage.css'
const ErrorMessage = ({message}) => {
    return(
        <div className="error-message">
            <h4>Error!</h4>
            <p>{message}</p>
        </div>

    )
}

export default ErrorMessage