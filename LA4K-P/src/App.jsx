import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import Hero from "../src/components/hero.jsx";
import OurStory from "../src/components/OurStory.jsx";
import CaseStudies from './components/CaseStudies.jsx';
import Services from './components/Services.jsx';
// import PlayReel from './components/PlayReel.jsx';
import TrustedFeedback from './components/TrustedFeedback.jsx';
import QA from './components/Q&A.jsx';
import PhotoReel from './components/PhotoReel.jsx';
import Footer from './components/Footer.jsx';
import MovingFooter from './components/MovingFooter.jsx';
import NavBar from './components/NavBar.jsx';
import SocialLinks from './components/SocialLinks.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <MovingFooter />
      <OurStory />
      <SocialLinks />
      <CaseStudies />
      <TrustedFeedback />
      <PhotoReel />
      <Services />
      <QA />
      <Footer />
      <SocialLinks />
      <MovingFooter />
    </>
  );
}

export default App;




