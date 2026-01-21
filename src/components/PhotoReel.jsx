import { motion } from "framer-motion";
import "../styles/PhotoReel.modules.css";
import { useEffect, useState } from 'react';
import { client } from "../sanity/client";
import { urlFor } from "../sanityImage";
import { clearHomeCache } from "../sanity/fetchHome.js";


export default function VideoReel({ data }) {

useEffect(() => {
  clearHomeCache();
}, []);



     const [buttonState, setButtonState] = useState('idle'); 
    const [copied, setCopied] = useState(false);
    
    const whatsappPhone = "447769873047"; 
    const whatsappMessage = "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";
  
  
  
   // Email fallback (optional)
    const email = "Mrla4k@gmail.com";
  
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




if (!data) return null;

console.log("Video Reel Projects →", data.projects);


  return (
    <section className="video-reel">
      <div className="video-reel-inner">
        <motion.div 
          className="video-reel-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{data.eyebrow}</span>
<h2>{data.heading}</h2>

        </motion.div>

        <div className="grid">
  {data.projects.map((project, index) => (
    <motion.div
      key={index}
      className="card"
      initial={{ 
        opacity: 0, 
        y: 50,
        rotate: Math.random() * 10 - 5 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 100 
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        rotate: 0,
        transition: { 
          duration: 0.3,
          type: "spring",
          stiffness: 200 
        }
      }}
    >
     
<div className="card-image">
  {project.image && (
    <img
      src={urlFor(project.image).width(800).quality(80).url()}
      alt={project.title}
      className="card-img-underlay"
      loading="lazy"
    />
  )}
</div>



      {/* <img
        src={urlFor(project.image).width(800).quality(80).url()}
        alt={project.title}
        loading="lazy"
      /> */}
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-description">{project.description}</p>
      </div>
    </motion.div>
  ))}
</div>


        <motion.div 
          className="video-reel-button"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            disabled={buttonState === 'loading'}
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
      onClick={(e) => {
        e.preventDefault(); 
        handleGetInTouch();
      }}
      target="_blank"
      rel="noopener noreferrer"
          >
             {buttonState === 'loading' ? 'Loading…' : 'Whatsapp me'}

          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}