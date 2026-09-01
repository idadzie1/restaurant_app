const ErrorAndResDialogueBoxTwo = ({errorMessage, response, clickOk}) => {
  const notification = errorMessage || response || ""
  return (
        <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>{notification}</p>
        </div>
        <div className="buttons-controls">
            <button onClick={clickOk}>Ok</button>            
        </div>
      </div>      
    </div>
   
  )
}

export default ErrorAndResDialogueBoxTwo