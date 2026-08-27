import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Header from '../components/Header';
import Restaurant from '../components/Restaurant';
import restaurantData from '../data/datafile'
import Loader from '../components/Loader/Loader.jsx'
import DialogueBox from '../components/modals/Dialoguebox.jsx';
import ConfirmAndAckBox from '../components/modals/ConfirmAndAckBox.jsx'
import ErrorAndResDialogueBox from '../components/modals/ErrorAndResDialogueBox.jsx';
import { UserContext } from '../context/userContext.jsx';

const Home = () => {
const [ dataInfo, setDataInfo ] = useState([]);
const [ searchItem, setSearchItem ] = useState('');
const [ errorMessage, setErrorMessage ] = useState("");
const [ response, setResponse ] = useState("")
const [ confirmationMessage, setconfirmationMessage ] = useState("Do you want to proceed?");
const [ loading, setLoading ] = useState(true);
const [ selectRestaurantId, setSelectRestaurantId ] = useState(null)
const [ showDialogueBox, setShowDialogueBox ] = useState(false);
const [ showConfirmAndAck, setShowConfirmAndAck ] = useState(false);
const [ showErrorAndResDialogueBox, setShowErrorAndResDialogueBox ] = useState(false)
const {currentUser} = useContext(UserContext);

const [ confirm, setConfirm ] = useState("");
const [ acknowledgement, setAcknowledgement ] = useState("");



// Search logic to be introduced here later.
 const token = currentUser?.token
 const navigate = useNavigate()
 useEffect(()=>{
    const fetchAllRestaurants = async()=>{     
      try {
          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/get-all-approved-restaurants`);

          if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message)
          }

          const data = await response.json()
          setDataInfo(data)         
          

      } catch (error) {
        setErrorMessage(error.message)
      } finally {
       setLoading(false);
    }

    };
     fetchAllRestaurants();

 }, [])

  if (loading) {    
     return  <Loader />    
  }

    const filteredRestaurants = dataInfo.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchItem.toLowerCase()) ||
    restaurant.area.toLowerCase().includes(searchItem.toLowerCase())
  );

  // ====================
 

  // click on the claim Ownership and the confirmation box pops up
//   const handleDialogueBox = (restaurantId) => {
//   setSelectRestaurantId(restaurantId);
//   setShowDialogueBox(true);
// };

      const handleUserConfirm =(e)=>{
        setConfirm(e.target.checked)
      }

      const handleUserAck =(e)=>{
        setAcknowledgement(e.target.checked)
      }

      const handleDialogueBox = (restaurantId)=>{       
        setSelectRestaurantId(restaurantId)                       
        setShowDialogueBox(true)        
      }
      
        const handleNo = ()=>{
        setShowConfirmAndAck(false)
        setShowDialogueBox(false)
        return
      }

      
      const handleClickYesOnDialogueBox=()=>{
            if(!token){
            // redirect to login page
            navigate('/login')
            return;
            }else{

            clickToCklaimOwnerShip()              
             return
            }
        }
     
      const clickToCklaimOwnerShip = ()=>{        
              
            // if a user who is not logged in clicks ok on the dialogue box
            // he/she be redirected to the ligin page
            if(!token){
              // redirect to login page
              navigate('/login')
              return;
            }else{
              setShowConfirmAndAck(true)
              setShowDialogueBox(false)
              return
            }          
          }

        const claim = async ()=>{
          try {       
          
            if(!confirm || !acknowledgement){
              setShowConfirmAndAck(false)
              setErrorMessage("Check the boxes for confirmation and acknowlegdement")              
              setShowErrorAndResDialogueBox(true)
              return
            }
            
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurants/claim/${selectRestaurantId}`, {
            method:'PATCH',
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            confirm,
            acknowledgement
          })
        })           

            const data = await response.json()
           
            if(!response.ok){             
              setErrorMessage(data.message)              
              setShowErrorAndResDialogueBox(true)
              setShowConfirmAndAck(false)
              // setShowDialogueBox(false)                             
              return                            
            }
            
            setResponse(data.message)
            setShowConfirmAndAck(false)
            // setShowDialogueBox(false) 
            setShowErrorAndResDialogueBox(true)                                                
            return
        
      } catch (error) {
           setErrorMessage(error.message)
           setShowConfirmAndAck(false)
          //  setShowDialogueBox(false) 
           setShowErrorAndResDialogueBox(true) 
           return 
        }
      }


  return (
  <>
   <Helmet>
        <title>Best Restaurants in Ghana</title>
        <meta
          name="description"
          content="Discover the best restaurants in Ghana."
        />

    </Helmet>
       
        {showConfirmAndAck && <ConfirmAndAckBox onChangeCfm={handleUserConfirm} onChangeAck={handleUserAck} clickYes={claim} clickNo={handleNo} />}

        {showDialogueBox && <DialogueBox confirmationMessage={confirmationMessage} clickYes={handleClickYesOnDialogueBox} clickNo={handleNo} />}  

        {showErrorAndResDialogueBox && <ErrorAndResDialogueBox errorMessage={errorMessage} response={response} clickOk={()=>setShowErrorAndResDialogueBox(false)} />}     
      <Header
        searchItem={searchItem}
        setSearchItem={setSearchItem}      
      />
 
      <section className='container'>       
  
        <h2 className='container-heading'>Restaurant Listings</h2>
        {filteredRestaurants.length !=0?
        <div className="restaurant-items">
      
        {filteredRestaurants.map(({_id, name, coverPhoto, priceRange:{min, max}, openingHours:{open, close}, socials:{whatsapp, facebook, instagram}, phone, email, ratings, location, area, website, googleMap})=>{
            return <Restaurant 
                            key={_id} 
                            name={name} 
                            coverPhoto={coverPhoto}
                            priceRange={{ min, max }}                            
                            openingHours={{open, close}}
                            phone={phone}
                            socials={{whatsapp, facebook, instagram}}
                            email={email}
                            facebook={facebook}
                            instagram={instagram}
                            ratings={ratings}
                            location={location}
                            area={area}
                            onClick={()=>handleDialogueBox(_id)}
                            website={website}
                            googleMap={googleMap}                         
                            restaurantId={_id}
                          

                  /> 
        })
      }
        
        </div>  
          : <div className='no-listings'>No available listings </div>}     
            
      </section>     
  </>
  )
  }

export default Home
