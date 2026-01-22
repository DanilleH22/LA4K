



import React, {useState, useEffect} from "react";
import OurStory from "../components/OurStory.jsx"

import CaseStudies from '../components/CaseStudies.jsx';
import Services from '../components/Services.jsx';
// import PlayReel from './components/PlayReel.jsx';
import TrustedFeedback from '../components/TrustedFeedback.jsx';
import QA from '../components/QandA.jsx';
import PhotoReel from '../components/PhotoReel.jsx';
import Footer from '../components/Footer.jsx';
import MovingFooter from '../components/MovingFooter.jsx';

import SocialLinks from '../components/SocialLinks.jsx';
import Hero2 from '../components/Hero2.jsx';
import { fetchHome } from "../sanity/fetchHome.js";
import { clearHomeCache } from "../sanity/fetchHome.js";
import TestingVideo from '../components/testingVideo.jsx';

export default function Homepage() {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

useEffect(() => {
  clearHomeCache();
  fetchHome()
    .then(setHome)
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);




  if (loading) {
    return <div style={{ color: "white", padding: "2rem" }}>Loading homepage…</div>;
  }

  if (error) {
    return <div style={{ color: "white", padding: "2rem" }}>Error loading data: {error.message}</div>;
  }

  if (!home) {
    return <div style={{ color: "white", padding: "2rem" }}>No data found</div>;
  }

   console.log("Video Reel Projects:", home.videoReelSection.projects.map(p => ({
  title: p.title,
  url: p.image?.asset?.url,
  createdAt: p.image?.asset?._createdAt
})));


  return (
    <>
       <Hero2 data={home.heroSection} />
      
    
     
      <MovingFooter />
      <OurStory data={home.ourStory} />
      <SocialLinks />
      <CaseStudies  data={home.caseStudy} />
      <TrustedFeedback  data={home.trustedFeedback} />
      <Services  data={home.servicesSection} />
      <MovingFooter />
      <PhotoReel  data={home.videoReelSection} />
      <QA data={home.faq} />
      <Footer />
      <SocialLinks />
      <MovingFooter />
      <TestingVideo data={home.caseStudy} />
    </>
  );
}






