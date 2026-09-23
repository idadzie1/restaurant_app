import React from 'react'

const ChangePassErrorBox = ({ errorMsg, clickingOk}) => {
  return (
        <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>{errorMsg}</p>
        </div>
        <div className="buttons-controls">         
              <button onClick={clickingOk}>Ok</button>       
                   
        </div>
      </div>      
    </div>

  )
}

export default ChangePassErrorBox
