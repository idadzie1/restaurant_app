import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import ErrorAndResDialogueBox from '../components/modals/ErrorAndResDialogueBox';
import ErrorAndResDialogueBoxTwo from '../components/modals/ErrorAndResDialogueBoxTwo';

// To upload both menu image and description
// =================================================================

const MenuUpload = () => {
    const [restaurant, setRestaurant] = useState({});
    const [ response, setResponse ] = useState("")
    const [ description, setDescription ] = useState("");
    const [ menuPhoto, setMenuPhoto ] = useState(null);
    const [ menuName, setMenuName ]=useState("");
    const [ menuPrice, setMenuPrice ] = useState("");
    const [ available, setAvailable ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ showErrorAndResDialogueBox, setShowErrorAndResDialogueBox ] = useState(false);

     const fileInputRef = useRef(null);

     const {currentUser} = useContext(UserContext)
     const token = currentUser?.token
     const navigate = useNavigate()
     

      useEffect(()=>{
        if(!token){
          navigate('/login')
        }
      }, [token, navigate])

    const { restaurantId } = useParams()   
    
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
        setMenuPhoto(e.target.files[0])
    }

      const handleClear = () => {
        setDescription("");
        setErrorMessage("");
        setMenuName("");
        setAvailable(false);
        setMenuPrice("");

      setFImage(null);
      if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

   const handleOkClick = ()=>{
         setDescription("");
        setErrorMessage("");
        setMenuName("");
        setAvailable(false);
        setMenuPrice("");
        navigate(`/restaurants/${restaurantId}`)
        setShowErrorAndResDialogueBox(false)

   }


    const handleSubmit = async (e)=>{
      e.preventDefault()
      setErrorMessage('')
      
      try {

          const formData = new FormData();
          formData.append("name", menuName);
          formData.append("price", menuPrice);
          formData.append("description", description);
          formData.append("available", available);
          formData.append("menuPhoto", menuPhoto);

          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/menu`,
                  {
                      method: "PATCH",
                      headers: {
                          Authorization: `Bearer ${token}`
                      },
                      body: formData
                  });

                  const data = await response.json();

                  

                  if(!response.ok){
                    setErrorMessage(data.message)
                    setShowErrorAndResDialogueBox(true)
                    return
                  }

                  setRestaurant(data)
                  setResponse(data.message)
                  setShowErrorAndResDialogueBox(true)
                  return
        
      } catch (error) {
          setErrorMessage(error.message);
          setShowErrorAndResDialogueBox(true);
      }                
                
    }

  return (
    <>
      {showErrorAndResDialogueBox && <ErrorAndResDialogueBoxTwo
      response={response}  
      errorMessage={errorMessage}      
      clickOk={handleOkClick}  
  />}     
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
          name = "description" 
          value = {description}
          id = "msg"
          onChange = {handleDescriptionChange}
         />

        <div className="button-conrol">
          <button>Submit</button>
          <button type='button' onClick={handleClear}>Clear</button>
        </div>                       
        
      </form>     
    </section>
    </>
  )
}

export default MenuUpload
