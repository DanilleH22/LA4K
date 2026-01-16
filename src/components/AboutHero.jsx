import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { Button } from "react-bootstrap";
import "../styles/AboutHero.css";

export default function AboutHero({ data }) {

  
  const sectionRef = useRef(null);
  const titleControls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    titleControls.start({
      opacity: 1,
      scale: isMobile ? 1 : 1.02,
      transition: {
        duration: isMobile ? 5 : 1.2,
        ease: "easeInOut", // Changed from "easeIn" to "easeInOut"
      },
    });
  }, [titleControls, isMobile, prefersReducedMotion]);

  // If prefers reduced motion, use simpler animation
  useEffect(() => {
    if (prefersReducedMotion) {
      titleControls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      });
    }
  }, [titleControls, prefersReducedMotion]);


  // const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!data) {
    return <section className="our-story"><div>Loading...</div></section>;
  }

  const { aboutBackgroundVideo } = data;

  return (
    <section className="about-hero" ref={sectionRef}>
        
      <div className="background-video-container">
      
        
           <iframe
  src="https://www.youtube.com/embed/eqXJNMlszvw?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&modestbranding=1&rel=0&playlist=eqXJNMlszvw"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  title="Background video"
></iframe>

        
      </div>
        
      
      <div className="background-overlay"></div>

      <div className="about-hero-inner">
        <motion.div 
          className="about-hero-text"
          initial={{ opacity: 0, scale: 0.9 }} // Add initial state
          animate={titleControls}
        >
          <h1 className="gradient-heading">LA4K</h1>
          <p>VISUAL STUDIO</p>
        </motion.div>
      </div>
    </section>
  );
}