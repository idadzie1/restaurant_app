import React from 'react'

const ActionConfirmationDialogueBox = ({ confirmationMessage, clickYes, clickNo}) => {
  
  return (
    <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>{confirmationMessage}</p>
        </div>
        <div className="buttons-controls">         
              <button onClick={clickYes}>Yes</button>              
              <button onClick={clickNo}>No</button>       
                   
        </div>
      </div>      
    </div>
  )
}

export default ActionConfirmationDialogueBox

