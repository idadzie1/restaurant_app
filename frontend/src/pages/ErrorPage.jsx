import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>      
        <p>Page Not Found</p>
        <p>Error 404</p>
        <Link to='/'><p>Back to Home Page</p></Link>      
    </section>
  )
}

export default ErrorPage
