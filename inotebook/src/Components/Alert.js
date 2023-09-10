import React from 'react'

export default function Alert(props) {
    function capitalizeFirstLetter(word) {
        if(word==="danger"){
            word = "error"
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    return (
        <div>
            {props.alert&&<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalizeFirstLetter(props.alert.type)}:</strong> {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )
}
