import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Header from '../components/Header';
import Restaurant from '../components/Restaurant';
import restaurantData from '../data/datafile'


const Home = () => {

const[ dataInfo, setDataInfo ] = useState(restaurantData);

// 1. Restaurant Profiles

// Each restaurant gets:

// Photos
// Menu
// Price range
// Opening hours
// Google Map embed
// Cuisine tags
// Contact/WhatsApp
// Reviews

        // id:1,
        // restaurantName:'Treehouse Restaurant',
        // photo: img1,
        // priceRange:'Ghs100 - Ghs400',
        // openingHours:'08:00hrsLT-22:10hrsLT',
        // contact:'+233 599400737',
        // Whatsapp: '+233 599400737',
        // email: 'Not Avaialable',
        // facebook: '',
        // instagram: '',
        // ratings: 4,
        // location: "Accra",
        // website: null,        
        // googleMap


  return (
  <>
   <Helmet>
        <title>Best Restaurants in Ghana</title>
        <meta
          name="description"
          content="Discover the best restaurants in Ghana."
        />
    </Helmet>     
      <Header />

      <section className='container'>
        <h2 className='container-heading'>Restaurant Listings</h2>
        <div className="restaurant-items">

        {dataInfo.map(({id, restaurantName, photo, priceRange, openingHours, contact, Whatsapp, email, facebook, instagram, ratings, location, area, website, googleMap})=>{
          return <Restaurant 
                            key={id} 
                            restaurantName={restaurantName} 
                            photo={photo}
                            priceRange={priceRange}
                            openingHours={openingHours}
                            contact={contact}
                            Whatsapp={Whatsapp}
                            email={email}
                            facebook={facebook}
                            instagram={instagram}
                            ratings={ratings}
                            location={location}
                            area={area}
                            website={website}
                            googleMap={googleMap}

                  />
        })
        
        }          
      
        </div>        
      </section>    
  </>
  )
}

export default Home
