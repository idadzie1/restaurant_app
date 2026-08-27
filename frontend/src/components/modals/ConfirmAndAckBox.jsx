import React from 'react'

import { useState } from 'react'
const ConfirmAndAckBox = ({userconfirm, userack, userConfirm, onChangeCfm, onChangeAck, userAck, clickYes, clickNo}) => {

 

  return (

    <div className='confirmation-modal'>
      <div className="confirmack-information">
        <div className="confirmation-notice">

          <div className="confirm-checkbox">
            <input 
              type="checkbox"
              name= 'confirm'
              checked = {userConfirm}
              onChange={onChangeCfm}
              />
            <p>
                I confirm that I am authorised to claim or manage this restaurant listing and that the information I have provided is accurate. I understand that Dine Finder may verify my claim and may contact me or request additional information where reasonably necessary for verification.
            </p>
          </div>
          <div className="ack-checkbox">
            <input 
              type="checkbox"
              name='acknowledgement'
              checked = {userAck}
              onChange={onChangeAck}
              />
            <p>
                I acknowledge that the information I provide will be processed in accordance with the Privacy Policy.
            </p>
          </div>
        </div>
        <div className="buttons-controls">         
              <button onClick={clickYes}>Yes</button>
              <button onClick={clickNo}>No</button>       
                   
        </div>
      </div>      
    </div>

  )
}

export default ConfirmAndAckBox
