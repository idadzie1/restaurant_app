import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

// This if editing the menu. To change the text in the menu or photo or both
// =========================================================================

const EditMenu = () => {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const fileInputRef = useRef(null);

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  }, [])

  const handleChange = (e) =>{    
    setDescription(e.target.value)
  }

  const handleFiles = (e)=>{
    setFile(e.target.files[0])
  }
  
  const handleClear = ()=>{
    setDescription("");
    setErrorMessage("");
    setFile(null);

      if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleSubmit = (e)=>{

  }

  return (
    <section id='edit-menu'>
      <h3 className='menu-dishes-drinks'>Change or Replace Menu</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          ref={fileInputRef}
          id='img' 
          type="file" 
          name='fileupload'
          onChange={handleFiles} 
        />

        <textarea
          id='msg'          
          name='menuDescription' 
          value={description}
          onChange={handleChange}
        />
        <div className="button-class">
          <button type='submit'>Submit</button>
          <button type='reset' onClick={handleClear}>Clear</button>
        </div>        
      </form>

    </section>

  )
}

export default EditMenu
