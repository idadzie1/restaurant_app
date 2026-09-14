import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import FailureDialogueBox from '../components/modals/FailureDialogueBox'
import SuccessDialogueBox from '../components/modals/SuccessDialogueBox'

// This is for replace of change a gallery photo
// =========================================================

const EditGallery = () => {
    const [imageFile, setImageFile] = useState({});    
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ successMessage, setSuccessMessage ] = useState("")
    const [ showError, setShowError ]=useState(false)
    const [ showSuccess, setShowSuccess ] = useState(false)

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate()
    const token = currentUser?.token;

    const { restaurantId, galleryId } = useParams()

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    }, [])

    const handleFiles = (e)=>{
        setImageFile(e.target.files[0])
    }

    const handleOkOnSuccess =()=>{
        setShowSuccess(false)
        navigate(`/restaurants/${restaurantId}`)
    }

      const handleClear = ()=>{
        setImageFile({})
        setErrorMessage("") 

        // if (fileInputRef.current) {
        //     fileInputRef.current.value = "";
        // }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData()
        formData.append('galleryImage', imageFile)

    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/gallery/${galleryId}`, {
            method: "PATCH",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        const data = await response.json()

        if(!response.ok){
         setErrorMessage(data.message)
          setShowError(true)
          return  
        }

        setSuccessMessage(data.message)
        setShowSuccess(true)
        return

    } catch (error) {
        setErrorMessage(error.message)
    }

  }
    
  return (
    <section className='edit-gallery'>
        {showSuccess && <SuccessDialogueBox editSucessMsg={successMessage} clickOkOnSuccessEdit={handleOkOnSuccess}/>}
        {showError && <FailureDialogueBox editFailureMsg={errorMessage} clickOkOnFailure={()=>setShowError(false)}/> }    
        <form onSubmit={handleSubmit}>
            <label htmlFor="gallery-edit">Upload Photo</label>
            <input
            // ref={fileInputRef}
            id='gallery-edit'
             type="file"
             name='galleryImage'
             onChange={handleFiles} 
             />
            <div className="button-class">
                <button type='submit'>Submit</button>
                <button type='reset' onClick={handleClear}>Clear</button>
            </div>  
        </form>
            <p className='filename-display'>{imageFile.name}</p>
    </section>
   
  )
}

export default EditGallery
