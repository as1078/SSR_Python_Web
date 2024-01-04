import './App.css';
import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from './navbar';
import './styles.css'; // Import your CSS file
import React from "react"
import WelcomeScreen from "./pages/WelcomeScreen"
import SignupScreen from "./pages/SignupScreen"
import LoginScreen from "./pages/LoginScreen"
import RecordScreen from './pages/RecordScreen';


import UserInfoScreen from "./pages/UserInfoScreen"
import SubmitScreen from "./pages/SubmitScreen"

export default function App() {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path="/home" element={<WelcomeScreen/>}
      />
      
      <Route path="/login" element={<LoginScreen />}/>
      <Route path="/signup" element={<SignupScreen />}/>
      <Route path="/userinfo" element={<UserInfoScreen />}/>
      <Route path="/" element={<Navigate to="/home" />}/>
      <Route path="/record/" element={<RecordScreen/>}/>
      <Route path="/submit" element={<SubmitScreen/>}/>


    </Routes>
    </div>
    
  
    
  )
}
