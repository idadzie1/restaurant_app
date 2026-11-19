import { useState } from "react";
import {DialogboxContext} from './dialogboxContext'

const DialogboxProvider = ({ children }) => {
    const [ dialog, setDialog ] = useState(false) 


    return(
        <DialogboxContext.Provider value={{ dialog, setDialog}}>
            {children}    
        </DialogboxContext.Provider>
    )

}

export default DialogboxProvider;