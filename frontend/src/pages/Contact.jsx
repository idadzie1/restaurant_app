import React, { useState } from 'react'

const Contact = () => {
    const [ contact, setContact ]=useState({
        name: "",
        emailAddress:"",
        subject:"",
        message: ""
    })

    const [errorMessage, setErrorMessage]=useState("")

    const handleChanges = (e)=>{
        setContact(prev=>({
            ...prev, [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!contact.name || !contact.emailAddress || !contact.subject || contact.message){
           setErrorMessage("Fill in all Fields")
           return
        }
    }
   
  return (
    <section className='contact-form'>
        <h2>Let's Get Talking</h2>
        <div className="main-contact-form">
            <form className='main-contact' onSubmit={handleSubmit}>
                <div className="sender-details">
                    <label htmlFor="">Your Name</label>
                    <input type="text"
                        name={contact.name}
                        placeholder='Kofi Mensah' 
                        className=''
                        onChange={handleChanges}
                    />
                    <label htmlFor="">Your Email</label>
                    <input type="email"
                        name={contact.emailAddress}
                        placeholder='example@email.com'
                        className='email'
                        onChange={handleChanges} 
                    />
                    <label htmlFor="">Subject</label>    
                    <input type="text"
                        name={contact.emailAddress} 
                        className=''
                        onChange={handleChanges}
                    />
                </div> 
                <div className="sender-message">
                    <label htmlFor="">Message</label>
                    <textarea type='text' name={contact.message} id="" className='' onChange={handleChanges}>
                        
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
