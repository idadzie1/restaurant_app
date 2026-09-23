import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegCopyright } from "react-icons/fa";
const Footer = () => {

  const today = new Date();
  const getYear = today.getFullYear();  
  
  return (
    <footer>
      <div className="footer-container">
          <div className="footer-menus">
              <ul>
                <Link to='/'>
                  <li>Home</li>
                </Link>

                <Link to='/About'>
                  <li>About</li>
                </Link>

                <Link>
                  <li>Services</li>
                </Link>

                <Link>
                   <li>Blog/News</li>                
                </Link>

                <Link>
                  <li>Contact</li>
                </Link>     
                
              </ul>
          </div>
          <div className="address-socials">
            <div className="address">
                 <h4>Address</h4>
                  AstroLinks Softwares<br></br>
                  Ablekuma Fan Milk Area<br></br>
                  Temple Street<br></br>
                  Accra- Ghana
                
            </div>
            <div className="contacts">
                <h4>Contact</h4>
                <p>facebook</p>
                <p>Instagram</p>
                <p>email: astrolyncs@gmail.com</p>
                <p>Tel: +233 029453410</p>
            </div>
            <div className="quick-links">
              Quick Likns
            </div>
          </div>
        </div> 
        <small> <FaRegCopyright />{getYear} Astrolyncs Software Systems, Ghana </small>     
    </footer>

  )
}

export default Footer
