import React from 'react'

const DialogueBox = ({ 
  confirmationMessage, 
  notificationToProceedOrNot, 
  clickYes, 
  clickNo, 
  clickOnOk, 
  clickOnCancel, 
  clickOkOnDelOfGalleryImg, 
  notifyToProceedToDelGalleryImg
}) => { 
  const notificationMsg = confirmationMessage || notificationToProceedOrNot || notifyToProceedToDelGalleryImg
  // const yesOnlick = clickYes || clickOnOk || clickOkOnDelOfGalleryImg

    const yesOnClick = notifyToProceedToDelGalleryImg
    ? clickOkOnDelOfGalleryImg
    : clickYes || clickOnOk

  const noOnClick = clickNo || clickOnCancel
  
  return (
    <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>{notificationMsg}</p>
        </div>
        <div className="buttons-controls">         
              <button onClick={yesOnClick}>Yes</button>
              <button onClick={noOnClick}>No</button>     
                   
        </div>
      </div>      
    </div>
  )
}

export default DialogueBox
