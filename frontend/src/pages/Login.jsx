import React from 'react';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';


const Login = () => {
 const [userData, setUserData]=useState({
   
    email: '',    
    password:'',
   
  })

  const [errorMessage, setErrorMessage]=useState('');

  const {setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  
    const handleChange = (e)=>{
      try {        

      const name = e.target.name;
      const value = e.target.value;
      setUserData(prev=>({...prev, [name]:value}))      

        
      } catch (error) {
        setErrorMessage(error.message)
      }

    }
    
    
    const handleClear = ()=>{
      setErrorMessage('');
      setUserData({
        email: '',    
        password:'',
      })     
         
      
    }


    const handleSubmit= async (e)=>{
        e.preventDefault();
        setErrorMessage("");

      try {       

        if(!userData.email || !userData.password){
        setErrorMessage('Fill in all fields')
        return;
        }   
        
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/login`, {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(userData)
        })

        if(!response.ok){
          const errorData = await response.json()
          throw new Error(errorData.message);
        }
        
        const user = await response.json();
        setCurrentUser(user)
        navigate('/userdashpage')        
      

        
      } catch (error) {
        setErrorMessage(error.message)
      }
    }


  
  return (
    <section className='register-form'>
      <h2 className='container-heading'>Login</h2>
      <h5 className='error'>{errorMessage}</h5>
      <form className='register' onSubmit={handleSubmit}>
        <label htmlFor="em">email</label>
        <input
            id='em' 
            type="email"
            name='email'
            value={userData.email}
            placeholder='sample@email.com'
            onChange={handleChange} 
        />

        <label htmlFor="pwd">Password</label>
        <input 
            type="password"
            name='password' 
            value={userData.password}
            onChange={handleChange}
        />

        <div className="buttons">
          <button type='submit'>Submit</button>
          <button type='reset' onClick={handleClear}>Clear</button>
        </div>
      </form>

      <div className='remind'>
        <span>You're yet to register?. <Link to='/register'>Click here</Link></span>
      </div> 

      <div className="password-forgotten">
        <span>Forgot your password?. <Link to='/forgottenpassword'>Click here</Link></span>
      </div>     

    </section>
  
  )
}


export default Login
