import React from 'react'
import { Link } from 'react-router-dom';
import GoogleMap from './GoogleMap';
import TreehouseRestaurant from '../assets/treehouse_restaurant.png'
import { IoIosStarOutline } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";

const Restaurant = ({id, restaurantName, photo, priceRange, openingHours, contact, Whatsapp, email, facebook, instagram, ratings, location, area, website, googleMap}) => {

  return (
            <div className="restaurant-item">                               
                <div className="restaurant-name">
                    <h4>{restaurantName}</h4>
                </div>
            
                <div className="restuarant-detail">
                    <div className="restaurant-photo">
                        <img src={photo} alt="image" />
                    </div>
                    <hr />
                <div className='details'>
                    <div className="prices text">
                        Price Range: {priceRange}
                    </div>
                    <div className="opening-hours text">
                        Opening Hours: {openingHours}
                    </div>
                    <div className="contact text">
                        <span className='telephone'><BsTelephone /> {contact}</span>
                        <span className='whatsapp'><FaWhatsapp /> {Whatsapp}</span>
                        <span className='mail'><MdOutlineMail /> {email}</span>                  
                                                  
                        <span className='facebook'> <FaFacebook /> <FaFacebook /> <FaFacebook /> </span>           
                        
                        <span>{location} : {area}</span> 
                    </div>
                    <div className=" text">
                        <Link to='/menulist'>Click to see menu</Link>
                    </div>
                    <div className="reviews-ownership">
                        <span><IoIosStarOutline />
                                <IoIosStarOutline />
                                <IoIosStarOutline />
                                <IoIosStarOutline />
                                <IoIosStarOutline />                                
                        </span>
                        <div className="owner text">
                            <Link to='/login'><span>Claim ownership</span></Link>
                            <Link to='/posts/id'><span>View</span></Link>
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
