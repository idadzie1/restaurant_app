import React from 'react'

const PromptYesNoDialogueBox = ({ clickOnOk, clickOnCancel }) => {        

  return (

    <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p> Do You Want To Proceed ?</p>
        </div>
        <div className="buttons-controls">
            <button onClick={clickOnOk}>Ok</button> 
            <button onClick={clickOnCancel}>Cancel</button>            
        </div>
      </div>      
    </div>

  )
}

export default PromptYesNoDialogueBox
