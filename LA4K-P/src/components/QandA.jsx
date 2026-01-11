import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Q&A.modules.css';

const OurPackages = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What services do you offer?",
      answer: "We offer a full range of video production services including concept development, scriptwriting, filming, editing, motion graphics, and post-production. Our team specializes in corporate videos, commercials, brand films, and social media content."
    },
    {
      question: "How long does a typical video project take?",
      answer: "The timeline varies based on project complexity. A simple social media video might take 2-3 weeks, while a full brand film with multiple locations could take 6-8 weeks. We provide detailed timelines during the planning phase and always strive to meet your deadlines."
    },
    {
      question: "What is your pricing structure?",
      answer: "We offer customized pricing based on project requirements. Factors include video length, complexity, number of shooting days, post-production needs, and usage rights. We provide transparent quotes with no hidden costs after our initial consultation."
    },
    {
      question: "Do you handle the entire production process?",
      answer: "Yes, we are a full-service production company. We manage everything from initial concept development and scriptwriting to filming, editing, and final delivery. We also handle all technical aspects including equipment, crew, and location permits."
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer: "Absolutely! We work closely with your marketing team to ensure all content aligns perfectly with your brand identity, voice, and visual guidelines. We can also help develop brand guidelines if needed."
    },
    {
      question: "What is your revision policy?",
      answer: "We include two rounds of revisions in our standard packages to ensure you're completely satisfied. Additional revisions are available if needed. We believe in collaboration and will work with you until the video is perfect."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about our video production process</p>
        </motion.div>

        <div className="qa-accordion">
          {faqItems.map((item, index) => (
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
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPackages;