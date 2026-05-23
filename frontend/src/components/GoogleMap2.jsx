import React from 'react'

const GoogleMap2 = () => {
  return (
    <div className="google-map-location">
      <iframe
        title="location-map"
        src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d127073.32459509815!2d-0.1721958!3d5.5608835!3m2!1i1024!2i768!4f13.1!2m1!1sRestaurants%20in%20Ghana!5e0!3m2!1sen!2sgh!4v1779266868987!5m2!1sen!2sgh"
  
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}



export default GoogleMap2
