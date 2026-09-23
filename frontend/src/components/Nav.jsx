import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState, useRef, useContext } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Logo from '../assets/logo2.png'
import { FaUser } from "react-icons/fa";
import ppic from '../assets/isu.jpg'
import { BiSolidDownArrow } from "react-icons/bi";
import { UserContext } from '../context/userContext';
import ProfileMenu from '../pages/ProfileMenu';
import avatar from '../assets/imageAvatar.jpg'


const Nav = () => {
  const[menuShowing, setMenuShowing] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false)
   const { currentUser } = useContext(UserContext);
  const arrowRef = useRef(null)
  const token = currentUser?.token  
  const role = currentUser?.role
  

  return (

          <nav>
            <div className="nav-container">
              <div className="logo-container">
                <Link to='/'><img src={Logo} alt="logo image" /></Link>
              </div>
              <div className={`menu-items ${menuShowing? 'slide-in' : ''}`}>
                <ul className='nav'>
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
                    <NavLink to='/blognews'>Blog/News</NavLink>
                  </li>
                  <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to='/contact'>Contact</NavLink>
                  </li>
                  {token && <li onClick={()=>setMenuShowing(prev=>!prev)}>
                    <NavLink to={role === "admin" ? '/admindashpage' : '/userdashpage'}>Dashboard</NavLink>
                  </li>}                            
                </ul>
                <div className="close-icon" onClick={()=>setMenuShowing(prev=>!prev)}>
                  <IoMdClose />
                </div>
              </div>
              <div className="login-container">
                <Link className='only-desktop' to={token? "/LogOut" : "/login"}>{token? "Log out" :"Sign in"}</Link>
                {token && <img className='profile-image' ref={arrowRef} onClick={()=>setShowProfileMenu(prev=>!prev)} src={ currentUser?.profilePic ? `${import.meta.env.VITE_REACT_APP_ASSET_URL}/uploads/${currentUser?.profilePic}` : avatar} alt="profile photo"/>}
                {/* {token && <span className='arrowdn' onClick={()=>setShowProfileMenu(prev=>!prev)}><BiSolidDownArrow /></span>} */}
                {showProfileMenu && <ProfileMenu click={()=>setShowProfileMenu(prev=>!prev)} showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} arrowRef={arrowRef}/>}
              </div>
              <div className="hamburger-btn" onClick={()=>setMenuShowing(prev => !prev)}>
                <GiHamburgerMenu/>
              </div>
            </div>
          </nav>   
  )
}

export default Nav


