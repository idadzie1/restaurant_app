import { Children, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import LogOut from './pages/LogOut'; 
import RestaurantForm from './pages/RestaurantForm';
import AdminDashBoard from './pages/AdminDashBoard';
import UserDashPage from './pages/UserDashPage';
import RestaurantDetail from './pages/RestaurantDetail';
import MenuUpload from './pages/MenuUpload';
import GalleryUpload from './pages/GalleryUpload';
import EditGallery from './pages/EditGallery';
import EditRestaurantDetails from './pages/EditRestaurantDetails';
import EditMenu from './pages/EditMenu';
import ForgottenPassword from './pages/ForgottenPassword';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About';
import BlogPage from './pages/Blog/BlogPage';
import ChangeProfilePhoto from './pages/ChangeProfilePhoto';
import Message from './pages/Message'
import PrivacyPolicy from './pages/Legal_docs/PrivacyPolicy';
import TermsAndConditions from './pages/Legal_docs/TermsAndConditions';
import CookiePolicy from './pages/Legal_docs/CookiePoliciy';
import './index.css'
import UserProvider from './context/userContext';





const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider> <Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "about", element: <About />}, 
      {path: "blognews", element: <BlogPage />},
      {path: "register", element: <Register />},
      {path: "forgottenpassword", element: <ForgottenPassword />},
      {path: "login", element: <Login />},
      {path: "logout", element: <LogOut />},
      {path: "changepassword", element: <ChangePassword />},
      {path: "changeprofilepicture", element: <ChangeProfilePhoto/>},
      {path: "restaurant-form", element: <RestaurantForm />},
      {path: "admindashpage/", element: <AdminDashBoard />},
      {path: "userdashpage/", element: <UserDashPage />},
      {path: "restaurants/:restaurantId", element: <RestaurantDetail />},
      {path: "menuupload/:restaurantId", element: <MenuUpload />},
      {path: "uploadgallery/:restaurantId", element: <GalleryUpload />},
      {path: ":restaurantId/gallery/:galleryId", element: <EditGallery />},
      {path: "editdetails/:restaurantId", element: <EditRestaurantDetails />},
      {path: "editmenu/:restaurantId/:menuId", element: <EditMenu />},
      {path: "message", element: <Message />}, 
      {path: "privacy-policy", element: <PrivacyPolicy />},
      {path: "terms-and-conditions", element: <TermsAndConditions />},
      {path: "cookies-policy", element: <CookiePolicy />}
      
    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
