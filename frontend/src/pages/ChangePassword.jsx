import React from 'react'
import { useState, useEffect, useContext  } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom' 
import ChangePassErrorBox from '../components/modals/ChangePassErrorBox';
import ChangePassSuccessBox from '../components/modals/ChangePassSuccessBox';

const ChangePassword = () => {

  const [errorMsg, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [ successResponse, setSuccessResponse ] = useState("")

  const [userInfo, setUserInfo ]=useState({
    currentPassword: "",
    newPassword: "",
    cfmNewPassword: ""
  })

    const { currentUser, setCurrentUser } = useContext(UserContext);  
  
    const token = currentUser?.token         
    const userId = currentUser?.id
    const navigate = useNavigate()

        useEffect(()=>{
        if(!token){
            navigate('/login')
        }
      }, [token])

  const handleChanges=(e)=>{
      setUserInfo(prev =>({
    ...prev, [e.target.name]:e.target.value
  }))
  }

    const handleSubmit= async (e)=>{
      e.preventDefault()
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${userId}/changePassword}`,{
          method: 'PATCH',
          headers:{
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringyfy(userInfo)
        })

        data = response.json();

        if(response.ok){
          setErrorMessage(data.message)
          setShowError(true)
          return
        }

        
        setSuccessResponse(true)
        setShowSucces(true)
        setCurrentUser(null)
        navigate('/login')
        return
        
      } catch (error) {
          setErrorMessage(error.message)
          setShowError(true)
          return
      }
    }

  return (
    <section className='change-password'>       
      <form className="changePasswordForm" onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <label>Current Password</label>
        <input
          className='current-password'
          name="currentPassword" 
          type="password"
          value={userInfo.currentPassword}
          onChange={handleChanges} 
        />

        <label>New Password</label>
        <input
          className='new-password'
          name="newPassword" 
          type="password"
          value={userInfo.newPassword}
          onChange={handleChanges} 
        />

        <label>Confirm New Password</label>
        <input
          className='new-password'
          name="cfmNewPassword" 
          type="password"
          value={userInfo.cfmNewPassword}
          onChange={handleChanges} 
        />
       <div className="changePassword-buttons">
        <button>Submit</button>
        <button>Cear</button>
       </div>
      </form>
    </section>
   
  )
}

export default ChangePassword
