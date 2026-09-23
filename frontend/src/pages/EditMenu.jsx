import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import FailureDialogueBox from '../components/modals/FailureDialogueBox'
import SuccessDialogueBox from '../components/modals/SuccessDialogueBox'
import Loader from '../components/Loader/Loader'


// This if editing the menu. To change the text in the menu or photo or both
// =========================================================================

const EditMenu = () => {
  const [ menuData, setMenuData ]=useState({}) 
  const [ menuPhoto, setMenuPhoto ] = useState(null) 
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ successMessage, setSuccessMessage ] = useState("")
  const [ showError, setShowError ]=useState(false)
  const [ showSuccess, setShowSuccess ] = useState(false)
  const [ loader, setLoader ] = useState(false)

  const fileInputRef = useRef(null);

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

  const { restaurantId, menuId } = useParams()

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  }, [])

  // load specific menu to be edited
 

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/menu/${menuId}`, {
          method: 'GET',
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        const data = await response.json()

        if(!response.ok){
          setErrorMessage(data.message)
        }

        setMenuData(data)     


      } catch (error) {
        setErrorMessage(error.message)
      }
    }

    fetchData()

  }, [restaurantId, menuId])
 
    console.log("menu Data", menuData)
 
  const handleChanges=(e)=>{
    const name = e.target.name    
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

    setMenuData(prev => ({...prev, [name]: value}))
   
  }  
 

  const handleFiles = (e)=>{
    setMenuPhoto(e.target.files[0])    
  }
  
  const handleClear = () => {
    setMenuData({
      name: "",
      price: "",
      available: true,
      description: ""
    });

    setMenuPhoto(null);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
};



  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {

        if(!menuData.name || !menuData.price || !menuData.description || !menuData.available){
          setErrorMessage("Fill in all fields")
          setShowError(true)
          return
        }

      const formData = new FormData()
      formData.append('name', menuData.name)
      formData.append('price', menuData.price)
      formData.append('description', menuData.description)
      formData.append('available', menuData.available)
      formData.append('menuPhoto', menuPhoto)

      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/${restaurantId}/menu/${menuId}`, {
        method: 'PATCH',
        headers:{
          Authorization:`Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      console.log("FULL RESPONSE:", data);
      console.log("MESSAGE:", data.message);

      if(!response.ok){
        setErrorMessage(data.message)
        setShowError(true)
        return
      }

       setMenuData(data.data)
       setSuccessMessage(data.message)
       setShowSuccess(true)       
       return
      
    } catch (error) {
      setErrorMessage(error.messsage)
      setShowError(true)
      return
    }       

  }
    
  const okOnSuccess =()=>{
    navigate(`/restaurants/${restaurantId}`)
    setShowSuccess(false)
    setLoader(true)
  }

  if(loader){
    <Loader />
  }
    
  return (    
    <> 
    
    {showSuccess && <SuccessDialogueBox successMessage={successMessage} okClick={okOnSuccess}/>}
    {showError && <FailureDialogueBox errorMessage={errorMessage} okClick={()=>setShowError(false)}/>}       
    <section id='edit-menu'>       
       <h3 className='menu-dishes-drinks'>Change or Replace Menu</h3>      
      <form onSubmit={handleSubmit} >        
        <label htmlFor="img">Upload Menu</label>
        <input
          ref={fileInputRef}
          id='img' 
          type="file" 
          name='menuPhoto'
          onChange={handleFiles} 
        />
        <div className="inputs">
          <div className='available'>Available
              <input            
                type="checkbox"
                name='available'
                checked = {menuData.available}
                onChange={handleChanges}
                />
           </div>
           <div className="name">Name
            <input 
              type="text"
              name='name'
              value={menuData.name}
              onChange={handleChanges} 
            />
          </div>
          <div className="price">Price 
            <input 
              type="text"
              name="price"
              value={menuData.price} 
              onChange={handleChanges}
            />
          </div>
        </div> 
        <div className="description">Description
          <textarea
            id='msg'          
            name='description' 
            value={menuData.description}
            onChange={handleChanges}
          />
        </div>
        <div className="button-class">
          <button type='submit'>Submit</button>
          <button type='reset' onClick={handleClear}>Clear</button>
        </div>        
      </form>    
    </section>
    </>
  )
}

export default EditMenu
