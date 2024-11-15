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


      {/* <Route path="/signup_seller" element={<SignUp_seller />} /> */}
    </Routes>

    <Footer />
 
    </BrowserRouter>;
}
