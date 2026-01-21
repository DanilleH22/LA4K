import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "react-bootstrap";
import "../styles/OurStory.css";

export default function OurStory({ data }) {
  const [buttonState, setButtonState] = useState("idle");
  const sectionRef = useRef(null);

  const whatsappPhone = "447769873047";
  const whatsappMessage = "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";

  const handleGetInTouch = () => {
      setButtonState('loading');
      
      // Simulate network delay
      setTimeout(() => {
        // Check if user is on mobile for better UX
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
          // For mobile: Try to open WhatsApp app directly
          window.location.href = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`;
          
          // Fallback after 2 seconds if WhatsApp not installed
          setTimeout(() => {
            if (document.hidden) {
              // WhatsApp opened successfully
            } else {
              // WhatsApp not installed, open web version
              window.open(`https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            }
          }, 2000);
        } else {
          // For desktop: Open WhatsApp Web
          window.open(`https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        }
        
        // Show success state briefly
        setButtonState('success');
        setTimeout(() => setButtonState('idle'), 2000);
      }, 800);
    };


  
    const buttonConfig = {
      idle: {
        text: 'Get in Touch on WhatsApp',
        className: 'primary'
      },
      loading: {
        text: 'Opening WhatsApp...',
        className: 'loading'
      },
      success: {
        text: 'WhatsApp Ready!',
        className: 'success'
      },
      error: {
        text: 'Try Again',
        className: 'error'
      }
    };
  
    const currentButton = buttonConfig[buttonState];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  // const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!data) {
    return <section className="our-story"><div>Loading...</div></section>;
  }

  const { ourStoryHeading, ourStoryBody, backgroundVideo, missionStatements } = data;

  return (
    <section className="our-story" ref={sectionRef}>
      {/* Background Video */}

      <div className="background-video-container">
      <iframe
  src="https://www.youtube.com/embed/3zAXpk6EJMQ?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&playlist=3zAXpk6EJMQ&enablejsapi=1"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  title="Background video"
  allowFullScreen
/>
  </div>
     
      
      <div className="background-overlay"></div>

      <div className="our-story-inner">
       <motion.div 
  className="our-story-text" 
  style={{ y: textY, }}
>
  <div style={{ opacity: 0.9 }}>
    <h2>{ourStoryHeading}</h2>
    <p>{ourStoryBody}</p>
    
    {missionStatements && missionStatements.length > 0 && (
      <ul className="our-story-mission">
        {missionStatements.map((missionStatement, index) => (
          <li key={index}>
            <strong>{missionStatement.title}:</strong> {missionStatement.description}
          </li>
        ))}
      </ul>
    )}
  </div>
</motion.div>
        <Button  variant="primary" className="button"
                  disabled={buttonState === 'loading'}
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
              onClick={(e) => {
                e.preventDefault(); 
                handleGetInTouch();
              }}
              target="_blank"
              rel="noopener noreferrer"
                  >
                    {buttonState === 'loading' ? 'Loading…' : ' Whatsapp me'}
                   
                  </Button>
      </div>
    </section>
  );
}