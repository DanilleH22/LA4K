



import React, {useState, useEffect} from "react";
import OurStory from "../components/OurStory.jsx"
import { client } from "../sanity/client";
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



function Homepage() {

   const [home, setHome] = useState(null);

  useEffect(() => {
    client
      .fetch(`
        *[_type == "home"][0]{
          hero,
          ourStory,
          caseStudy {
  caseStudyHeading,
  caseStudyBody,
  caseStudyMedia[] {
    asset->{
      url
    }
  }
},

          trustedFeedback,
          faq,
          servicesSection,
          videoReelSection
        }
      `)
      .then((data) => {
        console.log("HOME DATA:", data);
        setHome(data);
      });
  }, []);

  if (!home) {
    return <div style={{ color: "white", padding: "2rem" }}>Loading homepage…</div>;
  }

  return (
    <>

      <Hero2 />
      <MovingFooter />
      <OurStory  data={home.ourStory} />
      <SocialLinks />
      <CaseStudies  data={home.caseStudy} />
      <TrustedFeedback  data={home.trustedFeedback} />
      <PhotoReel  data={home.videoReelSection} />
      <Services  data={home.servicesSection} />
      <QA data={home.faq} />
      <Footer />
      <SocialLinks />
      <MovingFooter />
    </>
  );
}

export default Homepage;




