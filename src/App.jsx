import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";


import Homepage from "./pages/home.jsx" 
import About from "./pages/about.jsx"
import ContactUs from './pages/ContactUs.jsx';


function App() {
  return (
    <>
      <NavBar />
      <Router>
        <div className="page-content">
         
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;




