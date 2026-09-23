import React from 'react'

const ChangePassSuccessBox = ({ successResponse, clcikingOk }) => {
  return (
        <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>{successResponse}</p>
        </div>
        <div className="buttons-controls">         
              <button onClick={clcikingOk}>Ok</button>              
                    
                   
        </div>
      </div>      
    </div>

  )
}

export default ChangePassSuccessBox
