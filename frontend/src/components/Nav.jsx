import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Logo from '../assets/logo2.png'


const Nav = () => {
  const[menuShowing, setMenuShowing] = useState(false);

  return (

          <nav>
            <div className="nav-container">
              <div className="logo-container">
                <Link><img src={Logo} alt="logo image" /></Link>
              </div>
              <div className={`menu-items ${menuShowing? 'slide-in' : ''}`}>
                <ul>
                  <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to='/'>Home</NavLink>
                  </li>
                  <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to='/about'>About</NavLink>
                  </li>
                  <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to='/services'>Services</NavLink>
                  </li>
                  <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to='/blog'>Blog/News</NavLink>
                  </li>
                  <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to='/contact'>Contact</NavLink>
                  </li>                           
                </ul>
                <div className="close-icon" onClick={()=>setMenuShowing(prev=>!prev)}>
                  <IoMdClose />
                </div>
              </div>
              <div className="login-container">
                <Link to='/Login'>Sign in</Link>
              </div>
              <div className="hamburger-btn" onClick={()=>setMenuShowing(prev => !prev)}>
                <GiHamburgerMenu />
              </div>
            </div>
          </nav>   
  )
}

export default Nav
