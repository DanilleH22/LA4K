import { motion } from "framer-motion";
import "../styles/PhotoReel.modules.css";
import { useEffect, useState } from 'react';

export default function VideoReel() {
  const projects = [
    {
      id: 1,
      title: "Brand Documentary",
      description: "Corporate storytelling for global tech company",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Product Launch",
      description: "Cinematic product reveal video",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Social Campaign",
      description: "Viral social media content series",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Event Coverage",
      description: "Multi-camera conference production",
      image: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Commercial Ad",
      description: "30-second TV commercial spot",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Training Series",
      description: "Educational video content",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Corporate Profile",
      description: "Company culture showcase",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Testimonial Series",
      description: "Client success stories",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "Motion Graphics",
      description: "Animated explainer video",
      image: "https://images.unsplash.com/photo-1551986781-2e6d2c6d2c6d?w=800&auto=format&fit=crop"
    }
  ];

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
          <span className="eyebrow">Showreel</span>
          <h2>Turn Your Vision into Film</h2>
        </motion.div>

        <div className="grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
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
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
              />
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
             {buttonState === 'loading' ? 'Loading…' : 'Email me'}

          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}