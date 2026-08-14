import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import img from '../assets/capital_cafe.jpg'
import restaurantInfo from '../data/restaurantData'
import Loader from '../components/Loader/Loader.jsx'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import ActionConfirmationDialogueBox from '../components/modals/ActionConfirmationDialogueBox.jsx'
import ErrorAndResDialogueBox from '../components/modals/ErrorAndResDialogueBox.jsx';
import NotificationBox from '../components/modals/NotificationBox.jsx'

// This is admin/webmaster's dashboard. Has access o all database
// =================================================================

const AdminDashBoard = () => {
  // should contain all information
  // have privilege to add, edit, delete, approve request
  // upon approval the approved request goes to the home page

  const [ userInfo, setUserInfo]=useState([])
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ loading, setLoading ]=useState(true)
  // const [ confirmationMessage, setconfirmationMessage ] = useState(false);
  const [ response, setResponse ] = useState("")
  const [ showNotificationBox, setShowNotificationBox] = useState(false)
  const [ showErrorAndResDialogueBox, setShowErrorAndResDialogueBox] = useState(false)
  // const [ statusVisibility, setStatusVisibility ] = useState(false) 
  const [ showApproveConfirmationDialogueBox, setShowApproveConfirmationDialogueBox ] = useState(false)
  const [ showDenyConfirmationDialogueBox, setShowDenyConfirmationDialogueBox ] = useState(false);
  const [ showDeleteConfrimationDialogueBox, setShowDeleteConfrimationDialogueBox ] = useState(false)
  const [ selectRestaurantId, setSelectRestaurantId ] = useState(null)
  const { currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  }, [])

  useEffect(()=>{
    const fetchAllUsersSummaryInfo = async()=>{
    try {      
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/claimed-restaurants`, {
          method:'GET',
          headers:{
             Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()

        if(!response.ok){                                       
          setShowErrorAndResDialogueBox(true)
          setErrorMessage(data.message) 
          return
        }

        
        setUserInfo(data)

      } catch (error) {
      setErrorMessage(error.message)
      setShowErrorAndResDialogueBox(true)
      return
    } finally{
      setLoading(false)

    }
  }

  fetchAllUsersSummaryInfo()
  }, [token])

  if(loading){
    return <Loader />
  }
  
  const handleErrorBox=()=>{
    setShowErrorAndResDialogueBox(false)
    // navigate('/')
  }


// =======================================================================================
//  =================================== Aproval Pocess ======================================
    const handleApproveActionConfirmation =(selectRestaurantId)=>{        
      setShowApproveConfirmationDialogueBox(true)
      setSelectRestaurantId(selectRestaurantId)         
    }

  const handleNoApprove = ()=>{
     setShowApproveConfirmationDialogueBox(false)
    return
    }

    

  const handleApprove = async(selectRestaurantId)=>{   
    setShowApproveConfirmationDialogueBox(false)    

    try {      
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/approve/${selectRestaurantId}`, {
        method:'PATCH',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      const data = await response.json();

      if(!response.ok){
        setErrorMessage(data.message)
        setShowErrorAndResDialogueBox(true)
        return
      }

      setShowNotificationBox(true)
      setResponse(data.message)
      return

    } catch (error) {
      setShowErrorAndResDialogueBox(true)
      setErrorMessage(error.message)
      return
    }
  }

//  ============================================ Deny Pocess ================================
      const handleDenyActionConfirmation =(selectRestaurantId)=>{        
      setShowDenyConfirmationDialogueBox(true)
      setSelectRestaurantId(selectRestaurantId)         
    }

  const handleNoDeny = ()=>{
     setShowDenyConfirmationDialogueBox(false)
    return
    }



  const handleDeny = async (selectRestaurantId)=>{    
    setShowDenyConfirmationDialogueBox(false)
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/reject-restaurant/${selectRestaurantId}`, {
        method: 'PATCH',
        headers:{
          Authorization:`Bearer ${token}`
        }       
      })

       
       const data = await response.json()
      
       if(!response.ok){
        setErrorMessage(data.message)
        setShowErrorAndResDialogueBox(true)
        return
       }

        setShowNotificationBox(true)
        setResponse(data.message)
        return
      
    } catch (error) {
      setErrorMessage(error.message)
      return
    }

  }

  //  ============================================ Delete Pocess ================================
      const handleDeleteActionConfirmation =(selectRestaurantId)=>{        
      setShowDeleteConfrimationDialogueBox(true)
      setSelectRestaurantId(selectRestaurantId)         
    }

  const handleNoDelete = ()=>{
     setShowDeleteConfrimationDialogueBox(false)
    return
    }

  const handleDelete= async (selectRestaurantId)=>{
    setShowDeleteConfrimationDialogueBo(false)
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/delete/${selectRestaurantId}`, {
        method:'DELETE',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      
      const data = await response.json();

      if(!response.ok){
        setErrorMessage(data.message);
        setShowErrorAndResDialogueBox(true);
        return
      }

        setShowNotificationBox(true)
        setResponse(data.message)
        return

    } catch (error) {
      setErrorMessage(error.message)
      setShowErrorAndResDialogueBox(true);
      return
    }
  }
  
  return (
    <>
    {showErrorAndResDialogueBox && <ErrorAndResDialogueBox 
    errorMessage={errorMessage} 
    clickOk={handleErrorBox} />}

    {showNotificationBox && <NotificationBox 
    response={response} 
    clickok={()=>{setShowNotificationBox(false)}}/>}

     {showApproveConfirmationDialogueBox && <ActionConfirmationDialogueBox
     confirmationMessage="Proceed with approval?" 
     clickYes={()=>handleApprove(selectRestaurantId)} 
     clickNo={handleNoApprove}/>}

     {showDenyConfirmationDialogueBox && <ActionConfirmationDialogueBox
     confirmationMessage ="Proceed with denial/rejection?" 
     clickYes={()=>handleDeny(selectRestaurantId)} 
     clickNo={handleNoDeny}/>}

    {showDeleteConfrimationDialogueBox && <ActionConfirmationDialogueBox
     confirmationMessage = "Proceed with deletion?" 
     clickYes={()=>handleDelete(selectRestaurantId)} 
     clickNo={handleNoDelete}/>}

    <section className='admin-dashboard'>
      <h2 className='heading'>Administrator Dashboard</h2>
      { (userInfo.length != 0) ?     
      <div className="admin-dashboard-items">        
        {userInfo.map(item => (                                  
        <div className="admin-dash-board-item" key={item.restaurantId}>          
          <div className="image">
            <img src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/uploads/${item.restaurantCoverPhoto}`} alt="picture here" />
          </div>
          <div className="restaurant-information">
            <div className="restaurant-name">
              <h4>{item.restaurantName}</h4>
              
            </div>
            <div className="contact">
              <div className="contact-name">
                <h5>Name: {item.claimer.firstName}</h5>
              </div>
              <div className="contact-phone">
                <h5>Phone: {item.claimer.telephone}</h5>
              </div>
              <div className="contact-email">
                <h5>email: {item.claimer.email}</h5>
              </div>
               <div className="contact-location">
                <h5>location: {item.restaurantLocation}, {item.restaurantArea}</h5>
              </div>
            </div>
          </div>
          <div className="controls">
            <button className='approve' onClick={()=>handleApproveActionConfirmation(item.restaurantId)}>Approve</button>
            <button className='deny' onClick={()=>handleDenyActionConfirmation(item.restaurantId)}>Deny</button>
            <button className='del' onClick={()=>handleDeleteActionConfirmation(item.restaurantId)}>Delete</button>
          </div>          
        </div>      
        ))             
      }  
      </div> 
          : <div className='notification'>No Postings</div>} 
    </section>
   </>
  )
}

export default AdminDashBoard
