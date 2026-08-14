import { Children, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
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
import EditRestaurantDetails from './pages/EditRestaurantDetails';
import ForgottenPassword from './pages/ForgottenPassword';
import About from './pages/About';
import Message from './pages/Message'
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
      {path: "register", element: <Register />},
      {path: "forgottenpassword", element: <ForgottenPassword />},
      {path: "login", element: <Login />},
      {path: "logout", element: <LogOut />},
      {path: "restaurant-form", element: <RestaurantForm />},
      {path: "admindashpage/", element: <AdminDashBoard />},
      {path: "userdashpage/", element: <UserDashPage />},
      {path: "restaurants/:id", element: <RestaurantDetail />},
      {path: "menuupload/:id", element: <MenuUpload />},
      {path: "uploadgallery/:id", element: <GalleryUpload />},
      {path: "editdetails/:restaurantId", element: <EditRestaurantDetails />},
      {path: "message", element: <Message />}
      
    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
