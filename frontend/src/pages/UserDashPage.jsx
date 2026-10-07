import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../assets/capital_cafe.jpg'
import Loader from '../components/Loader/Loader.jsx'
import restaurantInfo from '../data/restaurantData'
import { UserContext } from '../context/userContext'
import { IoIosHeartEmpty } from 'react-icons/io'
import DialogueBox from '../components/modals/Dialoguebox.jsx'
import ActionConfirmationDialogueBox from '../components/modals/ActionConfirmationDialogueBox.jsx'

import NotificationBox from '../components/modals/NotificationBox.jsx'
import ErrorAndResDialogueBox from '../components/modals/ErrorAndResDialogueBox.jsx';

const UserDashPage = () => {
  const [ userInfo, setUserInfo]=useState([])
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ loading, setLoading ] = useState(true)
  // const [ confirmationMessage, setconfirmationMessage ] = useState(false);  
  const [ response, setResponse ] = useState("")
  const [ showNotificationBox, setShowNotificationBox] = useState(false)
  const [ showErrorAndResDialogueBox, setShowErrorAndResDialogueBox] = useState(false)
  // const [ statusVisibility, setStatusVisibility ] = useState(false) 
  const [ showApproveConfirmationDialogueBox, setShowApproveConfirmationDialogueBox ] = useState(false)
  const [ showDenyConfirmationDialogueBox, setShowDenyConfirmationDialogueBox ] = useState(false);
  const [ showDeleteConfrimationDialogueBox, setShowDeleteConfrimationDialogueBox ] = useState(false)
  const [ selectRestaurantId, setSelectRestaurantId ] = useState(null)
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token
  const userId = currentUser?.id
  const firstname = currentUser?.firstName  
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  }, [])

  // ==================== fetch all restuarnts by the crrently logged in user ==================== ======================================

  useEffect(()=>{
    const fetchUserRestaurants = async()=>{
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/restaurants-by-user/${userId}`, {
          method: 'GET',
          headers:{
            Authorization: `Bearer ${token}`
          }
        });

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
        
      } finally{
        setLoading(false)

      }
    }
      fetchUserRestaurants()
  }, [userId])

  if(loading){
    return <Loader />
  } 
     
const handleErrorBox=()=>{
    setShowErrorAndResDialogueBox(false)
    // navigate('/')
  }
//  ============================ delete process ===========================================

       const handleDeleteActionConfirmation =(selectRestaurantId)=>{        
       setShowDeleteConfrimationDialogueBox(true)
       setSelectRestaurantId(selectRestaurantId)         
     }
 
   const handleNoDelete = ()=>{
      setShowDeleteConfrimationDialogueBox(false)
     return
     }
 
   const handleDelete = async (selectRestaurantId)=>{
     setShowDeleteConfrimationDialogueBox(false)
     setLoading(true)
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
         setResponse(data.message)
         setShowNotificationBox(true)        
         return
 
     } catch (error) {
       setErrorMessage(error.message)
       setShowErrorAndResDialogueBox(true);
       return
     }finally{
       setLoading(false)
     }
   }
 
   if(loading){
     return <Loader />
   }

      

  return (
         <>
          {showErrorAndResDialogueBox && <ErrorAndResDialogueBox 
          errorMessage={errorMessage} 
          clickOk={handleErrorBox} />}
      
          {showNotificationBox && <NotificationBox 
          response={response} 
          clickok={()=>{setShowNotificationBox(false)}}/>}

          {showDeleteConfrimationDialogueBox && <ActionConfirmationDialogueBox
           confirmationMessage = "Proceed with deletion?"  
           clickYes={()=>handleDelete(selectRestaurantId)} 
           clickNo={handleNoDelete}/>}

      <section className='admin-dashboard'>
            {/* {confirm && <DialogueBox clickYes={()=>handleRedirection(selectedId)}/>} */}
            <h2 className='heading'>Hi {firstname}, you're welcome to your Dashboard</h2>
            <div className="form-link">
              <Link to='/restaurant-form'><button >Click here to fill and submit</button></Link>              
            </div>            
            <div className="admin-dashboard-items">
            
            {(userInfo.length != 0) ?
            userInfo.map(item => (             
              <div className="admin-dash-board-item" key={item._id}>
                <div className="image">
                  <img src={`${item.coverPhoto}`} alt="picture here" />
                </div>
                <div className="restaurant-information">
                  <div className="restaurant-name">
                    <h4>{item.name}</h4>
                  </div>
                  <div className="contact">
                    <div className="contact-name">
                      <h5>Name: {item.creator.firstName} {item.creator.lastName}</h5>
                    </div>
                    <div className="contact-phone">
                      <h5>Phone: {item.phone}</h5>
                    </div>
                    <div className="contact-email">
                      <h5>email: {item.email}</h5>
                    </div>
                     <div className="contact-location">
                      <h5>location: {item.location}, {item.area}</h5>
                    </div>
                  </div>
                </div>
                <div className="controls">                  
                  <Link to={`/editdetails/${item._id}`}><button className='deny'>Edit</button></Link>
                  <Link to='/userdashpage'><button className='deny'>Go Back</button></Link>
                  <button className='del' onClick={()=>handleDeleteActionConfirmation(item._id)}>Delete</button>
                </div>          
              </div> ))
                 
               : <div className='notification'>No Postings</div>}        
           
            </div>
      
          </section>
        </>      
              
  )
}

export default UserDashPage
