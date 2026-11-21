
import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from 'react-router-dom';



const ContactForm = () => {
      const [state, handleSubmit] = useForm("xrpqgkkq");
      const [ display, setDisplay ] = useState(false)
      const navigate = useNavigate();
  
      if (state.succeeded && display) {
      return     <div className='confirmation-modal'>
      <div className="modal-information">
        <div className="confirmation-notice">
            <p>Thank you for contacting us</p>
        </div>
        <div className="buttons-controls">
            <button onClick={
                () => {navigate('/contact')
                setDisplay(false)}
                }>Ok</button>            
        </div>
      </div>      
    </div>    

  } 

   
  return (
    <section className='contact-form'>
        <h2>Let's Get Talking</h2>
        <div className="main-contact-form">
            <form className='main-contact' onSubmit={handleSubmit}>
                <div className="sender-details">
                    <label htmlFor="name">Your Name</label>
                    <input type="text"
                        name="name"
                        placeholder='Kofi Mensah' 
                        className='name'                        
                    />
                       <ValidationError 
                        prefix="name" 
                        field="name"
                        errors={state.errors}
                    />
                    <label htmlFor="email">Your Email</label>
                    <input type="email"
                        name="email"
                        placeholder='example@email.com'
                        className="email"
                         
                    />
                       <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                    />

                    <label htmlFor="subject">Subject</label>    
                    <input type="text"
                        name="subject" 
                        className="subject"       
                        
                    />
                    <ValidationError 
                        prefix="subject" 
                        field="subject"
                        errors={state.errors}
                    />

                </div> 
                <div className="sender-message">
                    <label htmlFor="">Message</label>
                    <textarea 
                        type='text' 
                        name="message" 
                        id="message" 
                        className='message' 
                        />
                       <ValidationError 
                        prefix="message" 
                        field="message"
                        errors={state.errors}
                    />
                        
                    {/* </textarea> */}
                    
                </div>    
                <div className="message-action-buttons">
                    <button type='submit' disabled={state.submitting} onClick={()=>setDisplay(true)}>Send</button>
                    <button>Clear</button>
                </div>           
            </form>
            
        </div>
            <h4>
                GhanaRestaurantsHub — Connecting People to Ghana's Restaurants and Food Destinations.               
            </h4>
    </section>
  )
}

export default ContactForm
