import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';

// To upload both menu image and description
// =================================================================

const MenuUpload = () => {
    const [restaurant, setRestaurant] = useState({});
    const [description, setDescription] = useState("");
    const [menuPhoto, setmenuPhoto] = useState(null);
    const [menuName, setMenuName]=useState("");
    const [menuPrice, setMenuPrice] = useState("");
    const [available, setAvailable]= useState(false);
    const [errorMessage, setErrorMessage] = useState("");

     const fileInputRef = useRef(null);

     const {currentUser} = useContext(UserContext)
     const token = currentUser?.token
     const navigate = useNavigate()
     

      useEffect(()=>{
        if(!token){
          navigate('/login')
        }
      }, [])

    const {id} = useParams()
    // fetch data from the database
    

    useEffect(()=>{
      const fetchData = async ()=>{
        try {
            await fetch(
                  `${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${id}/menu`,
                  {
                      method: "PATCH",
                      headers: {
                          Authorization: `Bearer ${token}`
                      },
                      body: formData
                  });
          if(!response.ok){
            const errorMessage = await response.json();
            throw new Error(errorData.message);
          }
           const data = await response.json();
           setRestaurant(data);
           

        } catch (error) {
          
        }
      }

      fetchData()
    }, [])

    console.log(restaurant.menu)
    
    const handleDescriptionChange =(e)=>{ 
      setDescription(e.target.value);      
    }
    
    const handleMenuNameChange=(e)=>{
      setMenuName(e.target.value); 
    }

    const handleMenuPriceChange= (e) => {
      setMenuPrice(e.target.value);
    }

    
  const handleCheckBoxChanges =(e)=>{    
    setAvailable(e.target.checked);
  }

    const handleFile = (e) => {
        menuPhoto(e.target.files[0])
    }

      const handleClear = () => {
        setDescription("");
        setErrorMessage("");
        setMenuName("");
        setAvailable(null);
        setMenuPrice("");

      setFImage(null);
      if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


    const handleSubmit =(e)=>{
      e.preventDefault()      
        const formData = new FormData();
                formData.append("name", menuName);
                formData.append("price", menuPrice);
                formData.append("description", description);
                formData.append("available", available);
                formData.append("menuPhoto", menuPhoto);      
      }

  return (

    <section className='rest-menu'>
      <h3 className='menu-dishes-drinks'>Upload Your Menu</h3>
      <form className=''onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="image">Insert Image</label>
        <input
          id ='image'
          ref={fileInputRef} 
          type ="file"          
          name ='menuPhoto'
          onChange={handleFile} 
        />
        <div className="menu-name-price">
          <label htmlFor="menu-name">Menu Name</label>
          <input 
            type="text"
            name="name"
            value={menuName}
            onChange={handleMenuNameChange}
          />

          <label htmlFor="menu-price">Menu Price GHs</label>
          <input 
            type="Number"
            name='price'
            value={menuPrice}
            onChange={handleMenuPriceChange}             
          />
        </div>
        <div className="availabilty">
          <label htmlFor="">Availabie</label>
          <input
            name='available' 
            type="checkbox" 
            checked = {available}
            onChange={handleCheckBoxChanges}
          />
        </div>


        <label htmlFor="msg">Menu Description</label>
        <textarea
          name = "menuDescription" 
          value = {description}
          id = "msg"
          onChange = {handleDescriptionChange}
         />

        <div className="button-conrol">
          <button>Submit</button>
          <button onClick={handleClear}>Clear</button>
        </div>                       
        
      </form>     
    </section>
 
  )
}

export default MenuUpload
