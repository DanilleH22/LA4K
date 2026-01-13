import React, {useState} from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/hero.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import Footer from '../components/Footer.jsx';
import MovingFooter from '../components/MovingFooter.jsx';
import "../styles/about.css";





const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

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
    <>
      <Hero />
      
      <div className="about-container">
        {/* Hero Statement */}
        <motion.section 
          className="mission-hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants}>
            OUR MISSION IS TO CRAFT VISUALS THAT MOVE PEOPLE, COMBINING ART AND STRATEGY TO CREATE IMPACTFUL STORIES.
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-subtitle">
            From commercials to digital films, we bring ideas to life with emotion and purpose — connecting brands and audiences through powerful visuals.
          </motion.p>
        </motion.section>

        <SocialLinks />

        {/* Our Story Section */}
        <motion.section 
          className="story-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="story-grid">
            <motion.div 
              className="story-image-container"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-placeholder story-image">
                <div className="image-overlay"></div>
                <div className="image-badge">
                  <span className="badge-dot">◉</span>
                  <span>SINCE 2024</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="story-content" variants={itemVariants}>
              <div className="section-header">
                <span className="section-eyebrow">WHO WE ARE</span>
                <h2 className="section-title">Our Story</h2>
              </div>
              <h3 className="story-tagline">
                We are a video production company dedicated to bringing your stories to life.
              </h3>
              <p className="story-description">
                Our team of skilled professionals is passionate about creating compelling visual narratives that resonate with audiences. With years of experience in filmmaking, animation, and digital content, we blend technical expertise with creative vision.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">150+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Client Satisfaction</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Creative Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section 
          className="mission-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="mission-grid">
            <motion.div className="mission-content" variants={itemVariants}>
              <div className="section-header">
                <span className="section-eyebrow">OUR DRIVE</span>
                <h2 className="section-title">Our Mission</h2>
              </div>
              
              <div className="mission-points">
                <motion.div 
                  className="mission-point"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="point-header">
                    <div className="point-icon">✓</div>
                    <h3 className="point-title">Excellence in Quality</h3>
                  </div>
                  <p className="point-description">
                    Deliver high-quality video content that exceeds client expectations with cinematic precision.
                  </p>
                </motion.div>

                <motion.div 
                  className="mission-point"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="point-header">
                    <div className="point-icon">♾️</div>
                    <h3 className="point-title">Collaborative Creativity</h3>
                  </div>
                  <p className="point-description">
                    Foster a collaborative environment that encourages creativity and innovation through open communication.
                  </p>
                </motion.div>

                <motion.div 
                  className="mission-point"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="point-header">
                    <div className="point-icon">⚡</div>
                    <h3 className="point-title">Innovative Technology</h3>
                  </div>
                  <p className="point-description">
                    Utilize the latest technology and techniques to enhance storytelling and stay ahead of trends.
                  </p>
                </motion.div>
              </div>

              <motion.div 
                className="cta-section"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <p className="cta-text">Ready to create something amazing?</p>
                <motion.button 
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                   disabled={buttonState === 'loading'}
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
      onClick={(e) => {
        e.preventDefault(); 
        handleGetInTouch();
      }}
      target="_blank"
      rel="noopener noreferrer"
                >
                    Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="mission-image-container"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-placeholder mission-image">
                <div className="image-overlay"></div>
                <div className="image-quote">
                  "Storytelling is the most powerful way to put ideas into the world today."
                  <span className="quote-author">— Robert McKee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="values-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-eyebrow">CORE PRINCIPLES</span>
            <h2 className="section-title">Our Values</h2>
          </motion.div>
          
          <div className="values-grid">
            {[
              { icon: '🎯', title: 'Authenticity', description: 'Human-centered storytelling that connects' },
              { icon: '✨', title: 'Craftsmanship', description: 'Precision in every frame and edit' },
              { icon: '🤝', title: 'Collaboration', description: 'Partnerships built on trust' },
              { icon: '🚀', title: 'Innovation', description: 'Pushing creative boundaries forward' },
              { icon: '❤️', title: 'Passion', description: 'Love for the art of storytelling' },
              { icon: '⚡', title: 'Impact', description: 'Creating work that moves people' }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section 
          className="contact-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-content">
            <h2 className="cta-title">Let's Create Together</h2>
            <p className="cta-description">
              Have a idea in mind? Let's discuss how we can bring your vision to life.
            </p>
            <div className="cta-buttons">
              <motion.button 
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={buttonState === 'loading'}
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
      onClick={(e) => {
        e.preventDefault(); 
        handleGetInTouch();
      }}
      target="_blank"
      rel="noopener noreferrer"
              >
                Get in Touch
              </motion.button>
             
            </div>
          </div>
        </motion.section>
      </div>

      <SocialLinks />
      <Footer />
      <MovingFooter />
    </>
  );
}

export default About;