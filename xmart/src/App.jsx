import { BrowserRouter, Routes, Route } from 'react-router-dom'

import React from 'react'
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp_admin from './pages/SignUp_admin';
import SignIn_admin from './pages/SignIn_admin';
import SignUpAdmin from './pages/SignUp_admin';

 
import SignIn_seller from './pages/SignIn_seller';
import SignUpseller from './pages/SignUp_seller'; 
 
import SignIn_supplier from './pages/SignIn_supplier';
import SignUpSupplier from './pages/SignUp_supplier'; 

import DashboardAdmin from './pages/dashboard_admin';
import DashboardAdminMain from './pages/dashboard_admin_main';
import DashboardSeller from './pages/dashboard_seller';
import Products from './pages/products';


 
 
export default function App() {

  return <BrowserRouter>
    <Header />
    


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup_admin" element={<SignUp_admin />} />
      <Route path="/signin_admin" element={<SignIn_admin />} />
      <Route path="/signup_admin" element={<SignUpAdmin />} />
      <Route path="/signin_admin" element={<SignIn_admin />} />

 
      <Route path="/signin_seller" element={<SignIn_seller />} />
      <Route path="/signup_seller" element={<SignUpseller />} />

      <Route path="/signin_supplier" element={<SignIn_supplier />} />
      <Route path="/signup_supplier" element={<SignUpSupplier />} />

      <Route path="/dashboard_admin" element={<DashboardAdmin />} />

      <Route path="/dashboard_admin_main" element={<DashboardAdminMain />} />
      <Route path="/dashboard_seller" element={<DashboardSeller />} />  
      <Route path="/products" element={<Products />} />



      
     
    </Routes>

    <Footer />
 
    </BrowserRouter>;
}

