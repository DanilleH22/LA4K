import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Hero from "../src/components/hero.jsx";
import OurStory from "../src/components/OurStory.jsx";
import CaseStudies from './components/CaseStudies.jsx';

function App() {
  return (
    <>
      <Hero />
      <OurStory />
      <CaseStudies />
    </>
  );
}

export default App;

