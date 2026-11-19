import React, { useContext } from 'react'
import { useEffect } from 'react';
import { DialogboxContext } from '../../context/dialogboxContext'

const AccDeleteDiaglogueBox = () => {
    const { dialog, setDialog } = useContext(DialogboxContext)

     if(!dialog) return null
 
  return (
        <div className='confirmation-modal'>           
            <div className="modal-information">
                <div className="confirmation-notice">
                    <p>Proceed to delete your account?</p>
                </div>
                <div className="buttons-controls">         
                    <button>Yes</button>              
                    <button onClick={()=> setDialog(false)}>No</button>                    
                </div>
            </div>      
        </div>
  )
}

export default AccDeleteDiaglogueBox;

