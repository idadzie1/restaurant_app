import React from 'react'
import { Link } from 'react-router-dom'

const ForgottenPassword = () => {
  return (
    <section className='forgotten-password'>
        <p>You password has been sent to the email.</p>
        <Link to='/'><p>Back to home page</p></Link>
    </section>      
   
  )
}

export default ForgottenPassword
