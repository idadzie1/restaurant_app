import React from 'react'

const Contact = () => {
  return (
    <section className='contact-form'>
        <h2>Let's Get Talking</h2>
        <div className="main-contact-form">
            <form className='main-contact'>
                <div className="sender-details">
                    <label htmlFor="">Your Name</label>
                    <input type="text"
                        name='name'
                        placeholder='Kofi Mensah' 
                        className=''
                        onChange=''
                    />
                    <label htmlFor="">Your Email</label>
                    <input type="email"
                        name='email'
                        placeholder='example@email.com'
                        className='email'
                        onChange="" 
                    />
                    <label htmlFor="">Subject</label>    
                    <input type="text"
                        name='subject' 
                        className=''
                        onChange=""
                    />
                </div> 
                <div className="sender-message">
                    <label htmlFor="">Message</label>
                    <textarea type='text' name="" id="" className='' onChange="">
                        
                    </textarea>
                </div>    
                <div className="message-action-buttons">
                    <button>Send</button>
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

export default Contact
