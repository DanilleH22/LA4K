// src/components/sections/QandA/QandA.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/QandA.modules.css';
import { client } from '../sanity/client';

export default function QandA({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [buttonState, setButtonState] = useState('idle');

  const whatsappPhone = "447769873047";
  const whatsappMessage = "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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

  const buttonConfig = {
    idle: { text: 'Get in Touch on WhatsApp', className: 'primary' },
    loading: { text: 'Opening WhatsApp...', className: 'loading' },
    success: { text: 'WhatsApp Ready!', className: 'success' },
    error: { text: 'Try Again', className: 'error' },
  };

  const currentButton = buttonConfig[buttonState];

 if (!data) return null;

  return (
    <section className="qa-section">
      <div className="qa-container">
        <motion.div 
          className="qa-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{data.faqTitle}</h2>
          <p>{data.faqSubtitle}</p>
        </motion.div>

        <div className="qa-accordion">
          {data.faqItems?.map((item, index) => (
            <motion.div 
              key={index}
              className={`qa-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.button
                className="qa-question"
                onClick={() => toggleAccordion(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="qa-question-text">{item.question}</span>
                <motion.span 
                  className="qa-icon"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="qa-answer-container"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                  >
                    <div className="qa-answer">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="qa-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>Still have questions?</p>
          <motion.button
            className="qa-contact-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#333" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            disabled={buttonState === 'loading'}
            onClick={handleGetInTouch}
          >
            {currentButton.text}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
