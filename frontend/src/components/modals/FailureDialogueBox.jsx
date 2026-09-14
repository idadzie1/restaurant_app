import React from 'react'

const FailureDialogueBox = ({ deletionErrorRes, okClick, errorMessage, oKone, menuUploadfailMsg, failOk, deletionErrorGalleryImg}) => {
    const messages = deletionErrorRes || errorMessage || menuUploadfailMsg || deletionErrorGalleryImg;
    const okClicks = okClick || oKone || failOk
  return (

        <div className='confirmation-modal'>
            <div className="modal-information">
                <div className="confirmation-notice">
                    <p>{messages}</p>
                </div>
                <div className="buttons-controls">
                    <button onClick={okClicks}>Ok</button>            
                </div>
            </div>      
        </div>    
  )
}

export default FailureDialogueBox
