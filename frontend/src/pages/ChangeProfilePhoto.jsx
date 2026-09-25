import React from 'react'
import avatar from '../assets/imageAvatar.jpg'
import { UserContext } from '../context/userContext';
import { useState, useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'


const ChangeProfilePhoto = () => {
    const [ profilePhotoObj, setProfilePhotoObj ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ shoeErrorNotificationBox, setShowErrorNotificationBox ] = useState(false);
    const [ successMsg, setSuccessMsg ] = useState("")
    const [ showSuccessNotification, setShowSuccessNotification ] = useState(false)
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const token = currentUser?.token
    const userId = currentUser?.id
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    }, [token])

   const handleProfilePhoto = (e)=>{
     setProfilePhotoObj(e.target.files[0])
   }

   const handleSubmit = async(e)=>{
        e.preventDefault()

        const formData = new FormData()
            formData.append('profilePic', profilePhotoObj)

         const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${userId}/change-avatar`, {
            method: "PATCH",
            headers:{
                Authorization:`Bearer ${token}`
            },
            body: formData
         })
         
         const data = await response.json()

        //  console.log("from backend", data.updatedProfilePic)

         if(!response.ok){
            setErrorMsg(data.message)
            setShowErrorNotificationBox(true)
            return;            
         }

         setCurrentUser(prev=>({
            ...prev,
            profilePic: data.profilePic
         }))          
         setSuccessMsg(data.message)
         setShowSuccessNotification(true)
         return
   }  

       console.log("CURRENT USER IN PROFILE:", currentUser);
        console.log("PROFILE PIC:", currentUser?.profilePic);

  return (    
    <section className='profile-photo'>        
            <h2>Profile Photo</h2>
            <p>{errorMsg}</p>
            <div className="profile-pic">
                <img src={ currentUser?.profilePic ? `${import.meta.env.VITE_REACT_APP_ASSET_URL}/uploads/${currentUser?.profilePic}` : avatar} alt="profile photo"/>
            </div>

            <form className='form-photo' onSubmit={handleSubmit}>
                <label className='profilePage-label' htmlFor="photo">Click To Select New Photo</label>
                <input 
                    className='profileInput-label'
                    id='photo' 
                    type="file"
                    name='profilePic'
                    onChange ={handleProfilePhoto} 
                />
                <div className="control-profilePage">
                <button>Submit</button>
                <button>Clear</button>
                </div>
            </form>
       
    </section>
  
  )
}

export default ChangeProfilePhoto
