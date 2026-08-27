import React from 'react'
import { Link } from 'react-router-dom'

const ProfileMenu = (click) => {
  return (
    <div className='profile'>
        <ul className='profile-menu'>
            <Link to='/ChangeProfilePic'>
                <li onClick={click}>Change Profle Pic</li>
            </Link>

            <Link to='/ChangePassword'>
                <li onClick={click}>Change Password</li>
            </Link>

            <Link to='/LogOut'>
                <li onClick={click}>Log Out</li> 
            </Link>               
            
        </ul>
      
    </div>
  )
}

export default ProfileMenu
