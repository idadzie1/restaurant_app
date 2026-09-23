import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import FailureDialogueBox from '../components/modals/FailureDialogueBox'
import SuccessDialogueBox from '../components/modals/SuccessDialogueBox'
import Loader from '../components/Loader/Loader'

const GalleryUpload = () => {
    const [menuData, setMenuData] = useState("")
    const [imageFile, setImageFile] = useState({});
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ showError, setShowError] = useState(false)
    const [ successMessage, setSuccessMessage] = useState("")
    const [ showSuccess, setShowSuccess ] = useState(false)
    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token
    const navigate = useNavigate()
    const { restaurantId } = useParams()

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    }, [])

     
    const handleSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append('galleryImage', imageFile)

    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/gallery`, {
            method: "PATCH",
            headers:{
                Authorization:`Bearer ${token}`
            },

            body: formData
        })

        const data = await response.json()
            

        if(!response.ok){
            setErrorMessage(data.message)
            setShowError(true)
            return            
        }

            setMenuData(data.data)
            setSuccessMessage(data.message)
            setShowSuccess(true)       
            return


    } catch (error) {
          setErrorMessage(data.message)
          setShowError(true)
          return
    }
}
    

const handleFiles = (e) => {
    // const newFiles = Array.from(e.target.files);
    // setGalleryImage(prevFiles => [...prevFiles, ...newFiles]);
    setImageFile(e.target.files[0])
};

// console.log(imageFile.name)

const handleClear =()=>{
    setImageFile({})
}


 const okOnSuccess =()=>{
    navigate(`/restaurants/${restaurantId}`)
    setShowSuccess(false)
    
  }



  return (
    <section className='gallery-upload'>
        {showSuccess && <SuccessDialogueBox menuUploadsuccMsg={successMessage} succOk={okOnSuccess}/>}
        {showError && <FailureDialogueBox menuUploadfailMsg={errorMessage} failOk={()=>setShowError(false)}/>}
        <form action="post" onSubmit={handleSubmit}>
            <label className='gupload' htmlFor="gupload">Click to Select Images</label>
            <input className='fileupload'
                id='gupload' 
                type="file" 
                name='galleryImage'
                multiple
                onChange={handleFiles}
            />         
            <div className="button-conrol">
                <button>Upload</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </form>
        <Link to="/restaurants/:id">Go Back</Link>
        <div className="display-area">
        {            
            
            <p>{imageFile.name}</p>
        }       
        </div>        
    </section>

   
  )
}

export default GalleryUpload
