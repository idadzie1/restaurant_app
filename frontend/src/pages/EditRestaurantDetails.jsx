import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader/Loader'
import ErrorAndResDialogueBox from '../components/modals/ErrorAndResDialogueBox.jsx';


const EditRestaurantDetails = () => {
    const [restaurantData, setRestaurantData] = useState({
         name: '',
         coverPhoto: '',
         captionPhoto:'',
         priceRange:{min:'', max:''},       
         openingHours:{open:'', close:''},
         phone:'',         
         email: '',
         socials:{whatsapp: '', facebook: '', instagram: ''},         
         ratings: '',
         location: '',
         area: '',
         website: '',        
         googleMap: ''

    })
    const [file, setFile] = useState(null)
    const [ response, setResponse ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ showErrorAndResDialogueBox, setShowErrorAndResDialogueBox ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token
    const navigate = useNavigate()
    const { restaurantId } = useParams()

    

    useEffect(()=>{
        if(!token){
            navigate('login')
        }
    }, [])

    const handleChanges=(e)=>{
        const {name, value} = e.target

        if(name ==='min' || name === 'max'){
            setRestaurantData(prev=>({
                ...prev, priceRange:{
                    ...prev.priceRange, [name]:value
                }
            }))
        } else if(name ==='open' || name === 'close'){
            setRestaurantData(prev=>({
                ...prev, openingHours:{...prev.openingHours, [name]:value}
            }))
        } else if(name ==='whatsapp' || name === 'facebook' || name === 'instagram'){
            setRestaurantData(prev =>({
                ...prev, socials:{...prev.socials, [name]:value}
            }))
        }else{
                setRestaurantData(prev=>({
            ...prev, [name]:value
        }))
            
        }        
    
    }


    const handleFileChanges=(e)=>{
        setFile(e.target.files[0])
    }

    const handleClear =()=>{
      setErrorMessage("");

      setRestaurantData({
         name: '',
         coverPhoto: '',
         captionPhoto:'',
         priceRange:{min:'', max:''},       
         openingHours:{open:'', close:''},
         phone:'',         
         email: '',
         socials:{whatsapp: '', facebook: '', instagram: ''},         
         ratings: '',
         location: '',
         area: '',
         website: '',        
         googleMap: ''
      })

      
    }



    useEffect(()=>{
        const fetchRestaurantData = async()=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/get-restaurant/${restaurantId}`)
                
                const data = await response.json();                

                if(!response.ok){
                    setErrorMessage(data.message)
                    setShowErrorAndResDialogueBox(true)
                    return
                }
                
                
                setRestaurantData(data)                              

            } catch (error) {
                setErrorMessage(error.message)
                return

            }finally{
                setLoading(false)
            }
        }

        fetchRestaurantData()
          

    }, [restaurantId, token])

        if(loading){
            return <Loader />
        }

    

    const handleSubmitForm= async (e)=>{
        e.preventDefault()
        try {
            if(!restaurantData.name || !restaurantData.priceRange.min || !restaurantData.priceRange.max || !restaurantData.openingHours.open || !restaurantData.openingHours.close || !restaurantData.phone || !restaurantData.email || !restaurantData.socials.whatsapp || !restaurantData.socials.facebook || !restaurantData.socials.instagram || !restaurantData.location || !restaurantData.area || !restaurantData.website || !restaurantData.googleMap){
                setErrorMessage("Fill all fields")
                return;

            }

             const formData = new FormData()
                formData.append("name", restaurantData.name);
                formData.append("coverPhoto", file);
                formData.append("captionPhoto", restaurantData.captionPhoto);
                formData.append("min", restaurantData.priceRange.min);
                formData.append("max", restaurantData.priceRange.max);
                formData.append("open", restaurantData.openingHours.open);
                formData.append("close", restaurantData.openingHours.close);
                formData.append("phone", restaurantData.phone);
                formData.append("email", restaurantData.email);
                formData.append("whatsapp", restaurantData.socials.whatsapp);
                formData.append("facebook", restaurantData.socials.facebook);
                formData.append("instagram", restaurantData.socials.instagram);
                formData.append("location", restaurantData.location);
                formData.append("area", restaurantData.area);
                formData.append("website", restaurantData.website);
                formData.append("googleMap", restaurantData.googleMap);


            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/edit/${restaurantId}`, {
                method: 'PATCH',
                headers:{
                    Authorization: `Bearer ${token}`
                },

                body: formData
            })

            const data = await response.json();

            if(!response.ok){
                setErrorMessage(data.message)
                setShowErrorAndResDialogueBox(true)
                return
            }

            
                setRestaurantData(data.data)
                setResponse(data.message)
                setShowErrorAndResDialogueBox(true)


        } catch (error) {
            setErrorMessage(error.message)
            return
        }
    }
    
        


  return (
    <section className='admin-page'>

        {showErrorAndResDialogueBox && <ErrorAndResDialogueBox
            response={response}  
            errorMessage={errorMessage} 
            clickOk={()=> setShowErrorAndResDialogueBox(false)} />}

        <h2 className='container-heading'>Edit Your Informtaion and Details</h2>
        <h5 className='error'>{errorMessage}</h5>
        <form className='admin-form' onSubmit={handleSubmitForm}>
            <label htmlFor="nor">Name of Restaurant</label>
            <input 
                type="text"
                name='name'
                value={restaurantData.name}
                id='nor'
                onChange={handleChanges}            
            />
            <label className='form-restaurant' htmlFor="file">upload cover photo</label>
            <input 
                type="file"
                name='coverPhoto'
                id='file'
                onChange={handleFileChanges} 
            />

            <label htmlFor="SDMessage">Short Descriptive Message</label>
            <textarea 
                name="captionPhoto" 
                id="SDMessage"
                value={restaurantData.captionPhoto}
                onChange={handleChanges}             
            ></textarea>
            
            <label htmlFor="price">Price range</label>
            <div className="max-min">
                <div className="min">min</div>
                <input 
                    type='number'               
                    name='min'
                    value={restaurantData.priceRange.min}
                    id='price'
                    onChange={handleChanges}                
                />
                 <div className="max">max</div>   
                <input 
                    type="number"                
                    name='max'
                    value={restaurantData.priceRange.max}
                    id='price'
                    onChange={handleChanges}                 
                />
            </div>


            <label htmlFor='open'>Open</label>
            <input 
                type="time"
                name='open'
                value={restaurantData.openingHours.open}
                id='open'
                onChange={handleChanges} 
            />

            <label htmlFor='close'>Close</label>
            <input 
                type="time"
                name='close'
                value={restaurantData.openingHours.close}
                id='close'
                onChange={handleChanges} 
            />

            <label htmlFor="tel">Telephone Contact</label>
            <input 
                type="tel"
                name='phone'
                value={restaurantData.phone}
                id='tel'
                onChange={handleChanges} 
            />

            <label htmlFor="email">email</label>
            <input 
                type="email" 
                name='email'
                value={restaurantData.email}
                id='email'
                onChange={handleChanges}
            />
            <div className="socials">Social Media
                <label htmlFor="wa">Whatsapp</label>
                <input 
                    type="text"
                    name='whatsapp'
                    value={restaurantData.socials.whatsapp}
                    id='wa'
                    onChange={handleChanges} 
            />

                <label htmlFor="fb">facebook</label>
                <input 
                    type="text"
                    name='facebook'
                    value={restaurantData.socials.facebook}
                    id='fb'
                    onChange={handleChanges} 
            />

                <label htmlFor="in">instagram</label>
                <input 
                    type="text"
                    name='instagram'
                    value={restaurantData.socials.instagram}
                    id='in'
                    onChange={handleChanges}
            />  
            </div>

                <label htmlFor="loc">Location</label>
                <input 
                    type="text"
                    name='location'
                    value={restaurantData.location}
                    id='loc'
                    onChange={handleChanges} 
                /> 

                <label htmlFor="area">Area</label>
                <input 
                    type="text"
                    name='area' 
                    value={restaurantData.area}
                    id='area'
                    onChange={handleChanges}
                /> 

                <label htmlFor="web">website</label>
                <input 
                    type="text"
                    name='website' 
                    value={restaurantData.website}
                    id='web'
                    onChange={handleChanges}
                /> 

                <label htmlFor="map">googlemap</label>
                <input 
                    type="text"
                    name='googleMap' 
                    value={restaurantData.googleMap}
                    id='map'
                    onChange={handleChanges}
                />  

                <div className="buttons">
                    <button type='submit'>Update</button>
                    <Link to="/userdashpage">Go Back</Link>                    
                    <button type='button' onClick={handleClear}>Clear</button>
                </div>

        </form>
    </section>

  )
}

export default EditRestaurantDetails
