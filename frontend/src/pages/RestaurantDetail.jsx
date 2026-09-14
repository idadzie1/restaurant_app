import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader.jsx'
import SuccessDialogueBox from '../components/modals/SuccessDialogueBox.jsx';
import FailureDialogueBox from '../components/modals/FailureDialogueBox.jsx';
import PromptYesNoDialogueBox from '../components/modals/PromptYesNoDialogueBox.jsx';
import DialogueBox from '../components/modals/Dialoguebox.jsx';


// on this page, has detailed information about restaurant.
// Restaurant owme is able to edit/update upload to gallery and delete information
// users can view the information but can't manipulate the infoamtion by not having acce4ss to the control buttons

const RestaurantDetail = () => {
  const [ galleryInfo, setGalleryInfo ] = useState([]);
  const [ notification, setNotification ] = useState("Do You want to delete")
  const [ restaurant, setRestaurant ] = useState({});  
  const { currentUser } = useContext(UserContext);
  const [ selectedMenuId, setSelectedMenuId ] =useState(null)
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ showPrompt, setShowPrompt ] = useState(false);
  const [ showFailure, setShowFailure ] = useState("")
  const [ deletionSuccessMessage, setDeletionSuccessMessage ] = useState("")
  const [ galleryObjId, setGalleryObjId ] = useState("")  
  const [ loading, setLoading ] = useState(true);

  const userId = currentUser?.id
  const token = currentUser?.token
  const { restaurantId, menuId } = useParams()  
  
  

  useEffect(()=>{
    const fectchRestaurantDetail = async ()=>{    
    try {
       const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/get-restaurant/${restaurantId}`);


      const data = await response.json()            
     
      
       if(!response.ok){         
         setErrorMessage(data.message)
         setShowFailure(true) 
         return                  
      }       
      
       setRestaurant(data)
       

    } catch (error) {
      setErrorMessage(error.message)
    } finally{
      setLoading(false);
    }

    }

    fectchRestaurantDetail()
    
  }, [`${restaurantId}`])



   if (loading) {    
     return  <Loader /> 
    
    }   
  

    // This menu change will have to link to a menu edit page to change photo or description or both
   const handleMenuChange =()=>{

   }

   const clickToDeleteMenu=()=>{
     setShow(true)
   }

  // This delete will just propmt a dialogue for confirmation to continue on this same page
   const handleMenuDelete = async()=>{         
    try {
          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/menu/${selectedMenuId}`, {
            method: 'DELETE',
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          const data = await response.json()

          if(!response.ok){
            setShowFailure(true)
             setShowPrompt(false)
            setErrorMessage(data.message)
            return
          }

          setShowSuccess(true)
          setDeletionSuccessMessage(data.message)
          setShowPrompt(false)
          return 
        
       
        } catch (error) {
          setErrorMessage(error.message)
          setShowFailure(true)
           setShowPrompt(false)
          return
          }  
    
    }

    const handlePopmptYesNo = (menuId)=>{
      setSelectedMenuId(menuId) 
      setShowPrompt(true)               
      return
    }
  //  =============================================================================================
  //  const handleCancel = ()=>{
  //     setShowPrompt(true)
  //     return
  //  }

   const handleOkClickDeletionDialogueBox =()=>{
     setShow(false)
     return
   }

  //  ============================ Delete Gallery image ==================================================

   const handleRemove = (galleryObjId)=>{
      setShowPrompt(true)
      setGalleryObjId(galleryObjId)
   }

   const handleGalleryPhotoDelete = async()=>{
     const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/gallery/${galleryObjId}`, {
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
     })

          
      const data = await response.json()
      console.log("This is data". data)

      if(!response.ok){
        setErrorMessage(data.message)
        setShowFailure(true)
        return
      }
      
      setShowSuccess(true)
      setDeletionSuccessMessage(data.message)
      setShowPrompt(false)
      return

   }

     console.log("restaurant ID", restaurantId)
      console.log("galleryObjID", galleryObjId)
  
  return (
    <section className='detail-info'>      
      { showPrompt && <DialogueBox 
        clickOnOk={handleMenuDelete}
        clickOkOnDelOfGalleryImg={handleGalleryPhotoDelete}
        notifyToProceedToDelGalleryImg={notification}  
        notificationToProceedOrNot={notification} 
        clickOnCancel={()=>setShowPrompt(false)} 
        /> }

      { showFailure && <FailureDialogueBox 
        deletionErrorRes={errorMessage}
        deletionErrorGalleryImg={errorMessage}
        oKone={()=>setShowFailure(false)}
      />}

      { showSuccess && <SuccessDialogueBox 
        deletionSuccessRes={deletionSuccessMessage}
        galleryImgDelSuccess={deletionSuccessMessage}
        oK={()=>setShowSuccess(false)} 
        />}
  
      <h2 className='restuarant-name'>{restaurant.name}</h2>

      <div className="cover-image">
        <img
            src={`${import.meta.env.VITE_REACT_APP_BASE_URL.replace("/api", "")}/uploads/${restaurant.coverPhoto}`}
            alt={restaurant.name}
          />
      </div>
      <div className="description-text">
        <article>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis officiis, dolore molestiae excepturi laboriosam facere ratione at sit officia dolorum in consectetur est. 
        </article>
      </div>
      <div className="contact-details">
        <h3>Contact</h3>
        <div className="contact">
          <div className="phone-contact">Phone: {restaurant.phone}</div>
          <div className="website">{restaurant.website}</div>
          <div className="email-contact">email: {restaurant.email}</div>
        </div>
        <div className="social-media">
          <span><a href={restaurant.socials.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /></a></span>
          <span><a href={restaurant.socials.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a></span>
          <span><a href={restaurant.socials.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a></span>
        </div>
        {/* {console.log(restaurant.whatsapp)} */}
      </div>
      <div className="opening-closing-hours">
        <h3>Opening Hours</h3>
        <div className="opening-closing">
            <span className='open'> Open: {restaurant.openingHours.open}</span>
            <span className='close'> Close: {restaurant.openingHours.close}</span>            
        </div> 
      </div>
      <div className="menu-dishes">
        <h3 className='menu-heading'>Menu</h3>
        {userId === restaurant.claimedBy && <Link to={`/menuupload/${restaurantId}`}>
         <button className='add-menu'>Add Menu</button>
        </Link>}       
        <div className="the-menu-items">          
          {restaurant.menu.map(({_id, name, menuPhoto, price, description})=>{
          return <div className="the-menu-item" key={_id}>
            <div className="menu-photo-left-side">
              <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL.replace("/api", "")}/uploads/${menuPhoto}`} alt="menu image" />
            </div>
           <div className="right-side"> 
             <div className="menu-name-menu-price">
               <div className="menu-name">Name: {name}</div>
               <div className="menu-price">Price: Ghs {price}</div>            
              </div>
              <div className="menu-description">
                <p>{description}</p>
              </div>
            </div>
              {userId === restaurant.claimedBy && <div className="button-class">
                <Link to={`/editmenu/${restaurantId}/${_id}`}><button onChange=''>Change</button></Link>
                <button onClick={()=>handlePopmptYesNo(_id)}>Remove</button> 
              </div>}                       
          </div> })}         
        </div>
        {/* <ul className='dishes'>
          {galleryInfo[0].menu.map((menu, id) =>(
            <li key={id}>{menu}</li>
          ))} 
        </ul> */}
      </div>  
        <div className="gallery-section">
          <h3>Photo Gallery</h3>
         {userId && restaurant.claimedBy && <Link to={`/uploadgallery/${restaurantId}`}>
            <button className='add-gallery'>Add Gallery</button>
          </Link>}
          <div className="gallery">
            {restaurant.gallery.map((galleryImage)=>(
              <div className='gallery-item'>
                <div className="image">
                  <img key={galleryImage._id} src={`${import.meta.env.VITE_REACT_APP_BASE_URL.replace("/api", "")}/uploads/${galleryImage.galleryImage}`} alt="gallery Image" />                             
                </div>
                {userId && <div className="button-class">
                  <Link to={`/${restaurantId}/gallery/${galleryImage._id}`}><button>Change</button></Link>
                  <button onClick={()=>handleRemove(`${galleryImage._id}`)}>Remove</button> 
                </div>}                
              </div>                      
            ))}  
          </div>
        </div>
        <div className="google-map-location">
          <h3>Location on Google Map</h3>
          <iframe src={restaurant.googleMap} frameborder="0"></iframe>
        </div>
    </section>
    //  {`${import.meta.env.VITE_REACT_APP_BASE_URL.replace("/api", "")}/uploads/${galleryImage}`}
  )
}

export default RestaurantDetail
