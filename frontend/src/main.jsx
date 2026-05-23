import { Children, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashBoard from './pages/AdminDashBoard';
import OwnerDashBoard from './pages/OwnerDashBoard';
import RestaurantDetail from './pages/RestaurantDetail';
import About from './pages/About'
import './index.css'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "regsiter", element: <Register />},
      {path: "login", element: <Login />},
      {path: "adminpage", element: <AdminDashBoard />},
      {path: "ownerpage", element: <OwnerDashBoard />},
      {path: "posts/:id", element: <RestaurantDetail />},
      {path: "about", element: <About />}
    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
