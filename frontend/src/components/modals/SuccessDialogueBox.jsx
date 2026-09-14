import React from 'react'

const SuccessDialogueBox = ({ deletionSuccessRes, oK, successMessage, okClick, menuUploadsuccMsg, succOk, editSucessMsg, clickOkOnSuccessEdit, galleryImgDelSuccess}) => {
    const responses = deletionSuccessRes || successMessage || menuUploadsuccMsg || editSucessMsg ||galleryImgDelSuccess;
    const clickToCfm = oK || okClick || succOk || clickOkOnSuccessEdit
  return (

        <div className='confirmation-modal'>
            <div className="modal-information">
                <div className="confirmation-notice">
                    <p>{responses}</p>
                </div>
                <div className="buttons-controls">
                    <button onClick={clickToCfm}>Ok</button>            
                </div>
            </div>      
        </div>    
  
    )
}

export default SuccessDialogueBox
