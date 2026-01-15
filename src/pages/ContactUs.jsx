import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero2.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import Footer from '../components/Footer.jsx';
import MovingFooter from '../components/MovingFooter.jsx';
import "../styles/ContactUs.css";
import { client } from "../sanity/client";
import ContactHero from "../components/ContactHero.jsx"
import { fetchContact } from "../sanity/fetchContactUs";



const ContactUs = () => {

  const whatsappPhone = "447769873047";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [copied, setCopied] = useState(false);

  const contactInfo = {
    email: "Mrla4k@gmail.com",
    phone: "+447769873047",
    socials: {
      tiktok: "https://tiktok.com",
      instagram: "https://instagram.com"
    }
  };

  // const projectTypes = [
  //   'Commercial Ad',
  //   'Brand Documentary',
  //   'Social Media Content',
  //   'Event Coverage',
  //   'Animation',
  //   'Corporate Video',
  //   'Music Video',
  //   'Other'
  // ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

 const [buttonState, setButtonState] = useState('idle');
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




   const [content, setContent] = useState(null);

  useEffect(() => {
  fetchContact()
    .then(setContent)
    .catch(() => {
      setContent({
        headerTitle: "Contact Us",
        headerSubtitle: "Let’s work together",
        contactEyebrow: "GET IN TOUCH",
        contactSectionTitle: "Contact Details",
        projectTypes: ["Commercial", "Social", "Other"],
        faqs: [],
        ctaTitle: "Start a Project",
        ctaDescription: "Tell us about your idea",
        ctaButtonText: "Get in Touch"
      });
    });
}, []);



  
  
    if (!content) {
    return <div style={{ color: 'white', padding: '2rem' }}>Loading Contact Us content…</div>;
  }

  

  return (
    <>
      
{/* <ContactHero data={content.titleScreen} /> */}
<ContactHero data={content} />
      
      <div className="contact-container">
        {/* Contact Header */}
        <motion.section 
          className="contact-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants}>
            {content.headerTitle}
          </motion.h1>
          <motion.p variants={itemVariants} className="contact-subtitle">
            {content.headerSubtitle}
          </motion.p>
        </motion.section>

        {/* <div>
          <Services />
        </div> */}

        <div className="contact-content">
          {/* Contact Info Cards */}
          <motion.div 
            className="contact-info-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="section-header" variants={itemVariants}>
              <span className="section-eyebrow">{content.contactEyebrow}</span>
              <h2 className="section-title">{content.contactSectionTitle}</h2>
            </motion.div>

            <div className="info-cards-grid">
              {[
                {
                  
                  title: 'Email',
                  content: contactInfo.email,
                  action: handleCopyEmail,
                  actionText: copied ? 'Copied!' : 'Copy Email',
                  color: '#4ecdc4'
                },
                {
                 
                  title: 'Phone',
                  content: contactInfo.phone,
                  action: () => window.location.href = `tel:${contactInfo.phone}`,
                  actionText: 'Call Now',
                  color: '#45b7d1'
                }
              ].map((info, index) => (
                <motion.div 
                  key={index}
                  className="info-card"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="info-icon" style={{ color: info.color }}>
                    {info.icon}
                  </div>
                  <h3 className="info-title">{info.title}</h3>
                  <p className="info-content">{info.content}</p>
                  {info.action && (
                    <motion.button
                      className="info-action"
                      onClick={info.action}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {info.actionText}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

           
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="section-header" variants={itemVariants}>
              <span className="section-eyebrow">ENQUIRE NOW</span>
              <h2 className="section-title">Send Us a Message</h2>
            </motion.div>

            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              variants={itemVariants}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+447379621023"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a project type</option>
                    {content.projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                />
              </div>

              <motion.button
                type="submit"
                className={`submit-button ${formStatus}`}
                disabled={formStatus === 'loading'}
                whileHover={formStatus === 'idle' ? { scale: 1.05 } : {}}
                whileTap={formStatus === 'idle' ? { scale: 0.95 } : {}}
              >
                {formStatus === 'idle' && (
                  <>
                    
                    Send Message
                  </>
                )}
                {formStatus === 'loading' && (
                  <>
                    <div className="loading-spinner" />
                    Sending...
                  </>
                )}
                {formStatus === 'success' && (
                  <>
                   
                    Message Sent!
                  </>
                )}
                {formStatus === 'error' && 'Try Again'}
              </motion.button>

              {formStatus === 'success' && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                 
                  <div>
                    <h4>Thank you for your message!</h4>
                    <p>We'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>

        

        {/* FAQ Section */}
        <motion.section 
          className="faq-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-eyebrow">COMMON QUESTIONS</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>


              <div className="faq-grid">
  {content.faqs.map((faq, index) => (
    <motion.div key={index} className="faq-item" variants={itemVariants} whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
      <h3 className="faq-question">{faq.question}</h3>
      <p className="faq-answer">{faq.answer}</p>
    </motion.div>
  ))}
</div>

         
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-content">
            <h2 className="cta-title">{content.ctaTitle}</h2>
            <p className="cta-description">
              {content.ctaDescription}
            </p>
            <div className="cta-buttons">
              <motion.button 
                className="cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={buttonState === 'loading'}
                onClick={handleGetInTouch}
              >
                
                {content.ctaButtonText}
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

export default ContactUs;