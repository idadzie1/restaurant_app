import React from 'react'
import { useState, useEffect, useContext  } from 'react'
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom' 
import ChangePassErrorBox from '../components/modals/ChangePassErrorBox';
import ChangePassSuccessBox from '../components/modals/ChangePassSuccessBox';
import Loader from '../components/Loader/Loader';

const ChangePassword = () => {

  const [ errorMsg, setErrorMessage ] = useState('');
  const [ showSuccessModalModal, setShowSuccessModal ] = useState(false);
  const [ successResponse, setSuccessResponse ] = useState("");
  const [ showErrorModal, setShowErrorModal ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const [ userInfo, setUserInfo ]=useState({
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
      if(!userInfo.currentPassword || !userInfo.newPassword || !userInfo.cfmNewPassword){
          setErrorMessage("Fill in all spaces")
          setShowErrorModal(true)
          return
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/${userId}/change-Password`,{
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(userInfo)
        })

          const data = await response.json();

          console.log(data)

        if(!response.ok){
          setErrorMessage(data.message)
          setShowErrorModal(true)
          return
        }

        
        setSuccessResponse(data.message)
        setShowSuccessModal(true)
             
        return
        
      } catch (error) {
          setErrorMessage(error.message)
          setShowErrorModal(true)
          return
      }
    }

    const handleOkClickOnSuccess=()=>{
        setCurrentUser(null)
        navigate('/login')
        setShowSuccessModal(false)       
        return
    }

  

  return (
    <>
    {showSuccessModalModal && <ChangePassSuccessBox 
    successResponse={successResponse} 
    clcikingOk={handleOkClickOnSuccess}/>}

    {showErrorModal && <ChangePassErrorBox 
      errorMsg={errorMsg} 
      clickingOk={()=>setShowErrorModal(false)}/>}

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
   </>
  )
}

export default ChangePassword
