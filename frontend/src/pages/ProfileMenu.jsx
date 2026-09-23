import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';

const ProfileMenu = ({click, showProfileMenu, setShowProfileMenu, arrowRef}) => {

       
        const menuProfileRef = useRef(null);
        // const arrowRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if ( menuProfileRef.current && !menuProfileRef.current.contains(e.target) && arrowRef.current &&
            !arrowRef.current.contains(e.target)){
                setShowProfileMenu(false);
              }};

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowProfileMenu, arrowRef]);


  return (
    <>
    { showProfileMenu  && <div className='profile' ref={menuProfileRef}>
        <ul className='profile-menu'>
            <Link to='/changeprofilepicture'>
                <li onClick={click}>Change Profle Pic</li>
            </Link>

            <Link to='/ChangePassword'>
                <li onClick={click}>Change Password</li>
            </Link>

            <Link className='only-mobile' to='/LogOut'>
                <li onClick={click}>Log Out</li> 
            </Link>               
            
        </ul>      
    </div>}
    </>
  )
}

export default ProfileMenu
