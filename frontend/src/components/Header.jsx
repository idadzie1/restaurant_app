import React from 'react'
import { IoIosSearch } from "react-icons/io";
import HeaderImage from '../assets/people_in_restaurant2.jpg'
import { useState } from 'react';

const Header = () => {
  const [searchItem, setSearchItem] = useState('');

  const handleSearch = (e)=>{
    searchItem(e.target.value)
  }
  
  return (
    <>
      <header>
        <div className="header-container">
          <div className="banner-text">
                The One Place To Find and Locate All Of Ghana's Best Restaurants
          </div>
          <div className="header-image">
            <img src={HeaderImage} alt="" />
            <div className="search-text">
              <form>
              <input 
                type="text" 
                name='search'
                value={searchItem} 
                placeholder='eg Restaurants in Accra'              
              />
              </form>
              <div className="search-icon" onClick={handleSearch}>
                <IoIosSearch />
              </div>              
            </div>
          </div>
        </div>
      </header>    
    </>
  
  )
}

export default Header
