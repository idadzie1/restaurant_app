import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData]=useState({
    firstName:'',
    lastName: '',
    email: '',
    telephone: '',
    password:'',
    cfmpassword:'',
    agree:''
  })

  const [errorMessage, setErrorMessage]=useState('');

  
    const handleChange = (e)=>{
      try {        

      const name = e.target.name;
      // const value = e.target.value;
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setUserData(prev=>({...prev, [name]:value}))      

        
      } catch (error) {
        setErrorMessage(error.message)
        return
      }

    }   


    const handleClear = ()=>{
      setErrorMessage('');
     setUserData({
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      password: '',
      cfmpassword: '',
      agree:''
  });
      
    }

    const registerUser = async (e)=>{
      e.preventDefault();       
      setErrorMessage('');
      console.log(import.meta.env.VITE_REACT_APP_BASE_URL)
      
      try {

        if(!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.cfmpassword){
          setErrorMessage('Fill in all fields')
          return;
        }

        if(userData.password !== userData.cfmpassword){
        setErrorMessage("Passwords do not match")
        return;
        }

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(userData)
        })

        if(!response.ok){
           const errorData = await response.json();
           throw new Error(errorData.message);
        }

        const newUser = await response.json()
        console.log(newUser);
        navigate('/login');

      } catch (error) {
        setErrorMessage(error.message)
      }
    }

  
  return (
    <section className='register-form'>
      <h2 className='container-heading'>Register</h2>
      <h5 className='error'>{errorMessage}</h5>
      <form className='register' onSubmit={registerUser}>
        <label htmlFor="fn">First Name</label>
        <input
            id='fn' 
            type="text" 
            name='firstName'
            value={userData.firstName}
            placeholder='John'
            onChange={handleChange}        
        />

        <label htmlFor="ln">Last Name</label>
        <input
            id='ln' 
            type="text"
            name='lastName'
            value={userData.lastName} 
            placeholder='Doe'
            onChange={handleChange}
        />

        <label htmlFor="em">email</label>
        <input
            id='em' 
            type="email"
            name='email'
            value={userData.email}
            placeholder='sample@email.com'
            onChange={handleChange} 
        />

        <label htmlFor="tp">Telephone</label>
        <input
            id='tp' 
            type="tel"
            name='telephone'
            value={userData.telephone}
            placeholder='0123456789'
            onChange={handleChange}
        />

        <label htmlFor="pwd">Password</label>
        <input 
            type="password"
            name='password' 
            value={userData.password}
            onChange={handleChange}
        />

        <label htmlFor="cpwd">Confirm Password</label>
        <input 
            type="password"
            name='cfmpassword' 
            value={userData.cfmpassword}
            onChange={handleChange}
        />
        <label htmlFor='termsConditions'>I have read and agreed to the <Link to='/terms-and-conditions'>Terms & Conditions</Link> and acknowledge the <Link to='/privacy-policy'>Privacy Policy</Link></label>
        <input 
          type="checkbox"
          name='agree'
          checked = {userData.agree} 
          onChange={handleChange}
        />
        <div className="buttons">
          <button type='submit'>Submit</button>
          <button type='reset' onClick={handleClear}>Clear</button>
        </div>
      </form>

      <div className='remind'>
        <span>You already registered?. <Link to='/login'>Click here</Link></span>
      </div> 
    </section>
  
  )
}

export default Register
