




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


function Homepage() {
  return (
    <>

      {/* <Hero2 /> */}
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

export default Homepage;




