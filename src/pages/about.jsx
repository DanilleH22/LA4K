import React, { useEffect, useState } from 'react';
import { client } from "../sanity/client";

import { urlFor } from '../sanityImage';

import { motion } from 'framer-motion';
import Hero from '../components/hero.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import Footer from '../components/Footer.jsx';
import MovingFooter from '../components/MovingFooter.jsx';
import "../styles/about.css";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const [buttonState, setButtonState] = useState('idle');
  const whatsappPhone = "447769873047";
  const [content, setContent] = useState(null);

  useEffect(() => {
  client.fetch(`*[_type == "about"][0]`).then((data) => {
    console.log("ABOUT DATA:", data);
    setContent(data);
  });
}, []);


  if (!content) {
  return <div style={{ color: 'white', padding: '2rem' }}>Loading about content…</div>;
}





  const whatsappMessage = "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information?";

  const handleGetInTouch = () => {
    setButtonState('loading');
    setTimeout(() => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`;
        setTimeout(() => {
          if (!document.hidden) {
            window.open(`https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
          }
        }, 2000);
      } else {
        window.open(`https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      }
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 2000);
    }, 800);
  };

  return (
    <>
      <Hero />

      <div className="about-container">

        {/* Hero / Mission Section */}
        <motion.section 
          className="mission-hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants}>{content.missionTitle}</motion.h1>
          <motion.p variants={itemVariants} className="hero-subtitle">{content.missionSubtitle}</motion.p>
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
              <div >
  {content.storyImage && (
  <img
    src={urlFor(content.storyImage).width(900).quality(80).url()}
    alt={content.storyImage?.alt || ''}
    className="section-image"
  />
)}

  <div className="image-overlay"></div>


                <div className="image-badge">
                  <span className="badge-dot">◉</span>
                  <span>{content.storySince || "SINCE 2024"}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="story-content" variants={itemVariants}>
              <div className="section-header">
                <span className="section-eyebrow">{content.storyEyebrow || "WHO WE ARE"}</span>
                <h2 className="section-title">{content.storyTitle || "Our Story"}</h2>
              </div>

              <h3 className="story-tagline">{content.storyTagline}</h3>
              <p className="story-description">{content.storyDescription}</p>

              <div className="stats-grid">
                {content.stats?.map((stat, index) => (
                  <div className="stat-item" key={index}>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission Section */}
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
                <span className="section-eyebrow">{content.missionEyebrow || "OUR DRIVE"}</span>
                <h2 className="section-title">{content.missionTitleSection || "Our Mission"}</h2>
              </div>

              <div className="mission-points">
                {content.missionPoints?.map((point, index) => (
                  <motion.div key={index} className="mission-point" whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                    <div className="point-header">
                      <div className="point-icon">{point.icon}</div>
                      <h3 className="point-title">{point.title}</h3>
                    </div>
                    <p className="point-description">{point.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div className="cta-section" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <p className="cta-text">{content.missionCtaText}</p>
                <motion.button 
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={buttonState === 'loading'}
                  onClick={handleGetInTouch}
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div className="mission-image-container" variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <div className="image-placeholder mission-image">

          {content.missionImage && (
          <img
            src={urlFor(content.missionImage).width(900).quality(80).url()}
            alt={content.missionImage?.alt || ''}
            className="section-image"
          />
        )}
          <div className="image-overlay"></div>
          


                
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
            <span className="section-eyebrow">{content.eyebrowPrincipal}</span>
            <h2 className="section-title">{content.titleValues}</h2>
          </motion.div>

          <div className="values-grid">
            {content.values?.map((value, index) => (
              <motion.div key={index} className="value-card" variants={itemVariants} whileHover={{ y: -10, scale: 1.05 }} transition={{ duration: 0.3 }}>
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
            <h2 className="cta-title">{content.contactTitle || "Let's Create Together"}</h2>
            <p className="cta-description">{content.contactDescription || "Have an idea? Let's discuss it."}</p>
            <div className="cta-buttons">
              <motion.button 
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={buttonState === 'loading'}
                onClick={handleGetInTouch}
              >
                {content.contactButtonText || "Get in Touch"}
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
};

export default About;
