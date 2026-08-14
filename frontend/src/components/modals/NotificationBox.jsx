import React from 'react'

const NotificationBox = ({clickok, response}) => {
  return (
    <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>{response}</p>
        </div>
        <div className="buttons-controls">
            <button onClick={clickok}>Ok</button>            
        </div>
      </div>      
    </div>
  
  )
}

export default NotificationBox
