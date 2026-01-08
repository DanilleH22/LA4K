import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Hero from "../src/components/hero.jsx";
import OurStory from "../src/components/OurStory.jsx";
import CaseStudies from './components/CaseStudies.jsx';
import Services from './components/Services.jsx';
import PlayReel from './components/PlayReel.jsx';
import TrustedFeedback from './components/TrustedFeedback.jsx';
import OurPackages from './components/OurPackages.jsx';
import VideoReel from './components/VideoReel.jsx';
import Footer from './components/Footer.jsx';
import MovingFooter from './components/MovingFooter.jsx';

function App() {
  return (
    <>
      <Hero />
      <OurStory />
      <CaseStudies />
      <Services />
      <PlayReel />
      <TrustedFeedback />
      <OurPackages />
      <VideoReel />
      <Footer />
      <MovingFooter />
    </>
  );
}

export default App;

