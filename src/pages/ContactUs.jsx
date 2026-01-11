import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import Footer from '../components/Footer.jsx';
import MovingFooter from '../components/MovingFooter.jsx';
import "../styles/ContactUs.css";
import { Alert } from 'bootstrap';
import Services from '../components/Services.jsx';
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheck, FaLinkedin, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
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
    email: "hamiltonkdanille@hotmail.com",
    phone: "+1 (555) 123-4567",
    address: "123 Studio Street, Los Angeles, CA 90028",
    hours: "Mon-Fri: 9AM-6PM PST",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  };

  const projectTypes = [
    'Commercial Ad',
    'Brand Documentary',
    'Social Media Content',
    'Event Coverage',
    'Animation',
    'Corporate Video',
    'Music Video',
    'Other'
  ];

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

  return (
    <>
      <Hero />
      
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
            Let's Create <span className="gradient-text">Together</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="contact-subtitle">
            Have a project in mind? Get in touch with our team to discuss how we can bring your vision to life.
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
              <span className="section-eyebrow">GET IN TOUCH</span>
              <h2 className="section-title">Contact Information</h2>
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
                },
                {
              
                  title: 'Location',
                  content: contactInfo.address,
                  action: () => window.open('https://maps.google.com', '_blank'),
                  actionText: 'Open Maps',
                  color: '#2a8cb8'
                },
                {
                  
                  title: 'Hours',
                  content: contactInfo.hours,
                  color: '#2aa7b8'
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
              <span className="section-eyebrow">START A PROJECT</span>
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
                    placeholder="+1 (555) 123-4567"
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
                    {projectTypes.map(type => (
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
            {[
              {
                question: "What's your typical response time?",
                answer: "We respond to all inquiries within 24 hours during business days."
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes, we work with clients worldwide and can accommodate different time zones."
              },
              {
                question: "What's your project minimum?",
                answer: "Our minimum project starts at $2,500, but this varies based on scope and requirements."
              },
              {
                question: "How long does a typical project take?",
                answer: "Timelines vary from 2-8 weeks depending on complexity, scope, and revision rounds."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="faq-item"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
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
            <h2 className="cta-title">Ready to bring your vision to life?</h2>
            <p className="cta-description">
              Let's schedule a free consultation to discuss your vision and how we can help.
            </p>
            <div className="cta-buttons">
              <motion.button 
                className="cta-primary"
                onClick={() => window.location.href = `mailto:${contactInfo.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                
                Schedule a Call
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