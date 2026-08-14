import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

// This is for replace of change a gallery photo
// =========================================================

const EditGallery = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage]=useState("")

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate()
    const token = currentUser?.token;

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    }, [])

    const handleFiles = (e)=>{
        setFile(e.target.files[0])
    }

      const handleClear = ()=>{
        setErrorMessage("") 

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
  }

  const handleSubmit = (e) =>{

  }
    
  return (
    <section className='edit-gapplery'>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
            ref={fileInputRef}
             type="file"
             name='fileUpload'
             onChange={} 
             />
            <div className="button-class">
                <button type='submit'>Submit</button>
                <button type='reset' onClick={handleClear}>Clear</button>
            </div>  
        </form>
    </section>
   
  )
}

export default EditGallery
