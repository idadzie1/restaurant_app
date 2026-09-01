import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader.jsx'


// on this page, has detailed information about restaurant.
// Restaurant owme is able to edit/update upload to gallery and delete information
// users can view the information but can't manipulate the infoamtion by not having acce4ss to the control buttons

const RestaurantDetail = () => {
  const [ galleryInfo, setGalleryInfo ] = useState([]);
  const [ restaurant, setRestaurant ] = useState({});  
  const { currentUser } = useContext(UserContext);
  const [ errorMessage, setErrorMessage ]=useState("");
  const [ loading, setLoading]  = useState(true)

  const userId = currentUser?.id
  const {restaurantId} = useParams()  
  

  useEffect(()=>{
    const fectchRestaurantDetail = async ()=>{    
    try {
       const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/get-restaurant/${restaurantId}`);


      const data = await response.json()            
     
      
       if(!response.ok){         
         setErrorMessage(data) 
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

  console.log(restaurant)
  console.log("This is restaurant.creator", restaurant.creator)
  console.log("This is restaurant.claimedBy", restaurant.claimedBy)
  console.log("This is userId", userId)


   const handleMenuChange =()=>{

   }

   const handleMenuDelete = ()=>{

   }
  
  return (
    <section className='detail-info'>
      <h2 className='restuarant-name'>{restaurant.name}</h2>
      {/* {userId && restaurant.creator &&<div className="controls">        
        <Link to={`/uploadgallery/${restaurantId}`}><button className='btn-gallery'>Add to Gallery</button></Link>
        <Link to={`/menuupload/${restaurantId}`}><button className='btn-menu'>Add to Menu</button></Link>
        <Link to={`/editdetails/${restaurantId}`}><button className='btn-edit'>Edit</button></Link>        
        <Link to={`/ownerpage/${restaurantId}`}><button className='btn-dash'>Dashboard</button></Link>        
      </div>} */}
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
              {userId && restaurant.creator && <div className="button-class">
                <button onChange={handleMenuChange}>Change</button><button onChange={handleMenuDelete}>Remove</button> 
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
            {restaurant.gallery.map((item, id)=>(
              <div className='gallery-item'>
                <div className="image">
                  <img key={id} src={item} alt="" />                             
                </div>
                {userId && <div className="button-class">
                  <button>Change</button><button>Remove</button> 
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
  
  )
}

export default RestaurantDetail
