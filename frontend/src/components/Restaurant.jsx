import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import GoogleMap from './GoogleMap';
import TreehouseRestaurant from '../assets/treehouse_restaurant.png'
import { IoIosStarOutline } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Confirmation from './modals/Dialoguebox';
import Ack from './modals/ActionConfirmationDialogueBox'

const Restaurant = ({restaurantId, name, coverPhoto, priceRange:{min, max}, openingHours:{open, close}, socials:{whatsapp, facebook, instagram}, phone, email, ratings, location, area, onClick, website, googleMap, confirm, acknowledgement}) => {
    const [showModalm, setShowModal] = useState(false);
    

    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate()        
              

        const handleClick =()=>{
           setShowConfirmation(true)
        }

        const handleClaim =()=>{
            if(!currentUser?.token){
                navigate('/login')
                return
            }

            handleClick()
        }

  return (         
            <div className="restaurant-item">                               
                <div className="restaurant-name">
                    <h4>{name}</h4>
                </div>
            
                <div className="restuarant-detail">
                    <div className="restaurant-photo">
                        <img src={`${import.meta.env.VITE_REACT_APP_ASSET_URL}/uploads/${coverPhoto}`} alt={name} />
                    </div>
                    <hr />
                <div className='details'>
                    <div className="prices text">
                        Price Range: GHS {min} - {max}
                    </div>
                    <div className="opening-hours text">
                        Opening Hours: {open} - {close}
                    </div>
                    <div className="contact text">
                        <span className='telephone'><BsTelephone /> {phone}</span>
                        <span className='whatsapp'><FaWhatsapp /> {whatsapp}</span>
                        <span className='mail'><MdOutlineMail /> {email}</span>                  
                                                  
                        <span className='facebook'> <FaFacebook /> <FaFacebook /> <FaFacebook /> </span>           
                        
                        <span>{location} : {area}</span> 
                    </div>
                    <div className=" text">
                        <Link to={`restaurants/${restaurantId}`}>Click to see menu</Link>
                        
                    </div>
                    <div className="reviews-ownership">
                            <span className=''><IoIosStarOutline /></span>
                            <span className=''><IoIosStarOutline /></span>
                            <span className=''><IoIosStarOutline /></span>
                            <span className=''><IoIosStarOutline /></span>
                            <span className=''><IoIosStarOutline /></span>                                
                        
                        <div className="owner text">
                            <span onClick={onClick}>Claim ownership</span>
                            <Link to={`restaurants/${restaurantId}`}><span>View</span></Link>
                        </div>
                    </div>
                    <div className="website">
                        <span className='text'><a href={website}>website</a></span>
                    </div>
                    <hr />
                </div>
                </div>
                <hr />
                <div className="googlemap-location">
                    <iframe src={googleMap} frameborder="0"></iframe>
                </div>
            </div>
            
  )
}

export default Restaurant
